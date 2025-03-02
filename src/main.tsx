import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TeamProvider } from "./contexts/TeamContext.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TeamProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TeamProvider>
  </StrictMode>
);
