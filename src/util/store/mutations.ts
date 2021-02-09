import { STOREACTIONS } from './actions';

export default {
  addItem(state, payload) {
    state.items.push(payload);

    return state;
  },
  clearItem(state, payload) {
    state.items.splice(payload.index, 1);

    return state;
  },
  [STOREACTIONS.imageChange](state, payload) {
    state.imageChange = payload;

    return state;
  },
  [STOREACTIONS.setTheme](state, payload) {
    state.theme = payload;

    return state;
  },
};
