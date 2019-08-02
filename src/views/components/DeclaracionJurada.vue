<template>
  <b-row>
    <b-col>
      <b-card class="text-left">
        <h3 class="bg-featured">
          CUIT
          <span class="right">{{Contribuyente.CUIT}}</span>
        </h3>

        <!-- <p>{{ EstoEsUnTest }}</p> -->
        <!-- <p>mode:{{Mode}}</p>
        <p>save:{{Save}}</p>
        <p>Selection:{{Selection}}</p>
        <p>OldSelect:{{OldSelect}}</p>
        <p>PresentarDj:{{PresentarDj}}</p> -->
        <!-- {{getObligaciones}} -->
        <!-- <ul v-for="obligacion in getObligaciones">
          <li>{{obligacion.impuesto}}</li>
          <li>{{obligacion.periodo}}</li>
          <li>{{obligacion.concepto}}</li>
        </ul> -->
          
        <v-divider></v-divider>
        <b-row>
          <b-col cols="6">
            <span class="fs-12">Impuesto</span>
            <!-- <select-impuesto v-on:Impuesto="ImpuestoSeleccionado($event)"></select-impuesto> -->
            <el-input
              placeholder="INGRESOS BRUTO"
              :disabled="true">
          </el-input>
          
          </b-col>
          <b-col cols="6">
            <span class="fs-12">Periodo Fiscal</span>
            <el-date-picker
              v-model="NuevaDJ.periodo"
              type="month"
              placeholder="Periodo"
              style="width: 100%"
            ></el-date-picker>
          </b-col>
        </b-row>
        <v-divider></v-divider>
        <b-row>
          <b-col cols="6">
            <span class="fs-12">Total de ingresos gravados</span>
          </b-col>
          <b-col cols="6">
            <vue-numeric
              v-bind:min="0"
              currency="$"
              v-model="NuevaDJ.monto"
              style="width: 100%"
            ></vue-numeric>
          </b-col>
        </b-row>
        <div class="spacer"></div>
        <b-row>
          <b-col cols="6">
            <span class="fs-12">Alicuota</span>
          </b-col>
          <b-col cols="6">
            <el-select v-model="NuevaDJ.alicuota" placeholder="Seleccionar Alicuota" style="width: 100%">
              <el-option value="2" label="2%"></el-option>
              <el-option value="3" label="3%"></el-option>
              <el-option value="4" label="4%"></el-option>
              <el-option value="5" label="5%"></el-option>
            </el-select>
          </b-col>
        </b-row>
        <v-divider></v-divider>
        <b-row>
          <b-col cols="6">
            <span class="fs-12">Impuesto determinado</span>
          </b-col>
          <b-col cols="6">
            <b-badge variant="info" class="right fs-13">$ {{ImpuestoDeterminadoComputed}}</b-badge>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import store from "@/store/index";
import SelectAlicuota from "@/views/components/SelectAlicuota";
import SelectImpuesto from "@/views/components/SelectImpuesto";
import { mapState, mapGetters } from "vuex";
import moment from 'moment'

