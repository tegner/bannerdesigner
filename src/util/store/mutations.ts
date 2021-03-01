import { STATENAMES } from '../initialstate';
import { STOREACTIONS } from './actions';

export default {
  [STOREACTIONS.alterTheme](state, payload) {
    // console.log('payload', payload, state.theme);
    state.theme = { ...state.theme, ...payload };
    // console.log('payload state after', state.theme);
    return state;
  },
  [STOREACTIONS.imageChange](state, payload) {
    state[STATENAMES.imageChange] = payload;

    return state;
  },
  [STOREACTIONS.setImageScale](state, payload) {
    console.log('imageScale: state[STATENAMES.imageScale]', state[STATENAMES.imageScale]);
    console.log('imageScale: payload', payload);
    // const { imageScale, type } = payload;

    // if (state[STATENAMES.imageScale][type]) {
    //   state[STATENAMES.imageScale][type] = parseInt(imageScale, 10) / 100;
    // }
    state[STATENAMES.imageScale] = { ...state[STATENAMES.imageScale], ...payload };
    console.log('after imageScale: state[STATENAMES.imageScale]', state[STATENAMES.imageScale]);
    return state;
  },
  [STOREACTIONS.setTheme](state, payload) {
    state[STATENAMES.theme] = payload;

    return state;
  },
  [STOREACTIONS.setThemeName](state, payload) {
    state[STATENAMES.themeName] = payload;

    return state;
  },
  [STOREACTIONS.updateCanvases](state, payload) {
    state[STATENAMES.canvases] = payload;

    return state;
  },
};
