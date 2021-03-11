import { ICanvasTypesConfig, RATIOTYPES, ICurrentCanvasConfig, DATEINFOTYPES, ICanvasConfig } from './canvascreator';
import { IThemeObject } from './themes';

import { DragHandler, EVENTNAMES } from '../draghandler';
import { imagePositioner, imageUploader } from '../imagehandler/';
import { simpleTextStyler } from '../textstyler';

import store from '../util/store';
import { asyncForEach } from '../util/asyncforeach';
import { eventhandler } from '../util/eventhandler';
import { STOREACTIONS } from '../util/store/actions';
import { STATENAMES } from '../util/initialstate';

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
  private form: HTMLFormElement;
  private formElements: HTMLElement[];
  private image: HTMLImageElement;
  private imageHasChanged: boolean | RATIOTYPES = false;

  private theme: IThemeObject;
  private types: RATIOTYPES[] = [RATIOTYPES.wide, RATIOTYPES.square]; // TODO? , RATIOTYPES.tall];

  constructor(container, bannerdesigner, type) {
    this.form = bannerdesigner;
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

      if (this.imageHasChanged === true || this.imageHasChanged === this.currentType) {
        this.update();
      }
    });

    eventhandler.subscribe([STATENAMES.imagePosition], (imagePosition, _state) => {
      console.log('canvas STATENAMES.imagePosition imagePosition', imagePosition);
    });
  }

  public getCanvas(): TCurrentCanvasInfo[] {
    return this.currentCanvas;
  }

  public setTheme(theme: IThemeObject, update = true) {
    this.theme = theme;

    if (!this.theme.loaded) {
      const themeFont = document.createElement('div');
      themeFont.setAttribute('style', `font-family: "${this.theme.fontFamily}";visibility: hidden;`);
      themeFont.innerHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ . abcdefghijklmnopqrstuvwxyzæøå . 0987654321';
      document.body.appendChild(themeFont);

      setTimeout(() => {
        if (update) this.update();
        this.theme.loaded = true;
      }, 200);
    } else if (update) {
      this.update();
    }
  }

  public update() {
    console.log('this.update!');

    this.formElements = this.formElements ?? (Array.from(this.form.elements) as HTMLElement[]);

    const info = {
      dates: {},
    };

    this.formElements.forEach((el: HTMLInputElement) => {
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

    // this.updateState();
  }

  private addAll(type: RATIOTYPES) {
    console.log(type, this.types);
    // this.types.forEach((configName) => {
    this.addCanvas(type);
    // });
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

  private async addContent(contentInfo, clear) {
    await asyncForEach(this.currentCanvas, async (current) => {
      if (clear) {
        this.resetCanvas(current);
      }

      await this.addImage(contentInfo, current);

      this.addText(contentInfo, current);
    });

    if (this.imageHasChanged) store.dispatch(STOREACTIONS.imageChange, false);
  }

  private async addImage(contentInfo, current: TCurrentCanvasInfo) {
    const { image } = contentInfo;
    const { canvas, canvasContext, type } = current;

    const { imageHasChanged } = this;

    let imageReturn;

    console.log('imageHasChanged', imageHasChanged, type);

    if (image && (imageHasChanged || imageHasChanged === type)) {
      console.log('imageHasChanged inside', imageHasChanged, type);
      imageReturn = await imageUploader(image);

      this.image = imageReturn;
      if (current.image) delete current.image;
      console.log('type type type', type);
      current.image = imagePositioner(this.image, canvas, type, store.state.imagePosition);
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

    const headerString = `{${this.theme.artist}${artist.toUpperCase()}}\n{${
      this.theme.tourname
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

        dateTexts.push(`{${this.theme.date}${dateText}} {${this.theme.venue}${venueText} {-${ticketText}}}`);
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
    currentCfg.canvasContext.beginPath(); // ADD THIS LINE!<<<<<<<<<<<<<
    currentCfg.canvasContext.moveTo(0, 0);
    // currentCfg.canvasContext.lineTo(event.clientX, event.clientY);
    currentCfg.canvasContext.stroke();
    currentCfg.canvasContext.fillStyle = `${this.theme.bgColor};`;
    currentCfg.canvasContext.fillRect(0, 0, currentCfg.canvas.width, currentCfg.canvas.height);
  }

  private updateState() {
    store.dispatch(STOREACTIONS.updateCanvases, this.currentCanvas);
  }
}
