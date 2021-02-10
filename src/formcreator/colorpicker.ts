import { IThemeObject, themes } from '../canvascreator/themes';
import { eventhandler } from '../util/eventhandler';
import store from '../util/store';
import { STOREACTIONS } from '../util/store/actions';
// import store from '../util/store';

const colorSquare = (colorName: string): string =>
  `<div class="colorsquare" data-color="${colorName}"><span style="background: ${colorName};"></span></div>`;

function colorPicking(theme: IThemeObject, name) {
  const colorPickingEl = document.createElement('div');
  colorPickingEl.className = 'colorpicking';
  const colorSquares: string[] = [];
  theme.colorPicks.forEach((color) => {
    colorSquares.push(colorSquare(color));
  });

  colorPickingEl.innerHTML = colorSquares.join('');

  console.log(colorPickingEl.children);
  const childrenArray = Array.from(colorPickingEl.children);
  childrenArray.forEach((child: HTMLDivElement) => {
    child.addEventListener('click', (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      console.log('color?', child.dataset.color, name);
      store.dispatch(STOREACTIONS.alterTheme, { [name]: child.dataset.color });
    });
  });

  return colorPickingEl;
}

export class ColorPicker {
  private colorPickerFrag = document.createElement('div');
  private names: string[];
  private state;

  constructor(names: string[]) {
    this.names = names;
    this.state = { ...store.state };

    eventhandler.subscribe('themeName', (state) => {
      this.state = { ...state };
      this.render();
    });
  }

  render() {
    while (this.colorPickerFrag.firstChild) {
      this.colorPickerFrag.firstChild.remove();
    }
    const theme = themes[this.state.themeName];

    this.names.forEach((name) => {
      const colorPickerEl = document.createElement('div');
      colorPickerEl.className = 'colorpicker';
      colorPickerEl.innerHTML = `${colorSquare(theme[name])} ${name}`;

      colorPickerEl.addEventListener('click', () => {
        colorPickerEl.appendChild(colorPicking(theme, name));
      });
      this.colorPickerFrag.appendChild(colorPickerEl);
    });

    return this.colorPickerFrag;
  }
}
