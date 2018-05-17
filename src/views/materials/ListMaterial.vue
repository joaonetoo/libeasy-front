<template>
    <div class="form-control">
    <el-row>
    <el-col :span="5" v-for="(material,index) in materials" :key="material.id" style="margin: 10px;" >
        <el-card :body-style="{ padding: '10px' }">
        <center><img :src="setImage(material.image)"  class="image" style="width: 220px; height: 150px"></center>
        <div style="padding: 14px;">
            <span>{{material.name}}</span>
            <div class="bottom clearfix">
            <div v-if="roles === 'librarian'">
                <el-button type="text" class="btn-login button"  @click.prevent="removerMaterial(material.id,index)">Deletar</el-button>
                <el-button type="text" class="btn-login button" @click.prevent="editMaterial(material.id)">Editar</el-button>
            </div>
            <div v-else-if="roles === 'client'">
                <el-button type="text" class="btn-login button"  @click.prevent="showMaterial(material.id)">Mais Informações</el-button>
            </div>

            </div>
        </div>
        </el-card>
    </el-col>
    </el-row>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import axios from 'axios'
    import '@/styles/custom-buttons.scss'
    import * as auth from '@/utils/auth/'
    import store from '@/store'
    export default {
        name: 'ListMaterial',
        computed: {
            ...mapGetters([
            'roles'
            ])
        },
        data: function(){
            return {
                materials: [],
                image: "dsadas"
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
            removerMaterial:function(id,index){
                axios
                .delete(process.env.URL_API+'/materials/'+id,{headers: {"x-access-token": store.getters.token}})
                .then( response =>{
                    this.materials.splice(index, 1);
                    this.message = response.data.message
                })
                .catch(e =>{
                    this.message = "Não foi possível deletar o usuário"
                })
            },
            setImage:function(img){
               return process.env.URL_API+'/'+img
            },
            editMaterial:function(id){
                this.$router.push({path: "/materials/edit/"+id})
            },
            showMaterial:function(id){
                this.$router.push({path: "/materials/show/"+id})
            }
    }
}
</script>

<style scopedSlots>
    .el-col{
        width: 299px;
        margin: 100px;
    }
    .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 3px;
    padding-right: 3px;
    margin-left: 5px;

    float: right;
  }


  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
   
</style>
