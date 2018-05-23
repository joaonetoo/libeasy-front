<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <screenfull class= "navbar">
      <div class="search">
         <form id="demo-2">
	        <input type= "search" placeholder="Search books">
        </form>
      </div>
    </screenfull>

    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar">
        <i class="el-icon-caret-bottom"></i>
      </div>
      
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            Home
          </el-dropdown-item>
        </router-link>
          <el-dropdown-item>
            <span @click.prevent="show()">Change Avatar</span>
          </el-dropdown-item>

        <!-- use the modal component, pass in the prop -->
      
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
<modal name="hello-world" 
         :width="600"
         :height="320"
>
            <vue-avatar id="avatar-container"
                :width="400"
                :height="400"
                :rotation="rotation"
                :scale="scale"
                ref="vueavatar"
                @vue-avatar-editor:image-ready="onImageReady"
                >
            </vue-avatar>
          
            <label>
              <span>Zoom</span>
              <br>
                <input
                type="range"
                min=1
                max=3
                step=0.02
                v-model="scale"
                class="range blue"
                />
            </label>
<br>
  <label>
    <span>Rotation</span>
    <br>
    <input
      type="range"
      min=0
      max=360
      step=1
      v-model="rotation"
      class="range"

    />
  </label>

            <br>
            <center><el-button class="btn-login" @click="saveClicked()"> Atualizar</el-button></center>
            <br>
</modal>
  </el-menu>

</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import {VueAvatar} from 'vue-avatar-editor-improved'
import axios from 'axios'
import store from '@/store'
import '@/styles/custom-buttons.scss'

export default {
  
  data: function(){
    return{
      showModal: false,
      rotation: 0,
      scale: 1,
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    VueAvatar
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'roles'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()
      })
    },
    saveClicked() {
        const img = this.$refs.vueavatar.getImageScaled()
        let formData = new FormData();
        formData.append('profile_pic', img.toDataURL())
        axios
        .put(process.env.BASE_API+'/users/'+store.getters.id,formData,{headers: {'Content-Type': 'multipart/form-data'}})
        .then(response=>{
          this.$store.dispatch('ChangeAvatar').then(() => {
            location.reload() 
          })
        })
        .catch(e=>{
          console.log(e)
        })
    },
    onImageReady () {
        this.scale = 1
        this.rotation = 0
    },
    show () {
      this.$modal.show('hello-world');
    },
    hide () {
      this.$modal.hide('hello-world');
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  
  input[type=search] {
    outline: none;
    position: absolute;
    right: 100px;
    top: 5px;
    -webkit-appearance: textfield;
    -webkit-box-sizing: content-box;
    font-family: inherit;
    font-size: 100%;
  }
  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button {
    display: none; 
  }


  input[type=search] {
    background: #ededed url(https://static.tumblr.com/ftv85bp/MIXmud4tx/search-icon.png) no-repeat 9px center;
    border: solid 1px #ccc;
    padding: 10px 450px 9px 32px;
    width: 55px;
    
    -webkit-border-radius: 10em;
    -moz-border-radius: 10em;
    border-radius: 10em;
    
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    transition: all .5s;
  }
  input[type=search]:focus {
    
    width: 130px;
    background-color: #fff;
    border-color: #556B2F;
    
    -webkit-box-shadow: 0 0 5px rgba(109,207,246,.5);
    -moz-box-shadow: 0 0 5px rgba(109,207,246,.5);
    box-shadow: 0 0 5px rgba(109,207,246,.5);
  }


  input:-moz-placeholder {
    color: #999;
  }
  input::-webkit-input-placeholder {
    color: #999;
  }
  .avatar-container {
    top: -10px;
    height: 50px;
    
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      margin-top: 15px;
      position: relative;
      .user-avatar {
        width: 30px;
        height:30px;
        border-radius: 20px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: 5px;
        top: 10px;
        font-size: 12px;
      }
    }
  }
  #avatar-container{
    float: left;
    padding: 10px;
    margin: 5px;
  }

}

  </style>