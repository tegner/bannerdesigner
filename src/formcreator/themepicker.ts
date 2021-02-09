import { IThemeObject, themes } from '../canvascreator/themes';

function themeList(themes: IThemeObject, currentTheme: string): string {
  const themeOption = [];
  for (const key in themes) {
    if (themes[key]) {
      themeOption.push(`<option ${key === currentTheme ? 'selected=true' : ''} value="${key}">${key}</option>`);
    }
  }

  return themeOption.join('');
}

export const themePicker = (themes, currentTheme) => `
  <div class="form-element padding-s--b">
    <label class="form-label">Tema</label>
    <div class="form-input form-input--select">
      <select>
        ${themeList(themes, currentTheme)}
      </select>
    </div>
  </div>
`;

export class ThemePicker {
  constructor() {
    // eventhandler;
  }

  public render() {
    const arg = document.createElement('div');
    arg.innerHTML = themePicker(themes, 'modern');

    return arg;
  }
}
