<template>
  <main class="Cadastro p-d-flex p-flex-row p-jc-center p-ai-center">
    <section
      class="
        logo_panel
        p-d-flex p-flex-column p-jc-center p-ai-center p-text-center
      "
    >
      <img src="../assets/media/sgae.png" />
      <h1>Sistema de Gestão de Ambiente de Ensino</h1>
      <p>&reg; Senai Roberto Mange</p>
      <div class="stars1"></div>
      <div class="stars2"></div>
      <div class="stars3"></div>
    </section>
    <section class="Cadastro_panel">
      <div class="formulario_cadastro">
        <h1 id="titulo">LOGIN</h1>
        <form action="" class="loginForm" v-on:submit.prevent="sendlogin()">
          <div class="inputcontainer">
            <div class="inputCombo">
              <label id="lblcpf" for="name">LOGIN</label>
              <input type="cpf" v-model="login.username" id="name" required />
            </div>
            <div class="inputCombo combo2">
              <label id="lblsenha" for="senha">SENHA</label>
              <!-- <Password id="senha" v-model="pass" toggleMask></Password> -->
              <input
                type="password"
                v-model="login.password"
                id="senha"
                required
              />
            </div>

            <div class="links p-d-flex p-d-row p-jc-between">
              
               <Button
                icon="pi pi-user-plus"
                label="Registrar?"
                class="registerBtn p-button-text p-button-danger"
                @click="registerPage()"
              />
              <Button
                icon="pi pi-key"
                label="Esqueceu Senha?"
                class="resetPswBtn p-button-text p-button-danger"
                @click="resetPage()"
              />
            </div>

            <button type="submit" class="btn_enviar">ENTRAR</button>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>


<script>
export default {
  layout: "login",
  data() {
    return {
      login: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    registerPage() {
      this.$router.push("registrar");      
    },
    resetPage() {
      this.$router.push("reset");
    },
    sendlogin() {
      console.log("tentando autenticar....");
      console.log(this.login);

      this.$auth
        .loginWith("local", { data: this.login })
        .then(() => {
          console.log("DEU CERTO O LOGIN");
        })
        .catch((erro) => {
          this.login.username = null;
          this.login.password = null;
          console.log("erro");
          console.log(erro);
        });
    },
  },
};
</script>
<style lang="scss">

.loginForm {
  width: 55%;
  height: auto;
}

.formulario_cadastro {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.inputcontainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#titulo {
  display: flex;
  align-items: center;
  width: 120px;
  padding-top: 10px;
  font-size: 36px;
  padding-bottom: 50px;
}

.Cadastro {
  height: auto;
  width: 100%;
}

.Cadastro_panel {
  height: 100vh;
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
}

.logo_panel {
  height: 100vh;
  width: 50%;
  background-color: #313131;
  color: white;
  overflow-y: hidden;
}

img {
  margin-top: 0px;
  align-items: center;
  display: flex;
  width: 65%;
  height: 45%;
  // min-width: 150px;
  // min-height: 150px;
}

.formulario_cadastro .btn_enviar {
  background-color: #dc3d3d;
  color: white;
  border: none;
  justify-content: center;
  align-self: center;
  text-align: center;
  align-items: center;
  display: flex;
  height: 50px;
  width: 600px;
  margin-top: 30px;
  cursor: pointer;

  &:hover {
    background-color: #e05e5e;
  }
}

.links {
  font-size: 14px;
  .registerBtn {
    width: 110px;
    padding: 0px;
    margin: 10px 0px 0px 5px;
  }
  .resetPswBtn {
    width: 165px;
    padding: 0px;
    margin: 10px 5px 0px 0px;
  }
  .p-button .p-button-icon-left {
    margin: 0px !important;
    width: 25px;
  }
}

.inputcontainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 100%;
  line-height: 44px;
}
.combo2 {
  margin-top: 60px;
}
#lblcpf #lblsenha {
  width: 100%;
  color: #d3d3d3;
}

#name,
#senha {
  width: 100%;
  padding: 10px;
  border: 0;
  border-bottom: 2px solid black;
  font-size: 20px;
}

#name:focus,
#name:valid {
  outline: 0;
  border-color: crimson;
}

#senha:focus,
#senha:valid {
  outline: 0;
  border-color: crimson;
}



html {
  height: 100vh;
  overflow: hidden;
  /* background: #240f54; */
  /* background: linear-gradient(180deg,#240f54,#240f54 5%,#440bc8); */
}


@media screen and (max-width: 990px) {
  .logo_panel {
    h1 {
      max-width:80%;
      font-size: 18px;
    }
    p {
      font-size: 11px;
    }
  }

  .loginForm {
    .links {
      .registerBtn {
        font-size: 12px;
        width: 90px;
      }
      .resetPswBtn {
        font-size: 12px;
        width: 125px;
      }
    }
  }
}

@media screen and (max-width: 806px) {
  .logo_panel {
    img {
      width: 65%;
      height: 40%;
    }
    h1 {
      font-size: 18px;
    }
  }

  .loginForm {
    .links {
      .registerBtn {
        font-size: 12px;
        width: 90px;
      }
      .resetPswBtn {
        font-size: 12px;
        width: 90px;
      }
    }
  }
}

@media screen and (max-width: 700px) {

  .logo_panel{
    h1 {
      max-width:80%;
      font-size: 16px;
    }
    p {
      font-size: 10px;
    }
  }
  .loginForm {
    width: 70%;
    height: auto;
  }
}

@media screen and (max-width: 510px) {
  img {
    display: none;
  }

  h5 {
    display: none;
  }

  .logo_panel {
    display: none;
    width: 0%;
  }

  .Cadastro_panel {
    width: 500px;
  }
}
</style>