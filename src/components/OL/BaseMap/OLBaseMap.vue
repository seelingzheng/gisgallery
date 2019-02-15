<template>

  <div
    id="map"
    class="map"
  >

  </div>
</template>

<script>
import { Map, View } from "ol";
import LayerGroup from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";
import TileGrid from "ol/tilegrid/TileGrid";
import TileImage from "ol/source/TileImage";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import MultiTileLayer from "./../plugin/MultiTileLayer";
import BaseLayerPanel from "./../../Public/BaseLayerPanel";
import { mapconfig } from "./../../../base/config.js";
export default {
  name: "",
  props: ["maptype"],
  data() {
    return {
      map: null,
      tilegrid: null
    };
  },
  components: { BaseLayerPanel },
  watch: {
    maptype: function(nVal, oVal) {
      this.setLayers(nVal);
    }
  },
  mounted() {
    // 自定义分辨率和瓦片坐标系
    var resolutions = [];
    var maxZoom = 18;
    // 计算百度使用的分辨率
    for (var i = 0; i <= maxZoom; i++) {
      resolutions[i] = Math.pow(2, maxZoom - i); //(幂运算)
    }
    this.tilegrid = new TileGrid({
      // origin: [43.88955327932, 12.590178885765], // 设置原点坐标
      origin: [0, 0], // 设置原点坐标
      resolutions: resolutions // 设置分辨率
    });

    var vm = this;
    var xyzLayer = new XYZ({
      url: mapconfig.baseLayer_ol
    });

    this.map = new Map({
      target: this.$el,
      layers: [
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
    this.setLayers(this.maptype);
  },

  methods: {
    clearLayers() {
      this.map.getLayers().forEach(layer => {
        this.map.removeLayer(layer);
      });
    },
    setLayers(type) {
      var vm = this;
      vm.clearLayers();
      if (type == "baiduimage") {
        var bdimage = new TileLayer({
          source: vm.getBaiduSourceRaster()
        });

        var baidulabel = new TileLayer({
          source: vm.getBaiduSourceLabel()
        });
        var gl = new LayerGroup({
          layers: [bdimage, baidulabel]
        });
        vm.map.addLayer(gl);
      } else if (type == "baidu") {
        var baidu = new TileLayer({
          source: vm.getBaiduSource() //
        });
        var baidulabel = new TileLayer({
          source: vm.getBaiduSourceLabel()
        });
        var gl = new LayerGroup({
          layers: [baidu, baidulabel]
        });
        vm.map.addLayer(gl);
      } else if (type == "tianditu") {
        vm.addLayers([
          "http://t" +
            parseInt(Math.random() * 10) +
            ".tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}",
          "http://t" +
            parseInt(Math.random() * 10) +
            ".tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}"
        ]);
      } else if (type == "tiandituimage") {
        vm.addLayers([
          "http://t" +
            parseInt(Math.random() * 10) +
            ".tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}",
          "http://t" +
            parseInt(Math.random() * 10) +
            ".tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}"
        ]);
      } else if (type == "gaode") {
        var url =
          "http://webrd0" +
          parseInt(Math.random() * 4) +
          ".is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}";
        vm.addLayer();
      } else if (type == "gaodeimage") {
        vm.addLayers([
          "http://webst0" +
            parseInt(Math.random() * 4) +
            ".is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
          "http://webst0" +
            parseInt(Math.random() * 4) +
            ".is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}"
        ]);
      } else if (type == "google") {
        //谷歌行政区划
        vm.addLayer(
          "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
        );
      } else if (type == "googleimage") {
        //谷歌影像

        vm.addLayer(
          "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
        );
      }
    },

    addLayer(url) {
      var layer = new TileLayer({
        source: new XYZ({
          url: url
        })
      });
      this.map.addLayer(layer);
    },
    addLayers(urls) {
      var layers = [];
      if (urls && urls.length > 0) {
        urls.forEach(url => {
          var layer = new TileLayer({
            source: new XYZ({
              url: url
            })
          });
          layers.push(layer);
        });
      }
      var gl = new LayerGroup({
        layers: layers
      });
      this.map.addLayer(gl);
    },

    getBaiduSource() {
      // 创建百度地图的数据源
      var baiduSource = new TileImage({
        projection: "EPSG:3857",
        tileGrid: this.tilegrid,
        tileUrlFunction: function(tileCoord, pixelRatio, proj) {
          var z = tileCoord[0];
          var x = tileCoord[1];
          var y = tileCoord[2];

          // 百度瓦片服务url将负数使用M前缀来标识
          if (x < 0) {
            x = "M" + -x;
          }
          if (y < 0) {
            y = "M" + -y;
          }

          // src="http://online4.map.bdimg.com/tile/?qt=tile&x=393&y=151&z=11&styles=pl&scaler=2&udt=20180926"
          return (
            "http://online" +
            parseInt(Math.random() * 10) +
            ".map.bdimg.com/tile/?qt=tile&x=" +
            x +
            "&y=" +
            y +
            "&z=" +
            z +
            "&styles=pl&udt=20180926&scaler=2&p=0"
          );
        }
      });

      return baiduSource;
    },
    getBaiduSourceRaster() {
      // 百度影像
      var baiduSourceRaster = new TileImage({
        projection: "EPSG:3857",
        tileGrid: this.tilegrid,
        tileUrlFunction: function(tileCoord, pixelRatio, proj) {
          var z = tileCoord[0];
          var x = tileCoord[1];
          var y = tileCoord[2];

          // 百度瓦片服务url将负数使用M前缀来标识
          if (x < 0) {
            x = "M" + -x;
          }
          if (y < 0) {
            y = "M" + -y;
          }

          return (
            "http://shangetu" +
            parseInt(Math.random() * 10) +
            ".map.bdimg.com/it/u=x=" +
            x +
            ";y=" +
            y +
            ";z=" +
            z +
            ";v=009;type=sate&fm=46&udt=20180926"
          );
        }
      });
      return baiduSourceRaster;
    },
    getBaiduSourceLabel() {
      // 百度标注
      var baiduSourceLabel = new TileImage({
        projection: "EPSG:3857",
        tileGrid: this.tilegrid,
        tileUrlFunction: function(tileCoord, pixelRatio, proj) {
          var z = tileCoord[0];
          var x = tileCoord[1];
          var y = tileCoord[2];

          // 百度瓦片服务url将负数使用M前缀来标识
          if (x < 0) {
            x = "M" + -x;
          }
          if (y < 0) {
            y = "M" + -y;
          }
          //online0.map.bdimg.com/tile/?qt=vtile&x=786&y=304&z=12&styles=sl&udt=20180926
          http: return (
            "http://online" +
            parseInt(Math.random() * 10) +
            ".map.bdimg.com/tile/?qt=vtile&x=" +
            x +
            "&y=" +
            y +
            "&z=" +
            z +
            "&styles=sl&udt=20180926&scaler=1&p=1"
          );
        }
      });
      return baiduSourceLabel;
    }
  },
  beforeDestroy() {
    this.map = null;
  }
};
</script>
<style scoped>
.map {
  height: calc(100vh);
}
</style>

