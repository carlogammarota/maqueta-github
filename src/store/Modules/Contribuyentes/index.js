
import store from '../../index'
import axios from 'axios';
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
      // console.log("loadItems Contribuyentes")
      // console.log(serverData.cuentas[store.state.indexActual].contribuyente)
      
      // state.items = serverData.cuentas[store.state.indexActual].contribuyente

      axios.get(`https://json-server-420.herokuapp.com/db/`)
      .then(response => {
        // JSON responses are automatically parsed.
        console.log("data:", response.data.cuentas[0].contribuyente)
        state.items = response.data.cuentas[0].contribuyente
      })
      .catch(e => {
        this.errors.push(e)
      })
      // //state.itemsCount = state.items.length
      // console.log("loadItems contribuyente", state.items)
    } 
  },
  actions: {
  }
}
