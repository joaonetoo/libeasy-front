<template>
    <div class="dashboard-container">
        <h2> Loan Book</h2>
        <hr>
    <template v-if="user && book">
        <template v-if="is_reservation != null">
            The book is reserved for <b>{{user.first_name}}</b> until the <b>{{is_reservation.date}}</b>.If the person who will effect the loan is not hum. It won't be possible to accomplish the operation.
        </template>

        <el-form ref="form" :model="reservation" style="padding: 20px" >
                <el-form-item label="Book" style="height: 10%">
                        <el-input :disabled="true" v-model="book.title" icon-class="user" placeholder="Insira o nome do material">
                            fa-thumbs-up
                        </el-input>
                </el-form-item>
                <el-form-item label="User" style="height: 10%">
                        <el-input :disabled="true" v-model="user.first_name" icon-class="user" placeholder="Insira o nome do material">
                            fa-thumbs-up
                        </el-input>

                </el-form-item>
            <center><el-button class="btn-login" @click.prevent="addLoan()"  type="primary">Cadastrar</el-button></center>

        </el-form>
    </template>
    <template v-else>
         <el-form ref="form" :model="reservation" style="padding: 20px" >
                <el-form-item label="Book" style="height: 10%">
                        <el-input :disabled="true" v-model="book.title" icon-class="user" placeholder="Insert book">
                            fa-thumbs-up
                        </el-input>
                </el-form-item>
                <el-form-item label="User" style="height: 10%">

                <autocomplete :items="results" @changeId="change" />

                </el-form-item>
                <br>
            <center><el-button class="btn-login" @click.prevent="addLoan()"  type="primary">Cadastrar</el-button></center>

        </el-form>
       
    </template>

    </div>  

</template>


<script>
import axios from 'axios'
import '@/styles/custom-buttons.scss'
import '@/styles/el-card.scss'
import store from '@/store'
import autocomplete from '@/views/layout/autocomplete'
import * as s from '@/utils/strings'

    export default {
        name: 'Loan',
        components: {
            autocomplete,
        },
        data: function(){
            return{
                is_reservation: null,
                user: null,
                book: null,
                reservation: {
                    bookId: null,
                    userId: null,
                },
                results: [],
                id: '',
                verifyUser: null
            }
        },

        created: function(){
            if (store.getters.roles === 'librarian'){

                axios
                .get(process.env.URL_API+'/reservations/searchByBookId/'+this.$route.params.bookId,{headers: {"x-access-token": store.getters.token}})
                .then(response =>{
                    if(response.data){
                    this.is_reservation = response.data
                    this.user = response.data.user
                    this.book = response.data.book
                    this.reservation.bookId = this.book.id
                    this.reservation.userId = this.user.id
                    this.verifyUser = this.user.first_name
                    }
                    else{
                        axios
                        .get(process.env.URL_API+'/books/'+this.$route.params.bookId,{headers: {"x-access-token": store.getters.token}})
                        .then(response =>{
                            this.book = response.data
                            console.log(this.book)
                            this.reservation.bookId = this.book.id
                        })
                    }

                })
                axios
                .get(process.env.URL_API+'/users/')
                .then(response => {
                    response.data.forEach( u => {
                        this.results.push({name: u.first_name, id: u.id, photo: u.profile_pic, cpf: u.cpf})
                    });
                })
            }else{
                this.$router.push({name: "Dashboard"})

            }
            },
            methods: {
                addLoan: function(){
                        const data = {
                            bookId: this.reservation.bookId,
                            userId: this.reservation.userId
                        }
                        axios
                        .post(process.env.URL_API+'/loans/', data,{headers: {"x-access-token": store.getters.token}})
                        .then(response =>{
                            if(response.data.message === s.loanAdded){
                                this.$notify({
                                message: response.data.message,
                                type: 'success'
                                });
                            }else{
                            this.$notify.error({
                                title: 'Erro',
                                message:  response.data.message
                            });
    
                            }
                        })
                
            },
            change: function(id){
                this.reservation.userId = id
            }
        }
    }
</script>