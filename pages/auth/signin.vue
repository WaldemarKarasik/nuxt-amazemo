<template>
  <Auth authType="login">
    <template v-slot:form>
      <div class="w-full">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form
            @submit.prevent="handleSubmit(login)"
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
                  v-model="loginData.email"
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
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  v-model="loginData.password"
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
                Войти
              </button>
              <nuxt-link
                :to="{ path: `/auth/signup` }"
                class="inline-block align-baseline font-bold text-md text-blue-500 hover:text-blue-800"
              >
                Еще нет аккаунта?
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
  components: {},
  data: () => ({
    loginData: {
      email: "",
      password: ""
    }
  }),
  methods: {
    login() {
      this.$auth
        .loginWith("local", { data: this.loginData })
        .catch(e => this.$message.error(e.response.data));
    }
  }
};
</script>
