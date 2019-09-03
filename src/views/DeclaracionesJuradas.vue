<template>
  <div class="animated fadeIn">
    <b-card class="text-center" header="Declaraciones Juradas">
      <b-container style="padding: 0px">
        <b-row align-h="center" style="margin-top: 40px">
          <b-col sm="12" md="12">
            <!-- {{getDeclaracionesJuradas}} -->


            <!-- <button @click="handleClick">BOTON TEST</button> -->
            <el-tabs v-model="activeTab" @tab-click="handleClick">
              <!-- TAB DECLARACIONES -->
              <el-tab-pane label="Declaraciones Juradas" name="ddjj">
                <!-- nav bar -->
                <b-navbar toggleable="lg" type="light" variant="info">
                  <b-link to="/inicio">
                      <el-button size="mini">
                        <i class="fas fa-arrow-left padding-icon"></i>Volver
                      </el-button>
                  </b-link>
                  <b-navbar-toggle target="nav_collapse" />

                  <b-collapse is-nav id="nav_collapse" class="bg-navbar">
                    <b-navbar-nav>
                      <br/>
                      <!-- {{dataDDJJ}} -->
                      <el-input  placeholder="Filtrar por transacción, impuesto, o periodo" prefix-icon="el-icon-search" v-model="filtradoDDJJ" @input="filtrarBusquedaDDJJ()"></el-input>
                      <br/>
                      <el-button size="mini" @click="nuevaDeclaracion = true; mode = 'new'">
                        <i class="fas fa-file-alt padding-icon"></i>Nueva Declaración Jurada
                      </el-button>
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
                <v-divider></v-divider>
                <!-- <TablaResponsive class="hidden-md-and-up" :data="getDeclaracionesJuradas"></TablaResponsive> -->
                <el-table-wrapper  :data="dataDDJJ" :columns="columnsDDJJ" :pagination="pagination" :show-custom-header="false">
                  <template slot-scope slot="column-slot">
                    <b-link class="obligacion-icon" to="/comprobantes/ticket">
                      <i class="far fa-file-alt size-3x"></i>
                    </b-link>
                  </template>
                   <el-table-column
                    fixed
                    prop="date"
                    label="Fecha"
                    width="150">
                  </el-table-column>
                  <template slot-scope="scope" slot="column-temporalidad">

                        <!-- {{scope.row.temporalidad}} -->
                       <b-badge v-if="scope.row.temporalidad == 'FALTA PRESENTADO'" variant="warning">Falta Presentación</b-badge>
                       <b-badge v-if="scope.row.temporalidad == 'EN TERMINO'" variant="success">En Término</b-badge>
                       <b-badge v-if="scope.row.temporalidad == 'FUERA DE TERMINO'" variant="danger">Fuera de Termino</b-badge>

                  </template>
                </el-table-wrapper>
              </el-tab-pane>

              <!-- TAB BORRADORES -->
              <el-tab-pane label="Borradores" name="borradores">
                <!-- nav bar -->
                <b-navbar toggleable="lg" type="light" variant="info">
                  <b-link to="/inicio">
                    <el-button size="mini">
                      <i class="fas fa-arrow-left padding-icon"></i>Volver
                    </el-button>
                  </b-link>
                  <b-navbar-toggle target="nav_collapse" />
                  <b-collapse is-nav id="nav_collapse" class="bg-navbar">
                  <br/>
                    <b-navbar-nav>
                      <el-input placeholder="Filtrar por Impuesto y Periodo" prefix-icon="el-icon-search" v-model="filtradoBorradores" @input="filtrarBusqueda()"></el-input>
                    </b-navbar-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                      <b-nav-item href="#">
                        <i class="fas fa-print"></i> Imprimir
                      </b-nav-item>
                    </b-navbar-nav>
                  </b-collapse>
                </b-navbar>
                <v-divider></v-divider>
                <!-- <TablaResponsive class="hidden-md-and-up" :data="getBorradores"></TablaResponsive> -->
                <el-table-wrapper  :data="getBorradores" :columns="columnsBorradores" :pagination="pagination" :show-custom-header="false">
                  <template fixed slot-scope="value" slot="column-acciones">
                    <!--  <el-tag :type="scope.row.tag === 'No disponible' ? 'primary' : 'success'" close-transition="">
        {{scope.row.tag}}
                    </el-tag-->
                    
                    <b-link class="obligacion-icon" @click="editMode(value)">
                      <el-tooltip content="Editar" placement="top" effect="light">
                        <span class="padding-icon">
                          <icon class="fas fa-edit"></icon>
                        </span>
                      </el-tooltip>
                    </b-link>
                    <b-link @click="confirmarBorrado = true; selection = value.row;">
                      <el-tooltip content="Eliminar" placement="top" effect="light">
                        <span class="padding-icon">
                          <icon class="fas fa-trash"></icon>
                        </span>
                      </el-tooltip>
                    </b-link>
                  </template>
                </el-table-wrapper>
              </el-tab-pane>
            </el-tabs>
            <!-- popup -->

            <el-dialog title="Declaración Jurada" :visible.sync="nuevaDeclaracion" >
              <declaracion-jurada 
                
                v-on:PresentarDj='PresentarDj($event)' 
                :PresentarDj="presentar" 
                :OldSelect="oldSelect" 
                :Selection="selection" 
                :Mode="mode" 
                :Save="save" 
                :Contribuyente="getContribuyente" 
                v-on:GuardarDatos="NuevaDeclaracionJurada($event)" 
                v-on:SaveChangeDetect="SaveChange($event)">
              </declaracion-jurada>
              <v-divider></v-divider>
              <el-button size="mini" @click="nuevaDeclaracion = false; GuardarEnBorrador()">Guardar Borrador</el-button>
              <el-button size="mini" type="primary" @click="nuevaDeclaracion = false; presentar = 'si'">Presentar DJ</el-button>
            </el-dialog>
            <el-dialog title="Eliminar borrador" :visible.sync="confirmarBorrado" width="500px">
              <p>Desea eliminar el borrador seleccionado?</p>
              <v-divider></v-divider>
              <el-button size="mini" @click="confirmarBorrado = false">No</el-button>
              <el-button size="mini" type="primary" @click="confirmarBorrado = false; borrarSeleccion()">Si, eliminar</el-button>
            </el-dialog>

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
import DeclaracionJurada from "@/views/components/DeclaracionJurada";
import { mapState, mapGetters } from "vuex";
import moment from "moment";
import TablaResponsive from "@/views/mobile/TablaResponsive"
import { fork } from 'child_process';
export default {
  name: "declaracionesJuradas",
  components: {
    DeclaracionJurada,
    TablaResponsive
  },
  data() {
    return {
      columnsDDJJ: [
        {
          prop: "impuesto",
          label: "Impuesto",
          sortable: true,
          fixed: true,
          width:100
        },
        {
          prop: "periodo",
          label: "Periodo",
          sortable: true
        },
        {
          prop: "idTicket",
          label: "Transacción",
        },
        {
          prop: "fechaOperacion",
          label: "Fecha de presentación"
        },
        {
          prop: "impuestoDeterminado",
          label: "Impuesto Determinado"
        },
        {
          prop: "estado",
          label: "Estado",
          width: 130,
          columnKey: "estado",
          filters: [
            {
              text: "Vigente",
              value: "Vigente"
            },
            {
              text: "No Vigente",
              value: "No Vigente"
            },
            {
              text: "Pendiente de presentación",
              value: "Pendiente de presentación"
            }
          ],
          filterMethod: this.filterTag,
          filterMultiple: false,
          scopedSlot: "column-estado"
        },
        {
          prop: "vencimiento",
          label: "Vencimiento"
          // columnKey: "tag",
          // scopedSlot: "column-slot-vencimiento"
        },
        {
          prop: "temporalidad",
          label: "Temporalidad",
          width: 130,
          columnKey: "temporalidad",
          filters: [
            {
              text: "En término",
              value: "En término"
            },
            {
              text: "Fuera de término",
              value: "Fuera de término"
            }
          ],
          filterMethod: this.filterTag,
          filterMultiple: false,
          scopedSlot: "column-temporalidad"
        },
        {
          prop: "tag",
          label: "Ver",
          width: 130,
          columnKey: "tag",
          filters: [
            {
              text: "Ver",
              value: "Ver"
            },
            {
              text: "No disponible",
              value: "No Disponible"
            }
          ],
          filterMethod: this.filterTag,
          filterMultiple: false,
          scopedSlot: "column-slot"
        }
      ],
      columnsBorradores: [
        {
          prop: "impuesto",
          label: "Impuesto",
          sortable: true,
          fixed: true,
          width: 100
        },
        {
          prop: "periodo",
          label: "Periodo",
          sortable: true
        },
        {
          prop: "ImpuestoDeterminado",
          label: "Impuesto Determinado"
        },
        {
          prop: "vencimiento",
          label: "Vencimiento"
        },
        {
          prop: "Acciones",
          label: "Acciones",
          width: 130,
          columnKey: "acciones",
          scopedSlot: "column-acciones"
        }
      ],
      // dataBorradores: [
      //   {
      //     impuesto: "Ingresos Brutos",
      //     periodo: "2018/01",
      //     impuestoDeterminado: 1523.36,
      //     vencimiento: "2018/02/18",
      //     acciones: "Editar"
      //   }
      //  ]
      pagination: {
        pageSize: 3,
        layout: "total, sizes, prev, pager, next",
        pageSizes: [3, 10, 20],
        onSizeChange: this.onPageSizeChange,
        onCurrentChange: this.onPageCurrentChange
      },
      activeTab: "ddjj",
      filtradoDDJJ: "",
      filtradoBorradores: "",
      nuevaDeclaracion: false,
      confirmarBorrado: false,
      selection: null,
      mode: "new",
      save: "no",
      oldSelect: null,
      presentar: "no",
      obligacion: {},
      nuevaData: [],
      dataNew: []
    };
  },
  methods: {
  
    editMode(value) {
      this.nuevaDeclaracion = true;
      this.mode = "edit";
      this.save = "no";
      this.selection = value.$index;
      this.oldSelect = value.row;
    },
    LoaderActive(MensajeInfo, MensajeSuccess) {
      // this.$message({
      //   message: 'Loading...',
      //   type: 'warning',
      //   duration: 5000
      // })
      this.$notify.info({
        title: "Info",
        message: MensajeInfo,
        duration: 1500
      });
      setTimeout(() => {
        // this.$message({
        //   message: 'Felicidades, este es un mensaje de éxito.',
        //   type: 'success'
        // })
        this.$notify({
          title: "Success",
          message: MensajeSuccess,
          type: "success",
          duration: 1500
        });
      }, 1500);
    },
    handleClick() {
      //console.log("handleClick", this.getBorradores)
    },
    borrarSeleccion() {
      //console.log("borrarSeleccion", data)
      this.$store.commit("borradores/borrarDatos", this.selection);
      this.selection = null;
    },
    filtrarBusqueda() {
      console.log("filtrarBusqueda");
      this.$store.commit("borradores/setFilter", this.filtradoBorradores);
    },
    filtrarBusquedaDDJJ() {
      console.log("filtrarBusquedaDDJJ", this.filtradoDDJJ);
      this.$store.commit("comprobantes/setFilterTodos", this.filtradoDDJJ);
    },
    PresentarDj(NuevaDJ) {
      this.$store.commit("comprobantes/setNuevaDJ", NuevaDJ);
      // this.ComprobarIPC(NuevaDJ);
      this.LoaderActive(
        "Presentando Declaración Jurada",
        "DJ Presentada Correctamente"
      );
      this.presentar = "no";
    },
    SaveChange(NuevaDJ) {
      // this.$store.commit("comprobantes/setNuevaDJ", NuevaDJ);
      // this.ComprobarIPC_Borrador(NuevaDJ);
      console.log("Nueva DJ > Guardar en Borrador");
      this.save = "no";
    },
    GuardarEnBorrador() {
      console.log("Editar DJ > Guardar en Borrador");

      this.save = "si";
      this.LoaderActive(
        "Guardando Declaración Jurada",
        "DJ guardada correctamente"
      );
    },
   
  },

  computed: {
    ...mapGetters({
      getBorradores: "borradores/getBorradores",
      dataDDJJ: "comprobantes/getFilterTodos",
      getContribuyente: "contribuyentes/getFilterTodos",
      getObligaciones: "obligaciones/getObligaciones",
      getDeclaracionesJuradas: "comprobantes/getDeclaracionesJuradas"
    }),
  },
  mounted() {
    this.$store.commit("borradores/loadItems");
    this.$store.commit("comprobantes/loadItems");
    this.$store.commit("obligaciones/loadItems");
    // console.log(this.dataDDJJ[0]);
    // console.log("getContribuyente", this.getContribuyente)
  }
};
</script>
<style>
.el-dialog{
  min-width: 300px;
}
</style>