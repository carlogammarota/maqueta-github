import serverData from "@/../JsonServerWebApi/server.json"
import store from '../../index'

export default {
    namespaced: true,
    state: {
        items: [],
        item: {
            nroCertificado: "",
            CUITAgente: "",
            Impuesto: "",
            periodo: ""
        },
        itemsCount: 0,
        ImpuestoPeriodoSingleDetalle: {
            impuesto: "",
            periodo: ""
        }
    },
    getters: {
        getRetencionSegunImpuestoPeriodo(state){
            let retencionesIP = [];
            if (state.ImpuestoPeriodoSingleDetalle) {
                for (let index = 0; index < state.items.length; index++) {
                    if (state.items[index].impuesto == state.ImpuestoPeriodoSingleDetalle.impuesto && state.items[index].periodo == state.ImpuestoPeriodoSingleDetalle.periodo) {
                        retencionesIP.push(state.items[index])
                    }
                }
                return retencionesIP
            } else {
                return state.ImpuestoPeriodoSingleDetalle
            }
        }
    },
    mutations: {
        SingleImpuestoPeriodo(state, data){
            // console.log("data retenciones store", data)
            state.ImpuestoPeriodoSingleDetalle.impuesto = data.impuesto
            state.ImpuestoPeriodoSingleDetalle.periodo = data.periodo
        },
         // carga las retenciones el json
        loadItems(state) {
            state.items = [...serverData.cuentas[store.state.indexActual].retenciones]
            state.itemsCount = state.items.length
        }
    },
    actions: { 

    }
}
