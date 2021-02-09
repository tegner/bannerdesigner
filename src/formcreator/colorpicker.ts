import { IThemeObject, THEMENAMES, themes } from '../canvascreator/themes';
import { eventhandler } from '../util/eventhandler';
import store from '../util/store';
// import store from '../util/store';

const colorSquare = (colorName: string): string => `<div class="colorsquare" style="background: ${colorName};"></div>`;

function colorPicking(theme: IThemeObject) {
  const colorPickingEl = document.createElement('div');
  const colorSquares: string[] = [];
  theme.colorPicks.forEach((color) => {
    colorSquares.push(colorSquare(color));
  });

  colorPickingEl.innerHTML = colorSquares.join('');

  return colorPickingEl;
}

export function colorPicker(name: string) {
  const colorPickerEl = document.createElement('div');
  colorPickerEl.className = 'colorpicker';
  colorPickerEl.innerHTML = `${colorSquare(themes[THEMENAMES.classic][name])} ${name}`;

  colorPickerEl.addEventListener('click', () => {
    colorPickerEl.appendChild(colorPicking(themes[THEMENAMES.classic]));
  });

  return colorPickerEl;
}

export class ColorPicker {
  private colorPickerFrag = document.createElement('div');
  private names: string[];
  private state;

  constructor(names: string[]) {
    this.names = names;
    this.state = { ...store.state };

    eventhandler.subscribe('theme', (state) => {
      this.state = { ...state };
      this.render();
    });
  }

  render() {
    while (this.colorPickerFrag.firstChild) {
      this.colorPickerFrag.firstChild.remove();
    }

    this.names.forEach((name) => {
      const colorPickerEl = document.createElement('div');
      colorPickerEl.className = 'colorpicker';
      colorPickerEl.innerHTML = `${colorSquare(themes[this.state.theme][name])} ${name}`;

      colorPickerEl.addEventListener('click', () => {
        colorPickerEl.appendChild(colorPicking(themes[this.state.theme]));
      });
      this.colorPickerFrag.appendChild(colorPickerEl);
    });

    return this.colorPickerFrag;
  }
}
