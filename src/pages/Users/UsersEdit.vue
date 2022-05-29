<template>
  <div class="row">
    <!-- /.col-md-6 -->
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <h5 class="m-0">Edit User</h5>
        </div>
        <div class="card-body">
          <app-user-form v-if="user" :user="user" @submitting="updateUser"
                         type="edit"
                         :isSubmitting="isSubmitting"></app-user-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usersService from "@/services/users.service";
import AppUserForm from "@/components/appUserForm";
export default {
  name: "UsersEdit",
  props: ['id'],
  components: {
    AppUserForm,
  },
  data() {
    return {
      user: null,
      isSubmitting: false,
    };
  },
  async mounted() {
    await usersService.getUser(this.$route.params.id)
        .then(response => {
          this.user = response;
        });
  },
  methods: {
    async updateUser(data, actions) {
      this.isSubmitting = true;
      await usersService.updateUser(this.$route.params.id, data)
          .then(() => {})
          .catch(errors => {
            actions.setErrors(errors.errors);
          });
      this.isSubmitting = false;
    }
  },
}
</script>
