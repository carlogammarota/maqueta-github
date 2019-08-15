import serverData from "@/../JsonServerWebApi/server.json"
import store from '../../index'

export default {
  namespaced: true,
  state: {
    items: [],
    item: {
      icono: "",
      mensaje: "",
      link: ""
    },
    itemsCount: 0
  },
  getters: {
    getItems: state => state.items,
    getItemsCount: state => state.itemsCount
  },
  mutations: {
    addItemTest(state, payload) {
      state.itemsCount++
      state.items.push(payload)
    },
    // Agrega una notificacion en base al contenido del elemento item
    addItem(state) {
      state.items.push(state.item)
      state.itemsCount++
    },
    // carga las notificaciones del json
    loadItems(state, data) {
      // console.log("Vuex loadItems ", [...serverData.cuentas[store.state.indexActual].notificaciones])
      state.items = [...serverData.cuentas[store.state.indexActual].notificaciones]
      // console.log("State Items", state.items)
      state.itemsCount = state.items.length
    }
  },
  actions: {
    actionTest: ({commit}) => {
      console.log("actionTest")
   }
  }
}
