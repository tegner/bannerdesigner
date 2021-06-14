import { ICanvasConfig, ICurrentCanvasConfig, RATIOTYPES } from '../canvascreator/canvascreator';
import { IThemeObject, THEMENAMES, themes } from '../canvascreator/themes';
import { TPlacementNames } from '../imagehandler/imageplacement';

export enum STATENAMES {
  canvases = 'canvases',
  imageChange = 'imageChange',
  imageScale = 'imageScale',
  imagePosition = 'imagePosition',
  loginStatus = 'loginStatus',
  textUpdate = 'textUpdate',
  theme = 'theme',
  themeName = 'themeName',
}

export enum ELoginStatus {
  'loggedIn',
  'notLoggedIn',
  'expired',
}

export type TCanvas = ICurrentCanvasConfig & ICanvasConfig;
export interface IStoreState {
  [STATENAMES.canvases]: TCanvas[];
  [STATENAMES.imageChange]: any;
  [STATENAMES.imageScale]: {
    [id: string]: number;
  };
  [STATENAMES.imagePosition]: TPlacementNames;
  [STATENAMES.loginStatus]: ELoginStatus;
  [STATENAMES.textUpdate]: boolean;
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
  [STATENAMES.imagePosition]: 'topleft',
  [STATENAMES.loginStatus]: ELoginStatus.notLoggedIn,
  [STATENAMES.textUpdate]: false,
  [STATENAMES.theme]: themes[defaultTheme],
  [STATENAMES.themeName]: defaultTheme,
};
