<template>
  <div class="animated fadeIn">
    <b-card class="text-center" header="Deuda Automotores">
      <b-container style="padding: 0px">
        <b-row align-h="center">
          <b-col sm="12" md="4">
            <b-card no-body class="bg-info" v-for="item in items" :key="item.periodo">
              <b-card-body class="p-2">
                <div class="text-left">
                  <h5>
                    Periodo
                    <span class="right">{{ item.periodo }}</span>
                  </h5>
                  <h5>
                    Vencimiento
                    <span class="right">{{ item.vencimiento }}</span>
                  </h5>
                  <v-divider></v-divider>
                  <h2>
                    TOTAL
                    <span class="right">$1.270,00</span>
                  </h2>
                  
                  <v-divider></v-divider>
                  <table style="width: 100%">
                   <tr>
                     <th class="text-left">Capital</th>
                     <th class="text-center">Resarcitorios</th>
                     <th class="text-right">Punitorios</th>
                   </tr>
                   <tr>
                     <td class="text-left">{{ item.capital | currency}}</td>
                     <td class="text-center">{{ item.iResarcitorio | currency}}</td>
                     <td class="text-right">{{ item.iPunitorio | currency }}</td>
                   </tr>
                  </table>
                </div>
                <v-divider></v-divider>
                  <b-link to="/operaciones/confirmarPago">
              <el-button type="primary" size="mini" style="width: 100%">Pagar</el-button>
            </b-link>
              </b-card-body>
            </b-card>
            
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>


<script>
import store from "@/store/index";

export default {
  name: "deudaAutomotores",
  components: {},
  data() {
    return {
      items: [
        {
          periodo: "2010-02",
          vencimiento: "2010-02-05",
          capital: 1000.00,
          iResarcitorio: 152.00,
          iPunitorio: 120.20
        },
        {
          periodo: "2010-03",
          vencimiento: "2010-03-05",
          capital: 1000.00,
          iResarcitorio: 152.00,
          iPunitorio: 120.20
        }
      ]
    };
  },
  methods: {},
  computed: {},
  mounted() {}
};
</script>
