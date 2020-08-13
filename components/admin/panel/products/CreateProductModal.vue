<template>
  <a-modal
    @cancel="closeModal"
    :visible="createModalVisible"
    @ok="closeModal"
    title="Новый продукт"
    destroyOnClose
  >
    <div class="w-100">
      <form @submit.prevent="createProduct" class="bg-white">
        <div class="mb-4">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <input
              :class="
                `${errors[0] &&
                  `border-red-200`} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`
              "
              id="name"
              type="text"
              v-model="form.name"
              placeholder="Введите название продукта"
            />
            <span class="text-md text-red-400">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <input
              :class="
                `${errors[0] &&
                  `border-red-200`} mt-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`
              "
              id="brand"
              type="text"
              v-model="form.brand"
              placeholder="Введите бренд продукта"
            />
            <span class="text-md text-red-400">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <input
              :class="
                `${errors[0] &&
                  `border-red-200`} mt-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`
              "
              id="image"
              type="text"
              v-model="form.image"
              placeholder="Ссылка на картинку с продуктом"
            />
            <span class="text-md text-red-400">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <div class="mt-5">
              <a-select placeholder="Категория" v-model="form.category">
                <a-select-option
                  v-for="category in categories"
                  :key="category._id"
                  :value="category._id"
                  >{{ category.name }}</a-select-option
                >
              </a-select>
              <span class="text-md text-red-400">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <a-input-number
            v-model="form.countInStock"
            style="width: 100%; margin-top: 10px;"
            placeholder="В наличии"
            :min="0"
            :max="100"
          />
          <a-input-number
            v-model="form.price"
            style="width: 100%; margin-top: 10px;"
            placeholder="Цена"
            :min="0"
          />
        </div>
        <div class="flex items-center justify-between">
          <a-button :disabled="!formValid" htmlType="submit" type="primary"
            >Создать</a-button
          >
        </div>
      </form>
    </div>
  </a-modal>
</template>

<script>
export default {
  props: {
    createModalVisible: {
      type: Boolean
    }
  },
  data: () => ({
    form: {
      name: "",
      category: undefined,
      brand: "",
      image: "",
      price: null,
      countInStock: null
    },
    formValid: false
  }),
  methods: {
    closeModal() {
      this.$emit("closeModal");
      this.form = {};
      this.formValid = false;
    },
    async createProduct() {
      try {
        this.form.price = parseInt(this.form.price, 10);
        const res = await this.$axios.$post("/api/products/create", {
          ...this.form
        });
        this.$store.commit("products/addProduct", res);
        this.$store.commit("categories/setCategory", res.category);
        this.$message.success("Продукт создан");
      } catch (e) {
        this.$message.error(e.response.data);
      }
    }
  },
  watch: {
    form: {
      deep: true,
      handler(value) {
        if (
          value.brand &&
          value.category &&
          value.countInStock &&
          value.image &&
          value.name &&
          value.price
        ) {
          this.formValid = true;
        }
      }
    }
  },
  computed: {
    categories() {
      return this.$store.getters["categories/categories"];
    }
  }
};
</script>

<style></style>
