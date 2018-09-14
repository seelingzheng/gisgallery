<template>
  <l-map>
    <multi-base-map></multi-base-map>
  </l-map>
</template>

<script>
import "./../../../../node_modules/leaflet/dist/leaflet.css";
import { LMap } from "./../../../components/LF/components";

import { MultiBaseMap } from "./../../../components/LF/BaseMap";
export default {
  name: "MultiBaseMapPage_LF",

  components: {
    LMap,
    MultiBaseMap
  },
  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang = 'scss' scoped >
</style>