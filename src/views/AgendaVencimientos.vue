<template>
  <div class="animated fadeIn">
    <b-card class="text-center" header="Agenda de vencimientos">
      <!-- {{getObligaciones}}
      <button @click="testTestA()">TEST</button>
      asd -->
      
      <b-container style="padding: 0px">
        <b-row align-h="center" style="margin-top: 40px">
          <b-col sm="12" md="12">
            <!-- nav bar -->
            <b-navbar toggleable="lg" type="light" variant="info">
              <b-navbar-toggle target="nav_collapse"/>

              <b-collapse is-nav id="nav_collapse" class="bg-navbar">
                <b-navbar-nav>
                  <b-link to="/inicio">
                    <el-button size="mini">
                      <i class="fas fa-arrow-left padding-icon"></i>Volver
                    </el-button>
                  </b-link>
                    <el-button size="mini" class="text-left" @click="recordatorioPopup = true">
                      <i class="fas fa-calendar-alt padding-icon"></i>Recordarme
                    </el-button>
                </b-navbar-nav>

                <!-- popup de recordatorio -->
                <el-dialog title="Recordatorio" :visible.sync="recordatorioPopup" width="500px">
                  <el-table :data="dataRecordatorio" >
                    <el-table-column width="40" type="selection"></el-table-column>
                    <el-table-column property="impuesto" label="Impuesto" width="120px"></el-table-column>
                    <el-table-column property="periodo" label="Periodo" width="80px"></el-table-column>
                    <el-table-column property="concepto" label="Concepto" width="200px"></el-table-column>
                  </el-table>
                    <v-divider></v-divider> 
                  <el-button @click="recordatorioPopup = false" size="mini" class="text-left">Guardar</el-button>
                </el-dialog>

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

            <el-table-wrapper
              :data="getObligaciones"
              :columns="columns"
              :pagination="pagination"
              :show-custom-header="false"
               @selection-change="handleSelectionChange"
            >
              <template slot-scope slot="column-btn">
                <b-link :to="'/operaciones/confirmarPago/'">
                  <el-button size="mini">Pagar</el-button>
                </b-link>
              </template>
            </el-table-wrapper>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import store from "@/store/index";
import { mapState, mapGetters } from "vuex";
export default {
  name: "agendaVencimientos",
  data() {
    return {
      columns: [
        {
          type: "selection",
          
        },
        {
          prop: "impuesto",
          label: "Impuesto",
          sortable: true
        },
        {
          prop: "periodo",
          label: "Periodo",
          sortable: true
        },
        {
          prop: "concepto",
          label: "Concepto",
          sortable: true
        },
        {
          prop: "vencimiento",
          label: "Vencimiento"
        },
        {
          prop: "cuota",
          label: "Cuota"
        },
        {
          prop: "importe",
          label: "Importe"
        },
        {
          prop: "tag",
          label: "Acciones",
          width: 130,
          columnKey: "tag",
          scopedSlot: "column-btn"
        }
      ],
      dataRecordatorio: [
        {
          impuesto: "Inmobiliario",
          periodo: "2019/05",
          concepto: "Inmobiliario / ABL" 
        },
        {
          impuesto: "Ingresos Brutos",
          periodo: "2019/05",
          concepto: "Retenciones y percepciones"    
        },
       
      ],
      pagination: {
        pageSize: 3,
        layout: "total, sizes, prev, pager, next",
        pageSizes: [3, 10, 20],
        onSizeChange: this.onPageSizeChange,
        onCurrentChange: this.onPageCurrentChange
      },
      recordatorioPopup: false,
      multipleSelection: []
    };
  },
  methods: {
      handleSelectionChange(val) {
        console.log(val)
        this.multipleSelection = val;
        this.$store.commit('obligaciones/setChecklist', this.multipleSelection)
      }
  },
  computed: {
    ...mapGetters({
      getObligaciones: 'obligaciones/getObligaciones'
    })
  },
  mounted() {
    this.$store.commit('obligaciones/loadItems')
    console.log(this.getObligaciones)
  }
};

</script>
