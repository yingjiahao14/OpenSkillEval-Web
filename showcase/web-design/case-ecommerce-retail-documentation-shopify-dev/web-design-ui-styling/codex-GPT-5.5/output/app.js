const packageCommands = {
  npm: "npm i -g @commerceforge/cli@latest",
  yarn: "yarn global add @commerceforge/cli@latest",
  pnpm: "pnpm add -g @commerceforge/cli@latest"
};

const initCommands = {
  apps: "commerceforge app init",
  themes: "commerceforge theme init",
  headless: "commerceforge hydrogen init"
};

function updateCliCode() {
  const openItem = document.querySelector(".acc-item.open");
  const activeTab = document.querySelector(".tab.active");
  const code = document.querySelector("#cli-code");
  const caption = document.querySelector("#cli-caption");
  if (!openItem || !activeTab || !code) return;
  const target = openItem.dataset.target;
  const manager = activeTab.dataset.manager;
  code.innerHTML = `<span class="prompt">$</span> ${packageCommands[manager]}\n<span class="prompt">$</span> cd my-commerceforge-workspace\n<span class="prompt">$</span> ${initCommands[target]}`;
  if (caption) caption.textContent = `${manager} install command with the ${target === "headless" ? "headless storefront" : target.slice(0, -1)} initializer.`;
}

document.querySelectorAll(".acc-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.closest(".acc-item");
    document.querySelectorAll(".acc-item").forEach((other) => other.classList.toggle("open", other === item));
    updateCliCode();
  });
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((other) => other.classList.toggle("active", other === tab));
    updateCliCode();
  });
});

document.querySelectorAll("[data-collapse-sidebar]").forEach((button) => {
  button.addEventListener("click", () => {
    const shell = button.closest(".docs-shell");
    shell.classList.toggle("sidebar-collapsed");
    const collapsed = shell.classList.contains("sidebar-collapsed");
    button.setAttribute("aria-expanded", String(!collapsed));
  });
});

document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    document.body.classList.toggle("light");
    button.textContent = document.body.classList.contains("light") ? "Dark" : "Light";
  });
});

if (window.matchMedia("(max-width: 980px)").matches) {
  document.querySelectorAll(".docs-shell").forEach((shell) => shell.classList.add("sidebar-collapsed"));
}

updateCliCode();
