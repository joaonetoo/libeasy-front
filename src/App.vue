<template>
  <div id="app">

    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods:{
    space: function(e){
    if(e.which === 32){
      return true
    }
    if(e.which === 13){
      if (store.getters.roles == 'librarian'){
        console.log("teste")
      }
    }
  }

  }
}
</script>
