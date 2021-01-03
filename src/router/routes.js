import Home from '../views/Home';
export default [{
    name: 'Home',
    path: '/',
    component: Home
}, {
    name: "About",
    path: '/about',
    component: () => import(/* webpackChunkName: "About" */'../views/About.vue'),
    children: [
        {
            name: 'Detail',
            path: '/about/detail',
            component: () => import(/* webpackChunkName: "Detail" */'../views/Detail.vue'),
        }
    ]
}];