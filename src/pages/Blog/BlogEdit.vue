<template>
  <div class="row">
    <!-- /.col-md-6 -->
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <h5 class="m-0">Edit Blog Post</h5>
        </div>
        <div class="card-body">
          <app-blog-form v-if="blog" :blog="blog" @submitting="updateBlogPost"
                         type="edit"
                         :isSubmitting="isSubmitting"></app-blog-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBlogForm from "@/components/appBlogForm";
import BlogPostsService from "@/services/blogPosts.Service";
import blogPostsService from "@/services/blogPosts.Service";

export default {
  name: "BlogEdit",
  components: {AppBlogForm},
  data() {
    return {
      user: null,
      blog: null,
      isSubmitting: false,
      slug: ''
    };
  },
  async created() {
    this.user = this.$store.state.auth.user;
    this.slug = this.$route.params.slug;
    await BlogPostsService.getBlogPost(this.slug)
        .then((blog) => this.blog = blog);
  },
  methods: {
    async updateBlogPost(data, actions, obj) {
      var formData = new FormData();
      formData.append('image', obj.$refs.file.files[0]);
      formData.append('title', data.title);
      formData.append('content', data.content);
      this.isSubmitting = true;
      await blogPostsService.updateBlogPost(this.slug, formData)
          .then((blog) => {
            // redirect to blog page
            this.$router.push({
              name: 'blogDetails',
              params: {
                slug: blog.slug
              }
            });
          }).catch(errors => {
            actions.setErrors(errors.errors);
          });
      this.isSubmitting = false;
    }
  }
}
</script>
