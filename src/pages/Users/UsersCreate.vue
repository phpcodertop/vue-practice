<template>
  <div class="row">
    <!-- /.col-md-6 -->
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <h5 class="m-0">Create new User</h5>
        </div>
        <div class="card-body">
          <app-user-form @submitting="addNewUser" :isSubmitting="isSubmitting"></app-user-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppUserForm from "@/components/appUserForm";
import usersService from "@/services/users.service";
export default {
  name: "UsersCreate",
  components: {AppUserForm},
  data(){
    return {
      isSubmitting: false,
    };
  },
  methods: {
    async addNewUser(data, actions, clearForm) {
      this.isSubmitting = true;
      await usersService.addUser(data)
          .then(() => {
            clearForm();
            this.isSubmitting = false;
            this.$router.push({ name: 'users' });
          })
          .catch(errors => {
            actions.setErrors(errors.errors);
          });
    }
  }
}
</script>
