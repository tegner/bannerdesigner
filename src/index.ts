import { CanvasCreator } from './canvascreator';
import { themes } from './canvascreator/themes';

import { LineItems } from './lineitem';
import { saveToDisk } from './util/savetodisk';

const canvascontainer = document.getElementById('canvascontainer');

const canvasCreator = new CanvasCreator(canvascontainer);

const bannerdesigner = document.getElementById('bannerdesigner') as HTMLFormElement;

bannerdesigner.addEventListener('submit', (ev) => {
  ev.preventDefault();

  canvasCreator.update(bannerdesigner.elements);
});

bannerdesigner.addEventListener('change', (ev) => {
  console.log('it done changed', (ev.target as HTMLInputElement).value, ev);
  if ((ev.target as HTMLInputElement).nodeName === 'SELECT') {
    canvasCreator.setTheme((ev.target as HTMLInputElement).value);
  }
});

const bdSave = document.getElementById('bdSave');

bdSave.addEventListener('click', () => {
  saveToDisk(canvasCreator.getCanvas(), canvasCreator.bannerName);
});

const thing = document.getElementById('lineitems');
const lineItems = new LineItems();

thing.appendChild(lineItems.render());

const fileElementBtn = document.getElementById('fileElementBtn');
const fileElementValue = document.getElementById('fileElementValue');

const bdFile = document.getElementById('bdFile') as HTMLInputElement;

bdFile.addEventListener('change', () => {
  canvasCreator.imageChanged(true);
  const splitValue = bdFile.value.split('\\');
  fileElementValue.innerHTML = splitValue[splitValue.length - 1];
});

fileElementBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
  bdFile.click();
});

for (const theme in themes) {
  if (theme) {
    console.log('theme', theme, themes[theme].fontFamily);
    const themeFont = document.createElement('div');
    themeFont.setAttribute('style', `font-family: "${themes[theme].fontFamily}";visibility: hidden;`);
    themeFont.innerHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ . abcdefghijklmnopqrstuvwxyzæøå . 0987654321';
    document.body.appendChild(themeFont);
  }
}
