import { STATENAMES } from '../initialstate';
import { STOREACTIONS } from './actions';

export default {
  [STOREACTIONS.alterTheme](state, payload) {
    state.theme = { ...state.theme, ...payload };

    return state;
  },
  [STOREACTIONS.imageChange](state, payload) {
    state[STATENAMES.imageChange] = payload;

    return state;
  },
  [STOREACTIONS.setImagePosition](state, payload) {
    state[STATENAMES.imagePosition] = payload.val;

    return state;
  },
  [STOREACTIONS.setImageScale](state, payload) {
    state[STATENAMES.imageScale] = { ...state[STATENAMES.imageScale], ...payload };

    return state;
  },
  [STOREACTIONS.setLoginStatus](state, payload) {
    state[STATENAMES.loginStatus] = payload;

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
    state[STATENAMES.canvases].push(...payload);

    return state;
  },
  [STOREACTIONS.textUpdate](state, payload) {
    state[STATENAMES.textUpdate] = payload;

    return state;
  },
};
