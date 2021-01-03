<template>
    <div>
        <h2 style="color: blue;">关于页面，下面是嵌套路由</h2>
        <router-link to="/about/detail">二级路由</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>