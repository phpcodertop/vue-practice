<template>
  <div class="row">
    <!-- /.col-md-6 -->
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <h5 class="m-0">Upload New Image</h5>
        </div>
        <div class="card-body">
          <DropZone
              :maxFileSize="600000000"
              :acceptedFiles="['image']"
              :url="formUrl"
              @uploaded="uploaded"
              :uploadOnDrop="true"
              :multipleUpload="false"
              :parallelUpload="3"/>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <!-- /.col-md-6 -->
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <h5 class="m-0">Gallery</h5>
        </div>
        <div class="card-body">
            <div class="row pswp-gallery" id="imageGallery">
              <div class="col-md-3 pswp-gallery__item" v-for="image in images" :key="image.id">
                <a
                    :href="image.fullPath"
                    :data-pswp-width="900"
                    :data-pswp-height="900"
                    target="_blank"
                    rel="noreferrer"
                >
                  <img class="img-thumbnail" :src="image.fullPath" alt="" />
                </a>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import galleryService from "@/services/gallery.service";
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import DropZone from 'dropzone-vue';
import 'dropzone-vue/dist/dropzone-vue.common.css';


export default {
  name: "app-gallery",
  components: {
    DropZone,
  },
  methods: {
    async uploaded() {
      await galleryService
          .getImages()
          .then((images) => this.images = images);
    }
  },
  data() {
    return {
      images: [],
      lightbox: null,
      formUrl: process.env.VUE_APP_API_URL + '/gallery',
      myDropzone: null
    };
  },
  async created() {
    await galleryService
        .getImages()
        .then((images) => this.images = images);

    this.lightbox = new PhotoSwipeLightbox(
        {
          gallery: '#imageGallery',
          children: 'a',
          pswpModule: () => import('photoswipe'),
          wheelToZoom: true
        }
    );
    this.lightbox.init();
    DropZone.autoDiscover = false;

  },
  unmounted() {
    if (this.lightbox) {
      this.lightbox.destroy();
      this.lightbox = null;
    }
  },
}
</script>
<style type="css">
@import 'photoswipe/dist/photoswipe.css';
</style>
