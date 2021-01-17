import { DragHandler } from '../draghandler';
import { imageHandler } from '../imagehandler';
import { simpleTextStyler } from '../textstyler';
import { ICanvasTypesConfig, RATIOTYPES, ICurrentCanvasConfig, DATEINFOTYPES } from './canvascreator';

const sizeCanvas = (w, h, ratio = 4) => {
  const can = document.createElement('canvas') as HTMLCanvasElement;
  can.width = w * ratio;
  can.height = h * ratio;
  can.style.width = w + 'px';
  can.style.height = h + 'px';
  can.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
  can.getContext('2d').scale(ratio, ratio);
  return can;
};

export class CanvasCreator {
  private container: HTMLElement;
  private containerWidth = 640;
  private canvasContainer = document.createElement('div');
  private canvasConfig: ICanvasTypesConfig = {
    square: {
      left: 10,
      ratio: 1 / 2.3,
      top: 10,
      type: RATIOTYPES.square,
    },
    tall: {
      left: 10,
      ratio: 16 / 9,
      top: 10,
      type: RATIOTYPES.tall,
    },
    wide: {
      left: 20,
      ratio: 9 / 16,
      top: 20,
      type: RATIOTYPES.wide,
    },
  };
  private currentCanvas: ICurrentCanvasConfig[] = [];
  private fontsize = 32;
  private imageHasChanged = false;
  private lineheight = 60;
  private scaleFactor = 0.4;
  private theme = {
    artistColor: 'FFFFFF',
    bgColor: '000000',
    dateColor: '3333FF',
    font: `${this.fontsize}px/${this.lineheight}px Arial`,
    tournameColor: '3333FF',
    venueColor: 'FFFFFF',
  };
  private types = [RATIOTYPES.wide, RATIOTYPES.square, RATIOTYPES.tall];

  constructor(container) {
    this.container = container;
    this.containerWidth = 1600; // this.container.clientWidth;

    this.canvasContainer.className = 'flex flex-wrap flex-start';
    this.container.appendChild(this.canvasContainer);
  }

  public imageChanged(status: boolean) {
    this.imageHasChanged = status;
  }

  public addAll() {
    // TODO!!!
    // this.types.forEach((configName) => {
    //   this.addCanvas(configName);
    // });
    this.addCanvas(this.types[0]);
  }

  public addCanvas(configName) {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('style', `transform: scale(${this.scaleFactor}); transform-origin: top left;`);

    let width, height;
    switch (this.canvasConfig[configName].type) {
      case RATIOTYPES.square:
        width = this.containerWidth * this.canvasConfig[configName].ratio;
        height = this.containerWidth * this.canvasConfig[configName].ratio;
        break;
      case RATIOTYPES.tall:
        width = this.containerWidth / 2; // this.containerWidth * this.canvasConfig[configName].ratio;
        height = (this.containerWidth / 2) * this.canvasConfig[configName].ratio;
        break;
      case RATIOTYPES.wide:
        width = this.containerWidth;
        height = this.containerWidth * this.canvasConfig[configName].ratio;
        break;
    }
    const canvas = sizeCanvas(width, height, 4);
    canvas.id = this.canvasConfig[configName].type;
    const ctx = canvas.getContext('2d');

    this.canvasConfig[configName].canvas = canvas;
    this.canvasConfig[configName].canvasContext = ctx;

    const curCanvas = { canvas, canvasContext: ctx, configName };
    this.currentCanvas.push(curCanvas);

    canvas.height = height;
    canvas.width = width;

    wrapper.appendChild(canvas);
    this.canvasContainer.appendChild(wrapper);

    this.resetCanvas(curCanvas);
  }

  public async addContent(contentInfo, clear) {
    this.currentCanvas.forEach((current) => {
      const { configName } = current;
      const cfg = this.canvasConfig[configName];
      if (clear) {
        this.resetCanvas(cfg);
      }

      this.addImage(contentInfo, current);

      this.addText(contentInfo, current);
    });
  }

