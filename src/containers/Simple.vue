<template>
  <div class="app">
    <div class="app-body">
        <div class="container-fluid">
          <router-view :key="$route.fullPath"></router-view>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'simple',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    }
  }
}

</script>
