
<template>

    <div class="app-container">
        <el-card>
            <h2><strong> Editar Conta </strong></h2>
            <hr>

            <el-form ref="form" :model="user" >

                <el-form-item label="Login" style="height: 10%">
                    <el-input v-model="user.login" icon-class="user" placeholder="Login">
                        fa-thumbs-up
                    </el-input>
                </el-form-item>
                <el-form-item label="Nome">
                        <el-input v-model="user.first_name" placeholder="Seu nome completo">
                            
                        </el-input>
                </el-form-item>                
                <center><el-button class="btn-login" @click.prevent="editUser()" type="primary">Editar</el-button></center>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios'
    import store from '@/store'
    export default {
    name: 'EditUser',
    data: function(){
        return{
            user:{
                login: "",
                first_name: ""
            },
        }
    },
    created: function(){
        if (store.getters.roles === 'librarian' || store.getters.roles === 'client'){
            axios
            .get(process.env.URL_API+'/users/'+this.$route.params.id,{headers: {"x-access-token": store.getters.token}})
            .then(response=>{
                this.user = response.data
            })
            .catch(e=>{
                console.log("error")
            })
        }else{
            this.$router.push({name: "Dashboard"})

        }
    },  
        methods:{
        editUser: function(){
            const token = store.getters.token
            const data = {
                login: this.user.login,
                first_name: this.user.first_name
            }
            
            axios
            .put(process.env.URL_API+'/users/'+this.$route.params.id, data,{headers: {"x-access-token": token}})
            .then(response =>{
                this.$router.push({path: "/dashboard"})
            }).catch(e=>{
                this.$notify.error({
                    title: 'Erro',
                    message: "Preencha todos os campos do formulário"
                });
            })
        },
        success: function(msg){
            if(msg == "User Editado"){
                this.$notify({
                    message: msg,
                    type: 'success'
                });
            }else{
                this.$notify.error({
                    title: 'Erro',
                    message: "Não foi possível Editar o Perfil"
                });    
            }
        },
    }
}


</script>

<style>
</style>
