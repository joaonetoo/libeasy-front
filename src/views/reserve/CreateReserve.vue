<template>
  <div>
    <el-form ref="form" :model="reservation">         
        <el-form-item label="Books Id">
            <center> <h1>Adicionar Reserva </h1></center>
        </el-form-item>

        <el-form-item label="Book Id">
                <el-input v-model="dataToReserve.bookId" placeholder="Descrição do livro" required>                            
                </el-input>
                
        </el-form-item> 

        <el-form-item label="User Id">
                <el-input v-model="dataToReserve.userId" placeholder="Descrição do livro" required>                            
                </el-input>
        </el-form-item>  
    </el-form>        
  </div>
</template>

<script>
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
        addReserve:function() {
            import axios from 'axios'
            import '@/styles/custom-buttons.scss'
            import * as s from '@/utils/auth/'
            const token = s.getToken();

            axios.post(process.env.URL_API + '/reservation', this.dataToReserve, {headers: {"x-access-token": token}})
            .then(response => {
                console.log(response.data)
            })
        }
    }

}
</script>

