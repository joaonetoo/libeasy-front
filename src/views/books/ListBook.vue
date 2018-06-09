<template>
        <div class="dashboard-container">
        <h2> All Books</h2>
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

                  <template v-if="categories.length >= 1">
                    <div class="partition-title">Categories</div>
                    <div v-for="categorie in categories" :key="categorie.id">
                      <div class="partition-category" >{{categorie.description}} </div>
                    </div>
                    <br>
                    <hr>  
                  </template>

                  <template v-if="authors.length >= 1">
                    <div class="partition-title">Authors</div>
                    <div v-for="author in authors" :key="author.id">
                      <div class="partition-category" >{{author.name}}</div>
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

        <hr>
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
                    <el-button v-if="roles === 'librarian'" type="text" class="btn-login button" @click.prevent="removerBook(book.id,index)">Deletar</el-button>
                    <el-button v-if="roles === 'librarian'" type="text" class="btn-login button" @click.prevent="editBook(book.id)">Editar</el-button>
                    <el-button :disabled="checkReservation(book.id)" type="text" class="btn-login button" @click.prevent="reserveBook(id, book.id)">
                        <span v-if="checkReservation(book.id)">Reservado</span>
                        <span v-else>Reservar</span>
                    </el-button>
                    <el-button type="text" class="btn-login button" @click="show(book.categories, book.authors,book.title, book.page_count, book.description, book.language,book.edition)">Informations</el-button>

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
    import '@/styles/custom-buttons.scss'
    import * as auth from '@/utils/auth/'
    import store from '@/store'
    import { mapGetters } from 'vuex'
    import '@/styles/el-card.scss'

    export default {
        name: 'ListBook',
        computed: {
            ...mapGetters([
                'id',
                'roles'
            ])
        },
    data: function(){
        return {
        books: [],
        title: 'New Books',
        reservedBooks: [],
        showModal: false,
        categories: [],
        authors: [],
        bookTitle: '',
        bookPageCount: '',
        bookDescription: '',
        bookLanguage: '',
        bookEdition: '',
        }
    },
        created: function(){
            axios
            .get(process.env.URL_API+'/books',{headers: {"x-access-token": store.getters.token}})
            .then(response=>{
                this.books = response.data
                this.books.forEach(book => {
                    if(!book.api_id){
                        book.image = process.env.BASE_API+'/'+book.image
                    }
                });
            })
            .catch(e => {
                console.log("error")
            })

            axios.get(process.env.URL_API+"/reservations", {headers: {"x-access-token": store.getters.token}})
            .then(response => {
                let reservedBooks = []
                for(let i = 0; i < response.data.length; i++) {
                    reservedBooks.push(response.data[i].bookId)
                }

                this.reservedBooks = reservedBooks;
            })
        },
        methods:{
            removerBook:function(id,index){
                axios.delete(process.env.URL_API+'/books/'+id,{headers: {"x-access-token": store.getters.token}})
                    .then( response => {
                        this.books.splice(index, 1);
                        this.message = response.data.message
                    })
                    .catch(e =>{
                        this.message = "Could not be removed"
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

                this.reservedBooks.push(bookId)
                axios.get(process.env.URL_API + '/reservations/searchByUserId/'+userId, {headers: {"x-access-token": token}})
                .then(response => {
                    if(response) {
                        if(response.data.length > 5) {
                            this.reservedBooks.pop()
                            this.$notify({
                            message: "Maximum reserves reached",
                            type: 'error'
                            })
                        } else {
                            axios.post(process.env.URL_API + '/reservations', data, {headers: {"x-access-token": token}})
                            .then(response => {
                                if(response) {
                                    console.log(response)
                                    this.$notify({
                                    message: "Book reserved for you",
                                    type: 'success'
                                    })
                                } else {
                                    this.reservedBooks.pop();
                                }
                            })
                        }
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
            show (categories,authors,title,page_count,description,language,edition) {
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
                  if(page_count){
                    this.bookPageCount = page_count
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

            
        },
        
    }
</script>
