<template>
  <header class="header">
    <div class="brand" style="display: flex; align-items: center">
      <div>
        <button class="hamburger" @click="openAside()">
          &#9776;
        </button>
      </div>
      <nuxt-link to="/">Amazemo</nuxt-link>
    </div>
    <div class="header-links">
      <nuxt-link class="header-links__cart" to="/cart">
        <span>Корзина </span>
      </nuxt-link>
      <nuxt-link v-if="!$auth.loggedIn" to="/auth/signin">
        Войти
      </nuxt-link>
      <div v-else class="cursor-pointer ml-10 ">
        <a-dropdown :trigger="['click']">
          <span>{{ $auth.user.email }}</span>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="#">1st menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">2nd menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="#" @click="logout">Выйти</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Header",
  data: () => ({
    showDropdown: false
  }),
  methods: {
    ...mapMutations({
      openAside: "aside/openAside"
    }),
    logout() {
      this.$auth.logout();
    }
  }
};
</script>
