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
  private fontsize = 16;
  private lineheight = 30;
  private theme = {
    bgColor: '000',
    dateColor: 'rgb(50, 50, 225)',
    venueColor: 'rgb(255, 255, 255)',
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
    // console.log('ratioe', this.canvasConfig[configName].ratio);
    canvas.height = height;
    canvas.width = width;

    // console.log('width', width);
    // console.log('config this', this.canvasConfig[configName]);
    canvas.setAttribute('style', `background: #${this.theme.bgColor}; border: 5px solid #d3d3d3`);

    wrapper.appendChild(canvas);
    this.canvasContainer.appendChild(wrapper);
  }

  public addDates(datesInfo, cfgName) {
    const cfg = this.canvasConfig[cfgName];
    for (const dates in datesInfo) {
      if (datesInfo[dates]) {
        let dateText, ticketText, venueText;
        cfg.canvasContext.textBaseline = 'alphabetic';
        datesInfo[dates].forEach((datesInfoElement: HTMLInputElement) => {
          const elName = datesInfoElement.name;

          if (elName.indexOf(DATEINFOTYPES.date) !== -1) {
            dateText = datesInfoElement.value;
          }
          if (elName.indexOf(DATEINFOTYPES.venue) !== -1) {
            venueText = datesInfoElement.value;
          }
          if (elName.indexOf(DATEINFOTYPES.tickets) !== -1 && datesInfoElement.checked) {
            switch (datesInfoElement.value) {
              case 'few':
                ticketText = 'Få billetter';
                break;
              case 'soldout':
                ticketText = 'Udsolgt';
                break;
              default:
                ticketText = '';
                break;
            }
          }
        });
        cfg.canvasContext.fillStyle = this.theme.dateColor;
        simpleTextStyler.setFont(cfg.canvasContext);
        simpleTextStyler.drawText(
          cfg.canvasContext,
          `{#00FF00${dateText}} {#FFFFFF${venueText} {-{-${ticketText}}}}`,
          cfg.left,
          cfg.top,
          21
        );
      }
    }
    // context.measureText()
  }

  public addText(stuff, clear: boolean = false) {
    const { artist, dates, tourname } = stuff;
    // console.log('addText artist', artist, 'tourname', tourname, this.lineheight);
    this.types.forEach((cfgName) => {
      const cfg = this.canvasConfig[cfgName];
      if (clear) {
        cfg.canvasContext.clearRect(0, 0, cfg.canvas.width, cfg.canvas.height);
      }
      cfg.canvasContext.font = `${this.fontsize}px Arial`;
      cfg.canvasContext.textAlign = 'left';

      cfg.canvasContext.fillStyle = 'rgb(250, 250, 250)';
      cfg.canvasContext.fillText(artist, cfg.left, cfg.top);

      cfg.canvasContext.fillStyle = 'rgb(0, 0, 200)';
      cfg.canvasContext.fillText(tourname, cfg.left, cfg.top + this.lineheight / 2);

      this.addDates(dates, cfgName);

      // console.log('measurement', cfg.canvasContext.measureText(artist));
      // console.log('measurement', cfg.canvasContext.measureText(tourname));
    });
  }

  public update(eleList: HTMLFormControlsCollection) {
    const formElements = Array.from(eleList);
    // console.log(formElements);
    const info = {
      dates: {},
    };
    formElements.forEach((el: HTMLInputElement) => {
      if (el.dataset.line) {
        info.dates[el.dataset.line] = info.dates[el.dataset.line] || [];
        info.dates[el.dataset.line].push(el);
      } else if (el.name) {
        info[el.name] = el.value;
      }
    });

    // console.log('info:', info);
    this.addText(info, true);
  }
}
