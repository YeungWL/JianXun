import { getMyMenuList } from '@/api/login'
import { getStorageRoot, setStorageRoot, removeStorageRoot } from '@/utils/auth'

const menuRoots = {
  state: {
    rootLists: getStorageRoot()
  },
  // getters:{
  //  rootLists: state => state.rootLists
  // },
  mutations: {
    SET_ROOTS: (state, rootLists) => {
      state.rootLists = rootLists
      // console.log("rootLists:"+rootLists)
    }
  },

  actions: {
    getRoots({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        getMyMenuList(data)
          .then(response => {
            commit('SET_ROOTS', JSON.stringify(response.data))
            setStorageRoot(JSON.stringify(response.data))
            // console.log('SET_ROOTS:'+JSON.stringify(response.data))
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default menuRoots
