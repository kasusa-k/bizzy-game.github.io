import { AbstractMesh, Scene, ShadowGenerator, Vector3 } from '@babylonjs/core';
import { ChristmasTree, Tree } from '../../Interactive/Tree';
import { Stone } from '../../Interactive/Stone';
import { Bridge } from '../../Interactive/Bridge';
import { River } from '../../Interactive/River';
import { Road } from '../../Interactive/Road';

export const generateLevel1 = (
  scene: Scene,
  boxArray: AbstractMesh[],
  shadowGenerator: ShadowGenerator,
): void => {
  new Tree({
    scene,
    position: new Vector3(8, -1, 6),
    boxArray,
    shadowGenerator,
  });
  new Tree({
    scene,
    position: new Vector3(0, -1, 8),
    boxArray,
    shadowGenerator,
  });
  new Tree({
    scene,
    position: new Vector3(8, -1, -2),
    boxArray,
    shadowGenerator,
  });
  new Tree({
    scene,
    position: new Vector3(8, -1, -8),
    boxArray,
    shadowGenerator,
  });

  new Tree({
    scene,
    position: new Vector3(-8, -1, 8),
    boxArray,
    shadowGenerator,
  });
  new Stone({ scene, position: new Vector3(-4, -1, 8), boxArray });
  new ChristmasTree({
    scene,
    position: new Vector3(-6, -1, 8),
    boxArray,
    shadowGenerator,
  });
  new Tree({
    scene,
    position: new Vector3(-4, -1, 8),
    boxArray,
    shadowGenerator,
  });

  new Tree({
    scene,
    position: new Vector3(-2, -1, 0),
    boxArray,
    shadowGenerator,
  });

  new Stone({ scene, position: new Vector3(8, -1, -10), boxArray });
  new Stone({ scene, position: new Vector3(8, -1, 2), boxArray });

  new Stone({ scene, position: new Vector3(-10, -1, 2), boxArray });
  new ChristmasTree({
    scene,
    position: new Vector3(-10, -1, 0),
    boxArray,
    shadowGenerator,
  });
  new Tree({
    scene,
    position: new Vector3(-10, -1, -2),
    boxArray,
    shadowGenerator,
  });
  new ChristmasTree({
    scene,
    position: new Vector3(-10, -1, -4),
    boxArray,
    shadowGenerator,
  });
  new Tree({
    scene,
    position: new Vector3(-10, -1, -6),
    boxArray,
    shadowGenerator,
  });
  new ChristmasTree({
    scene,
    position: new Vector3(-10, -1, -8),
    boxArray,
    shadowGenerator,
  });
  new Stone({ scene, position: new Vector3(-10, -1, -10), boxArray });

  new ChristmasTree({
    scene,
    position: new Vector3(6, -1, 8),
    boxArray,
    shadowGenerator,
  });
  new ChristmasTree({
    scene,
    position: new Vector3(6, -1, 0),
    boxArray,
    shadowGenerator,
  });
  new ChristmasTree({
    scene,
    position: new Vector3(6, -1, -6),
    boxArray,
    shadowGenerator,
  });
  new ChristmasTree({
    scene,
    position: new Vector3(-10, -1, 6),
    boxArray,
    shadowGenerator,
  });
  new Stone({ scene, position: new Vector3(6, -1, -4), boxArray });
  new Stone({ scene, position: new Vector3(6, -1, -2), boxArray });

  new Bridge({ scene, position: new Vector3(4, -0.5, 4), boxArray });

  new River({ scene, position: new Vector3(-1, -1, 4), boxArray });

  new Road({ scene, position: new Vector3(4, -0.5, 2), boxArray });
  new Road({ scene, position: new Vector3(4, -0.5, 6), boxArray });
  new Road({
    scene,
    position: new Vector3(4, -0.5, 0),
    boxArray,
    callback: () => {
      console.log('last road');
      document.dispatchEvent(new Event('level1End'));
      // const loadingBizzy = document.getElementById('loading');
      // const fullBizzy = document.querySelector('.fullBizzy');
      // const removeLoading = () => {
      //   if (loadingBizzy) {
      //     // fullBizzy[0].styl
      //     loadingBizzy?.classList.remove('start');
      //     loadingBizzy?.classList.add('end');
      //     document.body.removeChild(loadingBizzy);
      //   }
      // };
      // console.log(fullBizzy);
      // fullBizzy?.addEventListener('animationend', removeLoading);
      // fullBizzy?.removeEventListener('animationend', removeLoading);
    },
  });

  // if (controller) {
  //   const div = document.createElement('div');
  //   div.style.width = '66px';
  //   div.style.height = '100%';
  //   div.style.position = 'absolute';
  //   div.style.top = '0';
  //   div.style.left = '60%';
  //   div.style.bottom = '60%';
  //   div.style.zIndex = '100';
  //   div.style.background = 'rgba(60, 40, 136, 0.7)';
  //   document.body.appendChild(div);
  //
  //   const background = document.createElement('div');
  //   background.id = 'background';
  //   background.style.position = 'absolute';
  //   background.style.top = '0';
  //   background.style.left = '60%';
  //   background.style.bottom = '0';
  //   background.style.right = '0';
  //   background.style.height = '100%';
  //   background.style.background = 'rgba(0, 0, 0, 0.3)';
  //
  //   document.body.appendChild(background);
  //
  //   actorButton();
  //   actionButton();
  //   moveButton();
  // }
};
