let Vue;
class Store {
    constructor(options) {
        this.$options = options;

        const computed = {};
        this.getters = {};
        //解析getters，用户定义的getter是带参数的，computed是不带参数
        Object.keys(this.$options.getters).forEach(key => {
            const fn = this.$options.getters[key];
            computed[key] = () => {
                return fn(this.state);
            }

            // 为getters设置只读属性
            Object.defineProperty(this.getters, key, {
                get: () => this._vm[key]
            });
        })
        // store中的state和getters是响应式的
        this._vm = new Vue({
            data: {
                $$state: this.$options.state
            },
            computed
        });


        // 锁死commit和dispatch的this指向
        const store = this;
        const { commit, dispatch } = store;
        this.commit = function boundCommit(type, payload) {
            commit.call(store, type, payload);
        }
        this.dispatch = function boundDispatch(type, payload) {
            dispatch.call(store, type, payload);
        }
    }
    // state设置为只读
    get state() {
        return this._vm._data.$$state;
    }
    // set state() {
    //     console.error('不能这么粗暴的修改');
    // }

    commit(type, payload) {
        const fn = this.$options.mutations[type];
        if (fn) {
            fn(this.state, payload);
        } else {
            console.error('没有这个mutation');
            return;
        }
    }

    dispatch(type, payload) {
        const fn = this.$options.actions[type];
        if (!fn) {
            console.error('没有这个action');
            return;
        }
        fn(this, payload)
    }
}
function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    });
}
export default {
    Store,
    install
}