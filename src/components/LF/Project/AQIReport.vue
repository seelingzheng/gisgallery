<template>

  <l-tips id="lftips" :tipsvalue='tipsvalue'></l-tips>

</template>

<script>
import Vue from "vue";
import L from "leaflet";
import { LTips } from "./../components/index.js";
import aqi from "./../../../mixins/aqi.js";

export default {
  inject: ["getMap"],
  mixins: [aqi],
  components: {
    LTips
  },
  data() {
    return {
      map: null,
      layerGroup: null,
      tipsvalue: null,
      markers: {},
      currentMarker: null
    };
  },
  mounted() {
    var vm = this;
    vm.getMap(map => {
      vm.map = map;
      if (!this.layerGroup) {
        this.layerGroup = L.layerGroup();
        this.layerGroup.addTo(map);
      }
      vm.retloadAqi(map);
      map.on("movestart", () => {
        vm.hideMarkerTips();
      });
      map.on("moveend", () => {
        if (map.getZoom() <= 9) vm.retloadAqi(map);
      });
    });
  },
  methods: {
    getBoundsStr(map) {
      var bounds = map.getBounds();
      var nw = bounds.getNorthWest();
      var se = bounds.getSouthEast();
      return [se.lat, nw.lng, nw.lat, se.lng].join(",");
    },
    retloadAqi(map) {
      let vm = this;
      vm.getAqi(vm.getBoundsStr(map));
    },

    getAqi(bounds) {
      var vm = this;
      this.http.getAqi(bounds).then(res => {
        vm.layerGroup.clearLayers();
        vm.markers = {};
        res.data.forEach(function(data) {
          var aqi = data["aqi"] * 1;
          var pol = data["pol"];
          var utime = data["utime"];
          var tz = data["tz"];
          var cityName = data["city"];
          var cityName =
            cityName.indexOf("(") > -1
              ? cityName.split("(")[1].replace(")", "")
              : cityName;

          var color = vm.getAqiColor(aqi);
          var text = vm.getAqiText(aqi);
          var tips = cityName + " " + aqi;
          var myIcon = L.icon({
            iconUrl: vm.getIcon(aqi),
            iconSize: [24, 24],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
          });

          var latlng = [data["lat"], data["lon"]];
          var m = L.marker(latlng, { icon: myIcon }).addTo(vm.layerGroup);
          vm.markers[m._zIndex] = {
            cityName,
            aqi,
            pol,
            utime,
            tz,
            color,
            text,
            latlng
          };
          m.on("click", function(e) {
            vm.tipsvalue = vm.markers[e.sourceTarget._zIndex];
            if (vm.tipsvalue) vm.showMarkerTips(vm.tipsvalue.latlng);
          });
        });
      });
    },
    getPoint(latlng) {
      var layerPoint = this.map.latLngToLayerPoint(latlng);
      var point = this.map.layerPointToContainerPoint(layerPoint);
      return point;
    },
    showMarkerTips(latlng) {
      var dom = this.$el; // document.getElementById("lftips");

      this.$nextTick(() => {
        var point = this.getPoint(latlng);
        dom.style.left = point.x - 300 / 2 + "px";
        dom.style.top = point.y - 200 * 1.5 + "px";
        dom.style.display = "block";
      });
    },
    hideMarkerTips() {
      var dom = this.$el;
      if (dom) {
        dom.style.left = "-1000px";
        dom.style.top = "-1000px";
        dom.style.display = "none";
      }
    }
  }

  // render(h) {
  //   return null;
  // }
};
</script>
