<template>
  <div id="threeDiv">
    <slot></slot>
  </div>
</template>

<script>
import * as THREE from "three";
export default {
  name: "",
  provide() {
    return {
      getThreeObj: this.getThreeObj
    };
  },
  data() {
    return {
      scene: null,
      camera: null,
      rednerer: null
    };
  },

  mounted() {
    this.initScene();
  },

  methods: {
    initScene() {
      this.scene = new THREE.Scene();
      this.initCamera();
    },
    initCamera() {
      var width = this.$el.clientWidth;
      var height = this.$el.clientHeight;
      this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
      this.camera.position.x = -500;
      this.camera.position.y = 500;
      this.camera.position.z = -500;
      this.initThree();
    },
    initThree() {
      var width = this.$el.clientWidth;
      var height = this.$el.clientHeight;
      // 实例化 THREE.WebGLRenderer 对象。
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: this.renderer
      });
      // 设置 renderer 的大小
      this.renderer.setSize(width, height);
      // 挂载到准备的 domElement 上
      this.$el.appendChild(this.renderer.domElement);
      // Sets the clear color and opacity.
      this.renderer.setClearColor(0x000000, 1.0);
    },
    getThreeObj(found) {
      var vm = this;
      function checkThreeObj() {
        if (vm.scene && vm.camera && vm.renderer) {
          found(vm.scene, vm.camera, vm.renderer);
        } else {
          setTimeout(checkThreeObj, 100);
        }
      }
      checkThreeObj();
    }
  }
};
</script>

<style lang = 'scss' scoped >
div#threeDiv {
  border: none;
  cursor: pointer;
  width: 100%;
  height: 100vh;
  background-color: #eeeeee;
}
</style>