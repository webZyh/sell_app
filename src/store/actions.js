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
  CLEAR_CART_FOODS,
  RECEIVE_SHOP_RATINGS,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import {
	resAddress,
	resFoodCategorys,
	resShopsList,
	reqUserInfo,
  reqLogout,
  reqInfo,
  reqGoods,
  reqRatings,
  reqSearchShop
} from '../api'

export default {
	//异步获取地址
	async getAddress({commit,state}){
		//发送异步ajax请求
		let geohash = state.latitude + ',' + state.longitude;
		let result = await resAddress(geohash);
		//console.log(result);

		//提交mutation
		if(result.code === 0){
			const address = result.data;
			commit(RECEIVE_ADDRESS,{address})
		}
	},
	//异步获取食品分类列表
	async getCategorys({commit}){
		//发送异步ajax请求
		const result = await resFoodCategorys()
		//提交mutation
		if(result.code===0){
			const categorys = result.data;
			commit(RECEIVE_CATEGORYS,{categorys})		//通知mutations
		}
	},
	//异步获取商家列表
	async getShops({commit,state}){
		//发送异步ajax请求
		const {longitude, latitude} = state;
		const result = await resShopsList(longitude,latitude);
		//提交mutation
		if(result.code === 0){
			const shops = result.data;
			commit(RECEIVE_SHOPS,{shops})
		}
	},

	//手上有数据，就是同步，，没有就从后台获取，就是异步
	//同步获取用户数据
	recordUser({commit}, userInfo){
		commit(RECEIVE_USER_INFO, {userInfo})		//提交到mutation
	},

	//异步获取用户数据
	async getUserInfo({commit}){
		const result = await reqUserInfo();
		if(result.code === 0){
			const userInfo = result.data;
			commit(RECEIVE_USER_INFO, {userInfo})
		}
	},

	//退出登录
  async logout({commit}){
    const result = await reqLogout();
    if (result.code === 0){
      commit(CLEAR_USER_INFO)   //清空用户信息
    }
  },

  //异步获取商家信息
  async getShopInfo({commit}){
	  const result = await reqInfo();
    if(result.code === 0){
      const shopInfo = result.data;
      commit(RECEIVE_SHOP_INFO, {shopInfo});
    }
  },

  //异步获取商家食品分类
  async getShopGoods({commit},callback){
	  const result = await reqGoods();
	  if(result.code ===0 ){
	    const shopGoods = result.data;
      //console.log(shopGoods);
      commit(RECEIVE_SHOP_GOODS,{shopGoods})
      //数据更新了，通知一下组件
      callback && callback()
    }
  },

  //同步获取food的count值
  foodCount({commit},{isTrue,food}){
	  if (isTrue){  //点击了增加
      commit(INCREMENT_FOOD_COUNT,{food})
    }else{  //点击了减少
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  },

  //同步清除cartFoods
  clearCartFoods({commit}){
	  commit(CLEAR_CART_FOODS);
  },

  //异步获取商家评论
  async getRatings({commit},callback){
	  const result = await reqRatings();
	  if(result.code === 0){
	    const ratings = result.data;
	    commit(RECEIVE_SHOP_RATINGS,{ratings})
      callback && callback();
    }
  },

  //异步搜索商家
  async searchShops({commit,state},keyword){
    let geohash = state.latitude + ',' + state.longitude;
    const result = await reqSearchShop(geohash,keyword);
    if (result.code === 0){
      console.log(result);
      let searchShops = result.data;
      commit(RECEIVE_SEARCH_SHOPS,{searchShops})
    }
  }
}
