<template>
  <div class="animated fadeIn">
    <b-card class="text-center">
      <b-container style="padding: 0px">
        <b-row align-h="center">
          <b-col sm="12" md="6" lg="4">
            <b-card no-body class="bg-info">
              <b-card-body class="p-2">
                <div class="text-left">
                  <span class="fs-14b">Deuda Total</span>
                  <!-- <span class="right featured-font">$ 385.721,27</span> -->
                  <span class="right featured-font">$ {{sumSaldoDeudorTotal}}</span>
                  <v-divider></v-divider>
                  <h6>
                    Capital Vencido:
                    <!-- <span class="right">$ 370.837,86</span> -->
                    <span class="right">$ {{capitalVencido}}</span>
                  </h6>
                  <h6>
                    Capital No Vencido:
                    <!-- <span class="right">$ 2.987,24</span> -->
                    <span class="right">$ {{capitalNoVencido}}</span>
                  </h6>
                  <h6>
                    Intereses Resarcitorios:
                    <el-tooltip content placement="top" effect="light">
                      <div slot="content">
                        Los intereses resarcitorios se calculan a partir
                        <br>de la fecha de vencimiento hasta la fecha actual o
                        <br>hasta la fecha demanda, en el caso de que existiera.
                      </div>
                      <i class="fas fa-info-circle pl-10 fs-12 padding-icon"></i>
                    </el-tooltip>
                    <!-- <span class="right">$ 11.561,80</span> -->
                    <span class="right">$ {{sumaInteresesResarcitoriosTotal}}</span>
                  </h6>
                  <h6>
                    Intereses Punitorios:
                    <el-tooltip content placement="bottom" effect="light">
                      <div slot="content">
                        Los intereses punitorios se calculan a partir
                        <br>de la fecha de la demanda hasta la fecha actual.
                      </div>
                      <i class="fas fa-info-circle pl-10 fs-12 padding-icon"></i>
                    </el-tooltip>
                    <!-- <span class="right">$ 334,37</span> -->
                    <span class="right">$ {{sumaInteresesPunitoriosTotal}}</span>
                  </h6>
                  <v-divider></v-divider>
                </div>
              </b-card-body>
            </b-card>
            <b-link to="operaciones/confirmarPago">
              <el-button type="primary" size="mini" style="width: 100%">Pagar todo</el-button>
            </b-link>
            <div class="spacing hidden-md-and-up"></div>
            <b-link to="detalleDeuda" class="hidden-md-and-up">
              <el-button type="primary" size="mini" style="width: 100%">Detalle</el-button>
            </b-link>
            <v-divider class="hidden-md-and-up"></v-divider>
          </b-col>
          <b-col sm="12" md="4">
            <b-card title bg-variant="success">
              <b-card-text class="text-left">
                <span class="fs-14b">Saldo a favor</span>
                <span class="right featured-font">$ 11.192,04</span>
              </b-card-text>
              <v-divider></v-divider>

              <b-link to="operaciones/compensar" >
                <el-tooltip placement="top" effect="light">
                  <div slot="content">
                    Es cuando el contribuyente tiene saldo a favor
                    <br>y se encuentra disponible para ser utilizado
                    <br>en la cancelación de otras obligaciones.
                  </div>
                  <el-button type="primary" size="mini">Compensar pago</el-button>
                </el-tooltip>
              </b-link>

              <div class="spacing hidden-md-and-up"></div>
              <b-link to="operaciones/reimputar">
                <el-tooltip content placement="top" effect="light">
                  <div slot="content">
                    Es cuando el contribuyente tiene saldo a favor, originado a partir de un pago duplicado y/o mal realizado,
                    <br>y se encuentra disponible para cancelar otro pago del mismo tipo de obligación.
                    <br>
                    <br>Al momento de reimputar el pago se debe tomar la fecha original en el cual se realizó el pago
                    <br>que generó el saldo a favor.
                  </div>
                  <el-button
                    link="operaciones/confirmarPago"
                    type="primary"
                    size="mini"
                  >Reimputar pagos</el-button>
                </el-tooltip>
              </b-link>
            </b-card>
            <b-card title class="bg-warning">
              <h2>Faltas de presentación</h2>
              <h2>- (2) -</h2>
            </b-card>
          </b-col>
          <b-col sm="12" md="4" class="hidden-sm-and-down">
            <b-card no-body class="bg-info">
              <b-card-body class="p-2">
                <div class="text-left">
                  <span class="fs-14b">Deuda Seleccionada</span>
                  <!-- <span class="right featured-font">$ 0,00</span> -->
                  <span class="right featured-font">$  {{sumaSaldoDeudor}}</span>

                  <v-divider></v-divider>
                  <h6>
                    Capital Vencido:
                    <!-- <span class="right">$ 0,00</span> -->
                    <span class="right">$ {{capitalVencidoSelect}}</span>
                  </h6>

                  <h6>
                    Capital No Vencido:
                    <!-- <span class="right">$ 0,00</span> -->
                    <span class="right">$ {{capitalNoVencidoSelect}}</span>
                  </h6>

                  <h6>
                    Intereses Resarcitorios:
                    <!-- <span class="right">$ 0,00</span> -->
                    <span class="right">$  {{sumaInteresesResarcitorios}}</span>
                  </h6>

                  <h6>
                    Intereses Punitorios:
                    <span class="right">$ {{sumaInteresesPunitorios}}</span>
                    <!-- <span class="right">$ 0,00</span> -->
                  </h6>
                  <v-divider></v-divider>
                </div>
              </b-card-body>
            </b-card>
            <b-link to="operaciones/confirmarPago">
              <el-button type="primary" size="mini" style="width: 100%">Pagar selección</el-button>
            </b-link>
          </b-col>

          <b-col sm="12" md="4"></b-col>
        </b-row>
        <b-row align-h="center" style="margin-top: 40px">
          <b-col sm="12" md="12">
            <!-- nav bar -->
            <b-navbar toggleable="lg" type="light" variant="info" class="hidden-sm-and-down">
              <b-navbar-toggle target="nav_collapse"/>

              <b-collapse is-nav id="nav_collapse" class="bg-navbar">
                <b-navbar-nav>
                  <el-button size="mini">Seleccionar todo</el-button>
                  <el-button size="mini">Invertir selección</el-button>
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

            <el-collapse accordion class="hidden-sm-and-down">
              <el-collapse-item name="1">
                <template slot="title">
                  <table>
                    <tr>
                      <th width="65">
                        <span style="width: 62px">
                          <i class="fas fa-home"></i>
                        </span>
                      </th>
                      <th width="210">
                        <h3>Inmobiliario</h3>
                      </th>
                      <th width="200">
                        <el-input
                          style="width: 200px; margin-left: 5px; font-size: 10px;"
                          placeholder="Filtrar"
                          prefix-icon="el-icon-search"
                          v-model="filters[0].value"
                        ></el-input>
                      </th>
                      <th width="230">
                        <el-tooltip content="Total Saldo Deudor" placement="top" effect="dark">
                          <!-- <h3>$ 10.178,70</h3> -->
                          <h3>$ 10.178,70</h3>
                        </el-tooltip>
                      </th>
                      <th width="180">
                        <el-tooltip content="Total Saldo a Favor" placement="top" effect="dark">
                          <h3>$ 1.612,53</h3>
                        </el-tooltip>
                      </th>
                      <th width="250">
                        <el-tooltip
                          content="Total Intereses resarcitorios"
                          placement="top"
                          effect="dark"
                        >
                          <h3>$ 152,82</h3>
                        </el-tooltip>
                      </th>
                      <th width="160">
                        <el-tooltip
                          content="Total Intereses punitorios"
                          placement="top"
                          effect="dark"
                        >
                          <h3>$ 334,47</h3>
                        </el-tooltip>
                      </th>
                      <th width="95"></th>
                    </tr>
                  </table>
                </template>
                <data-tables
                  @selection-change="handleSelectionChange"
                  :data="tableDataInmobiliario"
                  :filters="filters"
                  :pagination-props="{ pageSizes: [3, 5, 10] }"
                >
                  <el-table-column type="selection" width="76px"></el-table-column>
                  <el-table-column
                    sortable
                    v-for="column in columns"
                    :prop="column.prop"
                    :label="column.label"
                    :key="column.prop"
                  ></el-table-column>
                  <el-table-column label="Presentación" min-width="100px"></el-table-column>
                  <el-table-column label="Ver" min-width="50px">
                    <template>
                      <b-link class="obligacion-icon" to="cuentaCorriente/consultarPorPeriodo">
                        <i class="far fa-file-alt size-3x"></i>
                      </b-link>
                    </template>
                  </el-table-column>
                </data-tables>
              </el-collapse-item>
              <el-collapse-item name="2">
                <template slot="title">
                  <table>
                    <tr>
                      <th width="65">
                        <span class style="width: 62px">
                          <i class="fas fa-car-alt"></i>
                        </span>
                      </th>
                      <th width="210">
                        <h3>Automotores</h3>
                      </th>
                      <th width="200">
                        <el-input
                          style="width: 200px; margin-left: 5px; font-size: 10px;"
                          placeholder="Filtrar"
                          prefix-icon="el-icon-search"
                          v-model="filters[1].value"
                        ></el-input>
                      </th>
                      <th width="230">
                        <el-tooltip content="Total Saldo Deudor" placement="top" effect="dark">
                          <h3>$ 1.456,00</h3>
                        </el-tooltip>
                      </th>
                      <th width="180">
                        <el-tooltip content="Total Saldo a Favor" placement="top" effect="dark">
                          <h3>$ 21,67</h3>
                        </el-tooltip>
                      </th>
                      <th width="250">
                        <el-tooltip
                          content="Total Intereses resarcitorios"
                          placement="top"
                          effect="dark"
                        >
                          <h3>$ 0,00</h3>
                        </el-tooltip>
                      </th>
                      <th width="160">
                        <el-tooltip
                          content="Total Intereses punitorios"
                          placement="top"
                          effect="dark"
                        >
                          <h3>$ 0,00</h3>
                        </el-tooltip>
                      </th>
                      <th width="95"></th>
                    </tr>
                  </table>
                </template>
                <data-tables
                  @selection-change="handleSelectionChange"
                  :data="tableDataAutomotores"
                  :filters="filters"
                  :pagination-props="{ pageSizes: [3, 5, 10] }"
                >
                  <el-table-column type="selection" width="76px"></el-table-column>
                  <el-table-column
                    sortable
                    v-for="column in columns"
                    :prop="column.prop"
                    :label="column.label"
                    :key="column.prop"
                  ></el-table-column>
                  <el-table-column label="Presentación" min-width="100px"></el-table-column>
                  <el-table-column label="Ver" min-width="50px">
                    <template>
                      <b-link class="obligacion-icon" to="cuentaCorriente/consultarPorPeriodo">
                        <i class="far fa-file-alt size-3x"></i>
                      </b-link>
                    </template>
                  </el-table-column>
                </data-tables>
              </el-collapse-item>
              <el-collapse-item name="3">
                <template slot="title">
                  <table>
                    <tr>
                      <th width="65">
                        <span class style="width: 62px">
                          <i class="fas fa-dollar-sign"></i>
                        </span>
                      </th>
                      <th width="210">
                        <h3>Ingresos Brutos</h3>
                      </th>
                      <th width="200">
                        <el-input
                          style="width: 200px; margin-left: 5px; font-size: 10px;"
                          placeholder="Filtrar"
                          prefix-icon="el-icon-search"
                          v-model="filters[2].value"
                        ></el-input>
                      </th>
                      <th width="230">
                        <el-tooltip content="Total Saldo Deudor" placement="top" effect="dark">
                          <h3>$ 357.747,16</h3>
                        </el-tooltip>
                      </th>
                      <th width="180">
                        <el-tooltip content="Total Saldo a Favor" placement="top" effect="dark">
                          <h3>$ 8.123,51</h3>
                        </el-tooltip>
                      </th>
                      <th width="250">
                        <el-tooltip
                          content="Total Intereses resarcitorios"
                          placement="top"
                          effect="dark"
                        >
                          <h3>$ 8.123,51</h3>
                        </el-tooltip>
                      </th>
                      <th width="160">
                        <el-tooltip
                          content="Total Intereses punitorios"
                          placement="top"
                          effect="dark"
                        >
                          <h3>$ 11.387,31</h3>
                        </el-tooltip>
                      </th>
                      <th width="160"></th>
                    </tr>
                  </table>
                </template>

                <data-tables
                  @selection-change="handleSelectionChange"
                  :data="tableDataIIBB"
                  :filters="filters"
                  :pagination-props="{ pageSizes: [3, 5, 10] }"
                >
                  <el-table-column type="selection" width="76px"></el-table-column>
                  <el-table-column
                    sortable
                    v-for="column in columns"
                    :prop="column.prop"
                    :label="column.label"
                    :key="column.prop"
                  ></el-table-column>
                  <el-table-column
                    label="Presentación"
                    min-width="100px"
                    :filters="[{ text: 'En término', value: 'En término' }, { text: 'Fuera de término', value: 'Fuera de término' }, { text: 'Falta presentación', value: 'Falta presentación' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end"
                  >
                    <template slot-scope="scope">
                      <el-tag
                        :type="scope.row.estado === 'En término' ? 'success' : scope.row.estado === 'Fuera de término' ? 'warning' : 'danger'"
                      >
                        <i class="fas fa-sign-in-alt padding-icon"></i>
                        {{scope.row.estado}}
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="Ver" min-width="50px">
                    <template>
                      <b-link class="obligacion-icon" to="cuentaCorriente/consultarPorPeriodo">
                        <i class="far fa-file-alt size-3x"></i>
                      </b-link>
                    </template>
                  </el-table-column>
                </data-tables>
              </el-collapse-item>
            </el-collapse>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>


