export default {
  items: [
    {
      name: 'Inicio',
      url: '/inicio',
      icon: 'icon-home'
    },
    {
      name: 'Cuenta Corriente',
      url: '/cuentaCorriente',
      icon: 'icon-magnifier',
      children: [
        {
          name: 'Consultar obligacion por periodo',
          url: '/cuentaCorriente/consultarPorPeriodo',
          icon: ''
        },
        {
          name: 'Consultar obligaciones',
          url: '/cuentaCorriente/consultarObligaciones',
          icon: ''
        },
        {
          name: 'Consultar cuentas',
          url: '/cuentaCorriente/consultarCuentas',
          icon: ''
        }]
    },
    {
      name: 'Operaciones',
      url: '/operaciones',
      icon: 'icon-shuffle',
      children: [
        {
          name: 'Declarar',
          url: '/operaciones/declarar',
          icon: ''
        },
        {
          name: 'Pagar',
          url: '/operaciones/pagar',
          icon: ''
        },
        {
          name: 'Compensar saldos',
          url: '/operaciones/compensar',
          icon: ''
        },
        {
          name: 'Reimputar un pago',
          url: '/operaciones/reimputar',
          icon: ''
        }]
    },
    {
      name: 'Comprobantes',
      url: '/comprobantes',
      icon: 'icon-layers'
    },
    {
      name: 'Agenda de vencimientos',
      url: '/agenda',
      icon: 'icon-calendar'
    },
    {
      name: 'Accesos',
      icon: 'icon-link',
      children: [
        {
          name: 'Domicilio Fiscal Electrónico',
          icon: '',
          url: '/accesos/dfe'
        },
        {
          name: 'DDJJ Presuntiva',
          icon: '',
          url: '/accesos/ddjj'
        }
      ]
    },
    {
      name: 'Cerrar Sesión',
      url: '/auth/logout',
      icon: 'icon-logout',
      variant: 'success'
    }
  ]
}
