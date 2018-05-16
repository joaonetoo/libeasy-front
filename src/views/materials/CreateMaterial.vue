<template>
        <div class="app-conteiner">
        <el-form ref="form" :model="material" style="padding: 20px" >

            <el-form-item label="Nome" style="height: 10%">
                <el-input v-model="material.name" icon-class="user" placeholder="Insira o nome do material">
                    fa-thumbs-up
                </el-input>
            </el-form-item>
            <el-form-item label="Descrição" style="height: 10%">
                <el-input v-model="material.description" icon-class="user" placeholder="Uma breve descriçao">
                    fa-thumbs-up
                </el-input>
            </el-form-item>
            <el-form-item label="Categoria" style="height: 10%">
                <el-input v-model="material.category" icon-class="user" placeholder="Uma breve descriçao">
                    fa-thumbs-up
            </el-input>
            </el-form-item>

            <el-form-item label="Avatar" >

                <el-upload style="margin-top: 30px;width: 30%;"
                    class="upload-demo"
                    drag
                    action="http://localhost:3000/materials"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                </el-upload>
            </el-form-item>

            <center><el-button class="btn-login" @click.prevent="addMaterial()"  type="primary">Cadastrar</el-button></center>

        </el-form>
    </div>
</template>

<script>
    import axios from 'axios'
    import '@/styles/custom-buttons.scss'
    import * as auth from '@/utils/auth/'
    import store from '@/store'
    export default {
        
        name: 'CreateMaterial',
        data: function(){
            return{
                material:{
                    name: "",
                    description: "",
                    category: "",
                    image: File
                },
                fileList: []
            }
        },
        created: function(){
            if(store.getters.roles !== 'librarian'){
                this.$router.push({name: "Dashboard"})
            }
        },
        methods:{
            addMaterial: function(){
                const token = auth.getToken()
                if (this.fileList.length != 0){
                    this.material.image = fileList[0]
                }

                axios
                .post(process.env.URL_API+'/materials', formData,{headers: {"x-access-token": token}})
                .then(response =>{
                    console.log(response.data.message)
                    this.$router.push({name: "Dashboard"})
                }).catch(e=>{
                    this.$notify.error({
                        title: 'Erro',
                        message: "Preencha todos os campos do formulário"
                    });
                })
            },
            success: function(msg){
                if(msg == "Material added"){
                    this.$notify({
                        message: msg,
                        type: 'success'
                    });
                }else{
                    this.$notify.error({
                        title: 'Erro',
                        message: "Não foi possível cadastrar o material"
                    });    
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
        }
    }
</script>

