<template>
  <main class="Registro p-d-flex p-flex-row p-jc-center p-ai-center">
    <section
      class="
        logo_panel
        p-d-flex p-flex-column p-jc-center p-ai-center p-text-center
      "
    >
      <img src="@/assets/media/sgae.png" />
      <h1>Sistema de Gestão de Ambiente de Ensino</h1>
      <p>&reg; Senai Roberto Mange</p>
      <div class="stars1"></div>
      <div class="stars2"></div>
      <div class="stars3"></div>
    </section>
    <section
      class="Registro_panel p-d-flex p-flex-column p-jc-center p-ai-center"
    >
      <div
        class="
          formulario_registro
          p-d-flex p-flex-column p-jc-center p-ai-center
        "
      >
        <h1 id="myTitle">CADASTRE-SE</h1>
        <form
          action=""
          class="registerForm"
          v-on:submit.prevent="sendRegister()"
        >
          <div class="inputRegisterContainer">
            <div class="inputComboRegister">
              <label class="lblRegister" for="name">USUÁRIO</label>
              <InputText
                type="number"
                v-model="userAuth.username"
                id="name"
                class="basicInputRegister"
                placeholder="NIF ou Matrícula"
                minlength="6"
                required
              />
            </div>
            <div class="inputComboRegister">
              <label class="lblRegister" for="fullname">NOME</label>
              <InputText
                type="text"
                v-model="userSec[0].nome"
                id="fullname"
                class="basicInputRegister"
                placeholder="Nome Completo"
                required
              />
            </div>
            <div class="inputComboRegister">
              <label class="lblRegister" for="mail">EMAIL</label>
              <InputText
                type="email"
                v-model="userAuth.email"
                id="mail"
                class="basicInputRegister"
                placeholder="Email"
                required
              />
            </div>
            <div class="inputComboRegister field col-12 md:col-4">
              <label class="lblRegister" for="phone">CELULAR</label>
              <InputMask
                mask="(99) 99999-9999"
                v-model="phoneFormated"
                id="phone"
                class="basicInputRegister"
                placeholder="(99) 9.9999-9999"
                required
              />
            </div>

            <div class="inputComboRegister dropdownRegister">
              <label class="lblRegister" for="cargo">CARGO</label>

              <Dropdown
                v-model="jobSelected"
                :options="jobs"
                optionLabel="name"
                placeholder="Selecione o cargo"
                id="cargo"
              >
              </Dropdown>
            </div>

            <div class="inputComboRegister">
              <label class="lblRegister" for="senhaRegister">SENHA</label>
              <Password
                v-model="userAuth.password"
                id="senhaRegister"
                class="passInputRegister"
                required
                toggleMask
                placeholder="Senha"
              ></Password>
            </div>
            <div class="inputComboRegister">
              <label class="lblRegister" for="senhaRegister2"
                >CONFIRME A SENHA</label
              >
              <Password
                v-model="passwordConfirm"
                id="senhaRegister2"
                class="passInputRegister"
                required
                toggleMask
                placeholder="Confirme a Senha"
              ></Password>
            </div>

            <div class="linksRegister p-d-flex p-jc-between">
              <Button
                icon="pi pi-arrow-left"
                label="Voltar"
                class="backBtn p-button-text p-button-danger"
                @click="backPage()"
              />
              <Button
                icon="pi pi-key"
                label="Esqueceu Senha?"
                class="resetPswBtnRegister p-button-text p-button-danger"
                @click="resetPage()"
              />
            </div>

            <button type="submit" class="btn_enviar">CADASTRAR</button>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>


