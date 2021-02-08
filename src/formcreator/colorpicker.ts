import { IThemeObject, THEMENAMES, themes } from '../canvascreator/themes';

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
