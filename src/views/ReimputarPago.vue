<template>
  <div class="animated fadeIn hidden-sm-and-down">
    <b-card class="text-center" header="Reimputar Pagos">
      <b-container style="padding: 0px">
        <b-row align-h="center" style="margin-top: 40px">
          <b-col sm="12" md="12">
            <b-card class="text-left">
              <b-col md="12">
                <el-steps :active="active" finish-status="success">
                  <el-step
                    title="Origen"
                    description="Seleccione una fila de las obligaciones con saldo a Favor"
                   
                  >
                    <span slot="description">
                      <h6>Transacción: 14225665</h6>
                      <h6>Fecha de pago: 2018/01/02</h6>
                      <h6>Impuesto: Inmobiliario</h6>
                      <h6>Concepto: Capital</h6>
                      <h6>Periodo: 2010/01</h6>
                    </span>
                  </el-step>
                  <el-step
                    title="Destino"
                    description="Seleccione una fila de las deudas compensables"
                  >
                    <span slot="description">
                      <h6>Impuesto: Inmobiliario</h6>
                      <h6>Concepto: Capital</h6>
                      <h6>Periodo: 2010/05</h6>
                      <h6>Deuda: $ 1.521.36</h6>
                    </span>
                  </el-step>
                  <el-step title="Importe" description="Ingrese el importe a Reimputar"></el-step>
                </el-steps>
                <el-button v-show="isActive" class="mt-20" type="primary" size="mini" @click="next">Paso Siguiente</el-button>
                <v-divider></v-divider>
                <el-tabs v-model="activeTab" @tab-click="handleClick">
                  <!-- TAB OBLIGACIONES -->
                  <el-tab-pane label="Obligaciones con Saldo a Favor" name="obligaciones"  disabled>
                    <h6>Selecciones una fila dentro de las obligaciones con saldo a favor. Solo se permitirá la selección de una obligación por vez</h6>
                      <v-divider></v-divider>
                    <!-- nav bar -->
                    <b-navbar toggleable="lg" type="light" variant="info">
                      <b-navbar-toggle target="nav_collapse"/>

                      <b-collapse is-nav id="nav_collapse" class="bg-navbar">
                        <b-navbar-nav>
                          <b-link to="/inicio">
                            <el-button size="mini">
                              <i class="fas fa-arrow-left padding-icon"></i>Volver
                            </el-button>
                          </b-link>
                          <el-input
                            style="width: 300px; margin-left: 5px;"
                            placeholder="Filtrar por impuesto, periodo o importe"
                            prefix-icon="el-icon-search"
                            v-model="filtradoObligaciones"
                          ></el-input>
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
                    <el-table-wrapper
                      ref="tableObligaciones"
                      :data="dataObligaciones"
                      :columns="tableColumnsObligaciones"
                      :pagination="pagination"
                      :show-custom-header="false"
                    >
                      <template slot-scope slot="column-slot">
                        <b-link>
                        <i class="far fa-file-alt"></i>
                        </b-link>
                      </template>
                    </el-table-wrapper>
                    <el-button size="mini" @click="setCurrent()">Borrar selección</el-button>
                  </el-tab-pane>
                  <!-- TAB DEUDAS -->
                  <el-tab-pane label="Deudas Reimputables" name="deudas" disabled>
                    <h6>Selecciones una fila dentro de las deudas que tiene para compensar. Solo se permitirá la selección de una deuda por vez</h6>
                      <v-divider></v-divider>
                     <!-- nav bar -->
                    <b-navbar toggleable="lg" type="light" variant="info">
                      <b-navbar-toggle target="nav_collapse"/>

                      <b-collapse is-nav id="nav_collapse" class="bg-navbar">
                        <b-navbar-nav>
                          <b-link to="/inicio">
                            <el-button size="mini">
                              <i class="fas fa-arrow-left padding-icon"></i>Volver
                            </el-button>
                          </b-link>
                          <el-input
                            style="width: 300px; margin-left: 5px;"
                            placeholder="Filtrar por impuesto, periodo o importe"
                            prefix-icon="el-icon-search"
                            v-model="filtradoDeudas"
                          ></el-input>
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
                    <el-table-wrapper
                      row-key="id"
                      ref="tableDeudas"
                      :data="dataDeudas"
                      :columns="tableColumnsDeudas"
                      :pagination="pagination"
                      :show-custom-header="false"
                      highlight-current-row
                      @current-change="handleCurrentChange"
                    >
                      <template slot-scope slot="column-slot">
                        <el-button size="mini" icon="fas fa-plus"></el-button>
                        <!-- <el-radio v-model="radio" label=""></el-radio> -->
                      </template>
                    </el-table-wrapper>
                    <el-button size="mini" @click="setCurrent()">Borrar selección</el-button>
                  </el-tab-pane>
                  <!-- TAB IMPORTE -->
                  <el-tab-pane label="Importe" name="importe" disabled>
                    <b-col md="12" class="no-padding">
                      <vue-numeric
                        v-bind:min="0"
                        v-bind:max="1521.36"
                        currency="$"
                        precision="2"
                        v-model="monto"
                      ></vue-numeric>
                      <b-link to="../comprobantes/ticket">
                        <el-button
                          class="mt-20"
                          type="primary"
                          size="mini"
                          style="margin-left: 20px"
                        >Reimputar ahora</el-button>  
                      </b-link>
                      <v-divider></v-divider>
                      <h2>Impuesto a Reimputar: Inmobiliario | Periodo: 2010/01 | Importe a Reimputar: $ {{ monto }}</h2>
                      <v-divider></v-divider>
                    </b-col>
                  </el-tab-pane>
                </el-tabs>
              </b-col>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<style>
