import Vue from 'vue'
import Router from 'vue-router'

// Containers
import DefaultContainer from '@/containers/DefaultContainer'
// import Simple from '@/containers/Simple'

// Views
import Inicio from '@/views/Inicio'
import ConfirmarPago from '@/views/ConfirmarPago'
import ReimputarPago from '@/views/ReimputarPago'
import DeclaracionesJuradas from '@/views/DeclaracionesJuradas'
import Pagar from '@/views/Pagar'

import ConsultarCuentas from '@/views/ConsultarCuentas'
import MovimientosDeCuenta from '@/views/MovimientosDeCuenta'


import ConsultarObligaciones from '@/views/ConsultarObligaciones'
import ConsultarObligacionPorPeriodo from '@/views/ConsultarObligacionPorPeriodo'
import CompensarSaldo from '@/views/CompensarSaldo'

import Comprobantes from '@/views/Comprobantes'
import Ticket from '@/views/Ticket'
import TicketDJ from '@/views/TicketDJ'
import TicketCS from '@/views/TicketCS'
import TicketRP from '@/views/TicketRP'

import AgendaVencimientos from '@/views/AgendaVencimientos'

import DetalleRetenciones from '@/views/DetalleRetenciones'
import DetallePagosCancelaciones from '@/views/DetallePagosCancelaciones'
import DetalleImpuestoDeterminado from '@/views/DetalleImpuestoDeterminado'
import DetalleSLD from '@/views/DetalleSLD'
import DetalleIntereses from '@/views/DetalleIntereses'

import Login from '@/views/Login'
import Simple from '@/containers/Simple'

// móvil
import DetalleDeuda from '@/views/mobile/DetalleDeuda'
import DetalleDeudaInmobiliario from '@/views/mobile/DetalleDeudaInmobiliario'
import DetalleDeudaAutomotores from '@/views/mobile/DetalleDeudaAutomotores'
import DetalleDeudaIIBB from '@/views/mobile/DetalleDeudaIIBB'
import DetalleSaldoLD from '@/views/mobile/DetalleSLD'

// import store from '@/store/index'

Vue.use(Router)

let router = new Router({
  mode: 'hash',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: Simple,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        }
      ]
    },
    {
      path: '/',
      redirect: '/inicio',
      name: 'home',
      component: DefaultContainer,
      children: [
        {
          path: 'inicio',
          name: 'Inicio',
          component: Inicio
        },
        // versión movil
        {
          path: 'detalleDeuda',
          name: 'Detalle de deuda por impuesto',
          component: DetalleDeuda,
        },
        {
          path: 'detalleDeuda',
          name: 'Detalle de deuda por impuesto',
          component: {
            render(c) { return c ('router-view')}
          },
          children: [
            {
              path: 'inmobiliario',
              name: 'Inmobiliario',
              component: DetalleDeudaInmobiliario
            },
            {
              path: 'automotores',
              name: 'Automotores',
              component: DetalleDeudaAutomotores
            },
            {
              path: 'IIBB',
              name: 'Ingresos Brutos',
              component: DetalleDeudaIIBB
            }
          ]
        },
        {
          path: 'cuentaCorriente',
          // redirect: '/panel/panelPrincipal',
          name: 'Cuenta Corriente',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'consultarPorPeriodo',
              name: 'Consultar obligacion por periodo',
              component: ConsultarObligacionPorPeriodo
            },
            {
              path: 'consultarObligaciones',
              name: 'Consultar Obligaciones',
              component: ConsultarObligaciones
            },
            {
              path: 'consultarCuentas',
              name: 'Consultar Cuentas',
              component: ConsultarCuentas
            },
            {
              path: 'consultarCuentas',
              name: 'Consulta de Cuentas',
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                {
                  path: 'movimientos/:impuesto/:periodo/:cuenta',
                  name: 'Movimientos',
                  component: MovimientosDeCuenta
                }
              ]
            },
            { // subrutas para detalles
              path: 'consultarObligacion',
              name: 'Consulta de obligacion por periodo',
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                {
                  path: 'detalleRetenciones/:impuesto/:periodo',
                  name: 'Detalle de Retenciones del periodo',
                  component: DetalleRetenciones
                },
                {
                  path: 'detallePagosCancelaciones',
                  name: 'Detalle de pagos y cancelaciones',
                  component: DetallePagosCancelaciones
                },
                {
                  path: 'detalleImpuestoDeterminado/:impuesto/:periodo',
                  name: 'Detalle de impuesto determinado',
                  component: DetalleImpuestoDeterminado
                },
                {
                  path: 'detalleSLD',
                  name: 'Detalle de usos de Saldo de libre disponibilidad',
                  component: DetalleSLD
                },
                {
                  path: 'detalleIntereses/:impuesto/:periodo',
                  name: 'Detalle intereses',
                  component: DetalleIntereses
                }
              ]
            },
          ]
        },
        {
          path: 'operaciones',
          // redirect: '/panel/panelPrincipal',
          name: 'Operaciones',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'declarar',
              name: 'Declarar',
              component: DeclaracionesJuradas
            },
            {
              path: 'pagar',
              name: 'Pagar',
              component: Pagar
            },
            {
              path: 'confirmarPago',
              name: 'Confirmar Pago',
              component: ConfirmarPago
            },
            {
              path: 'compensar',
              name: 'Compensar Saldo',
              component: CompensarSaldo
            },
            {
              path: 'reimputar',
              name: 'Reimputar un Pago',
              component: ReimputarPago
            },
            { // movil
              path: 'detalleSLD',
              name: 'Saldos de libre disponibilidad',
              component: DetalleSaldoLD
            }
          ]
        },
        {
          path: 'comprobantes',
          name: 'Comprobantes',
          component: Comprobantes
        },
        {
          path: 'comprobantes',
          name: 'Comprobante',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'ticket',
              name: 'Ticket',
              component: Ticket
            },
            {
              path: 'ticket_DJ',
              name: 'Ticket DJ',
              component: TicketDJ
            },
            {
              path: 'ticket_CS',
              name: 'Ticket CS',
              component: TicketCS
            },
            {
              path: 'ticket_RP',
              name: 'Ticket RP',
              component: TicketRP
            }
          ]
        },
        {
          path: 'agenda',
          name: 'Agenda de Vencimientos',
          component: AgendaVencimientos
        },
        {
          path: 'accesos',
          redirect: '/accesos/dfe',
          name: 'Accesos',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'dfe',
              name: 'Dfe',
              beforeEnter: (to, from, next) => {
                window.open('https://lbi.agip.gob.ar/apl/login/login.php')
                next(false)
              }
            },
            {
              path: 'ddjj',
              name: 'DDJJ',
              beforeEnter: (to, from, next) => {
                window.open('https://dp033018.agip.gob.ar/testing/')
                next(false)
              }
            }
          ]
        }
      ]
    }
  ]
})


export default router

