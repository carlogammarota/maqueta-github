
import store from '../../index'
import axios from 'axios';
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
      // state.items = [...serverData.cuentas[store.state.indexActual].notificaciones]
      // // console.log("State Items", state.items)
      state.itemsCount = state.items.length


      axios.get(`https://json-server-420.herokuapp.com/db/`)
      .then(response => {
        // JSON responses are automatically parsed.
        console.log("data:", response.data.cuentas[0].notificaciones)
        state.items = response.data.cuentas[0].notificaciones
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  },
  actions: {
    actionTest: ({commit}) => {
      console.log("actionTest")
   }
  }
}
