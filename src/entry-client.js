import { createApp } from "./main";

// 客户端激活
const { app, router } = createApp();

// router就绪后，挂载激活
router.onReady(() => {
    app.$mount('#app');
});