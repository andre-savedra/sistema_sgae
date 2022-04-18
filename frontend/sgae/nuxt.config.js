export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "SGAE - Gestão Ambientes",
    htmlAttrs: {
      lang: "pt",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/layouts/css/primeflex.min.css",
    "@/layouts/scss/generalvariables.scss",
    "@/layouts/scss/generalStyle.scss",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    
  ],

  // publicRuntimeConfig:{
  //   DIR_NAME_USERS: "usuarios",
  //   SECRET_ACESSKEY_ID: "qualquer",
  //   ACCESSKEY_ID: "qualquer",
  //   BUCKET_NAME: "sgae-storage",
  //   REGION: "us-east-1",
  // },

  primevue: {
    theme: "saga-blue",
    ripple: true,
    components: [
      "Button",
      "Sidebar",
      "Avatar",
      "Chart",
      "Dropdown",
      "Tooltip",
      "Message",
      "Accordion",
      "Password",
      "RadioButton",
      "InputText",
      "InputMask",
      "AutoComplete",
      "Calendar",
      "FileUpload",
      "DataView",
      "DataViewLayoutOptions",
      "Carousel",
      "ImagePreview",
      "Timeline",
      "Dialog"
    ],
    locale: {
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
  },

  googleFonts: {
    families: {
      Roboto: true,
      "Varela+Round": true,
    },
  },

 

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "@nuxtjs/google-fonts",
    "primevue/nuxt",
    "pdfmake"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: '/',
  },

  env:{
    BASE_URL: process.env.BASE_URL
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: (process.env.BASE_URL + "/api/v1/auth/token/login/"),
            method: "post",
            propertyName: "auth_token",
          },
          logout: {
            url: (process.env.BASE_URL + "/api/v1/auth/token/logout/"),
            method: "post",
            propertyName: "auth_token",
          },
          user: {
            url: (process.env.BASE_URL + "/api/v1/users/me/"),
            method: "get",
            propertyName: false,
          },
        },
        tokenType: "Token",
        tokenName: "Authorization",
      },
    },
    redirect: {
      login: "/",
      home: "/lobby",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
