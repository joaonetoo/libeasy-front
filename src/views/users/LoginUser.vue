<template>
<div>
    <center><img src="./logo.png" width="80px" style="margin-top: 20px;"></center>

    <div class="app-container" style="width: 40%;">
        <el-card>
            <h2><strong> Sign In </strong></h2>
            <hr>
            <el-form ref="form" :model="user" >
                <el-form-item label="Login" style="height: 10%">
                    <el-input v-model="user.login" icon-class="user" placeholder="Login">
                        fa-thumbs-up
                    </el-input>
                </el-form-item>
                <el-form-item label="Password" class="fonter" prop="pass" >
                        <el-input type="password" v-model="user.password" auto-complete="off" @keyup.enter.native="signIn()"></el-input>
                        <router-link style="float: right" :to="{ path: '/users/add' }">Não possui conta? Cadastra-se</router-link>
                </el-form-item>
                <center><el-button class="btn-login" @click.prevent="signIn()"  type="primary">Login</el-button></center>
            </el-form>

        </el-card>
    </div>
</div>
</template>

<script>
    import axios from 'axios'
    import '@/styles/custom-buttons.scss'
    import * as s from '@/utils/strings'
    export default {
        name: 'LoginUser',
        data:function(){
            return{
                user:{
                    login: "",
                    password: ""
                }
            }
        },
        methods:{
            signIn:function(){
                const data ={
                    login: this.user.login,
                    password: this.user.password
                }
                axios
                .post(process.env.URL_API+'/auth',data)
                .then(response=>{
                    this.message =response.data.message
                    if ( this.message ===  s.authUserAuthenticated ) {
                        this.$notify({
                        message: response.data.message,
                        type: 'success'
                        })
                    }
                    localStorage.setItem("token", response.data.token)
                    this.$router.push({name: "Dashboard"});
                })
                .catch(e=>{
                    this.$notify.error({
                    title: 'Erro',
                    message:  "Error"
                    });
                })
            },        
        }
        }
</script>
<style lang="scss" scopedSlots>
    .el-card{
        position: absolute;
        left: 0;
        right: 0;
        width: 400px;
        margin: auto;
    }


</style>