<template>
    <div class="app-container">
            <center> <h1><strong> Edit User </strong></h1> </center>
            <hr>
        <center> <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar">
        </div></center>

            <el-form :model="user" :rules="rules" ref="user" class="demo-ruleForm">
                    <el-form-item label="Login" prop="login">
                    <el-input v-model="user.login" placeholder="Login"></el-input>
                     </el-form-item>
                    <el-form-item label="Name" prop="first_name">
                    <el-input  v-model="user.first_name" placeholder="Your full name"></el-input>
                     </el-form-item>
                    <el-form-item label="Email" prop="email">
                    <el-input type="email" v-model="user.email" placeholder="exemplo@examplo.br"></el-input>
                     </el-form-item>
                     <el-form-item class="vertical_input" label="Cpf" prop="cpf">
                    <el-input type="text" placeholder="XXX.XXX.XXX-XX" v-model="user.cpf" v-mask-cpf></el-input>
                     </el-form-item>
                    <el-form-item class="vertical_input" label="Birthday">
                    <el-date-picker type="date" v-model="user.birthday"></el-date-picker>
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
                             
                <center><el-button class="btn-login" @click="editUser('user')">Update</el-button></center>
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
        rules: {

            login: [
            { required: true, message: 'Please input login', trigger: 'blur' },
                ],
            first_name: [
            { required: true, message: 'Please input your name', trigger: 'blur' },
                ],
            email: [
            {required: true, message: 'Please input email address', trigger: 'blur' },
            { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change']}
                ],
            cpf: [
            { required: true, message: 'Please input your Cpf', trigger: 'blur' }
            ]
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
        editUser: function(formName){
            this.$refs[formName].validate((valid) => {
            const token = store.getters.token
            const data = {
                login: this.user.login,
                first_name: this.user.first_name,
                email: this.user.email,
                cpf: this.user.cpf,
                birthday: this.user.birthday,
                address: this.user.address
            }
            if (valid) {
            axios
            .put(process.env.URL_API+'/users/'+this.$route.params.id, data,{headers: {"x-access-token": token}})
            .then(response =>{
                
                if(response.data.message != "User changed" ){
                    this.$notify.error({
                    title: 'Erro',
                    message: response.data.message
                    });
                }
                else{    
                this.$router.push({path: "/dashboard"})
                this.$notify({  
                    title: 'Success',
                    message: response.data.message,
                    type: 'success'
                    });
                }          
            })
            }else{
                this.$notify.error({
                title: 'Erro',
                message: "Check the fields"
                    });}
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