  public addDates(datesInfo, cfgName, top) {
    const cfg = this.canvasConfig[cfgName];
    const dateTexts = [];
    cfg.canvasContext.textBaseline = 'alphabetic';
    cfg.canvasContext.font = this.theme.font;
    for (const dates in datesInfo) {
      if (datesInfo[dates]) {
        let dateText, ticketText, venueText;

        datesInfo[dates].forEach((datesInfoElement: HTMLInputElement) => {
          const elName = datesInfoElement.name;

          if (elName.indexOf(DATEINFOTYPES.date) !== -1) {
            dateText = datesInfoElement.value.toUpperCase();
          }
          if (elName.indexOf(DATEINFOTYPES.venue) !== -1) {
            venueText = datesInfoElement.value.toUpperCase();
          }
          if (elName.indexOf(DATEINFOTYPES.tickets) !== -1 && datesInfoElement.checked) {
            switch (datesInfoElement.value) {
              case 'few':
                ticketText = 'Få billetter'.toUpperCase();
                break;
              case 'soldout':
                ticketText = 'Udsolgt'.toUpperCase();
                break;
              default:
                ticketText = '';
                break;
            }
          }
        });
        // cfg.canvasContext.fillStyle = this.theme.dateColor;
        dateTexts.push(
          `{#${this.theme.dateColor}${dateText}} {#${this.theme.venueColor}${venueText} {-${ticketText}}}`
        );
      }
    }
    simpleTextStyler.setFont(cfg.canvasContext);
    const datestexting = dateTexts.join('\n');
    console.log(datestexting);
    simpleTextStyler.drawText(
      cfg.canvasContext,
      datestexting,
      cfg.left * 2,
      top + cfg.top + this.fontsize,
      this.fontsize
    );
  }

  public async addImage(contentInfo, current: ICurrentCanvasConfig) {
    const { image } = contentInfo;
    const { canvas, canvasContext } = current;
    let imageReturn;
    if (image && this.imageHasChanged) {
      this.imageChanged(false);
      imageReturn = await imageHandler(image);

      const iWidth = imageReturn.width;
      const iHeight = imageReturn.height;
      const bigWidth = iWidth > iHeight;
      const ratio = bigWidth ? iHeight / iWidth : iWidth / iHeight;

      const cImgWidth = canvas.width / 3;
      const cImgMaxHeight = canvas.height / 3;
      const h = bigWidth ? cImgMaxHeight * ratio : cImgMaxHeight,
        w = bigWidth ? cImgWidth : cImgWidth * ratio,
        y = canvas.height - h,
        x = canvas.width - w;

      current.image = { image: imageReturn, x, y, w, h };
    }
    if (current.image) {
      const { image, x, y, w, h } = current.image;
      canvasContext.drawImage(image, x, y, w, h);
      current.image.dragImage = new DragHandler(current, this.scaleFactor);
    }
    console.log('canvas', this.currentCanvas);
  }

  public addText(stuff, current) {
    const { artist, dates, tourname } = stuff;

    const { configName } = current;
    const cfg = this.canvasConfig[configName];

    cfg.canvasContext.font = this.theme.font;
    cfg.canvasContext.textAlign = 'left';

    const tournameTop = cfg.top + this.lineheight;
    const headerString = `{#${this.theme.artistColor}${artist.toUpperCase()}}\n{#${
      this.theme.tournameColor
    }${tourname.toUpperCase()}}`;

    simpleTextStyler.drawText(cfg.canvasContext, headerString, cfg.left * 2, tournameTop, this.fontsize);

    this.addDates(dates, configName, tournameTop);
  }

  public getCanvas() {
    return this.currentCanvas;
  }

  public update(eleList: HTMLFormControlsCollection) {
    const formElements = Array.from(eleList);

    const info = {
      dates: {},
    };

    formElements.forEach((el: HTMLInputElement) => {
      if (el.dataset.line) {
        info.dates[el.dataset.line] = info.dates[el.dataset.line] || [];
        info.dates[el.dataset.line].push(el);
      } else if (el.name) {
        info[el.name] = el.value;
      } else if (el.type === 'file') {
        info['image'] = el.value ? el : null;
      }
    });

    this.addContent(info, true);
    // this.addText(info, true);
  }

  private resetCanvas(cfg: ICurrentCanvasConfig) {
    cfg.canvasContext.clearRect(0, 0, cfg.canvas.width, cfg.canvas.height);
    cfg.canvasContext.fillStyle = `#${this.theme.bgColor};`;
    cfg.canvasContext.fillRect(0, 0, cfg.canvas.width, cfg.canvas.height);
  }
}
