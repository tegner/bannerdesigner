import canvas2image from '../../public/notjs/canvas2image';

export function SaveToDisk(current) {
  const { canvas, height, type, width } = current;
  const fileName = `bannermaker-${type}`;
  canvas2image.saveAsImage(canvas, width, height, 'png', fileName);
}
