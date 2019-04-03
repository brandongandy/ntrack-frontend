<template>
<div id="app">
  <v-app>
    <v-navigation-drawer fixed clipped
      class="grey lighten-4"
      app v-model="drawer">
      <v-list>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.route">
          <v-divider v-if="item.divider"
            class="my-3" dark></v-divider>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark app absolute clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">nTrack&nbsp;<span class="text">v0.2</span></span>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { icon: 'home', text: 'Home', route: '/index' },
      { icon: 'bookmarks', text: 'Projects', route: '/projects' },
      { icon: 'question_answer', text: 'Queries', route: '/' },
      { divider: true },
      { icon: 'home', text: 'My Account' }
    ]
  }),
  props: {
    source: String
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
#keep main .container {
  height: 660px;
}

.navigation-drawer__border {
  display: none;
}

.text {
  font-weight: 400;
}
</style>
