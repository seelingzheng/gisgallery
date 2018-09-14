import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css';
<<<<<<< HEAD
import axios from 'axios'
=======
>>>>>>> master
import './styles/index.scss';
import App from './App.vue';
import router from './router';

<<<<<<< HEAD

import widgets from "cesium/Widgets/widgets.css";

Vue.use(ElementUI);
Vue.http = Vue.prototype.$http = axios;

Vue.bus = new Vue();
=======
Vue.use(ElementUI);
>>>>>>> master

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
<<<<<<< HEAD
}).$mount('#app');
=======
}).$mount('#app');
>>>>>>> master
