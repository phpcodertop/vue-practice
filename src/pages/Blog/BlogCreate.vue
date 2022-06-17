<template>
  <div class="row">
    <!-- /.col-md-6 -->
    <div class="col-lg-12">
        <div class="card">
          <div class="card-header container-fluid">
            <div class="row">
              <div class="col-md-6">
                <h5 class="m-0">Add new blog post</h5>
              </div>
            </div>
          </div>
          <div class="card-body">
            <app-blog-form  @submitting="submitForm"
                           type="add"
                           :isSubmitting="isSubmitting">
            </app-blog-form>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import BlogPostsService from "@/services/blogPosts.Service";
import AppBlogForm from "@/components/appBlogForm";

export default {
  name: "BlogCreate",
  components: {AppBlogForm},
  data() {
    return {
      isSubmitting: false,
    };
  },
  methods: {
    async submitForm(data, actions, obj) {
      var formData = new FormData();
      formData.append('image', obj.$refs.file.files[0]);
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('published', data.published);
      this.isSubmitting = true;
      await BlogPostsService
          .addNewBlog(formData)
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
