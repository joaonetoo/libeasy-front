<template>
  <div class="dashboard-container">
    <div v-if="roles === 'client'">
          <h2>{{resultSearch}}</h2>
      <hr>
        <div v-if="loading" id="loader"></div>
        <div v-for="(book,index) in books" :key="book.id" style="margin: 10px; float:left">
                  <div class='card'>
                  <div class='card_left'>
                    <img :src="book.image">
                  </div>
                  <div class='card_right'>
                    <h1>{{book.title}}</h1>
                    <div class='card_right__details'>
                      <ul>
                        <li>{{book.edition}}</li>
                        <li>{{book.language}}</li>
                        <li>{{book.page_count}}pgs</li>
                      </ul>
                      <div class="buttons">                        
                        <div class="bottom">
                          <el-button type="text" class="btn-login button" @click.prevent="addBook(book.api_id,index)">More Informations</el-button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
        </div>
    </div>
    <div v-else class="dashboard-text">
          <h2>{{resultSearch}}</h2>
      <hr>
              <div v-if="loading" id="loader"></div>

        <div v-for="(book,index) in books" :key="book.id" style="margin: 10px; float:left">
                  <div class='card'>
                  <div class='card_left'>
                    <img :src="book.image">
                  </div>
                  <div class='card_right'>
                    <h1>{{book.title}}</h1>
                    <div class='card_right__details'>
                      <ul>
                        <li>{{book.edition}}</li>
                        <li>{{book.language}}</li>
                        <li>{{book.page_count}}pgs</li>
                      </ul>
                      <div v-if="!api" class="buttons">
                        <div class="bottom ">
                          <el-button type="text" class="btn-login button" @click.prevent="removerBook(book.id,index)">Deletar</el-button>
                          <el-button type="text" class="btn-login button" @click.prevent="editBook(book.id)">Editar</el-button>
                          <el-button :disabled="checkReservation(book.id)" type="text" class="btn-login button" @click.prevent="reserveBook(id, book.id)">Reservar</el-button>
                        </div>
                      </div>
                      <div v-else class="buttons">
                        <div class="bottom ">
                          <el-button type="text" class="btn-login button" @click.prevent="addBook(book.api_id,index)">Add Book</el-button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import store from '@/store'
import * as s from '@/utils/strings'
import '@/styles/el-card.scss'

export default {
  name: 'dashboard',
  
  computed: {
    ...mapGetters([
      'login',
      'id',
      'roles',
      'avatar',
      'books',
      'loading',
      'resultSearch',
      'api'
    ])
  },
  data: function(){
    return{
      title: 'New Books',
      reservedBooks: []

    }
  },
  created: function(){
        this.$store.dispatch('GetLast').then(() => {
        })  
        axios.get(process.env.URL_API+"/reservations", {headers: {"x-access-token": store.getters.token}})
            .then(response => {
                console.log(response.data)
                let reservedBooks = []
                for(let i = 0; i < response.data.length; i++) {
                    reservedBooks.push(response.data[i].bookId)
                }

                this.reservedBooks = reservedBooks;
        })
   
  },
  methods:{

    addBook:function(apiId,index){
      axios
      .post( process.env.BASE_API+'/books/create',{api_id: apiId}, {headers: {"x-access-token": store.getters.token}})
      .then(res =>{
        this.message = res.data.message
        if(this.message ===  s.bookExists){
          this.$notify.error({
            title: 'Erro',
            message: this.message
          });
        }else{
          this.$notify({
          message: this.message,
          type: 'success'

          });
          this.books.splice(index, 1);

        }


      })
    },
    verify:function(api_id){
      store.getters.books.forEach(book => {
        if(book.api_id === api_id){
          return true
        }
      });
      return false
    },
            removerBook:function(id,index){
                axios.delete(process.env.URL_API+'/books/'+id,{headers: {"x-access-token": store.getters.token}})
                    .then( response => {
                        this.books.splice(index, 1);
                        this.message = response.data.message
                    })
                    .catch(e =>{
                        this.message = "Não foi possível deletar o livro"
                    })
            },
            editBook:function(id){
                    this.$router.push({path: "/books/edit/"+id})
            },

            setImage:function(img){
                return process.env.URL_API+'/'+img
            },

            reserveBook:function(userId, bookId) {
                const token = auth.getToken();
                let data = {
                    userId: userId,
                    bookId: bookId
                 }

                axios.post(process.env.URL_API + '/reservations', data, {headers: {"x-access-token": token}})
                .then(response => {
                    if(response) {
                        console.log(response)
                        this.reservedBooks.push(bookId)
                        alert("Livro "+bookId+" reservado para voçê!")
                    }
                })
            },
            checkReservation:function(bookId) {
                for(let i = 0; i < this.reservedBooks.length; i++) {
                    if(bookId == this.reservedBooks[i]) {
                        return true;
                    }
                }
                return false 
            },
            

  }

}
</script>
