<template>
  <div class="all p-d-flex p-flex-column p-jc-center p-ai-center">
    <div class="containerTask p-d-flex p-flex-column p-jc-top p-ai-center">
      <div class="titulo p-d-flex p-flex-row p-jc-start p-ai-center">
        <i class="pi pi-check-square" />
        <h1>Gerencie sua tarefa!</h1>
      </div>

      <div class="form" v-if="task">
        <div class="titulo1 p-d-flex p-flex-column p-jc-start p-ai-start">
          <div class="titulo1 p-d-flex p-flex-row p-jc-start p-ai-start">
            <h2 id="task">TAREFA: #{{ this.task[0].idTarefaFK.id }} -</h2>
            <h2>&nbsp;{{ this.task[0].idTarefaFK.nome }}</h2>
          </div>
          <h4
            v-if="viewMode === 'overview'"
            class="p-d-flex p-flex-row p-jc-start p-ai-start p-mt-3"
          >
            <i class="pi pi-exclamation-circle p-mr-2 p-ml-2" />
            Essas são as informações da tarefa atribuída à você! &#128077;
          </h4>
          <h4
            v-else-if="newTaskStatusName === 'Encerrada'"
            class="p-d-flex p-flex-row p-jc-start p-ai-start p-mt-3"
          >
            <i class="pi pi-exclamation-circle p-mr-2 p-ml-2" />
            Reveja e finalize esta tarefa! &#127942;
          </h4>
          <h4
            v-else-if="newTaskStatusName === 'Em andamento'"
            class="p-d-flex p-flex-row p-jc-start p-ai-start p-mt-3"
          >
            <i class="pi pi-exclamation-circle p-mr-2 p-ml-2" />
            Sinalize que você está atuando nesta tarefa! &#128521;
          </h4>
          <h4 v-else class="p-d-flex p-flex-row p-jc-start p-ai-start p-mt-3">
            <i class="pi pi-exclamation-circle p-mr-2 p-ml-2" />
            Dê andamento em sua tarefa! &#129321;
          </h4>
        </div>
        <main class="element p-d-flex p-jc-start p-ai-start">
          <div
            class="subelement p-d-flex p-flex-column p-jc-center p-ai-center"
          >
            <!-- ENVIROMENT AND DEADLINE (overview)-->
            <div
              class="
                frameGeneralInfo
                p-d-flex p-flex-row p-jc-center p-ai-start
              "
              v-if="viewMode === 'overview'"
            >
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
                <p class="lblBasic">
                  {{ this.task[0].idTarefaFK.idAmbienteFK.nome }}
                </p>
              </div>
              <div
                class="
                  customAutocomplete
                  inputElement
                  p-d-flex p-flex-column p-jc-start p-ai-start
                "
              >
                <label class="lblBasic" for="deadline"
                  ><i class="pi pi-calendar" /><strong>Prazo</strong></label
                >
                <p class="pBasic">
                  {{ this.formatDate(this.task[0].idTarefaFK.prazo) }}
                </p>
              </div>
            </div>
            <!-- END ENVIROMENT AND DEADLINE -->

            <!-- REQUESTER AND RESPONSIBLES (overview) -->

            <div
              class="
                frameGeneralInfo
                p-d-flex p-flex-row p-jc-center p-ai-start p-mt-4
              "
              v-if="viewMode === 'overview'"
            >
              <div
                class="
                  customAutocomplete
                  p-d-flex p-flex-column p-jc-start p-ai-start
                "
              >
                <label class="lblBasic" for="requester"
                  ><i class="pi pi-user" /><strong>Solicitante</strong></label
                >
                <label class="lblBasic" for="requester">
                  <Avatar
                    :image="this.task[0].idTarefaFK.idSolicitanteFK.image"
                    size="large"
                    shape="circle"
                  />
                  <strong class="p-ml-2">{{
                    limitName(this.task[0].idTarefaFK.idSolicitanteFK.nome)
                  }}</strong>
                </label>
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
                <div v-for="(taskElement, index) in task" :key="index">
                  <label class="lblBasic" for="requester">
                    <Avatar
                      :image="taskElement.idUsuarioFK.image"
                      size="large"
                      shape="circle"
                    />
                    <strong class="p-ml-2">{{
                      limitName(taskElement.idUsuarioFK.nome)
                    }}</strong>
                  </label>
                </div>
              </div>
            </div>
            <!-- END REQUESTER AND RESPONSIBLES -->

            <!-- ACTUAL TASK DESCRIPTION (overview) -->
            <div
              class="
                frameGeneralInfo
                p-d-flex p-flex-row p-jc-center p-ai-start p-mt-4
              "
              v-if="viewMode === 'overview'"
            >
              <div
                class="
                  inputElement
                  p-d-flex p-flex-column p-jc-start p-ai-start
                "
              >
                <label class="lblBasic p-ml-3" for="description">
                  <i class="pi pi-info-circle" />
                  <strong>Descrição da Tarefa</strong>
                </label>
                <textarea
                  class="textInput p-mb-3"
                  type="text"
                  placeholder="Insira aqui a descrição da sua tarefa..."
                  id="description"
                  v-model="task[0].idTarefaFK.descricao"
                  disabled
                ></textarea>
              </div>
            </div>
            <!-- END ACTUAL DESCRIPTION -->

            <!-- PHOTOS GALLERY (overview) -->
            <div
              class="
                frameGeneralInfo
                p-d-flex p-flex-row p-jc-center p-ai-center p-mt-3
              "
              v-if="viewMode === 'overview'"
            >
              <div
                class="
                  taskGallery
                  p-d-flex p-flex-column p-jc-center p-ai-center
                "
              >
                <label class="lblBasic" for="description">
                  <i class="pi pi-camera" />
                  <strong>Fotos Anexadas</strong>
                </label>
                <div class="customContainer">
                  <CustomCarousel
                    v-if="photos[0].length > 0"
                    :photos="photos[0]"
                    background="white"
                    targetID="CarouselAddTask"
                  />
                </div>
              </div>
            </div>
            <!-- END GALLERY -->

            <!-- TIMELINE (overview and progress)-->
            <div
              class="
                frameGeneralInfo
                p-d-flex p-flex-column p-jc-center p-ai-center p-mt-3
              "
            >
              <label class="lblBasic p-ml-3" for="description">
                <i class="pi pi-clock" />
                <strong>Progresso da Tarefa</strong>
              </label>

              <Timeline
                v-if="taskStatusArray"
                class="p-d-flex p-flex-row p-jc-center p-ai-start timeprogress"
                :value="taskStatusArray"
                layout="horizontal"
                align="top"
              >
                <template #opposite> </template>
                <template #content="slotProps">
                  <strong>
                    <span class="timename">{{ slotProps.item.nome }}</span>
                  </strong>
                  <br />
                  <span class="timedate">{{
                    formatDate(slotProps.item.data)
                  }}</span>
                </template>
                <template #marker="slotProps">
                  <span class="custom-marker shadow-2">
                    <i
                      v-on:click="
                        slotProps.item.showDialog = !slotProps.item.showDialog
                      "
                      :style="{ backgroundColor: slotProps.item.color }"
                      :class="'timeicon pi ' + slotProps.item.icon"
                      v-tooltip.top="
                        slotProps.item.nome +
                        ' - ' +
                        formatDate(slotProps.item.data)
                      "
                    ></i>
                  </span>
                </template>
              </Timeline>
            </div>

            <div v-if="taskStatusArray">
              <div
                class="timelineContainer"
                v-for="(dialog, index) in taskStatusArray"
                :key="index"
              >
                <Dialog
                  class="dialogTimeline"
                  :header="'Progresso: ' + dialog.nome"
                  :visible.sync="dialog.showDialog"
                  :containerStyle="{ width: '50vw' }"
                >
                  <div class="p-d-flex p-flex-column p-jc-start p-ai-start">
                    <div class="p-d-flex p-flex-row p-jc-start p-ai-start">
                      <strong
                        ><span class="m-0"
                          ><i :class="'pi ' + dialog.icon" />{{
                            dialog.nome
                          }}</span
                        ></strong
                      >
                      <strong
                        ><p class="m-0">
                          {{ formatDate(dialog.data) }}
                        </p></strong
                      >
                    </div>
                    <div>
                      {{ dialog.descricao }}
                    </div>
                  </div>
                </Dialog>
              </div>
            </div>
            <!-- END TIMELINE -->

            <!-- PHOTOS GALLERY (progress) -->
            <div
              class="
                frameGeneralInfo
                p-d-flex p-flex-row p-jc-center p-ai-center p-mt-3
              "
              v-if="
                viewMode === 'progress' && newTaskStatusName === 'Encerrada'
              "
            >
              <div
                class="
                  taskGallery
                  p-d-flex p-flex-column p-jc-center p-ai-center
                "
              >
                <label class="lblBasic" for="description">
                  <i class="pi pi-camera" />
                  <strong
                    >DIAGNÓSTICO: Fotos Antes da Execução da Tarefa</strong
                  >
                </label>
                <div class="customContainer">
                  <CustomCarousel
                    v-if="photos[0].length > 0"
                    :photos="photos[0]"
                    background="white"
                    targetID="CarouselDiagnostic"
                  />
                </div>
              </div>
            </div>
            <!-- END GALLERY -->

            <!-- PHOTOS GALLERY (progress) -->
            <div
              class="
                frameGeneralInfo
                p-d-flex p-flex-row p-jc-center p-ai-center p-mt-3
              "
              v-if="
                viewMode === 'progress' && newTaskStatusName === 'Encerrada'
              "
            >
              <div
                class="
                  taskGallery
                  p-d-flex p-flex-column p-jc-center p-ai-center
                "
              >
                <label class="lblBasic" for="description">
                  <i class="pi pi-camera" />
                  <strong>RESULTADO: Fotos Depois da Execução da Tarefa</strong>
                </label>
                <div class="customContainer">
                  <CustomCarousel
                    v-if="photos[1].length > 0"
                    :photos="photos[1]"
                    background="white"
                    targetID="CarouselResult"
                  />
                  <div v-else>
                    <h2>Fotos não anexadas...</h2>
                  </div>
                </div>
              </div>
            </div>
            <!-- END GALLERY -->

            <!-- DESCRIPTION TEXT AREA -->
            <div
              v-if="viewMode === 'progress'"
              class="
                frameGeneralInfo
                p-d-flex p-flex-column p-jc-center p-ai-center p-mt-3
              "
            >
              <label class="lblBasic" for="description"
                ><i class="pi pi-info-circle" /><strong
                  >Adicione algum comentário sobre este processo</strong
                ></label
              >

              <textarea
                class="textInput"
                type="text"
                placeholder="Insira aqui a descrição da sua tarefa..."
                id="description"
                v-model="newTaskStatus.descricao"
              ></textarea>
            </div>
            <!-- END DESCRIPTION TEXT AREA -->

            <!-- PHOTOS UPLOAD (progress) -->

            <div
              class="inputElement p-d-flex p-flex-column p-jc-start p-ai-start"
              v-if="
                viewMode === 'progress' && newTaskStatusName === 'Concluída'
              "
            >
              <label class="lblBasic" for="imageUpload"
                ><i class="pi pi-camera" /><strong
                  >Anexe fotos do seu trabalho</strong
                ></label
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
                @uploader="myUploader"
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
            <!-- END PHOTOS UPLOAD -->

            <div
              class="
                progressButtonsContainer
                p-d-flex p-flex-row p-jc-center p-ai-center
              "
              v-if="
                this.task[0] !== null &&
                this.task[0].idTarefaFK.dataFim === null
              "
            >
              <Button
                class="btn-adv-progress"
                label="Avançar Tarefa"
                @click="progressTaskButton()"
                v-if="viewMode === 'overview'"
              />
              <Button
                class="btn-adv-progress"
                label="Voltar à ver Tarefa"
                @click="progressTaskButton()"
                v-if="viewMode === 'progress'"
              />
            </div>
          </div>
        </main>

        <div class="divisor"></div>
      </div>
    </div>
    <div
      v-if="viewMode === 'progress'"
      class="buttons p-d-flex p-flex-row p-jc-evenly p-ai-center"
    >
      <Button
        v-if="newTaskStatusName === 'Encerrada'"
        class="btn-send"
        label="Aprovar"
        @click="progressTaskSubmit()"
      />
      <Button
        v-else
        class="btn-send"
        label="Salvar"
        @click="progressTaskSubmit()"
      />

      <Button
        v-if="newTaskStatusName === 'Encerrada'"
        class="btn-clean"
        label="Declinar"
      />
      <Button v-else class="btn-clean" label="Cancelar" @click="cleanForm()" />
    </div>
  </div>
