export default {
  //所选食品的总数量
  totalCount(state) {
    return state.cartFoods.reduce((preTotal, food) => {
      return preTotal + food.count;
    }, 0)
  },
  //所选食品的总价格
  totalPrice(state) {
    return state.cartFoods.reduce((preTotal, food) => {
      return preTotal + food.count * food.price;
    }, 0)
  },
  //返回满意的评论个数
  positiveCount(state) {
    return state.ratings.reduce((preTotal, rating) => {
      return preTotal + (rating.rateType === 0 ? 1 : 0);
    }, 0)
  }
}
