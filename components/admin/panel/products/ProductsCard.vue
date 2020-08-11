<template>
  <a-card hoverable>
    <a-statistic title="Всего продуктов" :value="summaryProducts"></a-statistic>
    <template slot="actions">
      <a-icon type="plus"></a-icon>
      <a-icon type="delete" />
    </template>
  </a-card>
</template>

<script>
export default {
  computed: {
    summaryProducts() {
      return this.$store.getters["products/products"].length;
    }
  }
};
</script>

<style></style>
