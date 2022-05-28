<template>
  <div class="row">
    <!-- /.col-md-6 -->
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header container-fluid">
          <div class="row">
            <div class="col-md-10">
              <h5 class="m-0">Contacts</h5>
            </div>
            <div class="col-md-2 float-right">
              <button class="btn btn-primary" @click="openModal">Add new contact</button>
            </div>
          </div>

        </div>
        <div class="card-body">
          <table class="table table-bordered" id="contacts-table">
            <thead>
              <tr>
                <td>#</td>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Image</td>
                <td>Actions</td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
    <!-- /.col-md-6 -->
  </div>
  <!-- /.row -->

  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Add New Contact</h5>
          <button type="button" class="close" @click="closeModal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <Form  ref="form" name="addContactForm" v-slot="{ errors }" enctype="multipart/form-data" @submit="submitForm" >
        <div class="modal-body">
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
              <Field name="first_name" type="text" rules="required" class="form-control" />
            </div>

            <div class="form-group">
              <label for="inputName">Last Name</label>
              <Field name="last_name" type="text" rules="required" class="form-control" />
            </div>

            <div class="form-group">
              <label for="inputName">Phone Number</label>
              <Field name="phone" type="phone" rules="required" class="form-control" />
            </div>

            <div class="form-group">
              <label for="inputName">Email</label>
              <Field name="email" type="email" rules="email" class="form-control" />
            </div>

            <div class="form-group">
              <label for="inputName">Landline</label>
              <Field name="landline" type="phone" class="form-control" />
            </div>

            <div class="form-group">
              <label for="inputName">Extra</label>
              <Field name="extra" as="textarea" class="form-control" />
            </div>

            <div class="form-group">
              <label for="inputName">Image</label>
              <Field name="images" class="form-control" rules="mimes:image/jpeg,image/png" v-slot="{ handleChange, handleBlur }">
                <input ref="file" type="file" @change="handleChange" @blur="handleBlur" />
              </Field>
            </div>


        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          <button type="submit" class="btn btn-primary" :class="{ 'disabled': isSubmitting }">Save Contact</button>
        </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import "datatables.net-bs4/js/dataTables.bootstrap4.min";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import $ from 'jquery';
import { Form, Field } from "vee-validate";
import ContactsService from "@/services/contacts.service";

export default {
  name: "AppContactsList",
  components: {
    Form,Field
  },
  data() {
    return {
      isSubmitting: false,
    };
  },
  beforeUnmount() {
    $('#contacts-table').DataTable().destroy();
  },
  methods: {
    async submitForm(values) {
      let formData = new FormData();
      formData.append('image', this.$refs.file.files[0]);
      formData.append('first_name', values.first_name);
      formData.append('last_name', values.last_name);
      formData.append('phone', values.phone);
      formData.append('email', values.email);
      formData.append('landline', values.landline);
      formData.append('extra', values.extra);
      this.isSubmitting = true;
      await ContactsService
          .addNewContact(formData);
      this.$forceUpdate();
      this.isSubmitting = false;
      this.closeModal();
      setTimeout(() => {
        this.$router.go(this.$router.currentRoute);
      }, 2000);
    },
    openModal() {
      $('#staticBackdrop').modal();
    },
    closeModal() {
      this.clearForm();
      $('#staticBackdrop').modal('hide');
    },
    clearForm() {
      this.$refs.form.resetForm();
    },
  },
  mounted() {
    var state = this;
    const baseURL = process.env.VUE_APP_API_URL;
    let access_token = localStorage.getItem('access_token');
    $('#contacts-table').DataTable({
      processing: true,
      serverSide: true,
      columns: [
        { data: 'id', name: 'id' },
        { data: 'first_name', name: 'first_name' },
        { data: 'last_name', name: 'last_name' },
        { data: 'email', name: 'email' },
        { data: 'phone', name: 'phone' },
        { data: 'image', render: (data) => {
            if (data === null) return '---------------';
            return '<a target="_blank" href="'+data+'"><img style="width: 100px; text-align: center"  class="img-thumbnail text-center" src="'+data+'"></a>'
          }
        },
        {
          data: 'id', render: (id) => {
            return `<button data-link="/contacts/${id}" class="editBtn btn btn-success">Edit</button>
                <button  data-id="${id}" class="deleteBtn btn btn-danger">Delete</button>`;
          }
        }
      ],
      "order": [[ 0, "desc" ]],
      ajax: {
        url: baseURL + '/contacts',
        headers: {
          Authorization: 'Bearer ' + access_token
        },
        error: function (xhr)
        {
          if (xhr.status === 401) {
            state.$store.dispatch('logout').then(() => {
              state.$router.push('/login');
            });
          }
        }
      }
    });

    setTimeout(() => {
      $('.deleteBtn').on('click',async function () {
        let id = $(this).attr('data-id');
        await ContactsService.deleteContact(id);
        setTimeout(() => {
          state.$router.go(state.$router.currentRoute);
        }, 1000);
      });
      $('.editBtn').on('click', function () {
        let url = $(this).attr('data-link');
        state.$router.push(url);
      });
    }, 1000);
  }
}
</script>
