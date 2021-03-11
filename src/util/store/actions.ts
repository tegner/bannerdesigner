export enum STOREACTIONS {
  alterTheme = 'alterTheme',
  imageChange = 'imageChange',
  setImagePosition = 'setImagePosition',
  setImageScale = 'setImageScale',
  setTheme = 'setTheme',
  setThemeName = 'setThemeName',
  updateCanvases = 'updateCanvases',
}

export default {
  [STOREACTIONS.alterTheme](context, payload) {
    context.commit(STOREACTIONS.alterTheme, payload);
  },
  [STOREACTIONS.imageChange](context, payload) {
    context.commit(STOREACTIONS.imageChange, payload);
  },
  [STOREACTIONS.setImagePosition](context, payload) {
    context.commit(STOREACTIONS.setImagePosition, payload);
  },
  [STOREACTIONS.setImageScale](context, payload) {
    context.commit(STOREACTIONS.setImageScale, payload);
  },
  [STOREACTIONS.setTheme](context, payload) {
    context.commit(STOREACTIONS.setTheme, payload);
  },
  [STOREACTIONS.setThemeName](context, payload) {
    context.commit(STOREACTIONS.setThemeName, payload);
  },
  [STOREACTIONS.updateCanvases](context, payload) {
    console.log('updateCanvases', payload);
    context.commit(STOREACTIONS.updateCanvases, payload);
  },
};
