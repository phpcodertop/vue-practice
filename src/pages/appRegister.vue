<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="#" @click="goHome">Practice</a>
    </div>
    <!-- /.login-logo -->
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg">Register to our application</p>


        <Form  v-slot="{ errors }" @submit="submitForm">
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

          <div class="input-group mb-3">
            <Field name="name" type="text" class="form-control" placeholder="Your Name" :rules="nameRules" />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
          </div>

          <div class="input-group mb-3">
            <Field name="email" type="email" class="form-control" placeholder="Email" :rules="emailRules" />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <Field name="password" type="password" class="form-control" placeholder="Password" :rules="passwordRules" />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-8">
              <a href="#">I forgot my password</a>
            </div>
            <!-- /.col -->
            <div class="col-4">
              <button type="submit" class="btn btn-primary btn-block">Register</button>
            </div>
            <!-- /.col -->
          </div>
          <p class="mb-0 mt-2">
            Already have an account. <router-link :to="{ name: 'login' }" class="text-center">Login Now</router-link>
          </p>
        </Form>
      </div>
      <!-- /.login-card-body -->
    </div>
  </div>
  <!-- /.login-box -->
</template>

<script>
import { Field, Form } from 'vee-validate';
import * as yup from 'yup';

export default {
  name: "appLogin",
  components: {
    Field, Form
  },
  data() {
    return {
      nameRules: yup.string().required().min(4).label('Full Name'),
      emailRules: yup.string().email().required().label('Email Address'),
      passwordRules: yup.string().required().min(8).label('Password'),
    };
  },
  mounted() {
    document.body.classList.add('login-page');
  },
  methods: {
    submitForm(values, actions) {
      this.$store.dispatch('register', values).then(() => {
        document.body.classList.remove('login-page');
        let redirect = this.$route.query.redirect;
        if(redirect && redirect !== '') {
          this.$router.push(redirect);
        } else {
          this.$router.push('/');
        }
      }).catch((error) => {
        actions.setErrors(error.data.errors);
      });
    },
    goHome() {
      this.$router.push('/');
    }
  }
}
</script>
