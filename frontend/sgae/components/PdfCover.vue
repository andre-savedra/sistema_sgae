<template>
 <main :style="cssCustom" class="pdf-cover p-d-flex p-flex-column p-jc-center p-ai-center">
      <header class="p-d-flex p-flex-column p-jc-start p-ai-center">
          <h1 class="main-title">{{textTitle}}</h1>
          <h2 class="cfp">{{textCfp}}</h2>
          <footer>
            <h4 class="pdf-date">Março de 2022</h4>
          </footer>
      </header>
  </main>
</template>

<script>
export default {
  name: "PdfCover",
  props: ["textTitle", "textCfp"],
  computed: {
      cssCustom(){
          return {
          };
      }
  }
};
</script>

<style lang="scss" scoped>

.pdf-cover{
    
    width: 100%;
    /* max-width: 2480px; */
    height: auto;
    min-height: 100vh;    
    background-color: red;
    
    header{        
        width: 100%;
        $header_height: 1340px;
        height: $header_height;
        max-height: 3508px;
        background-image: url("@/static/relatorio.png");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: top;

        h1,h2,h4, footer{
          width: auto;
          height: auto;
          color: white;
        }

        .main-title{
          margin-top: calc(0.3 * $header_height);
          font-size: 48px !important;
        }

        .cfp{
          font-size: 40px !important;
          margin-top: calc(0.1 * $header_height);
        }

        footer{         
          margin-top: calc(0.47 * $header_height);

          .pdf-date{
            font-size: 20px !important;
          }
        }
    }

}
</style>