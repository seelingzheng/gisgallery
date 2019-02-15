<template>
  <div>
    <base-layer-panel @changeLayer="changeLayer"></base-layer-panel>
    <base-map
      v-if="maptype!==null"
      :maptype="maptype"
    ></base-map>
  </div>
</template>

<script>
import { BaseLayerPanel } from "./../../components/Public/index.js";
import BaseMap from "./../../components/OL/BaseMap";

export default {
  name: "BaseMapPage",
  components: {
    BaseMap,
    BaseLayerPanel
  },

  data() {
    return {
      maptype: null
    };
  },
  mounted() {
    this.maptype = "baidu";
  },
  methods: {
    changeLayer(item) {
      this.maptype = item.type;
    }
  },
  beforeDestroy() {
    this.maptype = null;
  }
};
</script>
 