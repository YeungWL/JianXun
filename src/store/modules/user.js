import { login, logout, getUserInfo } from '@/api/login'
import { getAccessToken, setAccessToken, removeAccessToken } from '@/utils/auth'


const user = {
  state: {
    accessToken: getAccessToken()
  },
  mutations: {//改变state的数值的方法
    SET_ACCESS_TOKEN: (state, accessToken) => {
      state.accessToken = accessToken
    }
  },
  actions: {
    login({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data)
          .then(response => {
            commit('SET_ACCESS_TOKEN', response.data[0].accessToken)
            // console.log(response.data[0].accessToken)
            setAccessToken(response.data[0].accessToken)//登录成功后将token存储在cookie之中
            resolve(response)
            
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logout({ commit }, data) {
      return new Promise(resolve => {
        commit('SET_ACCESS_TOKEN', "")
        removeAccessToken()
        resolve()
      })
    },
    getUserInfo({ commit, data }) {
      return new Promise((resolve, reject) => {
        getUserInfo(data)
          .then(response => {
            // console.log(response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
