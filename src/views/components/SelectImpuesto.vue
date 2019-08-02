<template>
  <div>
      <el-select @input="select" v-model="value" placeholder="Seleccionar impuesto" >
              <el-option :value="item.impuesto" v-for="(item, index) in getObligaciones" :key="index" :label="item.impuesto">{{item.impuesto}}</el-option>
    </el-select>
  </div>
</template>

<script>
import store from "@/store/index"
import { mapState, mapGetters } from "vuex";
export default {
  name: "select-impuesto",
  data() {
    return {   
      value: "",
    };
  },
  methods: {
    select(){
      console.log(this.value)
      this.$emit('Impuesto', this.value)
      
    }
  },
  computed: {
    ...mapGetters({
        getObligaciones: 'obligaciones/getObligaciones'
    })
  },
  mounted() {
    this.$store.commit('obligaciones/loadItems')
    
  }
};
</script>