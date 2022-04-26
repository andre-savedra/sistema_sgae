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
              <label class="lblRegister" for="photo">FOTO</label>
              <FileUpload
                :auto="true"
                :chooseLabel="btnUploadLabel"
                mode="basic"
                accept="image/jpeg,image/png"
                :maxFileSize="10000000"
                @upload="postPhoto"
                @before-upload="
                  () => {
                    btnUploadLabel = 'Carregando...';
                  }
                "
                class="customAvatarUpload"
                id="avatarUpload"
                invalidFileTypeMessage="Formato da imagem inválido, formato deve ser JPG ou PNG!!!"
                invalidFileSizeMessage="Tamanho da imagem excedido, limite é 10MB!"
              />
            </div>

            <div class="linksRegister p-d-flex p-jc-between">
              <Button
                icon="pi pi-arrow-left"
                label="Voltar"
                class="backBtn p-button-text p-button-danger"
                @click="backPage()"
              />
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
import AwsS3Users from "@/assets/scripts/awsS3Users.js";
import imageCompression from "browser-image-compression";

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
      S3Client: null,
    };
  },
  methods: {
    backPage() {
      this.$router.push("/");
    },
    resetPage() {
      this.$router.push("reset");
    },
    savePhotoAWS: async function (photoName) {
      //aws S3: SAVE PHOTO
      this.S3Client.uploadFile(this.userPhoto[0], photoName)
        .then((awsResponse) => {
          console.log(awsResponse);
          // this.postUsuario(awsResponse.location);
        })
        .catch((err) => {
          console.error(err);
          this.btnUploadLabel = this.btnInitialLabel;
          this.userPhoto = null;
          this.btnDisabled = false;
        });
    },

    sendRegister: async function () {
      // savePhotoAWS();
    },

    postPhoto: async function (photo) {
      console.log("fotoo");
      console.log(photo.files[0]);

      console.log("originalFile instanceof Blob", photo.files[0] instanceof Blob); // true
      console.log(`originalFile size ${photo.files[0].size / 1024 / 1024} MB`);

      const options = {
        maxSizeMB: 4,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(photo.files[0], options);
        console.log(
          "compressedFile instanceof Blob",
          compressedFile instanceof Blob
        ); // true
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        ); // smaller than maxSizeMB

        // await uploadToServer(compressedFile); // write your own logic
      } catch (error) {
        console.log(error);
      }

      // converter({
      //   file: photo.files[0],
      //   width: 300,
      //   height: 350,
      //   type: "jpeg",
      // })
      //   .then((resp) => {
      //     console.log("resized:")
      //     console.log(resp);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
  },
  created() {
    // this.$auth.$storage.removeUniversal("actualUserStoraged");

    this.S3Client = AwsS3Users.awsManager();
    // console.log(this.S3Client);
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