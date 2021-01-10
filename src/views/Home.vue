<template>
    <div>
        <h1 @click="handler">首页{{this.$store.state.count}}</h1>
        <p @click="asyncAdd">异步增加</p>
        <p>getter：{{this.$store.getters.doubleCount}}</p>
    </div>
</template>

<script>
export default {
    asyncData({ store }) {
        return store.dispatch('addAsync', 100);
    },
    methods: {
        handler() {
            this.$store.commit('add', 2);
        },
        asyncAdd() {
            this.$store.dispatch('addAsync', 3);
        }
    }
};
</script>

<style scoped>
</style>