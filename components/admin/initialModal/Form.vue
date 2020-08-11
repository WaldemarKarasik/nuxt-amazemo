<template>
  <ValidationProvider rules="required" v-slot="{ errors }">
    <a-input
      addonBefore="Пароль"
      @pressEnter="submit"
      v-model="password"
      placeholder="Введите пароль и нажмите Enter"
    />
    <span class="text-red-400 ">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
export default {
  data: () => ({ password: "" }),
  // props: {
  //   formSubbmited: {
  //     type: Boolean
  //   }
  // },
  methods: {
    async submit() {
      const isMatch = await this.$axios.$post("/api/auth/compare-password", {
        _id: this.$auth.user._id,
        password: this.password
      });
      if (isMatch) {
        this.$emit("formSubbmited");
      }
    }
  }
  // created() {
  //   console.log(this.$auth.user._id);
  // }
};
</script>

<style></style>
