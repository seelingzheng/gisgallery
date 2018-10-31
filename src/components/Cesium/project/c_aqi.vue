

<script>
import Cesium from "cesium/Cesium";
import { CEntities, aqi } from "./../../../mixins";
import { mapconfig } from "./../../../base/config.js";
// import { toUper } from "lodash";
export default {
  name: "",
  inject: ["getCViewer"],
  mixins: [CEntities, aqi],
  data() {
    return {
      viewer: null
    };
  },
  mounted() {
    var vm = this;
    vm.getCViewer(viewer => {
      vm.viewer = viewer;

      //   setTimeout(() => {
      //     vm.getAqi(vm.getBoundsStr());
      //   }, 10000);
      //相机移动事件
      viewer.scene.camera.moveEnd.addEventListener(function() {
        //获取当前相机高度
        // height = Math.ceil(earth.camera.positionCartographic.height);
        if (vm.getBoundsStr()) vm.getAqi(vm.getBoundsStr());
      });
    });
  },
  methods: {
    getBoundsStr() {
      var bounds = this.getBounds();
      if (!bounds) return "";
      var boundsStr = [
        bounds.se[1],
        bounds.nw[0],
        bounds.nw[1],
        bounds.se[0]
      ].join(",");
      return boundsStr;
    },
    getBounds() {
      var pt1 = new Cesium.Cartesian2(0, 0);
      var pt2 = new Cesium.Cartesian2(
        this.$el.parentElement.clientWidth,
        this.$el.parentElement.clientHeight
      );

      var pick1 = this.viewer.scene.globe.pick(
        this.viewer.camera.getPickRay(pt1),
        this.viewer.scene
      );
      var pick2 = this.viewer.scene.globe.pick(
        this.viewer.camera.getPickRay(pt2),
        this.viewer.scene
      );

      if (!pick1 || !pick2) return "";
      //将三维坐标转成地理坐标
      var geoPt1 = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(
        pick1
      );
      var geoPt2 = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(
        pick2
      );

      //地理坐标转换为经纬度坐标
      var point1 = [
        (geoPt1.longitude / Math.PI) * 180,
        (geoPt1.latitude / Math.PI) * 180
      ];
      var point2 = [
        (geoPt2.longitude / Math.PI) * 180,
        (geoPt2.latitude / Math.PI) * 180
      ];
      return {
        nw: point1,
        se: point2
      };
    },
    getAqi(bounds) {
      var vm = this;
      vm.viewer.entities.removeAll();
      this.http.getAqi(bounds).then(res => {
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

          var color = vm.getAqiColor(aqi).toUpperCase();
          var text = vm.getAqiText(aqi);
          var tips = cityName + " " + aqi;

          var latlng = [data["lat"], data["lon"]];

          var option = {
            name: cityName,
            lng: latlng[1],
            lat: latlng[0],
            alt: 0,
            length: vm.getAqiLength(aqi),
            color: color,
            aqi: aqi
          };
          console.log(option);
          vm.addCylinederEntityLabel(vm.viewer, option);
        });
        // vm.viewer.zoomTo(vm.viewer.entities);
      });
    }
  },
  render(h) {
    return null;
  }
};
</script>
