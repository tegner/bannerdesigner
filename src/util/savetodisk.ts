import canvas2image from '../../public/js/canvas2image';

export function SaveToDisk(current) {
  const { canvas, height, width } = current;
  canvas2image.saveAsImage(canvas, width, height, 'png');
}
