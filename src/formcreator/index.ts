import { CanvasCreator } from '../canvascreator';
import { saveToDisk } from '../util/savetodisk';
import { ColorPicker } from './colorpicker';
import { ImageHandler } from '../imagehandler';
import { ThemePicker } from './themepicker';
import { TourDates } from './tourdates';

import store from '../util/store';
import { STOREACTIONS } from '../util/store/actions';
import { themes } from '../canvascreator/themes';
import { RATIOTYPES } from '../canvascreator/canvascreator';

const formElement = (name: string): string => `
  <div class="form-element">
    <label class="form-label">${name}</label>
    <input class="form-input" name="${name.toLocaleLowerCase()}" type="text" value="" id="bdTourname" placeholder="${name}" />
  </div>
`;

export function createForm() {
  const canvascontainer = document.getElementById('canvascontainer') as HTMLDivElement;

  const container = document.createDocumentFragment();
  const formEl = document.createElement('form');
  formEl.className = 'form-container';

  const canvasCreator = new CanvasCreator(canvascontainer, formEl, RATIOTYPES.wide);
  new CanvasCreator(canvascontainer, formEl, RATIOTYPES.square);

  formEl.addEventListener('change', (ev) => {
    const target = ev.target as HTMLInputElement;
    if (target.nodeName === 'SELECT' && target.dataset.type === 'themepicker') {
      store.dispatch(STOREACTIONS.setThemeName, (ev.target as HTMLInputElement).value);
      store.dispatch(STOREACTIONS.setTheme, themes[(ev.target as HTMLInputElement).value]);
    }
  });

  /**
   * TEXT controls
   */
  const textContainer = document.createElement('div');
  textContainer.className = 'form-area';
  formEl.appendChild(textContainer);

  /** TourName */
  const tourNameContainer = document.createElement('div');
  tourNameContainer.innerHTML = formElement('Tourname');
  textContainer.appendChild(tourNameContainer);

  /** ArtistName */
  const artistNameContainer = document.createElement('div');
  artistNameContainer.innerHTML = formElement('Artist');
  textContainer.appendChild(artistNameContainer);

  /** TourDates */
  const tourDates = new TourDates();
  textContainer.appendChild(tourDates.render());

  /**
   * update button
   */
  const updateButton = document.createElement('button');
  updateButton.className = 'button';
  updateButton.value = 'submit';
  updateButton.innerText = 'Opdater';

  updateButton.addEventListener('click', (ev) => {
    ev.preventDefault();
    store.dispatch(STOREACTIONS.textUpdate, true);
  });
  textContainer.appendChild(updateButton);

  /**
   * THEME controls
   */
  const themeContainer = document.createElement('div');
  themeContainer.className = 'form-area';
  formEl.appendChild(themeContainer);

  /** Themes */
  const themePicker = new ThemePicker();
  themeContainer.appendChild(themePicker.render());

  /** Colors */
  const colorPicker = new ColorPicker(['artist', 'date', 'tourname', 'venue']);
  themeContainer.appendChild(colorPicker.render());

  /**
   * IMAGE controls
   */
  const imageContainer = document.createElement('div');
  imageContainer.className = 'form-area';
  formEl.appendChild(imageContainer);

  /** Image */
  imageContainer.appendChild(new ImageHandler().render());

  /**
   * Add form element to container
   */
  container.appendChild(formEl);

  /** Buttons */
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'flex flex-justify--between form-element';

  const saveButton = document.createElement('button');
  saveButton.className = 'button button--submit';
  saveButton.value = 'submit';
  saveButton.innerText = 'Gem';

  saveButton.addEventListener('click', () => {
    saveToDisk(canvasCreator.bannerName);
  });

  buttonContainer.appendChild(saveButton);
  container.appendChild(buttonContainer);

  return container;
}
