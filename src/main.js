import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import $ from 'jquery';
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import axios from './axios'

Vue.use(ElementUI) //使用elementUI

Vue.prototype.jQuery = $;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false; 

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
