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
    name: "detalle-impuesto-determinado-mobile",
    data() {
      return {
        items: [
            { tipo:"DeclaraciónJurada", Fecha: "2018/05/18", Formulario: 758, ImpuestoDeterminado: 1536.25, Estado: "Vigente", PeriodoBase: "", Comprobante: "ruta"   },
            { tipo:"DeclaraciónJurada", Fecha: "2018/05/18", Formulario: 758, ImpuestoDeterminado: 1536.25, Estado: "Vigente", PeriodoBase: "", Comprobante: "ruta"   },
            { tipo:"DeclaraciónJurada", Fecha: "2018/05/18", Formulario: 758, ImpuestoDeterminado: 1536.25, Estado: "Vigente", PeriodoBase: "", Comprobante: "ruta"   },
        ]
      }
    }
}
</script>

