 <script>
import Cesium from "cesium/Cesium";
export default {
  name: "",
  inject: ["getCViewer"],
  data() {
    return {};
  },
  mounted() {
    this.getCViewer(viewer => {
      viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
        url: "https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles",
        requestWaterMask: true,
        requestVertexNormals: true
      });
      //生成等高线：
      var contourUniforms = {};
      material = Cesium.Material.fromType("ElevationContour");
      contourUniforms = material.uniforms;
      contourUniforms.width = 1;
      contourUniforms.spacing = 500;
      contourUniforms.color = Cesium.Color.RED;

      Material.fromType = function(type, uniforms) {
        if (!defined(Material._materialCache.getMaterial(type))) {
          throw new DeveloperError(
            "material with type '" + type + "' does not exist."
          );
        }

        var material = new Material({
          fabric: {
            type: type
          }
        });

        if (defined(uniforms)) {
          for (var name in uniforms) {
            if (uniforms.hasOwnProperty(name)) {
              material.uniforms[name] = uniforms[name];
            }
          }
        }

        return material;
      };
      //高程设色如下：
      var shadingUniforms = {};
      material = Cesium.Material.fromType("ElevationRamp");
      shadingUniforms = material.uniforms;
      shadingUniforms.minHeight = -414.0;
      shadingUniforms.maxHeight = 8777;
      //坡度设色如下：
      var shadingUniforms = {};
      material = Cesium.Material.fromType("SlopeRamp");
      shadingUniforms = material.uniforms;

      //二者都需要为shadingUniforms变量添加一个色表：
      shadingUniforms.image = getColorRamp(selectedShading);

      var elevationRamp = [0.0, 0.045, 0.1, 0.15, 0.37, 0.54, 1.0];
      var slopeRamp = [0.0, 0.29, 0.5, Math.sqrt(2) / 2, 0.87, 0.91, 1.0];
      function getColorRamp(selectedShading) {
        var ramp = document.createElement("canvas");
        ramp.width = 100;
        ramp.height = 1;
        var ctx = ramp.getContext("2d");

        var values =
          selectedShading === "elevation" ? elevationRamp : slopeRamp;

        var grd = ctx.createLinearGradient(0, 0, 100, 0);
        grd.addColorStop(values[0], "#000000"); //black
        grd.addColorStop(values[1], "#2747E0"); //blue
        grd.addColorStop(values[2], "#D33B7D"); //pink
        grd.addColorStop(values[3], "#D33038"); //red
        grd.addColorStop(values[4], "#FF9742"); //orange
        grd.addColorStop(values[5], "#ffd700"); //yellow
        grd.addColorStop(values[6], "#ffffff"); //white

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 100, 1);

        return ramp;
      }
    });
  },
  methods: {},
  render(h) {
    return null;
  }
};
</script>

<style lang = 'scss' scoped >
</style>