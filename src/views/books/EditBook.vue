<template>
<div class="app-conteiner">
    <el-form ref="form" :model="book">
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

        <!-- <el-form-item id="el-form-label" class="el-form-input" label="Categoria do livro">
            <el-input v-model="book.category"></el-input>
        </el-form-item> -->
        <el-row :key="index" v-for="(categ, index) in book.categories">
            <el-form-item id="el-form-label" label="Categorias do livro">
            {{ index+1 }}<el-input v-model="categ.description" placeholder="Categorias do livro" required>                            
                </el-input>
                </el-form-item> 
                <el-form-item>
                <el-button id="el-form-label" type="primary" circle icon="el-icon-delete" @click.prevent="removeRowCategory(index)"></el-button>
                </el-form-item>
        </el-row>
        <el-button id="el-form-label" type="primary" circle icon="el-icon-plus" @click.prevent="addRowCategory()"></el-button>

        <el-row :key="index" v-for="(autho, index) in book.authors">
            <el-form-item id="el-form-label" label="Autores do livro">
                {{ index+1 }}<el-input v-model="autho.name" placeholder="Autores do livro" required>                            
                </el-input>
                </el-form-item> 
                <el-form-item>
                <el-button id="el-form-label" type="primary" circle icon="el-icon-delete" @click.prevent="removeRowAuthor(index)"></el-button>
                </el-form-item>
        </el-row>
        <el-button id="el-form-label" type="primary" circle icon="el-icon-plus" @click.prevent="addRowAuthor()"></el-button>

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
    import store from '@/store'

    export default {
        name: "BookAdd",
        data: function() {
        return {
            book: [],
            
            message: ""
        };
    },

    created: function(){
        if (store.getters.roles === 'librarian'){
            axios
            .get(process.env.URL_API+'/books/'+this.$route.params.id,{headers: {"x-access-token": store.getters.token}})                
            .then(response=>{
                    this.book = response.data    
                    console.log(this.book)       
                })
                .catch(e=>{
                    console.log("error")
                })
            } else {
                this.$router.push({name: "Dashboard"})
            }
        },

        methods:{
            editBook: function() {
            const token = s.getToken()
            const bookId = this.$route.params.id
            const data = {
                title: this.book.title,
                description:this.book.description,
                edition:this.book.edition,
                language:this.book.language,
                category:this.book.categories,
                author: this.book.authors,
                pages:this.book.pages,
            }

            axios
                .put(process.env.URL_API+'/books/'+bookId, data, {headers: {"x-access-token": token}},)
                .then(response =>{
                console.log(response.data.message)
                this.$router.push({path: "/books/list"})
                }).catch(e=>{
                this.$notify.error({
                    title: 'Erro',
                    message: "Preencha todos os campos do formulário"
                });
            })
            },
            success: function(msg){
            if(msg == "Book added"){
                this.$notify({
                    message: msg,
                    type: 'success'
                });
            }else{
                this.$notify.error({
                    title: 'Erro',
                    message: "Não foi possível cadastrar o livro"
                });    
            }
        },

            addRowCategory:function() {
                this.displayCategory = true
                this.book.categories.push({
                    description: ''
                })
            },

            removeRowCategory:function(index) {
                    this.book.categories.splice(index, 1)
            },

            addRowAuthor:function() {
                this.displayAuthor = true
                this.book.authors.push({
                    name: ''
                })
            },

            removeRowAuthor:function(index) {
                this.book.authors.splice(index, 1)
            },

    }
}
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
