import { THEMENAMES } from '../canvascreator/themes';

export enum STATENAMES {
  imageChange = 'imageChange',
  theme = 'theme',
}

export default {
  [STATENAMES.imageChange]: false,
  [STATENAMES.theme]: THEMENAMES.modern,
};
