(() => {
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const $ = (sel, root = document) => root.querySelector(sel);

  function initTabs() {
    $$("[data-tabs]").forEach((wrap) => {
      const tabs = $$('[role="tab"]', wrap);
      const panels = $$('[role="tabpanel"]', wrap);
      if (!tabs.length || !panels.length) return;
      const byId = new Map(panels.map((p) => [p.id, p]));

      function select(tab) {
        tabs.forEach((t) => t.setAttribute("aria-selected", t === tab ? "true" : "false"));
        const target = tab.getAttribute("aria-controls");
        panels.forEach((p) => {
          const show = p.id === target;
          p.hidden = !show;
        });
        const panel = byId.get(target);
        if (panel) panel.dispatchEvent(new CustomEvent("tab:shown", { bubbles: true }));
      }

      tabs.forEach((t) => {
        t.addEventListener("click", () => select(t));
        t.addEventListener("keydown", (e) => {
          if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
          e.preventDefault();
          const idx = tabs.indexOf(t);
          const next = e.key === "ArrowRight" ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
          tabs[next].focus();
          select(tabs[next]);
        });
      });

      const pre = tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0];
      select(pre);
    });
  }

  function initAccordions() {
    $$("[data-accordion]").forEach((wrap) => {
      $$("[data-acc-trigger]", wrap).forEach((btn) => {
        btn.addEventListener("click", () => {
          const group = btn.closest("[data-acc-item]");
          if (!group) return;
          const open = group.getAttribute("data-open") !== "false";
          group.setAttribute("data-open", open ? "false" : "true");
        });
      });
    });
  }

  function seededRandom(seed) {
    // xorshift32
    let x = seed >>> 0;
    return () => {
      x ^= x << 13;
      x ^= x >>> 17;
      x ^= x << 5;
      return (x >>> 0) / 4294967296;
    };
  }

  function drawSpark(canvas, variant = "up") {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const up = variant === "up";
    const stroke = up ? "#00d17a" : "#F7525F";
    const fill = up ? "rgba(0,209,122,.10)" : "rgba(247,82,95,.10)";

    const r = seededRandom((canvas.dataset.seed || "42").split("").reduce((a, c) => a + c.charCodeAt(0), 0));
    const pts = Array.from({ length: 22 }, (_, i) => {
      const t = i / 21;
      const base = up ? (0.35 + 0.55 * t) : (0.85 - 0.55 * t);
      const noise = (r() - 0.5) * 0.18;
      return {
        x: Math.round(6 + t * (w - 12)),
        y: Math.round((1 - Math.max(0.08, Math.min(0.92, base + noise))) * (h - 10) + 5),
      };
    });

    ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.lineWidth = 2;
    ctx.strokeStyle = stroke;
    ctx.stroke();

    ctx.lineTo(pts[pts.length - 1].x, h - 5);
    ctx.lineTo(pts[0].x, h - 5);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
  }

  function initSparks() {
    $$("canvas[data-spark]").forEach((c) => {
      // Ensure crisp on resize.
      const rect = c.getBoundingClientRect();
      const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
      c.width = Math.round(rect.width * dpr);
      c.height = Math.round(rect.height * dpr);
      const variant = c.getAttribute("data-variant") || "up";
      drawSpark(c, variant);
    });
  }

  function drawCandles(canvas, timeframe = "1D") {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = "rgba(255,255,255,.06)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 6; i++) {
      const y = Math.round((i / 6) * h);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const densityMap = { "1D": 56, "5D": 72, "1M": 86, "3M": 98, "6M": 112, YTD: 122, "1Y": 140, "5Y": 156, All: 170 };
    const n = densityMap[timeframe] || 86;
    const r = seededRandom(timeframe.split("").reduce((a, c) => a + c.charCodeAt(0), 0) + 1337);
    const pad = 24;
    const usableW = w - pad * 2;
    const base = 0.56;
    let price = base;

    function yFrom(p) {
      return Math.round((1 - p) * (h - pad * 2) + pad);
    }

    // soft glow
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "rgba(41,98,255,.12)");
    grad.addColorStop(1, "rgba(34,211,238,.06)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const candleW = Math.max(3, Math.floor(usableW / n) - 2);
    const step = usableW / n;

    for (let i = 0; i < n; i++) {
      const x = Math.round(pad + i * step);
      const drift = (r() - 0.48) * 0.06;
      const vol = 0.10 + r() * 0.18;
      const open = price;
      const close = Math.max(0.08, Math.min(0.92, open + drift));
      const hi = Math.max(open, close) + vol * 0.45;
      const lo = Math.min(open, close) - vol * 0.45;
      price = close;

      const up = close >= open;
      const color = up ? "#00d17a" : "#F7525F";

      // wick
      ctx.strokeStyle = "rgba(234,240,255,.18)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + candleW / 2, yFrom(hi));
      ctx.lineTo(x + candleW / 2, yFrom(lo));
      ctx.stroke();

      // body
      const y1 = yFrom(open);
      const y2 = yFrom(close);
      const top = Math.min(y1, y2);
      const height = Math.max(2, Math.abs(y1 - y2));
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.88;
      ctx.fillRect(x, top, candleW, height);
      ctx.globalAlpha = 1;
    }

    // baseline overlay
    ctx.strokeStyle = "rgba(255,255,255,.08)";
    ctx.beginPath();
    ctx.moveTo(0, h - 1);
    ctx.lineTo(w, h - 1);
    ctx.stroke();
  }

  function initChart() {
    const canvas = $("canvas[data-candles]");
    if (!canvas) return;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const tf = (document.querySelector("[data-timeframe] button[aria-pressed='true']") || {}).dataset?.tf || "1D";
      drawCandles(canvas, tf);
    }

    window.addEventListener("resize", () => {
      clearTimeout(window.__cpResize);
      window.__cpResize = setTimeout(resize, 60);
    });

    const tfWrap = $("[data-timeframe]");
    if (tfWrap) {
      $$("button", tfWrap).forEach((btn) => {
        btn.addEventListener("click", () => {
          $$("button", tfWrap).forEach((b) => b.setAttribute("aria-pressed", b === btn ? "true" : "false"));
          const tf = btn.dataset.tf || "1D";
          drawCandles(canvas, tf);
        });
      });
    }

    resize();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initAccordions();
    initSparks();
    initChart();
  });
})();

