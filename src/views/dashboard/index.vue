<template>
  <div class="dashboard-container">
    <div v-if="roles === 'client'">
              <div  v-loading="loading"  element-loading-text="Loading">
      <div class="form-control">
        <el-row>
          <el-col :span="5" v-for="(book) in books" :key="book.id" style="margin: 10px;" >
              <el-card :body-style="{ padding: '10px' }">
                <center><img :src="book.images.smallThumbnail"  class="image" style="width: 128px; height:192px"></center>
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
                <div  v-loading="loading"  element-loading-text="Loading">
      <div class="form-control">
        <el-row>
          <el-col :span="5" v-for="(book) in books" :key="book.id" style="margin: 10px;" >
              <el-card :body-style="{ padding: '10px' }">
                <center><img :src="book.images.smallThumbnail"  class="image" style="width: 128px; height:192px"></center>
              <div style="padding: 14px;">
                  <span>{{book.title}}</span>
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
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  
  computed: {
    ...mapGetters([
      'login',
      'id',
      'roles',
      'avatar',
      'books',
      'loading'
    ])
  },

}
</script>

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
  .element-loading-text{
    padding:  50px;
  }
   
</style>
