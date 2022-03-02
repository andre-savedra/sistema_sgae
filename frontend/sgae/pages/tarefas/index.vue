<template>
  <div class="allTasks p-d-flex p-flex-column p-jc-start p-ai-center">
    <h1 id="titleTasks">Tarefas cadastradas</h1>
    <DataView
      :value="tasks"
      :layout="layout"
      :paginator="true"
      :rows="5"
      :sortOrder="sortOrder"
      :sortField="sortField"
      @page="onPage($event)"
      class="dataTaskViewer"
    >
      <template #header>
        <div
          class="grid grid-nogutter p-d-flex p-flex-row p-jc-center p-ai-start"
        >
          <div
            class="
              col-6
              taskToolBox
              p-d-flex p-flex-column p-jc-start p-ai-start
            "
          >
            <div class="twoElements p-d-flex p-flex-row p-jc-start p-ai-start">
              <div class="p-d-flex p-flex-row p-jc-start p-ai-center">
                <label for="dropFilter">Exibir tarefas:</label>
                <Dropdown
                  id="dropFilter"
                  class="sortClass"
                  v-model="filterKey"
                  :options="filterOptions"
                  optionLabel="label"
                  placeholder="Todas"
                  @change="onSortChange($event)"
                />
              </div>
              <div class="p-d-flex p-flex-row p-jc-start p-ai-center">
                <label for="dropOrder">Ordenar tarefas:</label>
                <Dropdown
                  id="dropOrder"
                  class="sortClass"
                  v-model="sortKey"
                  :options="sortOptions"
                  optionLabel="label"
                  placeholder="Mais Recentes"
                  @change="onSortChange($event)"
                />
              </div>
            </div>

            <div class="oneElement p-d-flex p-flex-row p-jc-start p-ai-center">
              <label for="filters">Digite o filtro:</label>
              <AutoComplete
                :multiple="false"
                v-model="selectedFilter"
                :suggestions="filteredSuggestions"
                @complete="searchEnviroment($event)"
                field="name"
                id="filters"
                placeholder="Digite o filtro"
                class="filteredField"
              />
            </div>
          </div>
          <div class="col-6 viewSwitch">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="listTaskDataView">
          <div
            class="col-12 elementListTaskDataView"
            v-if="
              slotProps.data.nome !== null && slotProps.data.nome !== undefined
            "
          >
            <div class="imgTaskContainer">
              <!-- <img src="@/static/clipboard.jpg" alt="Foto Tarefa" /> -->
              <img :src='BaseURL2 + slotProps.data.fotos[0].image' alt="Foto Tarefa" />
            </div>
            <div
              class="
                itemTaskContainer
                p-d-flex p-flex-column p-jc-between p-ai-center
              "
            >
              <div class="top p-d-flex p-flex-row p-jc-between p-ai-center">
                <div class="top-texts">
                  <h3 class="p-ml-2">
                    {{ limitText(slotProps.data.nome, 30) }}
                  </h3>
                  <span class="p-ml-3">{{
                    limitText(slotProps.data.descricao, 40)
                  }}</span>
                </div>
                <div
                  class="top-index p-d-flex p-flex-column p-jc-start p-ai-end"
                >
                  <h4>#{{ slotProps.data.id }}</h4>
                </div>
              </div>
              <div class="bottom p-d-flex p-flex-row p-jc-between p-ai-center">
                <div
                  class="bottom-texts p-d-flex p-flex-row p-jc-start p-ai-end"
                >
                  <div
                    class="
                      textsInfos
                      p-d-flex p-flex-row p-jc-start p-ai-center p-ml-2
                    "
                  >
                    <i class="pi pi-flag p-mr-2" />
                    <span class="p-mr-3"><strong>{{limitText(slotProps.data.idStatusFK.nome,15)}}</strong></span>
                  </div>
                  <div
                    class="
                      textsInfos
                      p-d-flex p-flex-row p-jc-start p-ai-center
                    "
                  >
                    <i class="pi pi-map-marker p-mr-2" />
                    <span class="p-mr-3"
                      ><strong>{{limitText(slotProps.data.idAmbienteFK.nome,30)}}</strong></span
                    >
                  </div>
                  <div
                    class="
                      textsInfos
                      p-d-flex p-flex-row p-jc-start p-ai-center
                    "
                  >
                    <i class="pi pi-users p-mr-2" />
                    <span class="p-mr-3"><strong>{{limitText(slotProps.data.responsaveis[0].idUsuarioFK.nome,12)}}</strong></span>
                  </div>
                </div>
                <div
                  class="bottom-index p-d-flex p-flex-column p-jc-end p-ai-end"
                >
                  <div
                    class="
                      buttons-container
                      p-d-flex p-flex-column p-jc-center p-ai-center
                    "
                  >
                    <div
                      class="container-up p-d-flex p-flex-row p-jc-end p-ai-end"
                    >
                      <button class="progressTask">
                        <i class="pi pi-arrow-circle-right" />
                      </button>
                      <button class="editTask">
                        <i class="pi pi-pencil" />
                      </button>
                    </div>
                    <div
                      class="
                        container-down
                        p-d-flex p-flex-row p-jc-end p-ai-end
                      "
                    >
                      <button class="deleteTask" v-on:click="deleteTask(slotProps.data.id)">
                        <i class="pi pi-trash" />
                      </button>
                      <button class="printTask">
                        <i class="pi pi-print" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="statusTask"
            v-if="
              slotProps.data.nome !== null && slotProps.data.nome !== undefined
            "
          ></div>
        </div>
      </template>
      <!--
    <template #grid="slotProps">
      <div class="col-12 md:col-4">
        <div class="product-grid-item card">
          <div class="product-grid-item-top">
            <div>
              <i class="pi pi-tag product-category-icon"></i>
              <span class="product-category">{{
                slotProps.data.category
              }}</span>
            </div>
            <span
              :class="
                'product-badge status-' +
                slotProps.data.inventoryStatus.toLowerCase()
              "
              >{{ slotProps.data.inventoryStatus }}</span
            >
          </div>
          <div class="product-grid-item-content">
            <img
              :src="'demo/images/product/' + slotProps.data.image"
              :alt="slotProps.data.name"
            />
            <div class="product-name">{{ slotProps.data.name }}</div>
            <div class="product-description">
              {{ slotProps.data.description }}
            </div>
            <Rating
              :value="slotProps.data.rating"
              :readonly="true"
              :cancel="false"
            ></Rating>
          </div>
          <div class="product-grid-item-bottom">
            <span class="product-price">${{ slotProps.data.price }}</span>
            <Button
              icon="pi pi-shopping-cart"
              :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"
            ></Button>
          </div>
        </div>
      </div>
    </template>-->
    </DataView>
  </div>
