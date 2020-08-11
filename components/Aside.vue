<template>
  <a-drawer
    :visible="isOpened"
    title="Выберите катерогию"
    placement="left"
    @close="closeAside()"
  >
    <div class="flex flex-col justify-between" style="height: 100%;">
      <a-button
        @click="navigateAdmin()"
        type="primary"
        v-if="$auth.user && $auth.user.isAdmin"
        >Панель администратора</a-button
      >
      <a-list
        :style="$auth.user && $auth.user.isAdmin && 'margin-top: 3rem;'"
        bordered
        :data-source="categories"
      >
        <a-list-item
          @click="
            () =>
              $router.push({
                path: `/categories/${category.name.charAt(0).toLowerCase() +
                  category.name.slice(1)}`
              })
          "
          slot="renderItem"
          slot-scope="category, index"
          class="cursor-pointer"
        >
          <nuxt-link
            :to="{
              path: `/categories/${category.name.charAt(0).toLowerCase() +
                category.name.slice(1)}`
            }"
          >
            <a-badge
              :count="category.products.length"
              show-zero
              :offset="[15, 7]"
            >
              {{ category.name }}
            </a-badge>
          </nuxt-link>
        </a-list-item>
      </a-list>
    </div>
  </a-drawer>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Aside",
  data: () => ({}),
  computed: {
    isOpened() {
      return this.$store.getters["aside/get"];
    },
    products() {
      return this.$store.getters["products/products"];
    },
    categories() {
      return this.$store.getters["categories/categories"];
    }
  },
  methods: {
    ...mapMutations({
      closeAside: "aside/closeAside"
    }),
    getCategoriesProductsAmount(category) {
      return Object.keys(category.products).length;
    },
    navigateAdmin() {
      this.closeAside();
      this.$router.push({ path: `/admin/${this.$auth.user._id}` });
    }
  }
};
</script>
