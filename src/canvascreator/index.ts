import { ICanvasTypesConfig, RATIOTYPES, ICurrentCanvasConfig, ICanvasConfig } from './canvascreator';
import { IThemeObject } from './themes';

import { DragHandler, EVENTNAMES } from '../draghandler';
import { imagePositioner } from '../imagehandler/';
import { simpleTextStyler } from '../textstyler';

import store from '../util/store';
import { asyncForEach } from '../util/asyncforeach';
import { eventhandler } from '../util/eventhandler';
import { STOREACTIONS } from '../util/store/actions';
import { STATENAMES } from '../util/initialstate';
import { initialscaler } from '../imagehandler/imagesizer/initialscaler';

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
  private containerWidth: number = 640;
  private canvasContainer = document.createElement('div');
  private canvasConfig: ICanvasTypesConfig = {
    square: {
      fontSize: 45,
      header: 'Banner: Instagram',
      height: 900,
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
      left: 30,
      ratio: 7 / 19,
      top: 30,
      type: RATIOTYPES.wide,
      width: 1900,
    },
  };
  private currentCanvas: TCurrentCanvasInfo[] = [];
  private currentType: RATIOTYPES;

  private image: HTMLImageElement;
  private imageHasChanged: any = false;
  private simpleTextStyler = new simpleTextStyler();
  private theme: IThemeObject;

  constructor(container: HTMLDivElement, type: RATIOTYPES) {
    this.container = container;
    this.containerWidth = container.clientWidth;
    this.canvasContainer.className = 'flex flex-wrap flex-start';
    this.container.appendChild(this.canvasContainer);

    this.setTheme(store.state.theme, false);
    this.currentType = type;
    this.addAll(type);

    eventhandler.subscribe(STATENAMES.theme, (theme, _state) => {
      this.setTheme(theme);
    });

    eventhandler.subscribe([STATENAMES.imageChange], (imageChange, _state) => {
      this.imageHasChanged = imageChange;

      if (this.imageHasChanged.type === this.currentType) {
        this.handleContent();
      }
    });

    eventhandler.subscribe([STATENAMES.userContent], (userContent) => {
      this.handleContent(userContent);
    });
  }

  private setTheme(theme: IThemeObject, update = true) {
    this.theme = theme;

    if (!this.theme.loaded) {
      const themeFont = document.createElement('div');
      themeFont.setAttribute('style', `font-family: "${this.theme.fontFamily}";visibility: hidden;`);
      themeFont.innerHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ . abcdefghijklmnopqrstuvwxyzæøå . 0987654321';
      document.body.appendChild(themeFont);

      setTimeout(() => {
        if (update) {
          this.handleContent();
        }
        this.theme.loaded = true;
      }, 200);
    } else if (update) {
      this.handleContent();
    }
  }

  private addAll(type: RATIOTYPES) {
    this.addCanvas(type);

    this.updateState();
  }

  private addCanvas(configName) {
    const { header, height, type, width } = this.canvasConfig[configName];

    const wrapper = document.createElement('div');
    wrapper.className = 'margin-l--b';
    wrapper.id = `wrapper${type}`;
    this.canvasContainer.appendChild(wrapper);

    const containerThing = document.createElement('div');

    const head = document.createElement('h5');
    head.innerHTML = header;

    wrapper.appendChild(head);

    const canvaswrapper = document.createElement('div');
    canvaswrapper.className = 'canvaswrapper';

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
      wrapper: canvaswrapper,
    };
    this.currentCanvas.push(curCanvas);

    canvas.height = height;
    canvas.width = width;

    canvaswrapper.appendChild(containerThing);
    canvaswrapper.appendChild(canvas);

    wrapper.appendChild(canvaswrapper);
    this.resetCanvas(curCanvas);
  }

  private canvasFont(cfgName: string) {
    return `${this.canvasConfig[cfgName].fontSize}px ${this.theme.fontFamily}`;
  }

  private async handleContent(clear = true) {
    if (store.state.userContent) {
      const { artist, image, tourname, venueInfo } = store.state.userContent;

      await asyncForEach(this.currentCanvas, async (current) => {
        if (clear) {
          this.resetCanvas(current);
        }

        if (image) {
          await this.handleImage(image, current);
        }

        if (artist || tourname) {
          await this.handleText(artist, tourname, current);
        }

        if (venueInfo) {
          await this.handleDates(venueInfo, current);
        }
      });
    }
  }

  private async handleDates(venueInfo, current: TCurrentCanvasInfo) {
    const { canvasContext, configName } = current;
    const cfg = this.canvasConfig[configName];
    const dateTexts = [];
    canvasContext.textBaseline = 'alphabetic';

    await (canvasContext.font = this.canvasFont(configName));

    const baseTop = cfg.top * 2 + cfg.fontSize * 2 + cfg.top + cfg.fontSize;
    const maxTop = canvasContext.canvas.height - this.currentCanvas[0].top;
    // const maxTop = top + cfg.top + cfg.fontSize;
    let counter = 0;
    const baseLeft = cfg.left * 2;
    let lefty = baseLeft;
    let widest = 0;
    this.simpleTextStyler.setFont(canvasContext);

    for (const venueInf of venueInfo) {
      const { dateText, ticketText, venueText } = venueInf;
      if (dateText) {
        dateTexts.push(`{${this.theme.date}${dateText}} {${this.theme.venue}${venueText} {-${ticketText}}}`);

        let theTopPos = baseTop + cfg.fontSize * counter;
        if (theTopPos > maxTop) {
          // Reset topPos to base
          theTopPos = baseTop;

          // calculate new leftpos
          lefty = Math.round(lefty + widest + baseLeft);

          // Reset counter and widest
          counter = 0;
          widest = 0;
        }

        const returnedStuff = await this.simpleTextStyler.drawText(
          canvasContext,
          `{${this.theme.date}${dateText}} {${this.theme.venue}${venueText} {-${ticketText}}}`,
          lefty,
          theTopPos,
          cfg.fontSize
        );
        widest = returnedStuff > widest ? returnedStuff : widest;

        // if (cfgName === 'wide') {
        //   canvasContext.beginPath(); // Start a new path
        //   canvasContext.moveTo(lefty, theTopPos); // Move the pen to (30, 50)
        //   canvasContext.lineTo(lefty, theTopPos + 100); // Draw a line to (150, 100)
        //   canvasContext.strokeStyle = '#ff0000';
        //   canvasContext.lineWidth = 2;
        //   canvasContext.stroke();
        //   canvasContext.fillStyle = 'green';
        //   canvasContext.fillRect(lefty, theTopPos - 70, widest, 20);
        // }

        counter++;
      }
    }

    // simpleTextStyler.setFont(canvasContext);
    // const datestexting = dateTexts.join('\n');

    // const textTop = top + cfg.top + cfg.fontSize;

    // if (datestexting) {
    //   console.log(textTop);
    //   await simpleTextStyler.drawText(canvasContext, datestexting, cfg.left * 2, textTop, cfg.fontSize);
    // }
  }

  private async handleImage(image: HTMLImageElement, current) {
    const { canvas, canvasContext, type } = current;

    const { imageHasChanged } = this;

    // let imageReturn;

    if (imageHasChanged !== false) {
      if (image && (imageHasChanged === true || imageHasChanged === type)) {
        this.image = image;
        if (current.image) delete current.image;
      }

      const options = {
        cHeight: canvas.height,
        cWidth: canvas.width,
        iHeight: this.image.height,
        iWidth: this.image.width,
        type,
      };

      let imgSize = initialscaler(options);

      let imgPos = current.image ? { x: current.image.x, y: current.image.y } : { x: 0, y: 0 };
      if (imageHasChanged.type === type) {
        switch (imageHasChanged.action) {
          case 'scale':
            imgSize = initialscaler(options);
            break;
          case 'position':
            imgPos = { x: imageHasChanged.x, y: imageHasChanged.y };
            break;
          default:
            imgPos = imagePositioner({ options, ...imgSize }, store.state.imagePosition);
        }
      }

      current.image = { image: this.image, ...imgPos, ...imgSize };
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
      });
    }
  }

  private async handleText(artist, tourname, current: TCurrentCanvasInfo) {
    // const { artist, dates, tourname } = stuff;

    const { canvasContext, configName } = current;
    const cfg = this.canvasConfig[configName];
    const { fontSize } = cfg;

    await (canvasContext.font = this.canvasFont(configName));

    canvasContext.textAlign = 'left';
    canvasContext.textBaseline = 'top';

    const tournameTop = cfg.top * 2;

    const headerString = `{${this.theme.artist}${artist.toUpperCase()}}\n{${
      this.theme.tourname
    }${tourname.toUpperCase()}}`;

    this.simpleTextStyler.setFont(canvasContext);

    if (headerString) {
      await this.simpleTextStyler.drawText(canvasContext, headerString, cfg.left * 2, tournameTop, fontSize);
    }

    this.bannerName = `${artist.replace(/\s/g, '-')}_${tourname.replace(/\s/g, '-')}`;

    canvasContext.measureText(headerString).actualBoundingBoxAscent;
    // this.addDates(dates, configName, tournameTop + fontSize * 2, current);
  }

  private resetCanvas(currentCfg: TCurrentCanvasInfo) {
    currentCfg.canvasContext.clearRect(0, 0, currentCfg.canvas.width, currentCfg.canvas.height);
    currentCfg.canvasContext.beginPath(); // ADD THIS LINE!<<<<<<<<<<<<<
    currentCfg.canvasContext.moveTo(0, 0);

    currentCfg.canvasContext.stroke();
    currentCfg.canvasContext.fillStyle = `${this.theme.bgColor};`;
    currentCfg.canvasContext.fillRect(0, 0, currentCfg.canvas.width, currentCfg.canvas.height);
  }

  private updateState() {
    store.dispatch(STOREACTIONS.updateCanvases, this.currentCanvas);
  }
}
