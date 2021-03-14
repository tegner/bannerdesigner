export function topRight(options) {
  const { cWidth, w } = options;

  const y = 0,
    x = cWidth - w;

  return { x, y };
}
