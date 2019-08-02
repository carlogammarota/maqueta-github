<template>
  <b-card class="text-center" header="Compensar saldo">
    <b-container style="padding: 0px">
      <b-row align-h="center">
        <b-col sm="12" md="4">
          <b-card no-body class="bg-green">
            <b-card-body class="p-2">
              <div class="text-left">
                <span class="fs-14b">Origen</span>
                <v-divider></v-divider>
                <h6>
                  Impuesto
                  <span class="right">-</span>
                </h6>
                <h6>
                  Concepto:
                  <span class="right">-</span>
                </h6>
                <h6>
                  Periodo
                  <span class="right">-</span>
                </h6>
              </div>
            </b-card-body>
            <el-collapse v-model="origen">
              <el-collapse-item title="Seleccionar Origen" name="origen">
                 <v-divider></v-divider>
                <h3 class="bg-featured">Inmobiliario</h3>
                <el-table :data="saldoInmobiliario">
                  <el-table-column type="selection" width="30px"></el-table-column>
                  <el-table-column label="Concepto" prop="concepto"></el-table-column>
                  <el-table-column label="Periodo" prop="periodo" width="50px"></el-table-column>
                  <el-table-column label="Saldo a favor" prop="saldoFavor"></el-table-column>
                </el-table>
                <v-divider></v-divider>
                <h3 class="bg-featured">Automotores</h3>
                 <el-table :data="saldoAutomotores">
                  <el-table-column type="selection" width="30px"></el-table-column>
                  <el-table-column label="Concepto" prop="concepto"></el-table-column>
                  <el-table-column label="Periodo" prop="periodo" width="50px"></el-table-column>
                  <el-table-column label="Saldo a favor" prop="saldoFavor"></el-table-column>
                </el-table>
                 <v-divider></v-divider>
                <h3 class="bg-featured">Ingresos Brutos</h3>
                 <el-table :data="saldoIIBB">
                  <el-table-column type="selection" width="30px"></el-table-column>
                  <el-table-column label="Concepto" prop="concepto"></el-table-column>
                  <el-table-column label="Periodo" prop="periodo" width="50px"></el-table-column>
                  <el-table-column label="Saldo a favor" prop="saldoFavor"></el-table-column>
                </el-table>
              </el-collapse-item>
            </el-collapse>
          </b-card>

          <b-card no-body class="bg-green">
            <b-card-body class="p-2">
              <div class="text-left">
                <span class="fs-14b">Destino</span>
                <v-divider></v-divider>
                <h6>
                  Impuesto
                  <span class="right">-</span>
                </h6>
                <h6>
                  Concepto:
                  <span class="right">-</span>
                </h6>
                <h6>
                  Periodo
                  <span class="right">-</span>
                </h6>

                <v-divider></v-divider>
              </div>
            </b-card-body>
            <el-collapse v-model="destino" style="padding: 0px">
              <el-collapse-item title="Seleccionar Destino" name="origen">
                 <v-divider></v-divider>
                <h3 class="bg-featured">Inmobiliario</h3>
                <el-table :data="obligacionInmobiliario" style="width: 100%">
                  <el-table-column type="selection"></el-table-column>
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <v-divider></v-divider>
                      <h6 class="text-left">Capital: {{ props.row.capital | currency }}</h6>
                      <h6 class="text-left">Intereses resarcitorios: {{ props.row.iResarcitorio | currency }}</h6>
                      <h6 class="text-left">Intereses punitorios: {{ props.row.iPunitorio | currency }}</h6>
                      <v-divider></v-divider>
                    </template>
                  </el-table-column>
                  <el-table-column label="Total" prop="total"></el-table-column>
                  <el-table-column label="Periodo" prop="periodo"></el-table-column>
                </el-table>
                 <v-divider></v-divider>
                <h3 class="bg-featured">Automotores</h3>
                <el-table :data="obligacionAutomotores" style="width: 100%">
                  <el-table-column type="selection"></el-table-column>
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <v-divider></v-divider>
                      <h6 class="text-left">Capital: {{ props.row.capital | currency }}</h6>
                      <h6 class="text-left">Intereses resarcitorios: {{ props.row.iResarcitorio | currency }}</h6>
                      <h6 class="text-left">Intereses punitorios: {{ props.row.iPunitorio | currency }}</h6>
                      <v-divider></v-divider>
                    </template>
                  </el-table-column>
                  <el-table-column label="Total" prop="total"></el-table-column>
                  <el-table-column label="Periodo" prop="periodo"></el-table-column>
                </el-table>
                 <v-divider></v-divider>
                <h3 class="bg-featured">Ingresos Brutos</h3>
                <el-table :data="obligacionInmobiliario" style="width: 100%">
                  <el-table-column type="selection"></el-table-column>
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <v-divider></v-divider>
                      <h6 class="text-left">Capital: {{ props.row.capital | currency }}</h6>
                      <h6 class="text-left">Intereses resarcitorios: {{ props.row.iResarcitorio | currency }}</h6>
                      <h6 class="text-left">Intereses punitorios: {{ props.row.iPunitorio | currency }}</h6>
                      <v-divider></v-divider>
                    </template>
                  </el-table-column>
                  <el-table-column label="Total" prop="total"><template slot-scope="props">{{ props.row.total | currency }}</template></el-table-column>
                  <el-table-column label="Periodo" prop="periodo"><template slot-scope="props">{{ props.row.periodo }}</template></el-table-column>
                </el-table>
              </el-collapse-item>
            </el-collapse>
          </b-card>
          <el-button class="mt-20" type="primary" size="mini" style="width: 100%">Compensar ahora</el-button>
        </b-col>
      </b-row>
    </b-container>
  </b-card>
