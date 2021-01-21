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
      height: 900,
      left: 10,
      ratio: 1 / 2.3,
      top: 10,
      type: RATIOTYPES.square,
      width: 900,
    },
    tall: {
      height: 600,
      left: 10,
      ratio: 16 / 9,
      top: 10,
      type: RATIOTYPES.tall,
      width: 300,
    },
    wide: {
      height: 700,
      left: 20,
      ratio: 7 / 19,
      top: 20,
      type: RATIOTYPES.wide,
      width: 1900,
    },
  };
  private currentCanvas: ICurrentCanvasConfig[] = [];
  private fontsize = 32;
  private imageHasChanged = false;
  private lineheight = 60;
  private theme = {
    artistColor: 'FFFFFF',
    bgColor: '000000',
    dateColor: '3333FF',
    font: `${this.fontsize}px/${this.lineheight}px Arial`,
    tournameColor: '3333FF',
    venueColor: 'FFFFFF',
  };
  private types = [RATIOTYPES.wide, RATIOTYPES.square]; // TODO? , RATIOTYPES.tall];

  constructor(container) {
    this.container = container;
    this.containerWidth = container.clientWidth;
    this.canvasContainer.className = 'flex flex-wrap flex-start';
    this.container.appendChild(this.canvasContainer);
  }

  public imageChanged(status: boolean) {
    this.imageHasChanged = status;
  }

  public addAll() {
    this.types.forEach((configName) => {
      this.addCanvas(configName);
    });
  }

  public addCanvas(configName) {
    const wrapper = document.createElement('div');
    wrapper.className = 'margin-l--b';

    const { height, type, width } = this.canvasConfig[configName];

    let scaleFactor;
    switch (type) {
      case RATIOTYPES.square:
        scaleFactor = this.containerWidth / this.canvasConfig.wide.width;
        break;
      case RATIOTYPES.tall:
        scaleFactor = width < this.containerWidth / 2 ? 1 : width / this.containerWidth;
        break;
      case RATIOTYPES.wide:
        scaleFactor = this.containerWidth / width;
        break;
    }

    const canvas = sizeCanvas(width, height, 4);
    console.log('scalefac', scaleFactor, configName);
    if (type !== RATIOTYPES.tall) {
      wrapper.setAttribute('style', `width: ${width * scaleFactor}px; height: ${height * scaleFactor}px;`);
      canvas.setAttribute('style', `transform: scale(${scaleFactor}); transform-origin: top left;`);
    }
    canvas.id = type;
    const ctx = canvas.getContext('2d');

    this.canvasConfig[configName].canvas = canvas;
    this.canvasConfig[configName].canvasContext = ctx;

    const curCanvas = { canvas, canvasContext: ctx, configName, scaleFactor };
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
      current.image.dragImage = new DragHandler(current, current.scaleFactor);
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
