<template>
  <l-map>
    <base-map></base-map>
  </l-map>
</template>

<script>
import "./../../../../node_modules/leaflet/dist/leaflet.css";
import { LMap } from "./../../../components/LF/components";
import { BaseMap } from "./../../../components/LF/BaseMap";
export default {
  name: "BaseMapPage_LF",

  components: {
    LMap,
    BaseMap
  },
  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang = 'scss' scoped >
</style>