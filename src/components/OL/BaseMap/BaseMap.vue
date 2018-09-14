<template>
  <div id="map" class="map"></div>
</template>

<script>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import MultiTileLayer from "./../plugin/MultiTileLayer";
import { mapconfig } from "./../../../base/config.js";
export default {
  name: "",

  data() {
    return {};
  },
  mounted() {
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
      })
    });
  },

  methods: {}
};
</script>
