import { initialscaler } from './initialscaler';

export function bottomRight(image, canvas, type) {
  const iWidth = image.width;
  const iHeight = image.height;

  const cWidth = canvas.width;
  const cHeight = canvas.height;

  const { h, w } = initialscaler({ cHeight, cWidth, iHeight, iWidth, type });

  const y = cHeight - h,
    x = 0;

  return { image, x, y, w, h };
}
