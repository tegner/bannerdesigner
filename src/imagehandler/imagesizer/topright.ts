import { initialscaler } from './initialscaler';

export function topRight(image, canvas, type) {
  const iWidth = image.width;
  const iHeight = image.height;

  const cWidth = canvas.width;
  const cHeight = canvas.height;

  const { h, w } = initialscaler({ cHeight, cWidth, iHeight, iWidth, type });

  const y = 0,
    x = cWidth - w;

  return { image, x, y, w, h };
}
