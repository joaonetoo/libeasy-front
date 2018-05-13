<template>
<div>
    <center><img src="./logo.png" width="80px" style="margin-top: 20px;"></center>

    <div class="app-container" style="width: 40%;">
        <el-card>
            <h2><strong> Adicionar um novo livro </strong></h2>
            <hr>

            <el-form ref="form" :model="book" >

                <el-form-item label="Título do livro">
                        <el-input v-model="title" placeholder="Descrição do livro">                            
                        </el-input>
                </el-form-item>               
                <center><el-button class="btn-login" @click.prevent="editBook()" type="primary">Editar Livro</el-button></center>
            </el-form>
        </el-card>
    </div>
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
            book: {},
            title: "",
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
