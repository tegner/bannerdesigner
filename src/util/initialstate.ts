import { ICanvasConfig, ICurrentCanvasConfig, RATIOTYPES } from '../canvascreator/canvascreator';
import { IThemeObject, THEMENAMES, themes } from '../canvascreator/themes';
import { TPlacementNames } from '../imagehandler/imageplacement';

export enum STATENAMES {
  canvases = 'canvases',
  imageChange = 'imageChange',
  imageScale = 'imageScale',
  imagePosition = 'imagePosition',
  theme = 'theme',
  themeName = 'themeName',
  userContent = 'userContent',
}

export type TCanvas = ICurrentCanvasConfig & ICanvasConfig;

interface IVenueInfo {
  dateText: string;
  ticketText: string;
  venueText: string;
}

export interface IUserContent {
  artist?: string;
  image?: HTMLImageElement;
  tourname?: string;
  venueInfo?: IVenueInfo[];
}

export interface IStoreState {
  [STATENAMES.canvases]: TCanvas[];
  [STATENAMES.imageChange]: any;
  [STATENAMES.imageScale]: {
    [id: string]: number;
  };
  [STATENAMES.imagePosition]: TPlacementNames;
  [STATENAMES.theme]: IThemeObject;
  [STATENAMES.themeName]: string;
  [STATENAMES.userContent]: IUserContent;
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
  [STATENAMES.theme]: themes[defaultTheme],
  [STATENAMES.themeName]: defaultTheme,
  [STATENAMES.userContent]: {},
};
