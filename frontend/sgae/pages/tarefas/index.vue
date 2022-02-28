<template>
  <div class="allTasks p-d-flex p-flex-column p-jc-start p-ai-center">
    <h1 id="titleTasks">Tarefas cadastradas</h1>
    <DataView
      :value="tasks"
      :layout="layout"
      :paginator="true"
      :rows="9"
      :sortOrder="sortOrder"
      :sortField="sortField"
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
        <div class="col-12">
          <div class="product-list-item">
            <img src="@/static/post.jpg" alt="slotProps.data.name" />
            <div class="product-list-detail">
              <div class="product-name">slotProps.data.name</div>
              <div class="product-description">slotProps.data.description</div>
              <Rating :readonly="true" :cancel="false"></Rating>
              <i class="pi pi-tag product-category-icon"></i
              ><span class="product-category">slotProps.data.category</span>
            </div>
            <div class="product-list-action">
              <span class="product-price">$$$$$$$</span>
              <Button
                icon="pi pi-shopping-cart"
                label="Add to Cart"
                :disabled="false"
              ></Button>
              <span class="product-badge status"
                >slotProps.data.inventoryStatus
              </span>
            </div>
          </div>
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
      layout: "grid",
      tasks: null,
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
    this.getTask();
  },
  methods: {
    onSortChange(event) {
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf("!") === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.sortKey = sortValue;
      } else {
        this.sortOrder = 1;
        this.sortField = value;
        this.sortKey = sortValue;
      }
    },

    getTask: async function () {
      await this.$axios
        .$get(this.BaseURL + "tarefasUsuarios/")
        .then((response) => {
          console.log(response);
          //request ok
          if (response.length > 0) {
            this.tasks = structuredClone(response);
            console.log(this.tasks);
          }
        })
        .catch((response) => {
          alert("Problema ao tentar coletar as tarefas");
          console.log(response);
        });
    },
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

  img {
    width: 200px;
    height: 200px;
  }

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
        background-color: white;
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
  @media screen and (max-width: 670px) {
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

  @media screen and (max-width: 500px) {
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