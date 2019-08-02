<template>
  <div class="animated fadeIn">
    <b-card class="text-center" header="Consultar Obligación por Periodo">
      <b-container style="padding: 0px">
        <b-row align-h="center" style="margin-top: 40px">
          <b-col cols="12">
            <b-card class="text-left">
              <!-- <el-tabs v-model="activeTab" @tab-click="handleClick"> -->
              <el-tabs v-model="activeTab">
                <!-- TAB DETALLE -->
                {{getConsultarImpuestoPeriodo}}
                <el-tab-pane label="Detalle de la Obligación" name="detalleObligacion">
                  <h6>Si desea consultar una obligación en particular, seleccione impuesto y periodo, y pulse el botón Consultar</h6>
                  <v-divider></v-divider>
                  <b-link to="/inicio">
                    <el-button size="mini">
                      <icon class="fas fa-arrow-left padding-icon"></icon>Volver
                    </el-button>
                  </b-link>
                   <v-divider></v-divider>
                  <b-row>
                    <b-col cols="12" sm="12" md="12" lg="4">
                      <b-card class="text-left bg-light" title="Detalle">
                        <b-card-text>
                          <h4 class style="margin: 5px 30px 5px 0px">Impuesto</h4>
                          <el-select
                            v-model="value"
                            placeholder="Seleccionar impuesto"
                            style="margin: 10px 0px;"
                          >
                            <el-option value="Inmobiliario" label="Inmobiliario"></el-option>
                            <el-option value="Automotor" label="Automotor"></el-option>
                            <el-option value="Ingresos Brutos" label="Ingresos Brutos"></el-option>
                          </el-select>

                          <h4 class style="margin: 5px 36px 5px 0px;">Periodo</h4>
                          <el-date-picker
                            v-model="periodo"
                            type="month"
                            placeholder="Periodo"
                            style="margin: 10px 0px;"
                          ></el-date-picker>

                          <b-row>
                            <b-col cols="12">
                              <b-link>
                                <el-button size="mini" class="right w-100" @click="Consultar()">Consultar</el-button>
                              </b-link>
                            </b-col>
                          </b-row>
                          <v-divider></v-divider>
                          <b-badge variant="light">
                            Impuesto determinado:</b-badge>
                            <b-badge variant="dark" class="right fs-12" style="">$ 15.243,65</b-badge>
                            <!-- <b-badge variant="dark" class="right fs-12" style="">$ {{getConsultarImpuestoPeriodo.impuestoDeterminado}}</b-badge> -->
                        
                          <v-divider></v-divider>
                          <b-badge variant="light">
                            Deuda Capital / Interés:</b-badge>
                            <b-badge
                              variant="danger"
                              class="right fs-12"
                              style=""
                            >$ 623,32</b-badge>
                          
                          <v-divider></v-divider>
                          <b-badge variant="light">
                            Vencimiento presentación:</b-badge>
                            <b-badge variant="light"
                              class="right fs-12"
                              v-if="getConsultarImpuestoPeriodo"
                              style=""
                            >{{getConsultarImpuestoPeriodo.vencimientoPago}}</b-badge>
                          <!-- <b-badge variant="light">
                            Vencimiento presentación:</b-badge>
                            <b-badge variant="light"
                              class="right fs-12"
                              style=""
                            >2018/04/18</b-badge> -->
                          
                          <v-divider></v-divider>
                          <b-badge variant="light">
                            Vencimiento pago:</b-badge>
                            <b-badge variant="light"
                              class="right fs-12"
                              v-if="getConsultarImpuestoPeriodo"
                              style=""
                            >{{getConsultarImpuestoPeriodo.vencimientoPresentacion}}</b-badge>
                          <!-- <b-badge variant="light">
                            Vencimiento pago:</b-badge>
                            <b-badge variant="light"
                              class="right fs-12"
                              style=""
                            >getConsultarImpuestoPeriodo</b-badge> -->
                        </b-card-text>
                      </b-card>
                    </b-col>
                    <b-col cols="12" sm="12" md="12" lg="4" class>
                      <b-card class="text-left" title="Declaración Jurada">
                        <b-card-text>
                          <b-row class="pd-5">
                            <b-col cols="5">
                              <h6>Fecha de presentación original:</h6>
                            </b-col>
                            <b-col cols="4">2018/04/13</b-col>
                            <b-col cols="3">
                              <b-badge class="right fs-12">En término</b-badge>
                            </b-col>
                          </b-row>

                          <b-row class="pd-5">
                            <b-col cols="5">
                              <h6>Impuesto determinado</h6>
                            </b-col>
                            <b-col cols="4">$ 15.243,65</b-col>
                            <b-col cols="3">
                              <!-- <b-link
                                to="/cuentaCorriente/consultarObligacion/detalleImpuestoDeterminado"
                              > -->
                              <b-link v-if="getConsultarImpuestoPeriodo" :to="'/cuentaCorriente/consultarObligacion/detalleImpuestoDeterminado/'+ getConsultarImpuestoPeriodo.impuesto + '/' + getConsultarImpuestoPeriodo.periodo">
                               <i class="fas fa-list pl-10 fs-12"></i>
                              </b-link>
                              
                            </b-col>
                          </b-row>

                          <b-row class="pd-5">
                            <b-col cols="5">
                              <h6>Retenciones</h6>
                            </b-col>
                            <!-- <b-col cols="4">$ 13.635,69</b-col> -->
                            <b-col cols="4" >$ <span v-if="getConsultarImpuestoPeriodo">{{getConsultarImpuestoPeriodo.retenciones}}</span></b-col>
                            <b-col cols="3">
                              <b-link v-if="getConsultarImpuestoPeriodo" :to="'/cuentaCorriente/consultarObligacion/detalleRetenciones/'+ getConsultarImpuestoPeriodo.impuesto + '/' + getConsultarImpuestoPeriodo.periodo">
                              <!-- <b-link :to="{name: '/cuentaCorriente/consultarObligacion/detalleRetenciones/', params: { id: 1234 }}"> -->
                                <i class="fas fa-list pl-10 fs-12"></i>
                              </b-link>
                            </b-col>
                          </b-row>

                          <b-row class="pd-5">
                            <b-col cols="5">
                              <h6>Pagos y cancelaciones</h6>
                            </b-col>
                            <b-col cols="4">$ 1.000</b-col>
                            <b-col cols="3">
                              <b-link
                                to="/cuentaCorriente/consultarObligacion/detallePagosCancelaciones"
                              >
                               <i class="fas fa-list pl-10 fs-12"></i>
                              </b-link>
                            </b-col>
                          </b-row>

                          <b-row class="pd-5">
                            <b-col cols="5">
                              <h6>Otros créditos y débitos</h6>
                            </b-col>
                            <b-col cols="4">$ -</b-col>
                            <b-col cols="3">
                              <b-link>
                                <i class="fas fa-list pl-10 fs-12"></i>
                              </b-link>
                            </b-col>
                          </b-row>

                          <v-divider></v-divider>
                          <b-row class="pd-5">
                            <b-col cols="5">
                              <h6>Saldo de la Declaración Jurada</h6>
                            </b-col>
                            <b-col cols="4">
                              <span class="monto-negativo">$ 607,96</span>
                            </b-col>
                            <b-col cols="3"></b-col>
                          </b-row>

                          <b-row class="pd-5">
                            <b-col cols="5">
                              <h6>
                                Saldo de libre disponibilidad
                                <el-tooltip content placement="top" effect="light">
                                  <i class="fas fa-info-circle pl-10 fs-12"></i>
                                  <div slot="content">
                                    Es el saldo a favor que se obtiene luego de realizar
                                    <br>todas las operaciones correspondientes del periodo.
                                    <br>El mismo podrá ser utilizado para solicitar la devolución del
                                    <br>efectivo y/o compensar/reimputar otras obligaciones.
                                  </div>
                                </el-tooltip>
                              </h6>
                            </b-col>
                            <b-col cols="4">
                              <span>$ -</span>
                            </b-col>
                            <b-col cols="3">
                              <b-link to="/cuentaCorriente/consultarObligacion/detalleSLD">
                               <i class="fas fa-list pl-10 fs-12"></i>
                              </b-link>
                            </b-col>
                          </b-row>

                          <b-row class="pd-5">
                            <b-col cols="5">
                              <h6>
                                Saldo de disponibilidad restringida
                                <el-tooltip content placement="top" effect="light">
                                  <i class="fas fa-info-circle pl-10 fs-12"></i>
                                  <div slot="content">
                                    Es el saldo a favor que se obtiene luego de realizar
                                    <br>todas las operaciones correspondientes del periodo.
                                    <br>El mismo podrá ser utilizado para compensar/reimputar
                                    <br>otras obligaciones.
                                  </div>
                                </el-tooltip>
                              </h6>
                            </b-col>
                            <b-col cols="4">
                              <span>$ -</span>
                            </b-col>
                            <b-col cols="3">
                              <b-link>
                                <i class="fas fa-list pl-10 fs-12"></i>
                              </b-link>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card>
                    </b-col>
                    <b-col cols="12" sm="12" md="12" lg="4" class>
                      <b-card class="text-left" title="Accesorios">
                        <b-card-text>
                          <b-row class="pd-5">
                            <b-col cols="6">
                              <h6>
                                Intereses resarcitorios
                                <el-tooltip content placement="top" effect="light">
                                  <div slot="content">
                                    Los intereses resarcitorios se calculan a partir
                                    <br>de la fecha de vencimiento hasta la fecha actual o
                                    <br>hasta la fecha demanda, en el caso de que existiera.
                                  </div>
                                  <i class="fas fa-info-circle pl-10 fs-12"></i>
                                </el-tooltip>
                              </h6>
                            </b-col>
                            <b-col cols="4">$ 15,36</b-col>
                            <b-col cols="2">
                              <!-- <b-link to="/cuentaCorriente/consultarObligacion/detalleIntereses"> -->
                               <b-link v-if="getConsultarImpuestoPeriodo" :to="'/cuentaCorriente/consultarObligacion/detalleIntereses/'+ getConsultarImpuestoPeriodo.impuesto + '/' + getConsultarImpuestoPeriodo.periodo">
                              
                                <i class="fas fa-list pl-10 fs-12"></i>
                              </b-link>
                            </b-col>
                          </b-row>

                          <b-row class="pd-5">
                            <b-col cols="6">
                              <h6>
                                Intereses punitorios
                                <el-tooltip content placement="bottom" effect="light">
                                  <div slot="content">
                                    Los intereses punitorios se calculan a partir
                                    <br>de la fecha de la demanda hasta la fecha actual.
                                  </div>
                                  <i class="fas fa-info-circle pl-10 fs-12"></i>
                                </el-tooltip>
                              </h6>
                            </b-col>
                            <b-col cols="4">$ -</b-col>
                            <b-col cols="2"></b-col>
                          </b-row>

                          <v-divider></v-divider>
                          <b-row class="pd-5">
                            <b-col cols="6">
                              <h6>Multa art. X</h6>
                            </b-col>
                            <b-col cols="4">$ -</b-col>
                            <b-col cols="2">
                              <b-link>
                                <b-badge variant="light" class="right fs-12">Comprobante</b-badge>
                              </b-link>
                            </b-col>
                          </b-row>

                          <b-row class="pd-5">
                            <b-col cols="6">
                              <h6>Multas formales Art. Y</h6>
                            </b-col>
                            <b-col cols="4">$ -</b-col>
                            <b-col cols="2"></b-col>
                          </b-row>

                          <b-row class="pd-5">
                            <b-col cols="6">
                              <h6>Multas materiales Art. Z</h6>
                            </b-col>
                            <b-col cols="4">$ -</b-col>
                            <b-col cols="2"></b-col>
                          </b-row>
                        </b-card-text>
                      </b-card>
                    </b-col>
                  </b-row>
                </el-tab-pane>
                <!-- TAB CRONOLOGIA -->
                <el-tab-pane label="Cronología" name="cronologia">
                  <h6>Aquí se muestra una lista ordenada cronologicamente de los comprobantes generados para el impuesto y periodo determinado.</h6>
                  <v-divider></v-divider>
                  <b-link to="/inicio">
                    <el-button size="mini">
                      <icon class="fas fa-arrow-left padding-icon"></icon>Volver
                    </el-button>
                  </b-link>
                  <b-row>
                    <b-col cols="12" sm="12" lg="6">
                      <el-timeline style="margin-top: 25px;">
                        <el-timeline-item timestamp="2018/5/19" placement="top" color="green">
                          <el-card>
                            <h2>Pago</h2>
                            <h6>Importe: $ 1.536,51</h6>
                            <h6></h6>
                            <h6></h6>
                          </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/05/21" placement="top" color="#22b99d">
                          <el-card>
                            <h2>Reimputación</h2>
                            <h6>Importe: $ 1.5221,36</h6>
                            <h6>Origen: Inmobiliario, Capital, 01/2010</h6>
                            <h6>Destino: Inmobiliario, Capital, 05/2010</h6>
                          </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/05/22" placement="top" color="#b0cdba">
                          <el-card>
                            <h2>Compensación</h2>
                            <h6>Importe: $ 1.5221,36</h6>
                            <h6>Origen: Inmobiliario, Capital, 01/2010</h6>
                            <h6>Destino: Inmobiliario, Capital, 05/2010</h6>
                          </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/05/23" placement="top" color="#20a8d8">
                          <el-card>
                            <h2>Presentación de la Declaración Jurada</h2>
                            <h6>Importe: $ 1.5221,36</h6>
                            <h6></h6>
                            <h6></h6>
                          </el-card>
                        </el-timeline-item>
                      </el-timeline>
                      <v-divider></v-divider>
                    </b-col>
                  </b-row>
                </el-tab-pane>
              </el-tabs>
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
import { mapState, mapGetters } from "vuex";
export default {
  name: "consultarObligacionPorPeriodo",
  data() {
    return {
      pagination: {
        pageSize: 5,
        layout: "total, sizes, prev, pager, next",
        pageSizes: [2, 5, 10],
        onSizeChange: this.onPageSizeChange,
        onCurrentChange: this.onPageCurrentChange
      },
      // ImpuestoSelected: "inmobiliario",

      selected: [],

      active: 0, // step
      activeTab: "detalleObligacion",
      monto: 0,
      value: "Inmobiliario",
      periodo: "2019-02",
      // getConsultarImpuestoPeriodo: {
      //   vencimientoPago: "",
      //   vencimientoPresentacion: ""
      // }
    };
  },
  methods: {
    Consultar(){
      // console.log("Impuesto", this.value)
      // console.log("Periodo", this.periodo)

      this.$store.commit('obligaciones/loadFiltroPorImpuestoPeriodo', {impuesto: this.value, periodo: this.periodo})

    },
    filterTag(value, row) {
      return row.tag === value;
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    setCurrentObligacion() {
      this.$refs.tableObligaciones.setCurrentRow(row);
    },
    setCurrentDeuda() {
      this.$refs.tableDeudas.setCurrentRow(row);
    }
  },
  computed: {
    ...mapGetters({
      getConsultarImpuestoPeriodo: "obligaciones/getConsultarImpuestoPeriodo", 
      })
  },
  mounted() {
    this.$store.commit('registraciones/loadItems')
    this.$store.commit('obligaciones/loadItems')
    this.$store.commit('retenciones/loadItems')
  }
};
</script>
