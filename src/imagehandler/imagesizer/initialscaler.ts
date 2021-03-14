import { RATIOTYPES } from '../../canvascreator/canvascreator';
import store from '../../util/store';

export function initialscaler(scalerOptions) {
  const { cHeight, cWidth, iHeight, iWidth, type } = scalerOptions;
  console.log('scalerOptions', scalerOptions, 'store.state.imageScale[type]', store.state.imageScale[type]);

  let w = cWidth > iWidth ? cWidth : iWidth;
  let h = cHeight > iHeight ? cHeight : iHeight;
  let ratio = 1;

  if (iWidth > iHeight) {
    ratio = iHeight / iWidth;
    if (type === RATIOTYPES.square) {
      ratio = iWidth / iHeight;
      h = cHeight;
      w = cWidth * ratio;
    } else if (type === RATIOTYPES.wide) {
      ratio = iHeight / iWidth;
      w = cWidth;
      h = cWidth * ratio;
    }
  } else if (iWidth < iHeight) {
    if (type === RATIOTYPES.square) {
      ratio = iHeight / iWidth;
      w = cWidth;
      h = cHeight * ratio;
    } else if (type === RATIOTYPES.wide) {
      ratio = iHeight / iWidth;
      w = cWidth;
      h = cWidth * ratio;
    }
  } else {
    if (type === RATIOTYPES.square) {
      w = cWidth;
      h = cHeight;
    } else if (type === RATIOTYPES.wide) {
      w = h = cWidth;
    }
  }

  h = h * store.state.imageScale[type];
  w = w * store.state.imageScale[type];
  console.log('scalerOptions', h, w);
  return { h, w };
}
