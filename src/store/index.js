import Vue from 'vue'
import Vuex from 'vuex'

import project from './project'
import entry from './entry'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    entry,
    project
  }
})

export default store
