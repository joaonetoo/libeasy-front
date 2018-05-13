<template>
<div>
    <center><img src="./logo.png" width="80px" style="margin-top: 20px;"></center>

    <div class="app-container" style="width: 40%;">
        <el-card>
            <h2><strong> Criar Conta </strong></h2>
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

                <el-form-item prop="email" label="Email" :rules="[
                    { required: true, message: 'Please input email address', trigger: 'blur' },
                    { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
                    ]">
                    <el-input v-model="user.email" placeholder="exemplo@examplo.br" ></el-input>
                </el-form-item>

                <el-form-item label="Password" class="fonter" prop="pass">
                    <el-input type="password" v-model="user.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item class="vertical_input" label="Cpf" style="width: 40%;" >
                        <el-input  type="text" placeholder="XXX.XXX.XXX-XX" v-model="user.cpf" v-mask-cpf></el-input>
                </el-form-item>
                <el-form-item class="vertical_input" label="Data de Nascimento" style="width: 40%;">
                    <el-date-picker v-model="user.birthday" type="date" placeholder="Data de Nascimento">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="Tipo">
                    <el-select v-model="user.type" placeholder="Selecione seu tipo de usuário">
                    <el-option label="Bibliotecário" value="librarian"></el-option>
                    <el-option label="Cliente" value="client"></el-option>
                    </el-select>
                </el-form-item>
                <center><el-button class="btn-login" @click.prevent="addUser()" type="primary">Cadastrar novo usuário</el-button></center>
            </el-form>
        </el-card>
    </div>
</div>
</template>

<script>
    import axios from 'axios'
    import '@/styles/custom-buttons.scss'
    export default{
        name: 'CreateUser',
        data: function(){
            return{
                user:{
                    login: "",
                    email: "",
                    password: "",
                    first_name: "",
                    cpf: "",
                    birthday: "",
                    address: "",
                    type: ""
                },
            }   
        },
        methods:{
            addUser:function(){
                axios
                .post(process.env.URL_API+'/users',this.user)
                .then(response=>{
                    this.signIn();

                })
                .catch(e=>{
                    this.$notify.error({
                    title: 'Erro',
                    message: "Preencha todos os campos do formulário"
                    });

                })
            },
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
