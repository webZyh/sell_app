import Vue from 'vue'
import App from './App'
import router from './router'

let vm = new Vue({
  el: '#app',
  router,     //组件标签:<router-link>、<router-view>、<keep-alive>	router属性:$route、$router
  render: h => h(App)
})
