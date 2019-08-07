<template>
  <div class="animated fadeIn">
    <b-card class="text-center" header="Detalle de intereses">
      <b-container style="padding: 0px">
        <b-row align-h="center" style="margin-top: 40px">
          <b-col sm="12" md="12">
            <!-- nav bar -->
            <!-- {{getDetalleDeIntereses}} -->
            
            <!-- {{getDetalleDePunitorios}} -->
            RouterParams
            {{$route.params}}
            Get Detalle Resarcitorios
            {{getDetalleResarcitorios}}
            Get Detalles Punitorios
            {{getDetalleDePunitorios}}
            {{InteresesResarcitorios}}
            <!-- {{getRetencionSegunImpuestoPeriodo}}
            {{}}
            <br>
            {{getDetalleDeIntereses}} -->
            <b-navbar toggleable="lg" type="light" variant="info">
              <b-navbar-toggle target="nav_collapse"/>

              <b-collapse is-nav id="nav_collapse" class="bg-navbar">
                <b-navbar-nav>
                  <b-link to="/cuentaCorriente/consultarPorPeriodo">
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

            <b-row>
              <b-col cols="12" sm="12" md="12" lg="3">
                <b-card class="text-left bg-light" header>
                  <h6>
                    Impuesto
                    <!-- <b-badge variant="dark" class="right fs-10">Ingresos Brutos</b-badge> -->
                    <b-badge v-if="$route.params" variant="dark" class="right fs-10">{{$route.params.impuesto}}</b-badge>
                  </h6>
                   <v-divider></v-divider>
                  <h6>
                    Periodo
                    <!-- <span class="right">2018-03</span> -->
                    <span v-if="$route.params" class="right">{{$route.params.periodo}}</span>
                  </h6>
                  <v-divider></v-divider>
                  <h6>
                    Deuda Capital
                    <span class="right fs-12 monto-negativo">$ 502.24</span>
                  </h6>
                  <h6>
                    Fecha de la demanda
                    <span class="right fs-12">-</span>
                  </h6>
                </b-card>
              </b-col>
              <b-col cols="12" sm="12" md="12" lg="3">
                <b-card class="text-left bg-light" header>
                  <h6>
                    Total Intereses resarcitorios
                    <span class="right fs-12">$ {{InteresesResarcitorios}}</span>
                  </h6>
                   <v-divider></v-divider>
                  <h6>
                    Total Intereses punitorios
                    <span class="right fs-12">$ {{InteresesPunitorios}}</span>
                  </h6>
                  <v-divider></v-divider>
                  <h6>
                    Vencimiento Presentación
                    <!-- <span class="right fs-11">2018/04/15</span> -->
                    <!-- <span v-if="$route.params" class="right fs-11">{{DetallesFijos.vencimiento}}</span> -->
                  </h6>
                  <h6>
                    Vencimiento Pago
                    <span class="right fs-11">2018/04/05</span>
                  </h6>
                </b-card>
              </b-col>

              <b-col class="hidden-md-and-up" cols="12">
                <h2 class="bg-featured">Detalle Intereses Resarcitorios</h2>
                <detalle-intereses-mobile></detalle-intereses-mobile>
                <h2 class="text-right bg-featured">
                  Total: <span class>$ 165,95</span>
                </h2>
              </b-col> 
              <b-col cols="12" sm="12" md="9" lg="12" class="hidden-sm-and-down">
                <h2 class="bg-featured">Detalle Intereses Resarcitorios</h2>
                <el-table-wrapper
                  :data="getDetalleResarcitorios"
                  :columns="tableColumns"
                  :pagination="pagination"
                  :show-custom-header="false"
                >
                  <template slot-scope slot="column-slot">
                    <b-link class="obligacion-icon" to="/comprobantes/ticket">
                      <i class="far fa-file-alt size-3x"></i>
                    </b-link>
                  </template>
                </el-table-wrapper>
                <b-row>
                  <b-col>
                    <v-divider></v-divider>

                    <h2 class="text-right bg-featured">
                      Total:
                      <span class>$ {{InteresesResarcitorios}}</span>
                    </h2>
                  </b-col>
                </b-row>
              </b-col>
                <b-col class="hidden-md-and-up" cols="12">
                  <h2 class="bg-featured">Detalle Intereses Punitorios</h2>
                  <detalle-intereses-mobile></detalle-intereses-mobile>
                  <h2 class="text-right bg-featured">
                    Total: <span class>$ 99999,95</span>
                  </h2>
                </b-col> 
               <b-col cols="12" sm="12" md="9" lg="12" class="hidden-sm-and-down">
                   <v-divider></v-divider>
                <h2 class="bg-featured">Detalle Intereses Punitorios</h2>
                <el-table-wrapper
                  :data="getDetalleDePunitorios"
                  :columns="tableColumns"
                  :pagination="pagination"
                  :show-custom-header="false"
                >
                  <template slot-scope slot="column-slot">
                    <b-link class="obligacion-icon">
                      <i class="far fa-file-alt size-3x"></i>
                    </b-link>
                  </template>
                </el-table-wrapper>
                <b-row>
                  <b-col>
                    <v-divider></v-divider>

                    <h2 class="text-right bg-featured">
                      Total:
                      <span class>$ {{InteresesPunitorios}}</span>
                    </h2>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import store from "@/store/index";
