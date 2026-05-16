import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";

function getPageComponent() {
  const path = window.location.pathname;
  if (path.includes("apps-build")) return import("@/pages/AppsPage");
  if (path.includes("storefronts")) return import("@/pages/StorefrontsPage");
  if (path.includes("agents")) return import("@/pages/AgentsPage");
  if (path.includes("support")) return import("@/pages/SupportPage");
  return import("@/pages/HomePage");
}

async function render() {
  const module = await getPageComponent();
  const Page = module.HomePage || module.AppsPage || module.StorefrontsPage || module.AgentsPage || module.SupportPage;
  
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <StrictMode>
      <Page />
    </StrictMode>
  );
}

render();
