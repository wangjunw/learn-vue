import Vue from 'vue'
import App from './App.vue'
// import router from './router'
// import store from './store'
// import Dialog from './components/Dialog';
import createRouter from './router';
import { createStore } from './store';
Vue.config.productionTip = false
// Vue.use(Dialog);

// 如果有asyncData先请求，
Vue.mixin({
  // 只会在客户端执行
  beforeMount() {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: this.$route
      });
    }
  }
});

// 每一次请求都是一个新的实例。将来调用createApp的是entry-server
export function createApp(context) {
  const router = createRouter();
  const store = createStore();
  const app = new Vue({
    router,
    context,
    store,
    // store,
    render: h => h(App),
  }).$mount('#app');
  return { app, router, store };
}

