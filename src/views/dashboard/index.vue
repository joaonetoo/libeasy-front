<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Welcome to LibEasy, where dreams come true</div>
    <div class="dashboard-text">name:{{login}}</div>
    <div class="dashboard-text"><span>{{roles}}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'login',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
