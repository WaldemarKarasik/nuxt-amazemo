<template>
  <div>
    <a-button type="danger">Удалить</a-button>
  </div>
</template>

<script>
export default {
  props: ["users"],
  computed: {
    usersButCurrent() {
      return this.users.filter(user => user._id !== this.$auth.user._id);
    }
  }
};
</script>

<style></style>
