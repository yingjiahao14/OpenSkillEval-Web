/* Showcase — Case detail page logic (per-case, all variants × all models) */

function rebaseMarkdownImages(html, filePath) {
  var dir = filePath.substring(0, filePath.lastIndexOf('/') + 1);
  return html.replace(/<img\s+([^>]*?)src="([^"]+)"/g, function (match, pre, src) {
    if (/^https?:\/\/|^\//.test(src)) return match;
    var resolved = dir + src.replace(/^\.\//, '');
    return '<img ' + pre + 'src="' + resolved + '"';
  });
}

function resolveArtifactPath(dataSrc, relPath) {
  var parts = dataSrc.split("/");
  parts.pop();
  var base = parts.slice();
  var rel = relPath.split("/");
  for (var i = 0; i < rel.length; i++) {
    if (rel[i] === "..") base.pop();
    else if (rel[i] !== ".") base.push(rel[i]);
  }
  return base.join("/");
}

function renderPanelOutput(r, taskType) {
  if (!r || !r._resolved) return '<div class="no-artifact">No artifact available</div>';
  if (r.has_error) return '<div class="no-artifact">⚠ Run failed — no artifact generated</div>';
  var p = r._resolved;
  if (taskType === "data-visualization" || taskType === "poster-generation") {
    var img = taskType === "data-visualization" ? "/result.png" : "/final_poster.png";
    return '<img src="' + p + img + '" alt="Output" loading="lazy"'
      + ' onclick="openLightbox(this.src)"'
      + ' onerror="this.outerHTML=\'<div class=no-artifact>No artifact</div>\'">';
  } else if (taskType === "report-generation") {
    return '<iframe src="' + p + '/final_report.html" sandbox="allow-scripts" loading="lazy"></iframe>';
  } else if (taskType === "web-design") {
    return '<div class="web-frame-shell">'
      + '<div class="web-frame-chrome"><span></span><span></span><span></span></div>'
      + '<div class="web-frame-wrap">'
      + '<iframe class="web-frame" src="' + p + '/output/index.html" sandbox="allow-scripts allow-same-origin" loading="lazy"></iframe>'
      + '</div></div>';
  } else if (taskType === "ppt-generation") {
    return '<iframe src="' + p + '/slides.pdf" loading="lazy"></iframe>';
  }
  return '<div class="no-artifact">Preview not supported</div>';
}

function fmtScoreOutOf5(v) {
  if (v == null || isNaN(v)) return "—";
  return Number(v).toFixed(2);
}

function fmtTokens(n) {
  if (n == null) return "—";
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "K";
  return String(n);
}

function buildPanelMeta(r) {
  var sc = scoreClass(r.reward);
  var h = '<div class="panel-meta">';
  if (r.reward != null) {
    h += '<div class="meta-item"><span class="meta-label">Score</span><span class="meta-value meta-score ' + sc + '">' + fmtScoreOutOf5(r.reward) + '<span class="meta-score-denom"> / 5</span></span></div>';
  } else {
    h += '<div class="meta-item"><span class="meta-label">Score</span><span class="meta-value meta-score">—</span></div>';
  }
  if (r.variant) h += '<div class="meta-item"><span class="meta-label">Skill</span><span class="meta-value">' + r.variant + '</span></div>';
  if (r.mode) h += '<div class="meta-item"><span class="meta-label">Mode</span><span class="meta-value">' + r.mode + '</span></div>';
  if (r.exec_time_sec) h += '<div class="meta-item"><span class="meta-label">Time</span><span class="meta-value">' + r.exec_time_sec + 's</span></div>';
  if (r.input_tokens != null || r.output_tokens != null || r.cache_tokens != null) {
    var tokParts = [];
    if (r.input_tokens != null) tokParts.push('<span class="tok-part"><span class="tok-num">' + fmtTokens(r.input_tokens) + '</span><span class="tok-tag">in</span></span>');
    if (r.output_tokens != null) tokParts.push('<span class="tok-part"><span class="tok-num">' + fmtTokens(r.output_tokens) + '</span><span class="tok-tag">out</span></span>');
    if (r.cache_tokens != null) tokParts.push('<span class="tok-part"><span class="tok-num">' + fmtTokens(r.cache_tokens) + '</span><span class="tok-tag">cache</span></span>');
    h += '<div class="meta-item meta-item--tokens"><span class="meta-label">Tokens</span><span class="meta-value meta-tokens">' + tokParts.join('') + '</span></div>';
  }
  if (r._resolvedTraj) {
    var d = modelDisplay(r.model);
    h += '<div class="meta-item meta-item--traj"><button class="traj-inline-btn" data-traj="' + r._resolvedTraj
      + '" data-agent="' + (r.model.split("-")[0] || "agent")
      + '" data-model="' + d.name + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>View Trajectory</button></div>';
  }
  h += '</div>';

  // Evaluation breakdown (only when present — non-eval results are filtered out upstream)
  if (r.eval && r.eval.rubric && r.eval.rubric.length) {
    h += buildEvalBreakdown(r.eval);
  }
  return h;
}

