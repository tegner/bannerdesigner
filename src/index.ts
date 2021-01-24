import { CanvasCreator } from './canvascreator';

import { LineItems } from './lineitem';
import { SaveToDisk } from './util/savetodisk';

const canvascontainer = document.getElementById('canvascontainer');

const canvasCreator = new CanvasCreator(canvascontainer);

const bannerdesigner = document.getElementById('bannerdesigner') as HTMLFormElement;

bannerdesigner.addEventListener('submit', (ev) => {
  ev.preventDefault();

  canvasCreator.update(bannerdesigner.elements);
});

const bdSave = document.getElementById('bdSave');

bdSave.addEventListener('click', () => {
  canvasCreator.getCanvas().forEach((currentCanvas) => {
    SaveToDisk(currentCanvas);
  });
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
