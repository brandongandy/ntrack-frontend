<template>
<div id="app">
  <v-app>
    <v-navigation-drawer fixed floating
      class="secondary"
      app dark
      v-model="drawer"
      width="250">
      <v-toolbar  class="primary">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/lego/1.jpg" />
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ this.$auth.user.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <v-list-tile class="nav"
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          active-class="hightlighted"
          :class="item.route === $route.path ? 'highlighted primary' : ''">
          <v-list-tile-action>
            <v-icon :color="item.iconColor">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-divider v-if="item.divider"></v-divider>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }} </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="primary" dark fixed app>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3">Inscripient&nbsp;<span class="subheading">v0.2</span></span>
      <v-spacer></v-spacer>
      <v-btn flat icon><v-icon>power_settings_new</v-icon></v-btn>
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
      { icon: 'bookmarks', text: 'Projects', route: '/projects/all' },
      { icon: 'bookmark', text: 'New Project', route: '/projects/new' },
      { icon: 'question_answer', iconColor: 'accent', text: 'Queries', route: '/' },
      { divider: true },
      { icon: 'account_circle', text: 'My Account', route: '/users/me' }
    ]
  }),
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
  box-shadow: 0px 0px 4px #37474F;
}
</style>
