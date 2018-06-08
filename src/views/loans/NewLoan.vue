<template>
    <div class="dashboard-container">
        <h2> Reserve Book</h2>
        <hr>
        <template v-if="is_reservation != null">
            The book is reserved for <b>{{user}}</b> until the <b>{{is_reservation.date}}</b>.If the person who will effect the loan is not hum. It won't be possible to accomplish the operation.
        </template>
        <el-form ref="form" :model="reservation" style="padding: 20px" >
            <template v-if="user && book">
                <el-form-item label="Book" style="height: 10%">
                        <el-input :disabled="true" v-model="book" icon-class="user" placeholder="Insira o nome do material">
                            fa-thumbs-up
                        </el-input>
                </el-form-item>
                <el-form-item label="User" style="height: 10%">
                        <el-input :disabled="true" v-model="user" icon-class="user" placeholder="Insira o nome do material">
                            fa-thumbs-up
                        </el-input>

                </el-form-item>
            </template>

            <center><el-button class="btn-login" @click.prevent="addLoan()"  type="primary">Cadastrar</el-button></center>

        </el-form>

    </div>  

</template>


<script>
import axios from 'axios'
import '@/styles/custom-buttons.scss'
import '@/styles/el-card.scss'
import store from '@/store'

    export default {
        name: 'NewLoan',
        data: function(){
            return{
                is_reservation: null,
                user: null,
                book: null,
                reservation:{
                    bookId: null,
                    userId: null,
                }
            }
        },

        created: function(){
            axios
            .get(process.env.URL_API+'/reservations/searchByBookId/'+this.$route.params.bookId,{headers: {"x-access-token": store.getters.token}})
            .then(response =>{
                if(response){
                this.is_reservation = response.data
                this.user = response.data.user.first_name
                this.book = response.data.book.title
                this.reservation.bookId = this.book.id
                this.user = response.data.user.first_name,
                this.reservation.userId = this.user.id
                }

            })
        },
        methods: {
            addLoan: function(){
                const data = {
                    bookId: this.bookId,
                    userId: this.userId
                }
                axios
                .post(process.env.URL_API+'/loans', data,{headers: {"x-access-token": store.getters.token}})
                .then(response =>{
                    if(response){
                        alert("reservou!");
                    }
                })
            }
        }
    }
</script>