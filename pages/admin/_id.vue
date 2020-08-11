<template>
  <div>
    <Modal @adminSubmitted="adminSubmitted" :visible="!isSubmitted" />
    <AdminPanel v-if="isSubmitted" />
  </div>
</template>

<script>
import Modal from "../../components/admin/initialModal/Modal";
import AdminPanel from "../../components/admin/panel";
export default {
  middleware: "admin",
  data: () => ({
    isSubmitted: false
  }),
  components: {
    Modal,
    AdminPanel
  },
  methods: {
    adminSubmitted() {
      this.isSubmitted = true;
    }
  },
  created() {
    const rememberAdmin = this.$cookies.get("rememberAdmin");
    if (rememberAdmin) {
      this.isSubmitted = true;
    }
  },
  asyncData(ctx) {
    if (ctx.store.state.auth.user._id != ctx.params.id) {
      ctx.redirect("/");
      ctx.res.end();
    }
  }
};
</script>

<style></style>
