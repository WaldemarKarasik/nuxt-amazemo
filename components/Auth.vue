<template>
  <div class="grid-wrapper">
    <div class="form-wrapper">
      <h1 class="text-5xl">
        {{
          authType == "login"
            ? "Войдите в свой аккаунт"
            : "Создать новый аккаунт"
        }}
      </h1>
      <slot name="form"> </slot>
    </div>
    <div class="image-wrapper"></div>
  </div>
</template>

<script>
export default {
  props: {
    authType: {
      type: String
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
