<template>
  <div class="allAdd p-d-flex p-flex-column p-jc-center p-ai-center">
    <div class="addContainer p-d-flex p-flex-column p-jc-top p-ai-center">
      <div class="titulo p-d-flex p-flex-row p-jc-start p-ai-center">
        <i class="pi pi-check-square" />
        <h1>Crie sua Tarefa!</h1>
      </div>

      <div
        class="form"
        v-if="actualUser && allUsers.length > 0 && allEnviroments.length > 0"
      >
        <div class="titulo1">
          <h2>TAREFA:</h2>
        </div>
        <main class="element p-d-flex p-jc-start p-ai-start">
          <div class="subelement p-d-flex p-flex-column p-jc-start p-ai-start">
            <div
              class="inputElement p-d-flex p-flex-column p-jc-start p-ai-start"
            >
              <label class="lblBasic" for="name"
                ><i class="pi pi-bookmark" /><strong>Título</strong></label
              >
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
              <label class="lblBasic" for="description"
                ><i class="pi pi-info-circle" /><strong
                  >Descrição</strong
                ></label
              >
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
              <label class="lblBasic" for="requester"
                ><i class="pi pi-user" /><strong>Solicitante</strong></label
              >
              <InputText
                type="text"
                id="requester"
                class="basicInputText"
                :disabled="true"
                placeholder="Preencha..."
                v-model="this.actualUser.nome"
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
              <label class="lblBasic" for="employee"
                ><i class="pi pi-users" /><strong>Responsáveis</strong></label
              >
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
                ><i class="pi pi-map-marker" /><strong
                  >Ambiente de Ensino</strong
                ></label
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
              <label class="lblBasic" for="deadline"
                ><i class="pi pi-calendar" /><strong>Prazo</strong></label
              >
              <Calendar
                class="customDatePicker"
                id="deadline"
                :showIcon="true"
                v-model="deadline"
                dateFormat="dd/mm/yy"
                :showTime="true"
              />
            </div>
            <div
              class="inputElement p-d-flex p-flex-column p-jc-start p-ai-start"
            >
              <label class="lblBasic" for="imageUpload"
                ><i class="pi pi-camera" /><strong>Fotos Upload</strong></label
              >

              <FileUpload
                :multiple="true"
                accept="image/jpeg,image/png"
                :maxFileSize="10000000"
                @upload="savePhotoAWS($event)"
                class="customFileUpload"
                id="imageUpload"
                chooseLabel="Adicionar fotos"
                uploadLabel="Carregar fotos"
                cancelLabel="Cancelar"
                :fileLimit="10"
                invalidFileTypeMessage="Formato da imagem inválido, formato deve ser JPG ou PNG!!!"
                invalidFileSizeMessage="Tamanho da imagem excedido, limite é 10MB!"
                invalidFileLimitMessage="Máximo de imagens anexadas é 10, diminua a quantidade de imagens!"
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
      <Button
        class="btn-send"
        :disabled="btnDisabled"
        label="Enviar"
        @click="checkMode()"
      />
      <Button class="btn-clean" label="Limpar" @click="cleanForm()" />
    </div>
  </div>
</template>

<script>
import AsyncUserStoraged from "@/assets/scripts/asyncUserStoraged";
import AwsS3Task from "@/assets/scripts/awsS3Task.js";

