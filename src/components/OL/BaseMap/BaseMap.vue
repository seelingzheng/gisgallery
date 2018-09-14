<template>
  <div id="map" class="map"></div>
</template>

<script>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
<<<<<<< HEAD
import XYZ from "ol/source/XYZ";
import MultiTileLayer from "./../plugin/MultiTileLayer";
import { mapconfig } from "./../../../base/config.js";
=======

>>>>>>> master
export default {
  name: "",

  data() {
    return {};
  },
  mounted() {
<<<<<<< HEAD
    var xyzLayer = new XYZ({
      url: mapconfig.baseLayer_ol
    });

    var map = new Map({
      target: "map",
      layers: [
        // new TileLayer({
        //   source: new OSM()
        // })
        new TileLayer({
          source: xyzLayer
        })
      ],
      view: new View({
        projection: mapconfig.projection,
        center: mapconfig.center,
        zoom: mapconfig.zoom
=======
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
>>>>>>> master
      })
    });
  },

  methods: {}
};
<<<<<<< HEAD
</script>
=======
</script>

<style lang = 'scss' scoped >
.map {
  height: calc(100vh - 57px);
  width: 100%;
}
</style>
>>>>>>> master
