import canvas2image from 'canvas2image-2';
import { CanvasCreator } from './canvascreator';

import { LineItems } from './lineitem';

const canvascontainer = document.getElementById('canvascontainer');

const canvasCreator = new CanvasCreator(canvascontainer);
canvasCreator.addAll();

const bannerdesigner = document.getElementById('bannerdesigner') as HTMLFormElement;

bannerdesigner.addEventListener('submit', (ev) => {
  ev.preventDefault();

  canvasCreator.update(bannerdesigner.elements);
});

const bdSave = document.getElementById('bdSave');

bdSave.addEventListener('click', () => {
  console.log(canvasCreator.getCanvas());
  console.log(canvas2image);
  const currentCanvas = canvasCreator.getCanvas()[0];
  // const img = canvas2image.convertToImage(currentCanvas.canvas, 1600, 900, 'png');

  canvas2image.saveAsImage(currentCanvas.canvas, 1600, 900, 'png');
  // for (const imgTypeEl of imgTypes) {
  //   const imgType = (imgTypeEl as HTMLInputElement).value;
  //   console.log(imgType);
  //   canvas2image.convertToImage(canvas, 900, 1600, imgType);
  //   canvas2image.saveAsImage(canvas, 900, 1600, imgType);
  // }
  // canvas2image.convertToImage(canvas, 1600, 900, imgType);
  // canvas2image.convertToImage(canvas, 900, 900, imgType);
  // canvas2image.saveAsImage(canvas, 900, 1600, imgType);
  // canvas2image.saveAsImage(canvas, 1600, 900, imgType);
  // canvas2image.saveAsImage(canvas, 900, 900, imgType);
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
