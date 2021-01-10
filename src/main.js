import Vue from 'vue'
import App from './App.vue'
// import router from './router'
// import store from './store'
import Dialog from './components/Dialog';
import createRouter from './router';
Vue.config.productionTip = false
Vue.use(Dialog);

// 每一次请求都是一个新的实例。将来调用createApp的是entry-server
export function createApp(context) {
  const router = createRouter();
  const app = new Vue({
    router,
    context,
    // store,
    render: h => h(App),
  }).$mount('#app');
  return { app, router };
}

