<template>
  <div>
    <a-button @click="toggleModal(true)">Редактировать</a-button>
    <a-modal
      @cancel="toggleModal(false)"
      :visible="modalVisible"
      title="Редактировать пользователя"
    >
      <div class="wrapper">
        <ValidationProvider slim rules="required" v-slot="{ errors }">
          <a-select
            class="wrapper__select"
            placeholder="Выберите пользователя"
            v-model="selectedUser"
            :class="errors.length && `${`border-2 border-red-400`}`"
          >
            <a-select-option
              v-for="user in usersButCurrent"
              :key="user._id"
              :value="user._id"
            >
              {{ user.email }}
            </a-select-option>
          </a-select>
        </ValidationProvider>
        <div class="change-user-wrapper" v-if="selectedUser">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(changeUser)">
              <ValidationProvider rules="required|email" v-slot="{ errors }">
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Изменить email"
                  type="text"
                  v-model="userInfo.email"
                />
                <p class="text-red-500 text-md italic mt-3">{{ errors[0] }}</p>
              </ValidationProvider>
              <a-button htmlType="submit">Сохранить</a-button>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: ["users"],
  data: () => ({
    modalVisible: false,
    selectedUser: null,
    userInfo: {
      email: ""
    }
  }),
  computed: {
    usersButCurrent() {
      return this.users.filter(user => user._id !== this.$auth.user._id);
    }
  },
  methods: {
    toggleModal(value) {
      this.modalVisible = value;
    },
    changeUser() {
      this.$axios
        .$post("/api/admin/edit-user", {
          userId: this.selectedUser,
          userInfo: this.userInfo
        })
        .then(data => this.$bus.$emit("userChanged", data))
        .catch(e => this.$message.error(e.response.data));
    }
  },
  watch: {
    selectedUser: function(value) {
      if (value.length) {
        this.userInfo = JSON.parse(
          JSON.stringify(this.usersButCurrent.find(x => x._id == value))
        );
      }
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .wrapper__select {
    width: 50%;
  }
  .change-user-wrapper {
    flex: 1 1 100%;
    margin-top: 2rem;
  }
}
</style>
