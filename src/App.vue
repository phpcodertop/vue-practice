<template>
  <div v-if="!this.$route.meta.layout" class="wrapper">
    <app-navbar />
    <app-aside />
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
            </div><!-- /.col -->
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <div class="content">
        <div class="container-fluid">
          <router-view></router-view>
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    <app-right-sidebar />

    <app-footer />

  </div>
  <div v-else>
    <router-view />
  </div>
</template>

<script>
import AppNavbar from "@/partials/app-navbar";
import AppAside from "@/partials/app-aside";
import AppFooter from "@/partials/app-footer";
import AppRightSidebar from "@/partials/app-right-sidebar";
export default {
  name: 'App',
  components: {
    AppRightSidebar,
    AppFooter,
    AppNavbar,
    AppAside
  },

}
</script>
