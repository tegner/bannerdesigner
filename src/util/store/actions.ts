export enum STOREACTIONS {
  alterTheme = 'alterTheme',
  imageChange = 'imageChange',
  setTextpos = 'setTextpos',
  setTheme = 'setTheme',
  setThemeName = 'setThemeName',
}

export default {
  [STOREACTIONS.alterTheme](context, payload) {
    context.commit(STOREACTIONS.alterTheme, payload);
  },
  [STOREACTIONS.imageChange](context, payload) {
    context.commit(STOREACTIONS.imageChange, payload);
  },
  [STOREACTIONS.setTextpos](context, payload) {
    context.commit(STOREACTIONS.setTextpos, payload);
  },
  [STOREACTIONS.setTheme](context, payload) {
    context.commit(STOREACTIONS.setTheme, payload);
  },
  [STOREACTIONS.setThemeName](context, payload) {
    context.commit(STOREACTIONS.setThemeName, payload);
  },
};
