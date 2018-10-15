import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from 'pages/Home/Home'
import Search from 'pages/Search/Search'
import Order from 'pages/Order/Order'
import Personal from 'pages/Personal/Personal'
import Login from 'pages/Login/Login'

import userInfo from 'pages/userInfo/userInfo'

import Shop from "pages/Shop/Shop"
import Goods from "pages/Shop/Goods/Goods"
import Info from "pages/Shop/Info/Info"
import Ratings from "pages/Shop/Ratings/Ratings"

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
    {path: '/userInfo', component: userInfo},     //个人信息中心
    {path: '/shop', component: Shop, children:[   //子路由
      {path: '/shop/goods', component: Goods},
      {path: '/shop/info', component: Info},
      {path: '/shop/ratings', component: Ratings},
      {path: '/shop', redirect: '/shop/goods'},
    ]},     //商家详情
  ],
  linkActiveClass: 'active'
})
