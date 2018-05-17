<template>
<div>
    <center><img src="" width="80px" style="margin-top: 10px;"></center>
     <div class="app-container" style="width: 100%;">
        <el-carousel :interval="4000" type="card" height="700px">
            <el-carousel-item v-for="item in 6" :key="item">
            </el-carousel-item>
        </el-carousel>
    </div>
    <div>
        <el-card>
            <router-link to="{ path: '/users/auth' }">
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
