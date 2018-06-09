<template>
  <el-table
    :data="this.reservations"
    height="550"
    style="width: 100%"
    :default-sort = "{prop: 'id', order: 'ascending'}"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="date"
      label="Date"
      sortable
      width="200">
    </el-table-column>
    <el-table-column
      prop="id"
      sortable
      label="Reserve ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="book.id"
      sortable
      label="Book ID">
    </el-table-column>
    <el-table-column
      prop="user.first_name"
      label="User name">
    </el-table-column>
    <el-table-column
      prop="expired"
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
import store from '@/store'
export default {
    name:'CreateReserve',
    data: function() {
        return {
            reservations: []
        }
    },

    created: function() {
        axios.get(process.env.URL_API + '/reservations', {headers: {"x-access-token": store.getters.token}})
        .then(response => {
            if(response) {
                
                this.reservations = response.data
                console.log(this.reservations)
            }
        })
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

