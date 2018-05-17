<template>
    <div class="form-control">
    <el-row>
    <el-col :span="5" v-for="(book,index) in books" :key="book.id" style="margin: 10px;" >
        <el-card :body-style="{ padding: '10px' }">
        <center>{{book.title}}</center>
        <div style="padding: 14px;">
            <span>{{book.name}}</span>
            <span>{{book.description}}</span>
            
            <div class="bottom clearfix">
            <el-button type="text" class="btn-login button"  @click.prevent="removerBook(book.id,index)">Deletar</el-button>
            <el-button type="text" class="btn-login button" @click.prevent="editBook(book.id)">Editar</el-button>

            </div>
        </div>
        </el-card>
    </el-col>
    </el-row>
    </div>

</template>

<script>
    import axios from 'axios'
    import '@/styles/custom-buttons.scss'
    import * as auth from '@/utils/auth/'
    import store from '@/store'
    export default {
        name: 'ListBook',
        data: function(){
            return {
                books: [],
                image: "dasdasdsa"
            }
        },
        created: function(){
            if (store.getters.roles === 'librarian'){
                axios
                .get(process.env.URL_API+'/books',{headers: {"x-access-token": store.getters.token}})
                .then(response=>{
                    this.books = response.data
                    
                })
                .catch(e=>{
                    console.log("error")
                })
            }else{
                this.$router.push({name: "Dashboard"})

            }
        },
        methods:{
         
        removerBook:function(id,index){
        axios
            .delete(process.env.URL_API+'/books/'+id,{headers: {"x-access-token": store.getters.token}})
                .then( response =>{
                    this.materials.splice(index, 1);
                    this.message = response.data.message
                })
                .catch(e =>{
                    this.message = "Não foi possível deletar o livro"
                })
            },
        editBook:function(id){
                this.$router.push({path: "/books/edit/"+id})
        }

            
        }
       
        
        
    }
</script>