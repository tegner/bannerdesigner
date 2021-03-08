import { initialscaler } from './initialscaler';

export function bottom(image, canvas, type) {
  const iWidth = image.width;
  const iHeight = image.height;

  const cWidth = canvas.width;
  const cHeight = canvas.height;

  const { h, w } = initialscaler({ cHeight, cWidth, iHeight, iWidth, type });

  const y = cHeight - h,
    x = cWidth / 2 - w / 2;

  return { image, x, y, w, h };
}
