import { extend, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import Vue from "vue";
extend("required", {
  ...required,
  message: "Это поле обязательно"
});

Vue.component("ValidationProvider", ValidationProvider);
