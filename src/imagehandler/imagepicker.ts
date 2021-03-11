// import { ImagePlacementPicker } from './imageplacement';
// import { eventhandler } from '../util/eventhandler';
// import { STATENAMES } from '../util/initialstate';
import { RATIOTYPES } from '../canvascreator/canvascreator';
import { eventhandler } from '../util/eventhandler';
import { STATENAMES } from '../util/initialstate';
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

  // private manualScaler: ManualScaler;

  private parents = {
    [RATIOTYPES.square]: null,
    [RATIOTYPES.wide]: null,
  };

  private prevScale = {
    [RATIOTYPES.square]: 1,
    [RATIOTYPES.wide]: 1,
  };

  private scalers: {
    [RATIOTYPES.square]: ManualScaler;
    [RATIOTYPES.wide]: ManualScaler;
  } = {
    [RATIOTYPES.square]: null,
    [RATIOTYPES.wide]: null,
  };

  constructor() {
    for (const key in store.state.imageScale) {
      if (key) {
        this.prevScale[key] = store.state.imageScale[key];
      }
    }

    eventhandler.subscribe([STATENAMES.imageChange], (imageChange, state) => {
      console.log('IMAGEPICKER!!!', imageChange);
      if (imageChange === true) {
        console.log('IMAGEPICKER!!!', state);
      }
    });
    eventhandler.subscribe([STATENAMES.imageScale], (imageScale, state) => {
      console.log('IMAGEPICKER!!! imageScale', imageScale);
      console.log('IMAGEPICKER!!! imageScale -this.prevScale', this.prevScale);

      let changed = '';

      for (const key in imageScale) {
        if (imageScale[key] !== this.prevScale[key]) {
          this.prevScale[key] = imageScale[key];
          changed = key;
        }
      }
      console.log('IMAGEPICKER!!! imageScale changed', changed);
      // const { type } = state;
      // this.manualScaler =
      //   this.manualScaler || new ManualScaler({ image, parent: handlingElement, scaleFactor, wrapper });
      this.scalers[changed].scaleElement();
    });
  }

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
      this.renderHandlers(element, element.configName);
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
      store.dispatch(STOREACTIONS.imageChange, type);
    }, 250);
  }

  private renderHandlers(element, configName) {
    console.log('canvasElement', element, configName);

    const handlingFieldset = document.createElement('fieldset');
    handlingFieldset.className = 'form-element margin-m--b';
    this.containers.push(handlingFieldset);
    const handlingLegend = document.createElement('legend');
    handlingLegend.className = 'legend';
    handlingLegend.innerHTML = element.header;
    handlingFieldset.appendChild(handlingLegend);

    const handlingElement = document.createElement('div');
    handlingElement.className = 'form-element flex flex-justify--between flex-align--center';

    handlingFieldset.appendChild(handlingElement);

    const { image, scaleFactor, type, wrapper } = element;
    console.log('this.manualScaler type type type', type, this.parents);
    this.parents[type] = handlingElement;
    console.log('this.manualScaler image', image);
    this.scalers[type] =
      this.scalers[type] || new ManualScaler({ image, parent: handlingElement, scaleFactor, type, wrapper });

    /**
     * Scaler button
     */
    const scaleImage = document.createElement('div');
    scaleImage.className = 'button';
    scaleImage.innerHTML = 'Skalér billede';

    scaleImage.addEventListener('click', () => {
      this.scalers[type].scaleElement();
    });

    handlingElement.appendChild(scaleImage);

    /**
     * Scaler element
     */
    const scalerElement = document.createElement('input');
    scalerElement.type = 'number';
    scalerElement.value = '100';

    scalerElement.addEventListener('keyup', () => {
      console.log('debounce this keyup');
      this.debounce(scalerElement.value, element.type);
    });

    handlingElement.appendChild(scalerElement);

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
    // const imagePlacement = new ImagePlacementPicker(element.configName);
    // handlingFieldset.appendChild(imagePlacement.render());

    this.imagePickerFrag.appendChild(handlingFieldset);
  }
}
