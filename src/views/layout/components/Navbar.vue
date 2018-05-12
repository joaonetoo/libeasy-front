<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            home
          </el-dropdown-item>
        </router-link>
        <button id="show-modal" @click="show()">Show Modal</button>
        <!-- use the modal component, pass in the prop -->
      
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
<modal name="hello-world" 
         :width="500"
         :height="300"
>
            <vue-avatar class="vertical_input"
                :width="400"
                :height="400"
                :rotation="rotation"
                :scale="scale"
                ref="vueavatar"
                @vue-avatar-editor:image-ready="onImageReady"
                >
            </vue-avatar>
            <div class="vertical_input" >
            <label>
                <input
                type="range"
                min=1
                max=3
                step=0.02
                v-model='scale'
                />
            </label>
            <br>
            <button v-on:click="saveClicked">Get image</button>
            <br>
            <img ref="image">
        </div>
</modal>
  </el-menu>

</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import {VueAvatar} from 'vue-avatar-editor-improved'

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
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    saveClicked () {
        var img = this.$refs.vueavatar.getImageScaled()
        this.$refs.image.src = img.toDataURL()
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
    }


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
    .vertical_input{
        float: none;
        display: inline-block;
        vertical-align: inherit;
    }

}
</style>

