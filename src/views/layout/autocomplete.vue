<template>
  <div >
    <el-input type="text" v-model="search" @input="onChange" ></el-input>
    <ul v-show="isOpen" class="auto">
    <li
      v-for="(result, i) in results"
      :key="i"
      @click="setResult(result)"
      class="result"
    >
    <img v-if="result.photo" style="width: 40px; height:40px; border-radius: 20px;" :src="'http://localhost:3000/'+result.photo">  
      <img v-else style="width: 40px; height:40px; border-radius: 20px;" src="http://localhost:3000/boy.png">  
      {{ result.name }}
    </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'autocomplete',
    props: {
      items: {
        type: Array,
        required: false,
        default: () => [],
      },

    },
    data() {
      return {
        search: '',
        results: [],
        id: '',
        isOpen: false,
      };
    },
    methods: {
      onChange() {
        this.$emit('input', this.search);
        this.filterResults();
        this.isOpen = true;
      },
      filterResults() {
        this.results = this.items.filter(item => item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
      },
      setResult(result) {
        this.search = result.name;
        this.isOpen = false;
        this.id = result.id
        this.$emit('changeId',this.id)
      },

    },
  }
</script>


<style>


  .auto {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 200px;
    overflow: auto;
  }

  .result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .result:hover {
    background-color: #263238;
    color: white;
  }
</style>
