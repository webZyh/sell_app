import {
	RECEIVE_ADDRESS,
	RECEIVE_CATEGORYS,
	RECEIVE_SHOPS
} from './mutation-types'
import {
	resAddress,
	resFoodCategorys,
	resShopsList
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
			commit(RECEIVE_CATEGORYS,{categorys})
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
	}
}