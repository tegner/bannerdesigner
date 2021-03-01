import { ImagePlacementPicker } from './imageplacement';
import store from '../util/store';
import { STOREACTIONS } from '../util/store/actions';

import { ManualScaler } from './imagesizer/manualscaler';

export class ImageHandler {
  private containers = [];
  private debounceTimeout;

  private imagePickerFrag = document.createElement('div');

  private imageFileElement = (() => {
    const imageFileElement = document.createElement('input');
    imageFileElement.type = 'file';
    imageFileElement.style.display = 'none';
    return imageFileElement;
  })();
  private imageFileValue = (() => {
    const imageFileValue = document.createElement('small');
    imageFileValue.className = 'file-value';
    return imageFileValue;
  })();

  private manualScaler: ManualScaler;

  constructor() {}

  public render() {
    const fileElement = document.createElement('div');
    fileElement.className = 'form-element flex flex-align--center';

    /** Actual file picker  */

    fileElement.appendChild(this.imageFileElement);

    /** Button */
    const imageButton = document.createElement('button');
    imageButton.className = 'button button--file';
    imageButton.innerText = 'Vælg billede';
    fileElement.appendChild(imageButton);

    fileElement.appendChild(this.imageFileValue);

    /** eventlisteners */
    imageButton.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.imageFileElement.click();
    });

    this.imageFileElement.addEventListener('change', this.change.bind(this));

    this.imagePickerFrag.appendChild(fileElement);

    return this.imagePickerFrag;
  }

  private change() {
    const splitValue = this.imageFileElement.value.split('\\');
    this.imageFileValue.innerHTML = splitValue[splitValue.length - 1];

    store.dispatch(STOREACTIONS.imageChange, true);

    this.clearHandlers();
    store.state.canvases.forEach((element) => {
      this.renderHandlers(element);
    });
  }

  private clearHandlers() {
    let i = 0;
    while (i < this.containers.length) {
      this.containers[i].remove();
      i++;
    }
    this.containers.length = 0;
  }

  private debounce(imageScale, type) {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      console.log('type', type);
      store.dispatch(STOREACTIONS.setImageScale, { [type]: parseInt(imageScale, 10) / 100 });
      store.dispatch(STOREACTIONS.imageChange, true);
    }, 250);
  }

  private renderHandlers(element) {
    console.log('canvasElement', element);

    const handlingFieldset = document.createElement('fieldset');
    this.containers.push(handlingFieldset);
    const handlingLegend = document.createElement('legend');
    handlingLegend.innerHTML = element.header;
    handlingFieldset.appendChild(handlingLegend);

    const handlingElement = document.createElement('div');
    handlingElement.className = 'form-element flex flex-justify--between flex-align--center';

    handlingFieldset.appendChild(handlingElement);

    const scaleImage = document.createElement('div');
    scaleImage.className = 'button';
    scaleImage.innerHTML = 'Skalér billede';
    handlingElement.appendChild(scaleImage);

    const scalerElement = document.createElement('input');
    scalerElement.type = 'number';
    scalerElement.value = '100';

    scalerElement.addEventListener('keyup', () => {
      console.log('debounce this keyup');
      this.debounce(scalerElement.value, element.type);
    });

    handlingElement.appendChild(scalerElement);

    scaleImage.addEventListener('click', () => {
      this.manualScaler = this.manualScaler || new ManualScaler();
      const { image, scaleFactor, wrapper } = element;
      this.manualScaler.scaleElement({ image, parent: handlingElement, scaleFactor, wrapper });
    });

    // const cover = document.createElement('div');
    // cover.className = 'button';
    // cover.innerHTML = 'Cover';
    // handlingElement.appendChild(cover);

    // cover.addEventListener('click', () => {
    //   console.log('image COVER!');

    //   // store.dispatch(STOREACTIONS.imageChange, true);
    // });

    // const stretch = document.createElement('div');
    // stretch.className = 'button';
    // stretch.innerHTML = 'Stretch';
    // handlingElement.appendChild(stretch);

    // stretch.addEventListener('click', () => {
    //   console.log('image STRETCH!');

    //   // store.dispatch(STOREACTIONS.imageChange, true);
    // });

    /** Image placement */
    const imagePlacement = new ImagePlacementPicker();
    handlingFieldset.appendChild(imagePlacement.render());

    this.imagePickerFrag.appendChild(handlingFieldset);
  }
}
