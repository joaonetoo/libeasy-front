<template>
<div class="app-conteiner">
    <el-form ref="form" :model="book" label-width="120px">
        <el-form-item>
            <h1>Edit Book</h1>
        </el-form-item>
        <el-form-item class="el-form-input" label="Book title">
            <el-input v-model="book.title"></el-input>
        </el-form-item>

        <el-form-item class="el-form-input" label="Book description">
            <el-input v-model="book.description"></el-input>
        </el-form-item>

        <el-form-item class="el-form-input" label="Book edition">
            <el-input v-model="book.edition"></el-input>
        </el-form-item>

        <el-form-item label="Book language">
            <el-select v-model="book.language" placeholder="please select the book language">
            <el-option label="Portugues (Brasil)" value="pt-br"></el-option>
            <el-option label="Portugues" value="pt-pt"></el-option>
            <el-option label="Inglês (Estados Unidos)" value="en-us"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item class="el-form-input" label="Book category">
            <el-input v-model="book.category"></el-input>
        </el-form-item>

        <el-form-item class="el-form-input" label="Book number pages">
            <el-input v-model="book.pages"></el-input>
        </el-form-item>
               
        <el-form-item>
            <el-button class="btn-login" @click.prevent="editBook()" type="primary">Editar Livro</el-button>
        </el-form-item>        
    </el-form>
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
                    description: "",
                    edition: "",
                    language: "",
                    category: "",
                    pages: ""
                },
            };
            
        },

        methods:{
            
            editBook: function() {
            const token = s.getToken()
            const bookId = this.$route.params.id
            console.log(this.book.title)
            axios
                .put(process.env.URL_API+'/books/'+bookId, {titulo: this.title},
                 {headers: {"x-access-token": token}},)
                .then(response => { 
                            })
                .catch(e =>
                    {this.message = "Erro"}
            )
    }
    }}
</script>


<style scoped>
.line{
  text-align: center;
}
.el-form-input {
    margin-right: 2%;
}
</style>
