// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueCurrencyFilter from 'vue-currency-filter'


import sha256 from 'crypto-js/sha256'
import store from '@/store/index.js'

Vue.use(Vuex)

// Element-UI
/* import { Table, TableColumn, Row, Col, Collapse, Data } from 'element-ui'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Col)
Vue.use(Collapse) */

import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/es'
Vue.use(Element, {
  locale
})

// Vue.use(Element)

// complemento para paginación junto a Element-UI
import ElTableWrapper from 'element-table-wrapper'
Vue.use(ElTableWrapper)

import VueNumeric from 'vue-numeric'
Vue.use(VueNumeric)

import VueMask from 'v-mask'
Vue.use(VueMask)

import ElSearchTablePagination from 'el-table-pagination'
Vue.use(ElSearchTablePagination)

// acordarse desinstalar si no se usan
// import DataTables and DataTablesServer separately
import {
  DataTables,
  DataTablesServer
} from 'vue-data-tables'
Vue.use(DataTables)
Vue.use(DataTablesServer)

// import DataTables and DataTablesServer together
import VueDataTables from 'vue-data-tables'
Vue.use(VueDataTables)



//Loader
// import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
/* Vue.component('pulse-loader', require('vue-spinner/src/PulseLoader.vue')); */
// Vuetify
import Vuetify from 'vuetify'
Vue.use(Vuetify, {
  lang: {
    locales: {
      es
    }
  }
})
import 'vuetify/dist/vuetify.min.css'

// Translation provided by Vuetify (javascript)
import es from 'vuetify/es5/locale/es'


// Vue Currency

Vue.use(VueCurrencyFilter, {
  symbol: '$',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})


Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  data() {
    return {
      sha256: sha256,
      token: '',
      user: '',
      email: '',
      auth: ''
    }
  }
})
