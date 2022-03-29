<template>
  <div class="allUsers p-d-flex p-flex-column p-jc-center p-ai-center">
    <div class="containerUsers p-d-flex p-flex-column p-jc-top p-ai-center">
      <div class="titulo p-d-flex p-flex-row p-jc-start p-ai-center">
        <i class="pi pi-check-square" />
        <h1>Autorize os usuários!</h1>
      </div>

      <div class="formUsers">
        <div class="titulo1 p-d-flex p-flex-column p-jc-start p-ai-start">
          <div class="titulo1 p-d-flex p-flex-row p-jc-start p-ai-start">
            <h2 id="task">Usuários pendentes:</h2>
          </div>
          <h4 class="p-d-flex p-flex-row p-jc-start p-ai-start p-mt-3">
            <i class="pi pi-exclamation-circle p-mr-2 p-ml-2" />
            Verifique se os dados dos usuários estão coerentes antes da
            aprovação! &#128077;
          </h4>
        </div>

        <main class="element p-d-flex p-jc-start p-ai-start">
          <div
            class="subelement p-d-flex p-flex-column p-jc-center p-ai-center"
            v-if="activationUsers"
          >
            <!-- CARD USERS -->
            <div
              class="cardsUsers p-mt-4"
              v-for="(user, index) in activationUsers"
              :key="index"
            >
              <h3 class="p-ml-3 userId">&#127891; Usuário #{{ user.id }}</h3>
              <div
                class="
                  frameGeneralInfo
                  p-d-flex p-flex-column p-jc-center p-ai-start
                "
              >
                <div
                  class="
                    avatarImgUser
                    p-d-flex p-flex-row p-jc-center p-ai-center
                  "
                >
                  <Avatar
                    v-if="user.image"
                    :image="$store.state.BASE_URL_IMG + user.image"
                    size="large"
                    shape="circle"
                  />
                </div>

                <div class="containerDataUser infosUser">
                  <div
                    class="
                      leftDataUser
                      p-d-flex p-flex-column p-jc-center p-ai-center
                    "
                  >
                    <p class="p-m-2">
                      &#128100; <strong>Nome: </strong>{{ user.nome }}
                    </p>
                    <p class="p-m-2">
                      &#128240; <strong>Email: </strong>{{ user.email }}
                    </p>
                  </div>

                  <div
                    class="
                      rightDataUser
                      p-d-flex p-flex-column p-jc-center p-ai-center p-pl-2
                    "
                  >
                    <p class="p-m-2">
                      &#128231; <strong>Cargo: </strong
                      >{{ user.idNivelAcessoFK.nome }}
                    </p>
                    <p class="p-m-2">
                      &#128222; <strong>Tel.: </strong>{{ user.fone }}
                    </p>
                  </div>
                </div>

                <div
                  class="
                    containerDataUser
                    p-d-flex p-flex-row p-jc-evenly p-ai-center
                  "
                >
                  <Button
                    class="btn-send"
                    label="Aprovar"
                    @click="approveUser(user)"
                  />

                  <Button
                    class="btn-clean"
                    label="Declinar"
                    @click="reproveUser(user)"
                  />
                </div>
              </div>
              <div class="divisor"></div>
              <!--  END CARD USERS -->
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import AsyncUserStoraged from "@/assets/scripts/asyncUserStoraged";

export default {
  extends: AsyncUserStoraged,
  name: "usuarios",
  layout: "standard",
  middleware: "auth",
  data() {
    return {
      activationUsers: null,
    };
  },
  methods: {
    getActivationUsers: async function () {
      this.$axios
        .$get(this.$store.state.BASE_URL + "usuarios/?token")
        .then((response) => {
          console.log(response);

          //request ok
          if (response.data !== null && response.data !== undefined) {
            this.activationUsers = structuredClone(response.data);

            console.log("finalizado get activation users");
            console.log(this.activationUsers);
          }
        })
        .catch((response) => {
          alert("Problema ao tentar pegar status da tarefa " + task);
          console.log(response);
        });
    },
    approveUser: function (user) {
      if (user) this.modifyUser(user.id, true);
    },
    reproveUser: function (user) {
      if (user) this.modifyUser(user.id, false);
    },
    modifyUser: function (userId, status) {
      const body = {
        id: this.actualUser.id,
        status: status,
      };
      if (userId > 0) {
        this.$axios
          .$put(
            this.$store.state.BASE_URL +
              ("usuarios/" + userId + "/?activation"),
            JSON.stringify(body),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log("response modify");
            console.log(response);
            //request ok
            if (response !== null) {
              //remove user of array

              switch (response.msg) {
                case "approved":
                  this.activationUsers.map((user, index) => {
                    if (user.id === userId)
                      this.activationUsers.splice(index, 1);
                    console.log("excluindo index" + index);
                  });

                  alert("Usuário aprovado com sucesso!");

                  break;
                case "already approved":
                  alert("Erro: Usuário não precisa de aprovação!");
                  break;
                case "error":
                  alert("Erro na aprovação!");
                  break;
                case "disapproved":
                  alert("Usuário reprovado com sucesso!");
                  break;
                case "no permission":
                  alert("Você não tem permissão para esta ação!");
                  break;
              }
            }
          })
          .catch((response) => {
            alert("Problema ao tentar aprovar");
            console.log(response);
          });
      }
    },
  },
  created() {
    if (this.actualUser === null || this.actualUser === undefined)
      this.$router.push("/lobby");
    else this.getActivationUsers();
  },
  mounted(){
    if (this.actualUser !== null && this.actualUser !== undefined)
      if(this.actualUser.idNivelAcessoFK.nivelAcesso < 15)
        this.$router.push("/initial");

  }
};
</script>


