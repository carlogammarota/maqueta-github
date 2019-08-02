<template>
  <div class="animated fadeIn">
    <b-card class="text-center" header="Detalle de pagos y cancelaciones">
      <b-container style="padding: 0px">
        <b-row align-h="center" style="margin-top: 40px">
          <b-col sm="12" md="12">
            <!-- nav bar -->
            <b-navbar toggleable="lg" type="light" variant="info">
              <b-navbar-toggle target="nav_collapse"/>

              <b-collapse is-nav id="nav_collapse" class="bg-navbar">
                <b-navbar-nav>
                  <b-link  to="/cuentaCorriente/consultarPorPeriodo">
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
                  <h3>
                    Impuesto
                    <b-badge variant="dark" class="right fs-10">Ingresos Brutos</b-badge>
                  </h3>
                   <v-divider></v-divider>
                  <h6>
                    Periodo
                    <span class="right">2018-03</span>
                  </h6>
                  <h6>
                    Cuota
                    <span class="right">-</span>
                  </h6>
                  <h6>
                    Total créditos
                    <span class="right">$ 1.000,00 </span>
                  </h6>
                </b-card>
              </b-col>
              
              <b-col class="hidden-md-and-up" cols="12">
                <detalle-pagos-cancelaciones-mobile></detalle-pagos-cancelaciones-mobile>
              </b-col> 
              <b-col cols="12" sm="12" md="9" class="hidden-sm-and-down">
                <el-table-wrapper
                  :data="data"
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
          <b-col cols="9">
            <v-divider></v-divider>
    
            <h2 class="text-right bg-featured">Total Créditos: <span class="">$ 1.000,00</span></h2>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import store from "@/store/index";

import DetallePagosCancelacionesMobile from "@/views/mobile/DetallePagosCancelaciones"

export default {
  name: "detallePagosCancelaciones",
  components: {
    DetallePagosCancelacionesMobile
  },
  data() {
    return {
      tableColumns: [
        {
          prop: "transaccion",
          label: "Transacción",
          sortable: true
        },
        {
          prop: "fecha",
          label: "Fecha",
          sortable: true
        },
        {
          prop: "formulario",
          label: "Formulario"
        },
        {
          prop: "descripcion",
          label: "Descripción"
        },
        {
          prop: "importe",
          label: "Importe",
          sortable: true
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
      data: [
        {
          transaccion: 120125422,
          fecha: "2018/05/12",
          formulario: 151,
          descripcion: "Pago",
          importe: 621.0
        },
        {
          transaccion: 120458215,
          fecha: "2018/05/15",
          formulario: 452,
          descripcion: "Compensación",
          importe: 145.0
        },
        {
          transaccion: 145282254,
          fecha: "2018/05/16",
          formulario: 452,
          descripcion: "Ajuste",
          importe: 2.36
        },
        {
          transaccion: 120745869,
          fecha: "2018/05/20",
          formulario: 758,
          descripcion: "Reimputación de pago",
          importe: 231.64
        }
      ]
    };
  },
  methods: {},
  computed: {},
  mounted() {}
};
</script>