</template>

<script>
export default {
  name: "tarefas",
  layout: "default",
  // middleware: 'auth',
  data() {
    return {
      products: null,
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
        { label: "Mais Recentes", value: "!price" },
        { label: "Abertas", value: "price" },
        { label: "Em Andamento", value: "price" },
        { label: "Concluídas", value: "price" },
      ],
      //useful
      BaseURL: "http://localhost:8003/",
      BaseURL2: "http://localhost:8003",
      layout: "grid",
      tasks: null,
      totalTasks: null,
      totalPages: null,
      taskPage: 1,
      taskPagesLoaded: [],
      filterKey: null,
      filterOptions: [
        { label: "Todas", value: "!price" },
        { label: "Abertas", value: "price" },
        { label: "Em Andamento", value: "price" },
        { label: "Concluídas", value: "price" },
        { label: "Usuários", value: "price" },
      ],
      selectedFilter: null,
      filteredSuggestions: null,
    };
  },
  productService: null,
  created() {
    // this.productService = new ProductService();
  },
  mounted() {
    // this.productService.getProducts().then(data => this.products = data);
    this.getTask(1);
  },

  methods: {
    limitText: function (data, limit) {
      if (data !== null && data !== undefined) {
        if (data.length > limit) return data.slice(0, limit) + "...";
        else return data;
      } else return data;
    },
    onSortChange(event) {
      // const value = event.value.value;
      // const sortValue = event.value;
      // if (value.indexOf("!") === 0) {
      //   this.sortOrder = -1;
      //   this.sortField = value.substring(1, value.length);
      //   this.sortKey = sortValue;
      // } else {
      //   this.sortOrder = 1;
      //   this.sortField = value;
      //   this.sortKey = sortValue;
      // }
    },
    onPage(event) {
      console.log("event:");
      console.log(event);

      if (event.page === event.pageCount - 1) {
        if (event.page !== 2) {
          console.log("REQUISITANDO " + (this.taskPage + 1));
          this.getTask(this.taskPage + 1);
        }
      }
    },
    getTask: async function (page) {
      if (!this.taskPagesLoaded.includes(page)) {
        await this.$axios
          .$get(this.BaseURL + ("tarefas/?page=" + page))
          .then((response) => {
            console.log(response);
            //request ok
            if (response.total > 0) {
              this.totalTasks = response.total;
              this.totalPages = response.pages;
              this.taskPagesLoaded.push(page);

              //first time
              if (this.tasks === null) {
                this.tasks = structuredClone(response.data);
                this.taskPage = 1;

                const timeChangeLayout = setTimeout(() => {
                  this.layout = "list";
                }, 1000);
              }
              //it's not a first time
              else {
                //check if it is not loaded
                response.data.map((task) => {
                  this.tasks.push(structuredClone(task));
                });
                this.taskPage = page;
                console.log("this.tasks");
                console.log(this.tasks);
              }
              this.getAllTaskUsers();
            }
          })
          .catch((response) => {
            alert("Problema ao tentar coletar as tarefas");
            console.log(response);
          });
      } else {
        console.log("JÁ CARREGADO!!");
      }
    },
    getTasksUsers: function (task) {
      console.log("solicitando task user tarefa: " + task)

      return this.$axios
        .$get(this.BaseURL + ("tarefasUsuarios/?tarefa=" + task))
        .then((response) => {
          // console.log("response Task User");
          // console.log(response);
          //request ok
          if (response.data !== null && response.data !== undefined) {
            return response.data;
          }
        })
        .catch((response) => {
          alert("Problema ao tentar pega Usuário da tarefa " + task);
          console.log(response);
          return null;
        });
    },
    getAllTaskUsers: async function () {

      console.log("before tasks")
      console.log(this.tasks)
   
      if (this.tasks !== null) {
        for(let i=0; i<this.tasks.length; i++) {
          if(this.tasks[i].responsaveis === undefined) {
              console.log("precisa solicitar para " + this.tasks[i].id)              
              this.tasks[i].responsaveis = await this.getTasksUsers(this.tasks[i].id);              
            }
            else{
              console.log("NÃO precisa solicitar")
            }           
        }

        console.log("TERMINOU ITERAÇÃO!");
        console.log(this.tasks);
        this.getAllTaskPhotos();
      }
    },
    getTaskPhotos: function (task) {
      console.log("solicitando task FOTO tarefa: " + task)

      return this.$axios
        .$get(this.BaseURL + ("fotos/?tarefa=" + task))
        .then((response) => {
          
          //request ok
          if (response.data !== null && response.data !== undefined) {
            return response.data;
          }
        })
        .catch((response) => {
          alert("Problema ao tentar pegar FOTOS da tarefa " + task);
          console.log(response);
          return null;
        });
    },
    getAllTaskPhotos: async function () {    
   
      if (this.tasks !== null) {
        for(let i=0; i<this.tasks.length; i++) {
          if(this.tasks[i].fotos === undefined) {
              console.log("precisa solicitar FOTO para " + this.tasks[i].id)              
              this.tasks[i].fotos = await this.getTaskPhotos(this.tasks[i].id);              
            }
            else{
              console.log("NÃO precisa solicitar")
            }           
        }
       
        console.log("TERMINOU ITERAÇÃO DAS FOTOS!");
        console.log(this.tasks)
      }
    },
    deleteTask: function(taskId){

       this.$axios
          .$delete(this.BaseURL + ("tarefas/" + taskId))
          .then((response) => {
            //request ok
            if (response !== null) {
              //remove
              this.tasks.map((task,index)=>{
                if(task.id === taskId)
                  this.tasks.splice(index, 1);
                  console.log("excluindo index" + index)
              });
            }
          })
          .catch((response) => {
            alert("Problema ao tentar deletar a tarefa");
            console.log(response);
          });
    }
  },
};
</script>

