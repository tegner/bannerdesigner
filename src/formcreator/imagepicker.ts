import store from '../util/store';
import { STOREACTIONS } from '../util/store/actions';

export function imagePicker(): DocumentFragment {
  const imagePickerFrag = document.createDocumentFragment();

  const fileElement = document.createElement('div');
  fileElement.className = 'form-element flex flex-align--center';

  /** Actual file picker  */
  const imageFileElement = document.createElement('input');
  imageFileElement.type = 'file';
  imageFileElement.style.display = 'none';
  fileElement.appendChild(imageFileElement);

  /** Button */
  const imageButton = document.createElement('button');
  imageButton.className = 'button button--file';
  imageButton.innerText = 'Vælg billede';
  fileElement.appendChild(imageButton);

  const imageFileValue = document.createElement('small');
  imageFileValue.className = 'file-value';
  fileElement.appendChild(imageFileValue);

  /** eventlisteners */
  imageButton.addEventListener('click', (ev) => {
    ev.preventDefault();
    imageFileElement.click();
  });

  imageFileElement.addEventListener('change', () => {
    const splitValue = imageFileElement.value.split('\\');
    imageFileValue.innerHTML = splitValue[splitValue.length - 1];
    console.log('imageHasChanged!');

    store.dispatch(STOREACTIONS.imageChange, true);
  });

  imagePickerFrag.appendChild(fileElement);

  const handlingElement = document.createElement('div');
  handlingElement.className = 'form-element flex flex-justify--between flex-align--center';

  const scaleImage = document.createElement('div');
  scaleImage.className = 'button';
  scaleImage.innerHTML = 'Scale image';
  handlingElement.appendChild(scaleImage);

  scaleImage.addEventListener('click', () => {
    console.log('image SCALE!');
    // bottomRight();
    // store.dispatch(STOREACTIONS.imageChange, true);
  });

  const cover = document.createElement('div');
  cover.className = 'button';
  cover.innerHTML = 'Cover';
  handlingElement.appendChild(cover);

  cover.addEventListener('click', () => {
    console.log('image COVER!');

    // store.dispatch(STOREACTIONS.imageChange, true);
  });

  const stretch = document.createElement('div');
  stretch.className = 'button';
  stretch.innerHTML = 'Stretch';
  handlingElement.appendChild(stretch);

  stretch.addEventListener('click', () => {
    console.log('image STRETCH!');

    // store.dispatch(STOREACTIONS.imageChange, true);
  });

  imagePickerFrag.appendChild(handlingElement);

  return imagePickerFrag;
}
