// import { eventhandler } from '../../util/eventhandler';
// import { STATENAMES } from '../../util/initialstate';
import { imagePositioner } from './imagepositioner';
import store from '../../util/store';
import { initialscaler } from './initialscaler';

// function scalePoint(pos: string) {
//   const point = document.createElement('div');
//   point.className = `scalepoint scalepoint--${pos}`;

//   return point;
// }

export class ManualScaler {
  private current;
  private currentContainer;

  constructor(element) {
    this.current = element.type;

    // eventhandler.subscribe([STATENAMES.imageChange], (imageChange, state) => {
    //   console.log('SCALER!!!!', imageChange, 'stae', state);
    //   this.clearScaler();
    // });
  }

  public scaleElement() {
    this.clearScaler();

    this.scaler(this.current);
    this.scaleVisualization(this.current);
  }

  private clearScaler() {
    if (this.currentContainer) {
      this.currentContainer.remove();
    }
  }

  private scaler(type) {
    console.log('image SCALE!', type);
    console.log('image SCALE! store, store.state', store.state.canvases);
  }

  private scaleVisualization(type) {
    const cur = store.state.canvases.find((el) => el.configName === type);
    const { canvas, image, scaleFactor, wrapper } = cur;

    const options = {
      cHeight: canvas.height,
      cWidth: canvas.width,
      iHeight: image.image.height,
      iWidth: image.image.width,
      type,
    };
    const imgSize = initialscaler(options);

    const imgPos = imagePositioner({ options, ...imgSize }, store.state.imagePosition);

    const currentImage = { image, ...imgPos, ...imgSize };

    const scaleImage = document.createElement('img');
    scaleImage.src = image.image.src;
    scaleImage.setAttribute('style', 'height: 100%; width: 100%;');

    const scaleElementContainer = document.createElement('div');

    scaleElementContainer.appendChild(scaleImage);
    scaleElementContainer.className = 'scalearea';

    const styleString = `
      top: ${currentImage.x}px;
      left: ${currentImage.y}px;
      width:${currentImage.w}px;
      height:${currentImage.h}px;
      transform: scale(${scaleFactor});
      `;
    scaleElementContainer.setAttribute('style', styleString);

    // ['topright', 'topleft', 'bottomright', 'bottomleft'].forEach((pos) => {
    //   scaleElementContainer.appendChild(scalePoint(pos));
    // });

    this.currentContainer = scaleElementContainer;
    wrapper.appendChild(scaleElementContainer);
  }
}
