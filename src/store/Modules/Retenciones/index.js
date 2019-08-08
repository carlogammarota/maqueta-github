
import store from '../../index'
import axios from 'axios';
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
            // state.items = [...serverData.cuentas[store.state.indexActual].retenciones]
            state.itemsCount = state.items.length


            axios.get(`https://json-server-420.herokuapp.com/db/`)
            .then(response => {
              // JSON responses are automatically parsed.
              console.log("data:", response.data.cuentas[0].retenciones)
              state.items = response.data.cuentas[0].retenciones
            })
            .catch(e => {
              this.errors.push(e)
            })
        }
    },
    actions: { 

    }
}
