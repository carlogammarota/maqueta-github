<template>
          <el-tabs v-model="fecha">
            <el-tab-pane label="Periodo" active>
              <span class="picker-text">
                Desde:
                <el-date-picker
                  v-model="desde"
                  type="month"
                  placeholder="Periodo"
                  style="width: 150px"
                ></el-date-picker>
              </span>
              <br/>
              <br/>
              <span class="picker-text">
                Hasta:
                <el-date-picker
                  v-model="hasta"
                  type="month"
                  placeholder="Periodo"
                  style="width: 150px"
                ></el-date-picker>
              </span>
            </el-tab-pane>
            <el-tab-pane label="Fecha de operación" name="second">
              <span class="picker-text">
                Desde:
                <el-date-picker
                  v-model="desde"
                  type="date"
                  placeholder="Periodo"
                  style="width: 150px"
                ></el-date-picker>
              </span>
              <br/>
              <br/>
              <span class="picker-text">
                Hasta:
                <el-date-picker
                  v-model="hasta"
                  type="date"
                  placeholder="Periodo"
                  style="width: 150px"
                ></el-date-picker>
              </span>
            </el-tab-pane>
            
          </el-tabs>
          
</template>


<script>
import store from "@/store/index";
import { mapState, mapGetters } from "vuex";

export default {
  name: "busqueda-avanzada",
  data() {
    return {
      desde: "",
      hasta: "",
      rangofecha: "",
      popup: false
    };
  },
  methods: {
    //this.$store.commit('comprobantes/setFilterRecientes', this.filtradoRecientes)
  },
  computed: {},
  mounted() {}
};
</script>
