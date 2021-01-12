// import canvas2image from 'canvas2image-2';
import { CanvasCreator } from './canvascreator';

import { LineItems } from './lineitem';

const canvascontainer = document.getElementById('canvascontainer');

const canvasCreator = new CanvasCreator(canvascontainer);
canvasCreator.addAll();

// console.log('canvasCreator', canvasCreator);

// var canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
// var canvasContext = canvas.getContext('2d');
// canvasContext.fillStyle = 'rgb(200, 0, 0)';
// canvasContext.fillRect(0, 0, canvas.width, canvas.height);
// canvasContext.fillStyle = 'rgb(0, 30, 0)';
// canvasContext.font = '30px Arial';
// canvasContext.fillText('Your Text', 10, 50);

// console.log('we in here?');

// const bdText = document.getElementById('bdText') as HTMLInputElement;
// const bdUpdate = document.getElementById('bdUpdate');

// const bdTitle = document.getElementById('bdTitle') as HTMLInputElement;
// const bdArtist = document.getElementById('bdArtist') as HTMLInputElement;

const bannerdesigner = document.getElementById('bannerdesigner') as HTMLFormElement;

bannerdesigner.addEventListener('submit', (ev) => {
  ev.preventDefault();
  // canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  // canvasContext.fillText(bdText.value, 10, 50);
  canvasCreator.update(bannerdesigner.elements);
  // canvasCreator.addText(bdArtist.value, bdTitle.value);
});

const bdSave = document.getElementById('bdSave');

// save img
// const typeSet = document.getElementById('typeSet') as HTMLFieldSetElement;

bdSave.addEventListener('click', () => {
  // const imgTypes = Array.from(typeSet.elements).filter((typeInput) => (typeInput as HTMLInputElement).checked);
  // console.log(imgTypes);
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
