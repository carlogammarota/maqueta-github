<template>
  <div class="animated fadeIn">
    <b-card class="text-center" header="Comprobantes">
      <b-container style="padding: 0px">
        <b-row align-h="center" style="margin-top: 40px">
          <b-col sm="12" md="12">
            <el-tabs v-model="activeTab">
              <!-- <h1>TEST</h1> {{getFilteredRecientes}} -->
              <!-- TAB COMPROBANTES RECIENTES -->
              <el-tab-pane label="Comprobantes recientes" name="recientes">
                <!-- nav bar -->
                <b-navbar toggleable="lg" type="light" variant="info">
                  <b-link to="/inicio">
                      <el-button size="mini">
                        <i class="fas fa-arrow-left padding-icon"></i>Volver
                      </el-button>
                  </b-link>
                  <b-navbar-toggle target="nav_collapse"/>

                  <b-collapse is-nav id="nav_collapse" class="bg-navbar">
                    <b-navbar-nav>
                      <!--  <b-link>
                        <el-button size="mini">
                          <i class="fas fa-arrow-left padding-icon"></i>Volver
                        </el-button>
                      </b-link>-->
                      <br/>
                      <el-button size="mini" @click="busquedaAv = true">
                        <i class="fas fa-search padding-icon"></i>Busqueda avanzada
                      </el-button>
                      <br/>
                      <el-input
                        placeholder="Filtrar por transacción, formulario, o impuesto"
                        prefix-icon="el-icon-search"
                        v-model="filtradoRecientes"
                         @input="updateRecientes()"
                      ></el-input>
                    </b-navbar-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                      <b-nav-item href="#">
                        <i class="fas fa-print"></i> Imprimir
                      </b-nav-item>
                      <b-nav-item disabled>
                        <i class="fas fa-file-export"></i>
                      </b-nav-item>
                      <b-nav-item-dropdown text="Exportar">
                        <b-dropdown-item href="#" disabled>XLS</b-dropdown-item>
                        <b-dropdown-item href="#" disabled>CSV</b-dropdown-item>
                        <b-dropdown-item href="#" disabled>PDF</b-dropdown-item>
                      </b-nav-item-dropdown>
                    </b-navbar-nav>
                  </b-collapse>
                </b-navbar>
                <v-divider></v-divider>
                <TablaResponsive class="hidden-md-and-up" :data="getFilteredRecientes"></TablaResponsive>
                <el-table-wrapper
                  class="hidden-md-and-down"
                  :data="getFilteredRecientes"
                  :columns="columns"
                  :pagination="pagination"
                  :show-custom-header="false"
                >
                  <template slot-scope slot="column-slot">
                    <b-link to="/comprobantes/ticket" class="obligacion-icon">
                      <i class="far fa-file-alt size-3x"></i>
                    </b-link>
                  </template>
                </el-table-wrapper>
              </el-tab-pane>
              <!-- TAB COMPROBANTES -->
              <el-tab-pane label="Comprobantes" name="comprobantes">
                <!-- nav bar -->
                
                <b-navbar toggleable="lg" type="light" variant="info">
                <b-link to="/inicio">
                  <el-button size="mini">
                    <i class="fas fa-arrow-left padding-icon"></i>Volver
                  </el-button>
                </b-link>
                  <b-navbar-toggle target="nav_collapse"/>
                    

                  <b-collapse is-nav id="nav_collapse" class="bg-navbar">
                  <br/>
                    <b-navbar-nav>
                      <!-- <b-link>
                        <el-button size="mini">
                          <i class="fas fa-arrow-left padding-icon"></i>Volver
                        </el-button>
                      </b-link>-->
                      <el-button size="mini" @click="busquedaAv = true">
                        <i class="fas fa-search padding-icon"></i>Busqueda avanzada
                      </el-button>
                      <br/>
                      <el-input
                        placeholder="Filtrar por transacción, formulario, o impuesto"
                        prefix-icon="el-icon-search"
                        v-model="filtradoTodos"
                        @input="updateFilterTodos()"
                      ></el-input>
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
                <TablaResponsive class="hidden-md-and-up" :data="getFilteredItems"></TablaResponsive>
                <el-table-wrapper
                  class="hidden-md-and-down"
                  :data="getFilteredItems"
                  :columns="columns"
                  :pagination="pagination"
                  :show-custom-header="false"
                >
                  <template slot-scope slot="column-slot">
                    <b-link to="/comprobantes/ticket" class="obligacion-icon">
                      <i class="far fa-file-alt size-3x"></i>
                    </b-link>
                  </template>
                </el-table-wrapper>
              </el-tab-pane>
            </el-tabs>

            <!-- popup -->
            <el-dialog title="Busqueda avanzada" :visible.sync="busquedaAv" width="600px">
              <b-row>
                <b-col>
                  <b-card class="text-left">
                    <busqueda-avanzada></busqueda-avanzada>
                  </b-card>
                </b-col>
              </b-row>
              <v-divider></v-divider>
              <el-button @click="busquedaAv = false" size="mini" class="text-left">Buscar</el-button>
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
import BusquedaAvanzada from "@/views/components/BusquedaAvanzada";
import { mapState, mapGetters } from "vuex";
import TablaResponsive from "@/views/mobile/TablaResponsive"

