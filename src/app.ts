import { AppOne as App } from './AppOne';

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

window.addEventListener('DOMContentLoaded', async () => {
  const canvas = document.createElement('canvas');
  canvas.style.width = '60%';
  canvas.style.height = '100%';

  document.body.appendChild(canvas);
  const app = new App(canvas);
  app.debug(false);
  app.run();
});
