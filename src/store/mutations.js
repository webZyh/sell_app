import {
	RECEIVE_ADDRESS,
	RECEIVE_CATEGORYS,
	RECEIVE_SHOPS
} from './mutation-types'

export default {
	[RECEIVE_ADDRESS](state,{address}){
		state.address = address;		//直接更改state中的数据
	},
	[RECEIVE_CATEGORYS](state,{categorys}){
		state.categorys = categorys;
	},
	[RECEIVE_SHOPS](state,{shops}){
		state.shops = shops;
	}
}