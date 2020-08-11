export const state = () => ({
  cart: []
});

export const actions = {
  addToCart({ commit }, product) {
    commit("addToCart", product);
  }
};

export const mutations = {
  addToCart(state, product) {
    const alreadyInCart = state.cart.find(item => item._id == product._id);
    if (alreadyInCart) {
      alreadyInCart.qty = alreadyInCart.qty + product.qty;
      const newState = state.cart.map(product =>
        product._id == alreadyInCart._id ? alreadyInCart : product
      );
      return (state.cart = newState);
    }
    state.cart = [...state.cart, product];
  },
  replaceProduct(state, { product, selectedQty }) {
    product.qty = selectedQty;
    state.cart = state.cart.map(item =>
      item._id == product.product ? product : item
    );
  },
  persistFromCookies(state, products) {
    state.cart = [...products];
  }
};

export const getters = {
  cartItems(state) {
    return state.cart;
  },
  availableQty: state => id => {
    const item = state.cart.find(x => x._id == id);
    if (item) {
      return [...Array(item.countInStock).keys()].map(x => x + 1);
    }
  }
};