export default {
  extends: AsyncUserStoraged,
  name: "addTarefa",
  layout: "standard",
  middleware: "auth",
  data() {
    return {
      emailPayload: null,
      selectedEmployees: [],
      filteredEmployees: null,
      allUsers: [],
      selectedEnviroment: null,
      filteredEnviroments: null,
      allEnviroments: [],
      taskID: 1,
      initialStatus: 1,
      deadline: null,
      photos: [],
      uploadPhotoStarted: false,
      S3Client: null,
      filesToBeUploaded: null,
      task: [
        {
          nome: null,
          descricao: null,
          idSolicitanteFK: null,
          idAmbienteFK: null,
          idStatusFK: null,
          prazo: null,
          dataInicio: null,
          dataFim: null,
        },
      ],
      updateModeId: 0,
      btnDisabled: false,
    };
  },
  methods: {
    cleanForm() {
      this.uploadPhotoStarted = false;
      this.task.map((task) => {
        task.nome = null;
        (task.descricao = null),
          (task.idSolicitanteFK = null),
          (task.idAmbienteFK = null),
          (task.prazo = null),
          (task.dataInicio = null),
          (task.dataFim = null);
      });

      this.selectedEmployees.length = 0;
      this.selectedEnviroment.length = 0;
      this.deadline = null;
      this.$store.dispatch("setEditTask", 0);
      this.updateModeId = 0;
      this.virtualClickUpload("Cancelar");
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
        return dt.replaceAll("Z", "-03:00");
      } else if (input.includes("T")) {
        let val = input.split("T"); //val[0] date, val[1] time

        const separator = val[0].split("-");
        if (separator.length === 3)
          val[0] = separator[2] + "/" + separator[1] + "/" + separator[0];

        const separator2 = val[1].split(":");
        if (separator2.length >= 2)
          val[1] = separator2[0] + ":" + separator2[1];

        return val[0] + " - " + val[1];
      } else if (input.includes("/")) {
        let val = input.split("-");
        val[0] = val[0].trim().replaceAll("/", "-"); //date
        val[1] = val[1].trim().replaceAll("/", "-"); //time
        //invert date position
        const separator = val[0].split("-");
        if (separator.length === 3)
          val[0] = separator[2] + "-" + separator[1] + "-" + separator[0];

        return val[0] + "T" + val[1] + ":00-03:00";
      } else return input;
    },
    getUsers: async function () {
      this.allUsers.length = 0;

      await this.$axios
        .$get(this.$store.state.BASE_URL + "usuarios/?ativo=True")
        .then((dataResponse) => {
          dataResponse.data.forEach((user) => {
            this.allUsers.push({
              name: user.nome,
              id: user.id,
            });
          });
          console.log("this.allUsers");
          console.log(this.allUsers);
        })
        .catch((response) => {
          console.log("problema ao pegar usuarios");
          console.log(response);
        });
    },
    getEnviroments: async function () {
      this.allUsers.length = 0;

      await this.$axios
        .$get(this.$store.state.BASE_URL + "ambientes/")
        .then((dataResponse) => {
          dataResponse.data.forEach((enviroment) => {
            this.allEnviroments.push({
              id: enviroment.id,
              name: enviroment.nome,
            });
          });
          console.log("this.allEnviroments");
          console.log(this.allEnviroments);
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
    virtualClickUpload: function (buttonText) {
      let el = document.querySelectorAll(".p-fileupload-buttonbar button");
      el.forEach((element, index) => {
        if (element.textContent.includes(buttonText)) {
          element.click();
          console.log("clicou");
        }
      });
    },
    checkMode: function () {
      this.btnDisabled = true;

      if (this.updateModeId > 0) this.putTask();
      else this.postTask();
    },
    postTask: async function () {
      const index = 0;
      this.task[index].idSolicitanteFK = this.actualUser.id;
      this.task[index].idAmbienteFK = this.selectedEnviroment.id;
      this.task[index].prazo = this.formatDate(this.deadline.toString());
      this.task[index].dataInicio = this.formatDate("backend");
      this.task[index].idStatusFK = 1;
      await this.$axios
        .$post(
          this.$store.state.BASE_URL + "tarefas/",
          JSON.stringify(this.task),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          //request ok
          if (
            response[index].nome === this.task[index].nome &&
            response[index].id > 0
          ) {
            this.taskID = response[index].id;
            this.postTaskUsers();
          }
        })
        .catch((response) => {
          alert("Problema ao tentar cadastrar a tarefa");
          console.log(response);
          this.btnDisabled = false;
        });
    },
    putTask: async function () {
      const index = 0;

      let p = this.formatDate(this.deadline.toString());
      console.log("this.deadline.toString()");
      console.log(this.deadline.toString());
      console.log("p");
      console.log(p);

      const body = {
        idSolicitanteFK: this.actualUser.id,
        idAmbienteFK: this.selectedEnviroment.id,
        idStatusFK: this.task[index].idStatusFK,
        nome: this.task[index].nome,
        descricao: this.task[index].descricao,
        prazo: this.formatDate(this.deadline.toString()),
        dataInicio: this.task[index].dataInicio,
      };
      console.log("body");
      console.log(body);

      await this.$axios
        .$put(
          this.$store.state.BASE_URL + "tarefas/" + this.updateModeId + "/",
          JSON.stringify(body),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          //request ok
          if (response.nome === body.nome && response.id > 0) {
            this.taskID = response.id;
          }
        })
        .catch((response) => {
          alert("Problema ao tentar cadastrar a tarefa");
          console.log(response);
        });
    },
    postTaskUsers: async function () {
      let taskUsers = [];

      this.selectedEmployees.forEach((employee) => {
        taskUsers.push({
          idUsuarioFK: employee.id,
          idTarefaFK: this.taskID,
        });
      });

      console.log(taskUsers);
      console.log(JSON.stringify(taskUsers));

      await this.$axios
        .$post(
          this.$store.state.BASE_URL + "tarefasUsuarios/",
          JSON.stringify(taskUsers),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          //request ok
          this.postTaskStatus();
          this.emailPayload = taskUsers;
        })
        .catch((response) => {
          alert("Problema ao tentar cadastrar os usuários na tarefa");
          console.log(response);
          this.btnDisabled = false;
        });
    },
    postTaskStatus: async function () {
      let taskStatus = [
        {
          idStatusFK: this.initialStatus,
          idTarefaFK: this.taskID,
        },
      ];

      await this.$axios
        .$post(
          this.$store.state.BASE_URL + "tarefasStatus/",
          JSON.stringify(taskStatus),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          //request ok
          this.postMail(this.emailPayload);
          this.virtualClickUpload("Carregar");
          //clean form if there is no photo added
          const checkUpload = setTimeout(() => {
            if (!this.uploadPhotoStarted) this.cleanForm();
          }, 2000);
        })
        .catch((response) => {
          alert("Problema ao tentar cadastrar a tarefa");
          console.log(response);
          this.btnDisabled = false;
        });
    },
    postMail: async function (payload) {
      if (payload)
        await this.$axios
          .$post(
            this.$store.state.BASE_URL + "emailSender/newTask/",
            JSON.stringify(payload),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response);
            this.btnDisabled = false;
            //request ok
            if (response.msg !== null && response.msg !== undefined) {
              if (response.msg === "sent")
                console.log("EMAIL ENVIADO COM SUCESSO");
              else console.log("EMAIL NÃO ENVIADO");
            }
          })
          .catch((response) => {
            alert("Problema ao tentar enviar email!");
            console.log(response);
            this.btnDisabled = false;
          });
    },
    savePhotoAWS: async function (event) {
      this.filesToBeUploaded = event.files;
      let photoLocations = [];
      let hasError = false;

      this.uploadPhotoStarted = true;
      await Promise.all(
        this.filesToBeUploaded.map(async (file, index) => {
          const photoName =
            this.taskID.toString() +
            "-" +
            this.task[0].idStatusFK.toString() +
            "-" +
            index.toString();

          //aws S3: SAVE PHOTO
          //"idTarefa-idStatus-indexPhoto"
          await this.S3Client.uploadFile(file, photoName)
            .then((awsResponse) => {
              console.log("save aws file " + index);
              console.log(awsResponse);
              photoLocations.push(awsResponse)
            })
            .catch((err) => {
              console.error(err);
              hasError = true;
            });
        })
      );

      if(photoLocations.length > 0 && hasError === false)      
        this.postPhoto(photoLocations);      
      else
        alert("erro  ao salvar na aws s3")
      

    },
    postPhoto: async function (photoLocations) {
      // console.log(event);
      const taskID = this.taskID;
      const initialStatus = this.initialStatus;
      
      await photoLocations.forEach((photoLocation) => {
        let formData = new FormData();
        formData.append("nome", photoLocation.key);
        formData.append("idTarefaFK", taskID);
        formData.append("idStatusFK", initialStatus);
        formData.append("image", photoLocation.location);

        this.$axios
          .$post(this.$store.state.BASE_URL + "fotos/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response);
            this.cleanForm();
          })
          .catch((response) => {
            alert("Problema ao tentar cadastrar  foto");
            console.log(response);
          });
      });
    },
    getTaskUser: async function (task) {
      this.$axios
        .$get(this.$store.state.BASE_URL + ("tarefasUsuarios/?tarefa=" + task))
        .then((response) => {
          //request ok
          if (response.data !== null && response.data !== undefined) {
            response.data.map((user) => {
              this.selectedEmployees.push({
                name: user.idUsuarioFK.nome,
                id: user.idUsuarioFK.id,
              });
            });

            console.log("finalizado gettaskuser");
            console.log(this.selectedEmployees);
            console.log(this.allUsers);
          }
        })
        .catch((response) => {
          alert("Problema ao tentar pegar tarefa " + task);
          console.log(response);
        });
    },
    getTask: async function (task) {
      if (this.updateModeId > 0) {
        console.log("VAI ALTERAR A TAREFA " + this.$store.state.editTaskId);
        const endGetters = await Promise.all([
          this.getUsers(),
          this.getEnviroments(),
        ]);
        console.log("finalizado processos!");
      }

      this.$axios
        .$get(this.$store.state.BASE_URL + ("tarefas/" + task))
        .then((response) => {
          console.log(response);
          console.log(this.allEnviroments);
          //request ok
          if (response.data !== null && response.data !== undefined) {
            this.task[0].nome = response.data.nome;
            this.task[0].descricao = response.data.descricao;
            this.selectedEnviroment = {
              id: response.data.idAmbienteFK.id,
              name: response.data.idAmbienteFK.nome,
            };
            this.task[0].dataInicio = response.data.dataInicio;
            this.task[0].idStatusFK = response.data.idStatusFK.id;
            this.deadline = this.formatDate(response.data.prazo);
            this.getTaskUser(task);
            console.log("finalizado gettask");
          }
        })
        .catch((response) => {
          alert("Problema ao tentar pegar tarefa " + task);
          console.log(response);
        });
    },
  },
  created() {
    if (this.actualUser === null || this.actualUser === undefined)
      this.$router.push("/lobby");
    else {
      console.log("actual user add tarefa");
      console.log(this.actualUser);

      if (this.$store.state.editTaskId > 0) {
        this.updateModeId = this.$store.state.editTaskId;
        this.getTask(this.updateModeId);
      } else {
        this.getUsers();
        this.getEnviroments();
      }

      this.S3Client = AwsS3Task.awsManager();
    }
  },
};
</script>

