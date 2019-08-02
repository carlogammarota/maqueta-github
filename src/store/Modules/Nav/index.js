/*
* Este modulo contiene el estado del menu de navegacion
* La definicion de la parte estatica del menu se hace en _nav.js
* Luego, este modulo toma esta definicion y la expone en state.nav.
* Se crea un getter que puede (a futuro) agregar contenido dinamico
*/

import navdef from '../../../_nav'

export default {
  namespaced: true,
  state: {
    nav: navdef
  },
  getters: {
    // Obtiene la lista del menu de navegacion
    getNav: (state) => {
      // Inicializa result con una copia de la definicion orignal del menu
      var result = {...state.nav}
      return result
    }
  },
  mutations: {
    
  },
  actions: {
  }
}
