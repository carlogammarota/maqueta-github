
import Vue from 'vue'
import Vuex from 'vuex'
import Nav from './Modules/Nav/index'
import Notificaciones from './Modules/Notificaciones/index'
import Contribuyentes from './Modules/Contribuyentes/index'
import Obligaciones from './Modules/Obligaciones/index'
import Retenciones from './Modules/Retenciones/index'
import Registraciones from './Modules/Registraciones/index'
import Comprobantes from './Modules/Comprobantes/index'
import Borradores from './Modules/Borradores/index'

Vue.use(Vuex)

/* Vuex store */
export default new Vuex.Store({
  // Modulos principales
  modules: {
    nav: Nav,
    notificaciones: Notificaciones,
    contribuyentes: Contribuyentes,
    obligaciones: Obligaciones, 
    retenciones: Retenciones, 
    registraciones: Registraciones,
    comprobantes: Comprobantes,
    borradores: Borradores
  },
  state: {
    cuitActual: "201111111112",
    indexActual: 0
  }
})
