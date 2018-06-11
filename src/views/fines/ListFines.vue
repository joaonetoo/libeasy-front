<template>
    <div class="app-conteiner">
        <el-table
            :data="this.fines"
            height="500"
            border
            style="width: 100%"
            :default-sort = "{prop: 'paid', order: 'ascending'}">
            <el-table-column
            prop="book.title"
            align="center"
            sortable
            label="Book Title">
            </el-table-column>
            <el-table-column
            prop="user.first_name"
            align="center"
            sortable
            label="Username">
            </el-table-column>
            <el-table-column
            prop="amount"
            align="center"
            sortable
            label="Amount">
            </el-table-column>
            <el-table-column
            prop="paid"
            sortable
            :filters="[{ text: 'Paid', value: true }, { text: 'Not paid', value: false }]"
            :filter-method="filterPaid"
            filter-placement="bottom-end"
            align="center"
            label="Paid">
            <template slot-scope="scope">
                <el-tag
                :type="scope.row.paid === false ? 'danger' : 'success'"
                disable-transitions>
                <span v-if="scope.row.paid">Paid</span>
                    <span v-else>Not paid</span>
                </el-tag>
            </template>
            </el-table-column>
            <el-table-column
                v-if="roles === 'librarian'"
                align="center"
                label="Confirm Payment">
                <template slot-scope="scope">
                    <el-button
                    size="small"
                    type="success"
                    icon="el-icon-check"
                    circle
                    v-if="!scope.row.paid"
                    @click="confirmPayment(scope.$index, scope.row)"></el-button>
                    <el-button
                    size="small"
                    type="danger"
                    icon="el-icon-printer"
                    circle
                    v-if="!scope.row.paid"
                    @click="pagar(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
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
    name:'ListFines',
    computed: {
            ...mapGetters([
                'id',
                'roles'
            ])
        },
    data: function() {
        return {
            fines: []
        }
    },

    created: function() {

        if(store.getters.roles === 'librarian') {
            axios.get(process.env.URL_API + '/fines', {headers: {"x-access-token": store.getters.token}})
            .then(response => {
                if(response) {
                    this.fines = response.data
                    this.fines.forEach(element => {
                        let amount = "R$ "+element.amount+",00"
                        element.amount = amount
                    });
                    // this.fines.sort(a => {
                    //     return a.paid
                    // })
                }
            })
        } else if (store.getters.roles === 'client') {
            axios.get(process.env.URL_API + '/fines/search/'+this.id, {headers: {"x-access-token": store.getters.token}})
            .then(response => {
                if(response) {
                    this.fines = response.data
                    this.fines.forEach(element => {
                        let amount = "R$ "+element.amount+",00"
                        element.amount = amount
                    });
                }
            })
        }
    },

    methods: {
        tableRowClassName({row, rowIndex}) {
            if (!this.fines[rowIndex].paid) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
        },

        filterPaid(value, row) {
            return row.paid === value;
        },

        pagar(index, row) {
            const token = s.getToken();
            let data = {
                responseType:'blob'
            }
            axios({
                url: process.env.URL_API + '/fines/generateboleto/'+row.user.id,
                method: 'GET',
                responseType: 'blob',
                headers: {"x-access-token": token}
            })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'GRU.pdf');
                document.body.appendChild(link);
                link.click();
            })
        },

        confirmPayment(index, row) {
            axios.put(process.env.URL_API + '/fines/'+row.id, {paid: true}, {headers: {"x-access-token": store.getters.token}})
            .then(response => {
                if(response) {
                    this.$notify({
                    message: response.data.message,
                    type: 'success'
                    })
                    for(let i = 0; i < this.fines.length; i++) {
                        if(this.fines[i].id == row.id) {
                            this.fines[i].paid = true
                        }
                    }
                }
            })
        },
    },
}
</script>