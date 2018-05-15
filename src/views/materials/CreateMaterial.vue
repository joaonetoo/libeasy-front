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
            <center><el-button class="btn-login" @click.prevent="addMaterial()"  type="primary">Cadastrar</el-button></center>

        </el-form>
    </div>
</template>

<script>
    import axios from 'axios'
    import '@/styles/custom-buttons.scss'
    import * as auth from '@/utils/auth/'
    export default {
        name: 'CreateMaterial',
        data: function(){
            return{
                material:{
                    name: "",
                    description: "",
                    category: ""
                }
            }
        },
        methods:{
            addMaterial: function(){
                const token = auth.getToken()
                axios
                .post(process.env.URL_API+'/materials', this.material,{headers: {"x-access-token": token}})
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
            }
        }
    }
</script>