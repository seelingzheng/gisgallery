<template>
  <div class="user-home">

    <div class="user-home-bg" :style="{'background-image':`url(${backgroundImage})`}"></div>
    <div class="layer bg" id="home_bg"></div>
    <div class="content-wrapper">
      <h2 class="slogan">
        欢迎使用 <br /> ICE 内容管理系统
      </h2>
      <div class="form-container">
        <h4 class="form-title">登录</h4>
        <el-form ref="form" :model="user" label-width="0">
          <div class="form-items">
            <el-row class="form-item">
              <el-col>
                <el-form-item prop="username" :rules="[ { required: true, message: '会员名/邮箱/手机号不能为空'}]">
                  <div class="form-line">
                    <i class="el-icon-edit-outline input-icon"></i>
                    <el-input placeholder="会员名/邮箱/手机号" v-model="user.username"></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-col>
                <el-form-item prop="password" :rules="[ { required: true, message: '密码不能为空'}]">
                  <div class="form-line">
                    <i class="el-icon-service input-icon"></i>
                    <el-input type="password" placeholder="密码" v-model="user.password"></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class=form-item>
              <el-col>
                <el-form-item>
                  <el-checkbox class="checkbox">记住账号</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-button type="primary" class="submit-btn" size="small" @click="submitBtn">
                登 录
              </el-button>
            </el-row>
          </div>
          <el-row class="tips">
            <a href="/" class="link">
              立即注册
            </a>
            <span class="line">|</span>
            <a href="/" class="link">
              忘记密码
            </a>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
require("particles.js");
import config from "./config/default";

import BasicContainer from "@vue-materials/basic-container";
const backgroundImage = require("./../../assets/bg.jpg");
export default {
  components: { BasicContainer },
  name: "Home",

  data() {
    return {
      backgroundImage: backgroundImage,
      user: {
        username: "",
        password: ""
      }
    };
  },
  mounted() {
    // 初始化例子插件
    particlesJS("home_bg", config);
  },
  created() {},

  methods: {
    submitBtn() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$message({
            message: "登录成功",
            type: "success"
          });
        }
      });
    }
  },

  beforeDestroy() {
    // 销毁 particlesJS
    // thanks https://github.com/d2-projects/d2-admin/issues/65
    // ref https://github.com/VincentGarreau/particles.js/issues/63
    if (pJSDom && pJSDom.length > 0) {
      pJSDom[0].pJS.fn.vendors.destroypJS();
      pJSDom = [];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
