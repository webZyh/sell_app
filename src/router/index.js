import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from 'pages/Home/Home'
import Search from 'pages/Search/Search'
import Order from 'pages/Order/Order'
import Personal from 'pages/Personal/Personal'
import Login from 'pages/Login/Login'

Vue.use(VueRouter)

export default new VueRouter({
  //定义路由
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: Home, meta: {showFooter: true}},
    {path: '/search', component: Search, meta: {showFooter: true}},
    {path: '/order', component: Order, meta: {showFooter: true}},
    {path: '/personal', component: Personal, meta: {showFooter: true}},
    {path: '/login', component: Login},
  ],
  linkActiveClass: 'active'
})
