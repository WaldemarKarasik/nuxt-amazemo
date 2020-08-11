<template>
  <main class="main">
    <div class="content">
      <ul class="products">
        <li v-for="product in products" :key="product._id">
          <div class="product">
            <div class="product__image__container">
              <img
                @click="imageClicked(product._id)"
                class="product-image"
                :src="product.image"
              />
            </div>
            <div class="product__info__container">
              <div class="product-name">
                <nuxt-link
                  :to="{
                    path: '/products/' + product._id,
                    params: { id: product._id }
                  }"
                  >{{ product.name }}</nuxt-link
                >
              </div>
              <div class="product-brand">{{ product.brand }}</div>
              <div class="product-price">{{ product.price }}&#8381;</div>
              <div class="product-rating">
                {{ product.rating }} Stars ({{ product.numReviews }})
              </div>
            </div>
            <div class="product__action">
              <div>
                <button class="button primary">Купить</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({ products: "products/products" })
  },
  async asyncData(ctx) {
    const products = await ctx.$axios.$get("/api/products/all");
    await ctx.store.dispatch("products/setProducts", products);
    return {};
  },
  methods: {
    imageClicked(productId) {
      this.$router.push({
        path: `/products/${productId}`,
        params: { id: productId }
      });
    }
  }
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
