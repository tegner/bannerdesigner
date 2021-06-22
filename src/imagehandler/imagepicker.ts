import { ImagePlacementPicker } from './imageplacement';
// import { eventhandler } from '../util/eventhandler';
// import { STATENAMES } from '../util/initialstate';
import { RATIOTYPES } from '../canvascreator/canvascreator';
import { contentHandler } from '../contentHandler';
import store from '../util/store';
import { IMAGECHANGEACTIONS, STOREACTIONS } from '../util/store/actions';

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

  private parentForm: HTMLFormElement;

  private parents = {
    [RATIOTYPES.square]: null,
    [RATIOTYPES.wide]: null,
  };

  private prevScale = {
    [RATIOTYPES.square]: 1,
    [RATIOTYPES.wide]: 1,
  };

  // TODO: VisualScaling
  // private scalers: {
  //   [RATIOTYPES.square]: ManualScaler;
  //   [RATIOTYPES.wide]: ManualScaler;
  // } = {
  //   [RATIOTYPES.square]: null,
  //   [RATIOTYPES.wide]: null,
  // };

  constructor(parentForm: HTMLFormElement) {
    for (const key in store.state.imageScale) {
      if (key) {
        this.prevScale[key] = store.state.imageScale[key];
      }
    }
    this.parentForm = parentForm;
    // TODO: VisualScaling
    // eventhandler.subscribe([STATENAMES.imageScale], (imageScale, state) => {
    //   let changed = '';

    //   for (const key in imageScale) {
    //     if (imageScale[key] !== this.prevScale[key]) {
    //       this.prevScale[key] = imageScale[key];
    //       changed = key;
    //     }
    //   }

    //   this.scalers[changed].scaleElement();
    // });
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
    contentHandler.update(this.parentForm.elements, 'imagepicker');

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
      store.dispatch(STOREACTIONS.setImageScale, { [type]: parseInt(imageScale, 10) / 100 });
      store.dispatch(STOREACTIONS.imageChange, {
        action: IMAGECHANGEACTIONS.SCALE,
        type,
        scale: parseInt(imageScale, 10) / 100,
      });
    }, 250);
  }

  private renderHandlers(element, configName) {
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

    // TODO: VisualScaling
    // const { image, scaleFactor, type, wrapper } = element;
    const { type } = element;
    this.parents[type] = handlingElement;

    // TODO: VisualScaling
    // this.scalers[type] =
    //   this.scalers[type] || new ManualScaler({ image, parent: handlingElement, scaleFactor, type, wrapper });

    /**
     * Scaler button
     */
    const scaleImage = document.createElement('div');
    scaleImage.innerHTML = 'Skalér billede:';

    // TODO: VisualScaling
    // scaleImage.className = 'button';
    // scaleImage.addEventListener('click', () => {
    //   this.scalers[type].scaleElement();
    // });

    handlingElement.appendChild(scaleImage);

    /**
     * Scaler element
     */
    const scalerLabel = document.createElement('div');
    const scalerElement = document.createElement('input');
    scalerElement.style.textAlign = 'right';
    scalerElement.type = 'number';
    scalerElement.value = '100';

    scalerElement.addEventListener('keyup', () => {
      this.debounce(scalerElement.value, element.type);
    });

    scalerLabel.appendChild(scalerElement);

    const textInput = document.createTextNode('%');
    scalerLabel.appendChild(textInput);
    handlingElement.appendChild(scalerLabel);

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
    const imagePlacement = new ImagePlacementPicker(element.configName);
    handlingFieldset.appendChild(imagePlacement.render());

    this.imagePickerFrag.appendChild(handlingFieldset);
  }
}
