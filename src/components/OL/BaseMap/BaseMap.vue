<template>
  <div id="map" class="map"></div>
</template>

<script>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

export default {
  name: "",

  data() {
    return {};
  },
  mounted() {
    var map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        projection: "EPSG:4326",
        center: [104.060928, 30.662415],
        zoom: 12
      })
    });
  },

  methods: {}
};
</script>

<style lang = 'scss' scoped >
.map {
  height: calc(100vh - 57px);
  width: 100%;
}
</style>
