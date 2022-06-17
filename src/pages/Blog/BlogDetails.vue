<template>
  <div v-if="blog" class="card">
    <img :src="blog.postImage" class="card-img-top" style="height: 400px" alt="{{ blog.title }}">
    <div class="card-body">
      <h5 class="card-title">{{ blog.title }}</h5>
      <div class="card-text">
        <span class="text-gray">By: {{ blog?.author?.name }} at
          {{ moment(blog.created_at).format('dddd, mm,YYYY HH:mm a') }}</span> <br> <br>
        <div v-html="blog.content"></div>
      </div>
      <div class="card-footer">
        <router-link class="btn btn-primary" :to="{ name: 'blogPostEdit', params: { slug: blog.slug } }">
          Edit
        </router-link>

        <button @click="deleteBlogPost" class="btn btn-danger ml-2">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPostsService from "@/services/blogPosts.Service";
import moment from "moment";
import blogPostsService from "@/services/blogPosts.Service";
export default {
  name: "BlogDetails",
  async created() {
    await BlogPostsService.getBlogPost(this.$route.params.slug)
        .then(blog => {
          this.blog = blog;
        });
  },
  data() {
    return {
      blog: null,
    };
  },
  methods: {
    moment: function () {
      return moment();
    },
    async deleteBlogPost() {
      await blogPostsService.deleteBlogPost(this.blog.slug)
          .then(() => {
            this.$router.push({ name: 'blog' });
          });
    }
  }
}
</script>
