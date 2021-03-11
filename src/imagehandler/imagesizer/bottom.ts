export function bottom(options) {
  const { cHeight, cWidth, h, w } = options;

  const y = cHeight - h,
    x = cWidth / 2 - w / 2;

  return { x, y };
}
