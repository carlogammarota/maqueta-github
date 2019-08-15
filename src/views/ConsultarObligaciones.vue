<template>
  <div class="animated fadeIn">
    <b-card class="text-center" header="Consultar Obligaciones">
      <b-container style="padding: 0px">
        <b-row align-h="center" style="margin-top: 40px">
          <b-col sm="12" md="12">
            <!-- nav bar -->
            <b-navbar toggleable="lg" type="light" variant="info">
              <b-navbar-toggle target="nav_collapse"/>

              <b-collapse is-nav id="nav_collapse" class="bg-navbar">
                <b-navbar-nav>
                  <b-link>
                    <el-button size="mini">
                      <i class="fas fa-arrow-left padding-icon"></i>Volver
                    </el-button>
                  </b-link>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                  <b-nav-item href="#">
                    <i class="fas fa-print" style="margin-right: 15px;"></i> Imprimir
                  </b-nav-item>
                  <b-nav-item disabled style="margin-left: 10px;">
                    <i class="fas fa-file-export"></i>
                  </b-nav-item>
                  <b-nav-item-dropdown text="Exportar" right>
                    <b-dropdown-item href="#" disabled>XLS</b-dropdown-item>
                    <b-dropdown-item href="#" disabled>CSV</b-dropdown-item>
                    <b-dropdown-item href="#" disabled>PDF</b-dropdown-item>
                  </b-nav-item-dropdown>
                </b-navbar-nav>
              </b-collapse>
            </b-navbar>
            <v-divider></v-divider>

            
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <b-card class="text-left" header="">
                  <span class="picker-text">
                    Desde:
                    <el-date-picker v-model="desde" type="month" placeholder="Periodo" style="width: 150px"></el-date-picker>
                  </span>
                  <span class="picker-text">
                    Hasta:
                    <el-date-picker v-model="hasta" type="month" placeholder="Periodo" style="width: 150px"></el-date-picker>
                  </span>
                  
                  <el-button class="text-left" type="primary" size="mini" @click="BuscarPorPeriodo()">Buscar</el-button>
            </b-card>
          </b-col>
          <b-col cols="6">
            <b-card class="text-left" header="">
              <b-row>
                <b-col cols="12">     
                  <span class="picker-text" style="float: left; padding-top: 6px;">Filtrar por impuesto:</span>  
                    <el-checkbox label="Inmobiliario" v-model="viewInmobiliario"></el-checkbox>
                    <el-checkbox label="Automotores" v-model="viewAutomotores"></el-checkbox>
                    <el-checkbox label="Ingresos Brutos" v-model="viewIIBB"></el-checkbox>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          
          <b-col class="hidden-md-and-up" cols="12">
            <div v-if="viewInmobiliario">
              <h2 class="bg-featured">Inmobiliario</h2>
              <TablaResponsive :data="GetInmobiliario"></TablaResponsive>
             </div>
          </b-col> 

          <b-col class="hidden-md-and-up" cols="12">
            <div v-if="viewAutomotores">
              <h2 class="bg-featured">Automotores</h2>
              <TablaResponsive :data="GetAutomotores"></TablaResponsive>
             </div>
          </b-col>

          <b-col class="hidden-md-and-up" cols="12">
            <div v-if="viewIIBB">
              <h2 class="bg-featured">Ingresos Brutos</h2>
              <TablaResponsive :data="GetIngresosBrutos"></TablaResponsive>
            </div>
          </b-col>

          <b-col md="12" class="hidden-sm-and-down">
            <v-divider></v-divider>
              
            <div v-if="viewInmobiliario">
            <h2 class="bg-featured">Inmobiliario</h2>

            <el-table-wrapper
              :data="GetInmobiliario"
              :columns="tableColumns"
              :pagination="pagination"
              :show-custom-header="false"
            >
              <template slot-scope="ver" slot="column-slot">
           
                <!-- <b-link to="/cuentaCorriente/consultarPorPeriodo?impuesto=Inmobiliario&periodo=201903" class="obligacion-icon">
                  <i class="far fa-file-alt size-3x"></i>
                </b-link> -->


                <b-link :to="{path: '/cuentaCorriente/consultarPorPeriodo', query: {impuesto: GetInmobiliario[ver.$index].impuesto, periodo: GetInmobiliario[ver.$index].periodo}}" class="obligacion-icon">
                  <i class="far fa-file-alt size-3x"></i>
                </b-link>

                <!-- <button @click="test(GetInmobiliario[ver.$index])">BOTON Test</button> -->
              </template>
            </el-table-wrapper>

            <v-divider></v-divider>
            </div>
            <div v-if="viewAutomotores">
            <h2 class="bg-featured">Automotores</h2>
            <el-table-wrapper
              :data="GetAutomotores"
              :columns="tableColumns"
              :pagination="pagination"
              :show-custom-header="false"
            >
                <template slot-scope="ver" slot="column-slot">
              
                <!-- <b-link class="obligacion-icon" to="/cuentaCorriente/consultarPorPeriodo">
                  <i class="far fa-file-alt size-3x"></i>
                  
                  
                </b-link>
                <button @click="test(ver.$index)">BOTON test 2</button> -->
                  <b-link :to="{path: '/cuentaCorriente/consultarPorPeriodo', query: {impuesto: GetAutomotores[ver.$index].impuesto, periodo: GetAutomotores[ver.$index].periodo}}" class="obligacion-icon">
                    <i class="far fa-file-alt size-3x"></i>
                  </b-link>
                </template>
              </el-table-wrapper>
              <v-divider></v-divider>
            </div>
            <div v-if="viewIIBB">
            <h2 class="bg-featured">Ingresos Brutos</h2>
            <el-table-wrapper
              :data="GetIngresosBrutos"
              :columns="tableColumns"
              :pagination="pagination"
              :show-custom-header="false"
            >
              <template slot-scope="ver" slot="column-slot">
               
                <b-link :to="{path: '/cuentaCorriente/consultarPorPeriodo', query: {impuesto: GetIngresosBrutos[ver.$index].impuesto, periodo: GetIngresosBrutos[ver.$index].periodo}}" class="obligacion-icon">
                  <i class="far fa-file-alt size-3x"></i>
                </b-link>
              </template>
            </el-table-wrapper>
            <v-divider></v-divider>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>