<script>
export default {
  layout: "login",
  name: "register",
  data() {
    return {
      btnDisabled: true,
      passwordConfirm: null,
      phoneFormated: null,
      userAuth: {
        username: null,
        password: null,
        email: null,
      },
      userSec: [
        {
          nome: null,
          idUserFK: null,
          email: null,
          fone: null,
          ativo: false,
          idNivelAcessoFK: null,
        },
      ],
      jobSelected: null,
      jobs: [],
    };
  },
  methods: {
    backPage() {
      this.$router.push("/");
    },
    resetPage() {
      this.$router.push("reset");
    },
    postUser: async function () {
      await this.$axios
        .$post(
          "http://localhost:8003/api/v1/users/",
          JSON.stringify(this.userAuth),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.email === this.userAuth.email) {
            this.userSec[0].email = this.userAuth.email;
            this.userSec[0].idNivelAcessoFK = this.jobSelected.id;
            this.userSec[0].idUserFK = response.id;
            this.userSec[0].fone = this.phoneFormated
              .replaceAll("(", "")
              .replaceAll(")", "")
              .replaceAll(" ", "")
              .replaceAll("-", "");
            console.log(response);
            this.postUsuario();
          } else {
            console.log("Error:");
          }
        })
        .catch((response) => {
          alert("Problema ao tentar registrar usuário");
          console.log(response);
        });
    },
    postUsuario: async function () {
      await this.$axios
        .$post(
          "http://localhost:8003/usuarios/",
          JSON.stringify(this.userSec),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          this.$router.push("/");
        })
        .catch((response) => {
          alert("Problema ao tentar registrar usuário");
          console.log(response);
        });
    },
    sendRegister: async function () {
      console.log("tentando registrar....");
      console.log(this.userAuth);

      //User register:
      if (this.userAuth.password === this.passwordConfirm) {
        this.postUser();
      } else {
        alert("Campos Senha e Confirmação de Senha não estão iguais");
      }
    },
    getJobs: async function () {
      //first, clear array
      this.jobs.length = 0;

      await this.$axios
        .get("http://localhost:8003/cargos")
        .then((dataResponse) => {
          dataResponse.data.data.forEach((element) => {
            this.jobs.push({
              name: element.nome,
              id: element.id,
              level: element.nivelAcesso,
            });
          });
        });
    },
  },
  created() {
    this.getJobs();
  },
};
</script>
<style lang="scss">
.logo_panel {
  height: 100vh;
  width: 50%;
  background-color: #313131;
  color: white;
}

.Registro_panel {
  height: auto;
  min-height: 100vh;
  max-height: 100vh;
  width: 50%;
  box-sizing: border-box;
  display: flex;
  padding: 30px 0px 20px 0px;
}

.formulario_registro {
  overflow-y: auto;
  box-sizing: border-box;
  width: 100%;
  height: auto;
}

.registerForm {
  width: 65%;
  height: auto;
  padding: 20px;
  margin-bottom: 20px;
  border: 2px solid #dc3d3d;
  border-radius: 3px;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.9);
    border-radius: 10px;
    background-color: #cccccc;
  }
  &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #d62929;
    background-image: -webkit-linear-gradient(
      90deg,
      transparent,
      rgba(0, 0, 0, 0.4) 50%,
      transparent,
      transparent
    );
  }
}

#myTitle {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: auto;
  margin-bottom: 20px;
  font-size: 28px;
  overflow-y: hidden;
  /* padding-bottom: 50px; */
}

.inputRegisterContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.Registro {
  height: auto;
  width: 100%;
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

.formulario_registro .btn_enviar {
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
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #e05e5e;
  }
}

.linksRegister {
  font-size: 14px;
  .backBtn {
    width: 80px;
    padding: 0px;
    margin: 10px 0px 0px 5px;
  }
  .resetPswBtnRegister {
    width: 165px;
    padding: 0px;
    margin: 10px 5px 0px 0px;
  }
  .p-button .p-button-icon-left {
    margin: 0px !important;
    width: 25px;
  }
}

.inputRegisterContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 100%;
  line-height: 34px;
}

.lblRegister #lblsenhaRegister {
  width: 100%;
  color: #d3d3d3;
}

.p-input-icon-right i {
  width: 15px;
  display: flex; //!important
  align-items: flex-end; //!important
  justify-content: flex-end; //!important
}