</template>


<script>
import store from "@/store/index";

export default {
  name: "compensar-saldo-mobile",
  components: {},
  data() {
    return {
      saldoInmobiliario: [
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
          impuesto: "Inmobiliario",
          concepto: "Capital",
          periodo: "2017/01",
          saldoFavor: 1612.36
        }
      ],
      saldoAutomotores: [
        {
          impuesto: "Automotores",
          concepto: "Capital",
          periodo: "2010/01",
          saldoFavor: 1521.36
        },
        {
          impuesto: "Automotores",
          concepto: "Capital",
          periodo: "2011/03",
          saldoFavor: 1521.36
        },
        {
          impuesto: "Automotores",
          concepto: "Capital",
          periodo: "2017/01",
          saldoFavor: 1612.36
        }
      ],
      saldoIIBB: [
        {
          impuesto: "Ingresos Brutos",
          concepto: "Capital",
          periodo: "2010/01",
          saldoFavor: 1521.36
        },
        {
          impuesto: "Ingresos Brutos",
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
       obligacionInmobiliario: [
        {
          impuesto: 'Inmobiliario',
          concepto: 'Capital',
          periodo: '2016/04',
          capital: 1000.00,
          iResarcitorio: 126.50,
          iPunitorio: 24.50,
          total: 1500.00
        },
        {
          impuesto: 'Inmobiliario',
          concepto: 'Capital',
          periodo: '2016/05',
          capital: 2000.00,
          iResarcitorio: 126.50,
          iPunitorio: 24.50,
          total: 2500.00
        }
      ],
      obligacionAutomotores: [
        {
          impuesto: 'Automotores',
          concepto: 'Capital',
          periodo: '2016/04',
          capital: 1000.00,
          iResarcitorio: 126.50,
          iPunitorio: 24.50,
          total: 1500.00
        },
        {
          impuesto: 'Automotores',
          concepto: 'Capital',
          periodo: '2016/05',
          capital: 2000.00,
          iResarcitorio: 126.50,
          iPunitorio: 24.50,
          total: 2500.00
        }
      ],
      obligacionIIBB: [
        {
          impuesto: 'Ingresos Brutos',
          concepto: 'Capital',
          periodo: '2016/04',
          capital: 1000.00,
          iResarcitorio: 126.50,
          iPunitorio: 24.50,
          total: 1500.00
        },
        {
          impuesto: 'Ingresos Brutos',
          concepto: 'Capital',
          periodo: '2016/05',
          capital: 2000.00,
          iResarcitorio: 126.50,
          iPunitorio: 24.50,
          total: 2500.00
        }
      ],
      origen: "",
      destino: ""
    };
  },
  methods: {},
  computed: {},
  mounted() {}
};
</script>
