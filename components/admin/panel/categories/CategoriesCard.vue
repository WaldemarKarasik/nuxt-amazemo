<template>
  <div>
    <a-card hoverable>
      <a-statistic title="Всего категорий" :value="summaryCategories" />
      <template slot="actions">
        <a-icon @click="setCreateModalVisible" type="plus"></a-icon>
        <a-icon @click="setDeleteModalVisible" type="delete" />
      </template>
    </a-card>
    <CreateCategoryModal
      @closeModal="setCreateModalInvisible"
      :createModalVisible="createModalVisible"
    />
    <DeleteCategoryModal
      @closeModal="setDeleteModalInvisible"
      :deleteModalVisible="deleteModalVisible"
    />
  </div>
</template>

<script>
import CreateCategoryModal from "./CreateCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
export default {
  components: {
    CreateCategoryModal,
    DeleteCategoryModal
  },
  data: () => ({
    createModalVisible: false,
    deleteModalVisible: false
  }),
  computed: {
    summaryCategories() {
      return this.$store.getters["categories/categories"].length;
    }
  },
  methods: {
    setCreateModalVisible() {
      this.createModalVisible = true;
    },
    setCreateModalInvisible() {
      this.createModalVisible = false;
    },
    setDeleteModalVisible() {
      this.deleteModalVisible = true;
    },
    setDeleteModalInvisible() {
      this.deleteModalVisible = false;
    }
  }
};
</script>

<style></style>
