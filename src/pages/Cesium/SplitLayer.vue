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
          "http://wprd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={TileCol}&y={TileRow}&z={TileMatrix}"
        // center: [104.060928, 30.662415, 0]
      }
    };
  },

  methods: {}
};
</script>

<style lang = 'scss' scoped >
</style>
