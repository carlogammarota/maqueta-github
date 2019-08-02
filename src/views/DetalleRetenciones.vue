<template>
  <div class="animated fadeIn">
    <!-- test: {{getRetencionSegunImpuestoPeriodo}}
    {{nuevoObjeto}} -->
    <b-card class="text-center" header="Detalle de retenciones">
      <b-container style="padding: 0px">
        <b-row align-h="center" style="margin-top: 40px">
          <b-col sm="12" md="12">
            <!-- nav bar -->
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
                    <b-card class="text-left bg-light" header="">
                      <h3>Impuesto<b-badge variant="dark" class="right fs-10">{{$route.params.impuesto}}</b-badge></h3>
                      <v-divider></v-divider>
                       <h6>Periodo<span class="right" >{{$route.params.periodo}}</span></h6> 
                      <h6>Cuota<span class="right" >{{$route.params.cuota}}</span></h6> 
                      <h6>Total computable<span class="right">$ 13.365,69</span></h6>
                    </b-card>
                </b-col>
                <b-col class="hidden-md-and-up" cols="12">
                  <detalle-retenciones-mobile></detalle-retenciones-mobile>
                </b-col>
                <b-col cols="12" sm="12" md="9" class="hidden-sm-and-down">     
                  <el-table-wrapper
                  :data="getRetencionSegunImpuestoPeriodo"
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
                </b-col>
              </b-row>
            
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3"></b-col>
          <b-col cols="9" lg="12" md="12">
            <v-divider></v-divider>
    
            <h2 class="text-right bg-featured">Total retenciones del periodo: <span class="">$ 2.642,50</span></h2>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import store from "@/store/index";
import DetalleRetencionesMobile from "@/views/mobile/DetalleRetenciones"
import { mapState, mapGetters } from "vuex";
export default {
  name: "detalleRetenciones",
  components: {
    DetalleRetencionesMobile
  },
  data() {
    return {
      tableColumns: [
        {
          prop: "nroCertificado",
          label: "Nro. de Certificado",
          sortable: true,
        },
        {
          prop: "fechaOperacion",
          label: "Fecha",
          sortable: true
        },
        {
          prop: "CUITAgente",
          label: "CUIT Agente"
        },
        {
          prop: "regimen",
          label: "Regimen"
        },
        {
          prop: "importe",
          label: "Importe",
          sortable: true,
        },
        {
          prop: "tag",
          label: "Comprobante",
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
      totales: [
        {
          nroCertificado: "",
          fecha: "",
          cuitAgente: "",
          regimen: "",
          importe: 2642.50
        }
      ],
      
      
    };
  },
  methods: {
  },
  mounted() {
    //aca nos llega el dato que viene desde consultarobligacionesprperiodo.vue
    this.$store.commit('retenciones/loadItems')
    this.$store.commit('retenciones/SingleImpuestoPeriodo', this.$route.params)
    console.log("Router Params", this.$route.params)
  },
  computed: {
     ...mapGetters({
        // getRetencionSegunImpuestoPeriodo: "retenciones/getRetencionSegunImpuestoPeriodo", 
        getRetencionSegunImpuestoPeriodo: "retenciones/getRetencionSegunImpuestoPeriodo", 
      })
  }

};
</script>
