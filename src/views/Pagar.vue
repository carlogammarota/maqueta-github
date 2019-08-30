<template>
  <div class="animated fadeIn">
    <b-card class="text-center" header="Pagar">
      <b-container style="padding: 0px">
        <b-row align-h="center" style="margin-top: 40px">
          <b-col sm="12" md="12">
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
                
                  <el-input
                    placeholder="Filtrar por impuesto, periodo o importe"
                    prefix-icon="el-icon-search"
                    v-model="filtrado"
                  ></el-input>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                  <b-nav-item href="#">
                    <i class="fas fa-print"></i> Imprimir
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
          </b-col>
        </b-row>
        <b-row class="text-left">
          <b-col>
            <h2>Total adeudado: $ 5.664,08</h2>
          </b-col>
          <b-col>
            <h2 class="right">Total selecionado: $ 0</h2>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12">
            <v-divider></v-divider>
            <h2 class="bg-featured">Obligaciones adeudadas</h2>
          </b-col>
          <b-col cols="12">
          {{data}}
          <!-- <TablaResponsive class="hidden-md-and-up" :data="data"></TablaResponsive> -->
            <el-table-wrapper
              row-key="id"
              ref="tableDeudas"
              :data="data"
              :columns="columns"
              :pagination="pagination"
              :show-custom-header="false"
            >
              <template slot-scope slot="column-slot">
                <el-button size="mini" icon="fas fa-plus"></el-button>
                <!-- <el-radio v-model="radio" label=""></el-radio> -->
              </template>
            </el-table-wrapper>
            <v-divider></v-divider>
          </b-col>
        </b-row>
        <b-row class="text-left">
           <b-col cols="12">
            <h2 class="text-right bg-featured">Total a pagar: $ 0,00</h2>
          </b-col>
          <b-col cols="12">
            <b-link to="/comprobantes/ticket">
              <el-button class="mt-20" type="primary" size="mini">Pagar Ahora</el-button>
            </b-link>
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
import TablaResponsive from "@/views/mobile/TablaResponsive"
export default {
  components:{
    TablaResponsive
  },
  name: "pagar",
  data() {
    return {
      pagination: {
        pageSize: 3,
        layout: "total, sizes, prev, pager, next",
        pageSizes: [3, 10, 20],
        onSizeChange: this.onPageSizeChange,
        onCurrentChange: this.onPageCurrentChange
      },
      data: [
        {
          id: 1,
          impuesto: "Inmobiliario",
          concepto: "Total",
          periodo: "01/2010",
          vencimiento: "",
          fechaDemanda: "",
          cantidadDias: "",
          importe: "$ 1.521,36",
          children: [
            {
              id: 11,
              impuesto: "",
              concepto: "Capital",
              periodo: "01/2010",
              vencimiento: "05/02/2010",
              fechaDemanda: "",
              cantidadDias: "",
              importe: "$ 1.000"
            },
            {
              id: 12,
              impuesto: "",
              concepto: "Intereses Resarcitorios",
              periodo: "01/2010",
              vencimiento: "05/02/2010",
              fechaDemanda: "",
              cantidadDias: "",
              importe: "$ 21,36"
            },
            {
              id: 13,
              impuesto: "",
              concepto: "Intereses Punitorios",
              periodo: "01/2010",
              vencimiento: "05/02/2010",
              fechaDemanda: "14/05/2011",
              cantidadDias: "3081",
              importe: "$ 500"
            }
          ]
        },
        {
          id: 2,
          impuesto: "Ingresos Brutos",
          concepto: "Total",
          periodo: "01/2010",
          vencimiento: "",
          fechaDemanda: "",
          cantidadDias: "",
          importe: "$ 2.521,36",
          children: [
            {
              id: 21,
              impuesto: "",
              concepto: "Capital",
              periodo: "01/2010",
              vencimiento: "05/02/2010",
              fechaDemanda: "",
              cantidadDias: "",
              importe: "$ 2.000"
            },
            {
              id: 22,
              impuesto: "",
              concepto: "Intereses Resarcitorios",
              periodo: "01/2010",
              vencimiento: "05/02/2010",
              fechaDemanda: "",
              cantidadDias: "",
              importe: "$ 21,36"
            },
            {
              id: 23,
              impuesto: "",
              concepto: "Intereses Punitorios",
              periodo: "01/2010",
              vencimiento: "05/02/2010",
              fechaDemanda: "14/05/2011",
              cantidadDias: "3081",
              importe: "$ 500"
            }
          ]
        },
                {
          id: 2,
          impuesto: "Test",
          concepto: "Total",
          periodo: "01/2010",
          vencimiento: "",
          fechaDemanda: "",
          cantidadDias: "",
          importe: "$ 2.521,36",
          children: [
            {
              id: 25,
              impuesto: "",
              concepto: "Capital",
              periodo: "01/2010",
              vencimiento: "05/02/2010",
              fechaDemanda: "",
              cantidadDias: "",
              importe: "$ 2.000"
            },
            {
              id: 25,
              impuesto: "",
              concepto: "Intereses Resarcitorios",
              periodo: "01/2010",
              vencimiento: "05/02/2010",
              fechaDemanda: "",
              cantidadDias: "",
              importe: "$ 21,36"
            },
            {
              id: 26,
              impuesto: "",
              concepto: "Intereses Punitorios",
              periodo: "01/2010",
              vencimiento: "05/02/2010",
              fechaDemanda: "14/05/2011",
              cantidadDias: "3081",
              importe: "$ 500"
            }
          ]
        }
      ],
      columns: [
        {
          type: "selection",
          width:40
        },
        {
          prop: "impuesto",
          label: "Impuesto",
          fixed: true,
          width:120
        },
        {
          prop: "concepto",
          label: "Concepto",
        },
        {
          width: 40
        },
        
        {
          prop: "periodo",
          label: "Periodo"
        },
        {
          prop: "vencimiento",
          label: "Vencimiento"
        },
        {
          prop: "fechaDemanda",
          label: "Fecha de la demanda"
        },
        {
          prop: "cantidadDias",
          label: "Cantidad de días"
        },
        {
          prop: "importe",
          label: "Importe"
        }
      ],
      filtrado: ""
    };
  },
  methods: {},
  computed: {},
  mounted() {}
};
</script>
