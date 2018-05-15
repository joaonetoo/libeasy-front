<template>
<div>
    <center><img src="./logo.png" width="80px" style="margin-top: 20px;"></center>

    <div class="app-container" style="width: 40%;">
        <el-card>
            <h2><strong> Adicionar um novo livro </strong></h2>
            <hr>

            <el-form ref="form" :model="book" >

                <el-form-item label="Título do livro">
                        <el-input v-model="book.title" placeholder="Descrição do livro">                            
                        </el-input>
                </el-form-item>  

                <el-form-item label="Descrição do livro">
                        <el-input type="textarea" v-model="book.description" placeholder="Descrição do livro">
                        </el-input>
                </el-form-item>

                <el-form-item label="Edição do livro">
                        <el-input v-model="book.edition" placeholder="Edição do livro">                            
                        </el-input>
                </el-form-item>  

                <el-form-item label="Idioma do livro">
                        <el-input v-model="book.language" placeholder="Idioma do livro">                            
                        </el-input>
                </el-form-item>  

                <el-form-item label="Categorias do livro">
                        <el-input v-model="category.description" placeholder="Categorias do livro">                            
                        </el-input>
                </el-form-item> 

                <el-form-item label="Autores do livro">
                        <el-input v-model="author.name" placeholder="Autores do livro">                            
                        </el-input>
                </el-form-item> 

                <el-form-item label="Número de páginas do livro">
                        <el-input v-model="book.page_count" placeholder="Número de páginas do livro">                            
                        </el-input>
                </el-form-item>  


                
                <center><el-button class="btn-login" @click.prevent="addBook()" type="primary">Cadastrar novo Livro</el-button></center>
            </el-form>
        </el-card>
    </div>
</div>
</template>

<script>
    import axios from 'axios'
    import '@/styles/custom-buttons.scss'
    import * as s from '@/utils/auth/'
    export default{
        name: 'CreateBook',
        data: function(){
            return{
                book:{
                    title: "",
                    description: "",
                    edition: "",
                    language: "",
                    page_count: ""
                },
                author:{
                    name:"",
                },
                category:{
                    description:"",
                },
            }   
        }, 

    


        methods:{
            //corrigir algumas coisas
            addBook:function(){
                const token = s.getToken()
                console.log(token)
                axios.post(process.env.URL_API+'/books', this.book, {headers: {"x-access-token": token}})
                .then(response=>{                 
                    let bookId = response.data.object.id;
                    axios.post(process.env.URL_API+'/authors', this.author, {headers: {"x-access-token": token}})
                    .then(response => {
                        let authorId = response.data.object.id;
                        axios.post(process.env.URL_API+'/categories', this.category, {headers: {"x-access-token": token}})
                        .then(response => {
                            console.log(response.data)
                            let idsAuthor = {
                                bookId: bookId,
                                authorId: authorId
                            }

                            let addAuthorToBook = axios.post(process.env.URL_API+'/addAuthorToBook', idsAuthor, {headers: {"x-access-token": token}})    
                            .then(response => {
                                console.log(response.data)
                            })

                            let category = response.data.object;
                            let idsCategory = {
                                bookId: bookId,
                                categoryId: category.id,
                            }

                            let addCategoryToBook = axios.post(process.env.URL_API+'/addCategoryToBook', idsCategory, {headers: {"x-access-token": token}})    
                            .then(response => {
                                console.log(response.data)
                            })
                        })
                    })
                })
            }
        }
    }
</script>

<style lang="scss">
    .el-card{
        position: absolute;
        left: 0;
        right: 0;
        width: 400px;
        margin: auto;
    }
    .vertical_input{
        float: none;
        display: inline-block;
        vertical-align: inherit;
    }
    
    .svg-container {
        padding: 6px 5px 6px 15px;
        width: 30px;
        display: inline-block;

  }
    .el-input {
        display: inline-block;
    }

</style>
