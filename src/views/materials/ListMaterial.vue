<template>
    <div class="form-control">
        <ul>
            <li v-for="(material,index) in materials" :key="material.id">
                {{material.category}} - <button  class="btn btn-success" @click.prevent="removerMaterial(material.id,index)">remover</button>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios'
    import * as auth from '@/utils/auth/'
    import store from '@/store'
    export default {
        name: 'ListMaterial',
        data: function(){
            return{
                materials: []
            }
        },
        created: function(){
            axios
            .get(process.env.URL_API+'/materials',{headers: {"x-access-token": store.getters.token}})
            .then(response=>{
                this.materials = response.data
            })
            .catch(e=>{
                console.log("error")
            })
        },
        methods:{
            removerUser:function(id,index){
                axios
                .delete(process.env.URL_API+'/materials/'+store.getters.id,{headers: {"x-access-token": store.getters.token}})
                .then( response =>{
                    this.materials.splice(index, 1);
                    this.message = response.data.message
                })
                .catch(e =>{
                    this.message = "Não foi possível deletar o usuário"
                })
            }
    }
}
</script>