<template>
    <div class="container">
        <div class="content">{{message}}</div>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            default: '',
            type: String
        }
    }
};
</script>

<style scoped>
.container {
    width: 300px;
    height: 150px;
    position: fixed;
    top: 30px;
    z-index: 10;
    border: solid 1px #ccc;
}
.content {
    color: red;
    font-size: 20px;
    text-align: center;
    padding-top: 30px;
}
</style>