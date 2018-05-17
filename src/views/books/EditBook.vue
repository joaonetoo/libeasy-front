<template>
<div class="app-conteiner">
    <el-form ref="form" :model="book" label-width="200px">
        <el-form-item id="el-form-label">
           <center>  <h1>Editar Livro</h1> </center> 
        </el-form-item>
        <el-form-item id="el-form-label" class="el-form-input" label="Título do livro">
            <el-input v-model="book.title"></el-input>
        </el-form-item>

        <el-form-item id="el-form-label" class="el-form-input" label="Descrição do livro">
            <el-input v-model="book.description"></el-input>
        </el-form-item>

        <el-form-item id="el-form-label" class="el-form-input" label="Edição do livro">
            <el-input v-model="book.edition"></el-input>
        </el-form-item>

        <el-form-item id="el-form-label" label="Idioma do livro">
            <el-select v-model="book.language" placeholder="please select the book language">
            <el-option label="Portugues (Brasil)" value="pt-br"></el-option>
            <el-option label="Portugues" value="pt-pt"></el-option>
            <el-option label="Inglês (Estados Unidos)" value="en-us"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item id="el-form-label" class="el-form-input" label="Categoria do livro">
            <el-input v-model="book.category"></el-input>
        </el-form-item>

        <el-form-item id="el-form-label" class="el-form-input" label="Número de páginas">
            <el-input v-model="book.pages"></el-input>
        </el-form-item>
               
        <el-form-item id="el-form-label">
           <center>  <el-button class="btn-login" @click.prevent="editBook()" type="primary">Atualizar livro</el-button></center> 
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

#el-form-label {
    margin-left: 2%;
}
</style>
