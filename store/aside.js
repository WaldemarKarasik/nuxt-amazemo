export const state = () => ({
  isOpened: false
});

export const mutations = {
  openAside(state) {
    state.isOpened = true;
  },
  closeAside: state => {
    state.isOpened = false;
  }
};

export const getters = {
  get(state) {
    return state.isOpened;
  }
};
