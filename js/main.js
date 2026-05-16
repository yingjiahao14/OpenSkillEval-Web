/* OpenSkillEval — Shared utilities */

const MODEL_DISPLAY = {};
const AGENT_BADGE_CLASS = {
  "Claude Code": "claude",
  "Codex": "codex",
  "Gemini CLI": "gemini",
  "Kimi CLI": "kimi",
};

const TASK_ICONS = {
  "data-visualization": "\u{1F4CA}",
  "poster-generation": "\u{1F5BC}",
  "ppt-generation": "\u{1F4DD}",
  "report-generation": "\u{1F4C4}",
  "web-design": "\u{1F310}",
};

async function fetchJSON(url) {
  // Bypass HTTP cache for data files so updates appear immediately
  const sep = url.indexOf("?") >= 0 ? "&" : "?";
  const resp = await fetch(url + sep + "t=" + Date.now(), { cache: "no-store" });
  if (!resp.ok) throw new Error(`Failed to fetch ${url}: ${resp.status}`);
  return resp.json();
}

function scoreClass(val) {
  if (val == null) return "na";
  if (val >= 4.5) return "high";
  if (val >= 3.75) return "mid";
  return "low";
}

function fmtScore(val) {
  if (val == null) return "\u2014";
  return val.toFixed(2);
}

function modelDisplay(modelId) {
  return MODEL_DISPLAY[modelId] || { name: modelId, agent: "Unknown", color: "#888" };
}

function agentBadgeHTML(agent) {
  const cls = AGENT_BADGE_CLASS[agent] || "";
  return `<span class="agent-badge ${cls}">${agent}</span>`;
}

function initNav() {
  const btn = document.querySelector(".nav-hamburger");
  const links = document.querySelector(".nav-links");
  if (btn && links) {
    btn.addEventListener("click", () => links.classList.toggle("open"));
  }

  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 100);
    }, { passive: true });
  }
}

function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => {
    el.classList.add("reveal-init");
    observer.observe(el);
  });
}

function openLightbox(src) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  if (lb && img) {
    img.src = src;
    lb.classList.remove("hidden");
  }
}

function downloadFile(url, filename) {
  fetch(url).then(function (r) { return r.blob(); }).then(function (blob) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  });
}

async function loadModels(basePath = ".") {
  try {
    const data = await fetchJSON(`${basePath}/data/models.json`);
    Object.assign(MODEL_DISPLAY, data);
  } catch {}
}

document.addEventListener("DOMContentLoaded", function () {
  initNav();
  initScrollReveal();
});
