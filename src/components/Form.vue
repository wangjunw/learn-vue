<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Form',
    provide() {
        return {
            form: this
        };
    },
    props: {
        rules: Object,
        model: Object
    },
    created() {
        this.fields = [];
        this.$on('addFormItem', item => {
            this.fields.push(item);
        });
    },
    destroyed() {
        this.fields = null;
    },
    methods: {
        validate(cb) {
            // let tasks = this.$children
            //     .filter(children => children.prop)
            //     .map(children => children.validate());

            // 解耦写法
            let tasks = this.fields.map(children => children.validate());
            Promise.all(tasks)
                .then(() => cb(true))
                .catch(() => cb(false));
        }
    }
};
</script>

<style>
</style>