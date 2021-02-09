import actions from './actions';
import mutations from './mutations';
import { Store } from './store';

import state from '../initialstate';

const store = new Store({
  actions,
  mutations,
  state,
});

export default store;
