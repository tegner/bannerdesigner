import actions from './actions';
import mutations from './mutations';
// import state from './state.js';
import { Store } from './store';

const state = {
  items: [],
};

export default new Store({
  actions,
  mutations,
  state,
});
