<template>
  <a-modal
    @cancel="closeModal"
    @ok="closeModal"
    :visible="deleteModalVisible"
    :destroyOnClose="true"
    title="Удалить продукт"
  >
    <a-select
      mode="multiple"
      label-in-value
      :value="value"
      :filter-option="false"
      :not-found-content="null"
      placeholder="Выберите продукт"
      style="width: 100%"
      @search="search"
      @change="handleSelected"
    >
      <a-spin v-if="fetching" slot="notFoundContent" size="small" />
      <a-select-option
        v-for="product in initialProducts"
        :value="product._id"
        :key="product._id"
      >
        {{ product.name }}
      </a-select-option>
    </a-select>
    <a-button
      class="mt-5"
      :disabled="!deletable"
      @click="deleteProduct"
      type="danger"
      >Удалить</a-button
    >
  </a-modal>
</template>

<script>
export default {
  props: {
    deleteModalVisible: {
      type: Boolean
    }
  },
  data: () => ({
    value: [],
    fetching: false,
    deletable: false
  }),
  computed: {
    initialProducts() {
      return this.$store.getters["products/products"];
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
      this.value = [];
      this.fetching = false;
    },
    async search(value) {
      const res = await this.$axios.$post("/api/products/search", {
        name: value
      });
      // console.log(res);
      this.initialProducts = res;
    },
    handleSelected(value) {
      Object.assign(this, {
        value,
        products: [],
        fetching: false
      });
    },
    async deleteProduct() {
      if (!this.value.length > 0) return;
      const productsToDelete = this.value.map(entity => entity.key);
      try {
        const { products, categories } = await this.$axios.$post(
          "/api/products/remove-many",
          {
            products: productsToDelete
          }
        );
        this.$store.commit("products/setProducts", products);
        this.$store.commit("categories/setCategories", categories);
        this.$message.success("Удалено");
      } catch (e) {
        this.$message.error(e);
      }
    }
  },
  watch: {
    value: {
      deep: true,
      handler: function(value) {
        if (Object.keys(value).length > 0) {
          this.deletable = true;
        } else {
          this.deletable = false;
        }
      }
    }
  }

  // async activated() {
  //   try {
  //     const products = await this.$axios.$get("/api/products/all");
  //     this.initialProducts = products;
  //   } catch (e) {
  //     this.$message.error(e);
  //   }
  // }
};
</script>

<style></style>
