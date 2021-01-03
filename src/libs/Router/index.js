let Vue;

class VueRouter {
    constructor(options) {
        this.$options = options;

        // 缓存routes项，嵌套路由暂不需要
        // this.routeMap = {};
        // this.$options.routes.forEach(route => {
        //     this.routeMap[route.path] = route;
        // });

        // 保存一个当前url，应该是响应式的
        //不考虑嵌套路由时
        // Vue.util.defineReactive(this, 'current', this.curHash()); 
        // 嵌套路由时
        this.current = this.curHash() || '/';
        Vue.util.defineReactive(this, 'matched', []);
        this.match();
        window.addEventListener('hashchange', this.handleChange.bind(this));
    }
    match(routes) {
        routes = routes || this.$options.routes;
        for (let route of routes) {
            // 如果是根路由，完全匹配
            if (route.path === '/' && this.current === '/') {
                this.matched.push(route);
                return;
            }
            // 依次匹配，递归
            //  /about/detail： /about(depth=0)和/about/detail(depth=1)都push
            if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
                this.matched.push(route);
                if (route.children) {
                    this.match(route.children);
                }
                return;
            }
        }
    }
    handleChange() {
        this.current = this.curHash();
        // 路径变化。清空，重新匹配
        this.matched = [];
        this.match();
    }
    curHash() {
        return location.hash.slice(1);
    }
}


VueRouter.install = function (_Vue) {
    Vue = _Vue;
    /**
     * 挂载Router实例，使组件可以使用this.$router.xx
     * 利用混入拿到根组件的router实例
     *  new Vue({
            router,
            render: h => h(App),
        }).$mount('#app')
     */
    Vue.mixin({
        beforeCreate() {
            // 如果当前有router属性，则认为是根组件，获取router实例并挂载
            if (this.$options.router) {
                _Vue.prototype.$router = this.$options.router;
            }
        }
    });

    // 注册组件router-view和router-link组件
    Vue.component('router-view', {
        render(h) {
            // 深度标记，嵌套路由使用
            this.$vnode.data.routerView = true; // 标记是否是router-view
            let depth = 0; //深度
            let parent = this.$parent;
            while (parent) {
                const vnodeData = parent.$vnode && parent.$vnode.data;
                if (vnodeData) {
                    // 如果父级有一个route-view深度就+1
                    if (vnodeData.routerView) {
                        depth++;
                    }
                }
                parent = parent.$parent;
            }
            let comp = null;
            const route = this.$router.matched[depth];
            if (route) {
                comp = route.component;
            }

            // 获取当前的url的路径，到路由缓存表中匹配，不考虑嵌套路由
            // const { routeMap, current } = this.$router;
            // const comp = routeMap[current] ? routeMap[current].component : null;
            return h(comp);
        }
    });
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                default: ""
            }
        },
        render(h) {
            return h('a', {
                attrs: {
                    href: `#${this.to}`,
                }

            }, this.$slots.default);
        }
    });
}
export default VueRouter;