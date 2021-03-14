export function bottomLeft(options) {
  const { cHeight, h } = options;

  const y = cHeight - h,
    x = 0;

  return { x, y };
}
