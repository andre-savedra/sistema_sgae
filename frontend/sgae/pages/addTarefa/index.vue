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
                v-model="task[0].nome"
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
                v-model="task[0].descricao"
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
                v-model="actualUser.nome"
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
                dateFormat="dd/mm/yy"
                :showTime="true"
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
                @upload="postPhoto"
                class="customFileUpload"
                id="imageUpload"
                chooseLabel="Adicionar fotos"
                uploadLabel="Carregar fotos"
                cancelLabel="Cancelar"
                @uploader="myUploader"
              >
                <template #empty>
                  <p>
                    Arraste as imagens desejadas aqui ou clique em 'Adicionar
                    fotos'
                  </p>
                </template>
              </FileUpload>
            </div>
          </div>
        </main>

        <div class="divisor"></div>
      </div>
    </div>
    <div class="buttons p-d-flex p-flex-row p-jc-evenly p-ai-center">
      <Button class="btn-send" label="Enviar" @click="postTask()" />
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
      photo: {
        nome: null,
        idTarefaFK: null,
        idStatusFK: null,
        image: null,
      },
      task: [
        {
          nome: null,
          descricao: null,
          idSolicitanteFK: null,
          idAmbienteFK: null,
          prazo: null,
          dataInicio: null,
          dataFim: null,
        },
      ],
      actualUser: {
        id: null,
        nome: null,
      },
    };
  },
  methods: {
    cleanForm() {
      console.log(this.allEnviroments);
      console.log(this.selectedEnviroment);
    },
    formatNumber: function (input) {
      if (input >= 0 && input <= 9) return "0" + input.toString();
      else return input.toString();
    },
    formatDate: function (input) {
      let dt = new Date();

      if (input === null) return input;

      if (input === "frontend")
        //new datetime to show in front
        return (
          this.formatNumber(dt.getDate()) +
          "/" +
          this.formatNumber(dt.getMonth() + 1) +
          "/" +
          dt.getFullYear() +
          " - " +
          this.formatNumber(dt.getHours()) +
          ":" +
          this.formatNumber(dt.getMinutes())
        );
      else if (input === "backend")
        //new datetime to show in front
        return (
          dt.getFullYear() +
          "-" +
          this.formatNumber(dt.getMonth() + 1) +
          "-" +
          this.formatNumber(dt.getDate()) +
          "T" +
          this.formatNumber(dt.getHours()) +
          ":" +
          this.formatNumber(dt.getMinutes()) +
          ":00.000000-03:00"
        );
      else if (input.includes("GMT")) {
        //convert frontend date to backend date
        let dt = new Date(input).toISOString();              
        return dt.replaceAll("Z","-03:00");
      } else if (input.includes("TT")) {
        let val = input.split("T");

        const separator = val[0].split("-");
        if (separator.length === 3)
          val[0] = separator[2] + "/" + separator[1] + "/" + separator[0];

        const separator2 = val[1].split(":");
        if (separator2.length >= 2)
          val[1] = separator2[0] + ":" + separator2[1];

        return val[0] + " - " + val[1];
      } else return input;
    },
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
              id: enviroment.id,
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
    postPhoto: async function (event) {
      // console.log(event);
      const files = event.files;
      console.log(files);

      // this.photo.nome = "MinhaFoto1";
      // this.photo.idTarefaFK = 1;
      // this.photo.idStatusFK = 1;
      // this.photo.image = files[0];

      // await this.$axios
      //   .$post("http://localhost:8003/fotos/", JSON.stringify(this.photo), {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((response) => {
      //     alert("Problema ao tentar cadastrar  foto");
      //     console.log(response);
      //   });
    },
    postTask: async function () {
      this.task[0].idSolicitanteFK = this.actualUser.id;
      this.task[0].idAmbienteFK = this.selectedEnviroment.id;
      this.task[0].prazo = this.formatDate(this.deadline.toString());
      this.task[0].dataInicio = this.formatDate("backend");

      console.log(this.task);
      console.log(JSON.stringify(this.task));
      
      await this.$axios
        .$post("http://localhost:8003/tarefas/", JSON.stringify(this.task), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((response) => {
          alert("Problema ao tentar cadastrar a tarefa");
          console.log(response);
        });
    },
    myUploader: async function (event) {
      console.log("my custom uploader...");
      console.log(event);
    },
  },
  mounted() {
    this.getUsers();
    this.getEnviroments();
    this.actualUser.id = 7;
    this.actualUser.nome = "André Felipe Savedra Cruz";
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
  $size-container: 70vw;
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

@media screen and (max-width: 945px) {
  $size-title: 13px;
  $size-topic: 13px;
  $size-container: 80vw !important;

  .titulo,
  .titulo1 {
    font-size: $size-title;
  }

  .container {
    width: $size-container;
  }

  .buttons {
    width: $size-container;
    .btn-send,
    .btn-clean {
      width: 38%;
      font-size: 16px !important;
    }
  }
}
</style>
