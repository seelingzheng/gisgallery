<template>
  <c3-map :options="options">
    <splitlayer></splitlayer>
  </c3-map>
</template>

<script>
import { C3Map, Splitlayer } from "./../../components/Cesium/index.js";
export default {
  name: "",
  components: { C3Map, Splitlayer },
  data() {
    return {
      options: {
        baseLayer:
          "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles"
        // center: [104.060928, 30.662415, 0]
      }
    };
  },

  methods: {}
};
</script>

<style lang = 'scss' scoped >
</style>
