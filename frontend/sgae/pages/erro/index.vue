=<template>
  <main class="erro p-d-flex p-flex-column p-jc-center p-ai-center">
    <section class="upper p-d-flex p-flex-column p-jc-center p-ai-center">
      <div class="img-inner p-d-flex p-flex-column p-jc-center p-ai-center">
        <img v-if="flip" class="back" src="@/assets/media/sgae.png" />
        <img v-else class="front" src="@/assets/media/sgae.png" />
      </div>
      <h1>&#10024; Ops!!! &#10024;</h1>
      <h3>&#10024; Email não pode ser validado... &#10024;</h3>
    </section>
    <footer class="p-d-flex p-flex-column p-jc-center p-ai-end">
      <h3>Sistema de Gestão de Ambiente de Ensino</h3>
      <p>&reg; Senai Roberto Mange</p>
    </footer>
    <div class="stars1"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>
  </main>
</template>

<script>
export default {
  name: "erro",
  layout: "login",
  
  data() {
    return {
      flip: false,
    };
  },
  methods: {
    flipper: function () {
      
        const flipperTimerSuccess = setTimeout(() => {
          this.flip = !this.flip;
          this.flipper();

        }, 1000);      
    },
   
  },
  mounted() {
    this.flipper();
  },

  
};
</script>

<style lang="scss" scoped>
.erro {
  width: 100vw;
  height: 100vh;

  background-color: #313131;
  color: white;
  overflow-y: hidden;
  text-align: center;

  .front {
    transform: rotateY(0deg);
  }
  .back {
    transform: rotateY(180deg);
  }

  .upper {
    width: 100vw;
    height: 85vh;
    .img-inner {
      width: 100vw;
      height: auto;

      background-size: 200% 200%;
      animation: gradient 3s ease infinite;
      perspective: 1000px;

      img {
        margin-top: 0px;
        align-items: center;
        display: flex;
        width: 20vw;
        height: 17vw;
        min-width: 200px;
        min-height: 200px;
        position: relative;
        bottom: 30px;

        transition: transform 0.8s;
        transform-style: preserve-3d;
      }
    }
  }

  footer {
    width: 100vw;
    height: 15vh;
  }
}

@media screen and (max-width: 580px) {
  h1 {
    font-size: 18px;
  }
  h3 {
    font-size: 14px;
  }
  p {
    font-size: 12px;
  }
}

@media screen and (max-width: 420px) {
  h1 {
    font-size: 14px;
  }
  h3 {
    font-size: 12px;
  }
  p {
    font-size: 11px;
  }
}
</style>