import Vue from 'vue'
import App from './app.vue'
import  './assets/css/normalize.css'
import  './assets/css/common.css'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
