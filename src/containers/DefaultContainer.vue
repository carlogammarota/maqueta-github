<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile/>
      <b-link class="navbar-brand" to="/inicio">
        <img class="navbar-brand-full" src="img/brand/logo-sidebar.jpg" width="85" alt="AGIP">
        <img style="margin-left: -7px;"
          class="navbar-brand-minimized"
          src="img/brand/logo-symbol.png"
          width="30"
          height="30"
          alt="AGIP"
        >
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg"/>
      <b-navbar-nav class="d-md-down-none">
        <!-- <b-nav-item class="px-3" to="/auth/claveciudad">Cerrar Sesión</b-nav-item> -->
        <!-- items navbar left-->
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <!-- items navbar right-->
        <notificaciones></notificaciones>
        <b-nav-item class="d-md-down-none" style="margin: 0px -25px 0px 50px;" disabled>
          <span class="fs-11 bold">{{contribuyentes.CUIT}}</span>
        </b-nav-item>
        <b-nav-item class="d-md-down-none" style="margin: 0px 40px;">
          <i class="icon-user"></i>
            <span style="padding: 0px 10px; font-size: 11px; font-weight: 700;">{{contribuyentes.nombre}}</span>
          <b-link to="">
            <span style="padding: 0px 10px; font-size: 11px; font-weight: 700;">Cerrar sesión</span>
          </b-link>
        </b-nav-item>
      </b-navbar-nav>
      <!-- <AsideToggler class="d-none d-lg-block" /> -->
      <!-- <AsideToggler class="d-lg-none" mobile /> -->
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <!--Sidebar rigth-->
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="this.$store.getters['nav/getNav'].items"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view :key="$route.fullPath"></router-view>
        </div>
      </main>
      <!-- <AppAside fixed>
        <DefaultAside/>
      </AppAside>-->
    </div>
    <TheFooter>
      <!--footer-->
      <div>
        <a href="http://www.agip.gob.ar" target="_blank">AGIP - DGR</a>
        <span class="ml-1 foo-text">&copy; 2019 Administración Gubernamental de Ingresos Públicos.</span>
      </div>
      <span class="sgr ml-auto">SGSR</span>
    </TheFooter>
  </div>
</template>

<script>
import nav from "@/_nav";
import {
  Header as AppHeader,
  SidebarToggler,
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  SidebarNav,
  Aside as AppAside,
  AsideToggler,
  Footer as TheFooter,
  Breadcrumb
} from "@coreui/vue";
import DefaultAside from "./DefaultAside";
import DefaultHeaderDropdownAccnt from "./DefaultHeaderDropdownAccnt";
import Notificaciones from "../views/components/Notificaciones"
import store from "@/store/index";
import { mapState, mapGetters } from "vuex";
export default {
  name: "DefaultContainer",
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    Notificaciones
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
          contribuyentes: 'contribuyentes/getFilterTodos',
        }),
    name() {
      return this.$route.name
    },
    list() {
      return this.$route.matched.filter(
        route => route.name || route.meta.label
      );
    },
    
  },
  mounted() {
    this.$store.commit('contribuyentes/loadItems')
  }
};
</script>
