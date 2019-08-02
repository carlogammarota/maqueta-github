<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="4">
          <b-card-group style="margin-top: -50px">
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <img src="../../public/img/brand/logo.jpg" width="200" class="logo-login"/>
                  <h5 style="text-align: center">AGIP - DGR</h5>
                  <p class="text-muted login-secondary-text">Subdirección General de Sistematización de la Recaudación</p>
                   <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <input type="text" :value="nombreUsuario" @input="updateUser" class="form-control" v-on:keyup.enter="login" placeholder="CUIT">
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <input type="password" :value="contrasenia" @input="updatePassword" class="form-control" v-on:keyup.enter="login" placeholder="Contraseña">
                  </b-input-group>
                  <b-row>
                    <b-col cols="12" class="mx-auto">
                      <b-button variant="primary" class="active px-4" @click.stop="login">Ingresar</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<script>


import store from "@/store/index";


export default {
  name: 'login',
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    
  },
  mounted () {
  }
}

</script>
