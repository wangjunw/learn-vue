import { createApp } from "./main";

// 客户端激活
const { app, router, store } = createApp();
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}
// router就绪后，挂载激活
router.onReady(() => {
    app.$mount('#app');
});