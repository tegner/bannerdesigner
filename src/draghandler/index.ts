import { ICurrentCanvasConfig } from '../canvascreator/canvascreator';

export class DragHandler {
  private current;
  private dragging = false;
  private imageInfo;

  // variables used to get mouse position on the canvas
  private offsetX: number;
  private offsetY: number;

  private scaleFactor: number;

  // variables to save last mouse position
  // used to see how far the user dragged the mouse
  // and then move the text by that distance
  private startX: number;
  private startY: number;

  constructor(current: ICurrentCanvasConfig, scaleFactor: number) {
    this.scaleFactor = scaleFactor;
    this.offsetX = current.canvas.offsetLeft;
    this.offsetY = current.canvas.offsetTop;
    this.current = current;
    this.imageInfo = current.image;

    // listen for mouse events
    current.canvas.addEventListener('mousedown', (mouseEv: MouseEvent) => {
      this.handleMouseDown(mouseEv);
    });
    current.canvas.addEventListener('mousemove', (mouseEv: MouseEvent) => {
      this.handleMouseMove(mouseEv);
    });
    current.canvas.addEventListener('mouseout', (mouseEv: MouseEvent) => {
      this.handleMouseOut(mouseEv);
    });
    current.canvas.addEventListener('mouseup', (mouseEv: MouseEvent) => {
      this.handleMouseUp(mouseEv);
    });
  }

  // test if x,y is inside the bounding box of texts[textIndex]
  private imageHittest(x, y) {
    const { h: imageH, x: imageX, y: imageY, w: imageW } = this.imageInfo;

    const scaledX = imageX * this.scaleFactor;
    const scaledY = imageY * this.scaleFactor;

    return x >= scaledX && x <= scaledX + imageW && y >= scaledY && y <= scaledY + imageH;
  }

  // handle mousedown events
  // iterate through texts[] and see if the user
  // mousedown'ed on one of them
  // If yes, set the selectedText to the index of that text
  private handleMouseDown(ev: MouseEvent) {
    ev.preventDefault();
    this.startX = ev.clientX - this.offsetX;
    this.startY = ev.clientY - this.offsetY;

    // Put your mousedown stuff here

    this.dragging = this.imageHittest(this.startX, this.startY);
  }

  // handle mousemove events
  // calc how far the mouse has been dragged since
  // the last mousemove event and move the selected text
  // by that distance
  private handleMouseMove(ev: MouseEvent) {
    if (!this.dragging) {
      return;
    }
    ev.preventDefault();

    const mouseX = ev.clientX - this.offsetX;
    const mouseY = ev.clientY - this.offsetY;

    // Put your mousemove stuff here
    var dx = mouseX - this.startX;
    var dy = mouseY - this.startY;
    this.startX = mouseX;
    this.startY = mouseY;

    const { h, image, x, y, w } = this.imageInfo;
    this.current.canvasContext.fillRect(x, y, x + w, y + h);

    this.imageInfo.x += dx;
    this.imageInfo.y += dy;

    this.current.canvasContext.drawImage(image, this.imageInfo.x, this.imageInfo.y, w, h);
  }

  // // also done dragging
  private handleMouseOut(ev: MouseEvent) {
    ev.preventDefault();
    this.dragging = false;
  }

  // // done dragging
  private handleMouseUp(ev: MouseEvent) {
    ev.preventDefault();
    this.dragging = false;
  }
}
