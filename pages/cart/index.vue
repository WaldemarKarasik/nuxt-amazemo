<template>
  <div class="cart">
    <div class="cart-items__container">
      <ul v-for="(product, index) in cartItems" :key="index">
        <li class="cart-items__item ">
          <div class="cart-items__item__image__container">
            <img :src="product.image" class="cart-items__item__image__item" />
          </div>
          <div class="cart-items__item__info ml-10">
            <div class="cart-items__item__name">
              {{ product.name }}
            </div>
            <div class="cart-items__item__price">
              <h4>{{ product.price }}&#8381;</h4>
            </div>
            <div>
              Кол-во:
              <select
                ref="selectRef"
                @change="onQtySelected($event, product)"
                :value="product.qty"
              >
                <option
                  v-for="option in availableQty(product._id)"
                  v-bind:value="option"
                  :key="option._id"
                  >{{ option }}</option
                >
              </select>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="cartItems.length" class="cart-items__action">
      <div>
        <h3 class="text-3xl">
          Итого ({{ summaryItems }} предметов)
          {{ summaryPrice }}
          &#8381;
        </h3>
      </div>
      <div class="cart-items__action__button-container">
        <button class="button primary">Оформить заказ</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    selectedQty: 2
  }),
  computed: {
    cartItems() {
      return this.$store.getters["cart/cartItems"];
    },

    summaryItems() {
      return this.cartItems.reduce((acc, item) => acc + item.qty, 0);
    },
    summaryPrice() {
      return this.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
    }
  },

  methods: {
    availableQty(itemId) {
      const item = this.cartItems.find(item => item._id == itemId);
      return [...Array(item.countInStock).keys()].map(x => x + 1);
    },
    async onQtySelected(event, product) {
      // console.log(product);
      this.selectedQty = parseInt(event.target.value, 10);
      await this.$store.commit("cart/replaceProduct", {
        product,
        selectedQty: this.selectedQty
      });
      this.$cookies.remove("cartItems");
      this.$cookies.set("cartItems", this.cartItems);
    }
  },
  async asyncData(ctx) {
    const { id } = ctx.query;
    const qty = ctx.query.qty ? ctx.query.qty : 1;
    if (id) {
      try {
        const product = await ctx.$axios.$get(`/api/products/all?id=${id}`);
        product.qty = parseInt(qty, 10);
        ctx.store.commit("cart/addToCart", product);
        const oldProduct = ctx.$cookies.get("cartItems");
        const cartItems = ctx.store.state.cart.cart;
        ctx.$cookies.set("cartItems", [...cartItems]);
        return {};
      } catch (e) {
        console.log(e);
        return {};
      }
    } else {
      return {};
    }
  },
  created() {
    // this.selectedQty = 5;
  }
};
</script>

<style lang="scss" scoped>
.cart {
  display: grid;
  height: 100%;
  margin: 2rem;
  // grid-template-rows: 1fr 20rem;
  grid-template-columns: 3fr 1fr;
  // grid-template-rows: 1fr 1fr;
  grid-template-rows: auto auto;
  grid-column-gap: 1rem;

  @media (min-width: 800px) {
    align-items: start;
  }
  @media (max-width: 800px) {
    grid-template-rows: 15rem auto;
  }
  // grid-auto-rows: min-content;
  .cart-items__action {
    grid-column: 2 / 3;
    border: 0.2rem solid; //
    height: 177px;
    padding: 2rem;

    background-color: #f8f8f8;
    // grid-row: 1 / 1;
    @media (max-width: 800px) {
      grid-row: 1 / 2;
      grid-column: 1 / 3;
      height: 13rem;
    }
    .cart-items__action__button-container {
      margin-top: 2rem;
    }
  }
  .cart-items__container {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    @media (max-width: 800px) {
      grid-column: 1 / 3;
      grid-row: 2 / 3;
    }
    // grid-row: 1 / 2;
    ul {
      margin: 0;
      padding: 0;
      display: grid;
      grid-row-gap: 4em;

      .cart-items__item {
        list-style-type: none;
        display: grid;
        padding: 1rem;
        grid-template-columns: 15rem 1fr;
        border-top: 0.1rem solid black;
        border-bottom: 0.1rem solid black;
        @media screen and (max-width: 480px) {
          grid-template-columns: 10rem 1fr;
        }
        .cart-items__item__image__container {
          grid-column: 1 / 2;
        }
        .cart-items__item__image__container img {
          width: 15rem;
          height: 15rem;
          @media screen and (max-width: 480px) {
            width: 10rem;
            height: 10rem;
          }
        }
        .cart-items__item__info {
          grid-column: 2 / 3;
          grid-auto-rows: 2rem;
          grid-row-gap: 1rem;
          display: grid;
          grid-template-columns: 4fr auto;
          .cart-items__item__price {
            h4 {
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
