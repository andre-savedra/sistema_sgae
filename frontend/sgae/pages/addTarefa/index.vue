<template>
  <div class="all p-d-flex p-flex-column p-jc-center p-ai-center">
    <div class="container p-d-flex p-flex-column p-jc-top p-ai-center">
      <div class="titulo p-d-flex p-flex-row p-jc-start p-ai-center">
        <i class="pi pi-check-square" />
        <h1>Crie sua Tarefa!</h1>
      </div>

      <div class="form">
        <div class="titulo1">
          <h2>TAREFA:</h2>
        </div>
        <main class="element p-d-flex p-jc-start p-ai-start">
          <div class="subelement p-d-flex p-flex-column p-jc-start p-ai-start">
            <div
              class="inputElement p-d-flex p-flex-column p-jc-start p-ai-start"
            >
              <label class="lblBasic" for="name">Título</label>
              <InputText
                type="text"
                id="name"
                class="basicInputText"
                placeholder="Preencha..."
                required
              />
            </div>
            <div
              class="inputElement p-d-flex p-flex-column p-jc-start p-ai-start"
            >
              <label class="lblBasic" for="description">Descrição</label>
              <textarea
                class="textInput"
                type="text"
                placeholder="Insira aqui a descrição da sua tarefa..."
                id="description"
              ></textarea>
            </div>
            <div
              class="inputElement p-d-flex p-flex-column p-jc-start p-ai-start"
            >
              <label class="lblBasic" for="requester">Solicitante</label>
              <InputText
                type="text"
                id="requester"
                class="basicInputText"
                :disabled="true"
                placeholder="Preencha..."
                required
              />
            </div>
            <div
              class="
                customAutocomplete
                inputElement
                p-d-flex p-flex-column p-jc-start p-ai-start
              "
            >
              <label class="lblBasic" for="employee">Responsáveis</label>
              <AutoComplete
                :multiple="true"
                v-model="selectedEmployees"
                :suggestions="filteredEmployees"
                @complete="searchEmployee($event)"
                field="name"
                v-if="allUsers"
                id="employee"
                placeholder="Preencha..."
              />
            </div>
            <div
              class="
                customAutocomplete
                inputElement
                p-d-flex p-flex-column p-jc-start p-ai-start
              "
            >
              <label class="lblBasic" for="enviroment"
                >Ambiente de Ensino</label
              >
              <AutoComplete
                :multiple="false"
                v-model="selectedEnviroment"
                :suggestions="filteredEnviroments"
                @complete="searchEnviroment($event)"
                field="name"
                v-if="allEnviroments"
                id="enviroment"
                placeholder="Preencha..."
              />
            </div>
            <div
              class="inputElement p-d-flex p-flex-column p-jc-start p-ai-start"
            >
              <label class="lblBasic" for="deadline">Prazo</label>
              <Calendar
                class="customDatePicker"
                id="deadline"
                :showIcon="true"
                :locale="pt"
                v-model="deadline"
              />
            </div>
            <div
              class="inputElement p-d-flex p-flex-column p-jc-start p-ai-start"
            >
              <label class="lblBasic" for="imageUpload">Fotos Upload</label>

              <FileUpload                
                :multiple="true"
                accept="image/*"
                :maxFileSize="1000000"
                @upload="onUpload"
                class="customFileUpload"
                id="imageUpload"
                chooseLabel="Adicionar fotos"
                uploadLabel="Carregar fotos"
                cancelLabel="Cancelar"                
                @uploader="myUploader"                
              >
                <template #empty>
                  <p>Arraste as imagens desejadas.</p>
                </template>
              </FileUpload>
            </div>
          </div>
        </main>

        <div class="divisor"></div>
      </div>
    </div>
    <div class="buttons p-d-flex p-flex-row p-jc-evenly p-ai-center">
      <Button class="btn-send" label="Enviar" @click="sendForm()" />
      <Button class="btn-clean" label="Limpar" @click="cleanForm()" />
    </div>
  </div>
</template>