<script>
import store from "@/store/index";
import SelectImpuesto from "@/views/components/SelectImpuesto";
import InfoResarcitorios from "@/views/components/InfoResarcitorios";
import { mapState, mapActions, mapMutations } from 'vuex'
import moment from 'moment'

export default {
  name: "inicio",
  components: {
    SelectImpuesto,
    InfoResarcitorios
  },
  data() {
    return {
      filters: [
        {
          prop: ["periodo", "vencimiento"],
          value: ""
        },
        {
          prop: ["periodo", "vencimiento"],
          value: ""
        },
        {
          prop: ["periodo", "vencimiento", "estado"],
          value: ""
        }
      ],
      pagination: {
        pageSize: 3,
        layout: "total, sizes, prev, pager, next",
        pageSizes: [3, 5, 10],
        onSizeChange: this.onPageSizeChange,
        onCurrentChange: this.onPageCurrentChange
      },
      columns: [
        {
          prop: "periodo",
          label: "Periodo"
        },
        {
          prop: "vencimiento",
          label: "Vencimiento"
        },
        {
          prop: "saldoDeudor",
          label: "Saldo deudor"
        },
        {
          prop: "saldoFavor",
          label: "Saldo a Favor"
        },
        {
          prop: "iResarcitorio",
          label: "Intereses resarcitorios"
        },
        {
          prop: "iPunitorio",
          label: "Intereses punitorios"
        }
      ],
      tableSeleccionInmobiliario: [
        {
          periodo: "01/2010",
          vencimiento: "05/02/2020",
          saldoDeudor: 90.000,
          saldoFavor: 0,
          iResarcitorio: 6225,
          iPunitorio: 12356,
          estado: "-"
        }
      ],
      tableDataInmobiliario: [
         {
          periodo: "01/2010",
          vencimiento: "10/10/2020",
          saldoDeudor: 99.999,
          saldoFavor: 0,
          iResarcitorio: 6225,
          iPunitorio: 12356,
          estado: ""
        },
        {
          periodo: "01/2010",
          vencimiento: "05/02/2010",
          saldoDeudor: 1.521,
          saldoFavor: 0,
          iResarcitorio: 6225,
          iPunitorio: 1235,
          estado: ""
        },
        {
          periodo: "02/2010",
          vencimiento: "06/03/2010",
          saldoDeudor: 1.521,
          saldoFavor: 0,
          iResarcitorio: 5832,
          iPunitorio: 11056,
          estado: "-"
        },
        {
          periodo: "03/2011",
          vencimiento: "05/04/2010",
          saldoDeudor: 1.612,
          saldoFavor: 0,
          iResarcitorio: 3225,
          iPunitorio: 10025,
          estado: "-"
        },
        {
          periodo: "04/2011",
          vencimiento: "06/05/2011",
          saldoDeudor: 1.612,
          saldoFavor: 0,
          iResarcitorio: 55956,
          iPunitorio: 660,
          estado: "-"
        },
        {
          periodo: "03/2015",
          vencimiento: "06/04/2015",
          saldoDeudor: 2.536,
          saldoFavor: 0,
          iResarcitorio: 15.82,
          iPunitorio: 299,
          estado: "-"
        },
        {
          periodo: "01/2016",
          vencimiento: "05/02/2016",
          saldoDeudor: 2.987,
          saldoFavor: 0,
          iResarcitorio: 12.32,
          iPunitorio: 3544,
          estado: "-"
        },
        {
          periodo: "03/2019",
          vencimiento: "06/04/2019",
          saldoDeudor: 2987,
          saldoFavor: 0,
          iResarcitorio: 4685,
          iPunitorio: 322,
          estado: "-"
        }
      ],
      tableDataAutomotores: [
        {
          periodo: "01/2010",
          vencimiento: "14/09/2019",
          saldoDeudor: 14.5600,
          saldoFavor: 0,
          iResarcitorio: 1132,
          iPunitorio: 475,
          estado: ""
        },
        {
          periodo: "02/2010",
          vencimiento: "15/05/2010",
          saldoDeudor: 0,
          saldoFavor: 1456,
          iResarcitorio: 1132,
          iPunitorio: 399,
          estado: ""
        },
        {
          periodo: "03/2010",
          vencimiento: "16/08/2010",
          saldoDeudor: 0,
          saldoFavor: 1456,
          iResarcitorio: 1035,
          iPunitorio: 465,
          estado: ""
        }
      ],
      tableDataIIBB: [
        {
          periodo: "01/2017",
          vencimiento: "10/02/2017",
          saldoDeudor: 75.548,
          saldoFavor: 0,
          iResarcitorio: 2530,
          iPunitorio: 12356,
          estado: "En término"
        },
        {
          periodo: "02/2017",
          vencimiento: "10/03/2017",
          saldoDeudor: 68.256,
          saldoFavor: 0,
          iResarcitorio: 2035,
          iPunitorio: 11056,
          estado: "Fuera de término"
        },
        {
          periodo: "03/2017",
          vencimiento: "12/11/2017",
          saldoDeudor: 52.369,
          saldoFavor: 0,
          iResarcitorio: 2306,
          iPunitorio: 981,
          estado: "Falta presentación"
        },
        {
          periodo: "04/2017",
          vencimiento: "12/11/2017",
          saldoDeudor: 5.000,
          saldoFavor: 12351,
          iResarcitorio: 59666,
          iPunitorio: 634,
          estado: "En término"
        },
        {
          periodo: "05/2017",
          vencimiento: "15/11/2017",
          saldoDeudor: 65.945,
          saldoFavor: 0,
          iResarcitorio: 46584,
          iPunitorio: 400,
          estado: "En término"
        },
        {
          periodo: "03/2018",
          vencimiento: "08/11/2018",
          saldoDeudor: 75.325,
          saldoFavor: 0,
          iResarcitorio: 1605,
          iPunitorio: 800,
          estado: "En término"
        },
        {
          periodo: "01/2019",
          vencimiento: "11/02/2019",
          saldoDeudor: 89.248,
          saldoFavor: 0,
          iResarcitorio: 2910,
          iPunitorio: 1300,
          estado: "En término"
        },
        {
          periodo: "02/2019",
          vencimiento: "13/11/2019",
          saldoDeudor: 13.456,
          saldoFavor: 0,
          iResarcitorio: 4520,
          iPunitorio: 1200,
          estado: "En término"
        }
      ],
      selected: [],
      search: "",
      filtrarInmobiliario: "",
      filtrarAutomotores: "",
      filtrarIIBB: "",

      formOptions: {
        inline: true,
        submitBtnText: "Buscar",
        forms: [
          { prop: "periodo", label: "Periodo" },
          { prop: "vencimiento", label: "Vencimiento" },
          {
            prop: "estado",
            label: "Estado",
            itemType: "select",
            options: [
              { value: "En término", label: "En término" },
              { value: "Fuera de término", label: "Fuera de Término" },
              { value: "Falta presentación", label: "Falta presentación" }
            ]
          }
        ]
      },
      totalSaldoDeudorInmobiliario: 0,
      multipleSelection: [],
      sumaSaldoDeudor: 0,
      sumaInteresesResarcitorios: 0,
      sumaInteresesPunitorios: 0,
      sumSaldoDeudorTotal: 0,
      sumaInteresesResarcitoriosTotal: 0,
      sumaInteresesPunitoriosTotal: 0,
      capitalVencido: 0,
      capitalNoVencido: 0,
      capitalVencidoSelect: 0,
      capitalNoVencidoSelect: 0,
      Inmobiliario: 0,
      saldoDeudorAutomotores: 0,
      saldoDeudorInmobiliario: 0,
      }
    
  },
  methods: {
    filterTag(value, row) {
      return row.estado === value;
    },
    toggleSelection(rows) {
      console.log("TEST 2019", row)
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      //DEUDA SELECCIONADA
      //Suma saldo Deudor
      this.multipleSelection = val;
      function sumSaldoDeudor(array){
        var acum = 0;
        for (var i = 0; i < array.length; i++){
          acum = acum + array[i].saldoDeudor;
          }
          return acum;
        }
      this.sumaSaldoDeudor = sumSaldoDeudor(val)
      

      //Suma Intereses Resarcitorios
      // console.log("VAL", val)
      function sumInteresesResarcitorios(array){
        var acum = 0;
        for (var i = 0; i < array.length; i++){
          acum = acum + array[i].iResarcitorio;
          // console.log("i", array[i].iResarcitorio)
          }
          return acum;
        }
        // console.log("total", sumInteresesResarcitorios(val))
      this.sumaInteresesResarcitorios = sumInteresesResarcitorios(val)

      //Suma Intereses Punitorios
      function sumaInteresesPunitorios(array){
        var acum = 0;
        for (var i = 0; i < array.length; i++){
          acum = acum + array[i].iPunitorio;
          }
          return acum;
      }
        // console.log("total", sumInteresesResarcitorios(val))
      this.sumaInteresesPunitorios = sumaInteresesPunitorios(val)


      // this.capitalVencidoSelect = val[0].saldoDeudor


       //Capital Vencido
      if (val.length > 1) {
        let fechaActual = moment().format("YYYYMMDD")
        // console.log("fechaActual", fechaActual)
        var capitalVencidoSelect = 0;
        console.log("Selected", val)
        for (var i = 0; i < val.length; i++){
          // console.log("asdasdasdasd", moment(this.tableDataIIBB[i].vencimiento).format("YYYYMMDD"))
          if (moment(val[i].vencimiento).isBefore(moment().format("DD/MM/YYYY"))) {
            // console.log("CAPITAL VENCIDO")
            capitalVencidoSelect = capitalVencidoSelect + val[i].saldoDeudor;
          } 
        }
        this.capitalVencidoSelect = capitalVencidoSelect;
      } 
      else if (val.length == 0) {
        this.capitalVencidoSelect = 0
      } else {
        this.capitalVencidoSelect = val[0].saldoDeudor
      } 


      //Capital No Vencido
      // moment('2010-10-20').isBefore('2010-10-21');
      if (val.length > 1) {
        // let fechaActual = moment()
        // console.log("fechaActual", fechaActual)
        var capitalNoVencidoSelect = 0;
        console.log("Selected", val)
        for (var i = 0; i < val.length; i++){
          // console.log("asdasdasdasd", moment(this.tableDataIIBB[i].vencimiento).format("YYYYMMDD"))
          
          if (!moment(val[i].vencimiento).isBefore(moment().format("DD/MM/YYYY"))) {
            // console.log("CAPITAL VENCIDO", moment(val[i].vencimiento).isBefore(moment().format("DD/MM/YYYY"))
            capitalNoVencidoSelect = capitalNoVencidoSelect + val[i].saldoDeudor;
          } 
        }
        this.capitalNoVencidoSelect = capitalNoVencidoSelect;
      } else if (val.length == 0) {
        this.capitalNoVencidoSelect = 0
      } else {
        this.capitalNoVencidoSelect = val[0].saldoDeudor
      } 
     










    }
  },
  computed: {
    // deudaTotal: function () {
    //   return this.sumaSaldoDeudor
    //   // return 385.721
    // },
    // interesesResarcitorios: function (){
    //   return this.interesesResarcitorios
    // }
  },
  mounted() {
    
    //recorrer tableDataIIBB tableDataAutomotores tableDataInmobiliario y devolver la suma de la columna saldo deudor

      console.log("tableDataIIBB", this.tableDataIIBB)
      // console.log("tableDataAutomotores", this.tableDataAutomotores)
      // console.log("tableDataInmobiliario", this.tableDataInmobiliario)

    //DEUDA TOTAL

      

      var deudaTotal = 0;
      

      for (var i = 0; i < this.tableDataIIBB.length; i++){
        deudaTotal = deudaTotal + this.tableDataIIBB[i].iPunitorio;

        //aca hay que revisar esto, para poder mostrar el total de saldoDeudor en cada tabla
        this.Inmobiliario = this.saldoDeudorIIBB + this.tableDataIIBB[i].saldoDeudor
        console.log("Inmobiliario",this.Inmobiliario)
      }
      for (var i = 0; i < this.tableDataAutomotores.length; i++){
        deudaTotal = deudaTotal + this.tableDataAutomotores[i].iPunitorio;

        //aca hay que revisar esto, para poder mostrar el total de saldoDeudor en cada tabla
        this.saldoDeudorAutomotores = this.saldoDeudorAutomotores + this.tableDataIIBB[i].saldoDeudor
        console.log("saldoDeudorAutomotores",this.saldoDeudorAutomotores)
      }
      for (var i = 0; i < this.tableDataInmobiliario.length; i++){
        deudaTotal = deudaTotal + this.tableDataInmobiliario[i].iPunitorio;

        //aca hay que revisar esto, para poder mostrar el total de saldoDeudor en cada tabla
        this.saldoDeudorInmobiliario = this.saldoDeudorInmobiliario + this.tableDataIIBB[i].saldoDeudor
        console.log("saldoDeudorInmobiliario",this.saldoDeudorInmobiliario)
      }
      this.sumSaldoDeudorTotal = deudaTotal;
    

    //Intereses Resarcitorios

      var interesesResarcitoriosTotal = 0;
      for (var i = 0; i < this.tableDataIIBB.length; i++){
        interesesResarcitoriosTotal = interesesResarcitoriosTotal + this.tableDataIIBB[i].iResarcitorio;
      }
      for (var i = 0; i < this.tableDataAutomotores.length; i++){
        interesesResarcitoriosTotal = interesesResarcitoriosTotal + this.tableDataAutomotores[i].iResarcitorio;
      }
      for (var i = 0; i < this.tableDataInmobiliario.length; i++){
        interesesResarcitoriosTotal = interesesResarcitoriosTotal + this.tableDataInmobiliario[i].iResarcitorio;
      }
      this.sumaInteresesResarcitoriosTotal = interesesResarcitoriosTotal;


    //Intereses Punitorios
      var sumaInteresesPunitoriosTotal = 0;
      for (var i = 0; i < this.tableDataIIBB.length; i++){
        sumaInteresesPunitoriosTotal = sumaInteresesPunitoriosTotal + this.tableDataIIBB[i].iPunitorio;
      }
      for (var i = 0; i < this.tableDataAutomotores.length; i++){
        sumaInteresesPunitoriosTotal = sumaInteresesPunitoriosTotal + this.tableDataAutomotores[i].iPunitorio;
      }
      for (var i = 0; i < this.tableDataInmobiliario.length; i++){
        sumaInteresesPunitoriosTotal = sumaInteresesPunitoriosTotal + this.tableDataInmobiliario[i].iPunitorio;
      }
      this.sumaInteresesPunitoriosTotal = sumaInteresesPunitoriosTotal.toFixed(2);


      //Capital Vencido
      let fechaActual = moment().format("YYYYMMDD")
      // console.log("fechaActual", fechaActual)
      var capitalVencido = 0;

      for (var i = 0; i < this.tableDataIIBB.length; i++){
        // console.log("asdasdasdasd", moment(this.tableDataIIBB[i].vencimiento).format("YYYYMMDD"))
        if (moment(this.tableDataIIBB[i].vencimiento).format("YYYYMMDD") < fechaActual) {
          // console.log("CAPITAL VENCIDO")
          capitalVencido = capitalVencido + this.tableDataIIBB[i].saldoDeudor;
        }
      }
      for (var i = 0; i < this.tableDataAutomotores.length; i++){
        if (moment(this.tableDataAutomotores[i].vencimiento).format("YYYYMMDD") < fechaActual) {
          capitalVencido = capitalVencido + this.tableDataAutomotores[i].saldoDeudor;
        }
      }
      for (var i = 0; i < this.tableDataInmobiliario.length; i++){
        if (moment(this.tableDataInmobiliario[i].vencimiento).format("YYYYMMDD") < fechaActual) {
          capitalVencido = capitalVencido + this.tableDataInmobiliario[i].saldoDeudor;
        }
      }
      console.log("capital vencido arr", capitalVencido)
      this.capitalVencido = capitalVencido.toFixed(2);



      //Capital No Vencido
      // let fechaActual = moment().format("YYYYMMDD")
      // console.log("fechaActual", fechaActual)
      var capitalNoVencido = 0;

      for (var i = 0; i < this.tableDataIIBB.length; i++){
        // console.log("asdasdasdasd", moment(this.tableDataIIBB[i].vencimiento).format("YYYYMMDD"))
        if (moment(this.tableDataIIBB[i].vencimiento).format("YYYYMMDD") >= fechaActual) {
          // console.log("CAPITAL VENCIDO")
          capitalNoVencido = capitalNoVencido + this.tableDataIIBB[i].saldoDeudor;
        }
      }
      for (var i = 0; i < this.tableDataAutomotores.length; i++){
        if (moment(this.tableDataAutomotores[i].vencimiento).format("YYYYMMDD") >= fechaActual) {
          capitalNoVencido = capitalNoVencido + this.tableDataAutomotores[i].saldoDeudor;
        }
      }
      for (var i = 0; i < this.tableDataInmobiliario.length; i++){
        if (moment(this.tableDataInmobiliario[i].vencimiento).format("YYYYMMDD") >= fechaActual) {
          capitalNoVencido = capitalNoVencido + this.tableDataInmobiliario[i].saldoDeudor;
        }
      }
      console.log("capital no", capitalNoVencido)
      this.capitalNoVencido = capitalNoVencido.toFixed(2);
      

  }
};
</script>
