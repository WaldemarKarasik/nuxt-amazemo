<template>
  <Auth authType="login">
    <template v-slot:form>
      <div class="w-full">
        <form
          @submit.prevent="login"
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-md font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <ValidationProvider rules="required|min:5" v-slot="{ errors }">
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
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              v-model="loginData.password"
              placeholder="******************"
            />
            <!-- <p class="text-red-500 text-xs italic">Пожалуйста введите пароль</p> -->
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Войти
            </button>
            <a
              class="inline-block align-baseline font-bold text-md text-blue-500 hover:text-blue-800"
              href="#"
            >
              Еще нет аккаунта?
            </a>
          </div>
        </form>
      </div>
    </template>
  </Auth>
</template>

<script>
import Auth from "../../components/Auth";
import { extend } from "vee-validate";
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
      this.$auth.loginWith("local", { data: this.loginData });
    }
  }
};
</script>

<style lang="scss" scoped>
.grid-wrapper {
  display: grid;
  height: 100%;
  grid-template-columns: 410px 5fr;
  .form-wrapper {
    grid-column: 1 / 2;
    padding: 50px 0px 0px 42px;
    form {
    }
  }
  $softPink: #f9d8d4;
  $yellow: #f9a734;
  $DarkYellow: #fb8b24;
  $green: #36964c;
  $DarkGreen: #286e38;

  /* Background styles */

  .image-wrapper {
    background:
	/* Pineapple details */ radial-gradient(
        circle closest-side at 50px 50px,
        $DarkYellow 3px,
        transparent 0
      ),
      radial-gradient(
        circle closest-side at 40px 60px,
        $DarkYellow 3px,
        transparent 0
      ),
      radial-gradient(
        circle closest-side at 60px 60px,
        $DarkYellow 3px,
        transparent 0
      ),
      radial-gradient(
        circle closest-side at 50px 70px,
        $DarkYellow 3px,
        transparent 0
      ),
      radial-gradient(
        circle closest-side at 150px 165px,
        $DarkYellow 3px,
        transparent 0
      ),
      radial-gradient(
        circle closest-side at 140px 175px,
        $DarkYellow 3px,
        transparent 0
      ),
      radial-gradient(
        circle closest-side at 160px 175px,
        $DarkYellow 3px,
        transparent 0
      ),
      radial-gradient(
        circle closest-side at 150px 185px,
        $DarkYellow 3px,
        transparent 0
      ),
      /* Pineapple base */
        radial-gradient(
          ellipse closest-side at 50px 60px,
          $yellow 18px,
          transparent 0
        ),
      radial-gradient(
        ellipse closest-side at 150px 175px,
        $yellow 18px,
        transparent 0
      ),
      /* Pineapple leafs */
        radial-gradient(
          circle closest-side at 30px 40px,
          $softPink 15px,
          transparent 0
        ),
      radial-gradient(
        circle closest-side at 40px 35px,
        $green 15px,
        transparent 0
      ),
      radial-gradient(
        circle closest-side at 70px 40px,
        $softPink 15px,
        transparent 0
      ),
      radial-gradient(
        circle closest-side at 60px 35px,
        $DarkGreen 15px,
        transparent 0
      ),
      radial-gradient(
        circle closest-side at 130px 155px,
        $softPink 15px,
        transparent 0
      ),
      radial-gradient(
        circle closest-side at 140px 150px,
        $green 15px,
        transparent 0
      ),
      radial-gradient(circle at 170px 155px, $softPink 15px, transparent 0),
      radial-gradient(circle at 160px 150px, $DarkGreen 15px, transparent 0);
    background-color: $softPink;
    background-size: 180px 210px;
    animation: animatedBackground 0.5s cubic-bezier(0.61, -0.64, 0.58, 1.46)
      forwards;
  }

  /* Animation */

  @keyframes animatedBackground {
    from {
      background-position: 0 50%;
    }
    to {
      background-position: 0 0;
    }
  }
}
</style>
