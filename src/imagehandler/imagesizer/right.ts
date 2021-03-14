export function right(options) {
  const { cHeight, cWidth, h, w } = options;

  const y = cHeight / 2 - h / 2,
    x = cWidth - w;

  return { x, y };
}
