export enum STOREACTIONS {
  alterTheme = 'alterTheme',
  imageChange = 'imageChange',
  setImagePosition = 'setImagePosition',
  setImageScale = 'setImageScale',
  setLoginStatus = 'setLoginStatus',
  setTheme = 'setTheme',
  setThemeName = 'setThemeName',
  textUpdate = 'textUpdate',
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
  [STOREACTIONS.setLoginStatus](context, payload) {
    console.log('STOREACTIONS.setLoginStatus', context, payload);
    context.commit(STOREACTIONS.setLoginStatus, payload);
  },
  [STOREACTIONS.setTheme](context, payload) {
    context.commit(STOREACTIONS.setTheme, payload);
  },
  [STOREACTIONS.setThemeName](context, payload) {
    context.commit(STOREACTIONS.setThemeName, payload);
  },
  [STOREACTIONS.textUpdate](context, payload) {
    context.commit(STOREACTIONS.textUpdate, payload);
  },
  [STOREACTIONS.updateCanvases](context, payload) {
    context.commit(STOREACTIONS.updateCanvases, payload);
  },
};