function buildEvalBreakdown(ev) {
  var h = '<div class="eval-panel">';
  h += '<div class="eval-panel-header">';
  h += '<span class="eval-panel-title">Evaluation Breakdown</span>';
  if (ev.judge_model) h += '<span class="eval-judge">Judge · ' + ev.judge_model + '</span>';
  h += '</div>';

  function dimHasDetail(dim) {
    return !!(
      dim.reason || dim.score_reasoning
      || (dim.per_slide && dim.per_slide.length)
      || (dim.per_page && dim.per_page.length)
      || dim.mobile || dim.tablet
      || (dim.details && dim.details.length)
      || (dim.traceable && dim.traceable.length)
      || (dim.untraceable && dim.untraceable.length)
    );
  }

  // Rubric cards
  h += '<div class="eval-rubric-grid">';
  ev.rubric.forEach(function (dim, i) {
    var pct = dim.score != null ? (Number(dim.score) / 5 * 100) : 0;
    var sc = scoreClass(dim.score);
    var hasDetail = dimHasDetail(dim);
    h += '<div class="eval-dim' + (hasDetail ? ' eval-dim--clickable' : '') + '" data-idx="' + i + '">';
    h += '<div class="eval-dim-top">';
    h += '<span class="eval-dim-label">' + dim.label + '</span>';
    h += '<span class="eval-dim-score ' + sc + '">' + fmtScoreOutOf5(dim.score) + '</span>';
    h += '</div>';
    h += '<div class="eval-dim-bar"><div class="eval-dim-bar-fill ' + sc + '" style="width:' + pct.toFixed(1) + '%"></div></div>';
    // Per-dim extra one-liner
    if (dim.support_rate != null && dim.total_claims != null) {
      h += '<div class="eval-dim-extra">Claims supported: <strong>' + dim.supported + '/' + dim.total_claims + '</strong> (' + (dim.support_rate * 100).toFixed(0) + '%)</div>';
    } else if (dim.pass_rate != null && dim.total != null) {
      h += '<div class="eval-dim-extra">Pass rate: <strong>' + dim.passed + '/' + dim.total + '</strong> (' + (dim.pass_rate * 100).toFixed(0) + '%)</div>';
    } else if (dim.pass_rate != null) {
      h += '<div class="eval-dim-extra">Pass rate: <strong>' + (dim.pass_rate * 100).toFixed(0) + '%</strong></div>';
    }
    h += '</div>';
  });
  h += '</div>';

  // Detail accordion
  ev.rubric.forEach(function (dim, i) {
    if (!dimHasDetail(dim)) return;
    h += '<div class="eval-detail" data-idx="' + i + '" style="display:none">';
    h += '<div class="eval-detail-head"><span class="eval-detail-label">' + dim.label + '</span>';
    h += '<span class="eval-detail-score ' + scoreClass(dim.score) + '">' + fmtScoreOutOf5(dim.score) + ' / 5</span></div>';

    // Reason text
    if (dim.reason) {
      h += '<p class="eval-detail-reason">' + escapeHtml(dim.reason) + '</p>';
    }

    // Mobile / Tablet sub-rubrics (responsiveness)
    ['mobile', 'tablet'].forEach(function (sub) {
      var s = dim[sub];
      if (!s || typeof s !== 'object') return;
      var ssc = scoreClass(s.score);
      h += '<div class="eval-sub-block">';
      h += '<div class="eval-sub-head"><span class="eval-sub-label">' + sub.charAt(0).toUpperCase() + sub.slice(1) + '</span>';
      if (s.score != null) h += '<span class="eval-sub-score ' + ssc + '">' + fmtScoreOutOf5(s.score) + ' / 5</span>';
      h += '</div>';
      if (s.reason) h += '<p class="eval-sub-reason">' + escapeHtml(s.reason) + '</p>';
      h += '</div>';
    });

    // Per-slide / per-page breakdown
    var perItems = dim.per_slide || dim.per_page;
    if (perItems && perItems.length) {
      var itemLabel = dim.per_slide ? 'Slide' : 'Page';
      h += '<div class="eval-perslide">';
      perItems.forEach(function (ps, idx) {
        var psc = scoreClass(ps.score);
        h += '<div class="eval-perslide-item">';
        h += '<div class="eval-perslide-head"><span class="eval-perslide-idx">' + itemLabel + ' ' + (idx + 1) + '</span>';
        h += '<span class="eval-perslide-score ' + psc + '">' + fmtScoreOutOf5(ps.score) + '</span></div>';
        if (ps.reason) h += '<p class="eval-perslide-reason">' + escapeHtml(ps.reason) + '</p>';
        h += '</div>';
      });
      h += '</div>';
    }

    // Pass/fail details — handles multiple shapes (navigation, interactions,
    // data_display, data_accuracy metrics, fidelity claims)
    if (dim.details && dim.details.length) {
      h += '<div class="eval-checks">';
      dim.details.forEach(function (det) {
        var passed = det.result === 'pass'
          || det.content_found === true
          || det.match === true
          || det.supported === true;
        var failed = det.result === 'fail'
          || det.match === false
          || det.supported === false
          || det.content_found === false;
        var cls = passed ? 'pass' : failed ? 'fail' : 'partial';
        var icon = passed ? '✓' : failed ? '✕' : '·';
        h += '<div class="eval-check eval-check--' + cls + '">';
        h += '<span class="eval-check-icon">' + icon + '</span>';
        h += '<div class="eval-check-body">';

        if (det.from && det.to) {
          // navigation
          h += '<div class="eval-check-title">' + escapeHtml(det.from) + ' → ' + escapeHtml(det.to) + '</div>';
          if (det.trigger) h += '<div class="eval-check-sub">' + escapeHtml(det.trigger) + '</div>';
        } else if (det.metric) {
          // data_accuracy (report) — metric value check
          h += '<div class="eval-check-title">' + escapeHtml(det.metric) + '</div>';
          var values = '<span class="eval-check-num">' + escapeHtml(String(det.report_value)) + '</span>';
          if (det.expected_value !== undefined && det.expected_value !== det.report_value) {
            values += ' <span class="eval-check-arrow">vs</span> <span class="eval-check-num eval-check-num--expected">' + escapeHtml(String(det.expected_value)) + '</span>';
          } else if (det.expected_value !== undefined) {
            values += ' <span class="eval-check-arrow">=</span> <span class="eval-check-num eval-check-num--expected">' + escapeHtml(String(det.expected_value)) + '</span>';
          }
          if (det.tolerance) values += ' <span class="eval-check-tag">' + escapeHtml(det.tolerance) + '</span>';
          h += '<div class="eval-check-sub">' + values + '</div>';
          if (det.note) h += '<div class="eval-check-note">' + escapeHtml(det.note) + '</div>';
        } else if (det.claim) {
          // fidelity (report) — claim verification
          h += '<div class="eval-check-title eval-check-title--claim">' + escapeHtml(det.claim) + '</div>';
          if (det.evidence) h += '<div class="eval-check-note"><span class="eval-evidence-label">Evidence:</span> ' + escapeHtml(det.evidence) + '</div>';
        } else if (det.id) {
          // interactions / data_display
          h += '<div class="eval-check-title">' + escapeHtml(det.id) + '</div>';
          if (det.source_ref_found !== undefined || det.source_ref_missing !== undefined) {
            // Data Display: reference coverage
            var refFound = (det.source_ref_found || []).length;
            var refMissing = (det.source_ref_missing || []).length;
            var refTotal = refFound + refMissing;
            if (refTotal > 0) {
              var pct = (refFound / refTotal * 100).toFixed(0);
              h += '<div class="eval-check-sub">Reference coverage: <strong>' + refFound + ' / ' + refTotal + '</strong> items (' + pct + '%)</div>';
            }
            if (det.found_items && det.found_items.length) {
              h += '<div class="eval-check-sub eval-check-sub--muted">Output rendered ' + det.found_items.length + ' item' + (det.found_items.length === 1 ? '' : 's') + '</div>';
            }
          } else if (det.found_items) {
            h += '<div class="eval-check-sub">Output: ' + det.found_items.length + ' item' + (det.found_items.length === 1 ? '' : 's') + '</div>';
          }
        }
        // Missing items list (covers both source_ref_missing and missing_items)
        var missingList = det.source_ref_missing && det.source_ref_missing.length
          ? det.source_ref_missing : det.missing_items;
        if (missingList && missingList.length) {
          h += '<div class="eval-check-missing">Missing from output: ' + missingList.slice(0, 6).map(escapeHtml).join(', ') + (missingList.length > 6 ? '…' : '') + '</div>';
        }
        h += '</div></div>';
      });
      h += '</div>';
    }

    // Data accuracy: traceable / untraceable claim lists
    if (dim.traceable && dim.traceable.length) {
      h += renderClaimList('Traceable Claims', dim.traceable, 'pass');
    }
    if (dim.untraceable && dim.untraceable.length) {
      h += renderClaimList('Untraceable Claims', dim.untraceable, 'fail');
    }

    h += '</div>';
  });

  h += '</div>';
  return h;
}

