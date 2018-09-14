<template>
  <l-map zoom='10'>
    <base-map :url='url'></base-map>
    <a-q-i-report></a-q-i-report>
  </l-map>
</template>

<script>
import "./../../../../node_modules/leaflet/dist/leaflet.css";
import { LMap } from "./../../../components/LF/components";

import { AQIReport } from "./../../../components/LF/Project";
import { BaseMap } from "./../../../components/LF/BaseMap";

export default {
  components: {
    LMap,
    BaseMap,
    AQIReport
  },
  data() {
    return {
      url:
        "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"
    };
  },
  mounted() {},

  methods: {}
};
</script>

<style lang = 'scss' scoped >
</style>