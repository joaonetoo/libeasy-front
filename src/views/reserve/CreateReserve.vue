<template>
  <div>
    <el-form ref="form" :model="dataToReserve">         
        <el-form-item>
            <center> <h1>Adicionar Reserva </h1></center>
        </el-form-item>

        <el-form-item label="Book Id">
                <el-input v-model="dataToReserve.bookId" placeholder="ID do livro" required>                            
                </el-input>
        </el-form-item> 

        <el-form-item label="User Id">
                <el-input v-model="dataToReserve.userId" placeholder="ID do usuário" required>                            
                </el-input>
        </el-form-item>  

        <center><el-button class="btn-login" @click.prevent="addReserve()" type="primary">Criar Reserva</el-button></center>
    </el-form>        
  </div>
</template>

<script>
import axios from 'axios'
import '@/styles/custom-buttons.scss'
import * as s from '@/utils/auth/'
export default {
    name:'CreateReserve',
    data: function() {
        return {
            dataToReserve :{
                userId: "",
                bookId: ""
            }
        }
    },

    methods: {
        addReserve:function(userId, bookId) {
            const token = s.getToken();

            axios.post(process.env.URL_API + '/reservations', this.dataToReserve, {headers: {"x-access-token": token}})
            .then(response => {
                console.log(response.data)
            })
        }
    }

}
</script>

