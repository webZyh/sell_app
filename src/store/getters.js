export default {
  //所选食品的总数量
	totalCount(state){
    return state.cartFoods.reduce((preTotal,food)=>{
      return preTotal+food.count;
    },0)
  },
  //所选食品的总价格
  totalPrice(state){
    return state.cartFoods.reduce((preTotal,food)=>{
      return preTotal+food.count*food.price;
    },0)
  }
}
