import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Dialog from './components/Dialog';
Vue.config.productionTip = false
Vue.use(Dialog);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
