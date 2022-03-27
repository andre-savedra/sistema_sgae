<template>
  <div class="p-d-flex p-flex-column login-main">
    <Nuxt/>
  </div>
</template>

<script>
export default {
  name: "layout_login",
  mounted() {
    console.log("login.vue");
  }
};
</script>

<style lang="scss">
@import "@/layouts/scss/reset.scss";


.login-main {
  width: 100vw;
  height: auto;
  min-height: 100vh;
};
</style>