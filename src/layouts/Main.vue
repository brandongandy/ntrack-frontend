<template>
<div id="app">
  <v-app>
    <v-navigation-drawer fixed
      class="blue-grey darken-4"
      app dark
      v-model="drawer"
      width="250">
      <v-list>
        <v-list-tile class="nav"
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          active-class="hightlighted"
          :class="item.route === $route.path ? 'highlighted' : ''">
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
    <v-toolbar class="blue-grey darken-4" dark fixed flat app>
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
      { icon: 'bookmark', text: 'New Project', route: '/project/new' },
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
.nav {
  border-radius: 5px;
  margin: 10px 15px;
}
.highlighted {
  background-color: #43A047;
}
</style>
