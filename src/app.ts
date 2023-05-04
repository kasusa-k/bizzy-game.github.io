import { AppOne as App } from "./AppOne";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

window.addEventListener("DOMContentLoaded", async () => {
  const canvas = document.createElement("canvas");
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  const loadingText = document.getElementById("loading");
  if (loadingText) {
    document.body.removeChild(loadingText);
  }
  document.body.appendChild(canvas);
  let app = new App(canvas);
  app.run();
});
