// import Vuex from 'vuex'

// const createStore = new Vuex.Store({

// })

export const actions = {
  async nuxtServerInit(store, { $axios, $cookies }) {
    const products = await $axios.$get(
      "http://localhost:3000/api/products/all"
    );
    const cartItems = $cookies.get("cartItems");
    // console.log(cartItems);
    if (cartItems) {
      await store.commit("cart/persistFromCookies", cartItems);
    }
    const categories = await $axios.$get(
      "http://localhost:3000/api/categories/all"
    );
    if (categories) {
      await store.commit("categories/setCategories", categories);
    }
    await store.dispatch("products/setProducts", products);
  }
};
