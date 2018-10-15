import {
	RECEIVE_ADDRESS,
	RECEIVE_CATEGORYS,
	RECEIVE_SHOPS,
	RECEIVE_USER_INFO,
  CLEAR_USER_INFO,
  RECEIVE_SHOP_INFO,
  RECEIVE_SHOP_GOODS
} from './mutation-types'

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
  }
}
