<template>
  <div class="map">
    <slot></slot>
  </div>
</template>

<script>
import { mapconfig } from "./../../../base/config.js";
import { reverse } from "lodash";
import L from "leaflet";

export default {
  name: "LMap",
  props: ["zoom"],
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.map = L.map(this.$el, {
      center: reverse(mapconfig.center),
      zoom: this.zoom || mapconfig.zoom
    });
  },
  provide() {
    return {
      getMap: this.getMap
    };
  },
  methods: {
    getMap(found) {
      var vm = this;
      function checkForMap() {
        if (vm.map) {
          found(vm.map);
        } else {
          setTimeout(checkForMap, 100);
        }
      }
      checkForMap();
    }
  }
};
</script>

<style lang = 'scss' scoped >
.map {
  width: 100%;
  height: calc(100vh - 57px);
}
</style>