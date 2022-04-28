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
      loggedUser: null,
    };
  },
  methods: {
    flipper: function () {
      if (this.loggedUser !== null && this.loggedUser !== undefined) {
        this.counter++;
      } else {
        alert("logged nulo");
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
    test() {
      return new Promise((resolve, reject)=>{
        // this.$axios
        // .get("https://backend.sgae501.com.br/usuarios/2")
        fetch("https://backend.sgae501.com.br/usuarios/2", {
          headers: {
            Authorization: this.$auth.$storage.getUniversal("_token.local"),
          },
        })
        .then((usuarios) => {
          const usuariosJson = usuarios.json();
          return usuariosJson
        })
        .then((usuariosJson) => {
          alert("resposta")
          console.log("usuarios.data");
          console.log(usuariosJson.data);
          
          alert("nome:" + usuariosJson.data.nome);
          resolve(usuariosJson.data);
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
          alert(error);
          reject(error);        
        })
      })
    },
    // test() {
    //   return new Promise((resolve, reject)=>{
    //     const server = process.env.BASE_URL + "/";
    //     this.$axios
    //     .get(server + "usuarios/" + this.$auth.$storage.getUniversal("user").id)
    //     .then((usuarios) => {
    //       // const usuariosJson = usuarios.json();
    //       console.log("usuarios.data");
    //       console.log(usuarios.data.data);
          
    //       alert("nome:" + usuarios.data.data.nome);
    //       resolve(usuarios.data.data);
    //     })
    //     .catch((error) => {
    //       console.log("error");
    //       console.log(error);  
    //       reject(error);        
    //     })
    //   })
    // },
  },
  async mounted() {
    // console.log("lobby page...");

    // fetch(server + "usuarios/" + this.$auth.$storage.getUniversal("user").id, {
    //   headers: {
    //     Authorization: this.$auth.$storage.getUniversal("_token.local"),
    //   },
    // })

    this.loggedUser = await this.test();
    // this.$auth.$storage.setUniversal(
    //         "actualUserStoraged",
    //         this.loggedUser
    //       );
    console.log("this.logger");
    console.log(this.loggedUser);
    this.flipper();
  },
  // async asyncData({ $auth }) {
  // console.log($auth);

  // const valueStoraged = await $auth.$storage.getUniversal(
  //   "actualUserStoraged"
  // );
  // if (valueStoraged) {
  //   console.log("Storaged already defined");
  //   console.log(valueStoraged);
  // }

  // const server = (await process.env.BASE_URL) + "/";

  // let users = await $auth.$storage.getUniversal("user");

  // if (users) {
  //   alert("encontrou cookie users:\n" + JSON.stringify(users));
  // } else {
  //   alert("não encontrou cookie user");
  //   users = await $axios.get(server + "api/v1/users/me/");
  //   users = users.data;
  //   console.log("users requisitado:");
  //   console.log(users);
  // }

  // let loggedUser = null;
  // let usuarios = null;

  // if (users) {
  //   alert("token: \n" + $auth.$storage.getUniversal("_token.local"));

  //   usuarios = await fetch(server + "usuarios/" + users.id, {
  //     headers: {
  //       Authorization: $auth.$storage.getUniversal("_token.local"),
  //     },
  //   });
  //   loggedUser = await usuarios.json();
  //   loggedUser = await loggedUser.data;
  //   await $auth.$storage.setUniversal("actualUserStoraged", loggedUser);
  //   console.log("finalizar");
  //   return {
  //     loggedUser,
  //   };
  // }

  //andre

  // const server = process.env.BASE_URL + "/";
  // const usuarios = await fetch(server + "usuarios/" + ($auth.$storage.getUniversal("user")).id, {
  //   headers: {
  //     Authorization: $auth.$storage.getUniversal("_token.local"),
  //   },
  // });
  // const conv = await usuarios.json();
  // let loggedUser = conv.data;
  // $auth.$storage.setUniversal("actualUserStoraged", loggedUser);

  // return{
  //   loggedUser,
  // };

  // },
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