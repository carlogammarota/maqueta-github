<template>
    <div class="b-tableMobile">
        <b-table stacked :items="data" >
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
    name: "TablaResponsive",
    props:["data"],
    data() {
      return {
      
      }
    }
}
</script>

