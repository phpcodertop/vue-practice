<template>
  <div class="row">
    <!-- /.col-md-6 -->
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header container-fluid">
          <div class="row">
            <div class="col-md-10">
              <h5 class="m-0">Users List</h5>
            </div>
            <div class="col-md-2 float-right">
              <router-link :to="{ name: 'usersCreate' }" class="btn btn-primary" >Add new User</router-link>
            </div>
          </div>

        </div>
        <div class="card-body">
          <table class="table table-bordered" id="contacts-table">
            <thead>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Email</td>
              <td>Created At</td>
              <td>Actions</td>
            </tr>
            </thead>
            <tbody>
            <tr v-if="usersData.data && usersData.data.length <= 0">
              <td colspan="5">
                <p class="alert alert-dark text-center">There is no data.</p>
              </td>
            </tr>
            <tr v-for="user in usersData.data" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ moment(user.created_at).format('DD-MM-YYYY hh:mm A') }}</td>
              <td>
                <router-link
                    class="btn btn-success btn-sm"
                    :to="{ name : 'usersEdit' , params: { id: user.id } }">
                  <i class="fas fa-edit"></i> Edit
                </router-link>

                <button @click="deleteUser(user.id)"
                        class="ml-2 btn btn-sm btn-danger"><i class="fas fa-trash"></i> Delete</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer">
          <nav v-if="usersData.data && usersData.data.length > 0">
            <ul class="pagination  justify-content-center">
              <li class="page-item" :class="{ 'active' : link.active, 'disabled' : link.url == null }" :key="link.label"  v-for="link in usersData.links">
                <a class="page-link" @click="goPage(link)" href="#" v-html="link.label"></a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <!-- /.col-md-6 -->
  </div>
  <!-- /.row -->
</template>

<script>
import usersService from "@/services/users.service";
import moment from "moment";

export default {
  name: "UsersList",
  data() {
    return {
      usersData: [],
      currentPage: null,
    };
  },
  mounted() {
    this.currentPage = this.$route.query.page ?? 1;
    this.getPage();
  },
  methods: {
    moment: function () {
      return moment();
    },
    async getPage() {
      await usersService.getPage(this.currentPage).then(response => {
        this.usersData = response;
      });
    },
    goPage(link) {
      if (link.label.includes('Next')) {
        this.currentPage++;
      } else if (link.label.includes('Previous')) {
        this.currentPage--;
      } else {
        this.currentPage = link.label;
      }
      this.$router.replace(
          {
            query: Object.assign({ ...this.$route.query }, { page: this.currentPage }),
          },
          () => {}
      );
      this.getPage();
    },
    async deleteUser(id) {
      await usersService.deleteUser(id);

      if (this.usersData.data.length <= 1) {
        // go to previous page if exist
        let newPage = this.usersData.data.prev_page_url !== null
            ? this.currentPage - 1 :  1;
        await this.$router.push({name: 'users', query: {page: newPage}});
        setTimeout(() => {
          this.$router.go(this.$router.currentRoute);
        }, 100);
      }
      await this.getPage();
      this.$forceUpdate();
    }
  }
}
</script>
