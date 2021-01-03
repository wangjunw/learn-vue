<template>
  <div id="app">
    <h2>表单组件</h2>
    <Form ref="form" :rules="rules" :model="formData">
      <FormItem prop="username" label="账号">
        <Input type="text" placeholder="账号" v-model="formData.username" />
      </FormItem>
      <FormItem prop="password" label="密码">
        <Input type="password" placeholder="密码" v-model="formData.password" />
      </FormItem>
       <FormItem>
        <button @click="submit">提交</button>
      </FormItem>
    </Form>
    <h2>VueRouter</h2>
    <div>
        <router-link to="/">首页</router-link>
        <router-link to="/about">关于</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import Form from './components/Form';
import FormItem from './components/FormItem';
import Input from './components/Input';

export default {
    name: 'App',
    components: { Form, FormItem, Input },
    data() {
        return {
            formData: {
                username: 'tom',
                password: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名' }],
                password: [{ required: true, message: '请输入密码' }]
            }
        };
    },
    methods: {
        submit() {
            this.$refs['form'].validate(res => {
                if (res) {
                    this.$dialog({
                        message: '提交成功',
                        duration: 2000
                    });
                } else {
                    this.$dialog({
                        message: '提交失败',
                        duration: 1000
                    });
                }
            });
        }
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
h2 {
    color: red;
}
</style>
