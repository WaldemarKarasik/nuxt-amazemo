<template>
  <div class="category-wrapper">
    <ul v-if="category.products.length" class="category-wrapper container">
      <li v-for="product in category.products" :key="product._id">
        <nuxt-link prefetch :to="'/products/' + product._id">
          <a-card hoverable>
            <img slot="cover" alt="product" :src="product.image" />
            <a-card-meta :title="product.name" :description="product.brand">
            </a-card-meta>
            <p class="mt-3 text-2xl">
              <b>{{ product.price }}&#8381;</b>
            </p>
          </a-card>
        </nuxt-link>
      </li>
    </ul>
    <div v-else>
      <a-empty>
        <span slot="description">Тут ничего нет...</span>
      </a-empty>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  async asyncData(ctx) {
    const name =
      ctx.params.name.charAt(0).toUpperCase() + ctx.params.name.slice(1);
    const category = await ctx.$axios.$get(`/api/categories/${name}`);
    return { category };
  }
};
</script>

<style lang="scss" scoped>
.category-wrapper {
  margin-top: 2rem;
  &.container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    li {
      flex: 0 1 30rem;
      list-style: none;
      &:nth-of-type(even) {
        margin-right: 2rem;
        margin-left: 2rem;
      }
    }
  }
}
</style>
