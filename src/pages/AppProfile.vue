<template>
  <div class="row">
    <!-- /.col-md-6 -->
    <div class="col-lg-12" v-if="user">
      <Form v-slot="{ errors }" @submit="submitForm">
      <div class="card">
        <div class="card-header">
          <h5 class="m-0">Edit Profile</h5>
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
            <label>Your Name</label>
            <Field type="text" name="name" :value="user.name"
                   class="form-control" :rules="nameRules" placeholder="Enter email" />
          </div>
          <div class="form-group">
            <label>Email address</label>
            <Field type="email" name="email"  :value="user.email"
                   class="form-control" :rules="emailRules" placeholder="Enter email" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <Field type="password" name="password" class="form-control" :rules="passwordRules" placeholder="Enter password if you want to change it" />
          </div>
          <div class="form-group">
            <label>Password Confirmation</label>
            <Field type="password" name="password_confirmation" class="form-control"
                   rules="confirmed:@password" placeholder="Enter password confirmation" />
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-success float-right">Save profile</button>
        </div>
      </div>
      </Form>
    </div>
    <!-- /.col-md-6 -->
  </div>
  <!-- /.row -->
</template>

<script>
import {Form, Field, defineRule} from "vee-validate";
defineRule('confirmed', (value, [target]) => {
  if (value === target) {
    return true;
  }
  return 'Passwords must match';
});

import * as yup from "yup";
export default {
  name: "AppProfile",
  data() {
    return {
      user: null,
      nameRules: yup.string().required().min(4).label('Name'),
      emailRules: yup.string().email().required().label('Email Address'),
      passwordRules: yup.string().optional().min(6).label('Password'),
    };
  },
  components: {
    Form, Field,
  },
  methods: {
    submitForm(values) {
      this.$store.dispatch('updateProfile', values).then(() => {
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  watch: {
    '$store.state.auth.user': function () {
      this.user = this.$store.state.auth.user;
    }
  },
  created() {
    this.user = this.$store.state.auth.user;
  }
}
</script>

<style scoped>

</style>
