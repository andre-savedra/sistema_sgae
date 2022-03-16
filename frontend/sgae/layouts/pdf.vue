<template>
  <div class="p-d-flex p-flex-column pdf-main">
    <Nuxt/>
  </div>
</template>

<script>
export default {
  name: "layout_pdf",
};
</script>

<style lang="scss">
@import "@/layouts/scss/reset.scss";


.pdf-main {  
  width: auto;
  min-width: 100%;
  height: auto;
  min-height: 100%;
  /* background-color: rgb(223, 197, 201); */
  display: flex;
  
  flex-direction: column;
  align-items: center;
  justify-self: start;
};
</style>