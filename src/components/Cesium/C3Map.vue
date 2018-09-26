<template>
  <div class="cesiumContainer">
    <slot></slot>
  </div>
</template>

<script>
import Cesium from "cesium/Cesium";
import { c3config } from "./../../base/config.js";
export default {
  name: "",
  props: ["baselayer", "annolayer"],
  data() {
    return {
      viewer: null
    };
  },
  provide() {
    return {
      getCViewer: this.getCViewer
    };
  },

  mounted() {
    this.viewer = new Cesium.Viewer(this.$el, {
      animation: false, //动画控制不显示

      baseLayerPicker: true, //图层控制显示

      geocoder: false, //地名查找不显示

      timeline: false, //时间线不显示

      sceneModePicker: true, //投影方式显示

      baseLayerPicker: false,
      imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
        url: this.baselayer || c3config.baseLayer,
        layer: "tdtVecBasicLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "",
        show: false
      })
    });
    if (this.annolayer || c3config.annoLayer)
      this.viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider({
          url: this.annolayer || c3config.annoLayer,
          layer: "tdtAnnoLayer",
          style: "default",
          format: "image/jpeg",
          tileMatrixSetID: "GoogleMapsCompatible",
          show: false
        })
      );

    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(
        c3config.center[0],
        c3config.center[1],
        c3config.center[2]
      ),
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-35.0),
        roll: 0.0
      }
    });
  },
  methods: {
    getCViewer(found) {
      var vm = this;
      function checkCViewer() {
        if (vm.viewer) {
          found(vm.viewer);
        } else {
          setTimeout(checkCViewer, 100);
        }
      }
      checkCViewer();
    }
  }
};
</script>
<style lang="scss" scoped>
.cesiumContainer {
  width: 100%;
  height: calc(100vh - 72px);
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>


