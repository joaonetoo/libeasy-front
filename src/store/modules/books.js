import axios from 'axios'
import { getToken, setToken, removeToken } from '@/utils/auth'
const books = {
  state: {
    books: [],
    loading: true,
    resultSearch: "",
    api: false,
    title: "New Books"

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
    },
    SET_API: (state,a) =>{
        state.api = a
    },

  
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
            commit('SET_API',true)            
            commit('SET_RESULT_SEARCHING',"Results found for: "+"'"+array+"'")

        })
    },

    GetBooksClient({commit, state}, array){
        commit('SET_LOADING',true)
        commit('SET_BOOKS',[])
        axios
        .get('http://localhost:3000/books/infos/'+array,{headers: {"x-access-token": getToken()}})
        .then(res => {
            let books = res.data
            books.forEach(book => {
                book.image = process.env.BASE_API+'/'+book.image
            });
            commit('SET_BOOKS',books)
            commit('SET_LOADING',false)
            commit('SET_RESULT_SEARCHING',"Results found for: "+"'"+array+"'")
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
              if(!book.api_id){
                book.image = process.env.BASE_API+'/'+book.image
              }
          });
          commit('SET_BOOKS',books)
          commit('SET_LOADING',false)
          commit('SET_API',false)            
          commit('SET_RESULT_SEARCHING',"New Books")
  
        })
      }
  

  }
}

export default books
