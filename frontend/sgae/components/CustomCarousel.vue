<template>
  <div class="customCarousel-main" :style="cssCustom">
    <div
      :id="targetID"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="btn-mov btn-prev" v-if="photos.length > 1">
        <button
          class="carousel-control-prev"
          type="button"
          :data-bs-target="'#' + targetID"
          data-bs-slide="prev"
        >
          <span class="visually-hidden"
            ><i class="pi pi-angle-double-left"></i
          ></span>
        </button>
      </div>

      <div class="carousel-inner" v-if="photos.length > 0">
        <div class="carousel-item active">
          <ImagePreview
            :src="url + photos[0].image"
            :alt="photos[0].nome"
            preview
          />
        </div>
        <div
          class="carousel-item"
          v-for="(photo, index) in photosCopy"
          :key="index"
        >
          <ImagePreview
            v-if="photosCopy"
            :src="url + photo.image"
            :alt="photo.nome"
            preview
          />
        </div>
      </div>
      <div class="btn-mov btn-next" v-if="photos.length > 1">
        <button
          class="carousel-control-next"
          type="button"
          :data-bs-target="'#' + targetID"
          data-bs-slide="next"
        >
          <span class="visually-hidden"
            ><i class="pi pi-angle-double-right"></i
          ></span>
        </button>
      </div>
    </div>

    <script
      src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"
      integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
      integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13"
      crossorigin="anonymous"
    ></script>
  </div>
</template>

<script>
export default {
  name: "CustomCarousel",
  props: ["photos", "background", "baseURL", "targetID"],
  data() {
    return {
      photosCopy: null,
      url: this.baseURL,
    };
  },
  computed: {
    cssCustom() {
      return {
        "--myback": this.background,
      };
    },
  },
  methods: {},
  mounted() {
    if (this.photos.length > 0) {
      this.photosCopy = structuredClone(this.photos);
      this.photosCopy.shift();
      console.log("PHOTOS");
      console.log(this.photosCopy);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/layouts/css/bootstrap/bootstrap.min.css";

.customCarousel-main {
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .carousel {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .carousel-inner {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 90%;
      height: 90%;

      div .carousel-item {
        .p-image-preview-container {
          width: 100%;
          height: 100%;
        }
      }
    }
    .carousel-control-next,
    .carousel-control-prev {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      border: none;
      /* background-color: red; */
      color: black;

      width: 40px !important;
      height: 40px !important;
    }

    .btn-mov {
      height: 100%;
      width: 50px;
      /* background-color: red; */
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .carousel-control-next,
      .carousel-control-prev {
        background-color: #c22a1f;
        border-radius: 10px;

        &:hover {
          cursor: pointer;
        }

        span .pi-angle-double-left,
        span .pi-angle-double-right {
          color: white !important;
        }
      }
    }
  }

  @media screen and (max-width: 450px) {
    .btn-mov {
      height: 40px !important;
      width: 30px !important;
    }
  }
}
</style>