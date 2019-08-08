
import store from '../../index'
import moment from 'moment'
import getRegistraciones from "../Registraciones/index.js"
import getRetenciones from "../Retenciones/index.js"
import getComprobantes from "../Comprobantes/index.js"
import axios from 'axios';
export default {
    namespaced: true,
    state: {
        items: [],
        itemsCount: 0,
        checklist: [],
        saldos: [],
        FiltroPorPeriodo: "",
        FiltroDetalleImpuestoPeriodo: {
          impuesto: "",
          periodo: ""
        },
        DetalleIntereses: {
          impuesto: "",
          periodo: ""
        },
    },
    getters: {
        getDetalleDePunitorios(state){
          let formulario345 = getComprobantes.state.clearItem.f345
          let SegunImpuestoyPeriodo = []
          let Comprobantes = getComprobantes.state.items
          let FechaDeOperacion = ""
          let Saldos = state.saldos
          let fechaDemanda = 0
          for (let index = 0; index < Comprobantes.length; index++) {
            if (state.DetalleIntereses.impuesto == Comprobantes[index].impuesto && moment(state.DetalleIntereses.periodo, "YYYYMM").format("YYYY/MM") == moment(Comprobantes[index].periodo, "MM/YYYY").format("YYYY/MM")) {
              SegunImpuestoyPeriodo.push({

                // Falta consultar idTicket

                idTicket: 750000,
                formulario: "345",
                descripcion: Comprobantes[index].descripcion,
                fechaOperacion: Comprobantes[index].fechaOperacion,
                CUIT: "",
                impuesto: Comprobantes[index].impuesto,
                concepto: Comprobantes[index].concepto,
                periodo:  Comprobantes[index].periodo,
                ingresosGravados: Comprobantes[index].ingresosGravados,
                alicuota: Comprobantes[index].alicuota,
                impuestoDeterminado: Comprobantes[index].impuestoDeterminado,
                version: Comprobantes[index].version,
                // vencimiento: Comprobantes[index].VtoDDJJ
              })
              FechaDeOperacion = Comprobantes[index].fechaOperacion
            }
          }
          //vencimiento de Obligaciones consultando por Impuesto y Periodo
          for (let indexTo = 0; indexTo < state.items.length; indexTo++) {
            for (let index = 0; index < SegunImpuestoyPeriodo.length; index++) {
              if (SegunImpuestoyPeriodo[index].impuesto == state.items[indexTo].impuesto && moment(SegunImpuestoyPeriodo[index].periodo, "MM/YYYY").format("YYYYMM") == state.items[indexTo].periodo) {
               
                // VtoDDJJ de /comprobantes
                SegunImpuestoyPeriodo[index].vencimiento = state.items[indexTo].VtoDDJJ
                for (let indexThree = 0; indexThree < Saldos.length; indexThree++) {
                  if (state.DetalleIntereses.impuesto == Saldos[indexThree].impuesto && state.DetalleIntereses.periodo == Saldos[indexThree].periodo) {
                    fechaDemanda = Saldos[indexThree].fechaDemanda
                    if (fechaDemanda == "") {
                      fechaDemanda = 0
                    }
                    SegunImpuestoyPeriodo[index].dias = moment(FechaDeOperacion).format("DD") - fechaDemanda
                  }
                }
              }
            }
          }
          return SegunImpuestoyPeriodo
          
        },
        //intereses Resarsitorios
        getDetalleResarcitorios(state){
          
          let formulario345 = getComprobantes.state.clearItem.f345
          let SegunImpuestoyPeriodo = []
          let Comprobantes = getComprobantes.state.items
          let FechaDeOperacion = ""

          for (let index = 0; index < Comprobantes.length; index++) {
            if (state.DetalleIntereses.impuesto == Comprobantes[index].impuesto && moment(state.DetalleIntereses.periodo, "YYYYMM").format("YYYY/MM") == moment(Comprobantes[index].periodo, "MM/YYYY").format("YYYY/MM")) {
              console.log("Comprobantes[index]", Comprobantes[index])
              SegunImpuestoyPeriodo.push({

                // Falta consultar idTicket

                idTicket: 750000,
                formulario: "345",
                descripcion: Comprobantes[index].descripcion,
                fechaOperacion: Comprobantes[index].fechaOperacion,
                CUIT: "",
                impuesto: Comprobantes[index].impuesto,
                concepto: Comprobantes[index].concepto,
                periodo:  Comprobantes[index].periodo,
                ingresosGravados: Comprobantes[index].ingresosGravados,
                alicuota: Comprobantes[index].alicuota,
                impuestoDeterminado: Comprobantes[index].impuestoDeterminado,
                version: Comprobantes[index].version
              })
              FechaDeOperacion = Comprobantes[index].fechaOperacion
            }
          }


          //vencimiento de Obligaciones consultando por Impuesto y Periodo
          for (let indexTo = 0; indexTo < state.items.length; indexTo++) {
            for (let index = 0; index < SegunImpuestoyPeriodo.length; index++) {
              if (SegunImpuestoyPeriodo[index].impuesto == state.items[indexTo].impuesto && moment(SegunImpuestoyPeriodo[index].periodo, "MM/YYYY").format("YYYYMM") == state.items[indexTo].periodo) {
                SegunImpuestoyPeriodo[index].vencimiento = state.items[indexTo].vencimiento
                let vencimiento = state.items[indexTo].vencimiento

                SegunImpuestoyPeriodo[index].dias = moment(FechaDeOperacion).format("YYYYMMDD") - vencimiento

              }
            }
          }
      
          return SegunImpuestoyPeriodo
        },
        getObligaciones(state) {
            return state.items
          },
        getSaldos(state){
            return state.saldos
        },
        getConsultarImpuestoPeriodo(state){
          let FiltroDetalle = state.items.filter(obligaciones => {
            let FiltroPeriodo = obligaciones.periodo
            let ObligacionPeriodo = state.FiltroDetalleImpuestoPeriodo.periodo
            if (state.FiltroDetalleImpuestoPeriodo.impuesto == obligaciones.impuesto && FiltroPeriodo == ObligacionPeriodo) {
              for (let index = 0; index < getRegistraciones.state.items.length; index++) {
                if (getRegistraciones.state.items[index].impuesto === obligaciones.impuesto && getRegistraciones.state.items[index].periodo === ObligacionPeriodo) {

                  //aca habria que obtener el IMPUESTO DETERMINADO QUE TEORICAMENTE VIENE DE /REGISTRACION pero no se encuentra ahi! 
                }
              }
              return true
            }
          })

          //obtenemos el vencimientoPago y VencimientoPresentacion de /obligaciones consultando por impuesto y periodo seleccionado
          for (let index = 0; index < state.items.length; index++) {
            for (let indexTo = 0; indexTo < FiltroDetalle.length; indexTo++) {
              if (state.items[index].impuesto == FiltroDetalle[indexTo].impuesto && state.items[index].periodo == FiltroDetalle[indexTo].periodo) {
                FiltroDetalle[indexTo].vencimientoPago = moment(state.items[index].vencimiento, "YYYYMMDD").format("YYYY/MM/DD")
                FiltroDetalle[indexTo].vencimientoPresentacion = moment(state.items[index].VtoDDJJ, "YYYYMMDD").format("YYYY/MM/DD")
           
                //obtenemos el importe que viene de /Retenciones buscando por impuesto y periodo seleccionado
                for (let indexThree = 0; indexThree < getRetenciones.state.items.length; indexThree++) {
                  if (getRetenciones.state.items[indexThree].impuesto == FiltroDetalle[indexTo].impuesto && getRetenciones.state.items[indexThree].periodo == FiltroDetalle[indexTo].periodo) {
                    // console.log("importe retenciones", getRetenciones.state.items[indexThree].importe)
                    FiltroDetalle[indexTo].retenciones = getRetenciones.state.items[indexThree].importe
                  }
                }
              }
            }

          }
          return FiltroDetalle[0]
        },
        GetInmobiliario(state, actions){
          console.log("GetInmobiliario")

          let impuestoObligado = "Inmobiliario"
          let obligacionesConsultar = []
          
          for (let index = 0; index < state.saldos.length; index++) {
            if (state.saldos[index].impuesto == impuestoObligado) {
              obligacionesConsultar.push({
                impuesto: impuestoObligado,
                periodo: state.saldos[index].periodo,
                vencimientoPago: "",
                capitalInteres: 1612.53,
                impuestoDeterminado: state.saldos[index].saldo,
                vencimientoPresentacion: "",
                tag: "Ver"
              })
            }

          }

          for (let indexTo = 0; indexTo < state.items.length; indexTo++) {
            // console.log("Vencimiento de /obligaciones", moment(state.items[indexTo].vencimiento, "YYYYMMDD").format("DD"))
            let DiasResarcitorios
            let DiasPunitorios
            let fechaActual = moment().format("DD")
            let Vencimiento = moment(state.items[indexTo].vencimiento, "YYYYMMDD").format("DD")

            for (let indexC = 0; indexC < state.saldos.length; indexC++) {
              const fechaDemanda = state.saldos[indexC].fechaDemanda;

              //Si no existe fecha de demanda
              if (state.saldos[indexC].fechaDemanda == "") {
                console.log("No existe fechaDemanda en /saldos")
                DiasPunitorios = 0
                DiasResarcitorios = fechaActual - Vencimiento
                console.log(DiasResarcitorios)
              } else {
                console.log("Existe la fechaDemanda en /Saldos")
                DiasPunitorios = fechaDemanda - fechaActual
                DiasResarcitorios = Vencimiento - fechaDemanda
              }
              //revisar esto !!!
              let saldoDeudor = 0
              if (state.items[indexTo].impuesto == state.saldos[indexC].impuesto && state.items[indexTo].periodo == state.saldos[indexC].periodo) {
                if (state.saldos[indexC].cuenta == "impuestoDeterminado") {
                  saldoDeudor = state.saldos[indexC].saldo
                  console.log("state.saldos[indexC].saldo", state.saldos[indexC].saldo)
                }
              }
              
              let interesesResarcitorios = DiasResarcitorios * (0.03/30) * saldoDeudor
              let interesesPunitorios = DiasPunitorios * (0.04/30) * saldoDeudor
              console.log("interesesResarcitorios", interesesResarcitorios)
              console.log("interesesPunitorios", interesesPunitorios)
              
            }
          }


          //Calculo vencimientoPresentacion y vencimientoPago
          for (let index = 0; index < obligacionesConsultar.length; index++) {
            // }
            for (let indexTo = 0; indexTo < state.items.length; indexTo++) {
              obligacionesConsultar[index].vencimientoPresentacion = state.items[indexTo].VtoDDJJ
              
              if (obligacionesConsultar[index].impuesto + obligacionesConsultar[index].periodo == state.items[indexTo].impuesto + state.items[indexTo].periodo) {

                obligacionesConsultar[index].vencimientoPago = moment(state.items[indexTo].vencimiento, "YYYYMMDD").format("YYYY/MM/DD")
              }
            }
          }
          
          let filtroAplicado = obligacionesConsultar.filter(obs => {
            // if(obs.)moment(state.FiltroPorPeriodo.desde, "YYYYMMDD").format("YYYY/MM/DD")
            let DesdeFormat = moment(state.FiltroPorPeriodo.desde, "YYYYMMDD").format("YYYYMM")
            let HastaFormat = moment(state.FiltroPorPeriodo.hasta, "YYYYMMDD").format("YYYYMM")

            if (!state.FiltroPorPeriodo || DesdeFormat > HastaFormat) {
              console.log("error: No existe filtro o la fecha desde es mayor a la de hasta")
              return true
            } else {

              if (DesdeFormat <= obs.periodo && HastaFormat >= obs.periodo){
                return true
              }
            }
          })
          return filtroAplicado 
        },


        GetAutomotores(state){
          console.log("getAutomotores")

          let impuestoObligado = "Automotor"
          let obligacionesConsultar = []
          
          for (let index = 0; index < state.saldos.length; index++) {
            if (state.saldos[index].impuesto == impuestoObligado) {
              obligacionesConsultar.push({
                impuesto: impuestoObligado,
                periodo: state.saldos[index].periodo,
                vencimientoPago: "",
                capitalInteres: 1612.53,
                impuestoDeterminado: state.saldos[index].saldo,
                vencimientoPresentacion: "",
                tag: "Ver"
              })
            }
          }

          for (let index = 0; index < obligacionesConsultar.length; index++) {
            // }
            for (let indexTo = 0; indexTo < state.items.length; indexTo++) {
              obligacionesConsultar[index].vencimientoPresentacion = moment(state.items[indexTo].VtoDDJJ, "YYYYMMDD").format("YYYY/MM/DD")
              if (obligacionesConsultar[index].impuesto + obligacionesConsultar[index].periodo == state.items[indexTo].impuesto + state.items[indexTo].periodo) {

                obligacionesConsultar[index].vencimientoPago = moment(state.items[indexTo].vencimiento, "YYYYMMDD").format("YYYY/MM/DD")
              }
            }
          }

          // return obligacionesConsultar

          let filtroAplicado = obligacionesConsultar.filter(obs => {
            // if(obs.)moment(state.FiltroPorPeriodo.desde, "YYYYMMDD").format("YYYY/MM/DD")
            let DesdeFormat = moment(state.FiltroPorPeriodo.desde, "YYYYMMDD").format("YYYYMM")
            let HastaFormat = moment(state.FiltroPorPeriodo.hasta, "YYYYMMDD").format("YYYYMM")

            if (!state.FiltroPorPeriodo || DesdeFormat > HastaFormat) {
              console.log("error: No existe filtro o la fecha desde es mayor a la de hasta")
              return true
            } else {

              if (DesdeFormat <= obs.periodo && HastaFormat >= obs.periodo){
                return true
              }
            }
          })
          return filtroAplicado 

        },

        GetIngresosBrutos(state){
          console.log("getIngresosBrutos")
          

          let impuestoObligado = "Ingresos Brutos"
          let obligacionesConsultar = []
          
          for (let index = 0; index < state.saldos.length; index++) {
            if (state.saldos[index].impuesto == impuestoObligado) {
              obligacionesConsultar.push({
                impuesto: impuestoObligado,
                periodo: state.saldos[index].periodo,
                vencimientoPago: "",
                capitalInteres: 1612.53,
                impuestoDeterminado: state.saldos[index].saldo,
                vencimientoPresentacion: "",
                tag: "Ver"
              })
            }
          }

          for (let index = 0; index < obligacionesConsultar.length; index++) {
            // }
            for (let indexTo = 0; indexTo < state.items.length; indexTo++) {
              obligacionesConsultar[index].vencimientoPresentacion = moment(state.items[indexTo].VtoDDJJ, "YYYYMMDD").format("YYYY/MM/DD")
              if (obligacionesConsultar[index].impuesto + obligacionesConsultar[index].periodo == state.items[indexTo].impuesto + state.items[indexTo].periodo) {

                obligacionesConsultar[index].vencimientoPago = moment(state.items[indexTo].vencimiento, "YYYYMMDD").format("YYYY/MM/DD")
              }
            }
          }

          // return obligacionesConsultar

          let filtroAplicado = obligacionesConsultar.filter(obs => {
            // if(obs.)moment(state.FiltroPorPeriodo.desde, "YYYYMMDD").format("YYYY/MM/DD")
            let DesdeFormat = moment(state.FiltroPorPeriodo.desde, "YYYYMMDD").format("YYYYMM")
            let HastaFormat = moment(state.FiltroPorPeriodo.hasta, "YYYYMMDD").format("YYYYMM")

            if (!state.FiltroPorPeriodo || DesdeFormat > HastaFormat || !state.FiltroPorPeriodo.desde > state.FiltroPorPeriodo.hasta) {
              console.log("error: No existe filtro o la fecha desde es mayor a la de hasta")
              return true
            } else {

              if (DesdeFormat <= obs.periodo && HastaFormat >= obs.periodo){
                return true
              }
            }
          })
          return filtroAplicado 


        }
    },
    mutations: {
        addDetalleIntereses(state, data){
          console.log("data", data)
          state.DetalleIntereses.impuesto = data.impuesto
          state.DetalleIntereses.periodo = data.periodo

        },
        filtro(state, data){
          if(data.desde && data.hasta){
            state.FiltroPorPeriodo = data
          }
          state.FiltroPorPeriodo = data
          console.log("data", state.FiltroPorPeriodo)
        },
        // carga las obligaciones que estan en el json
        loadItems(state) {
            // state.items = [...serverData.cuentas[store.state.indexActual].obligaciones]
            state.itemsCount = state.items.length

                  
            axios.get(`https://json-server-420.herokuapp.com/db/`)
            .then(response => {
              // JSON responses are automatically parsed.
              console.log("data:", response.data.cuentas[0].obligaciones)
              state.items = response.data.cuentas[0].obligaciones
            })
            .catch(e => {
              this.errors.push(e)
            })
        },
        loadSaldos(state){
            state.saldos = [...serverData.cuentas[store.state.indexActual].saldos]
        },
        setChecklist(state, data){
            console.log("setCheckList")
            state.checklist = data
        },
        //cargamos el filtro que viene desde "detalle" > consultar por impuesto y periodo
        loadFiltroPorImpuestoPeriodo(state, data){
          // console.log("loadFiltroPorImpuestoPeriodo", data)
          state.FiltroDetalleImpuestoPeriodo.impuesto = data.impuesto
          state.FiltroDetalleImpuestoPeriodo.periodo = data.periodo
        }
    },
    actions: {
      // getConsultarImpuestoPeriodo(asd){
      //   return "consultarActions", asd
      // }
    }
}
