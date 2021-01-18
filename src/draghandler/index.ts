import { ICurrentCanvasConfig } from '../canvascreator/canvascreator';

// var canvas = document.getElementById('canvas') as HTMLCanvasElement;
// var ctx = canvas.getContext('2d');

// // variables used to get mouse position on the canvas
// var offsetX = canvas.offsetLeft;
// var offsetY = canvas.offsetTop;

// // variables to save last mouse position
// // used to see how far the user dragged the mouse
// // and then move the text by that distance
// var startX;
// var startY;

// // some text objects
// var texts = [];

// // some test texts
// texts.push({
//   text: 'Hello',
//   x: 20,
//   y: 20,
// });
// texts.push({
//   text: 'World',
//   x: 20,
//   y: 70,
// });

// // calculate width of each text for hit-testing purposes
// ctx.font = '16px verdana';
// for (var i = 0; i < texts.length; i++) {
//   var text = texts[i];
//   text.width = ctx.measureText(text.text).width;
//   text.height = 16;
// }

// // this var will hold the index of the selected text
// var selectedText = -1;

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

  // clear the canvas draw all texts
  // private draw() {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   for (var i = 0; i < texts.length; i++) {
  //     var text = texts[i];
  //     ctx.fillText(text.text, text.x, text.y);
  //   }
  // }

  // test if x,y is inside the bounding box of texts[textIndex]
  private imageHittest(x, y) {
    const { h: imageH, x: imageX, y: imageY, w: imageW } = this.imageInfo;

    const scaledX = imageX * this.scaleFactor;
    const scaledY = imageY * this.scaleFactor;
    console.log('imageHittest h - w', imageH, imageW);

    // console.log('imageHittest x ', x, scaledX * this.scaleFactor);
    console.log('imageHittest scaledY', scaledY + imageH);
    console.log('imageHittest mouse y', y);

    // console.log('imageHittest x', x >= scaledX && x <= scaledX + imageW);
    console.log('imageHittest y', y >= scaledY - imageH, y <= scaledY + imageH);

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

    console.log(this.imageHittest(this.startX, this.startY));
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
    console.log(this.imageInfo);
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

    console.log(this.imageInfo);
    // this.draw();
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
