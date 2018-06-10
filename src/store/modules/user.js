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
  
          if (data.profile_pic) {
            const url = process.env.BASE_API +'/'+ data.profile_pic 
            commit('SET_AVATAR', url)

          } else {
            const url = process.env.BASE_API+ '/boy.png'
            commit('SET_AVATAR', url)

          }
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
    // ChangeAvatar({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo(getToken()).then(response => {
    //       const data = response.data.profile_pic
    //       const url = process.env.BASE_API +'/'+ data
    //       commit('SET_AVATAR', url)
    //       this.state.avatar = url
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    ChangeAvatar({ commit ,state}, img) {
          let url = process.env.BASE_API +'/'+ img
          commit('SET_AVATAR','')
          commit('SET_AVATAR', url)    
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
