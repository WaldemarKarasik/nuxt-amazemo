<template>
  <main>
    <div>
      <nuxt-link to="/">
        Назад
      </nuxt-link>
    </div>
    <div class="details">
      <div class="details-image">
        <img :src="product.image" alt="product" />
      </div>
      <div class="details-info md:mr-12 rounded-lg transition ">
        <ul class="p-5">
          <li>
            <h4>{{ product.name }}</h4>
          </li>
          <li>{{ product.rating }} Звезд ({{ product.numReviews }} Отзывов)</li>
          <li>
            Цена:<b> {{ product.price }}&#8381;</b>
          </li>
          <li>
            Описание:
            <div>{{ product.description }}</div>
          </li>
        </ul>
      </div>
      <div class="details-action">
        <ul>
          <li>Цена: {{ product.price * qty }}&#8381;</li>
          <li>
            Статус:
            <span
              v-if="product.countInStock > 0"
              class="product__item__status__available"
              >На складе</span
            >
            <span v-else class="product__item__status__unavailable"
              >Недоступно</span
            >
          </li>
          <li>
            Кол-во:
            <select
              class="h-10"
              style="background-color: #f8f8f8"
              v-model="qty"
            >
              <option
                v-for="option in availableQty()"
                v-bind:value="option"
                :key="option"
              >
                {{ option }}
              </option>
            </select>
          </li>
          <li>
            <button
              v-if="product.countInStock > 0 && addableToCart"
              @click="addToCart()"
              class="button primary"
            >
              Добавить в корзину
            </button>
            <button class="button primary" disabled v-else-if="!addableToCart">
              Уже в корзине
            </button>
            <div v-else class="product_item__out-of-stock">Нет в наличии</div>
            <button
              @click="removeProduct()"
              class="mt-4 border-2 border-red-600 p-3 font-bold rounded-lg hover:bg-red-600"
              v-if="$auth.loggedIn && $auth.user.isAdmin"
            >
              Удалить
            </button>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {
      qty: 1
    };
  },
  computed: {
    ...mapGetters({
      cartItems: "cart/cartItems"
    }),
    addableToCart: function() {
      return this.cartItems.filter(item => item._id === this.product._id).length
        ? false
        : true;
    }
  },
  async asyncData(ctx) {
    const product = await ctx.$axios.$get(
      `/api/products/specific/?id=${ctx.params.id}`
    );
    return { product };
  },
  methods: {
    addToCart() {
      this.product.qty = this.qty;
      this.$store.commit("cart/addToCart", this.product);
      this.$cookies.remove("cartItems");
      this.$cookies.set("cartItems", this.$store.state.cart.cart);
      this.$router.push({ path: "/cart" });
    },
    availableQty() {
      return [...Array(this.product.countInStock).keys()].map(x => x + 1);
    },
    async removeProduct() {
      const removedProduct = await this.$store.$axios.$post(
        `/api/products/remove?id=${this.product._id}`
      );
      await this.$store.dispatch(
        "products/removeProduct",
        removedProduct.product
      );
      await this.$store.commit(
        "categories/setCategories",
        removedProduct.categories
      );
    }
  }
};
</script>

<style></style>
