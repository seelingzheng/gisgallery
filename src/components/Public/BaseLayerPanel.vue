<template>
  <div class="map-type">
    <p v-for="(item, index) in baseLayers" :key="index" @click="changeBaseLayer(item)">{{item.name}}</p>
  </div>
</template>

<script>
import { baseLayers } from "./../../base/config.js";
export default {
  name: "",

  data() {
    return {
      baseLayers: baseLayers
    };
  },

  methods: {
    changeBaseLayer(item) {
      this.$emit("changeLayer", item);
    }
  }
};
</script>

<style lang = 'scss' scoped >
.map-type {
  right: 10px;
  display: flex;
  flex-direction: row;
  position: absolute;
  z-index: 1000;
  p {
    cursor: pointer;
    padding: 10px;
  }
}
</style>