<template>
    <div class="b-tableMobile">
        <!-- <h1>detalle retenciones Mobile</h1> -->
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
    name: "detalle-retenciones-mobile",
    data() {
      return {
          //habria que convertir los numeros de CUITAgente en un String para que funcione y se vea con "-"
        items: [
            { NumeroDeCertificado: 12, Fecha: 120125422, CUITAgente: "33-85458785-9", Regimen: "Retenciones bancarias", Importe: 1321.25, Comprobante: "ruta"   },
            { NumeroDeCertificado: 12, Fecha: 120125422, CUITAgente: "33-85458785-9", Regimen: "Retenciones bancarias", Importe: 1321.25, Comprobante: "ruta"   },
            { NumeroDeCertificado: 12, Fecha: 120125422, CUITAgente: "33-85458785-9", Regimen: "Retenciones bancarias", Importe: 1321.25, Comprobante: "ruta"   },
            { NumeroDeCertificado: 12, Fecha: 120125422, CUITAgente: "33-85458785-9", Regimen: "Retenciones bancarias", Importe: 1321.25, Comprobante: "ruta"   },
            { NumeroDeCertificado: 12, Fecha: 120125422, CUITAgente: "33-85458785-9", Regimen: "Retenciones bancarias", Importe: 1321.25, Comprobante: "ruta"   },
            { NumeroDeCertificado: 12, Fecha: 120125422, CUITAgente: "33-85458785-9", Regimen: "Retenciones bancarias", Importe: 1321.25, Comprobante: "ruta"   },
            { NumeroDeCertificado: 12, Fecha: 120125422, CUITAgente: "33-85458785-9", Regimen: "Retenciones bancarias", Importe: 1321.25, Comprobante: "ruta"   },
            { NumeroDeCertificado: 12, Fecha: 120125422, CUITAgente: "33-85458785-9", Regimen: "Retenciones bancarias", Importe: 1321.25, Comprobante: "ruta"   },


        ]
      }
    }
}
</script>

