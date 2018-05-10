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
                <el-form-item label="Password" class="fonter" prop="pass">
                        <el-input type="password" v-model="user.password" auto-complete="off"></el-input>
                </el-form-item>
                <center><el-button class="btn-login" @click.prevent="signIn()" type="primary">Cadastrar</el-button></center>

            </el-form>
        </el-card>
    </div>
</div>
</template>

<script>
    import axios from 'axios'
    import '@/styles/custom-buttons.scss'
    export default{
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
                    localStorage.setItem("token", response.data.token)
                    this.message =response.data.message

                    this.$notify({
                    title: 'Success',
                    message: response.data.message,
                    type: 'success'
                    });
                    this.$router.push({name: "Dashboard"})

                })
                .catch(e=>{
                    this.$notify.error({
                    title: 'Erro',
                    message: "Preencha todos os campos do formulário"
                    });
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

</style>
