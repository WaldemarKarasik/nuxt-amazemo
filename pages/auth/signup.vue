<template>
  <Auth authType="register">
    <template v-slot:form>
      <div class="w-full">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form
            @submit.prevent="handleSubmit(register)"
            class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div class="mb-4">
              <label
                class="block text-gray-700 text-md font-bold mb-2"
                for="email"
              >
                Email
              </label>
              <ValidationProvider
                rules="required|min:3|email"
                v-slot="{ errors }"
              >
                <input
                  v-model="email"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Email"
                />
                <p class="text-red-500 text-md italic mt-3">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-md font-bold mb-2"
                for="password"
              >
                Пароль
              </label>
              <ValidationProvider rules="required|min:5" v-slot="{ errors }">
                <input
                  v-model="password"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                />
                <p class="text-red-500 text-md italic mt-3">{{ errors[0] }}</p>
              </ValidationProvider>

              <!-- <p class="text-red-500 text-xs italic">Пожалуйста введите пароль</p> -->
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Зарегистрироваться
              </button>
              <nuxt-link
                :to="{ path: `/auth/signin` }"
                class="inline-block align-baseline font-bold text-md text-blue-500 hover:text-blue-800"
              >
                Войти
              </nuxt-link>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </template>
  </Auth>
</template>

<script>
import Auth from "../../components/Auth";
export default {
  middleware: "guest",
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    async register() {
      try {
        const { ok, user } = await this.$axios.$post("/api/auth/register", {
          email: this.email,
          password: this.password
        });
        if (ok) {
          this.$auth.loginWith("local", {
            data: { email: this.email, password: this.password }
          });
        }
      } catch (e) {
        this.$message.error(e.response.data);
      }
    }
  }
};
</script>

<style></style>
