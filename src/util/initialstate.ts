import { ICurrentCanvasConfig } from '../canvascreator/canvascreator';
import { IThemeObject, THEMENAMES, themes } from '../canvascreator/themes';

export enum STATENAMES {
  canvases = 'canvases',
  imageChange = 'imageChange',
  theme = 'theme',
  themeName = 'themeName',
}

export interface IStoreState {
  [STATENAMES.canvases]: ICurrentCanvasConfig[];
  [STATENAMES.imageChange]: boolean;
  [STATENAMES.theme]: IThemeObject;
  [STATENAMES.themeName]: string;
}

const defaultTheme = THEMENAMES.modern;

export default {
  [STATENAMES.canvases]: [],
  [STATENAMES.imageChange]: false,
  [STATENAMES.theme]: themes[defaultTheme],
  [STATENAMES.themeName]: defaultTheme,
};
