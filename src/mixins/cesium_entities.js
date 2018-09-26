import Cesium from "cesium/Cesium";
export default {
  methods: {
    addCylinederEntity(viewer, params) {

      return viewer.entities.add({ //Cylinder圆柱体
        name: 'Green cylinder with black outline',
        position: Cesium.Cartesian3.fromDegrees(params.lng, params.lat, params.alt),
        cylinder: {
          length: params.length,
          topRadius: params.radius || 100, //圆柱体的顶部半径。
          bottomRadius: params.radius || 100, //    圆柱体底部的半径。
          material: Cesium.Color[params.color].withAlpha(0.5) //绿色半透明
          // outline: true, //轮廓
          // outlineColor: Cesium.Color.DARK_GREEN //轮廓颜色深绿色
        }
      });
    }
  }
}