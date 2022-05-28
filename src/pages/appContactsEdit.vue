<template>
  <div class="row">
    <!-- /.col-md-6 -->
    <div class="col-lg-12">
      <Form v-if="contact" ref="form" name="editContactForm" v-slot="{ errors }" enctype="multipart/form-data" @submit="submitForm">
        <div class="card">
          <div class="card-header container-fluid">
            <div class="row">
              <div class="col-md-2">
                <h5 class="m-0">Edit Contact</h5>
              </div>
            </div>
          </div>
          <div class="card-body">
            <template v-if="Object.keys(errors).length" >
              <div class="alert alert-danger">
                <p>Please correct the following errors</p>
                <ul>
                  <li v-for="(message, field) in errors" :key="field">
                    {{ message }}
                  </li>
                </ul>
              </div>
            </template>

            <div class="form-group">
              <label for="inputName">First Name</label>
              <Field name="first_name" :value="contact.first_name" type="text" rules="required" class="form-control" />
            </div>

            <div class="form-group">
              <label for="inputName">Last Name</label>
              <Field name="last_name" :value="contact.last_name" type="text" rules="required" class="form-control" />
            </div>

            <div class="form-group">
              <label for="inputName">Phone Number</label>
              <Field name="phone" type="phone" :value="contact.phone" rules="required" class="form-control" />
            </div>

            <div class="form-group">
              <label for="inputName">Email</label>
              <Field name="email" type="email" :value="contact.email" rules="email" class="form-control" />
            </div>

            <div class="form-group">
              <label for="inputName">Landline</label>
              <Field name="landline" type="phone" :value="contact.landline" class="form-control" />
            </div>

            <div class="form-group">
              <label for="inputName">Extra</label>
              <Field name="extra" as="textarea" :value="contact.extra" class="form-control" />
            </div>

            <div class="form-group">
              <label for="inputName">Image</label>
              <br>
              <img style="width: 50px " v-if="contact.image" :src="contact.image" alt="">
              <br>
              <br>
              <Field  name="images" class="form-control" rules="mimes:image/jpeg,image/png" v-slot="{ handleChange, handleBlur }">
                <input ref="file" type="file" @change="handleChange" @blur="handleBlur" />
              </Field>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-success float-right" :disabled="isSubmitting">Save Contact</button>
          </div>
        </div>
      </Form>
    </div>
    <!-- /.col-md-6 -->
  </div>
  <!-- /.row -->
</template>

<script>
import ContactsService from "@/services/contacts.service";
import { Form, Field } from "vee-validate";

export default {
  name: "appContactsEdit",
  components: {
    Form,Field,
  },
  data() {
    return {
      contact: null,
      isSubmitting: false,
    };
  },
  async created() {
    await ContactsService.getContact(this.$route.params.id)
        .then((data) => {
          this.contact = data;
        })
        .catch((error) => { console.log(error); });
  },
  methods: {
    async submitForm(values) {
      var formData = new FormData();
      formData.append('image', this.$refs.file.files[0]);
      formData.append('first_name', values.first_name);
      formData.append('last_name', values.last_name);
      formData.append('phone', values.phone);
      formData.append('email', values.email);
      formData.append('landline', values.landline);
      formData.append('extra', values.extra);
      this.isSubmitting = true;
      let response = await ContactsService
          .updateContact(this.$route.params.id, formData);
      this.contact = response.contact;
      this.isSubmitting = false;
    },
  }
}
</script>
