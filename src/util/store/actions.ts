export enum STOREACTIONS {
  imageChange = 'imageChange',
  setTheme = 'setTheme',
}

export default {
  addItem(context, payload) {
    context.commit('addItem', payload);
  },
  clearItem(context, payload) {
    context.commit('clearItem', payload);
  },
  [STOREACTIONS.imageChange](context, payload) {
    context.commit('imageChange', payload);
  },
  [STOREACTIONS.setTheme](context, payload) {
    context.commit('setTheme', payload);
  },
};
