export default {
  // 有很多地方可能用到这个购物车商品总数
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  }
}
