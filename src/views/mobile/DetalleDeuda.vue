<template>
  <div class="animated fadeIn">
    <b-card class="text-center">
      <b-container style="padding: 0px">
        <b-row align-h="center">
          <b-col sm="12" md="4">
            <b-card no-body class="bg-info">
              <b-card-body class="p-2">
                <div class="text-left">
                  <span class="fs-14b">Inmobiliario</span>
                  <v-divider></v-divider>
                  <h6>
                    Saldo deudor
                    <span class="right">$ 10.178,70</span>
                  </h6>
                  <h6>
                    Saldo a favor:
                    <span class="right">$ 1.612,53</span>
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
                    <span class="right">$ 152,82</span>
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
                <b-link to="operaciones/confirmarPago">
                  <el-button type="primary" size="mini" style="width: 100%">Pagar</el-button>
                </b-link>
                <div class="spacing hidden-md-and-up"></div>
                <b-link to="detalleDeuda/inmobiliario" class="hidden-md-and-up">
                  <el-button type="primary" size="mini" style="width: 100%">Detalle</el-button>
                </b-link>
              </b-card-body>
            </b-card>

            <b-card no-body class="bg-info">
              <b-card-body class="p-2">
                <div class="text-left">
                  <span class="fs-14b">Automotores</span>
                  <v-divider></v-divider>
                  <h6>
                    Saldo deudor
                    <span class="right">$ 10.178,70</span>
                  </h6>
                  <h6>
                    Saldo a favor:
                    <span class="right">$ 1.612,53</span>
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
                    <span class="right">$ 152,82</span>
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
                <b-link to="operaciones/confirmarPago">
                  <el-button type="primary" size="mini" style="width: 100%">Pagar</el-button>
                </b-link>
                <div class="spacing hidden-md-and-up"></div>
                <b-link to="detalleDeuda/automotores" class="hidden-md-and-up">
                  <el-button type="primary" size="mini" style="width: 100%">Detalle</el-button>
                </b-link>
              </b-card-body>
            </b-card>
            <b-card no-body class="bg-info">
              <b-card-body class="p-2">
                <div class="text-left">
                  <span class="fs-14b">Ingresos Brutos</span>
                  <v-divider></v-divider>
                  <h6>
                    Saldo deudor
                    <span class="right">$ 10.178,70</span>
                  </h6>
                  <h6>
                    Saldo a favor:
                    <span class="right">$ 1.612,53</span>
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
                    <span class="right">$ 152,82</span>
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
                <b-link to="operaciones/confirmarPago">
                  <el-button type="primary" size="mini" style="width: 100%">Pagar</el-button>
                </b-link>
                <div class="spacing hidden-md-and-up"></div>
                <b-link to="detalleDeuda/IIBB" class="hidden-md-and-up">
                  <el-button type="primary" size="mini" style="width: 100%">Detalle</el-button>
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
  name: "detalleDeuda",
  components: {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {}
};
</script>
