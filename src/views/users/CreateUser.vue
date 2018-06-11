<template>
<div>
    <center><img src="./logo.png" width="80px" style="margin-top: 20px;"></center>
      <div class="container" >
    <div class="wrapper">
      <div class="frm--create-account">
        <h1 class="frm__title">Create Account</h1>
        <!-- create account form starts here -->
        <form action="" class="frm__create__account" ref="form" :model="user">
          
          <div class="frm-group inline">
            <div class="frm-group">
              <label for="nick1">Login</label>
              <el-input v-model="user.login" icon-class="user" placeholder="Login">
                        fa-thumbs-up
              </el-input>
            </div>
            <div class="frm-group">
              <label for="pass1">Name</label>
              <el-input v-model="user.first_name" placeholder="Your name complete">

              </el-input>
            </div>
          </div>
          <div class="frm-group">
            <label prop="email" label="Email" :rules="[
                    { required: true, message: 'Please input email address', trigger: 'blur' },
                    { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
                    ]">Your E-Mail</label>
             <el-input v-model="user.email" placeholder="exemplo@examplo.br" ></el-input>
          </div>
          <div class="frm-group inline">
            <div class="frm-group">
              <label for="password">Password</label>
              <el-input type="password" v-model="user.password" auto-complete="off"></el-input>
            </div>
            <div class="frm-group">
              <label for="cpf">Cpf</label>
              <el-input  type="text" placeholder="XXX.XXX.XXX-XX" v-model="user.cpf" v-mask-cpf></el-input>
            
            </div>
          </div>
          
          <div class="frm-group inline">
            <div class="frm-group">
              <label for="birthday">Date of birth</label>
              <el-date-picker v-model="user.birthday" type="date" placeholder="   Date of birth">
              </el-date-picker>
              
            </div>
            <div class="frm-group">
              <label for="type">Type of profile</label>
              <el-select v-model="user.type" placeholder="Select your type of profile">
                    <el-option label="Bibliotecário" value="librarian"></el-option>
                    <el-option label="Cliente" value="client"></el-option>
              </el-select>

            </div>
          </div>
          
          <div class="frm-info">
            <router-link style="float: right" :to="{ path: '/users/login' }" class="frm__link" >Already have an account? Sign in</router-link><br>
          </div>
          <div class="frm-group">
            <input type="submit" class="frm__btn-primary" value="Create account" @click.prevent="addUser()" >
          </div>
          
        </form>
        <!-- /.create account form starts here -->
      </div>
    </div>
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
    /* extends */
.frm--create-account input[type="text"],
.frm--create-account input[type=":first-of-type"],
.frm--create-account input[type="email"],
.frm--create-account input[type="password"], .frm__btn-primary,{
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-family: inherit;
  font-size: 12px;
  letter-spacing: .5px;
  font-weight: bold;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  padding: 0 18px;
  height: 40px;
  width: 100%;
  display: block;
  outline: none;
  border: none;
}

html {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

*,
*:before,
*::before,
*:after,
*::after {
  -webkit-box-sizing: inherit;
  -moz-box-sizing: inherit;
  box-sizing: inherit;
}

body {
  margin: 0;
  
}

[hidden] {
  display: none !important;
}

html,
body,
#root {
  height: 100%;
  
}

body {
  color: #0c0c0d;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  
}


h1, h2 {
  font-weight: 700;
  text-align: center;
}

/* layout css */
.container {
  max-width: 500px;
  margin: auto;
}

.wrapper {
  padding: 10px;
}

/* global css */
.frm--create-account {
  width: 100%;
  background-color: #fff;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  padding: 5px 1em 1em;
  -webkit-box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(160, 170, 179, 0.12), 0 8px 10px -5px rgba(171, 191, 216, 0.4);
  -moz-box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(160, 170, 179, 0.12), 0 8px 10px -5px rgba(171, 191, 216, 0.4);
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(160, 170, 179, 0.12), 0 8px 10px -5px rgba(171, 191, 216, 0.4);
}

.frm--create-account label {
  font-family: inherit;
  font-size: 11px;
  color: #adadb5;
  font-weight: bold;
  letter-spacing: .5px;
  padding: 0 18px;
  margin: 0 0 3px;
  display: block;
}

.frm--create-account input[type="text"],
.frm--create-account input[type="type"],
.frm--create-account input[type="email"],
.frm--create-account input[type="password"] {
  background-color: #eff2f7;
  border: 1px solid #eff2f7;
  -webkit-transition: -webkit-box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  transition: -webkit-box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  -o-transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  -moz-transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1), -moz-box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1), -webkit-box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1), -moz-box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.frm--create-account input[type="text"]:hover,
.frm--create-account input[type="type"]:hover,
.frm--create-account input[type="email"]:hover,
.frm--create-account input[type="password"]:hover {
  outline: none;
  border: 1px solid #e0e2e8;
}

.frm--create-account input[type="text"]:focus,
.frm--create-account input[type="type"]:focus,
.frm--create-account input[type="email"]:focus,
.frm--create-account input[type="password"]:focus {
  border: 1px solid #fff;
  line-height: 30px;
  background-color: #fff;
  -webkit-box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(160, 170, 179, 0.12), 0 8px 10px -5px rgba(171, 191, 216, 0.4);
  -moz-box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(160, 170, 179, 0.12), 0 8px 10px -5px rgba(171, 191, 216, 0.4);
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(160, 170, 179, 0.12), 0 8px 10px -5px rgba(171, 191, 216, 0.4);
}

.frm-group {
  margin: 0 0 15px;
}

.frm-group.inline {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -moz-box-orient: horizontal;
  -moz-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -moz-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.frm-group.inline .frm-group {
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 100%;
  -moz-box-flex: 1;
  -ms-flex: 1 1 100%;
  flex: 1 1 100%;
}

.frm-group.inline .frm-group:not(:last-child) {
  margin: 0 15px 15px 0;
}


.frm__title {
  font-size: 1.8em;
  text-align: center;
  letter-spacing: -1px;
  word-spacing: -1px;
  margin: 0;
  padding: 1em 0 1em;
}

.frm-info {
  margin: 1em 0;
}

.frm__txt {
  font-family: inherit;
  font-size: 14px;
  text-align: center;
}

.frm__link {
  font-family: inherit;
  font-weight: 600;
  text-decoration: underline;
}

.frm__btn-primary {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: #fff;
  background-color: #263238;
  border: 1px solid;
  cursor: pointer;
}

.frm__btn-primary:hover {
  background-color: #FFC300;
}

.frm__or {
  width: 100%;
  height: 1px;
  position: relative;
  background-color: #f7f7f7;
  margin: 2em 0;
}

.frm__or:before {
  content: 'OR';
  text-align: center;
  font-family: inherit;
  font-weight: 600;
  font-size: 12px;
  color: #ebebeb;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 0 10px;
}

@media screen and (max-width: 480px) {
  .frm-group.inline {
    display: block;
  }
  .frm-group.inline .frm-group:not(:last-child) {
    margin: 0 0 15px;
  }
}

.ajay {
  font-family: sans-serif;
  font-size: 14px;
  position: fixed;
  right: 20px;
  bottom: 10px;
}
.ajay a {
  text-decoration: none;
  color: #333;
}
.ajay a:hover {
  text-decoration: underline;
  color: #000;
}

</style>
