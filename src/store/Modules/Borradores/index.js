import serverData from "@/../JsonServerWebApi/server.json"
import store from '../../index'
import  RemplazarCaracteres from "../RemplazarCaracteres"
import moment from 'moment'
import getComprobantes from "../Comprobantes/index.js"

export default {
    namespaced: true,
    state: {
        items: [],
        itemsCount: 0,
        filter: "",
        FilterDDJJ: "",
        loader: false
    },
    getters: {
        getLoader(state){
            return state.loader
        },
        getBorradores(state) {
            //filter
            return state.items.filter(com => {
                return com.impuesto.toLowerCase().indexOf(state.filter.toLowerCase()) > -1 || com.periodo.toString().startsWith(state.filter)
                
            })

        },

    },
    mutations: {
        loadItems(state) {
            state.items = [...serverData.cuentas[store.state.indexActual].borradores]
            state.itemsCount = state.items.length
        },
        borrarDatos(state, data){
            state.items.splice(state.items.indexOf(data), 1)
        },
        setFilter(state, data){
            state.filter = data
        },
        setFilterDDJJ(state, data){
            state.FilterDDJJ = data
        },
        guardarDatos(state, data){
           state.items.push(data.NuevaDJ)
        },
        editarDatos(state, data){
            state.items.splice(data.index, 1, data.obj)
        }
    },
    actions: {
        
    }
}
