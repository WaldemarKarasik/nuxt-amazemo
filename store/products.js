export const state = () => ({
  products: []
  // categories: []
});

export const actions = {
  setProducts(context, products) {
    context.commit("setProducts", products);
    // const categories = products.map(product => product.category);
    // context.commit("setCategories", categories);
  },
  removeProduct(context, payload) {
    context.commit("removeProduct", payload);
    context.commit("removeProductFromCategory", payload);
  }
};

export const mutations = {
  setProducts(state, payload) {
    state.products = payload;
  },
  // setCategories(state, payload) {
  //   state.categories = payload;
  // },
  removeProduct(state, payload) {
    const index = state.products.indexOf(product => product._id == payload._id);
    state.products.splice(index, 1);
  },
  addProduct(state, product) {
    state.products = [...state.products, product];
  }
  // removeProductFromCategory(state, payload) {
  //   state.categories = state.categories.map(category => {
  //     return category.products.filter(product => product._id !== payload._id);
  //   });
  // }
};

export const getters = {
  products(state) {
    return state.products;
  },
  categories(state) {
    var uniq = {};
    var arr = state.categories;
    var arrFiltered = arr.filter(
      obj => !uniq[obj._id] && (uniq[obj._id] = true)
    );
    return arrFiltered;
  }
};
