<template>
  <div class="cesiumContainer">
    <slot></slot>
  </div>
</template>

<script>
import Cesium from "cesium/Cesium";
export default {
  name: "",
  data() {
    return {
      viewer: null
    };
  },
  provide() {
    return {
      getCViewr: this.getCViewr
    };
  },

  mounted() {
    this.viewer = new Cesium.Viewer(this.$el);
  },
  methods: {
    getCViewr(found) {
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


