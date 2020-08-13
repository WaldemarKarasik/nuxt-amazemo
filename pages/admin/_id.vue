<template>
  <div>
    <Modal @adminSubmitted="adminSubmitted" :visible="!isSubmitted" />
    <AdminPanel :users="users" v-if="isSubmitted" />
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
    this.$bus.$on("userChanged", userData => {
      // const user = this.users.find((x) => x_id == userData._id)
      this.users = this.users.map(x => (x._id == userData._id ? userData : x));
      this.$message.success("Пользовательские данные изменены");
    });
  },
  async asyncData(ctx) {
    if (ctx.store.state.auth.user._id != ctx.params.id) {
      ctx.redirect("/");
      ctx.res.end();
    }
    const users = await ctx.store.$axios.$get(
      `${
        process.env.BASE_URL
          ? process.env.BASE_URL + "/api/auth/all"
          : "http://localhost:3000/api/auth/all"
      }`
    );
    return { users };
  }
};
</script>

<style></style>
