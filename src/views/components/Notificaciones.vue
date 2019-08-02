<template>
    <b-nav-item class="d-md-down-none">
          <i class="icon-bell"></i>
          <el-popover placement="bottom" width="400" trigger="click">
            <div class="padding-20 bg-light-blue">
              <h2>Notificaciones ({{itemsCount}})</h2>
              <button @click="botonDeTest()">BOTON TEST</button>
              <v-divider></v-divider>
              <div v-for="item in items" :key="item.descripcion">
                <b-row>
                  <b-col cols="2">
                    <i class="icon-bell padding-icon green-color"></i>
                  </b-col>
                  <b-col cols="8">
                    <h6>{{ item.mensaje }}</h6>
                  </b-col>
                  <b-col cols="2" class="text-right">
                    <b-link to>
                      <i class="fas fa-eye padding-icon blue-color fs-13"></i>
                    </b-link>
                  </b-col>
                </b-row>
                <v-divider></v-divider>
              </div>
            </div>
            <b-badge slot="reference" pill variant="info">{{itemsCount}}</b-badge>
          </el-popover>
        </b-nav-item>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
    name: "notificaciones",
    data() {
        return {
        // items: [
        //     { descripcion: "Hemos registrado su pago - Automotores 2019, cuota 2." }
        // ],
        popover: "false"
        }
  },
    mounted() {
        this.$store.commit('notificaciones/loadItems')
  },
    methods:{
        botonDeTest(){
            this.$store.commit("notificaciones/addItemTest", { icono: "" ,mensaje: "este es un mensaje de test", link: "" })
        }
    },

    computed: {
        ...mapGetters({items: 'notificaciones/getItems', itemsCount: 'notificaciones/getItemsCount'})
    }
}
</script>

