import { asyncForEach } from '../util/asyncforeach';
import { DragHandler, EVENTNAMES } from '../draghandler';
import { imageHandler } from '../imagehandler';
import { simpleTextStyler } from '../textstyler';
import { ICanvasTypesConfig, RATIOTYPES, ICurrentCanvasConfig, DATEINFOTYPES, ICanvasConfig } from './canvascreator';
import { themes } from './themes';

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

type TCurrentCanvasInfo = ICanvasConfig & ICurrentCanvasConfig;

export class CanvasCreator {
  public bannerName: string;

  private container: HTMLElement;
  private containerWidth = 640;
  private canvasContainer = document.createElement('div');
  private canvasConfig: ICanvasTypesConfig = {
    square: {
      fontSize: 45,
      header: 'Banner: Instagram',
      height: 900,
      imageConfig: {
        maxHeight: 0.5,
        maxWidth: 0.5,
      },
      left: 20,
      ratio: 1 / 2.3,
      top: 20,
      type: RATIOTYPES.square,
      width: 900,
    },
    tall: {
      fontSize: 36,
      header: 'Banner: Skyskraper',
      height: 600,
      imageConfig: {
        maxWidth: 1,
      },
      left: 20,
      ratio: 16 / 9,
      top: 20,
      type: RATIOTYPES.tall,
      width: 300,
    },
    wide: {
      fontSize: 55,
      header: 'Banner: Facebook',
      height: 700,
      imageConfig: {
        base: 'height',
        maxHeight: 1,
        square: 1,
        tall: 1,
        wide: 1,
      },
      left: 30,
      ratio: 7 / 19,
      top: 30,
      type: RATIOTYPES.wide,
      width: 1900,
    },
  };
  private currentCanvas: TCurrentCanvasInfo[] = [];
  private form;
  private image;

  private theme = {
    ...themes.classic,
  };

  private types = [RATIOTYPES.wide, RATIOTYPES.square]; // TODO? , RATIOTYPES.tall];

  constructor(container, bannerdesigner) {
    this.form = bannerdesigner;
    this.container = container;
    this.containerWidth = container.clientWidth;
    this.canvasContainer.className = 'flex flex-wrap flex-start';
    this.container.appendChild(this.canvasContainer);

    this.addAll();
  }

  public getCanvas(): TCurrentCanvasInfo[] {
    return this.currentCanvas;
  }

  public imageChanged(status: boolean) {
    this.currentCanvas.forEach((current) => (current.imageHasChanged = status));
  }

  public setTheme(themeName: string) {
    this.theme = themes[themeName];
  }

  public update() {
    const eleList = this.form.elements;
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
  }

  private addAll() {
    this.types.forEach((configName) => {
      this.addCanvas(configName);
    });
  }

  private addCanvas(configName) {
    const { header, height, type, width } = this.canvasConfig[configName];

    const wrapper = document.createElement('div');
    wrapper.className = 'margin-l--b';
    wrapper.id = `wrapper${type}`;
    this.canvasContainer.appendChild(wrapper);

    const head = document.createElement('h5');
    head.innerHTML = header;

    wrapper.appendChild(head);

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
    if (type !== RATIOTYPES.tall) {
      wrapper.setAttribute(
        'style',
        `width: ${width * scaleFactor}px; height: ${height * scaleFactor + head.clientHeight}px;`
      );
      canvas.setAttribute('style', `transform: scale(${scaleFactor}); transform-origin: top left;`);
    }
    canvas.id = type;
    const ctx = canvas.getContext('2d');

    const curCanvas = {
      ...this.canvasConfig[configName],
      canvas,
      canvasContext: ctx,
      configName,
      scaleFactor,
    };
    this.currentCanvas.push(curCanvas);

    canvas.height = height;
    canvas.width = width;

    wrapper.appendChild(canvas);

    this.resetCanvas(curCanvas);
  }

  private async addContent(contentInfo, clear) {
    await asyncForEach(this.currentCanvas, async (current) => {
      if (clear) {
        this.resetCanvas(current);
      }

      await this.addImage(contentInfo, current);

      this.addText(contentInfo, current);
    });
  }

