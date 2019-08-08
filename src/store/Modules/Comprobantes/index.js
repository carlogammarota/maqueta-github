
import store from '../../index'
import  RemplazarCaracteres from "../RemplazarCaracteres"
import moment from 'moment'
import axios from 'axios';

import getObligaciones from "../Obligaciones/index.js"

export default {
    namespaced: true,
    state: {
        idTicketActual: 750000,
        formActual: 0,
        periodoActual: "",
        items: [],
        item: {},
        itemsCount: 0,
        filters: {
            impuesto: "",
            periodoDesde: "",
            periodoHasta: "",
            fechaDesde: "",
            fechaHasta: "",
            idTicket: "12033001",
        },
        filterTodos: "",
        filterRecientes: "",
        clearItem: {
            f345: {
                idTicket: 750000,
                formulario: "345",
                descripcion: "Declaración Jurada",
                fechaOperacion: "",
                CUIT: "",
                impuesto: "Ingresos Brutos",
                concepto: "Capital",
                periodo: "",
                ingresosGravados: 0,
                alicuota: 0,
                impuestoDeterminado: 0,
                version: "100"
            },
            f800: {
                idTicket: 750000,
                formulario: "800",
                descripcion: "Pago",
                fechaOperacion: "",
                CUIT: "",
                impuesto: "Ingresos Brutos",
                concepto: "Capital",
                periodo: "",
                importe: 0,
                version: "100"
            },
            f801: {
                idTicket: 750000,
                formulario: "801",
                descripcion: "Compensación",
                fechaOperacion: "",
                CUIT: "",
                impuesto: "",
                concepto: "",
                periodo: "",
                importe: 0,
                version: "100",
                origen: {
                    impuesto: "",
                    concepto: "",
                    periodo: ""
                },
                destino: {
                    impuesto: "",
                    concepto: "",
                    periodo: ""
                },
            },
            f802: {
                idTicket: 750000,
                formulario: "802",
                descripcion: "Reimputación de pago",
                fechaOperacion: "",
                CUIT: "",
                impuesto: "",
                concepto: "",
                periodo: "",
                importe: 0,
                version: "100",
                origen: {
                    impuesto: "",
                    concepto: "",
                    periodo: "",
                    idTicketPago: "",
                    fechaPago: ""
                },
                destino: {
                    impuesto: "",
                    concepto: "",
                    periodo: ""
                }
            },
        },
        obligacion: {},
        NuevaDJ: {},
        porImpuestoPeriodo: {},
        ImpuestoPeriodoSingleDetalle: {
            impuesto: "",
            periodo: ""
        }
    },
    getters: {
        // filtra los comprobantes por idTicket, impuesto, periodo y fecha
        getFilteredItems(state) {
            var result = []
            for (var i = 0; i < state.items.length; i++) {
                if (state.items[i].idTicket === state.filters.idTicket) {
                    result.push(state.items[i])
                } else if ((state.items[i].impuesto === state.filters.impuesto || state.items[i].impuesto === "") &&
                    ((state.items[i].fechaOperacion >= state.filters.fechaDesde && state.filters.fechaDesde != "") || state.filters.fechaDesde == "") &&
                    ((state.items[i].fechaOperacion <= state.filters.fechaHasta && state.filters.fechaHasta != "") || state.filters.fechaHasta == "") &&
                    ((state.items[i].periodo >= state.filters.periodoDesde && state.filters.periodoDesde != "") || state.filters.periodoDesde == "") &&
                    ((state.items[i].periodo <= state.filters.periodoHasta && state.filters.periodoHasta != "") || state.filters.periodoHasta == "")) {
                    result.push(state.items[i])
                }
            }
            return result
        },
        getFilterTodos(state) {
            return state.items.filter(com => {
                // console.log("com", com)                        
                return com.impuesto.toLowerCase().indexOf(state.filterTodos.toLowerCase()) > -1 || com.idTicket.toString().startsWith(state.filterTodos.toLowerCase()) || com.periodo.toString().startsWith(state.filterTodos)
            })
        },
        getFilterRecientes(state){
            return state.items.filter(com => {
                // console.log("com", com.impuesto)
                // console.log("state.filterRecientes", state.filterRecientes)
                return com.impuesto.toLowerCase().indexOf(state.filterRecientes.toLowerCase()) > -1 || com.idTicket.toString().startsWith(state.filterRecientes.toLowerCase()) || com.formulario.toString().startsWith(state.filterRecientes)
            })
        },
        getDeclaracionesJuradas(state, getters) {

        // <<<<<<<<<<<< Temporalidad >>>>>>>>>>>>

        let obligacionesFueraDeTermino = getObligaciones.state.items.filter(obligacion => { 
              let vencimiento = moment(obligacion.vencimiento, "YYYY-MM");
    
                let impuestoSinPagar = state.items.filter(ddjj => {
                    let periodoFormat = moment(ddjj.periodo, "MM/YYYY").format("YYYYMM")
                    let mismoImpuesto = ddjj.impuesto === obligacion.impuesto;
                    let mismoPeriodo = periodoFormat === obligacion.periodo

                    if (periodoFormat <= moment().format("YYYYMM")) {    
                        ddjj.temporalidad = "EN TERMINO"
                    }
                    else {
                        ddjj.temporalidad = "FUERA DE TERMINO"
                    }
                    
                    if (!mismoImpuesto) return false;
                    if (!mismoPeriodo) return false;

                    return true;
                });
                
              if (vencimiento.isBefore(moment()) && impuestoSinPagar.length === 0) {
                obligacion.temporalidad = "FALTA PRESENTADO"
              }
              return (
                vencimiento.isBefore(moment()) && impuestoSinPagar.length === 0
              );
            }
          );

        // <<<<<<<<<< Estado >>>>>>>>>>>>
            //Ordenar Array
            console.log("items Fecha de Operacion", state.items)

            let arrayOrdenado = 
                state.items
                    .sort((a, b) => (
                        moment(a.periodo, "MM/YYYY").format("YYYYMM") + 
                        moment(a.fechaOperacion, "DD-MM-YYYY HH:mm:ss").format("YYYYMMDDHHmmss") < 
                        moment(b.periodo, "MM/YYYY").format("YYYYMM") + 
                        moment(b.fechaOperacion, "DD-MM-YYYY HH:mm:ss").format("YYYYMMDDHHmmss")
                        ) ? 1 : -1
                )

                for (let index = 0; index < arrayOrdenado.length; index++) {

                }
                //Lo ordener por Periodo despues por fecha pero no lo compare con impuesto para ver si funciona
                //cuando loadItem esta activo parece funcionar.
                // }
                    
                    // Detectar Original (Funcionando!)
                    let actual = ""
                    for (let index = 0; index < arrayOrdenado.length; index++) {
                        let periodo = moment(arrayOrdenado[index].periodo, "MM/YYYY").format("YYYYMM")
                        if (periodo != actual) {
                            arrayOrdenado[index].estado = "Original"
                            actual = periodo
                        }
                    }
                   
                    // Detectar Vigente (REVISAR!)
                    for (let index = arrayOrdenado.length - 1; index >= 0; index--) {
                        let periodo = moment(arrayOrdenado[index].periodo, "MM/YYYY").format("YYYYMM")
                        
                        if (periodo != actual) {
                            console.log("estado Aqui", arrayOrdenado[index].estado)
                            if (arrayOrdenado[index].estado != "Pendiente de Aprobación") {
                                arrayOrdenado[index].estado = "Vigente"
                                // arrayOrdenado[index].estado += "Vigente"
                                actual = periodo
                            }
                        }
                        // console.log("Revisar", actual)
                    }
            
                    
                    //Detectar Pendiente de Aprobacion
                    let impuestoDetActual = 0
                    for (let index = 0; index < arrayOrdenado.length; index++) {
                        let periodo = moment(arrayOrdenado[index].periodo, "MM/YYYY").format("YYYYMM")
                        //es el mismo!
                        if (periodo != actual) {
                            actual = periodo
                            impuestoDetActual = arrayOrdenado[index].impuestoDeterminado
                        } else {
                            if (arrayOrdenado[index].impuestoDeterminado < impuestoDetActual) {
                                arrayOrdenado[index].estado = "Pendiente de Aprobación"
                            } else {
                                impuestoDetActual = arrayOrdenado[index].impuestoDeterminado
                            }
                            // if (arrayOrdenado[index].impuestoDeterminado > impuestoDetActual) {
                            //     arrayOrdenado[index].estado = "test"
                            // }
                        }
                    }


                    // <<<<<<<<<< VENCIMIENTO >>>>>>>>>>>>
                       // <<<<<<<<<< VENCIMIENTO >>>>>>>>>>>>
                
                    for (let index = 0; index < getObligaciones.state.items.length; index++) {
                        if (state.NuevaDJ.impuesto === getObligaciones.state.items[index].impuesto) {
                            state.obligacion = getObligaciones.state.items[index];
                        }
                    }
                    
                    //Agregamos el vencimiento sacado de /obligaciones segun el impuesto seleccionado
                    for (let index = 0; index < arrayOrdenado.length; index++) {
                        if (arrayOrdenado[index].impuesto === state.obligacion.impuesto) {
                            arrayOrdenado[index].vencimiento = moment(
                            state.obligacion.vencimiento,
                            "YYYY-MM-DD"
                            ).format("DD/MM/YYYY");
                        }
                    }

            return obligacionesFueraDeTermino.concat(arrayOrdenado)
            // return impuestoDeterminadoOrdenado
        },
        getRetencionSegunImpuestoPeriodo(state){
            let ImpuestoDeterminadoDetalles = []
            for (let index = 0; index < state.items.length; index++) {
                if (state.ImpuestoPeriodoSingleDetalle.impuesto == state.items[index].impuesto || state.ImpuestoPeriodoSingleDetalle.periodo == state.items[index].periodo) {
                    ImpuestoDeterminadoDetalles.push(state.items[index])
                }
            }
            return ImpuestoDeterminadoDetalles
        },
    },
    mutations: {
        SetPorImpuestoyPeriodo(state, datos){
            state.ImpuestoPeriodoSingleDetalle = {
                impuesto: datos.impuesto,
                periodo: datos.periodo
            }
        },
        loadItems(state) {
            // state.items = [...serverData.cuentas[store.state.indexActual].comprobantes]
            // state.items = 
            //     [ 
            //         { "idTicket": 750001, "formulario": "345", "descripcion": "Declaración Jurada", "fechaOperacion": "06-25-2019 04:30:01", "CUIT": "20-25044444-5", "impuesto": "Ingresos Brutos", "concepto": "Capital", "periodo": "03/2019", "ingresosGravados": 0, "alicuota": "3", "impuestoDeterminado": 6.66, "version": "100", "vencimiento": "04/09/2019", "temporalidad": "FUERA DE TERMINO" }, 
            //         { "idTicket": 750002, "formulario": "345", "descripcion": "Declaración Jurada", "fechaOperacion": "06-25-2019 04:32:08", "CUIT": "20-25044444-5", "impuesto": "Ingresos Brutos", "concepto": "Capital", "periodo": "03/2019", "ingresosGravados": 0, "alicuota": "4", "impuestoDeterminado": 44.44, "version": "100", "vencimiento": "04/09/2019", "temporalidad": "EN TERMINO" }, 
            //         { "idTicket": 750003, "formulario": "345", "descripcion": "Declaración Jurada", "fechaOperacion": "06-25-2019 04:33:16", "CUIT": "20-25044444-5", "impuesto": "Ingresos Brutos", "concepto": "Capital", "periodo": "03/2019", "ingresosGravados": 0, "alicuota": "4", "impuestoDeterminado": 3999.96, "version": "100", "vencimiento": "04/09/2019", "temporalidad": "EN TERMINO" }, 
            //         { "idTicket": 750004, "formulario": "345", "descripcion": "Declaración Jurada", "fechaOperacion": "06-25-2019 04:34:08", "CUIT": "20-25044444-5", "impuesto": "Automotor", "concepto": "Capital", "periodo": "03/2019", "ingresosGravados": 0, "alicuota": "4", "impuestoDeterminado": 454.44, "version": "100", "vencimiento": "04/09/2019", "temporalidad": "EN TERMINO" }, 
            //         { "idTicket": 750005, "formulario": "345", "descripcion": "Declaración Jurada", "fechaOperacion": "06-25-2019 04:35:16", "CUIT": "20-25044444-5", "impuesto": "Automotor", "concepto": "Capital", "periodo": "03/2019", "ingresosGravados": 0, "alicuota": "4", "impuestoDeterminado": 12, "version": "100", "vencimiento": "04/09/2019", "temporalidad": "EN TERMINO" }, 
            //         { "idTicket": 750006, "formulario": "345", "descripcion": "Declaración Jurada", "fechaOperacion": "06-25-2019 04:20:08", "CUIT": "20-25044444-5", "impuesto": "Automotor", "concepto": "Capital", "periodo": "03/2019", "ingresosGravados": 0, "alicuota": "4", "impuestoDeterminado": 414.44, "version": "100", "vencimiento": "04/09/2019", "temporalidad": "EN TERMINO" }, 
            //         { "idTicket": 750007, "formulario": "345", "descripcion": "Declaración Jurada", "fechaOperacion": "06-25-2019 04:21:16", "CUIT": "20-25044444-5", "impuesto": "Inmobiliario", "concepto": "Capital", "periodo": "03/2019", "ingresosGravados": 0, "alicuota": "4", "impuestoDeterminado": 11, "version": "100", "vencimiento": "04/09/2019", "temporalidad": "EN TERMINO" }, 
            //         { "idTicket": 750008, "formulario": "345", "descripcion": "Declaración Jurada", "fechaOperacion": "06-25-2019 04:25:08", "CUIT": "20-25044444-5", "impuesto": "Inmobiliario", "concepto": "Capital", "periodo": "03/2019", "ingresosGravados": 0, "alicuota": "4", "impuestoDeterminado": 442.44, "version": "100", "vencimiento": "04/09/2019", "temporalidad": "EN TERMINO" }, 
            //         { "idTicket": 750009, "formulario": "345", "descripcion": "Declaración Jurada", "fechaOperacion": "06-25-2019 04:40:16", "CUIT": "20-25044444-5", "impuesto": "Inmobiliario", "concepto": "Capital", "periodo": "03/2019", "ingresosGravados": 0, "alicuota": "4", "impuestoDeterminado": 13, "version": "100", "vencimiento": "04/09/2019", "temporalidad": "EN TERMINO" }, 
            //     ]

            axios.get(`https://json-server-420.herokuapp.com/db/`)
            .then(response => {
              // JSON responses are automatically parsed.
              console.log("data:", response.data.cuentas[0].comprobantes)
              state.items = response.data.cuentas[0].comprobantes
            })
            .catch(e => {
              this.errors.push(e)
            })
            
            // state.itemsCount = state.items.lengthz
            // console.log("Load Comprobantes desde json", state.items)
        },
        //muestra la pantalla con los campos vacíos para cargar un comprobante nuevo
        addItem(state, formulario) {
            state.item = state.clearItem['f' + formulario.toString()]
            state.formActual = formulario
            // console.log("Create AddItem Comprobantes", state.item)
        },
        saveItem(state, obligacion) {
            
            console.log("Save Item", state.item)
            state.items.push(state.item)
            state.item = {}
            state.formActual = 0
            
            //reseteamos el formulario a default
            state.clearItem.f345 = {
                idTicket: 750000,
                formulario: "345",
                descripcion: "Declaración Jurada",
                fechaOperacion: "",
                CUIT: "",
                impuesto: "Ingresos Brutos",
                concepto: "Capital",
                periodo: "",
                ingresosGravados: 0,
                alicuota: 0,
                impuestoDeterminado: 0,
                version: "100"
            }
        },
        updateIdTicket(state, data) {
            //incrementamos 1
            state.idTicketActual++
            state.item.idTicket = state.idTicketActual
        },
        updateFechaOperacion(state, data) {
            //Determina la fecha actual 
            state.item.fechaOperacion = moment(new Date(), "'MM-DD-YYYY hh:mm:ss a'").format('MM-DD-YYYY hh:mm:ss')
        },
        upgradeCUIT(state, data) {
            state.item.CUIT = data
            // console.log("Create AddItem Comprobantes", state.item)
        },
        updateImpuesto(state, data) {
            state.item.impuesto = data
        },
        updateConcepto(state, data) {
            state.item.concepto = data
        },
        updatePeriodo(state, data) {
            state.item.periodo = data
        },
        updateImporte(state, data) {
            state.item.cuenta = data
        },
        updateAlicuota(state, data) {
            state.item.alicuota = data
        },
        upgradeIngresosGravados(state, data) {
            state.item.ingresosGravados = data
        },
        updagradeImpuestoDeterminado(state, data) {
            state.item.impuestoDeterminado = data
        },
        upgradeVersion(state, data) {
            state.item.version = data
        },
        upgradeOrigenImpuesto(state, data) {
            state.item.origen.impuesto = data
        },

        todosFilter(state, data) {
            console.log("data impuestoFilter", data)
            //state.filters.impuesto = data
        },
        
        setFilterTodos (state, data) {
            state.filterTodos = data
        },

        setFilterRecientes(state, data){
            state.filterRecientes = data
        },
        setNuevaDJ(state, data){
            state.NuevaDJ = data

        }


    },
    actions: {
        // SET_TAB: ({commit}, payLoad) => {
        //     commit('setTab', payLoad)
        //  },
       
    }
}
