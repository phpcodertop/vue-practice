<template>
  <transition name="fade">
    <div class="loading" v-show="loading">
      <span class="fa fa-spinner fa-spin"></span> Loading
    </div>
  </transition>

  <div class="row" v-if="blogPosts.length === 0">
    <div class="col-md-12">
      <p class="alert alert-danger text-center">
        There are no data.
        <a href="#">Add New</a>
      </p>
    </div>
  </div>

  <div class="row" v-else>
    <div class="col-md-6" v-for="post in blogPosts" :key="post.id">
      <router-link class="text-muted" :to="{ name: 'blogDetails', params: { slug: post.slug }}">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            {{post.title}}
          </h3>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <img :src="post.postImage" alt="" class="img-fluid pad">
        </div>
        <!-- /.card-body -->
      </div>
      </router-link>
    </div>
  </div>

</template>

<script>
import blogPostsService from "@/services/blogPosts.Service";
import $ from 'jquery';
import {useToast} from "vue-toastification";
const toast = useToast();

export default {
  name: "BlogListInfiniteScroll",
  data() {
    return {
      loading: false,
      blogPosts: [],
      currentPage: 1,
      next_page_url: null,
      initial_state: true,
    };
  },
  beforeRouteLeave() {
    this.currentPage = 1;
    this.blogPosts = [];
    this.next_page_url = null;
    this.initial_state = true;
  },
  async mounted() {
    await this.loadMore();
    let state = this;
    $(window).scroll(async function () {
      if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
        if (state.initial_state === true
            && state.next_page_url == null && state.blogPosts.length > 0) {
          toast.error('There are no more blog posts.');
          state.initial_state = false;
          return;
        } else {
          state.currentPage++;
          await state.loadMore();
        }
      }
    });
  },
  methods: {
    async loadMore() {
      this.loading = true;
      await blogPostsService.getBlogPosts(this.currentPage)
          .then(response => {
            this.next_page_url = response.next_page_url;
            this.blogPosts.push(...response.data);
          });
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.loading {
  text-align: center;
  position: fixed;
  color: #fff;
  z-index: 9;
  background: purple;
  padding: 8px 18px;
  border-radius: 5px;
  left: calc(50% - 45px);
  top: calc(50% - 18px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>

