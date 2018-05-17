<template>
<div class="app-conteiner">
    
    <div class="app-container" >
       


            <el-form ref="form" :model="book">
                 
                <el-form-item id="el-form-label">
                    <center> <h1>Adicionar Livro </h1></center>
                </el-form-item>
                <el-form-item id="el-form-label" label="Título do livro" >
                        <el-input v-model="book.title" placeholder="Descrição do livro" required>                            
                        </el-input>
                </el-form-item>  

                <el-form-item id="el-form-label" label="Descrição do livro">
                        <el-input type="textarea" v-model="book.description" placeholder="Descrição do livro" required>
                        </el-input>
                </el-form-item>

                <el-form-item id="el-form-label" label="Edição do livro">
                        <el-input v-model="book.edition" placeholder="Edição do livro" required>                            
                        </el-input>
                </el-form-item>  

                <el-form-item id="el-form-label" label="Idioma do livro">
                        <el-input v-model="book.language" placeholder="Idioma do livro" required>                            
                        </el-input>
                </el-form-item>  
                <el-row :key="index" v-for="(categ, index) in category">
                        <!-- {{ index+1 }}<br><el-autocomplete
                        v-model="categ.description"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="Please Input"
                        :trigger-on-focus="false"
                        ></el-autocomplete> -->
                    <el-form-item id="el-form-label" label="Categoria">
                            {{ index+1 }}<el-input :id="index" v-model="categ.description" placeholder="Categorias do livro" required>                            
                            </el-input>
                    </el-form-item>
                    <el-button id="el-form-label" type="primary" circle icon="el-icon-delete" @click.prevent="removeRowCategory(index)"></el-button>
                </el-row>
                <el-button id="el-form-label" type="primary" circle icon="el-icon-plus" @click.prevent="addRowCategory()"></el-button>

                <el-row :key="index" v-for="(autho, index) in author">
                    <el-form-item id="el-form-label" label="Autores do livro">
                            {{ index+1 }}<el-input v-model="autho.name" placeholder="Autores do livro" required>                            
                            </el-input>
                    </el-form-item> 
                    <el-form-item>
                    <el-button id="el-form-label" type="primary" circle icon="el-icon-delete" @click.prevent="removeRowAuthor(index)"></el-button>
                    </el-form-item>
                </el-row>
                <el-button id="el-form-label" type="primary" circle icon="el-icon-plus" @click.prevent="addRowAuthor()"></el-button>
                
                <el-form-item id="el-form-label" label="Número de páginas do livro">
                    <br><el-input-number v-model="book.page_count"  :min="1"></el-input-number>
                </el-form-item>  
                
                <el-form-item id="el-form-label" label="Amount of books">
                        <br><el-input-number v-model="amountOfBooks" :min="1"></el-input-number>
                </el-form-item>  


                
                <center><el-button class="btn-login" @click.prevent="addBook()" type="primary">Cadastrar novo Livro</el-button></center>
            </el-form>
        
    </div>
</div>
</template>

<script>
    import axios from 'axios'
    import '@/styles/custom-buttons.scss'
    import * as s from '@/utils/auth/'

    export default{
        name: 'CreateBook',
        data() {
            return {
                categories:[{
                }],
                book: {
                    title: "",
                    description: "",
                    edition: "",
                    language: "",
                    page_count: ""
                },
                author:[{
                    name:"",
                }],

                category:[{
                    description:"",
                }],

                timeout: null,

                amountOfBooks: 1,
            }
           
        }, 

        methods:{
            //corrigir algumas coisas
            addBook:function(){
                const token = s.getToken()
                console.log(token)
                for(let i = 0; i < this.amountOfBooks; i++) {
                    axios.post(process.env.URL_API+'/books', this.book, {headers: {"x-access-token": token}})
                    .then(response=>{                 
                        let bookId = response.data.object.id;

                        for(let i = 0; i < this.author.length; i++) {
                            let createAuthor = axios.post(process.env.URL_API+'/authors', this.author[i], {headers: {"x-access-token": token}})
                            .then(response => {
                                console.log(response.data)
                                let authorId = response.data.object.id;
                                let idsAuthor = {
                                    bookId: bookId,
                                    authorId: authorId
                                }

                                let addAuthorToBook = axios.post(process.env.URL_API+'/addAuthorToBook', idsAuthor, {headers: {"x-access-token": token}})    
                                    .then(response => {
                                        console.log(response.data)
                                    })
                                
                            })
                        }

                        for(let i = 0; i < this.category.length; i++) {
                            let createCategory = axios.post(process.env.URL_API+'/categories', this.category[i], {headers: {"x-access-token": token}})
                                .then(response => {
                                    console.log(response.data)

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
                        }
                    })
                    
                }
            },

            addRowCategory:function() {
                this.displayCategory = true
                this.category.push({
                    description: ''
                })
            },

            removeRowCategory:function(index) {
                    this.category.splice(index, 1)
            },

            addRowAuthor:function() {
                this.displayAuthor = true
                this.author.push({
                    name: ''
                })
            },

            removeRowAuthor:function(index) {
                this.author.splice(index, 1)
            },

            // querySearch(queryString, cb) {
            //     const token = s.getToken();
            //     axios.get(process.env.URL_API + '/categories', {headers: {"x-access-token": token}})
            //         .then(response => {
            //             if(response) {
            //                 for(let i = 0; i < response.data.length; i++) {
            //                     this.categoriesAutocomplete.push(response.data[i].description)
            //                 }
            //             }
            //             console.log(this.categoriesAutocomplete)
            //             cb(this.categoriesAutocomplete)
            //             this.categoriesAutocomplete = []
            //         })
            // },

            loadAll() {
                const token = s.getToken()
                return [
        //             { "value": "vue", "link": "https://github.com/vuejs/vue" },
        //   { "value": "element", "link": "https://github.com/ElemeFE/element" },
        //   { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
        //   { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
        //   { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
        //   { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
        //   { "value": "babel", "link": "https://github.com/babel/babel" }
                    axios.get(process.env.URL_API + '/categories', {headers: {"x-access-token": token}})
                    .then(response => {
                        return response.data
                        // let array = [];
                        // if(response) {
                        //     for(let i = 0; i < response.data.length; i++) {
                        //         array.push(response.data[i])
                        //     }
                        // }
                        // console.log(array)

                        // return array;
                    })
                ]
            },
            querySearchAsync(queryString, cb) {
                let categories = this.categories;
                let results = queryString ? categories.filter(this.createFilter(queryString)) : categories;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    console.log(results)
                    cb(results);
                    console.log(results)
                }, 3000 * Math.random());
            },
            
            createFilter(queryString) {
                return (category) => {
                    Promise.resolve(category)
                    .then((value) => {
                        value.forEach((element) => {
                            console.log(element.description)
                            return (element.description.toLowerCase().indexOf(queryString.toLowerCase()) === 0); 
                        });
                    })
                };
            },

            handleSelect(item) {
                console.log(item);
            },
        },
            mounted() {
                console.log(this.categories)
                this.categories = this.loadAll();
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
