import serverData from "@/../JsonServerWebApi/server.json"
import store from '../../index'
import moment from 'moment'
import getRegistraciones from "../Registraciones/index.js"

export default {
    namespaced: true,
    state: {
        idTicketActual: 750000,
        items: [],
        item: {
            impuesto: "Ingresos Brutos",
            periodo: "2019/03",
            cuenta: "Impuesto Determinado",
            idTicket: 750000,
            fechaOperacion: "31/03/2019",
            fechaRegistracion: "31/03/2019",
            descripcion: "Por presentación de Declaración Jurada",
            debe: 1235.03,
            haber: 0
        },
        itemsCount: 0,
        filters: {
            impuesto: "",
            periodo: "",
            cuenta: "",
            cuota: ""
        },
        ImpuestoPeriodo: {}
    },
    getters: {
        getFilteredItems(state) {
            var result = []
            for (var i = 0; i < state.items.length; i++) {
                if ((state.items[i].impuesto === state.filters.impuesto || state.filters.impuesto === "") &&
                    (state.items[i].periodo === state.filters.periodo || state.filters.periodo === "") &&
                    (state.items[i].cuenta === state.filters.cuenta || state.filters.cuenta === "") &&
                    (state.items[i].cuota === state.filters.cuota || state.filters.cuota === "")) {
                    result.push(state.items[i])
                }
            }
            return result
        },
        getMovimientosImpuestoPeriodo(state){
            //getter que me devuelve partiendo desde un impuesto y un periodo
            //buscando en registraciones
            console.log("state ip", state.ImpuestoPeriodo.periodo)
            console.log("getRegistracionesPeriodo", getRegistraciones.state.items.periodo)
            let Registraciones = getRegistraciones.state.items
            let getMovimientos = []

            for (let index = 0; index < Registraciones.length; index++) {
                // const element = Registraciones[index];

                if (state.ImpuestoPeriodo.impuesto == Registraciones[index].impuesto && state.ImpuestoPeriodo.periodo == Registraciones[index].periodo) {
                    
                    // getMovimientos.push(Registraciones[index])
                    getMovimientos.push({
                        impuesto: Registraciones[index].impuesto,
                        fechaOperacion: Registraciones[index].fechaOperacion,
                        fechaRegistracion: Registraciones[index].fechaRegistracion,
                        descripcion: Registraciones[index].descripcion,
                        debe: Registraciones[index].debe,
                        haber: Registraciones[index].haber,
                        saldo: "hola",
                        nroTransaccion: "00001"

                        //Falta Saldo y NroTransaccion > el saldo lo obtenemos de /registraciones > !preguntar si esta bien!
                        //el nroTransaccion > lo sacamos de /comprobantes

                        //Testear porque en detalle de obligacion, (intereses resarsitorios, punitorios, impuesto determinado detalle)
                        //solo funciona con Ingresos Brutos!

                    })
                }
                
            }


            //devolver array limpio con un nuevo push 
            // return state.items
            return getMovimientos
        }
    },
    mutations: {
        // carga las registraciones que estan en el json
        loadItems(state) {
            state.items = [...serverData.cuentas[store.state.indexActual].registracion]
            state.itemsCount = state.items.length
        },
        saveItem(state, data) {
            state.items.push(state.item)
            state.item = {
                impuesto: "Ingresos Brutos",
                periodo: "2019/03",
                cuenta: "Impuesto Determinado",
                idTicket: 750000,
                fechaOperacion: "31/03/2019",
                fechaRegistracion: "31/03/2019",
                descripcion: "Por presentación de Declaración Jurada",
                debe: 1235.03,
                haber: 0
            }
            // console.log("Registracion agregada Correctamente", state.items)
        },
        setImpuestoPeriodoMovimientos(state, datos){
            // console.log("impuestoPeriodo", datos)
        
            state.ImpuestoPeriodo.impuesto = datos.impuesto
            state.ImpuestoPeriodo.periodo = datos.periodo

        
            // console.log("ImpuestoPeriodo", state.ImpuestoPeriodo)
            // // console.log("impuestoPeriodo", state.impuestoPeriodo)
        },
        updateImpuesto(state, data) {
            
            state.item.impuesto = data
        },
        updatePeriodo(state, data) {
            state.item.periodo = data
        },
        updateCuenta(state, data) {
            state.item.cuenta = "Impuesto Determinado"
        },
        updateidTicket(state, data) {
            state.idTicketActual++
            state.item.idTicket = state.idTicketActual
        },
        updateFechaOperacion(state, data) {
            state.item.fechaOperacion = moment(new Date(), "'MM-DD-YYYY hh:mm:ss a'").format('MM/YYYY')
        },
        updateFechaRegistracion(state, data) {
            state.item.fechaRegistracion = moment(new Date(), "'MM-DD-YYYY hh:mm:ss a'").format('MM/YYYY')
        },
        updateDescripcion(state, data) {
            state.item.descripcion = "Presentación de declaración jurada"
        },
        updateDebe(state, data) {
            state.item.debe = data
        },
        updateHaber(state, data) {
            state.item.haber = 0
        }
    },
    actions: {
        increment (context) {
            console.log("Increment Cotext Actions"),
             console.log("data dj registraciones action", dataDDJJ)
        // context.commit('increment')
            }
    }
    
}
