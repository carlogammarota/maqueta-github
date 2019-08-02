<template>
  <!-- Versión mobile-->
  <b-card class="text-center" header="Confirmación de la deuda a cancelar">
    <b-container style="padding: 0px">
      <b-row style="margin-top: 40px" class="text-left">
        <b-col>
          <h2 class="bg-featured text-center">
            Total:
            <span class="rigth">$ 4.042,72</span>
          </h2>
          <v-divider></v-divider>
        </b-col>
      </b-row>
      <b-row class="text-left">
        <b-col>
          <h6 class>
            Fecha de pago:
            <span class="rigth">20/10/2019</span>
          </h6>
        </b-col>
        <b-col>
          <b-link class @click="modal = true">
            <el-button size="mini" class>
              <i class="fas fa-search-dollar padding-icon"></i>Recalcular intereses
            </el-button>
          </b-link>
        </b-col>
      </b-row>
      <b-row class="text-left">
        <b-col>
          <v-divider></v-divider>
          <b-link to="/comprobantes/ticket">
            <el-button type="primary" size="mini" class="w-100">
              Pagar ahora
            </el-button>
          </b-link>
          <v-divider></v-divider>
          <b-card no-body class="bg-info" v-for="item in items" :key="item.periodo">
            <b-card-body class="p-2">
              <h2>Inmobiliario</h2>
              <v-divider></v-divider>
              <div class="text-left">
                <h6>
                  Periodo
                  <span class="right">{{ item.periodo }}</span>
                </h6>
                <h6>
                  Vencimiento
                  <span class="right">{{ item.vencimiento }}</span>
                </h6>
                <h6>
                  Fecha de la demanda
                  <span class="right">{{ item.fechaDemanda }}</span>
                </h6>
                <v-divider></v-divider>
                <h2>
                  TOTAL
                  <span class="right">$1.270,00</span>
                </h2>

                <v-divider></v-divider>
                 <h6>
                   Capital
                  <span class="right">{{ item.capital }}</span>
                </h6>
                 <h6>
                   Intereses resarcitorios
                  <span class="right">{{ item.iResarcitorio }}</span>
                </h6>
                 <h6>
                   Intereses punitorios
                  <span class="right">{{ item.iPunitorio }}</span>
                </h6>
              </div>
              <v-divider></v-divider>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <v-divider></v-divider>
        </b-col>
      </b-row>
      <b-row class="text-left">
        <b-col cols="12">
          <h2 class="text-right bg-featured">Total: $ 4.042,72</h2>
        </b-col>
        <b-col cols="12">
          <b-link to="/comprobantes/ticket">
            <el-button class="mt-20 w-100" type="primary" size="mini">Pagar Ahora</el-button>
          </b-link>
        </b-col>
        <!-- popup -->
        <el-dialog title="Recalcular intereses" :visible.sync="modal" width="300px">
          <h6>Ingrese una nueva fecha.</h6>
          <h6></h6>
          <v-divider></v-divider>
          <b-row>
            <b-col>
              <el-date-picker v-model="fecha" type="date" placeholder="Fecha" style="width: 150px"></el-date-picker>
            </b-col>
            <b-col>
               <v-divider></v-divider>
              <b-badge variant="">Interés calculado:</b-badge>
              <b-badge class="right">$0,00.-</b-badge>
            </b-col>
          </b-row>

          <v-divider></v-divider>
          <el-button size="mini" type="primary" @click="modal = false">
            <i class="fas fa-search-dollar padding-icon"></i>Confirmar
          </el-button>
          <el-button size="mini" @click="modal = false">Cancelar</el-button>
        </el-dialog>
      </b-row>
    </b-container>
  </b-card>
</template>



<script>
import store from "@/store/index";

export default {
  name: "confirmar-pago-mobile",
  data() {
    return {
      pagination: {
        pageSize: 3,
        layout: "total, sizes, prev, pager, next",
        pageSizes: [3, 5, 10],
        onSizeChange: this.onPageSizeChange,
        onCurrentChange: this.onPageCurrentChange
      },
      items: [
        {
          impuesto: "Inmobiliario",
          periodo: "01/2010",
          vencimiento: "",
          fechaDemanda: "",
          cantidadDias: "",
          importe: 1521.36,
          capital: 1000,
          iResarcitorio: 21.36,
          iPunitorio: 500
        },
        {
          impuesto: "Ingresos Brutos",
          periodo: "02/2010",
          vencimiento: "",
          fechaDemanda: "",
          cantidadDias: "",
          importe: 2521.36,
          capital: 2000,
          iResarcitorio: 21.36,
          iPunitorio: 500
        }
      ],
      modal: false,
      fecha: ""
    };
  },
  methods: {
    groupRows({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  },
  computed: {},
  mounted() {}
};
</script>
