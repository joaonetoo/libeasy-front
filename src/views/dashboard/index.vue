<template>
  <div class="dashboard-container">
    <modal name="book-modal" transition="scale" :width="656" :height="400">
  <div class="box">
    <div class="box-part" >
      <div class="partition" >
        <div class="partition-title">{{bookTitle}}</div>
        <hr>
          <div class="partition-category">{{bookDescription}}</div>

      </div>
    </div>
    <div class="box-part" id="bp-right">
      <div class="partition" >

          <template  v-if="categories.length >= 1 && !api">
            <div class="partition-title">Categories</div>
            <div v-for="categorie in categories" :key="categorie.id">
              <div class="partition-category" >{{categorie.description}} </div>
            </div>
            <br>
            <hr>  
          </template>
          <template  v-if="categories.length >= 1 && api">
            <div class="partition-title">Categories</div>
            <div v-for="categorie in categories" >
              <div class="partition-category" >{{categorie}} </div>
            </div>
            <br>
            <hr>  
          </template>


          <template v-if="authors.length >= 1 && !api">
            <div class="partition-title">Authors</div>
            <div v-for="author in authors" :key="author.id">
              <div class="partition-category" >{{author.name}}</div>
            </div>
            <br>
            <hr>  
          </template>
          <template v-if="authors.length >= 1 && api">
            <div class="partition-title">Authors</div>
            <div v-for="author in authors">
              <div class="partition-category" >{{author}}</div>
            </div>
            <br>
            <hr>  
          </template>

          <div class="partition-category" > <b>Pages: </b> {{bookPageCount}} | <b>Edition: </b>{{bookEdition}} | <b>Language: </b>{{bookLanguage}} </div>
            </div>
      <div class="box-messages">
      </div>
    </div>
  </div>
</modal>

    <div v-if="roles === 'client'">
          <h2>{{resultSearch}}</h2>
          <hr>
        <div v-if="loading" id="loader"></div>
        <div v-for="(book) in books" :key="book.id" style="margin: 10px; float:left">
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
                          <el-button type="text" class="btn-login button" @click="show(book.categories, book.authors,book.title, book.pageCount, book.description, book.language,book.edition)">Informations</el-button>
                          <el-button :disabled="checkReservation(book.id)" type="text" class="btn-login button" @click.prevent="reserveBook(id, book.id)">Reserve</el-button>
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
                        <li v-if="api">{{book.pageCount}}pgs</li>
                        <li v-else>{{book.page_count}}pgs</li>
                      </ul>
                      <div v-if="!api" class="buttons">
                        <div class="bottom ">
                          <el-button type="text" class="btn-login button" @click.prevent="removerBook(book.id,index)">Delete</el-button>
                          <el-button type="text" class="btn-login button" @click.prevent="editBook(book.id)">Edit</el-button>
                          <el-button :disabled="checkReservation(book.id)" type="text" class="btn-login button" @click.prevent="reserveBook(id, book.id)">Reserve</el-button>
                        </div>
                      </div>
                      <div v-else class="buttons">
                        <div class="bottom ">
                          <el-button type="text" class="btn-login button" @click="show(book.categories, book.authors,book.title, book.pageCount, book.description, book.language,book.edition)">Informations</el-button>
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
      reservedBooks: [],
      showModal: false,
      categories: [],
      authors: [],
      bookTitle: '',
      bookPageCount: '',
      bookDescription: '',
      bookLanguage: '',
      bookEdition: ''

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
        if(this.message ===  s.bookExists || this.message === s.bookNotFound){
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
                let data = {
                    userId: userId,
                    bookId: bookId
                 }

                axios.post(process.env.URL_API + '/reservations', data, {headers: {"x-access-token": store.getters.token}})
                .then(response => {
                    if(response) {
                        this.reservedBooks.push(bookId)
                        this.$notify({
                          message: "Booked succefully",
                          type: 'success'
                        });
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
                show (categories,authors,title,pageCount,description,language,edition) {
                  if(categories){
                    this.categories = categories
                  }else{
                    this.categories = []
                  }
                  if(authors){
                    this.authors = authors
                  }else{
                    this.authors = []
                  }
                  if(title){
                    this.bookTitle = title
                  }else{
                    this.bookTitle = ""
                  }
                  if(pageCount){
                    this.bookPageCount = pageCount
                  }else{
                    this.bookPageCount = ""
                  }
                  if(description){
                    this.bookDescription = description
                  }else{
                    this.bookDescription = ""
                  }
                  if(language){
                    this.bookLanguage = language
                  }else{
                    this.bookLanguage = ""
                  }
                  if(edition){
                    this.bookEdition = edition
                  }else{
                    this.bookEdition = ""
                  }
                  this.$modal.show('book-modal');
                },
            scroll (person) {
                window.onscroll = () => {
                  let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

                  if (bottomOfWindow && store.getters.api) {
                      axios
                      // .get('http://localhost:3000/books/search/'+array,{headers: {"x-access-token": getToken()}})
                      // .then(response => {
                      //   person.push(response.data.results[0]);
                      // });
                    this.$store.dispatch('GetBooksScroll',store.getters.title).then(()=>{

                    })

                  }
                };
              },

  },
  mounted() {
  this.scroll(this.person);
}


}
</script>