  private async addImage(contentInfo, current: TCurrentCanvasInfo) {
    const { image } = contentInfo;
    const { canvas, canvasContext, imageConfig, type } = current;
    let { imageHasChanged } = current;

    let imageReturn;
    if (image && imageHasChanged) {
      current.imageHasChanged = false;

      imageReturn = await imageHandler(image);
      console.log('imageRetr', imageReturn);
      this.image = imageReturn;
      if (current.image) delete current.image;

      const iWidth = this.image.width;
      const iHeight = this.image.height;

      console.log(imageConfig, type);
      const cWidth = canvas.width;
      const cHeight = canvas.height;

      let w = cWidth > iWidth ? cWidth : iWidth;
      let h = cHeight > iHeight ? cHeight : iHeight;
      let ratio = 1;
      let imageType = 'square';
      if (iWidth > iHeight) {
        console.log('image is a rect');
        imageType = 'rect';
        ratio = iHeight / iWidth;
        if (type === RATIOTYPES.square) {
          ratio = iWidth / cWidth;
          w = cWidth * ratio;
          h = cHeight;
        } else if (type === RATIOTYPES.wide) {
          ratio = iHeight / iWidth;
          w = cWidth;
          h = cWidth * ratio;
          console.log('w', w, 'j', h, ratio);
        }
      } else if (iWidth < iHeight) {
        console.log('image is a tall rect');
        imageType = 'tallrect';
        if (type === RATIOTYPES.square) {
          ratio = iHeight / cHeight;
          w = cWidth;
          h = cHeight * ratio;
        } else if (type === RATIOTYPES.wide) {
          ratio = iHeight / iWidth;
          w = cWidth;
          h = cWidth * ratio;
        }
      } else {
        console.log('image is a quadrant');
        if (type === RATIOTYPES.square) {
          w = cWidth;
          h = cHeight;
        } else if (type === RATIOTYPES.wide) {
          w = h = cWidth;
        }
      }

      console.log(imageType, type, ratio);

      const y = 0,
        x = 0;

      current.image = { image: this.image, x, y, w, h };
    }

    if (current.image) {
      const { image, x, y, w, h } = current.image;

      canvasContext.drawImage(image, x, y, w, h);

      if (current.dragImage) {
        current.dragImage.setImage(current.image);
        return;
      }

      current.dragImage = new DragHandler(current, current.scaleFactor);

      current.dragImage.events.on(EVENTNAMES.dragstop, (getBack: CustomEvent) => {
        const { detail } = getBack;
        current.image = { ...current.image, ...detail };
        console.log('drag events');
        this.update();
      });
    }
  }

  private async addText(stuff, current: TCurrentCanvasInfo) {
    const { artist, dates, tourname } = stuff;

    const { canvasContext, configName } = current;
    const cfg = this.canvasConfig[configName];
    const { fontSize } = cfg;

    await (canvasContext.font = this.canvasFont(configName));

    canvasContext.textAlign = 'left';
    canvasContext.textBaseline = 'top';

    const tournameTop = cfg.top * 2;

    const headerString = `{#${this.theme.artistColor}${artist.toUpperCase()}}\n{#${
      this.theme.tournameColor
    }${tourname.toUpperCase()}}`;

    simpleTextStyler.setFont(canvasContext);
    await simpleTextStyler.drawText(canvasContext, headerString, cfg.left * 2, tournameTop, fontSize);

    this.bannerName = `${artist.replace(/\s/g, '-')}_${tourname.replace(/\s/g, '-')}`;

    canvasContext.measureText(headerString).actualBoundingBoxAscent;
    this.addDates(dates, configName, tournameTop + fontSize * 2, current);
  }

  private async addDates(datesInfo, cfgName, top, current: TCurrentCanvasInfo) {
    const cfg = this.canvasConfig[cfgName];
    const dateTexts = [];
    const { canvasContext } = current;
    canvasContext.textBaseline = 'alphabetic';
    await (canvasContext.font = this.canvasFont(cfgName));

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

        dateTexts.push(
          `{#${this.theme.dateColor}${dateText}} {#${this.theme.venueColor}${venueText} {-${ticketText}}}`
        );
      }
    }

    simpleTextStyler.setFont(canvasContext);
    const datestexting = dateTexts.join('\n');

    const textTop = top + cfg.top + cfg.fontSize;

    await simpleTextStyler.drawText(canvasContext, datestexting, cfg.left * 2, textTop, cfg.fontSize);
  }

  private canvasFont(cfgName: string) {
    return `${this.canvasConfig[cfgName].fontSize}px ${this.theme.fontFamily}`;
  }

  private resetCanvas(currentCfg: TCurrentCanvasInfo) {
    currentCfg.canvasContext.clearRect(0, 0, currentCfg.canvas.width, currentCfg.canvas.height);
    currentCfg.canvasContext.beginPath(); //ADD THIS LINE!<<<<<<<<<<<<<
    currentCfg.canvasContext.moveTo(0, 0);
    // currentCfg.canvasContext.lineTo(event.clientX, event.clientY);
    currentCfg.canvasContext.stroke();
    currentCfg.canvasContext.fillStyle = `#${this.theme.bgColor};`;
    currentCfg.canvasContext.fillRect(0, 0, currentCfg.canvas.width, currentCfg.canvas.height);
  }
}
