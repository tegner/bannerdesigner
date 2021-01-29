import { asyncForEach } from '../util/asyncforeach';
import { DragHandler } from '../draghandler';
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
      fontSize: 36,
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
      left: 40,
      ratio: 7 / 19,
      top: 40,
      type: RATIOTYPES.wide,
      width: 1900,
    },
  };
  private currentCanvas: TCurrentCanvasInfo[] = [];
  private fontsize = 64;
  private image;
  private imageHasChanged = false;

  private theme = {
    ...themes.classic,
  };

  private types = [RATIOTYPES.wide, RATIOTYPES.square]; // TODO? , RATIOTYPES.tall];

  constructor(container) {
    this.container = container;
    this.containerWidth = container.clientWidth;
    this.canvasContainer.className = 'flex flex-wrap flex-start';
    this.container.appendChild(this.canvasContainer);

    this.addAll();
  }

  public imageChanged(status: boolean) {
    this.imageHasChanged = status;
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
    let imageReturn;
    if (image && this.imageHasChanged) {
      this.imageChanged(false);
      imageReturn = await imageHandler(image);
      this.image = imageReturn;
      if (current.image) delete current.image;
    }
    if (this.image) {
      const iWidth = this.image.width;
      const iHeight = this.image.height;
      const bigWidth = iWidth > iHeight;

      let ratio = bigWidth ? iWidth / iHeight : iHeight / iWidth;

      const { maxHeight, maxWidth } = imageConfig;
      const cImgMaxWidth = maxWidth ? canvas.width * maxWidth : iWidth * ratio;
      const cImgMaxHeight = maxHeight ? canvas.height * maxHeight : canvas.height;
      let h = cImgMaxHeight,
        w = cImgMaxWidth;

      if (iWidth > iHeight) {
        ratio = iHeight / iWidth;
        w = type === RATIOTYPES.wide ? w * ratio : w;
        h = type === RATIOTYPES.square ? w * maxWidth : h;
      } else if (iWidth < iHeight) {
        ratio = iWidth / iHeight;
        w = h * ratio;
      } else {
        w = h;
      }
      const y = canvas.height - h,
        x = canvas.width - w;

      current.image = { image: this.image, x, y, w, h };
    }

    if (current.image) {
      const { image, x, y, w, h } = current.image;
      canvasContext.drawImage(image, x, y, w, h);
      current.image.dragImage = new DragHandler(current, current.scaleFactor);
    }
  }

  private async addText(stuff, current: TCurrentCanvasInfo) {
    const { artist, dates, tourname } = stuff;

    const { canvasContext, configName } = current;
    const cfg = this.canvasConfig[configName];

    await (canvasContext.font = this.canvasFont(configName));
    console.log('fontshit . configName', configName, this.canvasFont(configName));
    canvasContext.textAlign = 'left';
    canvasContext.textBaseline = 'top';

    const tournameTop = cfg.top * 2;

    const headerString = `{#${this.theme.artistColor}${artist.toUpperCase()}}\n{#${
      this.theme.tournameColor
    }${tourname.toUpperCase()}}`;
    console.log('headerString ... RIGHT BEFORE DRAWTEXT', current.configName);
    await simpleTextStyler.drawText(canvasContext, headerString, cfg.left * 2, tournameTop, this.fontsize);

    this.bannerName = `${artist.replace(/\s/g, '-')}_${tourname.replace(/\s/g, '-')}`;

    canvasContext.measureText(headerString).actualBoundingBoxAscent;
    this.addDates(dates, configName, tournameTop + this.fontsize * 2, current);
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

  private async addDates(datesInfo, cfgName, top, current: TCurrentCanvasInfo) {
    const cfg = this.canvasConfig[cfgName];
    const dateTexts = [];
    const { canvasContext } = current;
    canvasContext.textBaseline = 'alphabetic';
    await (canvasContext.font = this.canvasFont(cfgName));
    console.log('addDates', cfgName, this.canvasFont(cfgName));
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
    console.log('canvasContext.font', canvasContext.font);
    simpleTextStyler.setFont(canvasContext);
    const datestexting = dateTexts.join('\n');

    const textTop = top + cfg.top + this.fontsize;
    console.log('datetext', datestexting);
    await simpleTextStyler.drawText(canvasContext, datestexting, cfg.left * 2, textTop, this.fontsize);
  }

  private canvasFont(cfgName: string) {
    return `${this.canvasConfig[cfgName].fontSize}px ${this.theme.fontFamily}`;
  }

  private resetCanvas(currentCfg: TCurrentCanvasInfo) {
    currentCfg.canvasContext.clearRect(0, 0, currentCfg.canvas.width, currentCfg.canvas.height);
    currentCfg.canvasContext.fillStyle = `#${this.theme.bgColor};`;
    currentCfg.canvasContext.fillRect(0, 0, currentCfg.canvas.width, currentCfg.canvas.height);
  }
}
