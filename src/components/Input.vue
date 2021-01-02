<template>
    <div>
        <!-- 自定义组件双向数据绑定：@input，:value -->
        <input :type="type" :value="value" :placeholder="placeholder" @input="onInput" @blur="validate">
    </div>
</template>

<script>
import emitter from '../mixins/emitter';
export default {
    mixins: [emitter],
    props: {
        type: {
            type: String,
            default: 'text'
        },
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        }
    },
    methods: {
        onInput(e) {
            this.$emit('input', e.target.value);
        },
        validate() {
            // todo 触发校验
            // this.$parent.$emit('validate');

            // 解耦，冒泡查找，调用FormItem的校验方法
            this.dispatch('FormItem', 'validate');
        }
    }
};
</script>

<style>
</style>