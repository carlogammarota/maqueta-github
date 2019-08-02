<template>
  <div class="animated fadeIn">
    <b-row align-h="center" style="margin-top: 40px">
      <b-col sm="12" md="4">
        <b-card class="text-center" header="Ticket">
          <img src="../../public/img/brand/logo-sidebar.jpg" width="175" class="logo-login-left">
          <h2 style="text-align: center">AGIP - DGR</h2>
          <h6 class>Subdirección General de Sistematización de la Recaudación</h6>
          <v-divider></v-divider>
          <h2>Reimputación de pago</h2>
          <v-divider></v-divider>
          <b-row class="text-left">
            <b-col>
              <h3>Fecha</h3>
            </b-col>
            <b-col>
              <h3>Hora</h3>
            </b-col>
            <b-col>
              <h3>Transacción</h3>
            </b-col>
          </b-row>
          <b-row class="text-left">
            <b-col>
              <h6>2019/04/10</h6>
            </b-col>
            <b-col>
              <h6>12:10:22</h6>
            </b-col>
            <b-col>
              <h6>123143545</h6>
            </b-col>
          </b-row>
          <v-divider></v-divider>
          <h3 class="text-left mb-20">Saldo a favor utilizado</h3>
          <b-row class="text-left">
            <b-col>
              <h5>Impuesto</h5>
            </b-col>
            <b-col>
              <h5>Ingresos Brutos</h5>
            </b-col>
            <b-col></b-col>
          </b-row>
          <b-row class="text-left">
            <b-col>
              <h5>Concepto</h5>
            </b-col>
            <b-col>
              <h5>Declaración Jurada</h5>
            </b-col>
            <b-col></b-col>
          </b-row>
          <b-row class="text-left">
            <b-col>
              <h5>Periodo</h5>
            </b-col>
            <b-col>
              <h5>2019/04</h5>
            </b-col>
            <b-col></b-col>
          </b-row>
          <v-divider></v-divider>
          <h3 class="text-left mb-20">Obligación cancelada</h3>
          <b-row class="text-left">
            <b-col>
              <h5>Impuesto</h5>
            </b-col>
            <b-col>
              <h5>Ingresos Brutos</h5>
            </b-col>
            <b-col></b-col>
          </b-row>
          <b-row class="text-left">
            <b-col>
              <h5>Concepto</h5>
            </b-col>
            <b-col>
              <h5>Declaración Jurada</h5>
            </b-col>
            <b-col></b-col>
          </b-row>
          <b-row class="text-left">
            <b-col>
              <h5>Periodo</h5>
            </b-col>
            <b-col>
              <h5>2019/05</h5>
            </b-col>
            <b-col></b-col>
          </b-row>
          <v-divider></v-divider>
          <b-row class="text-left">
            <b-col>
              <h2>Importe</h2>
            </b-col>
            <b-col></b-col>
            <b-col>
              <h2>$ 1.526,36</h2>
            </b-col>
          </b-row>

          <v-divider></v-divider>
          <h6>Este comprobante es constancia de pago.</h6>
          <el-button class="mt-20" type="primary" size="mini">Descargar</el-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import store from "@/store/index";

export default {
  name: "ticketRP",
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {}
};
</script>
