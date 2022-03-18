<template>
  <div class="mainPdfTaskComponent">
    <div class="head p-d-flex p-flex-row p-jc-start p-ai-start">
      <h2 id="title">TAREFA: #{{ task.idTarefaFK.id }}&nbsp; -</h2>
      <h2>&nbsp;{{ task.idTarefaFK.nome }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "PdfTaskComponent",
  props: ["task", "photos", "model"],
  mounted() {
    console.log("props:");
    console.log(this.task);
  },
};
</script>

<style lang="scss" scoped>
.mainPdfTaskComponent {
  width: 100%;
  height: auto;

  .head {
    h2 {
      width: auto;
    }
    #title {
      color: #99180f;
    }
  }
}
</style>