#name,
#mail,
#phone,
#fullname,
.basicInputRegister {
  width: 100%;
  border: 0;
  border-bottom: 2px solid black;
  font-size: 18px;
  box-shadow: none;
  border-color: none;

  &:focus,
  &:valid,
  &:hover {
    outline: 0;
    background-color: white;
    border-color: crimson;
    box-shadow: none;
    border-color: none;
  }
}

.dropdownRegister {
  width: 100%;
  overflow-x: visible;

  #cargo {
    overflow-x: visible;
    box-shadow: none;
    border-color: none;
    border: 0;
    border-bottom: 1px solid black;
    font-size: 18px;

    &:hover {
      border-color: #c22a1f !important;
    }
    .p-dropdown-panel {
      border: 1px solid #c22a1f;
      li {
        padding: 3px 10px;
        &:hover {
          background-color: #f59993 !important;
        }
      }
    }
  }
}

#senhaRegister,
#senhaRegister2,
.inputComboRegister .passInputRegister {
  width: 100%;
  border: 0;
  border-bottom: 1px solid black;
  font-size: 18px;
  overflow: hidden;
  overflow-y: hidden;
  &:focus,
  &:valid {
    outline: 0;
    border-color: crimson;
    overflow: hidden;
  }
}

@function box-shadow-stars($n) {
  $star-shadows: "#{random(4000)-2000}px #{random(4000)-2000}px #fff";
  @for $i from 2 through $n {
    $star-color-num: random(3);
    $star-color: #fff;
    @if ($star-color-num == 1) {
      $star-color: "#fff";
    }
    @if ($star-color-num == 2) {
      $star-color: "#FF6666";
    }
    @if ($star-color-num == 3) {
      $star-color: "#79bfea";
    }
    $star-shadows: "#{$star-shadows}, #{random(4000)-2000}px #{random(4000)-2000}px #{$star-color}";
  }
  @return unquote($star-shadows);
}
$stars1-shadows: box-shadow-stars(10000);
$stars2-shadows: box-shadow-stars(1000);
$stars3-shadows: box-shadow-stars(500);

html {
  height: 100vh;
  overflow: hidden;
  /* background: #240f54; */
  /* background: linear-gradient(180deg,#240f54,#240f54 5%,#440bc8); */
}
.stars1 {
  width: 1px;
  height: 1px;
  box-shadow: $stars1-shadows;
  border-radius: 50%;
  animation: rotateEarth 200s linear infinite;
  opacity: 0.9;
}
.stars2 {
  width: 2px;
  height: 2px;
  box-shadow: $stars2-shadows;
  border-radius: 50%;
  animation: rotateEarth 190s linear infinite;
  opacity: 0.9;
}
.stars3 {
  width: 3px;
  height: 3px;
  box-shadow: $stars3-shadows;
  border-radius: 50%;
  animation: rotateEarth 180s linear infinite;
  opacity: 0.9;
}
@keyframes rotateEarth {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(2000px);
  }
}

@media screen and (max-width: 990px) {
  .logo_panel {
    h1 {
      max-width: 80%;
      font-size: 18px;
    }
    p {
      font-size: 11px;
    }
  }

  .registerForm {
    width: 75%;
    .linksRegister {
      .backBtn {
        font-size: 12px;
      }
      .resetPswBtnRegister {
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

  .registerForm {
    width: 82%;
    .linksRegister {
      .backBtn {
        font-size: 12px;
      }
      .resetPswBtnRegister {
        font-size: 12px;
        width: 90px;
      }
    }
  }
}

@media screen and (max-width: 700px) {
  .logo_panel {
    h1 {
      max-width: 80%;
      font-size: 16px;
    }
    p {
      font-size: 10px;
    }
  }
  .registerForm {
    height: auto;
  }
}

@media screen and (max-width: 600px) {
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

  .Registro_panel {
    width: 500px;
  }
}
</style>