export default {
  name: "declaracion-jurada",
  components: {
    SelectAlicuota,
    SelectImpuesto
  },
  props: ['Contribuyente','Mode', 'Save','Selection', "OldSelect", "PresentarDj"],
  data() {
    return {  
      dialogVisible: false,
      value: "",
      NuevaDJ: {},
      total: 0,
      obligacion: {}
    }
  },
  methods: {
    //ComprobarIPC se encarga de comprobar si la nueva dj(impuesto concepto periodo)

  },
  watch: {

    Save: function () {
      //Nueva dj New
        if(this.Save == "si" && this.Mode == "new"){
            //Impuesto por default "Ingresos Brutos"
            this.NuevaDJ.impuesto = "Ingresos Brutos"
            //Impuesto determinado = monto*alicuota/100
            this.NuevaDJ.ImpuestoDeterminado = this.ImpuestoDeterminadoComputed
            //Periodo seleccionado
            this.NuevaDJ.periodo = moment(this.NuevaDJ.periodo, "'MM-DD-YYYY hh:mm:ss a'").format('MM/YYYY')
            //Guardamos los datos en borradores
            this.$store.commit("borradores/guardarDatos", {NuevaDJ: this.NuevaDJ, obligacion: this.obligacion})
            //Cerramos PopUp
            this.$emit("SaveChangeDetect", this.NuevaDJ)
            //Vaciamos el Objeto
            this.NuevaDJ = {}
        }
      //En el caso de editar y guardarlos en borradores
        if(this.Save == "si" && this.Mode == "edit") {
            //Impuesto por default "Ingresos Brutos"
            this.NuevaDJ.impuesto = "Ingresos Brutos"
            //Impuesto determinado = monto*alicuota/100
            this.NuevaDJ.ImpuestoDeterminado = this.ImpuestoDeterminadoComputed
            //Periodo seleccionado
            this.NuevaDJ.periodo = moment(this.NuevaDJ.periodo, "'MM-DD-YYYY hh:mm:ss a'").format('MM/YYYY')
            //Guardamos los datos en borradores
            this.$store.commit("borradores/editarDatos", {index: this.Selection, obj: this.NuevaDJ, obligacion: this.obligacion})
            //Cerramos PopUp
            this.$emit("SaveChangeDetect", this.NuevaDJ)
        }
        else {
            this.NuevaDJ = {}
        }
      },
    OldSelect: function () {
      // console.log("Selection", this.OldSelect)
      //En el caso de editar, traemos la edicion guardada
      this.NuevaDJ = this.OldSelect
    },
    PresentarDj: function () {
      //Al crear una nueva Declaracion Jurada
      if(this.PresentarDj == "si" && this.Mode == "new"){
        console.log("Presentar Nueva > Declaracion Jurada")
        // //Agregamos el vencimiento
        // this.$store.commit("comprobantes/agregarVencimiento", "11/2016")
        this.NuevaDJ.impuesto = "Ingresos Brutos"
        //Creamos un nuevo Formulario 345
        this.$store.commit("comprobantes/addItem", 345)
        //Agregamos el CUIT correspondiente al contribuyente
        this.$store.commit("comprobantes/upgradeCUIT", this.Contribuyente.CUIT)
        //Agregamos la fecha actual
        this.$store.commit("comprobantes/updateFechaOperacion")
        //Agregamos IdTicket increment +1
        this.$store.commit("comprobantes/updateIdTicket")
        //Impuesto Determinado
        this.$store.commit("comprobantes/updagradeImpuestoDeterminado", this.ImpuestoDeterminadoComputed)
        //Agregamos Alicuota
        this.$store.commit("comprobantes/updateAlicuota", this.NuevaDJ.alicuota)
        //Agregamos el periodo
        this.$store.commit("comprobantes/updatePeriodo", moment(this.NuevaDJ.periodo, "'MM-DD-YYYY hh:mm:ss a'").format('MM/YYYY'))
        //Guardamos el item en Items y le pasamos la obligacion buscada en this.ComprobarIPC()
        this.$store.commit("comprobantes/saveItem", this.obligacion)

        //Crea una Registracion en /Registraciones """"
        //Agregar una Registracion a /Registraciones con los siguientes datos.... pag 14
        // this.$store.commit("registraciones/addItem", {NuevaDJ: this.NuevaDJ, obligacion: this.obligacion})

        //Agregamos el Impuesto
        this.$store.commit("registraciones/updateImpuesto", this.NuevaDJ.impuesto)
        //Agregamos el Periodo
        this.$store.commit("registraciones/updatePeriodo", moment(this.NuevaDJ.periodo, "'MM-DD-YYYY hh:mm:ss a'").format('MM/YYYY'))
        //Agregamos la cuenta
        this.$store.commit("registraciones/updateCuenta")
        //Agregamos IdTicket increment +1
        this.$store.commit("registraciones/updateidTicket")
        //Agregar fechaOperacion (fecha actual)
        this.$store.commit("registraciones/updateFechaOperacion")
        //Agregamos fechaRegistracion
        this.$store.commit("registraciones/updateFechaRegistracion")
        //Agregamos la Descripcion
        this.$store.commit("registraciones/updateDescripcion")
        //Agregamos al debe el > Impuesto Determinado
        this.$store.commit("registraciones/updateDebe", this.ImpuestoDeterminadoComputed)
        //Agregamos al haber 0
        this.$store.commit("registraciones/updateHaber")
        //Agregamos ese item Registracion a Items
        this.$store.commit("registraciones/saveItem")
        //Cerramos el POPUP
        this.$emit("PresentarDj", this.NuevaDJ)
        //Vaciamos el objeto que guardaba la nueva DJ
        this.NuevaDJ = {}
        //Vaciamos la obligacion
        this.obligacion = {}


      }
      //Al crear una nueva Declaracion Jurada partiendo desde el edit
      if(this.PresentarDj == "si" && this.Mode == "edit"){
        console.log("Editar Nueva > Declaracion Jurada")
        this.NuevaDJ.impuesto = "Ingresos Brutos"
        //Creamos un nuevo Formulario 345
        this.$store.commit("comprobantes/addItem", 345)
        //Agregamos el CUIT correspondiente al contribuyente
        this.$store.commit("comprobantes/upgradeCUIT", this.Contribuyente.CUIT)
        //Agregamos la fecha actual
        this.$store.commit("comprobantes/updateFechaOperacion")
        //Agregamos IdTicket generamos uno desde el store 
        this.$store.commit("comprobantes/updateIdTicket")
        //Impuesto Determinado
        this.$store.commit("comprobantes/updagradeImpuestoDeterminado", this.ImpuestoDeterminadoComputed)
        //Agregamos Alicuota
        this.$store.commit("comprobantes/updateAlicuota", this.NuevaDJ.alicuota)
        //Agregamos el periodo
        this.$store.commit("comprobantes/updatePeriodo", moment(this.NuevaDJ.periodo, "'MM-DD-YYYY hh:mm:ss a'").format('MM/YYYY'))
        //Guardamos el item en Items
        this.$store.commit("comprobantes/saveItem", this.obligacion)
        
        
        //Crea una Registracion en /Registraciones
        //Agregamos el Impuesto
        this.$store.commit("registraciones/updateImpuesto", this.NuevaDJ.impuesto)
        //Agregamos el Periodo
        this.$store.commit("registraciones/updatePeriodo", moment(this.NuevaDJ.periodo, "'MM-DD-YYYY hh:mm:ss a'").format('MM/YYYY'))
        //Agregamos la cuenta
        this.$store.commit("registraciones/updateCuenta")
        //Agregamos IdTicket increment +1
        this.$store.commit("registraciones/updateidTicket")
        //Agregar fechaOperacion (fecha actual)
        this.$store.commit("registraciones/updateFechaOperacion")
        //Agregamos fechaRegistracion
        this.$store.commit("registraciones/updateFechaRegistracion")
        //Agregamos la Descripcion
        this.$store.commit("registraciones/updateDescripcion")
        //Agregamos al debe el > Impuesto Determinado
        this.$store.commit("registraciones/updateDebe", this.ImpuestoDeterminadoComputed)
        //Agregamos al haber 0
        this.$store.commit("registraciones/updateHaber")
        //Agregamos ese item Registracion a Items
        this.$store.commit("registraciones/saveItem")
        //Cerramos el POPUP
        this.$emit("PresentarDj", this.NuevaDJ)
        //Vaciamos el objeto que guardaba la nueva DJ
        this.NuevaDJ = {}
        //Eliminamos la DJ editada de Borradores ya que esta publicada
        this.$store.commit('borradores/borrarDatos', this.Selection)
      }
      // this.$store.commit("comprobantes/addDj", this.OldSelect)
      //agregamos un la declaracion jurada a comprobantes 
      //agregamos una registracion a /registraciones 
    }
  },
  computed: {
    //cuando es un calculo conviene hacer un computed
    ...mapGetters({
       getLoader: 'borradores/getLoader',
       getObligaciones: 'obligaciones/getObligaciones'
    }),
    ImpuestoDeterminadoComputed: function () {
      // console.log("Computed")
      if(this.NuevaDJ.monto && this.NuevaDJ.alicuota){
        this.NuevaDJ.ImpuestoDeterminado = this.NuevaDJ.monto * this.NuevaDJ.alicuota / 100
        return (this.NuevaDJ.monto * this.NuevaDJ.alicuota / 100);
        } else {
          return 0
        }
      // return 0;
    },
  },
  mounted() {
    //Comprobamos que el monto nunca sea menor que cero
    if(this.monto <= 0){
      this.monto = 0
    }
  }
}
</script>