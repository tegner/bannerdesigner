import { CanvasCreator } from '../canvascreator';
import { saveToDisk } from '../util/savetodisk';
import { ColorPicker } from './colorpicker';
import { imagePicker } from './imagepicker';
import { ThemePicker } from './themepicker';
import { TourDates } from './tourdates';

import store from '../util/store';

const formElement = (name: string): string => `
  <div class="form-element padding-s--b">
    <label class="form-label">${name}</label>
    <input class="form-input" name="${name.toLocaleLowerCase()}" type="text" value="" id="bdTourname" placeholder="${name}" />
  </div>
`;

export function createForm() {
  const container = document.createDocumentFragment();
  const formEl = document.createElement('form');
  const canvascontainer = document.getElementById('canvascontainer');

  const canvasCreator = new CanvasCreator(canvascontainer, formEl);

  formEl.addEventListener('change', (ev) => {
    if ((ev.target as HTMLInputElement).nodeName === 'SELECT') {
      store.dispatch('setTheme', (ev.target as HTMLInputElement).value);
    }
  });

  /** TourName */
  const tourNameContainer = document.createElement('div');
  tourNameContainer.innerHTML = formElement('Tourname');
  formEl.appendChild(tourNameContainer);

  /** ArtistName */
  const artistNameContainer = document.createElement('div');
  artistNameContainer.innerHTML = formElement('Artist');
  formEl.appendChild(artistNameContainer);

  /** TourDates */
  const tourDates = new TourDates();
  formEl.appendChild(tourDates.render());

  /** Themes */
  const themePicker = new ThemePicker();
  formEl.appendChild(themePicker.render());

  /** Colors */
  const colorPicker = new ColorPicker(['artist', 'date', 'tourname', 'venue']);
  formEl.appendChild(colorPicker.render());

  /** Image */
  formEl.appendChild(imagePicker());
  container.appendChild(formEl);

  /** Buttons */
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'flex flex-justify--between form-element';

  const updateButton = document.createElement('button');
  updateButton.className = 'button';
  updateButton.value = 'submit';
  updateButton.innerText = 'Opdater';

  updateButton.addEventListener('click', (ev) => {
    ev.preventDefault();
    canvasCreator.update();
  });

  const saveButton = document.createElement('button');
  saveButton.className = 'button button--submit';
  saveButton.value = 'submit';
  saveButton.innerText = 'Gem';

  saveButton.addEventListener('click', () => {
    saveToDisk(canvasCreator.getCanvas(), canvasCreator.bannerName);
  });

  buttonContainer.appendChild(updateButton);
  buttonContainer.appendChild(saveButton);
  container.appendChild(buttonContainer);

  return container;
}
