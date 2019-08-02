<template>
  <div class="animated fadeIn">
    <b-card class="text-center" header="Consultar Cuentas">
      <b-container style="padding: 0px">
        <b-row align-h="left" style="margin-top: 40px">
          <b-col sm="12" md="6">
            <b-card class="text-left bg-light" title="Estado de la cuenta">
              <b-card-text>
                <b-row>
                  <b-col cols="6">
                    <h3 class style="margin: 5px 10px 5px 0px">Impuesto</h3>
                    <select-impuesto style="margin: 10px 0px; width: 100%;" v-on:Impuesto="selectImpuesto($event)"></select-impuesto>
                  </b-col>
                  <b-col cols="6">
                    <h3 class style="margin: 5px 20px 5px 0px">Periodo</h3>
                    <el-date-picker
                      @change="selectPeriodo()"
                      v-model="periodo"
                      type="month"
                      placeholder="Periodo"
                      style="margin: 10px 0px; width: 100%;"
                    ></el-date-picker>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col cols="12">
                    <b-link>
                      <el-button @click="Consultar()" size="mini" class="w-100">Consultar</el-button>
                    </b-link>
                  </b-col>
                </b-row>
                <v-divider></v-divider>
                <b-row class="pd-5">
                  <b-col cols="6">
                    <h3>Cuenta</h3>
                  </b-col>
                  <b-col cols="3">
                    <h3>Saldo</h3>
                  </b-col>
                  <b-col cols="3">
                    <h3>Movimientos</h3>
                  </b-col>
                </b-row>
                <b-row class="pd-5">
                  <b-col cols="6">
                    <h6>Impuesto determinado</h6>
                  </b-col>
                  <b-col cols="3">$ 0</b-col>
                  <b-col cols="3">
                    <b-link v-if="ImpuestoPeriodo" :to="'consultarCuentas/movimientos/'+ ImpuestoPeriodo.impuesto + '/' + ImpuestoPeriodo.periodo + '/' + 'impuestoDeterminado'">
                               
                    <!-- <b-link to="consultarCuentas/movimientos"> -->
                      <icon class="fas fa-exchange-alt" style="margin: 0px;"></icon>
                    </b-link>
                  </b-col>
                </b-row>
                <b-row class="pd-5">
                  <b-col cols="6">
                    <h6>Intereses resarcitorios</h6>
                  </b-col>
                  <b-col cols="3">$ 152</b-col>
                  <b-col cols="3">
                    <b-link v-if="ImpuestoPeriodo" :to="'consultarCuentas/movimientos/'+ ImpuestoPeriodo.impuesto + '/' + ImpuestoPeriodo.periodo + '/' + 'interesesResarcitorios'">
                      <icon class="fas fa-exchange-alt" style="margin: 0px;"></icon>
                    </b-link>
                  </b-col>
                </b-row>
                <b-row class="pd-5">
                  <b-col cols="6">
                    <h6>Intereses punitorios</h6>
                  </b-col>
                  <b-col cols="3">$ 0</b-col>
                  <b-col cols="3">
                    <b-link v-if="ImpuestoPeriodo" :to="'consultarCuentas/movimientos/'+ ImpuestoPeriodo.impuesto + '/' + ImpuestoPeriodo.periodo + '/' + 'interesesPunitorios'">
                      <icon class="fas fa-exchange-alt" style="margin: 0px;"></icon>
                    </b-link>
                  </b-col>
                </b-row>
                <v-divider></v-divider>
                <b-row class="pd-5">
                  <b-col cols="6">
                    <h6>Multa X</h6>
                  </b-col>
                  <b-col cols="3">$ 125</b-col>
                  <b-col cols="3">
                    <b-link v-if="ImpuestoPeriodo" :to="'consultarCuentas/movimientos/'+ ImpuestoPeriodo.impuesto + '/' + ImpuestoPeriodo.periodo">
                      <icon class="fas fa-exchange-alt" style="margin: 0px;"></icon>
                    </b-link>
                  </b-col>
                </b-row>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import store from "@/store/index";
import SelectImpuesto from "@/views/components/SelectImpuesto";
import moment from 'moment'
//al apretar en Movimientos (icon) le enviamos los datos mediante props $Router al componente MovimientosDeCuenta.vue
//el cual nos traera los datos de /comprobantes y /registracion
 

export default {
  name: "consultarCuentas",
  components: {
    SelectImpuesto
  },
  data() {
    return {
      value: "inmobiliario",
      periodo: "Fri Mar 01 2019 00:00:00 GMT-0300 (Argentina Standard Time)",
      impuesto: "",
      ImpuestoPeriodo: {
        impuesto: "",
        periodo: ""
      }
    };
  },
  methods: {
    selectImpuesto(impuesto){
      this.ImpuestoPeriodo.impuesto = impuesto
    },
    selectPeriodo(periodo){
      this.ImpuestoPeriodo.periodo = periodo
    },
    Consultar(){
      this.ImpuestoPeriodo.periodo = moment(this.periodo, "DDMMYYYY").format("YYYYMM")
      console.log("selectImpuesto", this.ImpuestoPeriodo)
    }
  },
  computed: {},
  mounted() {
    this.$store.commit('comprobantes/loadItems')
    
  }
};
</script>
