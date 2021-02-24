import store from '../util/store';

function scalePoint(pos: string) {
  const point = document.createElement('div');
  point.className = `scalepoint scalepoint--${pos}`;

  return point;
}

export function manualScaler() {
  console.log('image SCALE!');
  console.log('store, store.state', store.state.canvases);

  store.state.canvases.forEach((element) => {
    const { image, scaleFactor } = element;
    const scaleElement = document.createElement('div');

    const scaleImage = document.createElement('img');
    scaleImage.src = image.image.src;
    scaleImage.setAttribute('style', 'height: 100%; width: 100%;');

    scaleElement.appendChild(scaleImage);
    scaleElement.className = 'scalearea';

    const styleString = `
      top: ${image.x}px;
      left: ${image.y}px;
      width:${image.w}px;
      height:${image.h}px;
      transform: scale(${scaleFactor});
      `;
    scaleElement.setAttribute('style', styleString);

    ['topright', 'topleft', 'bottomright', 'bottomleft'].forEach((pos) => {
      scaleElement.appendChild(scalePoint(pos));
    });

    element.wrapper.appendChild(scaleElement);
  });
}
