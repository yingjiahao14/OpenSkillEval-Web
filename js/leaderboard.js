/* SkillEval — Leaderboard page logic */

(async function () {
  await loadModels(".");
  const lb = await fetchJSON("data/leaderboard.json");
  const ts = await fetchJSON("data/task-summary.json");
  const skills = await fetchJSON("data/skills.json");

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
      const d = m.display;
      const badge = agentBadgeHTML(d.agent);
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
        <td><div class="model-cell"><span class="model-name">${d.name}</span>${badge}</div></td>
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

  // Skills effectiveness — warm autumn palette by rank (best → deepest)
  const autumnPalette = ['#c7522a','#cb6036','#cf6e41','#d68a58','#dea66f','#e5c185','#f0daa5','#fbf2c4','#dae0b8','#b8cdab'];

  const skillCharts = [];
  const container = document.getElementById("skills-charts");
  tasks.forEach((t, ti) => {
    const taskSkills = (skills[t] || []).slice().sort((a, b) => b.avg_score - a.avg_score);
    if (!taskSkills.length) return;
    const label = (ts[t] || {}).label || t;
    const wrapper = document.createElement("div");
    const chartH = Math.max(200, taskSkills.length * 36 + 80);
    wrapper.style.cssText = `margin-bottom:32px`;
    wrapper.innerHTML = `<h3 style="font-size:0.875rem;font-weight:600;margin-bottom:8px;color:var(--warm-dark)">${label}</h3><div class="chart-container" style="height:${chartH}px"></div>`;
    container.appendChild(wrapper);
    const chartEl = wrapper.querySelector(".chart-container");
    const chart = echarts.init(chartEl);
    const names = taskSkills.map(s => s.variant.replace(/^(data-viz|poster-generation|ppt-generation|report-generation|web-design)-/, ""));
    const values = taskSkills.map(s => s.avg_score);
    chart.setOption({
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, formatter: p => p.map(s => `${s.name}: ${s.value.toFixed(2)}`).join("<br>") },
      grid: { left: 200, right: 60, top: 10, bottom: 10 },
      xAxis: { type: "value", min: 2.5, max: 5.05, show: false },
      yAxis: { type: "category", data: names.reverse(), axisLabel: { fontSize: 14, color: "#4A3F37" }, axisTick: { show: false }, axisLine: { show: false } },
      series: [{
        type: "bar",
        data: values.reverse().map((v, idx) => {
          const rankFromBest = (values.length - 1) - idx;
          const c = autumnPalette[Math.min(autumnPalette.length - 1, rankFromBest)];
          return { value: v, itemStyle: { color: c, borderRadius: [0, 3, 3, 0] } };
        }),
        barMaxWidth: 28,
        label: { show: true, position: "right", formatter: p => p.value.toFixed(2), fontSize: 14, color: "#4A3F37", fontWeight: 500 },
      }],
    });
    skillCharts.push(chart);
  });

  // Token usage — one horizontal bar chart per task; bar stacked: prompt + completion + cache
  const tokenUsage = await fetchJSON("data/token-usage.json");
  const tokenTaskOrder = ["data-visualization", "poster-generation", "ppt-generation", "report-generation", "web-design"];
  const tokenContainer = document.getElementById("tokens-charts");
  const tokenCharts = [];

  const formatTokens = (v) => v >= 1_000_000 ? (v / 1_000_000).toFixed(2) + "M"
                            : v >= 1000      ? (v / 1000).toFixed(0) + "K"
                            : String(v);
  const TOKEN_COMPONENTS = [
    { key: "prompt",     name: "Prompt (uncached input)", color: "#c7522a" },
    { key: "completion", name: "Completion (output)",     color: "#d68a58" },
    { key: "cache",      name: "Cache (cached input)",    color: "#f0daa5" },
  ];

  tokenTaskOrder.forEach((t, taskIdx) => {
    const taskData = tokenUsage[t] || {};
    const entries = lb.models
      .map(m => ({ id: m.model_id, name: m.display.name, ...(taskData[m.model_id] || {}) }))
      .filter(e => e.total > 0)
      .sort((a, b) => b.total - a.total);
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
    const maxTotal = Math.max(...entries.map(e => e.total));
    chart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: p => {
          const total = p.reduce((s, x) => s + (x.value || 0), 0);
          const lines = p.map(s => `${s.marker} ${s.seriesName}: ${formatTokens(s.value)}`).join("<br>");
          return `<strong>${p[0].name}</strong><br>${lines}<br><strong>Total: ${formatTokens(total)}</strong>`;
        }
      },
      legend: taskIdx === 0 ? { data: TOKEN_COMPONENTS.map(c => c.name), top: -4, textStyle: { color: "#4A3F37", fontSize: 13 }, itemGap: 28 } : { show: false },
      grid: { left: 200, right: 100, top: taskIdx === 0 ? 36 : 10, bottom: 10 },
      xAxis: { type: "value", min: 0, max: maxTotal * 1.18, show: false },
      yAxis: { type: "category", data: names, axisLabel: { fontSize: 14, color: "#4A3F37" }, axisTick: { show: false }, axisLine: { show: false } },
      series: TOKEN_COMPONENTS.map((comp, ci) => ({
        name: comp.name,
        type: "bar",
        stack: "tok",
        data: reversed.map(e => e[comp.key] || 0),
        itemStyle: { color: comp.color, borderRadius: ci === TOKEN_COMPONENTS.length - 1 ? [0, 3, 3, 0] : 0 },
        barMaxWidth: 28,
        ...(ci === TOKEN_COMPONENTS.length - 1 ? {
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

  window.addEventListener("resize", () => {
    skillCharts.forEach(c => c.resize());
    tokenCharts.forEach(c => c.resize());
  });
})();
