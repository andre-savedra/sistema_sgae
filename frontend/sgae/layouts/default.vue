<template>
  <div class="p-d-flex p-flex-column default-main">
    <div class="default-header p-d-flex p-flex-row p-jc-between p-ai-center">
      <div
        class="default-header-left p-d-flex p-flex-row p-jc-between p-ai-center"
      >
        <button
          class="pi pi-bars p-mr-2 p-ml-3 btn-leftbar normal-dark-btn"
          v-on:click="checkSideBarVisibility"
        ></button>

        <img
          class="p-mr-3"
          id="default-senai-logo"
          src="senai-logo.png"
          alt="Logo Senai"
        />
      </div>

      <div
        class="default-header-right p-d-flex p-flex-row p-jc-end p-ai-center"
      >
        <Profile
          v-if="profileLoaded"
          :user="actualUser"
          text_color="white"
          back_color="#313131"
        />
      </div>

      <Sidebar
        :visible.sync="visibleLeft"
        :dismissable="false"
        :baseZIndex="1000"
        :showCloseIcon="false"
        class="default-sidebar p-sidebar-md"
      >
        <div
          class="
            p-d-flex p-flex-column p-jc-center p-ai-center
            btnsidecontainer
          "
        >
          <div
            v-for="(btn, index) in sidebarMenuButtons"
            :key="index"
            class="p-d-flex p-flex-column p-jc-center p-ai-center"
          >
            <!-- btn.showButton -->
            <p v-if="btn.showButton" class="p-text-center default-sidebar-text">
              {{ btn.textLabel }}
            </p>
            <Button
              v-if="btn.showButton"
              :el="index"
              :icon="btn.iconBtn"
              iconPos="right"
              class="default-sidebar-btn p-mb-2 p-button-danger p-button-text"
              @click="checkSecondSideBarVisibility"
            />
          </div>
        </div>
      </Sidebar>

      <!-- <Sidebar
        v-for="(second_sidebar, index) in sidebarMenuButtons"
        :key="index"
        :visible.sync="sidebarMenuButtons[index].showSidebar"
        :dismissable="false"
        :baseZIndex="900"
        :showCloseIcon="false"
        :class="'default-second-sidebar-' + index + ' p-sidebar-md'"
      >
        <div v-if="second_sidebar.sideButtons">
          <div
            v-for="(second_element, idElement) in second_sidebar.sideButtons"
            :key="idElement"
            
          >
            <Button
              icon="pi pi-home"
              :label="sidebarMenuButtons[index].sideButtons[idElement].textLabel"
              class="p-button-text p-button-danger"
              @click="teste('Click')"
            />
          </div>
        </div>
      </Sidebar> -->
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: "default",
  data() {
    return {
      visibleLeft: false,
      profileLoaded: false,
      actualUser: null,
      sidebarMenuButtons: [
        {
          textLabel: "Recuar",
          iconBtn: "pi pi-arrow-circle-left",
          showButton: true,
          adminButton: false,
          showSidebar: false,
          hasSidebar: false,
          sideButtons: null,
        },
        {
          textLabel: "Home",
          iconBtn: "pi pi-home",
          showButton: true,
          adminButton: false,
          showSidebar: false,
          hasSidebar: false,
          sideButtons: null,
        },
        {
          textLabel: "Tarefas",
          iconBtn: "pi pi-book",
          showButton: true,
          adminButton: false,
          showSidebar: false,
          hasSidebar: false,
          sideButtons: null,
        },
        {
          textLabel: "Ad. Tarefa",
          iconBtn: "pi pi-check-square",
          showButton: true,
          adminButton: false,
          showSidebar: false,
          hasSidebar: false,
          sideButtons: null,
        },       
        {
          textLabel: "Meu Acesso",
          iconBtn: "pi pi-user",
          showButton: true,
          adminButton: false,
          showSidebar: false,
          hasSidebar: false,
          sideButtons: null,
        },
        {
          textLabel: "Usuários",
          iconBtn: "pi pi-users",
          showButton: true,
          adminButton: false,
          showSidebar: false,
          hasSidebar: false,
          sideButtons: null,
        },
        {
          textLabel: "Logout",
          iconBtn: "pi pi-sign-out",
          showButton: true,
          adminButton: false,
          showSidebar: false,
          hasSidebar: false,
          sideButtons: null,
        },
      ],
    };
  },
  methods: {
    //  reloadButtons() {
    //   console.log("reloading buttons....");
    //   for (let i = 0; i < this.sidebarMenuButtons.length; i++) {
    //     if (this.sidebarMenuButtons[i].adminButton == true) {
    //       this.sidebarMenuButtons[i].showButton = this.$store.state.user.admin;
    //     }
    //   }
    // },
    teste(msg) {
      console.log("Hello " + msg);
    },
    resetSidebarMenu() {
      for (let i = 0; i < this.sidebarMenuButtons.length; i++) {
        this.sidebarMenuButtons[i].showSidebar = false;
      }
    },
    checkSideBarVisibility() {
      this.visibleLeft = !this.visibleLeft;
      if (this.visibleLeft === false) {
        //this.resetSidebarMenu();
      }
    },
    checkSecondSideBarVisibility(element) {
      const el = element.target;
      let buttonNumber = parseInt(el.parentElement.getAttribute("el"));

      if (isNaN(buttonNumber)) buttonNumber = parseInt(el.getAttribute("el"));

      if (this.sidebarMenuButtons[buttonNumber].hasSidebar === true) {
        if (this.sidebarMenuButtons[buttonNumber].showSidebar === false) {
          this.resetSidebarMenu();
          this.sidebarMenuButtons[buttonNumber].showSidebar = true;
        } else {
          this.resetSidebarMenu();
        }
      }

      //logicall to each button
      switch (buttonNumber) {
        
        case 0://button "Recuar"
          this.checkSideBarVisibility();
          break;
        
        case 1: //button "Home"
          this.$router.push("/home");
          this.checkSideBarVisibility();
          break;

        case 2: //button "Tarefas"
          this.$router.push("/tarefas");
          this.checkSideBarVisibility();
          break;

        case 3: //button "ad. Tarefa"          
          this.$router.push("/addTarefa");
          this.checkSideBarVisibility();
          break;
       
        case 4: //button "Meu acesso"
          this.$router.push("/meuAcesso");          
          this.checkSideBarVisibility();
          break;

        case 5: //button "Usuários"
          this.$router.push("/usuarios");          
          this.checkSideBarVisibility();
          break;

        case 6: //button "logout"
          this.$router.push("/");          
          this.checkSideBarVisibility();
          break;

      }
    },
    getUsuarios: async function (userId) {
      await this.$axios
        .get("http://localhost:8003/usuarios/" + userId)
        .then((dataResponse) => {
          // console.log(dataResponse.data);
          this.actualUser = dataResponse.data;
          this.actualUser.image = "userimg-1.jpg";
          this.profileLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    (this.actualUser = null), this.getUsuarios(38);
  },
};
</script>

<style lang="scss">
@import "@/layouts/scss/reset.scss";

$sidebar_second_positions: 150px, 220px, 220px, 300px;

.default-main {
  width: 100vw;
  height: auto;
  min-height: 100vh;

  .default-header {
    height: var(--height-default-header);
    width: 100vw;
    background-color: var(--dark-background-color);

    .default-header-left {
      width: 20vw;
      min-width: 190px;
      max-width: 250px;
      height: 100%;

      .btn-leftbar {
        font-size: 25px;
        height: 100%;
        width: auto;
        padding: 10px;
      }

      #default-senai-logo {
        width: 60%;
        max-width: 150px;
        min-width: 110px;
        height: 60%;
        max-height: 38px;
        min-height: 28px;
        border-radius: 2px;
      }
    } //default-header-left

    .default-header-right {
      width: 15vw;
      min-width: 200px;
      max-width: 250px;
      height: 100%;
    } //default-header-right

    .default-sidebar {
      width: 8vw;
      min-width: 55px;
      max-width: 110px;
      height: calc(100% - var(--height-default-header));
      top: var(--height-default-header);
      color: white;
      background-color: var(--red-background-color);
      border-radius: 0px 10px 10px 0px;
       
        .p-sidebar-content::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.9);
          border-radius: 10px;
          background-color: #cccccc;
        }
        .p-sidebar-content::-webkit-scrollbar {
          width: 12px;
          background-color: #d62929;
        }
        .p-sidebar-content::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: #af1d1d ;
          background-image: -webkit-linear-gradient(
            90deg,
            transparent,
            rgba(0, 0, 0, 0.4) 50%,
            transparent,
            transparent
          );
        }
      

      .p-sidebar-content {
        padding: 0;
      }

      .default-sidebar-btn {
        .p-button-icon {
          color: white;
          font-size: 25px;

          &:hover {
            color: var(--dark-text-color-hover);
            transform: scale(1.15);
          }
        }
        &:focus {
          .p-button-icon {
            // color: var(--red-background-color-hover);
            color: var(--dark-background-color);
            transform: scale(1.15);
          }
        }
      }
    } //default-sidebar

    $i: 0;

    @each $position in $sidebar_second_positions {
      .default-second-sidebar-#{$i} {
        border-radius: 0px 15px 15px 0px;
        width: 15vw;
        /* margin-left: 108px; */
        min-width: 55px;
        max-width: 210px;
        // height: calc(100% - var(--height-default-header));
        height: 150px;
        top: $position;
        // top: var(--height-default-header);
        color: white;
        background-color: var(--dark-background-color);
      } //default-sidebar

      $i: $i + 1;
    }
  } //.default-header
}

.p-component-overlay {
  background-color: rgba(0, 0, 0, 0) !important;
}

@media screen and (max-width: 1290px) {
  .default-sidebar {
    .default-sidebar-text {
      font-size: 12px;
    }
  }
}

@media screen and (max-width: 1060px) {
  .default-sidebar {
    .default-sidebar-text {
      font-size: 10px;
    }
  }
}

@media screen and (max-width: 905px) {
  .default-sidebar {
    .default-sidebar-text {
      display: none;
    }
  }
}

@media screen and (max-width: 400px) {
  #default-senai-logo {
    display: none;
  }

  .default-main {
    .default-header {
      height: var(--height-default-header-mobile);
      .default-header-right {
        min-width: 100px;
      } //default-header-right

      .default-sidebar {
        height: calc(100% - var(--height-default-header-mobile));
        top: var(--height-default-header-mobile);

        .default-sidebar-text {
          font-size: 15px;
        }
      }
    }
  }
}
</style>