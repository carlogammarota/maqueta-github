<template>
    <div class="b-tableMobile">
        <b-table stacked :items="items" >
            <template slot-scope slot="Comprobante">
                    <b-link class="obligacion-icon" to="/comprobantes/ticket">
                      <i class="far fa-file-alt size-3x"></i>
                    </b-link>
            </template>
        </b-table>
    </div>
</template>
<script>
export default {
    name: "detalle-pagos-cancelaciones-mobile",
    data() {
      return {
          //habria que convertir los numeros de CUITAgente en un String para que funcione y se vea con "-"
        items: [
            { transacción: 120125422, Fecha: "2018/05/12", Formulario: 151, descripción: "Pago", Importe: 621, Comprobante: "ruta"   },
            { transacción: 120125422, Fecha: "2018/05/12", Formulario: 151, descripción: "Pago", Importe: 621, Comprobante: "ruta"   },
            { transacción: 120125422, Fecha: "2018/05/12", Formulario: 151, descripción: "Pago", Importe: 621, Comprobante: "ruta"   },

        ]
      }
    }
}
</script>

