import { IThemeObject, THEMENAMES, themes } from '../canvascreator/themes';

export enum STATENAMES {
  imageChange = 'imageChange',
  textpos = 'textpos',
  theme = 'theme',
  themeName = 'themeName',
}

export interface IStoreState {
  [STATENAMES.imageChange]: boolean;
  [STATENAMES.textpos]: 'left' | 'right';
  [STATENAMES.theme]: IThemeObject;
  [STATENAMES.themeName]: string;
}

const defaultTheme = THEMENAMES.modern;

export default {
  [STATENAMES.imageChange]: false,
  [STATENAMES.textpos]: 'left',
  [STATENAMES.theme]: themes[defaultTheme],
  [STATENAMES.themeName]: defaultTheme,
};