<style lang="scss" scoped>
/* viewMode === overview */
.allUsers {
  * {
    overflow-x: visible;
  }

  height: auto;
  min-height: calc(100vh - var(--height-default-header));
  width: 100vw;
  max-width: 100vw;
  padding: 70px 90px;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("@/static/postit.jpg");

  $size-title: 15px;
  $size-topic: 15px;
  $size-container: 70vw;
  $red-back: rgba(194, 42, 31, 1);
  $white-back: rgba(255, 255, 255, 1);
  $red-strong: #99180f;

  .titulo,
  .titulo1 {
    font-size: $size-title;
  }

  .containerUsers {
    width: $size-container;
    background-color: $white-back;
    border-radius: 15px;

    .titulo {
      width: 100%;
      height: 80px;
      font-weight: bold;
      background-color: $red-back;
      padding-left: 40px;
      color: #fff;
      border-radius: 15px 15px 0px 0px;
      background: linear-gradient(-15deg, #313131, #525d69, #c22a1f, #bd244a);
      background-size: 300% 300%;
      animation: gradientPosition 7s ease infinite;

      i {
        font-size: 25px;
        width: auto;
        height: auto;
        margin-right: 10px;
      }
    }

    .formUsers {
      background-color: $white-back;
      width: 100%;
      height: auto;
      padding: 20px 15px;
      border-radius: 0px 0px 15px 15px;

      .titulo1 {
        #task {
          color: $red-strong;
        }
        h2,
        i {
          width: auto;
        }
        i {
          font-size: 18px;
        }
      }

      .element {
        height: auto;
        width: 100%;
        padding: 20px 0;

        .frameGeneralInfo {
          width: 100%;
          max-width: 100%;
          border: 2px solid $red-strong;
          height: auto;
          border-radius: 7px;
          padding: 10px;
          box-shadow: rgb(0 0 0 / 10%) 0px 3px 6px, rgb(0 0 0 / 17%) 0px 3px 6px;

          .p-avatar-lg {
            width: 4.2rem;
            height: 3.8rem;
          }
          .containerDataUser {
            width: 100%;
            height: auto;
            /* background-color: red; */
            margin-top: 10px;
            .leftDataUser {
              width: 50%;
              /* background-color: blue; */
              border-right: 2px solid $red-strong;
            }
            .rightDataUser {
              width: 50%;
              /* background-color: yellow; */
            }

            .btn-send,
            .btn-clean {
              width: 20%;
              border-radius: 8px;
              padding: 10px;
              font-size: 1.2rem;
              font-weight: bold;
              margin: 12px 0;
              transition: all 0.3s;

              &:hover {
                transform: scale(1.03);
                cursor: pointer;
                transition: all 0.3s;
              }
            }

            .btn-send {
              background-color: rgba(194, 42, 31, 1);
              border: none;
              color: #fff;
            }

            .btn-clean {
              background-color: rgba(255, 255, 255, 1);
              border: 2px solid #c22a1f;
              color: #c22a1f;
            }
          }

          .infosUser {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
    .divisor {
      margin-top: 30px;
      background-color: red;
      width: 96%;
      height: 2px;
      z-index: 100;
    }
  }
}

@keyframes gradientPosition {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@media screen and (max-width: 945px) {
  $size-title: 13px;
  $size-topic: 16px;
  $size-container: 80vw !important;

  .titulo,
  .titulo1 {
    font-size: $size-title !important;
  }

  .userId {
    font-size: $size-topic !important;
  }

  .containerUsers {
    width: $size-container;
  }

  .frameGeneralInfo {
    font-size: $size-title !important;
  }
}

@media screen and (max-width: 720px) {
  $size-container: 100vw !important;

  .allUsers {
    padding: 0px !important;
  }

  .containerUsers {
    width: $size-container;
    border-radius: 0px !important;
  }

  .titulo {
    border-radius: 0px !important;
  }
}

@media screen and (max-width: 630px) {
  .allUsers {
    background: white;
  }

  .frameGeneralInfo {
    font-size: 15px !important;
  }

  .infosUser {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    justify-content: flex-start !important;

    .leftDataUser,
    .rightDataUser {
      width: 100% !important;
      border-right: none !important;
      margin-left: 0 !important;
      padding-left: 0 !important;
    }
  }

  .btn-send,
  .btn-clean {
    width: 35% !important;
    border-radius: 8px !important;
    padding: 7px !important;
    font-size: 1rem !important;
  }
}

@media screen and (max-width: 315px) {
  .titulo {
    height: 40px !important;
  }
  .titulo,
  .titulo1 {
    font-size: 10px !important;
    i {
      font-size: 17px !important;
    }
  }

  .titulo {
    padding-left: 20px !important;
  }

  .frameGeneralInfo {
    font-size: 12px !important;
  }
  .btn-send,
  .btn-clean {
    width: 45% !important;
    font-size: 0.8rem !important;
  }
}
</style>
