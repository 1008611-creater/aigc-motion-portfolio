import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactLenis } from "lenis/react";
import App from "./App";
import "./styles/global.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("缺少 #root 挂载点");
}

// 全站统一用 Lenis 接管滚动，避免各区块各写一套平滑逻辑导致手感不一致。
createRoot(container).render(
  <StrictMode>
    <ReactLenis root options={{ lerp: 0.09, wheelMultiplier: 1, touchMultiplier: 1.6 }}>
      <App />
    </ReactLenis>
  </StrictMode>,
);
