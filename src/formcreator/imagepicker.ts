import store from '../util/store';
import { STOREACTIONS } from '../util/store/actions';

export function imagePicker(): HTMLDivElement {
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

  return fileElement;
}
