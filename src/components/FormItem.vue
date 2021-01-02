<template>
    <div>
        <label for="">{{label}}</label>
        <slot></slot>
        <p v-if="error" class="error">{{error}}</p>
    </div>
</template>

<script>
import Schema from 'async-validator';
import emitter from '../mixins/emitter';
export default {
    name: 'FormItem',
    inject: ['form'],
    data() {
        return {
            error: ''
        };
    },
    props: {
        prop: {
            type: String,
            required: ''
        },
        label: {
            type: String,
            default: ''
        }
    },

    mixins: [emitter],
    mounted() {
        // 监听validate，供子组件执行
        this.$on('validate', () => {
            this.validate();
        });

        // 如果有prop属性，向Form中添加自身，供Form调用，解耦。
        if (this.prop) {
            this.dispatch('Form', 'addFormItem', [this]);
        }
    },

    methods: {
        validate() {
            const rules = this.form.rules[this.prop];
            const value = this.form.model[this.prop];
            const schema = new Schema({
                [this.prop]: rules
            });
            return schema.validate(
                {
                    [this.prop]: value
                },
                errors => {
                    if (errors) {
                        this.error = errors[0].message;
                    } else {
                        this.error = '';
                    }
                }
            );
        }
    }
};
</script>

<style>
.error {
    color: red;
}
</style>