import DetalleInteresesMobile from "@/views/mobile/DetalleIntereses"
import { mapState, mapGetters } from "vuex";
export default {
  name: "detalleIntereses",
  components: {
    DetalleInteresesMobile
  },
  data() {
    return {
      tableColumns: [
        {
          prop: "concepto",
          label: "Concepto",
          sortable: true,
          width: 230
        },
        {
          prop: "fechaOperacion",
          label: "Fecha de pago",
          sortable: true
        },
        {
          prop: "impuestoDeterminado",
          label: "Importe Pago"
        },
        {
          prop: "vencimiento",
          label: "Desde",
          sortable: true
        },
        {
          prop: "fechaOperacion",
          label: "Hasta",
          sortable: true
        },
        {
          prop: "dias",
          label: "Días",
          sortable: true
        },
        {
          prop: "alicuota",
          label: "Tasa mensual",
          sortable: true
        },
        {
          prop: "importe",
          label: "Importe",
          sortable: true
        }
      ],
      pagination: {
        pageSize: 3,
        layout: "total, sizes, prev, pager, next",
        pageSizes: [3, 10, 20],
        onSizeChange: this.onPageSizeChange,
        onCurrentChange: this.onPageCurrentChange
      },
      data: [
        {
          concepto: "Pago",
          fechaOperacion: "2018/05/12",
          impuestoDeterminado: 152,
          vencimiento: "2018/04/05",
          fechaOperacion: "2018/05/18",
          dias: 8,
          alicuota: "3%",
          importe: 1.22
        },
        {
          concepto: "Intereses sobre saldo adeudado",
          fechaOperacion: "",
          impuestoDeterminado: 502.24,
          vencimiento: "2018/04/05",
          fechaOperacion: "2019/02/27",
          dias: 328,
          alicuota: "3%",
          importe: 164.63
        }
      ],
      DetallesFijos: {},
      periodo: ""
    }
  },
  methods: {
    buttonTest(){
      this.dataTest = 420
      console.log("button test")
    }
  },
  computed: {
  ...mapGetters({
      getDetalleResarcitorios: "obligaciones/getDetalleResarcitorios", 
      getDetalleDePunitorios: "obligaciones/getDetalleDePunitorios", 
    }),
    InteresesResarcitorios: function () {
      let total = [];
      Object.entries(this.getDetalleResarcitorios).forEach(([key, val]) => {
          total.push(val.impuestoDeterminado) 
      });
      // console.log("total:", total.reduce(function(total, num){ return total + num }, 0))
      return total.reduce(function(total, num){ return total + num }, 0);
    },
     InteresesPunitorios: function () {
      let total = [];
      Object.entries(this.getDetalleDePunitorios).forEach(([key, val]) => {
          total.push(val.impuestoDeterminado) 
      });
      // console.log("total:", total.reduce(function(total, num){ return total + num }, 0))
      return total.reduce(function(total, num){ return total + num }, 0);
    }
  },
  mounted() {
    this.$store.commit('comprobantes/loadItems')
    this.$store.commit('obligaciones/loadItems')
    this.$store.commit('obligaciones/loadSaldos')
    this.$store.commit('obligaciones/addDetalleIntereses', this.$route.params)
    console.log("getDetalleResarcitorios", this.getDetalleResarcitorios)
    this.DetallesFijos = this.getDetalleResarcitorios[0]
    this.DetallesPunitorios = this.getDetalleDePunitorios[0]
    // console.log("params", this.$route.params)
  },
};
</script>
