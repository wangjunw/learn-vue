import { createApp } from "./main";

// 首屏的渲染
//调用者是将来的渲染器，renderer

export default context => {
    // 为了让renderer可以处理异步结果，应该返回promise
    return new Promise((resolve, reject) => {
        // 传入上下文，获取app和router实例
        const { app, router, store } = createApp(context);

        // 获取用户请求的url，跳转到首屏路由
        router.push(context.url);
        // 监听路由的ready事件.确保异步任务完成
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }
            Promise.all(matchedComponents.map(item => {
                if (item.asyncData) {
                    return item.asyncData({ store, route: router.currentRoute });
                }
            })).then(() => {
                context.state = store.state;
                // renderer只关心vue实例，所以只返回app
                resolve(app);
            });
        }, reject);
    });
}