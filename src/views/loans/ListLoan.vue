<template>
  <el-table
    :data="loans"
    height="550"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="date"
      label="Date"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="expirydate"
      label="Expiry date"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="book.title"
      sortable
      label="Book ID">
    </el-table-column>
    <el-table-column
      prop="user.first_name"
      label="Username">
    </el-table-column>
   <el-table-column
      prop="delivered"
      :filters="[{ text: 'Delivered', value: true }, { text: 'Not delivered', value: false }]"
      :filter-method="filterDelivered"
      filter-placement="bottom-end"
      label="Situation">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.delivered === false ? 'danger' : 'success'"
          disable-transitions>
          <span v-if="scope.row.delivered">Delivered</span>
            <span v-else>Not delivered</span>
          </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="Deliver">
      <template slot-scope="scope">
        <el-button
          size="mini"
          v-if="!scope.row.delivered"
          @click="deliver(scope.$index, scope.row)">Delivered</el-button>

      </template>
    </el-table-column>
    
  </el-table>
</template>

<script>
import axios from 'axios'
import '@/styles/custom-buttons.scss'
import * as s from '@/utils/auth/'
import { mapGetters } from 'vuex'
import store from '@/store'

    export default {
        name: 'ListLoan',
        computed: {
            ...mapGetters([
                'id',
                'roles'
            ])
        },
        data: function(){
            return{
                loans: []
            }
        },
        created: function() {

            if(store.getters.roles === 'librarian') {
                axios.get(process.env.URL_API + '/loans', {headers: {"x-access-token": store.getters.token}})
                .then(response => {
                    if(response) {
                        response.data.forEach(element => {
                            let date = new Date(element.initial_date)
                            let date_end = new Date(element.final_date)
                            element.date = date.getDate()+"/"+date.getMonth()+"/"
                            +date.getFullYear();
                            element.expirydate = date_end.getDate()+"/"+date_end.getMonth()+"/"
                            +date_end.getFullYear(); ;
                            this.loans.push(element)
                        });
                    }
                })
            } else if (store.getters.roles === 'client') {
                axios.get(process.env.URL_API + '/loans/searchByUserId/'+this.id, {headers: {"x-access-token": store.getters.token}})
                .then(response => {
                    if(response) {
                        response.data.forEach(element => {
                            let date = new Date(element.initial_date)
                            let date_end = new Date(element.final_date)
                            element.date = date.getDate()+"/"+date.getMonth()+"/"
                            +date.getFullYear();
                            element.expirydate = date_end.getDate()+"/"+date_end.getMonth()+"/"
                            +date_end.getFullYear(); ;
                            this.loans.push(element)
                        });
                    }
                })
            }
        },

        methods: {
        tableRowClassName({row, rowIndex}) {
            if (!this.loans[rowIndex].delivered) {
            return 'warning-row';
            } else {
            return 'success-row';
            }
        },

        filterDelivered(value, row) {
            return row.expired === value;
        },
      deliver(index,row) {
          axios
          .put(process.env.URL_API +'/loans/'+row.id,{delivered: true},{headers: {"x-access-token": store.getters.token}})
          .then(response =>{
                this.$notify({
                message: response.data.message,
                type: 'success'
                })
                location.reload()

          })
      },

    },

    }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

