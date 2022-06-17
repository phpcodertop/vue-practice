<template>
  <Form ref="form" @submit="submitForm" v-slot="{ errors }" enctype="multipart/form-data">

    <div class="form-group">
      <label for="inputName">Title</label>
      <Field name="title"  type="text" rules="required" class="form-control"
             :value="blog.title"
             :class="{ 'is-invalid' : errors.title }" />
      <span v-if="errors.title" class="error invalid-feedback">{{ errors.title }}</span>
    </div>

    <div class="form-group">
      <label for="inputName">Content</label>
      <Field name="content" as="textarea" rules="required" class="form-control"
             :value="blog.content"
             :class="{ 'is-invalid' : errors.content }"
             rows="10" />
      <span v-if="errors.content" class="error invalid-feedback">{{ errors.content }}</span>
    </div>

    <div class="form-group">
      <label for="inputName">Image</label>
      <Field  name="image" class="form-control" rules="mimes:image/jpeg,image/png" v-slot="{ handleChange, handleBlur }">
        <input ref="file" type="file" @change="handleChange" @blur="handleBlur" />
      </Field>
    </div>

    <div class="form-group">
      <Field name="published" type="checkbox"  :checked="blog.published" :value="blog.published" /> Published
    </div>

    <button class="btn btn-success float-right" :disabled="isSubmitting">{{ btnMessage }}</button>
  </Form>
</template>

<script>
import {Field, Form} from "vee-validate";

let defaultBlogPost = {
  title: '',
  content: '',
  image: null,
  published: ''
};

export default {
  name: "appBlogForm",
  components: {
    Form, Field,
  },
  props: {
    blog: {
      type: Object,
      default: defaultBlogPost,
    },
    isSubmitting: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'add'
    }
  },
  methods: {
    submitForm(values, actions) {
      this.$emit('submitting', values, actions, this ,() => this.clearForm());
    },
    clearForm() {
      this.$refs.form.resetForm();
    }
  },
  computed: {
    btnMessage() {
      return this.type === 'add' ? 'Create New Blog Post' : 'Save blog Post';
    }
  }
}
</script>
