<template>
  <Form ref="form" @submit="submitForm" v-slot="{ errors }">
    <div class="form-group">
      <label for="inputName">Name</label>
      <Field name="name"  type="text" :rules="nameRules" class="form-control"
             :value="user.name"
             :class="{ 'is-invalid' : errors.name }" />
      <span v-if="errors.name" class="error invalid-feedback">{{ errors.name }}</span>
    </div>

    <div class="form-group">
      <label for="inputName">Email</label>
      <Field name="email" type="email" :rules="emailRules" class="form-control"
             :value="user.email"
             :class="{ 'is-invalid' : errors.email }" />
      <span v-if="errors.email" class="error invalid-feedback">{{ errors.email }}</span>
    </div>

    <div class="form-group">
      <label for="inputName">Password</label>
      <Field name="password" type="password" :rules="passwordRules" class="form-control"
             :class="{ 'is-invalid' : errors.password }" />
      <span v-if="errors.password" class="error invalid-feedback">{{ errors.password }}</span>
    </div>

    <div class="form-group">
      <label for="inputName">Password Confirmation</label>
      <Field name="password_confirmation" type="password" rules="confirmed:@password" class="form-control"
             :class="{ 'is-invalid' : errors.password_confirmation }" />
      <span v-if="errors.password_confirmation" class="error invalid-feedback">Passwords don't match.</span>
    </div>

    <button class="btn btn-success float-right" :disabled="isSubmitting">{{ btnMessage }}</button>
  </Form>
</template>

<script>
import {Form, Field, defineRule} from "vee-validate";
import * as yup from "yup";

defineRule('confirmed', (value, [target]) => {
  if (value === target) {
    return true;
  }
  return 'Passwords must match';
});

let defaultUser = {
  name: '',
  email: '',
};

export default {
  components: {
    Form, Field,
  },
  data() {
    return {
      nameRules: yup.string().required().min(4).label('Name'),
      emailRules: yup.string().email().required().label('Email Address'),
      passwordRules: yup.string().optional().min(6).label('Password'),
    };
  },
  props: {
    user: {
      type: Object,
      default: defaultUser,
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
  name: "appUserForm",
  methods: {
    submitForm(values, actions) {
      this.$emit('submitting', values, actions, () => this.clearForm());
    },
    clearForm() {
      this.$refs.form.resetForm();
    }
  },
  computed: {
    btnMessage() {
      return this.type === 'add' ? 'Create New User' : 'Save User';
    }
  }
}
</script>
