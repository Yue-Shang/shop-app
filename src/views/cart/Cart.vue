<template>
  <div class="cart">
    <nav-bar class="nav-bar">
<!--      导航-->
<!--      1.<div slot="center">购物车({{$store.state.cartList.length}})</div>-->
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
<!--      商品列表-->
     <cart-list/>
<!--      购物车底部导航-->
     <cart-bottom-bar/>
  </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";

    import CartList from "./childComps/CartList";
    import CartBottomBar from "./childComps/CartBottomBar";

    import { mapGetters } from 'vuex';

    export default {
        name: "Cart",
        components: {CartBottomBar, CartList, NavBar},
        computed: {
            //方法一：
            // ...mapGetters(['cartLength','cartList',])
            //方法二：
           ...mapGetters({
               length:'cartLength'
           })
        }
    }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
