import {
	RECEIVE_ADDRESS,
	RECEIVE_CATEGORYS,
	RECEIVE_SHOPS,
	RECEIVE_USER_INFO,
  CLEAR_USER_INFO,
  RECEIVE_SHOP_INFO,
  RECEIVE_SHOP_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART_FOODS
} from './mutation-types'
import Vue from 'vue'

export default {
	[RECEIVE_ADDRESS](state,{address}){
		state.address = address;		//mutation直接更改state中的数据
	},

	[RECEIVE_CATEGORYS](state,{categorys}){
		state.categorys = categorys;
	},

	[RECEIVE_SHOPS](state,{shops}){
		state.shops = shops;
	},

	[RECEIVE_USER_INFO](state,{userInfo}){
		state.userInfo = userInfo;
	},

  [CLEAR_USER_INFO](state){
	  state.userInfo = {}
  },

  [RECEIVE_SHOP_INFO](state,{shopInfo}) {
    state.shopInfo = shopInfo
  },

  [RECEIVE_SHOP_GOODS](state,{shopGoods}){
    state.goods = shopGoods
  },

  [INCREMENT_FOOD_COUNT](state,{food}){
	  if (!food.count){    //一开始是没有food.count的值
	    Vue.set(food,'count',1);    //新增一个count属性，并确保这个新属性同样是响应式的，且触发视图更新
      state.cartFoods.push(food);
    }else{
	    food.count++
    }
  },

  [DECREMENT_FOOD_COUNT](state,{food}){
    if (food.count>0){
      food.count--;
      if(food.count<1){     //当数量为1时，从cartFoods中删除这个food，否则只是减少该food的count值
        state.cartFoods.splice(state.cartFoods.indexOf(food),1);
      }
    }
  },

  //清空购物车
  [CLEAR_CART_FOODS](state){
    //清除food中的count
    state.cartFoods.forEach((food)=>{
      food.count = 0;
    });
    //清空购物车中的food
    state.cartFoods = [];
  }
}
