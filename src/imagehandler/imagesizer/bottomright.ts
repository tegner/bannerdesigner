export function bottomRight(options) {
  const { cHeight, cWidth, h, w } = options;

  const y = cHeight - h,
    x = cWidth - w;

  return { x, y };
}
