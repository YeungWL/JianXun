import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import menuRoots from './modules/menuRoots.js'
import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    menuRoots
  },
  getters
})

export default store
