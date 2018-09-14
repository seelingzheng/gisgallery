import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css';
import axios from 'axios'
import './styles/index.scss';
import App from './App.vue';
import router from './router';


import widgets from "cesium/Widgets/widgets.css";

Vue.use(ElementUI);
Vue.http = Vue.prototype.$http = axios;

Vue.bus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');