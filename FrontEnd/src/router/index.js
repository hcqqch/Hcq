import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login';
//路由懒加载
const Home = resolve => require(['@/components/Home'], resolve);
const Auth = resolve => require(['@/components/Auth'], resolve);
const Blog = resolve => require(['@/components/Blog'], resolve);
const NewBlog = resolve => require(['@/components/NewBlog'], resolve);

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Home',
        component: Home,
    }, {
        path: '/auth',
        name: 'Auth',
        component: Auth,
    }, {
        path: '/login',
        name: 'Login',
        component: Login,
    }, {
        path: '/new/:id',
        name: 'NewBlog',
        component: NewBlog,
    }, {
        path: '/blog/:id',
        name: 'Blog',
        component: Blog,
    }]
})