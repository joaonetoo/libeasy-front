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
                        :trigger-on-focus="true"
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

            <el-form-item label="Avatar" >
                <br>
                 <input type="file" @change="onFileChange">
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
    import store from '@/store'

    export default {
        name: 'CreateBook',
        data() {
            return {
                categories:[{
                    description: "",
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
                image: "",
            }
           
        }, 
        created: function(){
            if(store.getters.roles !== 'librarian'){
                this.$router.push({name: "Dashboard"})
            }
        },
        methods:{
            //corrigir algumas coisas
            addBook:function(){
                const token = s.getToken()
                const data ={
                    title: this.book.title,
                    description: this.book.description,
                    edition: this.book.edition,
                    language: this.book.language,
                    page_count: this.book.page_count,
                    image: this.image
                }
                const form = new FormData()
                form.append('image', this.image)
                for(let i = 0; i < this.amountOfBooks; i++) {
                    axios.post(process.env.URL_API+'/books',data, {headers: {"x-access-token": token}})
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
                this.$router.push({path: "/books/list"})
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
                let array = []
                    axios.get(process.env.URL_API + '/categories', {headers: {"x-access-token": token}})
                    .then(response => {
                        for(let i = 0; i < response.data.length; i++) {
                            array.push({"description": response.data[i].description});
                        }

                        console.log(array)
                        return array
                    })
                
            },
            querySearchAsync(queryString, cb) {
                let category = this.categories;
                let results = queryString ? category.filter(this.createFilter(queryString)) : category;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                    console.log(results)
                }, 3000 * Math.random());
            },
            
            createFilter(queryString) {
                return (category) => {
                    return (category.description.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                    // Promise.resolve(category)
                    // .then((value) => {
                    //     value.forEach((element) => {
                    //         console.log(element.description)
                    //         return (element.description.toLowerCase().indexOf(queryString.toLowerCase()) === 0); 
                    //     });
                    // })
                };
            },

            handleSelect(item) {
                console.log(item);
            },
            onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
            },
            createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
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
<style>
input[type='file'] {
  background-color: #263238;
  border-radius: 5px;
  color: rgb(255, 195, 0);
  padding: 5px 20px;
  height: 30px;
  display: block;

}

::-webkit-file-upload-button {
  background: #263238;
  color: rgb(255, 195, 0);
  border-radius: 7px;
  display: block;

}
</style>