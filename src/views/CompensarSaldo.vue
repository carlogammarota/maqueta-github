<template>
  <div class="animated fadeIn">
    <compensar-saldo-mobile class="hidden-md-and-up"></compensar-saldo-mobile>
    <b-card class="text-center hidden-sm-and-down" header="Compensar Saldo">
      <b-container style="padding: 0px">
        <b-row align-h="center" style="margin-top: 40px">
          <b-col sm="12" md="12">
            <b-card class="text-left">
              <b-col md="12">
                {{deudaSelected}}
                <el-steps :active="active" finish-status="success">
                  <el-step
                    title="Origen"
                    description="Seleccione una fila de las obligaciones con saldo a Favor"
                  >
                    <span slot="description">
                      <h6>Impuesto: {{selected.impuesto}}</h6>
                      <h6>Concepto: {{selected.concepto}}</h6>
                      <h6>Periodo: {{selected.periodo}}</h6>
                      <h6>Saldo a Favor: $ {{selected.saldoFavor}}</h6>
                    </span>
                    <!-- <span slot="description">
                      <h6>Impuesto: Inmobiliario</h6>
                      <h6>Concepto: Capital</h6>
                      <h6>Periodo: 2010/01</h6>
                      <h6>Saldo a Favor: $ 1.521.36</h6>
                    </span> -->
                  </el-step>
                  <el-step
                    title="Destino"
                    description="Seleccione una fila de las deudas compensables"
                  >
                    <span slot="description">
                      <h6>Impuesto: {{deudaSelected.impuesto}}</h6>
                      <h6>Concepto: {{deudaSelected.concepto}}</h6>
                      <h6>Periodo: {{deudaSelected.periodo}}</h6>
                      <h6>Saldo a Favor: $ {{deudaSelected.importe}}</h6>
                    </span>
                  </el-step>
                  <el-step title="Importe" description="Ingrese el importe a compensar"></el-step>
                </el-steps>
                <el-button  v-show="isActive" class="mt-20" type="primary" size="mini" @click="next" :disabled="pasoSiguienteState">Paso Siguiente</el-button>
                <v-divider></v-divider>
                <el-tabs v-model="activeTab">
                  <!-- TAB OBLIGACIONES -->
                  <el-tab-pane label="Obligaciones con Saldo a Favor" name="obligaciones" disabled>
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
                      <template  slot-scope="key" slot="columnRadio">
                        <!-- <el-button @click="testTest(key.$index)" size="mini" icon="fas fa-plus"></el-button> -->
                        <!-- {{key}} -->
                        <el-radio v-model="radioObligacion" :label="key.$index" @change="handleSelectionChange" ></el-radio>
                      </template>
                    </el-table-wrapper>
                    <el-button size="mini" @click="setCurrent()">Borrar selección</el-button>
                  </el-tab-pane>
                  <!-- TAB DEUDAS -->
                  <el-tab-pane label="Deudas Compensables" name="deudas" disabled>
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

                    <!-- {{dataDeudas}} -->
                    <el-table
                    :data="tableData"
                    style="width: 100%" >
                    
                      <!-- <el-radio v-model="radio" :label="key.$index" @change="handleSelectionChange" ></el-radio> -->
                      
                      <!-- <el-radio v-model="radio" :label="key.$index" @change="handleSelectionChange" ></el-radio> -->
                        <!-- <el-radio v-model="radioDos" :label="key.$index"></el-radio>  -->
                         
                    
                    <!-- <el-table-column prop="checkbox" label="checkbox"> -->
                      <!-- <template slot-scope="key" slot="radioBoton"> -->
                          <!-- <el-radio v-model="radio" :label="key.$index" @change="handleSelectionChange"></el-radio> -->
                          <!-- <el-radio v-model="radio" :label="key"></el-radio> -->
                      <!-- </template> -->
                    <!-- </el-table-column > -->
                    <el-table-column prop="checkbox" key="index" label="checkbox">
                      <template slot-scope="scope">
                        <el-radio v-model="radioDeuda" :label="scope.$index"  @change="deudaSeleccionada"></el-radio>
                      </template>
                    </el-table-column>

                   
                    <!-- <el-table-column>
                      <template slot-scope="props" slot="">
                        <el-radio v-model="radio" :label="key.$index" @change="handleSelectionChange" ></el-radio>
                      </template>
                    </el-table-column> -->
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <p class="detalles">Capital: 1500</p>
                        <p class="detalles">Intereses resarcitorios: 2000</p>
                        <p class="detalles">Intereses punitorios: 3000</p>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Impuesto"
                      prop="impuesto">
                    </el-table-column>
                    <el-table-column
                      label="Concepto"
                      prop="concepto">
                    </el-table-column>
                    <el-table-column
                      label="Periodo"
                      prop="periodo"
                      >
                    </el-table-column>
                    <el-table-column
                      label="Vencimiento"
                      prop="vencimiento"
                      >
                    </el-table-column>
                    <el-table-column
                      label="Fecha Demanda"
                      prop="fechaDemanda"
                      >
                    </el-table-column>
                    <el-table-column
                      label="Cantidad de Dias"
                      prop="cantidadDias"
                      >
                    </el-table-column>
                    <el-table-column
                      label="Fecha de Demanda"
                      prop="fechaDemanda"
                      >
                    </el-table-column>
                  </el-table>


