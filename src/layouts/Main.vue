<template>
  <div class="h-100">
    <b-navbar type="dark" variant="primary" fixed="top">
      <b-navbar-nav>
        <b-nav-item class="mr-2">
          <font-awesome-icon icon="bars" @click="toggleNav"></font-awesome-icon>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-brand>nTrack 0.10</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/index">Home</b-nav-item>
        <b-nav-item to="/projects" active>Projects</b-nav-item>
        <b-nav-item >Queries</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-dropdown text="Account" right variant="primary" size="sm">
          <template slot="button-content">
            <font-awesome-icon icon="user-circle"></font-awesome-icon> My Account
          </template>
          <b-dropdown-item to="/account">My Account</b-dropdown-item>
          <b-dropdown-item>Logout</b-dropdown-item>
        </b-dropdown>
      </b-navbar-nav>
    </b-navbar>

    <b-row class="h-100">
      <b-col cols="2" class="display-block" v-if="isNavVisible">
        <b-nav class="navbar-fixed-left bg-light">
          <b-navbar-nav>
            <b-nav-item to="/index">Home</b-nav-item>
            <b-nav-item to="/projects" active>Projects</b-nav-item>
            <b-nav-item >Queries</b-nav-item>
          </b-navbar-nav>
        </b-nav>
      </b-col>
      <b-col>
        <router-view />
      </b-col>
    </b-row>
    <alert-modal />
  </div>
</template>

<script>
export default {
  data () {
    return {
      isNavVisible: true
    }
  },
  computed: {
    profileUrl () {
      return this.$auth.user.picture
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
    },
    toggleNav () {
      this.isNavVisible = !this.isNavVisible
    }
  }
}
</script>

<style>
.left-nav {
  transition: all 0.1s eas-out;
}

.navbar-fixed-left {
  z-index: 1;
  position: fixed;
  border-radius: 0;
  height: 100%;
  margin-top: -15px;
  padding-top: 15px;
}

.navbar-fixed-left .navbar-nav > li {
  float: none;  /* Cancel default li float: left */
  width: 200px;
}
</style>
