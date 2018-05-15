<template>
  <div class="dashboard-container">
    <center><div class="dashboard-text"> Welcome to LibEasy {{login}}, where our dreams come true</div></center>
            <div class="dashboard-text"><span>{{first_name}}</span></div>
      
      
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