<!-- 
                    <el-table-wrapper
                      row-key="id"
                      ref="tableDeudas"
                      :data="dataDeudas"
                      :columns="tableColumnsDeudas"
                      :pagination="pagination"
                      :show-custom-header="false"
                    >

                      <template slot-scope="key" slot="columnRadioDeudas">
                        <el-radio v-model="radioDeudas" :label="key.$index" @change="handleSelectionChange" ></el-radio>
                      </template>
                      
                    </el-table-wrapper>
                     -->
                    <!-- <el-button size="mini" @click="setCurrent()">Borrar selección</el-button> -->
                  </el-tab-pane>
                  <!-- TAB IMPORTE -->
                  <el-tab-pane label="Importe" name="importe" disabled>
                    <b-col md="12" class="no-padding">
                      <vue-numeric
                        v-bind:min="0"
                        v-bind:max="1521.36"
                        currency="$"
                        precision= "2"
                        v-model="monto"
                      ></vue-numeric>
                      <b-link to="../comprobantes/ticket">
                        <el-button
                          class="mt-20"
                          type="primary"
                          size="mini"
                          style="margin-left: 20px"
                        >Compensar ahora</el-button>
                      </b-link>
                      <v-divider></v-divider>
                      <h2>Impuesto a Compensar: {{selected.impuesto}} | Periodo: {{selected.periodo}} | Importe a Compensar: $ {{ monto }}</h2>
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
import CompensarSaldoMobile from '@/views/mobile/CompensarSaldo'

