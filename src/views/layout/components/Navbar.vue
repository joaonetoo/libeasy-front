<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
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
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
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
