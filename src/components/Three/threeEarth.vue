<script>
import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import earth from "./../../assets/three/earth.jpg";
import clouds from "./../../assets/three/clouds.jpg";
export default {
  name: "",
  inject: ["getThreeObj"],
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      cloudsMesh: null,
      earthMesh: null,
      controls: null,
      earth,
      clouds
    };
  },
  mounted() {
    var vm = this;

    vm.getThreeObj((scene, camera, renderer) => {
      vm.scene = scene;
      vm.camera = camera;
      vm.renderer = renderer;
      vm.initEarth();
      vm.initClouds();
      vm.initLight();
      vm.controls = new OrbitControls(camera, renderer.domElement);
      renderer.clear();
      vm.animate();
    });
  },
  methods: {
    initClouds() {
      // 实例化一个球体，半径要比地球的大一点，从而实现云飘咋地球上的感觉
      var cloudsGeo = new THREE.SphereGeometry(250, 100, 100);

      // transparent 与 opacity 搭配使用，设置材质的透明度，当 transparent 设为 true 时， 会对材质特殊处理，对性能会有些损耗。
      var cloudsMater = new THREE.MeshPhongMaterial({
        alphaMap: new THREE.TextureLoader().load(this.clouds),
        transparent: true,
        opacity: 0.2
      });
      this.cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMater);
      this.scene.add(this.cloudsMesh);
    },
    initEarth() {
      // 实例化一个半径为 200 的球体
      var earthGeo = new THREE.SphereGeometry(200, 100, 100);
      var earthMater = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load(this.earth)
      });
      this.earthMesh = new THREE.Mesh(earthGeo, earthMater);
      this.scene.add(this.earthMesh);
    },
    initLight() {
      // A light source positioned directly above the scene, with color fading from the sky color to the ground color.
      // 位于场景正上方的光源，颜色从天空颜色渐变为地面颜色。
      var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
      this.scene.add(light);

      // 环境光
      var light = new THREE.AmbientLight(0xffffff);
      light.position.set(100, 100, 200);
      this.scene.add(light);

      // 平行光
      // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
      light = new THREE.DirectionalLight(0xffffbb, 1);
      light.position.set(-1, 1, 1);
      this.scene.add(light);
    },
    animate() {
      this.controls.update();
      // 地球自转
      this.earthMesh.rotation.y -= 0.002;
      // 漂浮的云层
      this.cloudsMesh.rotation.y -= 0.005;
      this.cloudsMesh.rotation.z += 0.005;
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    }
  },
  render(h) {
    return null;
  }
};
</script>

<style lang = 'scss' scoped >
</style>