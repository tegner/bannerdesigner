import { eventhandler } from '../../util/eventhandler';
import { STATENAMES } from '../../util/initialstate';
import store from '../../util/store';

// function scalePoint(pos: string) {
//   const point = document.createElement('div');
//   point.className = `scalepoint scalepoint--${pos}`;

//   return point;
// }

export class ManualScaler {
  private current;
  private currentContainer;

  constructor() {
    eventhandler.subscribe([STATENAMES.imageChange], (imageChange, state) => {
      console.log('So this is the culprit?', imageChange, state);
      this.clearScaler();
    });
  }

  public scaleElement(element) {
    this.clearScaler();
    this.current = element;
    this.scaler(element);
    this.scaleVisualization(element);
  }

  private clearScaler() {
    if (this.current) {
      this.currentContainer.remove();
    }
  }

  private scaler(element) {
    console.log('image SCALE!', element);
    console.log('store, store.state', store.state.canvases);
  }

  private scaleVisualization(element) {
    const { image, scaleFactor, wrapper } = element;

    const scaleImage = document.createElement('img');
    scaleImage.src = image.image.src;
    scaleImage.setAttribute('style', 'height: 100%; width: 100%;');

    const scaleElementContainer = document.createElement('div');

    scaleElementContainer.appendChild(scaleImage);
    scaleElementContainer.className = 'scalearea';

    const styleString = `
      top: ${image.x}px;
      left: ${image.y}px;
      width:${image.w}px;
      height:${image.h}px;
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