function escapeHtml(s) {
  if (s == null) return "";
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderClaimList(title, items, kind) {
  if (!items || !items.length) return "";
  var MAX = 12;
  var h = '<div class="eval-claims eval-claims--' + kind + '">';
  h += '<div class="eval-claims-head">' + title + ' <span class="eval-claims-count">' + items.length + '</span></div>';
  h += '<div class="claim-cards">';
  items.slice(0, MAX).forEach(function (c) {
    if (typeof c === 'string') {
      h += '<div class="claim-card"><div class="claim-body">' + escapeHtml(c) + '</div></div>';
      return;
    }
    var data = c.data || c.claim || c.text || "";
    var note = c.note || c.reason || "";
    var lineage = c.lineage;
    var steps = c.trajectory_steps;
    h += '<div class="claim-card">';
    h += '<div class="claim-head">';
    if (data) h += '<div class="claim-data">' + escapeHtml(data) + '</div>';
    h += '<div class="claim-meta">';
    if (lineage) h += '<span class="claim-tag claim-tag--' + escapeHtml(lineage) + '">' + escapeHtml(lineage) + '</span>';
    if (Array.isArray(steps) && steps.length) {
      h += '<span class="claim-steps">';
      h += '<span class="claim-steps-label">steps</span>';
      steps.forEach(function (s) { h += '<span class="claim-step">' + s + '</span>'; });
      h += '</span>';
    }
    h += '</div></div>';
    if (note) h += '<div class="claim-body">' + escapeHtml(note) + '</div>';
    h += '</div>';
  });
  if (items.length > MAX) {
    h += '<div class="claim-more">+ ' + (items.length - MAX) + ' more</div>';
  }
  h += '</div></div>';
  return h;
}

function buildChecklist(checklist) {
  if (!checklist || typeof checklist !== "object") return "";
  var keys = Object.keys(checklist);
  if (!keys.length) return "";
  var h = '<h2 class="section-title section-title--xs" style="margin-top:32px">Evaluation Checklist</h2>';
  h += '<div class="checklist-section">';
  keys.forEach(function (group) {
    var items = checklist[group];
    if (!Array.isArray(items) || !items.length) return;
    h += '<div class="checklist-group">';
    h += '<div class="checklist-group-title">' + group.replace(/_/g, " ") + ' (' + items.length + ')</div>';
    h += '<ul class="checklist-items">';
    items.forEach(function (item) {
      h += '<li class="checklist-item"><span class="checklist-id">' + item.id + '</span><span>' + item.label + '</span></li>';
    });
    h += '</ul></div>';
  });
  h += '</div>';
  return h;
}

function stripTaskPrefix(variant, taskType) {
  var prefixes = {
    "data-visualization": "data-viz-",
    "poster-generation": "poster-generation-",
    "ppt-generation": "ppt-generation-",
    "report-generation": "report-generation-",
    "web-design": "web-design-"
  };
  var p = prefixes[taskType];
  if (p && variant.indexOf(p) === 0) return variant.substring(p.length);
  return variant;
}

(async function () {
  var container = document.getElementById("case-content");
  try {
    var taskType = container.dataset.task;
    var caseId = container.dataset.case;
    var dataSrc = container.dataset.src;
    var basePath = "..";

    await loadModels(basePath);
    var data = await fetchJSON(dataSrc);

    var title = data.title || caseId;
    var titleEl = document.getElementById("page-title");
    if (titleEl) titleEl.textContent = title;
    document.title = title + " | OpenSkillEval";

    // Only keep results that have eval data (drop unevaluated combos entirely)
    var results = (data.results || []).filter(function (r) {
      return r && r.eval && r.eval.rubric && r.eval.rubric.length;
    });
    results.forEach(function (r) {
      if (r.artifact_path) r._resolved = resolveArtifactPath(dataSrc, r.artifact_path);
      if (r.trajectory_path) r._resolvedTraj = resolveArtifactPath(dataSrc, r.trajectory_path);
    });

    if (!results.length) {
      container.innerHTML = '<div class="no-artifact" style="padding:60px 20px;border:1px solid var(--border-light);border-radius:12px;background:var(--surface)">No evaluation results available for this case yet.</div>';
      return;
    }

    // Canonical model display order (used for both picker bars and dropdowns)
    var MODEL_DISPLAY_ORDER = [
      "claude-code-Claude-Opus-4.6",
      "claude-code-Claude-Sonnet-4.6",
      "gemini-cli-google-Gemini-3.1-Pro-Preview",
      "codex-GPT-5.5",
      "codex-GPT-5.2",
      "codex-GPT-5.3-codex",
      "claude-code-deepseek-DeepSeek-V4",
      "claude-code-glm-GLM-5.1",
      "kimi-cli-moonshot-kimi-k2.6",
      "claude-code-minimax-MiniMax-m2.7",
    ];

    // Collect unique variants and models in order
    var variantOrder = [];
    var presentModels = new Set();
    results.forEach(function (r) {
      if (variantOrder.indexOf(r.variant) === -1) variantOrder.push(r.variant);
      presentModels.add(r.model);
    });
    // Reorder models by canonical order, then append any unknown ones
    var modelOrder = MODEL_DISPLAY_ORDER.filter(function (m) { return presentModels.has(m); });
    presentModels.forEach(function (m) { if (modelOrder.indexOf(m) === -1) modelOrder.push(m); });

    // Build lookup: resultMap[variant][model] = result
    var resultMap = {};
    results.forEach(function (r) {
      if (!resultMap[r.variant]) resultMap[r.variant] = {};
      resultMap[r.variant][r.model] = r;
    });

    var html = "";
    // brief intentionally hidden — raw markdown wasn't presentation-ready

    // Split input_files: instruction.md goes on top (always rendered),
    // instruction_force.md is hidden entirely, others become tabs
    var instructionFile = null;
    var otherFiles = [];
    if (data.input_files && data.input_files.length) {
      data.input_files.forEach(function (f) {
        if (f.name === "instruction.md") instructionFile = f;
        else if (f.name === "instruction_force.md") return;
        else otherFiles.push(f);
      });
    }

    var hasDetails = instructionFile || otherFiles.length || data.instruction
      || (data.ref_docs && data.ref_docs.length);
    if (hasDetails) {
      html += '<div class="task-details task-details--open"><div class="task-details-header">';
      html += '<svg class="task-details-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>';
      html += '<h3 class="task-details-title">Task Details</h3></div>';
      html += '<div class="task-details-body">';

      // Instruction block — always visible, rendered as a beautiful markdown card
      if (instructionFile) {
        html += '<div class="instruction-block">';
        html += '<div class="instruction-label"><span class="instruction-dot"></span>Instruction</div>';
        html += '<div class="instruction-rendered markdown-body" id="instruction-rendered"><p class="loading">Loading instruction…</p></div>';
        html += '</div>';
      } else if (data.instruction) {
        var inst = data.instruction
          .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
          .replace(/^## (.+)$/gm, '<strong>$1</strong>')
          .replace(/^# (.+)$/gm, '<strong>$1</strong>')
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/`([^`]+)`/g, '<code>$1</code>')
          .replace(/\n{2,}/g, '</p><p>')
          .replace(/\n/g, '<br>');
        html += '<div class="instruction-block">';
        html += '<div class="instruction-label"><span class="instruction-dot"></span>Instruction</div>';
        html += '<div class="instruction-rendered markdown-body"><p>' + inst + '</p></div>';
        html += '</div>';
      }

      // Other files — tabs below
      if (otherFiles.length) {
        html += '<div class="aux-files-block">';
        html += '<div class="aux-files-label">Reference Materials</div>';
        html += '<div class="input-files-header"><div class="input-files-tabs" id="showcase-input-tabs">';
        otherFiles.forEach(function (file, i) {
          var ext = file.name.split('.').pop();
          html += '<button class="input-file-tab" data-idx="' + i + '">'
            + '<span class="file-ext file-ext--' + ext + '">' + ext + '</span>'
            + '<span class="file-name">' + file.name + '</span></button>';
        });
        html += '</div><button class="md-toggle-btn" id="showcase-md-toggle" style="display:none" title="Toggle source/rendered"><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/></svg></button></div>';
        html += '<div class="input-file-body" id="showcase-input-body"></div>';
        html += '</div>';
      }

      if (data.ref_docs && data.ref_docs.length) {
        html += '<h4 class="task-files-heading">Reference Documents</h4>';
        data.ref_docs.forEach(function (doc) {
          var icon = doc.name.endsWith(".json") ? "\u{1F4CB}" : "\u{1F4DD}";
          html += '<details class="ref-doc"><summary class="ref-doc-toggle">' + icon + ' ' + doc.name + '</summary>';
          var escaped = doc.content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          html += '<pre class="ref-doc-content"><code>' + escaped + '</code></pre></details>';
        });
      }
      html += '</div></div>';
    }

    // Output Preview — wrapped in a card to match Task Details
    html += '<div class="output-preview-card">';
    html += '<div class="output-preview-header">';
    html += '<svg class="output-preview-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>';
    html += '<h3 class="output-preview-title">Output Preview</h3>';
    html += '</div>';
    html += '<div class="output-preview-body">';

    html += '<div class="picker-wrapper">';

    // Skill row
    html += '<div class="picker-row">';
    html += '<div class="picker-row-label">Skill</div>';
    html += '<div class="picker-bar" id="variant-pills">';
    variantOrder.forEach(function (v, i) {
      var short = stripTaskPrefix(v, taskType);
      html += '<button class="picker-pill' + (i === 0 ? ' active' : '') + '" data-variant="' + v + '">' + short + '</button>';
    });
    html += '</div></div>';

    // Model row
    html += '<div class="picker-row">';
    html += '<div class="picker-row-label">Model</div>';
    html += '<div class="picker-bar" id="model-pills">';
    modelOrder.forEach(function (m, i) {
      var d = modelDisplay(m);
      // Resolve mono icon to absolute URL so the CSS mask doesn't try to resolve relative to the stylesheet
      var iconUrl = d.model_icon ? new URL("../" + d.model_icon, document.baseURI).href : '';
      var iconHTML = iconUrl ? '<span class="picker-pill-icon" style="--icon-url:url(\'' + iconUrl + '\')"></span>' : '';
      html += '<button class="picker-pill' + (i === 0 ? ' active' : '') + '" data-model="' + m + '">'
        + iconHTML + '<span>' + d.name + '</span></button>';
    });
    html += '</div></div>';

    html += '</div>';

    // Preview panel — split layout with optional trajectory
    html += '<div class="preview-split" id="preview-split">';
    html += '<div class="preview-split-left" id="preview-left">';
    html += '<div class="comparison-panel" id="panel-a">';
    html += '<div class="panel-output" id="output-a"></div>';
    html += '<div id="meta-a"></div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="preview-split-right hidden" id="preview-right">';
    html += '<div class="traj-inline-panel">';
    html += '<div class="traj-inline-body" id="traj-inline-body"></div>';
    html += '<button class="traj-inline-close" id="traj-inline-close">&times;</button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    html += '</div></div>';  // close output-preview-body, output-preview-card

    container.innerHTML = html;

    // Auto-load instruction.md at top of Task Details
    if (instructionFile) {
      (function () {
        var target = document.getElementById("instruction-rendered");
        if (!target) return;
        fetch(instructionFile.path).then(function (r) { return r.ok ? r.text() : Promise.reject(); }).then(function (text) {
          if (typeof marked !== "undefined") {
            target.innerHTML = rebaseMarkdownImages(marked.parse(text), instructionFile.path);
          } else {
            target.innerHTML = '<pre>' + text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</pre>';
          }
        }).catch(function () {
          target.innerHTML = '<p class="loading-error">Failed to load instruction</p>';
        });
      })();
    }

    // Wire reference-material tabs (the non-instruction files)
    (function () {
      var tabsEl = document.getElementById("showcase-input-tabs");
      var bodyEl = document.getElementById("showcase-input-body");
      if (!tabsEl || !bodyEl || !otherFiles.length) return;
      var activeIdx = null;

      function loadFile(idx) {
        var file = otherFiles[idx];
        var isCsv = file.name.endsWith('.csv');
        var isMd = file.name.endsWith('.md');
        var isJson = file.name.endsWith('.json');
        var mdToggleBtn = document.getElementById('showcase-md-toggle');
        if (file.type === "image") {
          mdToggleBtn.style.display = 'none';
          bodyEl.innerHTML = '<img src="' + file.path + '" alt="' + file.name + '" style="max-width:100%;border-radius:4px;cursor:zoom-in" onclick="openLightbox(this.src)">';
          return;
        }
        if (!file.path) return;
        bodyEl.innerHTML = '<div class="file-loading">Loading…</div>';
        mdToggleBtn.style.display = 'none';
        fetch(file.path).then(function (r) { return r.ok ? r.text() : Promise.reject(); }).then(function (text) {
          if (activeIdx !== idx) return;
          if (isMd && typeof marked !== "undefined") {
            var rendered = rebaseMarkdownImages(marked.parse(text), file.path);
            var escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            var showRaw = false;
            bodyEl.innerHTML = '<div class="md-rendered markdown-body">' + rendered + '</div>'
              + '<pre class="md-source code-block">' + escaped + '</pre>';
            mdToggleBtn.style.display = '';
            mdToggleBtn.classList.remove('active');
            var renderedEl = bodyEl.querySelector('.md-rendered');
            var sourceEl = bodyEl.querySelector('.md-source');
            sourceEl.style.display = 'none';
            mdToggleBtn.onclick = function () {
              showRaw = !showRaw;
              renderedEl.style.display = showRaw ? 'none' : '';
              sourceEl.style.display = showRaw ? '' : 'none';
              mdToggleBtn.classList.toggle('active', showRaw);
            };
          } else if (isCsv) {
            bodyEl.innerHTML = csvToTable(text);
          } else if (isJson) {
            bodyEl.innerHTML = renderJsonViewer(text);
          } else {
            bodyEl.innerHTML = '<pre class="code-block">' + text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</pre>';
          }
        }).catch(function () {
          if (activeIdx === idx) bodyEl.innerHTML = '<div class="file-loading file-loading--error">Failed to load</div>';
        });
      }

      tabsEl.addEventListener("click", function (e) {
        var btn = e.target.closest(".input-file-tab");
        if (!btn) return;
        var idx = parseInt(btn.dataset.idx);
        if (activeIdx === idx) {
          btn.classList.remove("active");
          bodyEl.style.display = "none";
          activeIdx = null;
          return;
        }
        tabsEl.querySelectorAll(".input-file-tab").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        activeIdx = idx;
        bodyEl.style.display = "block";
        loadFile(idx);
      });
    })();

    // Wire two-tier picker — dynamic re-render: only show combinations with results
    var activeVariant = variantOrder[0];
    var activeModel = modelOrder[0];

    function hasResult(v, m) { return !!((resultMap[v] || {})[m]); }

    function renderVariantBar() {
      // Skills that have a result for the active model
      var avail = variantOrder.filter(function (v) { return hasResult(v, activeModel); });
      // If active variant no longer in list, fall back to first available
      if (avail.indexOf(activeVariant) === -1 && avail.length) activeVariant = avail[0];
      document.getElementById("variant-pills").innerHTML = avail.map(function (v) {
        var short = stripTaskPrefix(v, taskType);
        var cls = "picker-pill" + (v === activeVariant ? " active" : "");
        return '<button class="' + cls + '" data-variant="' + v + '">' + short + '</button>';
      }).join("");
    }

    function renderModelBar() {
      // Models that have a result for the active variant, sorted by canonical order
      var avail = modelOrder.filter(function (m) { return hasResult(activeVariant, m); });
      if (avail.indexOf(activeModel) === -1 && avail.length) activeModel = avail[0];
      document.getElementById("model-pills").innerHTML = avail.map(function (m) {
        var d = modelDisplay(m);
        var cls = "picker-pill" + (m === activeModel ? " active" : "");
        var iconUrl = d.model_icon ? new URL("../" + d.model_icon, document.baseURI).href : '';
        var iconHTML = iconUrl ? '<span class="picker-pill-icon" style="--icon-url:url(\'' + iconUrl + '\')"></span>' : '';
        return '<button class="' + cls + '" data-model="' + m + '">' + iconHTML + '<span>' + d.name + '</span></button>';
      }).join("");
    }

    function updatePreview() {
      renderVariantBar();
      renderModelBar();
      var outputEl = document.getElementById("output-a");
      var metaEl = document.getElementById("meta-a");
      var r = (resultMap[activeVariant] || {})[activeModel];
      if (r) {
        outputEl.innerHTML = renderPanelOutput(r, taskType);
        metaEl.innerHTML = buildPanelMeta(r);
        wireEvalBreakdown(metaEl);
      } else {
        outputEl.innerHTML = '<div class="no-artifact">No result for this combination</div>';
        metaEl.innerHTML = '';
      }
    }

    function wireEvalBreakdown(root) {
      var dims = root.querySelectorAll(".eval-dim--clickable");
      var details = root.querySelectorAll(".eval-detail");
      dims.forEach(function (dim) {
        dim.addEventListener("click", function () {
          var idx = dim.dataset.idx;
          var isOpen = dim.classList.contains("active");
          dims.forEach(function (d) { d.classList.remove("active"); });
          details.forEach(function (d) { d.style.display = "none"; });
          if (!isOpen) {
            dim.classList.add("active");
            details.forEach(function (d) {
              if (d.dataset.idx === idx) d.style.display = "block";
            });
          }
        });
      });
    }

    document.getElementById("variant-pills").addEventListener("click", function (e) {
      var btn = e.target.closest(".picker-pill");
      if (!btn) return;
      activeVariant = btn.dataset.variant;
      updatePreview();
    });

    document.getElementById("model-pills").addEventListener("click", function (e) {
      var btn = e.target.closest(".picker-pill");
      if (!btn) return;
      activeModel = btn.dataset.model;
      updatePreview();
    });

    updatePreview();

    // Helper: sync trajectory panel height with left panel
    function syncTrajHeight() {
      var leftEl = document.getElementById("preview-left");
      var trajPanel = document.querySelector(".traj-inline-panel");
      if (leftEl && trajPanel) {
        trajPanel.style.height = leftEl.offsetHeight + "px";
      }
    }

    // Helper: close trajectory panel and reset button
    function closeTrajPanel() {
      var splitEl = document.getElementById("preview-split");
      var rightEl = document.getElementById("preview-right");
      splitEl.classList.remove("split-active");
      rightEl.classList.add("hidden");
      // Reset button text
      var activeBtn = container.querySelector(".traj-inline-btn.active");
      if (activeBtn) {
        activeBtn.classList.remove("active");
        activeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>View Trajectory';
      }
    }

    // Wire trajectory inline view (toggle)
    container.addEventListener("click", function (e) {
      var btn = e.target.closest(".traj-inline-btn");
      if (!btn) return;
      e.preventDefault();

      // If already open, close it
      if (btn.classList.contains("active")) {
        closeTrajPanel();
        return;
      }

      var trajUrl = btn.dataset.traj;
      var agentName = btn.dataset.agent;
      var modelName = btn.dataset.model;
      if (!trajUrl) return;

      var splitEl = document.getElementById("preview-split");
      var rightEl = document.getElementById("preview-right");
      var bodyEl = document.getElementById("traj-inline-body");

      splitEl.classList.add("split-active");
      rightEl.classList.remove("hidden");
      bodyEl.innerHTML = '<p class="loading">Loading trajectory...</p>';

      // Sync height after layout settles
      requestAnimationFrame(function() { requestAnimationFrame(syncTrajHeight); });

      // Mark button as active and change text
      btn.classList.add("active");
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>Close Trajectory';

      if (window.TrajectoryViewer && TrajectoryViewer._renderInline) {
        TrajectoryViewer._renderInline(trajUrl, bodyEl);
      } else {
        fetch(trajUrl).then(function(res) { return res.json(); }).then(function(data) {
          if (window.TrajectoryViewer) {
            TrajectoryViewer.open(trajUrl, agentName, modelName);
            closeTrajPanel();
          }
        }).catch(function(err) {
          bodyEl.innerHTML = '<p style="color:var(--danger)">Failed: ' + err.message + '</p>';
        });
      }
    });

    // Wire close button (×) for inline trajectory
    document.getElementById("traj-inline-close").addEventListener("click", closeTrajPanel);

    // Keep trajectory height in sync on resize
    window.addEventListener("resize", function () {
      if (document.getElementById("preview-split").classList.contains("split-active")) {
        syncTrajHeight();
      }
    });

  } catch (err) {
    container.innerHTML = '<p style="color:red;padding:20px">Error: ' + err.message + '<br><pre>' + err.stack + '</pre></p>';
    console.error(err);
  }
})();

function renderJsonViewer(text) {
  var parsed;
  try { parsed = JSON.parse(text); }
  catch (e) {
    return '<pre class="code-block">' + text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</pre>';
  }
  var pretty = JSON.stringify(parsed, null, 2);
  var escaped = pretty.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  var highlighted = escaped.replace(
    /("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
    function (match) {
      var cls = "json-num";
      if (/^"/.test(match)) {
        cls = /:$/.test(match) ? "json-key" : "json-str";
      } else if (/true|false/.test(match)) {
        cls = "json-bool";
      } else if (/null/.test(match)) {
        cls = "json-null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
  var lineCount = pretty.split("\n").length;
  var gutter = [];
  for (var i = 1; i <= lineCount; i++) gutter.push(i);
  return '<div class="json-viewer">'
    + '<div class="json-toolbar"><span class="json-toolbar-label">JSON</span>'
    + '<button class="json-copy-btn" onclick="(function(b){navigator.clipboard.writeText(b.parentNode.parentNode.querySelector(\'.json-code\').innerText);b.textContent=\'Copied\';setTimeout(function(){b.textContent=\'Copy\'},1200);})(this)">Copy</button></div>'
    + '<div class="json-body">'
    + '<div class="json-gutter">' + gutter.join("\n") + '</div>'
    + '<pre class="json-code">' + highlighted + '</pre>'
    + '</div></div>';
}

function csvToTable(text) {
  var lines = text.trim().split("\n");
  if (lines.length === 0) return "<pre>(empty)</pre>";
  var displayLines = lines;

  function parseCsvLine(line) {
    var cells = [], current = "", inQuotes = false;
    for (var i = 0; i < line.length; i++) {
      var ch = line[i];
      if (inQuotes) {
        if (ch === '"' && line[i + 1] === '"') { current += '"'; i++; }
        else if (ch === '"') inQuotes = false;
        else current += ch;
      } else {
        if (ch === '"') inQuotes = true;
        else if (ch === ',') { cells.push(current); current = ""; }
        else current += ch;
      }
    }
    cells.push(current);
    return cells;
  }

  var header = parseCsvLine(displayLines[0]);
  var html = '<div class="csv-table-wrap"><table class="csv-table"><thead><tr>';
  header.forEach(function (h) { html += "<th>" + h.replace(/&/g,"&amp;").replace(/</g,"&lt;") + "</th>"; });
  html += "</tr></thead><tbody>";
  for (var i = 1; i < displayLines.length; i++) {
    var cells = parseCsvLine(displayLines[i]);
    html += "<tr>";
    cells.forEach(function (c) { html += "<td>" + c.replace(/&/g,"&amp;").replace(/</g,"&lt;") + "</td>"; });
    html += "</tr>";
  }
  html += "</tbody></table></div>";
  return html;
}
