<template>
  <main class="Pdf p-d-flex p-flex-column p-jc-center p-ai-center">
    <PdfCover textTitle="Relatório de Ações" textCfp="CFP 5.01" />

    <div class="page-divisor">
      <h3>{{ $route.params.idpdf }}</h3>
    </div>

    <PdfHeader cfp="CFP 5.01" />
  </main>
</template>


<script>
export default {
  layout: "pdf",
  data() {
    return {
      taskID: 40
    };
  },
  methods: {},
  mounted() {
    if(!this.$route.params.idpdf)
      this.taskID = 40;
    else
      this.taskID = this.$route.params.idpdf;
  },
};
</script>
<style lang="scss" scoped>
.Pdf {
  width: 70%;
  height: auto;
  min-height: 100vh;
  /* background-color: yellow; */

  .page-divisor {
    width: 100%;
    height: 25px;
    /* background-color: blue; */
  }
}
</style>