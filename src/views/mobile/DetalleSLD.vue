<template>
    <div class="b-tableMobile">
        <b-table stacked :items="items" >
            <template slot-scope slot="Comprobante">
                    <b-link class="obligacion-icon" to="/comprobantes/ticket">
                      <i class="far fa-file-alt size-3x"></i>
                    </b-link>
            </template>
        </b-table>
    </div>
  <!-- <div class="animated fadeIn">
    <b-card class="text-center" header="Saldos de libre disponibilidad">
      <b-container style="padding: 0px">
        <b-row align-h="center">
          <b-col sm="12" md="4">
            <b-card no-body class="bg-info">
              <b-card-body class="p-2">
                <div class="text-left">
                  <span class="fs-14b">Inmobiliario</span>
                  <v-divider></v-divider>
                 <h6>
                    Periodo:
                    <span class="right">2011/04</span>
                  </h6>
                  <h6>
                    Saldo a favor:
                    <span class="right">$ 1.612,53</span>
                  </h6>
                  <v-divider></v-divider>
                </div>
               <b-link to="operaciones/">
                  <el-button type="primary" size="mini" style="width: 100%">Compensar</el-button>
                </b-link>
                <div class="spacing"></div>
                <b-link to="operaciones/">
                  <el-button type="primary" size="mini" style="width: 100%">Reimputar</el-button>
                </b-link>
              </b-card-body>
            </b-card>

            <b-card no-body class="bg-info">
              <b-card-body class="p-2">
                <div class="text-left">
                  <span class="fs-14b">Automotores</span>
                  <v-divider></v-divider>
                  <h6>
                    Periodo:
                    <span class="right">2011/04</span>
                  </h6>
                  <h6>
                    Saldo a favor:
                    <span class="right">$ 1.612,53</span>
                  </h6>
                
                  <v-divider></v-divider>
                </div>
                <b-link to="operaciones/">
                  <el-button type="primary" size="mini" style="width: 100%">Compensar</el-button>
                </b-link>
                <div class="spacing"></div>
                <b-link to="operaciones/">
                  <el-button type="primary" size="mini" style="width: 100%">Reimputar</el-button>
                </b-link>
              </b-card-body>
            </b-card>
            <b-card no-body class="bg-info">
              <b-card-body class="p-2">
                <div class="text-left">
                  <span class="fs-14b">Ingresos Brutos</span>
                  <v-divider></v-divider>
                 <h6>
                    Periodo:
                    <span class="right">2011/04</span>
                  </h6>
                  <h6>
                    Saldo a favor:
                    <span class="right">$ 1.612,53</span>
                  </h6>
                  <v-divider></v-divider>
                </div>
                <b-link to="operaciones/">
                  <el-button type="primary" size="mini" style="width: 100%">Compensar</el-button>
                </b-link>
                <div class="spacing"></div>
                <b-link to="operaciones/">
                  <el-button type="primary" size="mini" style="width: 100%">Reimputar</el-button>
                </b-link>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div> -->
</template>


<script>
import store from "@/store/index";

export default {
  name: "detalle-sld-mobile",
  components: {},
      data() {
      return {
        items: [
            { transacción: 12145247, Fecha: "2018/05/20", Formulario: 452, descripción: "Ajuste", Importe: 1700, Saldo: 35.12, Comprobante: "ruta"   },
            { transacción: 12145246, Fecha: "2018/05/15", Formulario: 952, descripción: "Anulación de compensación", Importe: 1500, Saldo: 1735.12, Comprobante: "ruta"   },
        ]
      }
    },
  methods: {},
  computed: {},
  mounted() {}
};
</script>


