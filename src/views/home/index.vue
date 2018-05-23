<template>
<div>
    <center><img router-link to="/home" src="../users/logo.png" width="80px" style="margin-top: 10px;" ></center>
     <div class="app-container" style="width: 100%;">
        <el-carousel :interval="1200" type="card" height="700px">
            <el-carousel-item v-for="item in 9" :key="item">
                <img v-if="item == 1" src="./libeasy.png">
                <img v-if="item == 2" src="./2.png">
                <img v-if="item == 3" src="./3.png">
                <img v-if="item == 4" src="./4.png">
                <img v-if="item == 5" src="./5.png">
                <img v-if="item == 6" src="./6.png">
                <img v-if="item == 7" src="./7.png">
                <img v-if="item == 8" src="./8.png">
                <img v-if="item == 9" src="./9.png">
            </el-carousel-item>
        </el-carousel>
    </div>
    <div>
        <el-card>
            <router-link to="/users/auth">
            <center><el-button type="primary" >Acessar</el-button></center>
            </router-link>
        </el-card>
    </div>
</div>
</template>

<script>
    import axios from 'axios'
    import '@/styles/custom-buttons.scss'
     export default {}
</script>

<style lang="scss">
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-button{
      position: center;
      width: 400px;
       left: 0;
        right: 0;
        margin: 1%;
    }
</style>
