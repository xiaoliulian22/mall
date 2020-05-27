// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from './utils/http'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import dateTime from "@/assets/js/datetime";
import { Loading } from 'element-ui';

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.$get = http.get
Vue.prototype.$post = http.post
Vue.prototype.$dateTime = dateTime
Vue.prototype.$Loading = Loading

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
