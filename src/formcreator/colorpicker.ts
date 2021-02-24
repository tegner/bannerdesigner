import { IThemeObject } from '../canvascreator/themes';
import { eventhandler } from '../util/eventhandler';
import store from '../util/store';
import { STOREACTIONS } from '../util/store/actions';

class Fuse {
  private el;
  private timer;

  constructor() {}

  public light(el?: HTMLDivElement, timer = 500) {
    if (el) this.el = el;

    this.timer = setTimeout(() => {
      this.el.remove();
    }, timer);
  }

  public off() {
    clearTimeout(this.timer);
  }
}

const colorSquare = (colorName: string): string =>
  `<div class="colorsquare" data-color="${colorName}"><span style="background: ${colorName};"></span></div>`;

export class ColorPicker {
  private colorPickerDiv = document.createElement('div');
  private fuse;
  private names: string[];
  private state;
  private theme;

  constructor(names: string[]) {
    this.names = names;
    this.state = { ...store.state };
    this.theme = this.state.theme;

    this.colorPickerDiv.className = 'form-element colorpicker-layout';

    eventhandler.subscribe('theme', (theme, newState) => {
      console.log('ColorPicker theme', newState);
      this.state = newState;
      this.theme = theme;

      this.render();
    });

    this.fuse = new Fuse();
  }

  private colorPicking(theme: IThemeObject, name: string) {
    const colorPickingEl = document.createElement('div');
    colorPickingEl.className = 'colorpicking';
    const colorSquares: string[] = [];
    theme.colorPicks.forEach((color) => {
      colorSquares.push(colorSquare(color));
    });

    colorPickingEl.innerHTML = colorSquares.join('');

    const childrenArray = Array.from(colorPickingEl.children);
    childrenArray.forEach((child: HTMLDivElement) => {
      child.addEventListener('click', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        store.dispatch(STOREACTIONS.alterTheme, { [name]: child.dataset.color });
        colorPickingEl.remove();
      });
    });

    this.fuse.light(colorPickingEl, 100000);

    colorPickingEl.addEventListener('mouseenter', () => {
      this.fuse.off();
    });

    colorPickingEl.addEventListener('mouseleave', () => {
      this.fuse.light();
    });

    return colorPickingEl;
  }

  render() {
    while (this.colorPickerDiv.firstChild) {
      this.colorPickerDiv.firstChild.remove();
    }
    const { theme } = this;
    console.log('this.names', this.names, theme);
    this.names.forEach((name) => {
      const colorPickerEl = document.createElement('div');
      colorPickerEl.className = `colorpicker colorpicker--${name}`;
      colorPickerEl.innerHTML = `${colorSquare(theme[name])} ${name}`;

      colorPickerEl.addEventListener('click', () => {
        colorPickerEl.appendChild(this.colorPicking(theme, name));
      });
      this.colorPickerDiv.appendChild(colorPickerEl);
    });

    return this.colorPickerDiv;
  }
}
