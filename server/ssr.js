const express = require('express');
const app = express();
const path = require('path');

const resolve = (dir) => {
    return path.resolve(__dirname, dir)
};
// 静态文件服务
app.use(express.static(resolve('../dist/client'), { index: false }));
// 渲染器，可以获取前面生成的两个json文件
const { createBundleRenderer } = require('vue-server-renderer');
// 得到一个渲染器可以直接渲染vue实例
const bundle = resolve('../dist/server/vue-ssr-server-bundle.json');
const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: require('fs').readFileSync(resolve('../public/index.html'), "utf-8"), //宿主文件
    clientManifest: require(resolve("../dist/client/vue-ssr-client-manifest.json"))
});

// 路由和同构
app.get('*', async (req, res) => {
    const context = {
        url: req.url
    }

    try {
        // 渲染首屏
        const html = await renderer.renderToString(context);
        res.send(html);
    } catch (error) {
        res.status(500).send('server error');
    }
});
app.listen(3000);