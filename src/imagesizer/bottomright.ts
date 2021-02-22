import { scaler } from './scaler';

export function bottomRight(image, canvas, type) {
  const iWidth = image.width;
  const iHeight = image.height;

  const cWidth = canvas.width;
  const cHeight = canvas.height;

  const { h, w } = scaler({ cHeight, cWidth, iHeight, iWidth, type });

  const y = cHeight - h,
    x = cWidth - w;

  return { image, x, y, w, h };
}
