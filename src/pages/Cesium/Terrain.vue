<template>
  <c3-map>
    <terrain-layer></terrain-layer>
  </c3-map>
</template>

<script>
import { C3Map, TerrainLayer } from "./../../components/Cesium/index.js";

export default {
  name: "",
  components: {
    C3Map,
    TerrainLayer
  },
  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang = 'scss' scoped >
</style>