export default {
  name: "compensarSaldos",
  components: {
    CompensarSaldoMobile
  },
  data() {
    return {
       tableData: [
         {
          id: 1,
          impuesto: "Inmobiliario",
          concepto: "Total",
          periodo: "2010/01",
          vencimiento: "2010/05/02",
          fechaDemanda: "2010/01",
          cantidadDias: 460,
          importe: 1521.36,
        },
        {
          id: 2,
          impuesto: "Ingresos Brutos",
          concepto: "Total",
          periodo: "2010/01",
          vencimiento: "2010/05/02",
          fechaDemanda: "2010/01",
          cantidadDias: 460,
          importe: 2521.36,
        }
       ],
      dataObligaciones: [
        {
          impuesto: "Inmobiliario",
          concepto: "Capital",
          periodo: "2010/01",
          saldoFavor: 1521.36
        },
        {
          impuesto: "Inmobiliario",
          concepto: "Capital",
          periodo: "2011/03",
          saldoFavor: 1521.36
        },
        {
          impuesto: "Ingresos Brutos",
          concepto: "Capital",
          periodo: "2017/01",
          saldoFavor: 1612.36
        }
      ],
      tableColumnsObligaciones: [
        {
          prop: "tag",
          scopedSlot: "columnRadio"
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
              fechaDemanda: "2010/01",
              cantidadDias: 460,
              importe: 1000
            },
            {
              id: 12,
              impuesto: "",
              concepto: "Intereses resarcitorios",
              periodo: "2010/01",
              vencimiento: "2010/05/02",
              fechaDemanda: "2010/01",
              cantidadDias: 460,
              importe: 500
            },
            {
              id: 13,
              impuesto: "",
              concepto: "Intereses punitorios",
              periodo: "2010/01",
              vencimiento: "2010/05/02",
              fechaDemanda: "2010/01",
              cantidadDias: 460,
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
          // fechaDemanda: "2010/01",
          // cantidadDias: 460,
          importe: 2521.36,
          children: [
            {
              id: 21,
              impuesto: "",
              concepto: "Capital",
              periodo: "2010/01",
              vencimiento: "2010/05/02",
              fechaDemanda: "2010/01",
              cantidadDias: 460,
              importe: 2000
            },
            {
              id: 22,
              impuesto: "",
              concepto: "Intereses resarcitorios",
              periodo: "2010/01",
              vencimiento: "2010/05/02",
              fechaDemanda: "2010/01",
              cantidadDias: 460,
              importe: 500
            },
            {
              id: 23,
              impuesto: "",
              concepto: "Intereses punitorios",
              periodo: "2010/01",
              vencimiento: "2010/05/02",
              fechaDemanda: "2010/01",
              cantidadDias: 460,
              importe: 21.36
            }
          ]
        }
      ],
      tableColumnsDeudas: [
        {
          prop: "tag",
          scopedSlot: "columnRadioDeudas",
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
          prop: "fechaDemanda",
          label: "Fecha de la demanda",
          sortable: false
        },
        {
          prop: "cantidadDias",
          label: "Cantidad de días",
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

      selected: {},
      filtradoObligaciones: "",
      filtradoDeudas: "",
      active: 0, // step
      activeTab: "obligaciones",
      monto: 0,
      radio: 0,
      currentRow: null,
      isActive: true,
      radioDeuda: null,
      radioObligacion: null,
      deudaSelected: {},
      pasoSiguienteState: false
    };
  },
  methods: {
    testTest(val){
      console.log("test", val.row)
    },
    deudaSeleccionada(val){
      // console.log("variable", this.radioDeuda)
      console.log("deuda selected variable", val)
      console.log("deuda selected", this.tableData[val])
      this.deudaSelected = this.tableData[val]
    },
    handleSelectionChange(val){
      console.log("val", val)
      console.log("handleSelectionChange", this.dataObligaciones[val])
      this.selected = this.dataObligaciones[val]
      // this.selected = val[0]
      // if (val.length > 0 ) {
        
      // }
      
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    next() {

      
      // if (this.radioDeuda < 0) {
      //   console.log("Radio Deuda", this.radioDeuda)
      // }

      this.pasoSiguienteState = true

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
  watch: {
    // COMPROBAR QUE HAY ALGUN DATO EN ORINGEN!
    radioObligacion: function(){
      console.log("change")
      if (this.radioObligacion === null) {
            console.log("NULL")
            this.pasoSiguienteState = true
          } else {
            this.pasoSiguienteState = false
          }
    },

     radioDeuda: function(){
      console.log("change")
      if (this.radioDeuda === null) {
            console.log("NULL")
            this.pasoSiguienteState = true
          } else {
            this.pasoSiguienteState = false
          }
    }
  },
  computed: {},
  mounted() {
    // console.log(this.radioObligacion)
        if (this.radioObligacion === null) {
          console.log("NULL")
          this.pasoSiguienteState = true
        } else {
          this.pasoSiguienteState = false
        }
    
  }
};
</script>

<style>
  .detalles{
    font-size: 13px;
    text-align: left
  }
</style>
