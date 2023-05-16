export const moveButton = () => {
  const background = document.getElementById('background');
  const img = '/images/sumLast.svg';

  const actionButton = document.getElementById('actionButton');
  if (!actionButton) return;

  const calculatePosition = () => {
    wrapperImage.style.top = `
    ${
      actionButton.getBoundingClientRect().top +
      actionButton.getBoundingClientRect().height -
      54
    }px`;
    wrapperImage.style.left = actionButton.offsetLeft + 25 + 'px';
  };

  const wrapperImage = document.createElement('div');
  wrapperImage.id = 'actorButton';
  const text = document.createElement('div');

  text.innerText = 'налево';
  text.style.fontSize = '35px';
  text.style.paddingLeft = '40px';
  text.style.paddingTop = '50px';

  wrapperImage.style.position = 'absolute';
  wrapperImage.style.display = 'flex';
  wrapperImage.style.alignItems = 'center';

  wrapperImage.style.top = '310px';
  wrapperImage.style.left = '50%';
  wrapperImage.style.transform = 'translateX(-50%)';

  wrapperImage.style.backgroundImage = `url(${img})`;
  wrapperImage.style.backgroundRepeat = 'no-repeat';

  calculatePosition();

  window.addEventListener('resize', () => {
    calculatePosition();
  });

  wrapperImage.style.width = '239px';
  wrapperImage.style.height = '140px';

  const sum = document.createElement('div');
  sum.style.position = 'absolute';
  sum.style.bottom = '13px';
  sum.style.right = '23px';
  sum.style.width = '66px';
  sum.style.height = '66px';
  sum.style.borderRadius = '10px';
  sum.style.borderStyle = 'solid';
  sum.style.borderWidth = '3px';
  sum.style.borderColor = '#000';
  sum.style.backgroundColor = '#fff';

  wrapperImage.appendChild(text).appendChild(sum);

  background?.appendChild(wrapperImage);
};
