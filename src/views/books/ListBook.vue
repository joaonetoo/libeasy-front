<template>
    <!-- <div class="form-control">
    <el-row>
    <el-col :span="5" v-for="(book,index) in books" :key="book.id" style="margin: 10px;" >
        <el-card :body-style="{ padding: '10px' }">
        <center><img :src="setImage(book.image)"  class="image" style="width: 128px; height:192px"></center>
        <div style="padding: 14px;">
            <span>{{book.title}}</span>
            
            <div class="bottom clearfix">
            <el-button type="text" class="btn-login button" @click.prevent="removerBook(book.id,index)">Deletar</el-button>
            <el-button type="text" class="btn-login button" @click.prevent="editBook(book.id)">Editar</el-button>
            <el-button :disabled="checkReservation(book.id)" type="text" class="btn-login button" @click.prevent="reserveBook(id, book.id)">Reservar</el-button>
            </div>
        </div>
        </el-card>
    </el-col>
    </el-row>
    </div> -->
        <div>
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
                    <el-button type="text" class="btn-login button" @click.prevent="removerBook(book.id,index)">Deletar</el-button>
                    <el-button type="text" class="btn-login button" @click.prevent="editBook(book.id)">Editar</el-button>
                    <el-button :disabled="checkReservation(book.id)" type="text" class="btn-login button" @click.prevent="reserveBook(id, book.id)">Reservar</el-button>
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

    import CreateReserveVue from '../reserve/CreateReserve.vue';

    export default {
        name: 'ListBook',
        computed: {
            ...mapGetters([
                'id',
            ])
        },
        data: function(){
            return {
                books: [],
                image: "dasdasdsa",
                reservedBooks: [],
            }
        },
        created: function(){
            axios
            .get(process.env.URL_API+'/books',{headers: {"x-access-token": store.getters.token}})
            .then(response=>{
                this.books = response.data
                
            })
            .catch(e => {
                console.log("error")
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
            
        },
        
    }
</script>
