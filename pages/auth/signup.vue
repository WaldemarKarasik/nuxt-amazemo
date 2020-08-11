<template>
  <Auth authType="register">
    <template v-slot:form>
      <form>
        <input placeholder="hello" />
      </form>
    </template>
  </Auth>
</template>

<script>
import Auth from "../../components/Auth";
export default {
  middleware: "guest"
};
</script>

<style></style>
