import { imageHandler } from '../imagehandler';
import { simpleTextStyler } from '../textstyler';

enum RATIOTYPES {
  square = 'square',
  tall = 'tall',
  wide = 'wide',
}

enum DATEINFOTYPES {
  date = 'date',
  venue = 'venue',
  tickets = 'tickets',
}

interface ICurrentCanvasConfig {
  canvas?: HTMLCanvasElement;
  canvasContext?: CanvasRenderingContext2D;
  configName?: string;
  image?: HTMLImageElement;
}

interface ICanvasTypesConfig {
  [id: string]: ICanvasConfig;
}

interface ICanvasConfig {
  canvas?: any;
  canvasContext?: any;
  left: number;
  ratio: number;
  top: number;
  type: string;
}

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
  private fontsize = 16;
  private lineheight = 30;
  private theme = {
    artistColor: 'FFFFFF',
    bgColor: '000000',
    dateColor: '3333FF',
    tournameColor: '3333FF',
    venueColor: 'FFFFFF',
  };
  private types = [RATIOTYPES.wide, RATIOTYPES.square, RATIOTYPES.tall];

  constructor(container) {
    this.container = container;
    this.containerWidth = this.container.clientWidth;

    this.canvasContainer.className = 'flex flex-wrap flex-start';
    this.container.appendChild(this.canvasContainer);
  }

  public addAll() {
    // this.types.forEach((configName) => {
    // this.addCanvas(configName);
    // });
    this.addCanvas(this.types[0]);
  }

  public addCanvas(configName) {
    const wrapper = document.createElement('div');
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.id = this.canvasConfig[configName].type;
    const ctx = canvas.getContext('2d');

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

    this.canvasConfig[configName].canvas = canvas;
    this.canvasConfig[configName].canvasContext = ctx;

    this.currentCanvas.push({ canvas, canvasContext: ctx, configName });

    canvas.height = height;
    canvas.width = width;

    canvas.setAttribute('style', `background: #${this.theme.bgColor};`);

    wrapper.appendChild(canvas);
    this.canvasContainer.appendChild(wrapper);
  }

  public async addContent(contentInfo, clear) {
    const { image } = contentInfo;
    let imageReturn;
    if (image) {
      imageReturn = await imageHandler(image);
      console.log(imageReturn);
    }
    console.log('image?', image);
    this.currentCanvas.forEach((current) => {
      const { configName } = current;
      const cfg = this.canvasConfig[configName];
      if (clear) {
        cfg.canvasContext.clearRect(0, 0, cfg.canvas.width, cfg.canvas.height);
      }
      if (image) {
        this.addImage(imageReturn, current);
      }
      this.addText(contentInfo, current);
    });
  }

  public addDates(datesInfo, cfgName, top) {
    const cfg = this.canvasConfig[cfgName];
    const dateTexts = [];
    for (const dates in datesInfo) {
      if (datesInfo[dates]) {
        let dateText, ticketText, venueText;
        cfg.canvasContext.textBaseline = 'alphabetic';
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
        cfg.canvasContext.fillStyle = this.theme.dateColor;
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
      cfg.left,
      top + cfg.top + this.lineheight,
      this.fontsize
    );
  }

  public addImage(baseImage, current) {
    console.log(baseImage);

    const iWidth = baseImage.width;
    const iHeight = baseImage.height;
    const bigWidth = iWidth > iHeight;
    const ratio = bigWidth ? iHeight / iWidth : iWidth / iHeight;

    const { canvas, canvasContext } = current;
    current.image = baseImage;
    const cImgWidth = canvas.width / 3;
    const cImgMaxHeight = canvas.height / 3;
    const h = bigWidth ? cImgMaxHeight * ratio : cImgMaxHeight,
      w = bigWidth ? cImgWidth : cImgWidth * ratio,
      y = canvas.height - h,
      x = canvas.width - w;

    console.log('cImgWidth', cImgWidth, cImgWidth * ratio, ratio, cImgMaxHeight);

    canvasContext.drawImage(baseImage, x, y, w, h);

    console.log('canvas', this.currentCanvas);
  }

  public addText(stuff, current) {
    const { artist, dates, tourname } = stuff;

    const { configName } = current;
    const cfg = this.canvasConfig[configName];

    cfg.canvasContext.font = `${this.fontsize}px/1 Arial`;
    cfg.canvasContext.textAlign = 'left';

    const tournameTop = cfg.top + this.lineheight / 2;
    const headerString = `{#${this.theme.artistColor}${artist.toUpperCase()}}\n{#${
      this.theme.tournameColor
    }${tourname.toUpperCase()}}`;
    simpleTextStyler.drawText(cfg.canvasContext, headerString, cfg.left, cfg.top + this.fontsize, this.fontsize);

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
}