<style lang="scss" scoped>
.allTasks {
  * {
    overflow-x: visible;
  }

  height: auto;
  min-height: calc(100vh - var(--height-default-header));
  width: 100vw;
  max-width: 100vw;

  #titleTasks {
    overflow-x: visible !important;
    border: none;
    background: linear-gradient(-45deg, #313131, #525d69, #c22a1f, #bd244a);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    margin: 0;
    padding: 10px;
    margin: 0px;
    color: white;
    text-align: center !important;
    height: 70px;
  }

  .dataTaskViewer {
    /* background-color: #f8f9fa; */
    background-color: #e3e7eb;
    width: 100vw;
    /* background-color: yellowgreen; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .p-dataview-header {
      overflow-x: visible;
      width: 90vw;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border: none;
      /* background-color: #c22a1f; */
      padding: 10px 0px;

      .grid-nogutter {
        /* background-color: white; */
        .taskToolBox {
          width: 90%;
          /* background-color: red; */
          .twoElements {
            div {
              /* background-color: cadetblue; */
              width: auto;
              .sortClass {
                width: 17vw;
                min-width: 140px;
                max-width: 240px;
                // max-width: ;
                margin: 0px 0px 15px 0px;
              }

              label {
                width: auto;
                margin: 0px 4px 15px 15px;
                // background-color: black;
              }
            }
          }

          .oneElement {
            // background-color: orange;
            .filteredField {
              width: auto;
              min-width: 140px;
              max-width: 240px;
              margin: 0px 0px 15px 0px;
            }

            label {
              width: 109px;
              margin: 0px 0px 15px 15px;
              // background-color: pink;
            }
          }
        }

        .viewSwitch {
          width: auto;
          height: 100%;
          /* background-color: blue; */
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          margin-left: 10px;

          .p-dataview-layout-options {
            button {
              margin: 0px 0px 5px 0px;
              border: 1px solid #c22a1f !important;
              background-color: #c22a1f !important;
            }
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
          }
        }
      }
    }

    @keyframes gradient {
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
  }

  .dataTaskViewer .p-dataview-content {
    .p-nogutter {
      .listTaskDataView {
        margin: 20px 0px;
        background-color: white !important;
        &:hover {
          background: linear-gradient(
            135deg,
            rgba(243, 223, 223, 0.8),
            rgba(226, 152, 152, 0.8)
          ) !important;
        }
        border-radius: 17px 17px 0px 0px;

        .elementListTaskDataView {
          padding: 10px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          height: 150px;
          width: 100%;
          /* background-color: yellowgreen !important; */

          .imgTaskContainer {
            margin-left: 5px;
            width: 19%;
            max-width: 250px;
            min-width: 150px;
            height: 100%;
            /* background-color: red; */
            img {
              width: 100%;
              height: 100%;
              border-radius: 17px;
            }
          }
          .itemTaskContainer {
            width: 80%;
            height: 100%;
            color: black;
            /* background-color: blue; */
            .top {
              /* background-color: yellow; */
              width: 98%;
              height: 50%;

              .top-texts {
                /* background-color: blue; */
                width: 80%;
                height: 100%;
              }
              .top-index {
                /* background-color: black; */
                width: 10%;
                height: 100%;
                h4 {
                  width: auto;
                }
              }
            }
            .bottom {
              /* background-color: orange; */
              width: 98%;
              height: 48%;

              .bottom-texts {
                /* background-color: pink; */
                width: 79%;
                height: 100%;

                .textsInfos {
                  width: auto;
                  color: #ac2117;
                  i {
                    width: 20px;
                    font-weight: bold;
                  }
                }
              }
              .bottom-index {
                /* background-color: grey; */
                width: 20%;
                height: 100%;

                .buttons-container {
                  width: 100px;
                  height: 100px;
                  /* background-color:yellowgreen; */
                  button {
                    border: none;
                    width: 27px;
                    height: 27px;
                    margin: 2px;
                    border-radius: 3px;

                    &:hover {
                      cursor: pointer;
                    }
                  }
                  .progressTask {
                    background-color: yellowgreen;
                    &:hover {
                      background-color: rgb(196, 230, 128);
                    }
                  }
                  .editTask {
                    background-color: orange;
                    &:hover {
                      background-color: rgb(246, 196, 102);
                    }
                  }
                  .deleteTask {
                    background-color: #c22a1f;
                    &:hover {
                      background-color: #d15850;
                    }
                  }
                  .printTask {
                    background-color: rgb(79, 79, 190);
                    &:hover {
                      background-color: rgb(118, 118, 223);
                    }
                  }
                }
              }
            }
          }
        }
        .statusTask {
          width: 100%;
          height: 10px;
          background-color: yellowgreen;
          box-shadow: rgb(0 0 0 / 10%) 0px 3px 6px, rgb(0 0 0 / 17%) 0px 3px 6px;
        }
      }
    }
  }

  @media screen and (max-width: 830px) {
    .bottom-texts {
      flex-direction: column !important;
      align-items: flex-start;
      padding: 4px;
      .textsInfos {
        padding-top: 3px;
      }
    }
  }

  @media screen and (max-width: 670px) {
    .top-texts {
      h3 {
        font-size: 15px;
      }
      span {
        font-size: 13px;
      }
    }
    .bottom-texts .textsInfos {
      font-size: 13px !important;
    }

    .listTaskDataView {
      margin: 10px 0px !important;

      .elementListTaskDataView {
        height: 130px !important;
      }
    }

    #titleTasks {
      font-size: 22px !important;
      height: 50px;
    }

    .dataTaskViewer {
      .taskToolBox {
        font-size: 13px;

        .sortClass,
        .filteredField {
          height: 35px;
          margin: 0px 0px 10px 0px !important;
        }
        .oneElement label {
          width: 88px !important;
        }
      }
    }
  }

  @media screen and (max-width: 570px) {
    .top-texts span {
      display: none;
    }

    .listTaskDataView {
      .elementListTaskDataView {
        height: 115px !important;

        .itemTaskContainer {
          .top {
            height: 30% !important;

            h4 {
              font-size: 13px;
            }

            .top-texts {
              h3 {
                font-size: 13px;
              }
              span {
                font-size: 12px;
              }
            }
          }
          .bottom {
            height: 70% !important;
          }
        }
      }
    }
  }

  @media screen and (max-width: 500px) {
    .top-texts {
      h3 {
        font-size: 12px !important;
      }
    }
    .top-index h4 {
      font-size: 11px !important;
    }
    .bottom-texts .textsInfos {
      font-size: 11px !important;
    }

    .listTaskDataView {
      .elementListTaskDataView {
        height: 105px !important;

        .imgTaskContainer {
          min-width: 90px !important;
          height: 80% !important;
        }
      }
    }

    .dataTaskViewer {
      .taskToolBox {
        font-size: 13px;

        .sortClass,
        .filteredField {
          height: 35px;
          margin: 0px 0px 10px 0px !important;
        }
        .oneElement label {
          width: 105px !important;
        }
        .twoElements {
          flex-direction: column !important;
          label {
            width: 103px !important;
          }
        }
      }
    }
  }

  @media screen and (max-width: 405px) {
    .listTaskDataView {
      .elementListTaskDataView {
        .imgTaskContainer {
          margin-left: 0px !important;
          width: 15%;
          min-width: 50px !important;
          height: 80% !important;
        }
      }
    }
  }

  @media screen and (max-width: 360px) {
    .listTaskDataView {
      .elementListTaskDataView {
        .imgTaskContainer {
          display: none;
        }

        .itemTaskContainer {
          width: 100% !important;
        }
      }
    }
  }

  @media screen and (max-width: 335px) {
    #titleTasks {
      font-size: 18px !important;
    }
    .dataTaskViewer {
      .taskToolBox {
        font-size: 12px;

        .sortClass,
        .filteredField {
          height: 33px !important;
          margin: 0px 0px 4px 0px !important;
        }
        .oneElement {
          /* align-items: flex-start; */
          .filteredField {
            width: 140px !important;
          }
          label {
            width: 57px !important;
          }
        }

        .twoElements {
          div {
            /* align-items: flex-start; */
            label {
              width: 55px !important;
            }
          }
        }
      }
    }
  }
}
</style>