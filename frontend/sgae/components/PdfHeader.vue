<template>
 <main :style="cssCustom" class="pdf-cover p-d-flex p-flex-column p-jc-center p-ai-center">
      <header class="p-d-flex p-flex-row p-jc-start p-ai-start">
          <div class="img-container p-d-flex p-flex-row p-jc-end p-ai-center">
            <img src="senai-logo.png" alt="senai logo">
          </div>
          
          <div class="cfp-header p-d-flex p-flex-row p-jc-end p-ai-center">
            <h4 class="p-pr-5">{{cfp}}</h4>
          </div>

          
      </header>
  </main>
</template>

<script>
export default {
  name: "PdfHeader",
  props: ["cfp"],
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
    height: 70px;
    /* background-color: yellowgreen; */

    header{
      width: 100%;
      height: 100%;
      
      .img-container{
        width: 60%;
        
        img{
          width: 190px;
          height: 60px;
        }
      }

      .cfp-header{
        width: 40%;
        
        height: 60px;
        h4{
          width: auto;
          font-size: 20px;
        }
      }

    }
    
  

}
</style>