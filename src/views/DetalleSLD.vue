<template>
  <div class="animated fadeIn">
    <b-card class="text-center" header="Detalle de usos de saldo de libre disponibilidad">
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
                <b-card class="text-left bg-light" header>
                  <h6>
                    Impuesto
                    <b-badge variant="dark" class="right fs-10">Ingresos Brutos</b-badge>
                  </h6>
                  <v-divider></v-divider>
                  <h6>
                    Periodo
                    <span class="right fs-10">2018-03</span>
                  </h6>
                  <h6>
                    Cuota
                    <span class="right fs-10">-</span>
                  </h6>
                  <v-divider></v-divider>
                  <h6>
                    SLD al vencimiento
                    <span class="right fs-10">$ 1.735,12</span>
                  </h6>

                  <h6>
                    SLD disponible
                    <span class="right fs-10">$ 35,12</span>
                  </h6>
                  <v-divider></v-divider>
                  <el-tooltip placement="top" effect="light">
                   <div slot="content">
                    Es cuando el contribuyente tiene saldo a favor
                    <br>y se encuentra disponible para ser utilizado
                    <br>en la cancelación de otras obligaciones.
                  </div>
                    <i class="fas fa-info-circle pl-10 fs-12" style="padding-top: 10px;"></i>
                  </el-tooltip>
                  <el-button size="mini" class="right" variant="info">
                    <i class="fas fa-dollar-sign padding-icon"></i>Compensar
                  </el-button>
                </b-card>
              </b-col>
              <b-col class="hidden-md-and-up" cols="12">
                <detalle-sld-mobile></detalle-sld-mobile>
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
      </b-container>
    </b-card>
  </div>
</template>

<script>
import store from "@/store/index";

import DetalleSldMobile from "@/views/mobile/DetalleSLD";

export default {
  name: "detalleSLD",
  components: {
    DetalleSldMobile
  },
  data() {
    return {
      tableColumns: [
        {
          prop: "transaccion",
          label: "Transacción",
          sortable: true,
          width: 120
        },
        {
          prop: "fecha",
          label: "Fecha",
          sortable: true,
          width: 100
        },
        {
          prop: "formulario",
          label: "Formulario",
          width: 80
        },
        {
          prop: "descripcion",
          label: "Descripción",
          sortable: true,
          width: 160
        },
        {
          prop: "importe",
          label: "Importe",
          sortable: true
        },
        {
          prop: "saldo",
          label: "Saldo",
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
          transaccion: 12145245,
          fecha: "2018/05/12",
          formulario: 951,
          descripcion: "Compensación",
          importe: 1500,
          saldo: 235.12
        },
        {
          transaccion: 12145246,
          fecha: "2018/05/15",
          formulario: 952,
          descripcion: "Anulación de compensación",
          importe: 1500,
          saldo: 1735.12
        },
        {
          transaccion: 12145247,
          fecha: "2018/05/20",
          formulario: 452,
          descripcion: "Ajuste",
          importe: 1700,
          saldo: 35.12
        }
      ]
    };
  },
  methods: {},
  computed: {},
  mounted() {}
};
</script>
