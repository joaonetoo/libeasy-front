import axios from 'axios'
import { getToken, setToken, removeToken } from '@/utils/auth'
const books = {
  state: {
    books: [],
    loading: true,
    resultSearch: ""

},
  mutations: {
    SET_BOOKS: (state, b) => {
        state.books = b
    },
    SET_LOADING: (state,l) =>{
        state.loading = l
    },
    SET_RESULT_SEARCHING: (state,s) =>{
        state.resultSearch = s
    }
  
    },

  actions: {

    GetBooks({ commit, state },array) {
        commit('SET_LOADING',true)
        commit('SET_BOOKS',[])
        axios
        .get('http://localhost:3000/books/search/'+array,{headers: {"x-access-token": getToken()}})
        .then(res => {
            let books = res.data
            commit('SET_BOOKS',books)
            commit('SET_LOADING',false)
            commit('SET_RESULT_SEARCHING',"Resultados encontrados para: "+"'"+array+"'")

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
    },
    GetLast({commit, state}){
        axios
        .get('http://localhost:3000/books/',{headers: {"x-access-token": getToken()}})
        .then(res =>{
          let books = res.data
          if (books.length > 11){
            books = books.slice(books.length-11, books.length-1)
          }
          books.forEach(book => {
            book.image = process.env.BASE_API+'/'+book.image
          });
          commit('SET_BOOKS',books)
          commit('SET_LOADING',false)
          commit('SET_RESULT_SEARCHING',"New Books")
  
        })
      }
  

  }
}

export default books
