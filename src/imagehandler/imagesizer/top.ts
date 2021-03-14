export function top(options) {
  const { cWidth, w } = options;

  const y = 0,
    x = cWidth / 2 - w / 2;

  return { x, y };
}
