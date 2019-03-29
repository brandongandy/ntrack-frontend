<template>
  <div id="mt-6">
    <b-navbar type="dark" variant="primary" fixed="top">
      <b-navbar-brand>nTrack 0.10</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-button variant="primary" size="sm" class="mr-1" to="/index">Home</b-button>
          <b-button variant="primary" size="sm" class="mr-1" to="/projects">Projects</b-button>
          <b-button variant="primary" size="sm" class="mr-1">Queries</b-button>
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
      </b-collapse>
    </b-navbar>
    <router-view />
    <alert-modal />
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    profileUrl () {
      return this.$auth.user.picture
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
    }
  }
}
</script>

<style scoped>
#mt-6 {
  margin-top: 75px;
}

img {
  height: 30px;
  width: 30px;
  border-radius: 15px;
}
</style>
