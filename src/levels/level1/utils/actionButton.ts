export const actionButton = () => {
  const background = document.getElementById('background');
  const actorButton = document.getElementById('actorButton');
  if (!actorButton) return;

  const calculatePosition = () => {
    wrapperImage.style.top = `
    ${
      actorButton.getBoundingClientRect().top +
      actorButton.getBoundingClientRect().height -
      54
    }px`;
    wrapperImage.style.left = actorButton.offsetLeft + 80 + 'px';
  };

  const actionSvg = '/images/action.svg';

  const wrapperImage = document.createElement('div');
  wrapperImage.id = 'actionButton';
  const text = document.createElement('div');

  text.innerText = 'Идти';
  text.style.fontSize = '40px';
  text.style.paddingLeft = '40px';
  text.style.paddingTop = '50px';

  wrapperImage.style.position = 'absolute';
  wrapperImage.style.display = 'flex';
  wrapperImage.style.alignItems = 'center';

  wrapperImage.style.transform = 'translateX(-50%)';

  wrapperImage.style.backgroundImage = `url(${actionSvg})`;
  wrapperImage.style.backgroundRepeat = 'no-repeat';

  calculatePosition();

  window.addEventListener('resize', () => {
    calculatePosition();
  });

  wrapperImage.style.width = '310px';
  wrapperImage.style.height = '138px';

  wrapperImage.appendChild(text);

  background?.appendChild(wrapperImage);
};
