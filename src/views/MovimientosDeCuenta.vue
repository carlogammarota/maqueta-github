<template>
  <div class="animated fadeIn">
    <b-card class="text-center" header="Movimientos de Cuenta">
      <b-container style="padding: 0px">
        <b-row align-h="center" style="margin-top: 40px">
          <b-col sm="12" md="12">
            <!-- nav bar -->
            {{getMovimientosImpuestoPeriodo}}
            <b-navbar toggleable="lg" type="light" variant="info">
              <b-navbar-toggle target="nav_collapse"/>

              <b-collapse is-nav id="nav_collapse" class="bg-navbar">
                <b-navbar-nav>
                  <b-link to="/cuentaCorriente/consultarCuentas">
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
                <b-col cols="3">
                    <b-card class="text-left bg-light" header="">
                  <!-- <h3>Impuesto<b-badge variant="dark" class="right fs-10">Ingresos Brutos</b-badge></h3> -->
                  <h3>Impuesto<b-badge variant="dark" class="right fs-10">{{seleccionado.impuesto}}</b-badge></h3>
                  <!-- <h3>Impuesto<b-badge variant="dark" v-if="getMovimientosImpuestoPeriodo" class="right fs-10">{{getMovimientosImpuestoPeriodo[0].impuesto}}</b-badge></h3> -->
                  <v-divider></v-divider>
                  <!-- <h6>Periodo<span class="right">{{getMovimientosImpuestoPeriodo[0].periodo}}</span></h6> -->
                  <h6>Periodo<span class="right">{{seleccionado.periodo}}</span></h6>
                  <v-divider></v-divider>
                  <h6>Cuenta<span class="right">{{seleccionado.cuenta}}</span></h6>
                  <!-- <h6>Cuenta<span class="right">Impuesto determinado</span></h6> -->
                  <v-divider></v-divider>
                  <!-- El saldo para mi viene de /saldos buscando por impuestoDeterminado sacando el dato "saldo" -->
                  <h6>Saldo<span class="right">$ 0</span></h6>
                  <v-divider></v-divider>
                    </b-card>
                </b-col>
                <b-col cols="9">     
                 <el-table-wrapper
              :data="getMovimientosImpuestoPeriodo"
              :columns="tableColumns"
              :pagination="pagination"
              :show-custom-header="false"
            >
              <template slot-scope slot="column-slot">
                <b-link to="/comprobantes/ticket" class="obligacion-icon">
                  <i class="far fa-file-alt size-3x"></i>
                </b-link>
              </template>
            </el-table-wrapper>
                </b-col>
              </b-row>
            
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3"></b-col>
          <b-col cols="9">
            <v-divider></v-divider>
    
            <h2 class="text-right bg-featured">Saldo: <span class="">$ 0.00</span></h2>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import store from "@/store/index";
import { mapState, mapGetters } from "vuex";
export default {
  name: "movimientosDeCuenta",
  data() {
    return {
      tableColumns: [
        {
          prop: "nroTransaccion",
          label: "Transaccion"
        },
        {
          prop: "fechaOperacion",
          label: "Fecha de operación"
        },
        {
          prop: "fechaRegistracion",
          label: "Fecha de registración"
        },
        {
          prop: "descripcion",
          label: "Descripción"
        },
        {
          prop: "debe",
          label: "Debe",
          width: 80
        },
        {
          prop: "haber",
          label: "Haber",
          width: 80
        },
        {
          prop: "saldo",
          label: "Saldo",
          width: 80
        },
        {
          prop: "tag",
          label: "Comprobante",
          scopedSlot: "column-slot",
          width: 90
        }
      ],
      pagination: {
        pageSize: 3,
        layout: "total, sizes, prev, pager, next",
        pageSizes: [3, 10, 20],
        onSizeChange: this.onPageSizeChange,
        onCurrentChange: this.onPageCurrentChange
      },
      totales: [
        {
          nroCertificado: "",
          fecha: "",
          cuitAgente: "",
          regimen: "",
          importe: 2642.50
        }
      ],
      seleccionado: {
        impuesto: "",
        periodo: "",
        cuenta: ""
      }
      
    };
  },
  methods: {
  },
  computed: {
      ...mapGetters({
      getMovimientosImpuestoPeriodo: "registraciones/getMovimientosImpuestoPeriodo", 
    })
  },
  mounted() {
    console.log("Impuesto & Periodo", this.$route.params)
    this.seleccionado.impuesto = this.$route.params.impuesto
    this.seleccionado.periodo = this.$route.params.periodo
    this.seleccionado.cuenta = this.$route.params.cuenta
    this.$store.commit('registraciones/setImpuestoPeriodoMovimientos', this.$route.params)
    this.$store.commit('registraciones/loadItems')
  }
};
</script>
