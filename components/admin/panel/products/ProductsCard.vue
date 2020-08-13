<template>
  <div>
    <a-card hoverable>
      <a-statistic
        title="Всего продуктов"
        :value="summaryProducts"
      ></a-statistic>
      <template slot="actions">
        <a-icon type="plus" @click="setCreateModalVisible"></a-icon>
        <a-icon type="delete" @click="setDeleteModalVisible" />
      </template>
    </a-card>
    <CreateProductModal
      @closeModal="setCreateModalInvisible"
      :createModalVisible="createModalVisible"
    />
    <DeleteProductModal
      :deleteModalVisible="deleteModalVisible"
      @closeModal="setDeleteModalInvisible"
    />
  </div>
</template>

<script>
import CreateProductModal from "./CreateProductModal";
import DeleteProductModal from "./DeleteProductModal";

export default {
  components: {
    CreateProductModal
  },
  computed: {
    summaryProducts() {
      return this.$store.getters["products/products"].length;
    }
  },
  data: () => ({
    createModalVisible: false,
    deleteModalVisible: false
  }),
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
