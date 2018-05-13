import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    login: '',
    avatar: '',
    roles: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_LOGIN: (state, login) => {
      state.login = login
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // Login({ commit }, userInfo) {
    //   const login = userInfo.login.trim()
    //   return new Promise((resolve, reject) => {
    //     login(login, userInfo.password).then(response => {
    //       const data = response.data
    //       // setToken(data.token)
    //       commit('SET_TOKEN', data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', getToken())
        getInfo(getToken()).then(response => {
          const data = response.data
          if (data.type) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.type)
          } else {
            reject('Login or password incorrect')
          }
          commit('SET_LOGIN', data.login)
          // commit('SET_AVATAR', data.avatar)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
