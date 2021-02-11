import { IThemeObject, THEMENAMES, themes } from '../canvascreator/themes';

export enum STATENAMES {
  imageChange = 'imageChange',
  theme = 'theme',
  themeName = 'themeName',
}

export interface IStoreState {
  [STATENAMES.imageChange]: boolean;
  [STATENAMES.theme]: IThemeObject;
  [STATENAMES.themeName]: string;
}

const defaultTheme = THEMENAMES.modern;

export default {
  [STATENAMES.imageChange]: false,
  [STATENAMES.theme]: themes[defaultTheme],
  [STATENAMES.themeName]: defaultTheme,
};
