import axios from 'axios'
import { getToken, setToken, removeToken } from '@/utils/auth'
const books = {
  state: {
    books: [],
    loading: true,
    roles:'client'

},
  mutations: {
    SET_BOOKS: (state, b) => {
        state.books = b
    },
    SET_LOADING: (state,l) =>{
        state.loading = l
    },
    SET_ROLES: (state, r) =>{
        state.roles = r
    }
  },

  actions: {

    GetBooks({ commit, state },array) {
          commit('SET_LOADING',true)
          axios
          .get('http://localhost:3000/books/search/'+array,{headers: {"x-access-token": getToken()}})
          .then(res => {
              let books = res.data
              commit('SET_BOOKS',books)
              commit('SET_LOADING',false)
          })
    },

    GetBooksClient({commit, state}, array){
        commit('SET_ROLES', true)
        axios
        .get('http://localhost:3000/books/search/'+array,{headers: {"x-access-token": getToken()}})
        .then(res => {
            let books = res.data
            commit('SET_BOOKS',books)
            commit('SET_ROLES',false)
        })
    }

  }
}

export default books
