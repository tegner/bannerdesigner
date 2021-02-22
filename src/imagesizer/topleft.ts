import { scaler } from './scaler';

export function topLeft(image, canvas, type) {
  const iWidth = image.width;
  const iHeight = image.height;

  const cWidth = canvas.width;
  const cHeight = canvas.height;

  const { h, w } = scaler({ cHeight, cWidth, iHeight, iWidth, type });

  const y = 0,
    x = 0;

  return { image, x, y, w, h };
}
