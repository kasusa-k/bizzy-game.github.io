export const actorButton = () => {
  const background = document.getElementById('background');
  const actorSvg = '/images/actor.svg';

  const wrapperImage = document.createElement('div');
  wrapperImage.id = 'actorButton';
  const text = document.createElement('div');

  text.innerText = 'Bizzy';
  text.style.fontSize = '44px';
  text.style.paddingLeft = '40px';

  wrapperImage.style.position = 'absolute';
  wrapperImage.style.display = 'flex';
  wrapperImage.style.alignItems = 'center';

  wrapperImage.style.top = '310px';
  wrapperImage.style.left = '50%';
  wrapperImage.style.transform = 'translateX(-50%)';

  wrapperImage.style.backgroundImage = `url(${actorSvg})`;
  wrapperImage.style.backgroundRepeat = 'no-repeat';

  wrapperImage.style.width = '320px';
  wrapperImage.style.height = '110px';

  wrapperImage.appendChild(text);

  background?.appendChild(wrapperImage);
};
