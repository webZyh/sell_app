import Vue from 'vue'
// import Vue from "vue/dist/vue.common.js";
import App from './App'
import router from './router'
import store from './store'

import './mock/mockServer'    //加载mockServer即可
import './filter'

//引入mint-ui
import {Button} from 'mint-ui'
Vue.component(Button.name , Button)

//VueLazyload
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
Vue.use(VueLazyload,{
  loading
});

let vm = new Vue({
  el: '#app',
  render: h => h(App),
  router,     //组件标签:<router-link>、<router-view>、<keep-alive>	router属性:$route、$router
  store,	//使用上vuex, $store
})
