export enum THEMENAMES {
  classic = 'classic',
  modern = 'modern',
  urban = 'urban',
  writer = 'writer',
}

export interface IThemeObject {
  artist: string;
  bgColor: string;
  colorPicks: string[];
  date: string;
  fontFamily: string;
  tourname: string;
  venue: string;
}

interface IThemes {
  [id: string]: IThemeObject;
}

export const themes: IThemes = {
  [THEMENAMES.classic]: {
    artist: 'D9E4E1',
    bgColor: '010E13',
    colorPicks: ['#D9E4E1', '#010E13', '#D96E2F', '#2F9FD9', '#A775B2'],
    date: 'D47843',
    fontFamily: 'Crimson Text',
    tourname: 'D47843',
    venue: 'D9E4E1',
  },
  [THEMENAMES.modern]: {
    artist: 'E5DADA',
    bgColor: '000000',
    colorPicks: ['#E5DADA', '#010E13', '#015EB6', '#4FC546', '#EB5450'],
    date: '015EB6',
    fontFamily: 'Bebas Neue',
    tourname: '015EB6',
    venue: 'E5DADA',
  },
  [THEMENAMES.urban]: {
    artist: 'E5DADA',
    bgColor: '000000',
    colorPicks: ['#E8EFED', '#010E13', '#F30000', '#F3C800', '#01EA85'],
    date: '015EB6',
    fontFamily: 'Roboto',
    tourname: '015EB6',
    venue: 'E5DADA',
  },
  [THEMENAMES.writer]: {
    artist: 'E5DADA',
    bgColor: '000000',
    colorPicks: ['#E8EFED', '#010E13', '#0E467E', '#BF8F28', '#3F8597'],
    date: '015EB6',
    fontFamily: 'Noto Serif',
    tourname: '015EB6',
    venue: 'E5DADA',
  },
};