</template>

<script>
import AsyncUserStoraged from "@/assets/scripts/asyncUserStoraged";
import AwsS3Task from "@/assets/scripts/awsS3Task.js";

export default {
  extends: AsyncUserStoraged,
  name: "andamentoTarefa",
  layout: "standard",
  middleware: "auth",
  data() {
    return {
      progressAllowed: "",
      emailPayload: null,
      viewMode: "overview", //overview or progress
      taskID: 1,
      initialStatus: 1,
      deadline: null,
      photos: [[], []],
      filesToBeUploaded: null,
      S3Client: null,
      task: null,
      actualUser: {
        id: null,
        nome: null,
      },
      taskStatus: null,
      taskStatusArray: [],
      newTaskStatusName: "",
      newTaskStatus: {
        idStatusFK: 0,
        idTarefaFK: 0,
        data: "",
        descricao: "",
      },
      iconArrayStatus: [
        "pi-file",
        "pi-users",
        "pi-check-circle",
        "pi-flag",
        "pi-tags",
        "pi-folder",
      ],
      colorNotConcluded: "#d44f46",
      colorConcluded: "#77c758",
    };
  },
  methods: {
    limitText: function (data, limit) {
      if (data !== null && data !== undefined) {
        if (data.length > limit) return data.slice(0, limit) + "...";
        else return data;
      } else return data;
    },
    limitName: function (data) {
      if (data !== null && data !== undefined) {
        let val = data.split(" ");
        return val[0] + " " + val[val.length - 1];
      } else return data;
    },
    cleanForm() {
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
    virtualClickUpload: function (buttonText) {
      console.log("VIRTUAL CLICK");
      let el = document.querySelectorAll(".p-fileupload-buttonbar button");
      console.log(el);
      el.forEach((element, index) => {
        if (element.textContent.includes(buttonText)) {
          console.log("clicou!");
          element.click();
        }
      });
    },
    progressTaskSubmit: async function () {
      this.progressAllowed = "";

      const post = await Promise.all([this.postTaskStatus()]);

      if (this.progressAllowed === "ok") {
        switch (this.newTaskStatusName) {
          case "Em andamento":
            const anda = await Promise.all([this.putTask()]);
            this.emailPayload = [this.newTaskStatus];
            // this.emailPayload = [structuredClone(this.newTaskStatus)];
            this.viewMode = "overview";
            this.cleanNewStatus();
            this.getTaskUser(this.taskID);
            this.getStatusType();
            this.postMail(this.emailPayload);
            break;

          case "Concluída":
            const conc = await Promise.all([
              this.putTask(),
              this.virtualClickUpload("Carregar"),
            ]);
            this.emailPayload = [this.newTaskStatus];
            // this.emailPayload = [structuredClone(this.newTaskStatus)];
            this.postMail(this.emailPayload);
            break;

          case "Encerrada":
            const enc = await Promise.all([this.putTask(true)]);
            this.emailPayload = [this.newTaskStatus];
            // this.emailPayload = [structuredClone(this.newTaskStatus)];
            this.viewMode = "overview";
            this.cleanNewStatus();
            this.getTaskUser(this.taskID);
            this.getStatusType();
            this.postMail(this.emailPayload);
            break;
        }
      } else if (this.progressAllowed === "permission")
        alert("Você não tem permissão para alterar esta tarefa ou concluí-la");
      else alert("Não foi possível alterar a tarefa!");
    },
    postTask: async function () {
      const index = 0;
      this.task[index].idSolicitanteFK = this.actualUser.id;
      // this.task[index].idAmbienteFK = this.selectedEnviroment.id;
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
        });
    },
    putTask: async function (end) {
      const index = 0;

      console.log("atualizando put task");

      const body = {
        idStatusFK: this.newTaskStatus.idStatusFK,
        dataFim: end ? this.newTaskStatus.data : null,
        dataInicio: this.task[index].idTarefaFK.dataInicio,
        idAmbienteFK: this.task[index].idTarefaFK.idAmbienteFK.id,
        idSolicitanteFK: this.task[index].idTarefaFK.idSolicitanteFK.id,
        nome: this.task[index].idTarefaFK.nome,
        descricao: this.task[index].idTarefaFK.descricao,
        prazo: this.task[index].idTarefaFK.prazo,
      };

      console.log(body);

      await this.$axios
        .$put(
          this.$store.state.BASE_URL +
            "tarefas/" +
            this.task[index].idTarefaFK.id +
            "/",
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

          console.log("Atualizado com sucesso!!!");
        })
        .catch((response) => {
          alert("Problema ao tentar cadastrar a tarefa");
          console.log(response);
        });
    },

    postTaskStatus: async function () {
      console.log("tentando salvar taskSTATUS");
      this.newTaskStatus.descricao +=
        " - (" + this.limitName(this.actualUser.nome) + ")";
      const body = [this.newTaskStatus];
      console.log(body);

      await this.$axios
        .$post(
          this.$store.state.BASE_URL + "tarefasStatus/",
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
          if (response.msg === "Atualizado com sucesso")
            this.progressAllowed = "ok";
          else this.progressAllowed = "permission";
        })
        .catch((response) => {
          alert("Problema ao tentar cadastrar status da tarefa");
          console.log(response);
          this.progressAllowed = "error";
        });
    },
    savePhotoAWS: async function (event) {
      this.filesToBeUploaded = event.files;
      let photoLocations = [];
      let hasError = false;
      
      await Promise.all(
        this.filesToBeUploaded.map(async (file, index) => {
          const photoName =
            this.task[0].idTarefaFK.id.toString() +
            "-" +
            this.newTaskStatus.idStatusFK.toString() +
            "-" +
            index.toString();

          //aws S3: SAVE PHOTO
          //"idTarefa-idStatus-indexPhoto"
          await this.S3Client.uploadFile(file, photoName)
            .then((awsResponse) => {
              console.log("save aws file " + index);
              console.log(awsResponse);
              photoLocations.push(awsResponse);
            })
            .catch((err) => {
              console.error(err);
              hasError = true;
            });
        })
      );

      if (photoLocations.length > 0 && hasError === false)
        this.postPhoto(photoLocations);
      else alert("erro  ao salvar na aws s3");
    },
    postPhoto: async function (photoLocations) {           
      const taskID = this.task[0].idTarefaFK.id;
      const initialStatus = this.newTaskStatus.idStatusFK;

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

            this.viewMode = "overview";
            this.cleanNewStatus();
            this.getTaskUser(this.taskID);
            this.getTaskPhotos(this.taskID);
            this.getStatusType();
          })
          .catch((response) => {
            alert("Problema ao tentar cadastrar  foto");
            console.log(response);
          });
      });
    },
    myUploader: async function (event) {
      console.log("my custom uploader...");
      console.log(event);
    },
    getTaskStatus: async function (task) {
      this.$axios
        .$get(this.$store.state.BASE_URL + ("tarefasStatus/?tarefa=" + task))
        .then((response) => {
          console.log(response);

          //request ok
          if (response.data !== null && response.data !== undefined) {
            this.taskStatus = response.data;//structuredClone(response.data);

            this.taskStatus.map((status, index) => {
              this.taskStatusArray[index].data = status.data;
              this.taskStatusArray[index].color = this.colorConcluded;
              this.taskStatusArray[index].descricao =
                status.descricao === null ? "" : status.descricao;
            });

            console.log(this.taskStatus);
            console.log("finalizado get task status");

            console.log("array status completo");
            console.log(this.taskStatusArray);
          }
        })
        .catch((response) => {
          alert("Problema ao tentar pegar status da tarefa " + task);
          console.log(response);
        });
    },
    getStatusType: async function () {
      this.taskStatusArray.length = 0;
      this.$axios
        .$get(this.$store.state.BASE_URL + "status/")
        .then((response) => {
          console.log(response);

          //request ok
          if (response.data !== null && response.data !== undefined) {
            this.taskStatusArray.length = 0;
            response.data.map((typeSts, index) => {
              this.taskStatusArray.push({
                id: typeSts.id,
                nome: typeSts.nome,
                data: " ",
                color: this.colorNotConcluded,
                icon: this.iconArrayStatus[index],
                showDialog: false,
                descricao: "",
              });
            });

            console.log(this.taskStatusArray);
            console.log("finalizado get status TYPE");

            this.getTaskStatus(this.taskID);
          }
        })
        .catch((response) => {
          alert("Problema ao tentar pegar status type");
          console.log(response);
        });
    },
    getTaskUser: async function (task) {
      this.$axios
        .$get(
          this.$store.state.BASE_URL +
            ("tarefasUsuarios/?tarefaCompleta=" + task)
        )
        .then((response) => {
          console.log(response);

          //request ok
          if (response.data !== null && response.data !== undefined) {
            this.task = null;
            this.task = response.data;//structuredClone(response.data);
            console.log(this.task);

            console.log("finalizado gettaskuser");
          }
        })
        .catch((response) => {
          alert("Problema ao tentar pegar tarefa " + task);
          console.log(response);
        });
    },
    getTaskPhotos: function (task) {
      this.$axios
        .$get(this.$store.state.BASE_URL + ("fotos/?tarefa=" + task))
        .then((response) => {
          //request ok
          if (response.data !== null && response.data !== undefined) {
            response.data.map((photo) => {
              if (photo.idStatusFK === 1) this.photos[0].push(photo);
              else this.photos[1].push(photo);
            });

            console.log("FOTOS CARREGADAS");
            console.log(this.photos);
          }
        })
        .catch((response) => {
          alert("Problema ao tentar pegar FOTOS da tarefa " + task);
          console.log(response);
        });
    },
    progressTaskButton: function () {
      //first time
      if (!this.newTaskStatus.idStatusFK) {
        //get actual progress from task and increment
        const actualProgressID = this.task[0].idTarefaFK.idStatusFK.id + 1;
        let found = false;

        //walk away all status type and find the next status
        this.taskStatusArray.map((status) => {
          if (actualProgressID === status.id) {
            //get new status task
            this.newTaskStatus.idStatusFK = status.id;
            this.newTaskStatus.data = this.formatDate("backend");
            this.newTaskStatus.idTarefaFK = this.task[0].idTarefaFK.id;
            this.newTaskStatusName = status.nome;

            //actualize status timeline
            status.data = this.newTaskStatus.data;
            status.color = this.colorConcluded;

            this.viewMode = "progress";
            found = true;
          }
        });

        if (found === false) {
          this.newTaskStatus.idStatusFK = 0;
          this.newTaskStatus.data = "";
          this.newTaskStatus.idTarefaFK = 0;
          this.newTaskStatusName = "";
        }
      }
      //already started
      else {
        this.taskStatusArray.map((status) => {
          if (this.newTaskStatus.idStatusFK === status.id) {
            this.newTaskStatus.data = this.formatDate("backend");

            status.data =
              this.viewMode === "overview" ? this.newTaskStatus.data : "";
            status.color =
              this.viewMode === "overview"
                ? this.colorConcluded
                : this.colorNotConcluded;
            this.viewMode =
              this.viewMode === "overview" ? "progress" : "overview";
          }
        });
      }
    },
    postMail: async function (payload) {
      if (payload)
        await this.$axios
          .$post(
            this.$store.state.BASE_URL + "emailSender/newTaskStatus/",
            JSON.stringify(payload),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response);
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
          });
    },
    cleanNewStatus: function () {
      this.newTaskStatusName = "";
      this.newTaskStatus.idStatusFK = 0;
      this.newTaskStatus.idTarefaFK = 0;
      this.newTaskStatus.data = "";
      this.newTaskStatus.descricao = "";
    },
  },
  created() {
    if (this.actualUser === null || this.actualUser === undefined)
      this.$router.push("/lobby");
    else {
      if (this.$store.state.editTaskId > 0)
        this.taskID = this.$store.state.editTaskId;
      else this.$router.push("/tarefas");

      this.getTaskUser(this.taskID);
      this.getTaskPhotos(this.taskID);
      this.getStatusType();

      this.S3Client = AwsS3Task.awsManager();
    }
  },
};
</script>


