import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";

// Determine which page to render based on the current path
const path = window.location.pathname;

async function render() {
  let Page;

  if (path.includes("the-workout")) {
    const module = await import("./pages/the-workout");
    Page = module.default;
  } else if (path.includes("instructors")) {
    const module = await import("./pages/instructors");
    Page = module.default;
  } else if (path.includes("ride-faq")) {
    const module = await import("./pages/ride-faq");
    Page = module.default;
  } else if (path.includes("digital-platform")) {
    const module = await import("./pages/digital-platform");
    Page = module.default;
  } else {
    const module = await import("./pages/home");
    Page = module.default;
  }

  const root = document.getElementById("app");
  if (root) {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <Page />
      </React.StrictMode>
    );
  }
}

render();
