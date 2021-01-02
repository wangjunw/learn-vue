import Component from './Dialog';
import Vue from 'vue';

function create(props) {
    // 获取组件构造函数
    const Ctor = Vue.extend(Component);
    // 创建组件实例
    const comp = new Ctor({ propsData: props });

    // 挂载
    comp.$mount();

    // 插入到真实dom
    document.body.appendChild(comp.$el);
    setTimeout(() => {
        comp.remove();
    }, props.duration);
    comp.remove = function () {
        document.body.removeChild(comp.$el);
        comp.$destroy();
    }
    return comp;
}

export default {
    install(_Vue) {
        _Vue.prototype.$dialog = create;
    }
}