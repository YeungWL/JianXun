import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import actions from './action'
import user from './modules/user'
import openApi from './modules/openApi'
import totalData from './modules/totalData'
import weekData from './modules/weekData'
import poll from './modules/poll'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    openApi,
    totalData,
    weekData,
    poll
  },
  state,
  actions
})