.card-header {
  font-size: 1.2em;
}
</style>

<script>
import store from "@/store/index";

export default {
  name: "reimputarPagos",
  data() {
    return {
      dataObligaciones: [
        {
          transaccion: 14225665,
          fechaPago: "2018/01/02",
          impuesto: "Inmobiliario",
          concepto: "Capital",
          periodo: "2010/01",
          saldoFavor: 1521.36
        },
        {
          transaccion: 14225666,
          fechaPago: "2018/02/02",
          impuesto: "Inmobiliario",
          concepto: "Capital",
          periodo: "2011/03",
          saldoFavor: 1521.36
        },
        {
          transaccion: 14225667,
          fechaPago: "2018/03/02",
          impuesto: "Ingresos Brutos",
          concepto: "Capital",
          periodo: "2017/01",
          saldoFavor: 1612.36
        }
      ],
      tableColumnsObligaciones: [
        {
          type: "selection"
        },
        {
          prop: "transaccion",
          label: "Transacción",
          sortable: true
        },
         {
          prop: "fechaPago",
          label: "Fecha de Pago",
          sortable: true
        },
        {
          prop: "impuesto",
          label: "Impuesto",
          sortable: true
        },
        {
          prop: "concepto",
          label: "Concepto",
          sortable: false
        },
        {
          prop: "periodo",
          label: "Periodo",
          sortable: true
        },
        {
          prop: "saldoFavor",
          label: "Saldo a Favor",
          sortable: true
        },
        {
          label: "Comprobante",
          scopedSlot: "column-slot"
        }
      ],
      dataDeudas: [
        {
          id: 1,
          impuesto: "Inmobiliario",
          concepto: "Total",
          periodo: "2010/01",
          vencimiento: "2010/05/02",
          // fechaDemanda: "2010/01",
          // cantidadDias: 460,
          importe: 1521.36,
          children: [
            {
              id: 11,
              impuesto: "",
              concepto: "Capital",
              periodo: "2010/01",
              vencimiento: "2010/05/02",
              importe: 1000
            },
            {
              id: 12,
              impuesto: "",
              concepto: "Intereses resarcitorios",
              periodo: "2010/01",
              vencimiento: "2010/05/02",
              importe: 500
            },
            {
              id: 13,
              impuesto: "",
              concepto: "Intereses punitorios",
              periodo: "2010/01",
              vencimiento: "2010/05/02",
              importe: 21.36
            }
          ]
        },
        {
          id: 2,
          impuesto: "Ingresos Brutos",
          concepto: "Total",
          periodo: "2010/01",
          vencimiento: "2010/05/02",
          importe: 2521.36,
          children: [
            {
              id: 21,
              impuesto: "",
              concepto: "Capital",
              periodo: "2010/01",
              vencimiento: "2010/05/02",
              importe: 2000
            },
            {
              id: 22,
              impuesto: "",
              concepto: "Intereses resarcitorios",
              periodo: "2010/01",
              vencimiento: "2010/05/02",
              importe: 500
            },
            {
              id: 23,
              impuesto: "",
              concepto: "Intereses punitorios",
              periodo: "2010/01",
              vencimiento: "2010/05/02",
              importe: 21.36
            }
          ]
        }
      ],
      tableColumnsDeudas: [
        {
          type: "selection",
          fixed:true
        },
        {
          width: 40
        },
        {
          prop: "impuesto",
          label: "Impuesto",
          sortable: true
        },
        {
          prop: "concepto",
          label: "Concepto",
          sortable: false
        },
        {
          prop: "periodo",
          label: "Periodo",
          sortable: true
        },
        {
          prop: "vencimiento",
          label: "Vencimiento",
          sortable: false
        },
        {
          prop: "importe",
          label: "Importe",
          sortable: true
        }
      ],
      pagination: {
        pageSize: 5,
        layout: "total, sizes, prev, pager, next",
        pageSizes: [2, 5, 10],
        onSizeChange: this.onPageSizeChange,
        onCurrentChange: this.onPageCurrentChange
      },

      selected: [],
      filtradoObligaciones: "",
      filtradoDeudas: "",
      active: 0, // step
      activeTab: "obligaciones",
      monto: 0,
      radio: 0,
      currentRow: null,
      isActive: true
    };
  },
  methods: {
    filterTag(value, row) {
      return row.tag === value;
    },
    next() {
      // if (this.active++ > 2) this.active = 0;

      if (this.active++ > 1){
        this.isActive = false
      } 
      // this.active = 0;
      console.log(this.active)
      if(this.active == 0){
        this.activeTab = "obligaciones"
      }
      if (this.active == 1) {
        this.activeTab = "deudas"
      }
      if (this.active == 2) {
        this.activeTab = "importe"
      }
    },
    setCurrentObligacion() {
      this.$refs.tableObligaciones.setCurrentRow(row);
    },
    setCurrentDeuda() {
      this.$refs.tableDeudas.setCurrentRow(row);
    }
  },
  computed: {},
  mounted() {}
};
</script>
