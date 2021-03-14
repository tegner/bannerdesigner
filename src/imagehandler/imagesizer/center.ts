export function center(options) {
  const { cHeight, cWidth, h, w } = options;

  const y = cHeight / 2 - h / 2,
    x = cWidth / 2 - w / 2;

  return { x, y };
}