export default {
  name: "comprobantes",
  components: {
    BusquedaAvanzada,
    TablaResponsive
  },
  data() {
    return {
      columns: [
        {
          prop: "idTicket",
          label: "Transacción"
        },
        {
          prop: "formulario",
          label: "Formulario"
        },
        {
          prop: "version",
          label: "Versión"
        },
        {
          prop: "fechaOperacion",
          label: "Fecha operación",
          sortable: true
        },
        {
          prop: "impuesto",
          label: "Impuesto",
          sortable: true
        },
        {
          prop: "concepto",
          label: "Concepto"
        },
        {
          prop: "periodo",
          label: "Periodo",
          sortable: true
        },
        {
          prop: "cuota",
          label: "Cuota"
        },
        {
          prop: "tag",
          label: "Ver",
          scopedSlot: "column-slot"
        }
      ],
      dataRecientes: this.getFilteredRecientes,
      dataComprobantes: this.getFilteredItems,
      pagination: {
        pageSize: 3,
        layout: "total, sizes, prev, pager, next",
        pageSizes: [3, 10, 20],
        onSizeChange: this.onPageSizeChange,
        onCurrentChange: this.onPageCurrentChange
      },
      activeTab: "recientes",
      searchTab: "periodo",
      search: "",
      busquedaAv: false,
      filtradoRecientes: "",
      filtradoTodos: ""
    };
  },
  methods: {
    updateFilterTodos(){
        //console.log(this.filtradoTodos)
        this.$store.commit('comprobantes/setFilterTodos', this.filtradoTodos)
    },
    updateRecientes(){
          console.log("updateRecientes")
        //console.log("Update recientes", this.filtradoRecientes)
        this.$store.commit('comprobantes/setFilterRecientes', this.filtradoRecientes)
    },
    ComprobarCuota(){
          console.log("ComprobarCuota")
          for (let index = 0; index < this.getFilteredItems.length; index++) {
            for (let toIndex = 0; toIndex < this.getObligaciones.length; toIndex++) {
              if (this.getObligaciones[toIndex].impuesto == this.getFilteredItems[index].impuesto) {
                this.getFilteredItems[index].cuota = this.getObligaciones[toIndex].cuota
              }   
            }
          }
    },
  },
  computed: {
      ...mapGetters({
          getFilteredItems: 'comprobantes/getFilterTodos',
          getFilteredRecientes: 'comprobantes/getFilterRecientes',
          getObligaciones: 'obligaciones/getObligaciones'
        })
  },
  mounted() {
    this.ComprobarCuota()
    this.$store.commit('comprobantes/loadItems')
  }
};
</script>
