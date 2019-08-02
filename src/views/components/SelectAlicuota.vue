<template>
 <el-select @input="select" v-model="value" placeholder="Seleccionar Alicuota" style="width: 100%">
              <el-option value="2" label="2%"></el-option>
              <el-option value="3" label="3%"></el-option>
              <el-option value="4" label="4%"></el-option>
              <el-option value="5" label="5%"></el-option>
            </el-select>
</template>

<script>
import store from "@/store/index"

export default {
  name: "select-alicuota",
  data() {
    return {
      periodo: "",
      dialogVisible: false,
      value: "",
      monto: 0
    };
  },
  methods: {
    select(){
      // console.log("this.value Select Alicuota")
      this.$emit('Alicuota', this.value)
    }
  },
  computed: {},
  mounted() {}
};
</script>