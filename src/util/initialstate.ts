import { ICurrentCanvasConfig, RATIOTYPES } from '../canvascreator/canvascreator';
import { IThemeObject, THEMENAMES, themes } from '../canvascreator/themes';

export enum STATENAMES {
  canvases = 'canvases',
  imageChange = 'imageChange',
  imageScale = 'imageScale',
  theme = 'theme',
  themeName = 'themeName',
}

export interface IStoreState {
  [STATENAMES.canvases]: ICurrentCanvasConfig[];
  [STATENAMES.imageChange]: boolean;
  [STATENAMES.imageScale]: {
    [id: string]: number;
  };
  [STATENAMES.theme]: IThemeObject;
  [STATENAMES.themeName]: string;
}

export type StateType = Partial<IStoreState>;

const defaultTheme = THEMENAMES.modern;

export const initialState: IStoreState = {
  [STATENAMES.canvases]: [],
  [STATENAMES.imageChange]: false,
  [STATENAMES.imageScale]: {
    [RATIOTYPES.square]: 1,
    [RATIOTYPES.wide]: 1,
  },
  [STATENAMES.theme]: themes[defaultTheme],
  [STATENAMES.themeName]: defaultTheme,
};
