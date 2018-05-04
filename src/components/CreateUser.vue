<template>
<div>
    {{message}}
    <el-col :span="8" :offset="8">
        <el-card>
            <div slot="header">
                <center><span>Cadastro de Usuario</span></center>
            </div>
            <el-form ref="form" :model="user">
                <el-form-item label="Login">
                    <el-input v-model="user.login"></el-input>
                </el-form-item>

                <el-form-item prop="email" label="Email" :rules="[
                    { required: true, message: 'Please input email address', trigger: 'blur' },
                    { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
                    ]">
                    <el-input v-model="user.email"></el-input>
                </el-form-item>

                <el-form-item label="Password" prop="pass">
                    <el-input type="password" v-model="user.password" auto-complete="off"></el-input>
                </el-form-item>
                
                <el-form-item label="Nome">
                        <el-input v-model="user.first_name"></el-input>
                </el-form-item>
                
                <el-form-item label="Sobrenome">
                        <el-input v-model="user.last_name"></el-input>
                </el-form-item>
                
                <el-form-item label="Cpf">
                        <el-input v-model="user.cpf"></el-input>
                </el-form-item>
                
                <el-form-item label="Tipo">
                    <el-select v-model="user.type" placeholder="selecione seu tipo de usuário">
                    <el-option label="Bibliotecário" value="librarian"></el-option>
                    <el-option label="Cliente" value="cliente"></el-option>
                    </el-select>
                </el-form-item>
                
                <el-date-picker v-model="user.birthday" type="date" placeholder="Pick a day">
                
                </el-date-picker>

                <el-button @click.prevent="addUser()" type="primary">Cadastrar</el-button>
                
            </el-form>
        </el-card>
    </el-col>
</div>
</template>

<script>
    import axios from 'axios'

    export default{
        name: 'CreateUser',
        data: function(){
            return{
                user:{
                    login: "",
                    email: "",
                    password: "",
                    first_name: "",
                    last_name: "",
                    cpf: "",
                    birthday: "",
                    address: "",
                    type: ""
                },
                message: ""
            }   
        },
        methods:{
            addUser:function(){
                axios
                .post("http://127.0.0.1:3000/users",this.user)
                .then(response=>{
                    this.message = response.data.message
                })
                .catch(e=>{
                    this.message = "Error"
                })
            }
        }
    }
</script>