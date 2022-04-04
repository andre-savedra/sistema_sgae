<template>
  <main class="Registro p-d-flex p-flex-row p-jc-center p-ai-center">
    <section
      class="
        logo_register_panel
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
      <div class="stars1"></div>
      <div class="stars2"></div>
      <div class="stars3"></div>

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
              <label class="lblRegister" for="nameR">USUÁRIO</label>
              <InputText
                type="number"
                v-model="userAuth.username"
                id="nameR"
                class="basicInputRegisterR"
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
                id="fullnameR"
                class="basicInputRegisterR"
                placeholder="Nome Completo"
                required
              />
            </div>
            <div class="inputComboRegister">
              <label class="lblRegister" for="mail">EMAIL</label>
              <InputText
                type="email"
                v-model="userAuth.email"
                id="mailR"
                class="basicInputRegisterR"
                placeholder="Email"
                required
              />
            </div>
            <div class="inputComboRegister field col-12 md:col-4">
              <label class="lblRegister" for="phone">CELULAR</label>
              <InputMask
                mask="(99) 99999-9999"
                v-model="phoneFormated"
                id="phoneR"
                class="basicInputRegisterR"
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
              <label class="lblRegister" for="photo">FOTO</label>
              <FileUpload
                :auto="true"
                :chooseLabel="btnUploadLabel"
                mode="basic"
                accept="image/jpeg,image/png"
                :maxFileSize="10000000"
                @upload="postPhoto"
                class="customAvatarUpload"
                id="avatarUpload"
                invalidFileTypeMessage="Formato da imagem inválido, formato deve ser JPG ou PNG!!!"
                invalidFileSizeMessage="Tamanho da imagem excedido, limite é 10MB!"
              />
            </div>

            <div class="inputComboRegister compPasswordRegister">
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
            <div class="inputComboRegister compPasswordRegister">
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
              <!-- <Button
                icon="pi pi-key"
                label="Esqueceu Senha?"
                class="resetPswBtnRegister p-button-text p-button-danger"
                @click="resetPage()"
              /> -->
            </div>

            <button type="submit" class="btn_enviar" :disabled="btnDisabled">
              CADASTRAR
            </button>
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
      btnInitialLabel: "Sua foto aqui",
      btnUploadLabel: "Sua foto aqui",
      btnDisabled: false,
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
      userPhoto: null,
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
      this.userAuth.username = this.userAuth.username.toString();

      await this.$axios
        .$post(
          this.$store.state.BASE_URL + "api/v1/users/",
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
            this.btnUploadLabel = this.btnInitialLabel;
            this.userPhoto = null;
            this.btnDisabled = false;
          }
        })
        .catch((error) => {
          console.log(error.response);

          let errorMessage = "";
          if (error.response) {
            let notEmpty = false;

            if (error.response.data.password) {
              error.response.data.password.map((msg) => {
                errorMessage += "\n" + msg;
              });
              notEmpty = true;
            } 
            if (error.response.data.email) {
              error.response.data.email.map((msg) => {
                errorMessage += "\n" + msg;
              });
              notEmpty = true;
            }

            if(!notEmpty) {
              errorMessage = "Erro: " + error.response.status;
              errorMessage += "\n" + error.response.statusText;
            }
          }

          alert(errorMessage);
          this.btnDisabled = false;
          this.btnUploadLabel = this.btnInitialLabel;
          this.userPhoto = null;
        });
    },
    postUsuario: async function () {
      if (this.userPhoto !== undefined && this.userPhoto !== null) {
        let formData = new FormData();
        formData.append("nome", this.userSec[0].nome);
        formData.append("idUserFK", this.userSec[0].idUserFK);
        formData.append("email", this.userSec[0].email);
        formData.append("fone", this.userSec[0].fone);
        formData.append("ativo", false);
        formData.append("idNivelAcessoFK", this.userSec[0].idNivelAcessoFK);
        formData.append("image", this.userPhoto[0]);

        this.$axios
          .$post(this.$store.state.BASE_URL + "cadastroUsuario/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response);
            if (response.msg !== undefined) {
              alert(response.msg);
            }
            this.btnDisabled = false;
            this.btnUploadLabel = this.btnInitialLabel;
            this.userPhoto = null;
            this.$router.push("/");
          })
          .catch((response) => {
            alert("Problema ao tentar registrar usuário");
            this.btnDisabled = false;
            this.btnUploadLabel = this.btnInitialLabel;
            this.userPhoto = null;
            console.log(response);
          });
      } else {
        await this.$axios
          .$post(
            this.$store.state.BASE_URL + "cadastroUsuario/",
            JSON.stringify(this.userSec),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            this.btnDisabled = false;
            this.$router.push("/");
          })
          .catch((response) => {
            alert("Problema ao tentar registrar usuário");
            this.btnDisabled = false;
            console.log(response);
          });
      }
    },
    // postUsuario: async function () {
    //   await this.$axios
    //     .$post(
    //       this.$store.state.BASE_URL + "usuarios/",
    //       JSON.stringify(this.userSec),
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       this.btnDisabled = false;
    //       this.$router.push("/");
    //     })
    //     .catch((response) => {
    //       alert("Problema ao tentar registrar usuário");
    //       this.btnDisabled = false;
    //       console.log(response);
    //     });
    // },
    postPhoto: async function (event) {
      console.log("postPhoto");
      console.log(event);
      this.userPhoto = event.files;
      console.log("userPhoto:");
      console.log(this.userPhoto);

      if (this.userPhoto[0].name) this.btnUploadLabel = this.userPhoto[0].name;
    },
    sendRegister: async function () {
      console.log("tentando registrar....");
      console.log(this.userAuth);

      //User register:
      if (this.userAuth.password === this.passwordConfirm) {
        this.btnDisabled = true;
        this.postUser();
      } else {
        alert("Campos Senha e Confirmação de Senha não estão iguais");
        this.btnDisabled = false;
      }
    },
    getJobs: async function () {
      //first, clear array
      this.jobs.length = 0;

      await this.$axios
        .get(this.$store.state.BASE_URL + "cargos")
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
    this.$auth.$storage.removeUniversal("actualUserStoraged");
    this.getJobs();
  },
};
</script>

<style lang="scss" scoped>
.logo_register_panel {
  height: 100vh;
  width: 50%;
  background-color: #313131;
  color: white;
  overflow-y: hidden;
}

.Registro_panel {
  .stars1,
  .stars2,
  .stars3 {
    display: none;
  }

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
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.9);
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
  &:disabled {
    background-color: #d38f8f;
  }
}

.linksRegister {
  font-size: 14px;
  .backBtn {
    width: 100px;
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
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

#nameR,
#mailR,
#phoneR,
#fullnameR,
.basicInputRegisterR {
  width: 100%;
  border: 0;
  border-bottom: 2px solid black;
  font-size: 18px;
  box-shadow: none;
  /* border-color: none; savedra*/
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

html {
  height: 100vh;
  overflow: hidden;
}

@media screen and (max-width: 990px) {
  .logo_register_panel {
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
  .logo_register_panel {
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
  .logo_register_panel {
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

@media screen and (max-width: 760px) {
  img {
    display: none;
  }

  h5 {
    display: none;
  }

  .logo_register_panel {
    display: none;
    width: 0%;
  }

  .Registro_panel {
    width: 100%;
    overflow-y: hidden;
  }
}

@media screen and (max-width: 440px) {
  .registerForm {
    width: 100%;
  }
}
</style>