<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{avatar}}</div>
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
      'roles',
      'id',
      'avatar'
      
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
