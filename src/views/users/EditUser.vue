
<template>
<!--Depois dou uma refatorada kk -->
    <div class="app-container">
            <center> <h1><strong> Edit User </strong></h1> </center>
            <hr>
        <center> <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar">
        </div></center>

            <el-form ref="form" :model="user" >

                <el-form-item label="Login" style="height: 10%">
                    <el-input v-model="user.login" icon-class="user" placeholder="Login">
                    </el-input>
                </el-form-item>
                <el-form-item label="Name">
                        <el-input v-model="user.first_name" placeholder="Your full name">
                        </el-input>
                </el-form-item> 
                <el-form-item prop="email" label="Email" :rules="[
                    { required: true, message: 'Please input email address', trigger: 'blur' },
                    { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
                    ]">
                    <el-input v-model="user.email" placeholder="exemplo@examplo.br" ></el-input>
                </el-form-item>
                 <el-form-item class="vertical_input" label="Cpf" style="width: 40%;" >
                        <el-input  type="text" placeholder="XXX.XXX.XXX-XX" v-model="user.cpf" v-mask-cpf></el-input>
                </el-form-item>
                <el-form-item class="vertical_input" label="Birthday" style="width: 40%;">
                    <el-date-picker v-model="user.birthday" type="date" placeholder="Birthday">
                    </el-date-picker>
                </el-form-item>
                
                <el-button class="btn-login" @click="dialogTableVisible = true">Edit Password</el-button>
                <el-dialog v-el-drag-dialog @dragDialog="handleDrag" title="Edit Password" :visible.sync="dialogTableVisible">
                        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
                        <el-form-item label="Password" prop="pass">
                            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Confirm" prop="checkPass">
                            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="btn-login" @click="editPassword('ruleForm2')">Update</el-button>
                            <el-button class="btn-login" @click="resetForm('ruleForm2')">Reset</el-button>
                        </el-form-item>
                        </el-form>
                </el-dialog>
                             
                <center><el-button class="btn-login" @click.prevent="editUser()" type="primary">Update</el-button></center>
            </el-form>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import axios from 'axios'
    import store from '@/store'
    import {VueAvatar} from 'vue-avatar-editor-improved'
    export default {
    name: 'EditUser',
    data: function(){

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password again'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('Two inputs don\'t match!'));
        } else {
          callback();
        }
        };
        return{
            dialogTableVisible: false,
            user:{
                login: "",
                first_name: "",
                email: "",
                password: "",
                cpf: "",
                birthday: "",
                address: "",
                type: ""    
            },
            ruleForm2: {
            pass: "",
            checkPass: ""
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]          
        }
      
    } 
    },
      components: {
        VueAvatar
    },
  computed: {
    ...mapGetters([
      'avatar'
        ])
    },



    created: function(){
            axios
            .get(process.env.URL_API+'/users/'+this.$route.params.id,{headers: {"x-access-token": store.getters.token}})
            .then(response=>{
                this.user = response.data
            })
            .catch(e=>{
                console.log("error")
            })
    },  
        methods:{
        editUser: function(){
            const token = store.getters.token
            const data = {
                login: this.user.login,
                first_name: this.user.first_name,
                email: this.user.email,
                cpf: this.user.cpf,
                birthday: this.user.birthday,
                address: this.user.address
            } 
            axios
            .put(process.env.URL_API+'/users/'+this.$route.params.id, data,{headers: {"x-access-token": token}})
            .then(response =>{
                this.$router.push({path: "/dashboard"})
                this.$notify({
                        message: response.data.message,
                        type: 'success'
                        })
            }).catch(e=>{
                this.$notify.error({
                    title: 'Erro',
                    message: "Preencha todos os campos do formulário"
                });
            })
        },
          editPassword: function(formName){
            this.$refs[formName].validate((valid) => {
            const token = store.getters.token
            const data = {
                password: this.ruleForm2.checkPass
            }
            if (valid) {
                this.$notify({
                    title: 'Success',
                    message: 'Password Edited',
                    type: 'success'
                    });
            axios
            .put(process.env.URL_API+'/users/'+this.$route.params.id, data,{headers: {"x-access-token": token}})
            .then(response =>{
                this.$store.dispatch('LogOut').then(() => {
                    location.reload()})
                })
            }
            })
        },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}


</script>

<style>

.avatar-wrapper {
      margin-top: 15px;
}
.user-avatar {
        width: 200px;
        border-radius: 150px;
      }
</style>
