import { DragHandler } from '../draghandler';

export enum RATIOTYPES {
  square = 'square',
  tall = 'tall',
  wide = 'wide',
}

export enum DATEINFOTYPES {
  date = 'date',
  venue = 'venue',
  tickets = 'tickets',
}

export interface ICurrentCanvasConfig {
  canvas?: HTMLCanvasElement;
  canvasContext?: CanvasRenderingContext2D;
  configName?: string;
  image?: {
    dragImage?: DragHandler;
    image: HTMLImageElement;
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

export interface ICanvasTypesConfig {
  [id: string]: ICanvasConfig;
}

export interface ICanvasConfig {
  canvas?: HTMLCanvasElement;
  canvasContext?: CanvasRenderingContext2D;
  left: number;
  ratio: number;
  top: number;
  type: string;
}
