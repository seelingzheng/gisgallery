<template>
  <div class="tips" :style="{'background-color':tipsvalue&&tipsvalue.color}" style="z-index:1010;">
    <p>城市：{{tipsvalue&&tipsvalue.cityName}}</p>
    <p>AQI：{{tipsvalue&&tipsvalue.aqi}}</p>
    <p>AQI类别：{{tipsvalue&&tipsvalue.text}}</p>
    <p>主要污染物：{{tipsvalue&&tipsvalue.pol}}</p>
    <p>监测时间：{{tipsvalue&&tipsvalue.utime}}</p>
    <p>时区：{{tipsvalue&&tipsvalue.tz}}</p>
  </div>
</template> 
<script>
export default {
  name: "",
  props: ["tipsvalue"],
  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang = 'scss' scoped >
.tips {
  top: -1000px;
  left: -1000px;
  position: absolute;

  color: #fff;
  /* border: 1px solid #686868; */
  width: 300px;
  height: 200px;
  padding-left: 20px;
  /* &::before {
    content: "";
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: #686868;
    position: absolute;
    left: 50%;
    top: 100%;
    
  }
  &::after {
    content: "";
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top-color: black;
    position: absolute;
    left: 50%;
    top: 100%;
    margin-left: 2px;
  } */
}
</style>