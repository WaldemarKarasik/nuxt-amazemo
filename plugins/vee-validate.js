import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required, alpha, email, min } from "vee-validate/dist/rules";
import Vue from "vue";
extend("required", {
  ...required,
  message: "Это поле обязательно"
});

extend("alpha", {
  ...alpha,
  message: "Это поле должно содержать только буквы"
});

extend("email", {
  ...email,
  message: "Введите корректный email"
});

extend("min", {
  validate(value, args) {
    return value.length >= args.length;
  },
  params: ["length"],
  message: `Минимальная длина {length} символов`
});

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
