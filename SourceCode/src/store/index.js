import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import actions from './action'
import user from './modules/user'
import openApi from './modules/openApi'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    openApi
  },
  state,
  actions
})
