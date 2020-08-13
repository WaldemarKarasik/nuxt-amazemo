<template>
  <a-modal
    @cancel="closeModal"
    :visible="createModalVisible"
    title="Новая категория"
    :ok-button-props="{
      props: { disabled: !successfullyCreated }
    }"
    @ok="closeModal"
  >
    <div class="w-100">
      <form @submit.prevent="submitForm" class="bg-white">
        <div class="mb-4">
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            v-model="categoryName"
            placeholder="Введите название категории"
          />
        </div>
        <div class="flex items-center justify-between">
          <a-button
            htmlType="submit"
            :disabled="!categoryName.length"
            type="primary"
            >Создать</a-button
          >
        </div>
      </form>
    </div>
  </a-modal>
</template>

<script>
export default {
  props: {
    createModalVisible: {
      type: Boolean
    }
  },
  data: () => ({
    categoryName: "",
    successfullyCreated: null
  }),
  mounted() {
    console.log(this.createModalVisible);
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
      this.categoryName = "";
    },
    async submitForm() {
      const capitalizedCategoryName =
        this.categoryName.charAt(0).toUpperCase() + this.categoryName.slice(1);
      const res = await this.$axios.$post("/api/categories/create", {
        name: capitalizedCategoryName
      });
      if (res.ok) {
        this.$store.commit("categories/addCategory", res.category);
        this.$message.success("Категория создана");
        this.categoryName = "";
        this.successfullyCreated = true;
      }
    }
  }
};
</script>

<style></style>
