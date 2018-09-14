  
<script>
import L from "leaflet";
import { _tilesUrl } from "../../../base/tiles";
import "./../plugin/leaflet-hash.js";
import { mapconfig } from "../../../base/config";
import { reverse } from "lodash";
export default {
  name: "",
  inject: ["getMap"],
  data() {
    return {
      lastUrl: ""
    };
  },

  mounted() {
    var vm = this;
    var WhateverTileLayer = L.TileLayer.extend({
      _tileUrls: {},

      getTileUrl: function(coords) {
        var data = {
          r: L.Browser.retina ? "@2x" : "",
          s: this._getSubdomain(coords),
          x: coords.x,
          y: coords.y,
          z: this._getZoomForUrl()
        };
        if (this._map && !this._map.options.crs.infinite) {
          var invertedY = this._globalTileRange.max.y - coords.y;
          if (this.options.tms) {
            data["y"] = invertedY;
          }
          data["-y"] = invertedY;
        }

        var i = -1;
        while (i < 0 || (this._url[i].length >= 5 && this._url[i][4] < data.z))
          i = Math.floor(Math.random() * this._url.length);
        this._tileUrls[data.x + "," + data.y + "," + data.z] = i;
        return L.Util.template(
          this._url[i][0],
          L.Util.extend(data, this.options)
        );
      },

      getTileData: function(latlng) {
        var zoom = this._getZoomForUrl();
        // make sure lat/long values are constrained to +-90,+-180 so that a popup is displayed when users pan across the entire world
        var wrappedLatLng = latlng.wrap();
        var pixel = map.project(wrappedLatLng, zoom).floor();
        var tileSize = this.getTileSize();
        var coords = pixel.unscaleBy(tileSize).floor();
        var i = this._tileUrls[coords.x + "," + coords.y + "," + zoom];
        return this._url[i];
      }
    });

    // var map = L.map("map", { minZoom: 3, maxZoom: 18 }).setView(
    //   reverse(mapconfig.center),
    //   mapconfig.zoom
    // );
    vm.getMap(map => {
      vm.map = map;
      map.attributionControl.setPrefix("");
      var whateverLayer = new WhateverTileLayer(_tilesUrl, {
        attribution:
          'Map &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> | Click on the map for tile authors',
        tfkey: "41f4f936f1d148f69cbd100812875c88",
        mbkey:
          "pk.eyJ1IjoienZlcmlrIiwiYSI6IjVLMGxwbGsifQ.pdb83NbjTrfl9ibbdjPSsg"
      }).addTo(map);
      var hash = new L.Hash(map);
      this.lastUrl = "";
      map.on("click", function(e) {
        var data = whateverLayer.getTileData(e.latlng);
        if (!data) return;
        if (this.lastUrl == data[0]) {
          map.closePopup();
          this.lastUrl = "";
        } else {
          this.lastUrl = data[0];
          map.openPopup(
            "<b>" +
              data[1] +
              '</b><br>&copy; <a target="owm" href="' +
              data[3] +
              '">' +
              data[2] +
              "</a><br><br>To use the layer, copy this template URL and the attribution above:<br>" +
              data[0],
            e.latlng
          );
        }
      });
      map.on("zoomstart", function() {
        map.closePopup();
        this.lastUrl = "";
      });
    });
  },
  render(h) {
    return null;
  }
};
</script>

 