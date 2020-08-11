export const state = () => ({
  categories: []
});

export const mutations = {
  setCategories(state, payload) {
    state.categories = payload;
  },
  addCategory(state, category) {
    state.categories = [...state.categories, category];
  },
  deleteCategory(state, category) {
    state.categories = state.categories.filter(x => x._id !== category._id);
  }
};

export const getters = {
  categories(state) {
    return state.categories;
  }
  // category(state) {
  //   return name => {
  //     const category = state.categories.find(
  //       category =>
  //         category.name == name.charAt(0).toUpperCase() + name.slice(1)
  //     );
  //     return category;
  //   };
  // }
};
