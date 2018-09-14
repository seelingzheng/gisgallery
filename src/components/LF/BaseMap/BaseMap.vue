
<script>
import { mapconfig } from "./../../../base/config.js";
import L from "leaflet";

export default {
  name: "BaseMapLF",
  inject: ["getMap"],
  props: ["url", "minZoom", "maxZoom"],
  data() {
    return {
      mymap: null
    };
  },

  mounted() {
    let vm = this;
    vm.getMap(map => {
      vm.mymap = map;
      L.tileLayer(vm.url || mapconfig.baseLayer_lf, {
        subdomains: ["1", "2", "3", "4"],
        maxZoom: vm.maxZoom || 18,
        minZoom: vm.minZoom || 1
      }).addTo(vm.mymap);
    });
  },
  render(h) {
    return null;
  }
};
</script> 