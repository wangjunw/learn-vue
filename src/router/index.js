import Vue from 'vue';
import routes from './routes';
// import VueRouter from '../libs/Router';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
export default function createRouter() {
    return new VueRouter({
        routes
    });
}