<template>
    <div class="app-container" >
    <el-form ref="form" :model="book" label-width="200px">
        <el-form-item id="el-form-label">
            <center> <h1>Buscar Livro </h1></center>
        </el-form-item>
        
        <el-form-item label="Encontrar Livro">
            <el-input v-model="book.title" placeholder="Nome do livro"> </el-input>
        </el-form-item>
        <center><el-button class="btn-login" @click.prevent="findBook()" type="primary">Buscar Livro</el-button></center>
       </el-form>

    <ul>
        <div v-for="(book) in message" :key="book.id">
        {{book.title}} - {{book.authors}} </div>
    </ul>

</div>

</template>

<script>
    import axios from 'axios'
    import '@/styles/custom-buttons.scss'
    import * as s from '@/utils/auth/'
    export default {
        name: "BookEdit",
        data: function() {
            return {
                book: {
                    title: "",
                },
                message:""
            };
        },
        
        methods:{
            //corrigir algumas coisas
            findBook:function(){
                const token = s.getToken()
                let bookreq = this.book.title
                console.log(this.book.title)
                console.log(process.env.URL_API+'/books/search/'+bookreq)
                axios
                .get(process.env.URL_API+'/books/search/'+bookreq, {headers: {"x-access-token": token}})
                .then(response=>{
                    this.message = response.data
                    console.log(response.data)
                })
            }
        }
    }
</script>