<script>
import store from "@/store/index";
import TablaResponsive from "@/views/mobile/TablaResponsive"
import { mapState, mapGetters } from "vuex";
export default {
  name: "pagar",
  components: {
    TablaResponsive
  },
  data() {
    return {
      tableColumns: [
        {
          prop: "periodo",
          label: "Periodo",
          sortable: true,
          width: 180
        },
        {
          prop: "vencimientoPago",
          label: "Vencimiento Pago",
          width: 180
        },
        {
          prop: "capitalInteres",
          label: "Capital / Interes"
        },
        {
          prop: "impuestoDeterminado",
          label: "Impuesto Determinado"
        },
        {
          prop: "vencimientoPresentacion",
          label: "Vencimiento Presentación"
        },
        {
          prop: "tag",
          label: "Ver",
          width: 130,
          columnKey: "tag",
          filters: [
            {
              text: "Ver",
              value: "Ver"
            },
            {
              text: "No disponible",
              value: "No Disponible"
            }
          ],
          filterMethod: this.filterTag,
          filterMultiple: false,
          scopedSlot: "column-slot"
        }
      ],
      pagination: {
        pageSize: 3,
        layout: "total, sizes, prev, pager, next",
        pageSizes: [3, 10, 20],
        onSizeChange: this.onPageSizeChange,
        onCurrentChange: this.onPageCurrentChange
      },
      columns: [
        { prop: "periodo", label: "Periodo", width: 197 },
        { prop: "vencimientoPago", label: "Vencimiento Pago", width: 197 },
        { prop: "capitalInteres", label: "Capital Interés", width: 197 },
        {
          prop: "impuestoDeterminado",
          label: "Impuesto Determinado",
          width: 197
        },
        {
          prop: "vencimientoPresentacion",
          label: "Vencimiento Presentación",
          width: 197
        },
        {
          prop: "ver",
          label: "Ver",
          width: 197
        }
      ],
      desde: "",
      hasta: "",
      selected: [],
      viewAutomotores: true,
      viewInmobiliario: true,
      viewIIBB: true
    };
  },
  methods: {
    BuscarPorPeriodo(){
      //Filtro de los GetInmobiliario GetAutomotores GetIngresosBrutos por un rango de periodo
      // console.log("Buscar por periodo", this.desde, this.hasta)
      this.$store.commit("obligaciones/filtro", {desde: this.desde, hasta: this.hasta});
    }
  },
  computed: {
      ...mapGetters({
        getSaldos: "obligaciones/getSaldos",
        GetInmobiliario: "obligaciones/GetInmobiliario",  
        GetAutomotores: "obligaciones/GetAutomotores",  
        GetIngresosBrutos: "obligaciones/GetIngresosBrutos",  
      })
    },
  mounted() {
      this.$store.commit("obligaciones/loadSaldos");
      this.$store.commit("obligaciones/loadItems");
      console.log(this.getSaldos)
        
      }
};
</script>
