<template>
  <el-table
    :data="this.reservations"
    height="550"
    style="width: 100%"
    border
    :default-sort = "{prop: 'expired', order: 'ascending'}">
    <el-table-column
      prop="date"
      label="Date"
      align="center"
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      prop="expirydate"
      label="Expiry date"
      align="center"
      sortable
      width="140">
    </el-table-column>
    <el-table-column
      prop="id"
      sortable
      label="Reserve ID"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="book.title"
      align="center"
      width="200"
      sortable
      label="Book Title">
    </el-table-column>
    <el-table-column
      prop="user.first_name"
      align="center"
      label="Username">
    </el-table-column>
    <el-table-column
      prop="expired"
      align="center"
      :filters="[{ text: 'Expired', value: true }, { text: 'Not expired', value: false }]"
      :filter-method="filterExpired"
      filter-placement="bottom-end"
      label="Expired">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.expired === false ? 'danger' : 'success'"
          disable-transitions>
          <span v-if="scope.row.expired">Expired</span>
            <span v-else>Not expired</span>
          </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
import axios from 'axios'
import '@/styles/custom-buttons.scss'
import * as s from '@/utils/auth/'
import { mapGetters } from 'vuex'
import store from '@/store'
export default {
    name:'ListReservations',
    computed: {
            ...mapGetters([
                'id',
                'roles'
            ])
        },
    data: function() {
        return {
            reservations: []
        }
    },

    created: function() {

        if(store.getters.roles === 'librarian') {
            axios.get(process.env.URL_API + '/reservations', {headers: {"x-access-token": store.getters.token}})
            .then(response => {
                if(response) {
                    response.data.forEach(element => {
                        let date = new Date(element.date)
                        element.date = date.getDate()+"/"+date.getMonth()+"/"
                        +date.getFullYear();
                        element.expirydate = date.getDate()+2+"/"+date.getMonth()+"/"
                        +date.getFullYear(); ;
                        this.reservations.push(element)
                    });
                }
            })
        } else if (store.getters.roles === 'client') {
            axios.get(process.env.URL_API + '/reservations/searchByUserId/'+this.id, {headers: {"x-access-token": store.getters.token}})
            .then(response => {
                if(response) {
                    response.data.forEach(element => {
                        let date = new Date(element.date)
                        element.date = date.getDate()+"/"+date.getMonth()+"/"
                        +date.getFullYear();
                        element.expirydate = date.getDate()+2+"/"+date.getMonth()+"/"
                        +date.getFullYear();
                        this.reservations.push(element)
                    });
                }
            })
        }
    },

    methods: {
        tableRowClassName({row, rowIndex}) {
            if (!this.reservations[rowIndex].expired) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
        },

        filterExpired(value, row) {
            return row.expired === value;
        },
    },

}
</script>

