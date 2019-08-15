import serverData from "@/../JsonServerWebApi/server.json"
import store from '../../index'

export default {
  namespaced: true,
  state: {
    items: [],
    itemsCount: 0,
    contribuyente:[]
  },
  getters: {
    // console.log("getters contribuyennte"),
    
    getFilterTodos(state) {
      return state.items
    } 
  },
  mutations: {   
    loadItems(state) {
      console.log("loadItems Contribuyentes")
      console.log(serverData.cuentas[store.state.indexActual].contribuyente)
      
      state.items = serverData.cuentas[store.state.indexActual].contribuyente
      // //state.itemsCount = state.items.length
      // console.log("loadItems contribuyente", state.items)
    } 
  },
  actions: {
  }
}
