import { AppOne as App } from './AppOne';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

window.addEventListener('DOMContentLoaded', async () => {
  const canvas = document.createElement('canvas');
  canvas.style.width = '60%';
  canvas.style.height = '100%';
  const loadingBizzy = document.getElementById('loading');
  if (loadingBizzy) {
    loadingBizzy.classList.add('start');
  }

  document.addEventListener('level1End', async () => {
    if (loadingBizzy) {
      loadingBizzy?.classList.remove('start');
      loadingBizzy?.classList.add('end');
      await sleep(300);
      document.body.removeChild(loadingBizzy);
    }
  });
  document.body.appendChild(canvas);
  const app = new App(canvas);
  app.debug(false);
  app.run();
});
