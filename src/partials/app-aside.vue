<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <router-link :to="{ name: 'home' }" class="brand-link">
      <img src="/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">Practice Center</span>
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex" v-if="user">
        <div class="image">
          <img src="/dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <router-link :to="{ name: 'profile' }" class="d-block">{{  user.name }}</router-link>
        </div>
      </div>

      <!-- SidebarSearch Form -->
      <div class="form-inline">
        <div class="input-group" data-widget="sidebar-search">
          <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link">
              <i class="nav-icon fas fa-home"></i>
              <p>
                Home Page
              </p>
            </router-link>
          </li>
          <li class="nav-item"  v-if="user">
            <router-link :to="{ name: 'users' }" class="nav-link">
              <i class="nav-icon fas fa-users"></i>
              <p>
                Users
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'blog' }" class="nav-link">
              <i class="nav-icon fas fa-blog"></i>
              <p>
                Blog
              </p>
            </router-link>
          </li>
          <li class="nav-item"  v-if="user">
            <router-link :to="{ name: 'todos' }" class="nav-link">
              <i class="nav-icon fas fa-check"></i>
              <p>
                Todos
              </p>
            </router-link>
          </li>
          <li class="nav-item"  v-if="user">
            <router-link :to="{ name: 'contacts' }" class="nav-link">
              <i class="nav-icon fas fa-address-book"></i>
              <p>
                Contacts
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'contactUs' }" class="nav-link">
              <i class="nav-icon fas fa-envelope"></i>
              <p>
                Contact Us
              </p>
            </router-link>
          </li>
          <li class="nav-item" v-if="user">
            <a href="#" @click.prevent="logout" class="nav-link"><i class="nav-icon fas fa-power-off"></i> Logout</a>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>

export default {
  name: "app-aside",
  data() {
    return { user: null };
  },
  mounted() {

  },
  created() {
    this.user = this.$store.state.auth.user;
  },
  watch: {
    '$store.state.auth.user': function () {
      this.user = this.$store.state.auth.user;
    }
  },
  methods: {
    logout() {
      document.body.classList.add('login-page');
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login');
      });
    }
  }
}
</script>
