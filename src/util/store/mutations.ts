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
  [STOREACTIONS.setTheme](state, payload) {
    state[STATENAMES.theme] = payload;

    return state;
  },
  [STOREACTIONS.setThemeName](state, payload) {
    state[STATENAMES.themeName] = payload;

    return state;
  },
};
