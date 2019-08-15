<template>
  <div class="animated fadeIn">
    <b-card class="text-center">
      <b-container style="padding: 0px">
       <!-- {{getDeudas}} -->
        {{GetInmobiliario}}
       <p v-for="saldos in getDeudas">
        {{saldos.impuesto}}
       </p>

       <p>INTERESES</p>
       {{getDetalleDePunitorios}}
       <br/>
       {{getDetalleResarcitorios}}
        <b-row align-h="center">
          <b-col sm="12" md="4">
            <b-card no-body class="bg-info">
              <b-card-body class="p-2">
                <div class="text-left">
                  <span class="fs-14b">Deuda Total</span>
                  <span class="right featured-font">$ 385.721,27</span>
                  <v-divider></v-divider>
                  <h6>
                    Capital Vencido:
                    <span class="right">$ 370.837,86</span>
                  </h6>
                  <h6>
                    Capital No Vencido:
                    <span class="right">$ 2.987,24</span>
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
                    <span class="right">$ 11.561,80</span>
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
                    <span class="right">$ 334,37</span>
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

              <b-link to="operaciones/compensar" class="padding-10">
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
              <b-link to="operaciones/reimputar" class="padding-10">
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
                  <span class="right featured-font">$ 0,00</span>

                  <v-divider></v-divider>
                  <h6>
                    Capital Vencido:
                    <span class="right">$ 0,00</span>
                  </h6>

                  <h6>
                    Capital No Vencido:
                    <span class="right">$ 0,00</span>
                  </h6>

                  <h6>
                    Intereses Resarcitorios:
                    <span class="right">$ 0,00</span>
                  </h6>

                  <h6>
                    Intereses Punitorios:
                    <span class="right">$ 0,00</span>
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
                  :data="GetInmobiliario"
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
// import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import { mapState, mapGetters } from "vuex";

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
          prop: "vencimientoPago",
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
          vencimiento: "05/02/2010",
          saldoDeudor: "$ 1.521,36",
          saldoFavor: "-",
          iResarcitorio: "$ 62,25",
          iPunitorio: "$ 123,56",
          estado: "-"
        }
      ],
      tableDataInmobiliario: [
         {
          periodo: "01/2010",
          vencimiento: "05/02/2010",
          saldoDeudor: "9.999,99",
          saldoFavor: "-",
          iResarcitorio: "$ 62,25",
          iPunitorio: "$ 123,56",
          estado: ""
        },
        {
          periodo: "01/2010",
          vencimiento: "05/02/2010",
          saldoDeudor: "$ 1.521,36",
          saldoFavor: "-",
          iResarcitorio: "$ 62,25",
          iPunitorio: "$ 123,56",
          estado: ""
        },
        {
          periodo: "02/2010",
          vencimiento: "06/03/2010",
          saldoDeudor: "$ 1.521,36",
          saldoFavor: "-",
          iResarcitorio: "$ 58,32",
          iPunitorio: "$ 110,56",
          estado: "-"
        },
        {
          periodo: "03/2011",
          vencimiento: "05/04/2010",
          saldoDeudor: "$ 1.612,53",
          saldoFavor: "-",
          iResarcitorio: "$ 32,25",
          iPunitorio: "$ 100,25",
          estado: "-"
        },
        {
          periodo: "04/2011",
          vencimiento: "06/05/2011",
          saldoDeudor: "$ 1.612,53",
          saldoFavor: "-",
          iResarcitorio: "-",
          iPunitorio: "-",
          estado: "-"
        },
        {
          periodo: "03/2015",
          vencimiento: "06/04/2015",
          saldoDeudor: "$ 2.536,21",
          saldoFavor: "-",
          iResarcitorio: "$ 15,82",
          iPunitorio: "-",
          estado: "-"
        },
        {
          periodo: "01/2016",
          vencimiento: "05/02/2016",
          saldoDeudor: "$ 2.987,24",
          saldoFavor: "-",
          iResarcitorio: "$ 12,32",
          iPunitorio: "-",
          estado: "-"
        },
        {
          periodo: "03/2019",
          vencimiento: "06/04/2019",
          saldoDeudor: "$ 2.987,24",
          saldoFavor: "-",
          iResarcitorio: "-",
          iPunitorio: "-",
          estado: "-"
        }
      ],
      tableDataAutomotores: [
        {
          periodo: "01/2010",
          vencimiento: "14/03/2010",
          saldoDeudor: "$ 1.456,00",
          saldoFavor: "-",
          iResarcitorio: "$ 11,32",
          iPunitorio: "-",
          estado: ""
        },
        {
          periodo: "02/2010",
          vencimiento: "15/05/2010",
          saldoDeudor: "-",
          saldoFavor: "$ 1.456,00",
          iResarcitorio: "$ 11,32",
          iPunitorio: "-",
          estado: ""
        },
        {
          periodo: "03/2010",
          vencimiento: "16/08/2010",
          saldoDeudor: "-",
          saldoFavor: "$ 1.456,00",
          iResarcitorio: "$ 10,35",
          iPunitorio: "-",
          estado: ""
        }
      ],
      tableDataIIBB: [
        {
          periodo: "01/2017",
          vencimiento: "10/02/2017",
          saldoDeudor: "$ 75.548,23",
          saldoFavor: "-",
          iResarcitorio: "$ 2.530,36",
          iPunitorio: "$ 123,56",
          estado: "En término"
        },
        {
          periodo: "02/2017",
          vencimiento: "10/03/2017",
          saldoDeudor: "$ 68.256,32",
          saldoFavor: "-",
          iResarcitorio: "$ 2.035,22",
          iPunitorio: "$ 110,56",
          estado: "Fuera de término"
        },
        {
          periodo: "03/2017",
          vencimiento: "12/04/2017",
          saldoDeudor: "$ 52.369,25",
          saldoFavor: "-",
          iResarcitorio: "$ 2.306,25",
          iPunitorio: "-",
          estado: "Falta presentación"
        },
        {
          periodo: "04/2017",
          vencimiento: "12/05/2017",
          saldoDeudor: "-",
          saldoFavor: "$ 8.123,51",
          iResarcitorio: "-",
          iPunitorio: "-",
          estado: "En término"
        },
        {
          periodo: "05/2017",
          vencimiento: "15/06/2017",
          saldoDeudor: "-",
          saldoFavor: "-",
          iResarcitorio: "-",
          iPunitorio: "-",
          estado: "En término"
        },
        {
          periodo: "03/2018",
          vencimiento: "08/04/2018",
          saldoDeudor: "$ 75.325,21",
          saldoFavor: "-",
          iResarcitorio: "$ 1.605,25",
          iPunitorio: "-",
          estado: "En término"
        },
        {
          periodo: "01/2019",
          vencimiento: "11/02/2019",
          saldoDeudor: "$ 89.248,15",
          saldoFavor: "-",
          iResarcitorio: "$ 2.910,23",
          iPunitorio: "-",
          estado: "En término"
        },
        {
          periodo: "02/2019",
          vencimiento: "13/03/2019",
          saldoDeudor: "-",
          saldoFavor: "-",
          iResarcitorio: "-",
          iPunitorio: "-",
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
      totalSaldoDeudorInmobiliario: 0
    };
  },
  methods: {
    filterTag(value, row) {
      return row.estado === value;
    },
  },
  computed: {
    ...mapGetters({
      getDeudas: "obligaciones/getDeudas", 
      GetInmobiliario: "obligaciones/GetInmobiliario",
      getDetalleDePunitorios: "obligaciones/getDetalleDePunitorios", 
      getDetalleResarcitorios: "obligaciones/getDetalleResarcitorios", 
    })
  },
  mounted() {
    this.$store.commit('obligaciones/loadSaldos')
  }
};
</script>
