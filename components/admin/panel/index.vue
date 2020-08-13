<template>
  <div class="main-wrapper">
    <div class="left-sidebar">
      <h3 class="text-4xl">Действия с пользователями</h3>
      <div class="left-sidebar__actions">
        <!-- <DeleteUser user={user} /> -->
        <DeleteUser :users="users" />
        <ModifyUser :users="users" />
      </div>
    </div>

    <div class="main__dashboard">
      <div class="main__dashboard__products">
        <!-- <ProductsCard /> -->
        <ProductsCard />
      </div>
      <div class="main__dashboard__categories">
        <CategoriesCard />
      </div>
    </div>
  </div>
</template>

<script>
import ProductsCard from "./products/ProductsCard";
import CategoriesCard from "./categories/CategoriesCard";
import ModifyUser from "./users/ModifyUser";
import DeleteUser from "./users/DeleteUser";

export default {
  components: {
    ProductsCard,
    CategoriesCard,
    ModifyUser
  },
  props: {
    users: {
      type: Array
    }
  }
};
</script>

<style scoped lang="scss">
.main-wrapper {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-auto-rows: 1fr;
  height: 100%;

  .left-sidebar {
    height: 100%;
    grid-column: 1 / 2;
    border-right: 0.4rem solid blue;
    text-align: center;
    .left-sidebar__actions {
      margin-top: 3rem;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      gap: 2rem;
    }
  }
  .main__dashboard {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
    margin-top: 2rem;
    justify-items: center;
    .main__dashboard__products {
      grid-column: 1 / 2;

      @media (max-width: 1000px) {
        grid-column: 1;
        grid-row: 1 / 2;
      }
    }
    .main__dashboard__categories {
      grid-column: 2 / 3;
      @media (max-width: 1000px) {
        grid-column: initial;
        grid-row: 2 / 3;
      }
    }
  }
}
</style>
