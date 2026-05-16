/* Trajectory Viewer — Chat-style timeline with filtering & analysis */

(function () {
  var CHUNK_SIZE = 20;
  var MSG_COLLAPSE_THRESHOLD = 500;
  var OBS_PREVIEW_LINES = 15;

  function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function formatTimestamp(ts) {
    if (!ts) return "";
    try {
      var d = new Date(ts);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    } catch (e) { return ""; }
  }

  function isExecutedToolMsg(msg) {
    return /^Executed\s+\w+\s+toolu_/i.test(msg);
  }

  function isEmptyStep(step) {
    var msg = step.message || "";
    var hasTc = step.tool_calls && step.tool_calls.length > 0;
    var hasObs = step.observation && (step.observation.results || step.observation.content);
    var hasReasoning = !!step.reasoning_content;
    if (!msg && !hasTc && !hasObs && !hasReasoning) return true;
    if (isExecutedToolMsg(msg) && !hasTc && !hasObs && !hasReasoning) return true;
    return false;
  }

  function filterSteps(steps) {
    var filtered = [];
    for (var i = 0; i < steps.length; i++) {
      var s = steps[i];
      if (isEmptyStep(s)) continue;
      var msg = s.message || "";
      if (isExecutedToolMsg(msg) && s.tool_calls && s.tool_calls.length) {
        s = Object.assign({}, s, { message: "" });
      }
      filtered.push(s);
    }
    return filtered;
  }

  function analyzeSteps(steps) {
    var toolCounts = {};
    var totalToolCalls = 0;
    var userMsgCount = 0;
    var agentMsgCount = 0;
    var hasThinking = false;

    steps.forEach(function (s) {
      if (s.source === "user") userMsgCount++;
      else if (s.source === "agent") agentMsgCount++;
      if (s.reasoning_content) hasThinking = true;
      if (s.tool_calls) {
        s.tool_calls.forEach(function (tc) {
          var name = tc.function_name || tc.name || "unknown";
          toolCounts[name] = (toolCounts[name] || 0) + 1;
          totalToolCalls++;
        });
      }
    });

    var sortedTools = Object.keys(toolCounts).sort(function (a, b) {
      return toolCounts[b] - toolCounts[a];
    });

    return {
      toolCounts: toolCounts,
      sortedTools: sortedTools,
      totalToolCalls: totalToolCalls,
      userMsgCount: userMsgCount,
      agentMsgCount: agentMsgCount,
      hasThinking: hasThinking
    };
  }

  function renderAnalysisBanner(analysis, originalCount, filteredCount) {
    var h = '<div class="traj-analysis">';
    h += '<div class="traj-analysis-title">Trajectory Summary</div>';
    h += '<div class="traj-analysis-stats">';
    h += '<span class="traj-stat-chip">Steps: ' + filteredCount + (filteredCount < originalCount ? ' <span class="traj-stat-muted">(filtered from ' + originalCount + ')</span>' : '') + '</span>';
    h += '<span class="traj-stat-chip">Tool Calls: ' + analysis.totalToolCalls + '</span>';
    if (analysis.hasThinking) h += '<span class="traj-stat-chip traj-stat-chip--thinking">Has Extended Thinking</span>';
    h += '</div>';

    if (analysis.sortedTools.length) {
      h += '<div class="traj-tool-stats">';
      analysis.sortedTools.forEach(function (name) {
        h += '<span class="traj-tool-chip"><span class="traj-tool-chip-name">' + escapeHtml(name) + '</span><span class="traj-tool-chip-count">' + analysis.toolCounts[name] + '</span></span>';
      });
      h += '</div>';
    }
    h += '</div>';
    return h;
  }

  function smartTruncateObs(content) {
    if (!content) return "";
    var lines = content.split("\n");
    if (lines.length <= OBS_PREVIEW_LINES * 2 + 5) return escapeHtml(content);
    var head = lines.slice(0, OBS_PREVIEW_LINES).join("\n");
    var tail = lines.slice(-OBS_PREVIEW_LINES).join("\n");
    var hidden = lines.length - OBS_PREVIEW_LINES * 2;
    return escapeHtml(head) + '\n<span class="traj-truncated">... ' + hidden + ' lines hidden ...</span>\n' + escapeHtml(tail);
  }

  function renderToolCalls(toolCalls) {
    if (!toolCalls || !toolCalls.length) return "";
    var h = "";
    toolCalls.forEach(function (tc) {
      var fname = tc.function_name || tc.name || "unknown";
      var args = tc.arguments || "";
      if (typeof args === "object") args = JSON.stringify(args, null, 2);
      var argsLines = args.split("\n");
      var argsSummary = argsLines.length > 3
        ? argsLines.slice(0, 3).join("\n") + "\n..."
        : args;
      h += '<div class="traj-tool-call">';
      h += '<details class="traj-tool-details">';
      h += '<summary class="traj-tool-summary"><span class="traj-tool-icon">⚙</span><span class="traj-tool-name">' + escapeHtml(fname) + '</span>';
      if (argsLines.length <= 1 && args.length < 80) {
        h += '<span class="traj-tool-inline-arg">' + escapeHtml(args) + '</span>';
      }
      h += '</summary>';
      if (argsLines.length > 1 || args.length >= 80) {
        h += '<pre class="traj-tool-args"><code>' + escapeHtml(args.length > 3000 ? args.substring(0, 3000) + "\n... (" + (args.length - 3000) + " chars)" : args) + '</code></pre>';
      }
      h += '</details></div>';
    });
    return h;
  }

  function renderObservation(obs) {
    if (!obs) return "";
    var results = obs.results || obs.content;
    if (!results) return "";
    if (typeof results === "string") {
      var lines = results.split("\n").length;
      var size = results.length;
      var label = 'Tool Result (' + lines + ' lines, ' + (size > 1024 ? (size / 1024).toFixed(1) + 'KB' : size + 'B') + ')';
      return '<details class="traj-obs-details"><summary class="traj-obs-summary"><span class="traj-obs-icon">📋</span>' + label + '</summary>'
        + '<pre class="traj-obs-content"><code>' + smartTruncateObs(results) + '</code></pre></details>';
    }
    if (Array.isArray(results)) {
      var h = "";
      results.forEach(function (r) {
        var content = r.content || r.text || "";
        if (typeof content === "object") content = JSON.stringify(content, null, 2);
        if (!content) return;
        var lines = content.split("\n").length;
        var size = content.length;
        var label = 'Tool Result (' + lines + ' lines, ' + (size > 1024 ? (size / 1024).toFixed(1) + 'KB' : size + 'B') + ')';
        h += '<details class="traj-obs-details"><summary class="traj-obs-summary"><span class="traj-obs-icon">📋</span>' + label + '</summary>'
          + '<pre class="traj-obs-content"><code>' + smartTruncateObs(content) + '</code></pre></details>';
      });
      return h;
    }
    return "";
  }

  function renderMessage(msg, source) {
    if (!msg) return "";
    if (msg.length > MSG_COLLAPSE_THRESHOLD) {
      var preview = msg.substring(0, 200);
      var h = '<div class="traj-message">';
      h += '<details class="traj-msg-expand"><summary class="traj-msg-expand-toggle">'
        + escapeHtml(preview).replace(/\n/g, " ") + '... <span class="traj-expand-hint">[' + msg.length + ' chars, click to expand]</span></summary>';
      h += '<div class="traj-msg-full">' + escapeHtml(msg).replace(/\n/g, "<br>") + '</div>';
      h += '</details></div>';
      return h;
    }
    return '<div class="traj-message">' + escapeHtml(msg).replace(/\n/g, "<br>") + '</div>';
  }

  function renderStep(step, displayIndex) {
    var source = step.source || "unknown";
    var isUser = source === "user";
    var isSystem = source === "system";
    var bubbleClass = isUser ? "traj-bubble--user" : (isSystem ? "traj-bubble--system" : "traj-bubble--agent");
    var labelText = isUser ? "User" : (isSystem ? "System" : "Agent");

    var h = '<div class="traj-step">';
    h += '<div class="traj-bubble ' + bubbleClass + '">';

    h += '<div class="traj-bubble-header">';
    h += '<span class="traj-source-badge traj-source-badge--' + source + '">' + labelText + '</span>';
    if (step.timestamp) h += '<span class="traj-timestamp">' + formatTimestamp(step.timestamp) + '</span>';
    h += '<span class="traj-step-num">#' + (displayIndex + 1) + '</span>';
    h += '</div>';

    if (step.reasoning_content) {
      var rc = step.reasoning_content;
      var rcPreview = rc.length > 150 ? rc.substring(0, 150) + "..." : rc;
      h += '<details class="traj-thinking"><summary class="traj-thinking-toggle">💭 ' + escapeHtml(rcPreview).replace(/\n/g, " ") + '</summary>';
      h += '<div class="traj-thinking-content">' + escapeHtml(rc).replace(/\n/g, "<br>") + '</div>';
      h += '</details>';
    }

    h += renderMessage(step.message, source);

    if (step.tool_calls && step.tool_calls.length) {
      h += renderToolCalls(step.tool_calls);
    }

    if (step.observation) {
      h += renderObservation(step.observation);
    }

    h += '</div></div>';
    return h;
  }

  function renderMetrics(metrics) {
    if (!metrics) return "";
    var h = '<div class="traj-metrics">';
    if (metrics.total_input_tokens) h += '<span class="traj-metric">Input: ' + (metrics.total_input_tokens / 1000).toFixed(1) + 'K tokens</span>';
    if (metrics.total_output_tokens) h += '<span class="traj-metric">Output: ' + (metrics.total_output_tokens / 1000).toFixed(1) + 'K tokens</span>';
    if (metrics.total_time_sec) h += '<span class="traj-metric">Time: ' + metrics.total_time_sec.toFixed(1) + 's</span>';
    if (metrics.num_steps) h += '<span class="traj-metric">Steps: ' + metrics.num_steps + '</span>';
    h += '</div>';
    return h;
  }

  window.TrajectoryViewer = {
    _renderInline: function (trajectoryUrl, containerEl) {
      containerEl.innerHTML = '<p class="loading">Loading trajectory...</p>';
      fetch(trajectoryUrl)
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.json();
        })
        .then(function (data) {
          var rawSteps = data.steps || [];
          var filteredSteps = filterSteps(rawSteps);
          var analysis = analyzeSteps(rawSteps);

          var html = renderAnalysisBanner(analysis, rawSteps.length, filteredSteps.length);
          html += '<div class="traj-timeline">';
          filteredSteps.forEach(function (step, i) {
            html += renderStep(step, i);
          });
          html += '</div>';
          containerEl.innerHTML = html;
        })
        .catch(function (err) {
          containerEl.innerHTML = '<p style="color:var(--danger);padding:20px">Failed to load: ' + escapeHtml(err.message) + '</p>';
        });
    },

    open: function (trajectoryUrl, agentName, modelName) {
      var overlay = document.getElementById("traj-overlay");
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "traj-overlay";
        overlay.className = "traj-overlay";
        overlay.innerHTML = '<div class="traj-modal">'
          + '<div class="traj-modal-header">'
          + '<div class="traj-modal-header-left">'
          + '<h2 class="traj-modal-title">Trajectory</h2>'
          + '</div>'
          + '<div class="traj-modal-header-right">'
          + '<label class="traj-filter-toggle"><input type="checkbox" id="traj-show-raw" /> Show all raw steps</label>'
          + '<button class="traj-close-btn" onclick="TrajectoryViewer.close()">&times;</button>'
          + '</div>'
          + '</div>'
          + '<div class="traj-modal-body" id="traj-modal-body"><p class="loading">Loading trajectory...</p></div>'
          + '</div>';
        document.body.appendChild(overlay);
      }

      var titleEl = overlay.querySelector(".traj-modal-title");
      titleEl.textContent = (agentName || "Agent") + " — " + (modelName || "");

      var body = document.getElementById("traj-modal-body");
      body.innerHTML = '<p class="loading">Loading trajectory...</p>';
      overlay.classList.remove("hidden");
      document.body.style.overflow = "hidden";

      var showRawCheckbox = document.getElementById("traj-show-raw");
      showRawCheckbox.checked = false;

      fetch(trajectoryUrl)
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.json();
        })
        .then(function (data) {
          var rawSteps = data.steps || [];
          var filteredSteps = filterSteps(rawSteps);
          var analysis = analyzeSteps(rawSteps);

          function renderAll(steps, isRaw) {
            var totalSteps = steps.length;
            var rendered = 0;

            var html = '<div class="traj-header-info">';
            html += '<div class="traj-agent-info">';
            if (data.agent) {
              html += '<span class="traj-info-chip">Agent: ' + escapeHtml(data.agent.name || "") + '</span>';
              if (data.agent.model_name) html += '<span class="traj-info-chip">Model: ' + escapeHtml(data.agent.model_name) + '</span>';
            }
            if (data.schema_version) html += '<span class="traj-info-chip">Schema: ' + data.schema_version + '</span>';
            html += '</div>';
            html += renderMetrics(data.final_metrics);
            html += '</div>';

            html += renderAnalysisBanner(analysis, rawSteps.length, filteredSteps.length);

            html += '<div class="traj-timeline" id="traj-timeline"></div>';

            if (totalSteps > CHUNK_SIZE) {
              html += '<div class="traj-load-more-wrapper" id="traj-load-more-wrapper">'
                + '<button class="traj-load-more-btn" id="traj-load-more">Load more (<span id="traj-remaining">' + (totalSteps - CHUNK_SIZE) + '</span> remaining)</button>'
                + '</div>';
            }

            body.innerHTML = html;

            var timeline = document.getElementById("traj-timeline");

            function renderChunk() {
              var end = Math.min(rendered + CHUNK_SIZE, totalSteps);
              var fragment = "";
              for (var i = rendered; i < end; i++) {
                fragment += renderStep(steps[i], i);
              }
              timeline.insertAdjacentHTML("beforeend", fragment);
              rendered = end;

              var loadMoreWrapper = document.getElementById("traj-load-more-wrapper");
              if (loadMoreWrapper) {
                if (rendered >= totalSteps) {
                  loadMoreWrapper.style.display = "none";
                } else {
                  document.getElementById("traj-remaining").textContent = (totalSteps - rendered);
                }
              }
            }

            renderChunk();

            var loadMoreBtn = document.getElementById("traj-load-more");
            if (loadMoreBtn) {
              loadMoreBtn.addEventListener("click", renderChunk);
            }
          }

          renderAll(filteredSteps, false);

          showRawCheckbox.onchange = function () {
            renderAll(this.checked ? rawSteps : filteredSteps, this.checked);
          };
        })
        .catch(function (err) {
          body.innerHTML = '<p style="color:var(--danger);padding:20px">Failed to load trajectory: ' + escapeHtml(err.message) + '</p>';
        });
    },

    close: function () {
      var overlay = document.getElementById("traj-overlay");
      if (overlay) {
        overlay.classList.add("hidden");
        document.body.style.overflow = "";
      }
    }
  };

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") TrajectoryViewer.close();
  });
})();
