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
                 <input type="file" @change="onFileChange">


                <!-- <el-upload style="margin-top: 30px;width: 30%;"
                    class="upload-demo"
                    
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                </el-upload> -->
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
                },
                image: "",
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
                const data = {
                    name: this.material.name,
                    description: this.material.description,
                    category: this.material.category,
                    image: this.image
                }
                const form = new FormData()
                form.append('image', this.image)
                axios
                .post(process.env.URL_API+'/materials', data,{headers: {"x-access-token": token}})
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
        }
    }
</script>

