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
  props: ["baselayer", "annolayer", "options"],
  data() {
    return {
      viewer: null,
      _options: null
    };
  },
  provide() {
    return {
      getCViewer: this.getCViewer
    };
  },

  mounted() {
    this._options = this.options ? this.options : c3config;

    this.viewer = new Cesium.Viewer(this.$el, {
      animation: false, //动画控制不显示

      baseLayerPicker: true, //图层控制显示

      geocoder: false, //地名查找不显示

      timeline: false, //时间线不显示

      sceneModePicker: true, //投影方式显示

      baseLayerPicker: false,
      imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
        url: this.baselayer || this._options.baseLayer || c3config.baseLayer,
        layer: "tdtVecBasicLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "",
        show: false
      })
    });
    if (this.annolayer || this._options.annoLayer)
      this.viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider({
          url: this.annolayer || this._options.annoLayer,
          layer: "tdtAnnoLayer",
          style: "default",
          format: "image/jpeg",
          tileMatrixSetID: "GoogleMapsCompatible",
          show: false
        })
      );

    if (this._options.center) {
      let _flytoOption = {
        destination: Cesium.Cartesian3.fromDegrees(
          this._options.center[0],
          this._options.center[1],
          this._options.center[2]
        ),
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-35.0),
          roll: 0.0
        }
      };
      this.viewer.camera.flyTo(_flytoOption);
    }
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
  position: relative;
  width: 100%;
  height: calc(100vh - 72px);
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>


