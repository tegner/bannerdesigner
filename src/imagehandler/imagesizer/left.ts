export function left(options) {
  const { cHeight, h } = options;

  const y = cHeight / 2 - h / 2,
    x = 0;

  return { x, y };
}
