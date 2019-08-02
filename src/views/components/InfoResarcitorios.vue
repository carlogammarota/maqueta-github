<template>
 <el-popover
    placement="top-start"
    title="Intereses Resarcitorios"
    width="200"
    trigger="hover"
    content="Los intereses resarcitorios se calculan a partir de la fecha de vencimiento hasta la fecha actual o hasta la fecha demanda, en el caso de que existiera.">
    <i class="fas fa-info-circle pl-10 fs-12 padding-icon"></i>
  </el-popover>
</template>

<script>
import store from "@/store/index"

export default {
  name: "info-resarcitorios",
  data() {
    return {
    };
  },
  methods: {},
  computed: {},
  mounted() {}
};
</script>