<script>
export default {
  name: "addTarefa",
  layout: "default",
  data() {
    return {
      teste: null,
      selectedEmployees: [],
      filteredEmployees: null,
      allUsers: [],
      selectedEnviroment: null,
      filteredEnviroments: null,
      allEnviroments: [],
      pt: {
        firstDayOfWeek: 0,
        dayNames: [
          "Domingo",
          "Segunda",
          "Terça",
          "Quarta",
          "Quinta",
          "Sexta",
          "Sábado",
        ],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        dayNamesMin: ["Do", "Seg", "Te", "Qua", "Qui", "Sex", "Sa"],
        monthNames: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ],
        monthNamesShort: [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez",
        ],
        today: "Hoje",
        clear: "Limpar",
        dateFormat: "mm/dd/yy",
        weekHeader: "Semana",
      },
      deadline: null,
    };
  },
  methods: {
    cleanForm(){
      console.log("this.teste");
      console.log(this.teste);
    },
    sendPost: async function (body) {},
    sendForm: async function () {},
    getUsers: async function () {
      this.allUsers.length = 0;

      await this.$axios
        .$get("http://localhost:8003/usuarios")
        .then((dataResponse) => {
          dataResponse.forEach((user) => {
            this.allUsers.push({
              name: user.nome,
              id: user.id,
            });
          });
        })
        .catch((response) => {
          console.log("problema ao pegar usuarios");
          console.log(response);
        });
    },
    getEnviroments: async function () {
      this.allUsers.length = 0;

      await this.$axios
        .$get("http://localhost:8003/ambientes")
        .then((dataResponse) => {
          dataResponse.forEach((enviroment) => {
            this.allEnviroments.push({
              name: enviroment.nome,
            });
          });
        })
        .catch((response) => {
          console.log("problema ao pegar ambientes");
          console.log(response);
        });
    },
    searchEmployee(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.filteredEmployees = [...this.allUsers];
        } else {
          this.filteredEmployees = this.allUsers.filter((user) => {
            return user.name
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          });
        }
      }, 250);
    },
    searchEnviroment(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.filteredEnviroments = [...this.allEnviroments];
        } else {
          this.filteredEnviroments = this.allEnviroments.filter(
            (enviroment) => {
              return enviroment.name
                .toLowerCase()
                .startsWith(event.query.toLowerCase());
            }
          );
        }
      }, 250);
    },
    onUpload: async function (event) {
      // console.log(event);
      const files = event.files;
      console.log(files);
      
    },
    myUploader: async function (event) {
      console.log("my custom uploader...");
      console.log(event);
    },
  },
  mounted() {
    this.getUsers();
    this.getEnviroments();
  },
};
</script>

<style lang="scss" scoped>
.all {
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
  $size-container: 80vw;
  $red-back: rgba(194, 42, 31, 1);
  $white-back: rgba(255, 255, 255, 1);

  .titulo,
  .titulo1 {
    font-size: $size-title;
  }

  .container {
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

      i {
        font-size: 25px;
        width: auto;
        height: auto;
        margin-right: 10px;
      }
    }

    .form {
      background-color: $white-back;
      width: 100%;
      height: auto;
      padding: 20px;
      border-radius: 0px 0px 15px 15px;

      .element {
        height: auto;
        width: 100%;
        padding: 20px 0;

        .basicInputText {
          outline: 0;
          box-shadow: none;
          border-color: none;
          border: none;
          border-bottom: 2px solid black;
          border-radius: 0;
        }

        .lblBasic {
          margin: 15px 0px;
        }

        #name,
        #requester {
          width: 80%;
          margin-left: 15px;
        }

        #description {
          width: 95%;
          margin-left: 15px;
          height: 120px;
          border-radius: 15px;
          border: 2px solid black;
          padding: 10px;
          outline: none;
          word-break: break-all;
          resize: none;
        }

        .customAutocomplete {
          .lblBasic {
            /* margin: 15px 0px; */
            margin: 28px 0px 15px 0px;
          }
          .p-autocomplete-multiple,
          .p-autocomplete {
            width: 80%;
            margin-left: 15px;
          }
        }

        .inputElement {
          .lblBasic {
            margin: 18px 0px;
          }
          .customDatePicker {
            width: 30%;
            margin-left: 15px;
          }

          .customFileUpload {
            width: 95%;
            margin-left: 15px;
            border: 2px solid black;
            border-radius: 15px;
            padding: 10px;

            .p-fileupload-buttonbar {
              border: none !important;
              border-color: white !important;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
            
            }
          }
        }
      }
    }
    .divisor {
      margin-top: 80px;
      background-color: red;
      width: 96%;
      height: 2px;
      z-index: 100;
    }
  }

  .buttons {
    width: $size-container;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 12px;

    .btn-send,
    .btn-clean {
      width: 30%;
      border-radius: 10px;
      padding: 20px;
      font-size: 1.8rem;
      font-weight: bold;
      margin: 40px 0;
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
}
</style>