<style lang="scss" scoped>
.allAdd {
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

  .addContainer {
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

    .ovvv {
      background-color: $white-back;
      width: 100%;
      height: auto;
      padding: 20px;
      border-radius: 0px 0px 15px 15px;

      .ovv-container {
        height: 1000px;
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
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          .pi {
            width: auto;
            margin-right: 10px;
            font-weight: bold;
          }
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
  $size-topic: 13px;
  $size-container: 80vw !important;

  .titulo,
  .titulo1 {
    font-size: $size-title;
  }

  .addContainer {
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

@media screen and (max-width: 610px) {
  $size-title: 11px;
  $size-topic: 13px;
  $size-container: 87vw !important;

  .titulo,
  .titulo1 {
    font-size: $size-title !important;
  }

  .addContainer {
    width: $size-container;
  }

  .buttons {
    width: $size-container;
    .btn-send,
    .btn-clean {
      width: 30% !important;
      font-size: 16px !important;
    }
  }

  .customDatePicker {
    width: 50% !important;
    margin-left: 15px;
  }
}

@media screen and (max-width: 400px) {
  $size-container: 100vw !important;

  .allAdd {
    padding: 0px !important;
  }

  .addContainer {
    width: $size-container;
    border-radius: 0px !important;
  }

  .titulo {
    border-radius: 0px !important;
  }

  .buttons {
    width: $size-container;
    .btn-send,
    .btn-clean {
      width: 30% !important;
      font-size: 15px !important;
    }
  }

  .customDatePicker {
    width: 60% !important;
    margin-left: 15px;
  }
}
</style>
