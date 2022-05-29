<template>
  <div class="row">
    <!-- /.col-md-6 -->
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <h5 class="m-0">Contact Us</h5>
        </div>
        <div class="card-body">
          <p class="card-text">We will be happy to help you.</p>
          <Form ref="form" name="editContactForm" v-slot="{ errors }" @submit="submitForm">
            <div class="form-group">
              <label for="inputName">Your Name</label>
              <Field name="name"  type="text" rules="required" class="form-control"
                     :class="{ 'is-invalid' : errors.name }" />
              <span v-if="errors.name" class="error invalid-feedback">Please enter your name.</span>
            </div>

            <div class="form-group">
              <label for="inputName">Your Email</label>
              <Field name="email"  type="email" rules="required" class="form-control"
                     :class="{ 'is-invalid' : errors.email }"/>
              <span v-if="errors.email" class="error invalid-feedback">Please enter your email.</span>
            </div>

            <div class="form-group">
              <label for="inputName">Your Message</label>
              <Field name="message"  as="textarea" rules="required" class="form-control"
                     :class="{ 'is-invalid' : errors.message }"/>
              <span v-if="errors.message" class="error invalid-feedback">Please enter your message.</span>
            </div>

            <button class="btn btn-success float-right" :disabled="isSubmitting">Send Message</button>

          </Form>
        </div>
      </div>
    </div>
    <!-- /.col-md-6 -->
  </div>
  <!-- /.row -->
</template>

<script>
import {Form, Field} from "vee-validate";
import contactUsService from "@/services/contactus.service";

export default {
  name: "ContactUs",
  data() {
    return {
      isSubmitting: false,
    };
  },
  components: {
    Form, Field,
  },
  methods: {
    async submitForm(values) {
      console.log(values);
      await contactUsService.sendMessage(values);
      this.clearForm();
    },
    clearForm() {
      this.$refs.form.resetForm();
    }
  }
}
</script>

<style scoped>
  .invalid-feedback {
    display: block;
    font-size: 15px;
    text-transform: capitalize;
  }
</style>
