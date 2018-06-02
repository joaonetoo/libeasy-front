<template>
  <div class="dashboard-container">
    <div v-if="roles === 'client'">
          <h2>{{resultSearch}}</h2>
      <hr>
        <div v-if="loading" id="loader"></div>
          <div element-loading-text="Loading">
            <div class="form-control">
              <el-row>
                <el-col :span="5" v-for="(book) in books" :key="book.id" style="margin: 10px;" >
                    <el-card :body-style="{ padding: '10px' }">
                      <center><img :src="book.image"  class="image" style="width: 128px; height:192px"></center>
                    <div style="padding: 14px;">
                        <span>{{book.title}}</span>
                    </div>
                  </el-card>
                </el-col>
            </el-row>
          </div>
    </div>
    

    </div>
    <div v-else class="dashboard-text">
          <h2>{{resultSearch}}</h2>
      <hr>
        <div v-if="loading" id="loader"></div>
          <div element-loading-text="Loading">
            <div class="form-control">
              <el-row>
                <el-col :span="5" v-for="(book,index) in books" :key="book.id" style="margin: 10px;" >
                    <el-card :body-style="{ padding: '10px' }">
                      <center><img :src="book.image"  class="image" style="width: 128px; height:192px"></center>
                    <div style="padding: 14px;">
                        <span>{{book.title}}</span>

                        <div class="bottom clearfix">
                          <el-button v-if="!api" type="text" class="btn-login button" @click.prevent="editBook(book.id)">Edit</el-button>
                          <el-button v-if="api" type="text" class="btn-login button" @click.prevent="addBook(book.api_id,index)">Add</el-button>
                          <!-- <el-button type="text" class="btn-login button" @click.prevent="addBook(book.api_id,index)">More Informations</el-button> -->

                        </div>
                    </div>
                  </el-card>
                </el-col>
            </el-row>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import store from '@/store'
import * as s from '@/utils/strings'

export default {
  name: 'dashboard',
  
  computed: {
    ...mapGetters([
      'login',
      'id',
      'roles',
      'avatar',
      'books',
      'loading',
      'resultSearch',
      'api'
    ])
  },
  data: function(){
    return{
      title: 'New Books',

    }
  },
  created: function(){
        this.$store.dispatch('GetLast').then(() => {
        })     
  },
  methods:{

    addBook:function(apiId,index){
      axios
      .post( process.env.BASE_API+'/books/create',{api_id: apiId}, {headers: {"x-access-token": store.getters.token}})
      .then(res =>{
        this.message = res.data.message
        if(this.message ===  s.bookExists){
          this.$notify.error({
            title: 'Erro',
            message: this.message
          });
        }else{
          this.$notify({
          message: this.message,
          type: 'success'

          });
          this.books.splice(index, 1);

        }


      })
    },
    verify:function(api_id){
      store.getters.books.forEach(book => {
        if(book.api_id === api_id){
          return true
        }
      });
      return false
    },
    editBook:function(id){
        this.$router.push({path: "/books/edit/"+id})
  },

  }

}
</script>
<style>

</style>

<style rel="stylesheet/scss" lang="scss" scoped>

.dashboard {
  &-container {
    margin: 30px;
  }
}
</style>
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
#loader {
    position: relative;
    left: 50%;
    top: 150px;
    width: 100px;
    height: 100px;
    margin: -120px 0 0 -120px;
    border-radius: 100%;
    animation: spin 0.5s linear infinite;
    z-index: 1000;

}
 
#loader:before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 100%;
    border: 5px solid transparent;
    border-top-color: #FFC300;
    animation: spin 3s linear infinite;
}
 
#loader:after {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 100%;
    border: 5px solid transparent;
    border-top-color: #263238;
    animation: spin 3s linear infinite; 
    animation-delay: 2s;

}
 
@keyframes spin {
    0%   {
        -webkit-transform: rotate(0deg); 
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
}
</style>
