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
          <b-button @click="logout" variant="primary">Logout</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
    <alert-modal />
    <b-navbar class="text-muted" variant="light" fixed="bottom">
      <p class="m-auto">Copyright &copy; 2019 Colonna Softworks</p>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    logout () {
      this.$auth.logout()
    }
  }
}
</script>

<style>
#mt-6 {
  margin-top: 75px;
}
</style>
