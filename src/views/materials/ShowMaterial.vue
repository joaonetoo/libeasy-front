<template>
<div>
    <center><h2>{{material.name}}</h2></center>
    <p>
    <center><img :src="setImage(material.image)"  class="image" style="width: 400px; height: 270px; border-radius: 20%;	border:2px solid #303133;
"></center>
    </p>
    <p>
        <center><b>Descrição:</b> {{material.description}}</center>
    </p>
</div>
</template>
<script>
    import axios from 'axios'
    import store from '@/store'
    export default {
        name: 'ShowMaterial',
        data: function(){
            return{
                material:{
                    name: "",
                    description: "",
                    category: "",
                    image: "",

                },
            }
        },
        created: function(){
            axios
            .get(process.env.URL_API+'/materials/'+this.$route.params.id,{headers: {"x-access-token": store.getters.token}})
            .then(response=>{
                this.material = response.data
            })
            .catch(e=>{
                console.log("error")
            })
        },
        methods:{
            setImage:function(img){
               return process.env.URL_API+'/'+img
            },

        }

}
</script>

