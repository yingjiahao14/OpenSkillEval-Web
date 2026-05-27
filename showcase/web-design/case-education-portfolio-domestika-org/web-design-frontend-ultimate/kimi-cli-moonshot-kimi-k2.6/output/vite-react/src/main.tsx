import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const path = window.location.pathname;
const page = path.split("/").pop()?.replace(".html", "") || "index";

async function render() {
  let Component;
  switch (page) {
    case "courses":
      Component = (await import("./pages/Courses")).default;
      break;
    case "projects":
      Component = (await import("./pages/Projects")).default;
      break;
    case "plus":
      Component = (await import("./pages/Plus")).default;
      break;
    case "login":
      Component = (await import("./pages/Login")).default;
      break;
    default:
      Component = (await import("./pages/Home")).default;
  }

  const root = document.getElementById("app");
  if (root) {
    createRoot(root).render(
      <StrictMode>
        <Component />
      </StrictMode>
    );
  }
}

render();
