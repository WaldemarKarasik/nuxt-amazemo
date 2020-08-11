<template>
  <a-modal
    v-model="visible"
    title="Подтвердите пароль"
    @cancel="cancel"
    :ok-button-props="{ props: { disabled: true } }"
  >
    <Form @formSubbmited="ok" />
  </a-modal>
</template>

<script>
import Form from "./Form";
import Cookie from "js-cookie";
export default {
  data: () => ({
    formSubmitted: false
  }),
  props: {
    visible: {
      type: Boolean
    }
  },
  methods: {
    cancel() {
      this.$router.push("/");
    },
    ok() {
      this.$emit("adminSubmitted");
      this.$cookies.set("rememberAdmin", true);
    }
  }
};
</script>

<style></style>
