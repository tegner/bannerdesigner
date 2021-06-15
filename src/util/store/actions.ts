export enum STOREACTIONS {
  alterTheme = 'alterTheme',
  imageChange = 'imageChange',
  setImagePosition = 'setImagePosition',
  setImageScale = 'setImageScale',
  setTheme = 'setTheme',
  setThemeName = 'setThemeName',
  updateCanvases = 'updateCanvases',
  updateContent = 'updateContent',
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
    context.commit(STOREACTIONS.updateCanvases, payload);
  },
  [STOREACTIONS.updateContent](context, payload) {
    console.log('updateContent', payload);
    const { artist, image, imageDidChange, tourname, venueInfo } = payload;

    if (imageDidChange) {
      context.commit(STOREACTIONS.imageChange, true);
    }

    const stateUpdate = {
      artist,
      image,
      tourname,
      venueInfo,
    };
    context.commit(STOREACTIONS.updateContent, stateUpdate);
  },
};