<style lang="scss" scoped>
/* viewMode === overview */
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
  $red-strong: #99180f;

  img {
    max-width: 400px !important;
    max-height: 400px !important;
  }

  .titulo,
  .titulo1 {
    font-size: $size-title;
  }

  .containerTask {
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

    .form {
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

          .lblBasic .p-avatar-lg {
            width: 4rem;
            height: 3.5rem;
          }

          .customAutocomplete {
            width: 48%;
            .lblBasic {
              margin: 7px 0px;
            }
          }

          .textInput {
            border: none !important;
            background-color: rgb(255, 223, 223);
            font-weight: bold;
          }

          .taskGallery {
            width: 95%;
            max-width: 95%;
            height: 360px;

            .customContainer {
              height: 310px;
              width: 100%;
            }
          }

          .timeprogress {
            width: 100%;

            .p-timeline-event {
              .custom-marker {
                width: auto !important;
                height: auto !important;
                cursor: pointer !important;

                .timeicon {
                  font-size: 23px;
                  font-weight: bold;
                  width: 46px;
                  min-width: 46px;
                  height: 36px;
                  min-height: 36px;
                  border-radius: 30px !important;
                  display: table-cell;
                  text-align: center;
                  vertical-align: middle;
                  color: black;

                  &:hover {
                    color: rgb(90, 80, 80);
                  }
                }
              }
            }
          }
        }

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

  .progressButtonsContainer {
    width: 100%;
    height: 45px;
    margin: 20px 0px;

    .btn-adv-progress {
      width: 70%;
      height: 100%;
      border-radius: 5px;
      padding: 20px;
      font-size: 1.2rem;
      font-weight: bold;
      transition: all 0.3s;
      background-color: rgba(194, 42, 31, 1) !important;
      border: none;
      color: #fff;

      &:hover {
        transform: scale(1.03);
        cursor: pointer;
        transition: all 0.3s;
      }
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

  .containerTask {
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

@media screen and (max-width: 760px) {
  .taskGallery {
    height: 320px !important;

    .customContainer {
      height: 280px !important;
    }
  }

  .timeprogress {
    .p-timeline-event {
      .p-timeline-event-content span {
        font-size: 13px !important;
      }
      .custom-marker {
        .timeicon {
          font-size: 18px !important;
          width: 39px !important;
          min-width: 39px !important;
          height: 35px !important;
          min-height: 35px !important;
        }
      }
    }
  }
}

@media screen and (max-width: 610px) {
  .all .containerTask .divisor {
    margin-top: 35px !important;
  }
  $size-title: 11px;
  $size-topic: 13px;
  $size-container: 87vw !important;

  .taskGallery {
    height: 290px !important;

    .customContainer {
      height: 270px !important;
    }
  }

  .titulo,
  .titulo1 {
    font-size: $size-title !important;
  }

  .containerTask {
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

@media screen and (max-width: 540px) {
  .buttons button {
    margin: 15px 0px !important;
  }
  .lblBasic .p-avatar-lg {
    width: 3.5rem !important;
    height: 3rem !important;
  }
  .frameGeneralInfo .lblBasic,
  .frameGeneralInfo .pBasic,
  .inputElement .lblBasic strong {
    font-size: 13px !important;
  }

  .taskGallery {
    height: 260px !important;

    .customContainer {
      height: 250px !important;
    }
  }

  $size-container: 100vw !important;

  .all {
    padding: 0px !important;
  }

  .containerTask {
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

  .timeprogress {
    .p-timeline-event {
      .timedate,
      .timename {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 450px) {
  .all {
    background: white;
  }
  .taskGallery {
    height: 240px !important;

    .customContainer {
      height: 230px !important;
    }
  }
}

@media screen and (max-width: 390px) {
  .progressButtonsContainer .btn-adv-progress {
    font-size: 15px !important;
    padding: 10px;
  }

  .timeprogress {
    .p-timeline-event {
      .custom-marker {
        .timeicon {
          font-size: 16px !important;
          width: 30px !important;
          min-width: 30px !important;
          height: 30px !important;
          min-height: 30px !important;
        }
      }
    }
  }

  .buttons button {
    margin: 0px !important;
  }
  .lblBasic .p-avatar-lg {
    width: 3rem !important;
    height: 2.5rem !important;
  }
  .taskGallery {
    height: 210px !important;

    .customContainer {
      height: 200px !important;
    }
  }
}

@media screen and (max-width: 315px) {
  .buttons button {
    height: 20px !important;
    padding: 17px 7px !important;
  }

  .lblBasic .p-avatar-lg {
    width: 2.5rem !important;
    height: 2rem !important;
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

  .taskGallery {
    height: 180px !important;

    .customContainer {
      height: 170px !important;
    }
  }
}

@media screen and (max-width: 275px) {
  .taskGallery {
    height: 160px !important;

    .customContainer {
      height: 150px !important;
    }
  }
}

/* viewMode === 'progress' */
/* .all .form .main {
} */
</style>
