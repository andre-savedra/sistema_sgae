<template>
  <main class="lobby p-d-flex p-flex-column p-jc-center p-ai-center">
    <section class="upper p-d-flex p-flex-column p-jc-center p-ai-center">
      <div class="img-inner p-d-flex p-flex-column p-jc-center p-ai-center">
        <img v-if="flip" class="back" src="@/assets/media/sgae.png" />
        <img v-else class="front" src="@/assets/media/sgae.png" />
      </div>
      <!-- <h1 v-if="loggedUser.nome">
        &#10024; {{ loggedUser.nome.split(" ")[0] }}, preparando seu ambiente!
        &#10024;
      </h1>
      <h1 v-else>&#10024; Preparando seu ambiente! &#10024;</h1> -->
      <h1>&#10024; Preparando seu ambiente! &#10024;</h1>
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
  name: "lobby",
  layout: "login",
  middleware: "auth",
  data() {
    return {
      flip: false,
      storaged: false,
      counter: 0,
    };
  },
  methods: {
    flipper: function () {
      if (this.loggedUser !== null && this.loggedUser !== undefined) {
        this.counter++;
      }

      // console.log("flipper");

      const flipperTimer = setTimeout(() => {
        this.flip = !this.flip;
        this.flipper();
        // console.log("this.$store.state.actualUser");
        // console.log(this.$store.state.actualUser);
      }, 1000);
      if (this.counter > 4) {
        clearTimeout(flipperTimer);
        // console.log("redirecionando....");
        // this.$router.push("/initial");
        this.$router.push("/tarefas");
      }
    },
  },
  mounted() {
    // console.log("lobby page...");
    this.flipper();
  },
  async asyncData({ $axios, $auth }) {
    console.log($auth);

    //cheack if there is value storaged
    const valueStoraged = $auth.$storage.getUniversal("actualUserStoraged");
    if (valueStoraged) {
      console.log("Storaged already defined");
      console.log(valueStoraged);
    }

    const server = process.env.BASE_URL + "/";

    let users = $auth.$storage.getUniversal("user");

    if (users) {
      alert("encontrou cookie users:\n" + JSON.stringify(users));
    } else {
      alert("não encontrou cookie user");
      users = await $axios.get(server + "api/v1/users/me/");
      users = users.data;
      console.log("users requisitado:");
      console.log(users);
    }

    let loggedUser = null;
    let usuarios = null;

    if (users) {
      alert("token: \n" + $auth.$storage.getUniversal("_token.local"));


      const func1 = async ()=>{
        console.log("func1");
        usuarios = await fetch(server + "usuarios/" + users.id, {
          headers: {
            Authorization: $auth.$storage.getUniversal("_token.local"),
          },
        })
      }

      const func2 = async ()=>{
        console.log("func2");
        loggedUser = await usuarios.json()
        loggedUser = loggedUser.data;
      }

      const func3 = async ()=>{
        console.log("func3");
        await $auth.$storage.setUniversal("actualUserStoraged", loggedUser);
      }

      const p = await Promise.all([
        func1,
        func2,
        func3
      ])

      
      return {
        loggedUser,
      };

      
    }

   
  },
};
</script>

<style lang="scss" scoped>
.lobby {
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