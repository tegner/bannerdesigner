import actions from './actions';
import mutations from './mutations';
import { Store } from './store';

import { initialState } from '../initialstate';

const store = new Store({
  actions,
  mutations,
  state: initialState,
});

export default store;
