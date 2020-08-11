<template>
  <a-modal
    @ok="closeModal"
    @cancel="closeModal"
    :visible="deleteModalVisible"
    title="Удалить категорию"
    :ok-button-props="{ props: { disabled: successfullyDeleted != true } }"
  >
    <a-select
      id="category"
      placeholder="Tag"
      style="width: 100%"
      :value="selectedCategory"
      @select="categorySelected"
    >
      <a-select-option
        v-for="category in categories"
        :key="category._id"
        :value="category._id"
        >{{ category.name }}</a-select-option
      >
    </a-select>
    <a-button
      @click="deleteCategory"
      :disabled="!selectedCategory"
      class="mt-5"
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
    selectedCategory: null,
    successfullyDeleted: null
  }),
  computed: {
    categories() {
      return this.$store.getters["categories/categories"];
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
      this.selectedCategory = null;
      this.successfullyDeleted = null;
    },
    categorySelected(id) {
      this.selectedCategory = id;
    },
    async deleteCategory() {
      try {
        const res = await this.$axios.$post(
          `/api/categories/delete/${this.selectedCategory}`
        );
        this.$store.commit("categories/deleteCategory", res);
        this.selectedCategory = null;
        this.successfullyDeleted = true;
        this.$message.success("Категория удалена");
      } catch (e) {
        this.$message.error(e.response.data);
      }
    }
  }
};
</script>

<style></style>
