/* SkillEval — Leaderboard page logic */

(async function () {
  await loadModels(".");
  const lb = await fetchJSON("data/leaderboard.json");
  const ts = await fetchJSON("data/task-summary.json");

  const tasks = lb.tasks;
  let currentMode = "all";
  let sortCol = "overall";
  let sortAsc = false;

  function renderTable() {
    const headRow = document.getElementById("lb-head");
    const cols = [
      { key: "rank", label: "#" },
      { key: "model", label: "Model" },
      ...tasks.map(t => ({ key: t, label: (ts[t] || {}).label || t })),
      { key: "overall", label: "Overall" },
      { key: "bar", label: "Performance" },
    ];

    headRow.innerHTML = cols.map(c => {
      if (c.key === "bar") return `<th class="bar-cell">${c.label}</th>`;
      const arrow = sortCol === c.key ? (sortAsc ? " ▲" : " ▼") : "";
      return `<th data-sort="${c.key}">${c.label}<span class="sort-arrow">${arrow}</span></th>`;
    }).join("");

    headRow.querySelectorAll("th[data-sort]").forEach(th => {
      th.addEventListener("click", () => {
        const col = th.dataset.sort;
        if (col === "model") return;
        if (sortCol === col) sortAsc = !sortAsc;
        else { sortCol = col; sortAsc = false; }
        renderTable();
      });
    });

    const models = lb.models.map(m => {
      const src = currentMode === "all" ? m : (m[currentMode] || {});
      const scores = src.scores || {};
      const overall = src.overall;
      const nResults = src.n_results || m.n_results;
      return { ...m, _scores: scores, _overall: overall, _nResults: nResults };
    });

    models.sort((a, b) => {
      let va = sortCol === "overall" ? a._overall : a._scores[sortCol];
      let vb = sortCol === "overall" ? b._overall : b._scores[sortCol];
      if (va == null) va = -1;
      if (vb == null) vb = -1;
      return sortAsc ? va - vb : vb - va;
    });

    const tbody = document.getElementById("lb-body");
    tbody.innerHTML = models.map((m, i) => {
      // Prefer the latest display from models.json (which carries icons) over leaderboard.json's snapshot
      const d = (typeof modelDisplay === "function") ? modelDisplay(m.model_id) : m.display;
      const colorIcon = d.model_icon_color || d.model_icon;
      const agentCls = ({"Claude Code":"claude","Codex":"codex","Gemini CLI":"gemini","Kimi CLI":"kimi"})[d.agent] || "";
      const modelIcon = colorIcon
        ? `<img class="model-cell-brand" src="${colorIcon}" alt="">`
        : '';
      const agentIcon = d.agent_icon
        ? `<span class="agent-chip ${agentCls}" title="${d.agent}"><img class="agent-chip-icon" src="${d.agent_icon}" alt=""><span class="agent-chip-name">${d.agent}</span></span>`
        : `<span class="agent-badge ${agentCls}">${d.agent}</span>`;
      const taskCells = tasks.map(t => {
        const s = m._scores[t];
        return `<td class="score-cell ${scoreClass(s)}">${fmtScore(s)}</td>`;
      }).join("");
      const pct = m._overall ? m._overall / 5 * 100 : 0;
      // Warm autumn palette: deep red (best) → pale green (worst), indexed by overall rank
      const autumnPalette = ['#c7522a','#cb6036','#cf6e41','#d68a58','#dea66f','#e5c185','#f0daa5','#fbf2c4','#dae0b8','#b8cdab'];
      const rankIdx = Math.min(autumnPalette.length - 1, (m.rank || i + 1) - 1);
      const barColor = autumnPalette[rankIdx];
      return `<tr>
        <td>${i + 1}</td>
        <td><div class="model-cell">${modelIcon}<span class="model-name">${d.name}</span>${agentIcon}</div></td>
        ${taskCells}
        <td class="score-cell ${scoreClass(m._overall)}"><strong>${fmtScore(m._overall)}</strong></td>
        <td class="bar-cell"><div class="bar-container"><div class="bar-fill" style="width:${pct}%;background:${barColor}"></div></div></td>
      </tr>`;
    }).join("");
  }

  document.querySelectorAll(".table-controls .toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".table-controls .toggle").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentMode = btn.dataset.mode;
      renderTable();
    });
  });

  renderTable();

  // Warm autumn palette by rank (best → deepest) — also used by the token bars below
  const autumnPalette = ['#c7522a','#cb6036','#cf6e41','#d68a58','#dea66f','#e5c185','#f0daa5','#fbf2c4','#dae0b8','#b8cdab'];

  // ──────────────────────────────────────────────────────────────────
  // Resource Consumption — stacked bar charts in Tokens or Cost mode.
  //
  // Toggle in the page header switches all 5 task charts at once.
  //   - Tokens mode: per-task scale, K/M label on bars.
  //   - Cost mode:   shared global scale across all tasks, no dollar
  //                  labels (per design — relative comparison only).
  // ──────────────────────────────────────────────────────────────────
  const tokenUsage = await fetchJSON("data/token-usage.json");
  const pricing = await fetchJSON("data/model-pricing.json").catch(() => ({}));
  const tokenTaskOrder = ["data-visualization", "poster-generation", "ppt-generation", "report-generation", "web-design"];
  const tokenContainer = document.getElementById("tokens-charts");
  let tokenCharts = [];

  const formatTokens = (v) => v >= 1_000_000 ? (v / 1_000_000).toFixed(2) + "M"
                            : v >= 1000      ? (v / 1000).toFixed(0) + "K"
                            : String(v);
  const TOKEN_COMPONENTS = [
    { key: "prompt",     name: "Prompt (uncached input)", color: "#c7522a", costKey: "input"  },
    { key: "completion", name: "Completion (output)",     color: "#d68a58", costKey: "output" },
    { key: "cache",      name: "Cache (cached input)",    color: "#f0daa5", costKey: "cache"  },
  ];

  function buildEntries(taskKey, mode) {
    const taskData = tokenUsage[taskKey] || {};
    return lb.models
      .map(m => {
        const d = (typeof modelDisplay === "function") ? modelDisplay(m.model_id) : m.display;
        const tok = taskData[m.model_id] || {};
        const price = (pricing && pricing[m.model_id]) || null;
        const useCost = mode === "cost" && price;
        // Convert each component to cost when in cost mode (USD = tokens × price / 1M)
        const factor = (k) => useCost ? (price[TOKEN_COMPONENTS.find(c => c.key === k).costKey] || 0) / 1_000_000 : 1;
        const prompt     = (tok.prompt     || 0) * factor("prompt");
        const completion = (tok.completion || 0) * factor("completion");
        const cache      = (tok.cache      || 0) * factor("cache");
        return {
          id: m.model_id,
          name: d.name,
          color: d.color,
          icon: d.model_icon_color || d.model_icon,
          prompt, completion, cache,
          total: prompt + completion + cache,
          hasPrice: !!price,
        };
      })
      .filter(e => mode === "cost" ? (e.hasPrice && e.total > 0) : e.total > 0)
      .sort((a, b) => b.total - a.total);
  }

  function renderResourceCharts(mode) {
    // tear down previous charts
    tokenCharts.forEach(c => c.dispose());
    tokenCharts = [];
    tokenContainer.innerHTML = "";

    // For cost mode, find a single global max across tasks so they share one scale
    let globalMax = 0;
    if (mode === "cost") {
      for (const t of tokenTaskOrder) {
        const entries = buildEntries(t, mode);
        for (const e of entries) globalMax = Math.max(globalMax, e.total);
      }
    }

    const formatCost = (v) => v >= 1 ? "$" + v.toFixed(2)
                            : v >= 0.01 ? "$" + v.toFixed(3)
                            : "<$0.01";
    const formatVal  = (v) => mode === "cost" ? formatCost(v) : formatTokens(v);

    tokenTaskOrder.forEach((t, taskIdx) => {
      const entries = buildEntries(t, mode);
      if (!entries.length) return;
      const label = (ts[t] || {}).label || t;
      const wrapper = document.createElement("div");
      const chartH = Math.max(240, entries.length * 40 + 80);
      wrapper.style.cssText = "margin-bottom:36px";
      wrapper.innerHTML = `<h3 style="font-size:0.9375rem;font-weight:600;margin-bottom:8px;color:var(--warm-dark)">${label}</h3><div class="chart-container" style="height:${chartH}px"></div>`;
      tokenContainer.appendChild(wrapper);
      const chartEl = wrapper.querySelector(".chart-container");
      const chart = echarts.init(chartEl);
      const reversed = entries.slice().reverse();
      const names = reversed.map(e => e.name);
      const localMax = Math.max(...entries.map(e => e.total));
      const axisMax = mode === "cost" ? globalMax * 1.05 : localMax * 1.18;
      // Per-row rich text spec for icon-after-name labels.
      // DeepSeek's whale glyph reads small at the same nominal size — bump 10%.
      const richSpec = { name: { color: "#4A3F37", fontSize: 14, padding: [0, 6, 0, 0] } };
      reversed.forEach((e, i) => {
        if (!e.icon) return;
        const isDeepSeek = e.id === "claude-code-deepseek-DeepSeek-V4";
        const dim = isDeepSeek ? 20 : 18;
        richSpec["i" + i] = { backgroundColor: { image: e.icon }, width: dim, height: dim, align: "center" };
      });

      const seriesNames = TOKEN_COMPONENTS.map(c =>
        mode === "cost" ? c.name.replace(" (uncached input)", " cost").replace(" (output)", " cost").replace(" (cached input)", " cost") : c.name
      );

      chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          formatter: p => {
            const total = p.reduce((s, x) => s + (x.value || 0), 0);
            if (mode === "cost") {
              const lines = p.map(s => {
                const pct = total ? ((s.value / total) * 100).toFixed(0) : 0;
                return `${s.marker} ${s.seriesName}: ${pct}%`;
              }).join("<br>");
              const rel = globalMax ? (total / globalMax).toFixed(2) : "0";
              return `<strong>${p[0].name}</strong><br>${lines}<br><span style="opacity:0.7">Relative scale: ${rel}× max</span>`;
            }
            const lines = p.map(s => `${s.marker} ${s.seriesName}: ${formatTokens(s.value)}`).join("<br>");
            return `<strong>${p[0].name}</strong><br>${lines}<br><strong>Total: ${formatTokens(total)}</strong>`;
          }
        },
        legend: taskIdx === 0 ? { data: seriesNames, top: -4, textStyle: { color: "#4A3F37", fontSize: 13 }, itemGap: 28 } : { show: false },
        grid: { left: 220, right: mode === "cost" ? 24 : 100, top: taskIdx === 0 ? 36 : 10, bottom: 10 },
        xAxis: { type: "value", min: 0, max: axisMax, show: false },
        yAxis: {
          type: "category",
          data: names,
          axisLabel: {
            fontSize: 14,
            color: "#4A3F37",
            formatter: (val, idx) => reversed[idx] && reversed[idx].icon ? `{name|${val}}{i${idx}|}` : val,
            rich: richSpec,
          },
          axisTick: { show: false },
          axisLine: { show: false }
        },
        series: TOKEN_COMPONENTS.map((comp, ci) => ({
          name: seriesNames[ci],
          type: "bar",
          stack: "res",
          data: reversed.map(e => e[comp.key] || 0),
          itemStyle: { color: comp.color, borderRadius: ci === TOKEN_COMPONENTS.length - 1 ? [0, 3, 3, 0] : 0 },
          barMaxWidth: 28,
          ...(ci === TOKEN_COMPONENTS.length - 1 && mode === "tokens" ? {
            label: {
              show: true,
              position: "right",
              formatter: p => formatTokens(reversed[p.dataIndex].total),
              fontSize: 14, color: "#4A3F37", fontWeight: 500,
            }
          } : {})
        })),
      });
      tokenCharts.push(chart);
    });
  }

  let resourceMode = "tokens";
  const subtitleEl = document.getElementById("resource-subtitle");
  const subtitles = {
    tokens: "Average total tokens per agent (prompt + completion + cache) — one chart per task",
    cost:   "Estimated cost per agent (input + output + cache) — shared scale across tasks, relative comparison only",
  };
  renderResourceCharts(resourceMode);

  document.querySelectorAll(".resource-controls .resource-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const nextMode = btn.dataset.resourceMode;
      if (nextMode === resourceMode) return;
      document.querySelectorAll(".resource-controls .resource-toggle").forEach(b => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });
      resourceMode = nextMode;
      if (subtitleEl) subtitleEl.textContent = subtitles[resourceMode];
      renderResourceCharts(resourceMode);
    });
  });

  window.addEventListener("resize", () => {
    tokenCharts.forEach(c => c.resize());
  });
})();
