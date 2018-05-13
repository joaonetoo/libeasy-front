import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    login: '',
    avatar: '',
    roles: '',
    id: ''
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
    },
    SET_ID: (state, id) => {
      state.id = id
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

    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', getToken())
        getInfo(getToken()).then(response => {
          const data = response.data
          if (data.type) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.type)
          } else {
            reject('Login ou password incorrect')
          }
          commit('SET_LOGIN', data.login)
          commit('SET_ID', data.id)
          const url = process.env.BASE_API +'/'+ data.profile_pic 
          commit('SET_AVATAR', url)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
      })
    },
    ChangeAvatar({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          const url = process.env.BASE_API +'/'+ data.profile_pic 
          commit('SET_AVATAR', url)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
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
