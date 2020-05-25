<template>
    <div class="detailBottomBar">
      <div class="bottom-bar">
        <div class="bar-item bar-left">
          <div>
            <i class="icon service"></i>
            <span class="text">客服</span>
          </div>
          <div>
            <i class="icon shop"></i>
            <span class="text">店铺</span>
          </div>
          <div>
            <i class="icon select"></i>
            <span class="text">收藏</span>
          </div>
        </div>
        <div class="bar-item bar-right">
<!--          <div class="cart" @click="goodsShow">加入购物车</div>-->
          <div class="cart" @click="selectStyle('2')">加入购物车</div>
          <div class="buy" @click="selectStyle('1')">购买</div>
        </div>
      </div>
      <select-rules
        ref="styleSelect"
        :defaultprice="defaultprice"
        :mainPic="mianUrl"
        @getCartNum="getCartNum"
        :style-cart="styleCart"
      ></select-rules>
    </div>
</template>

<script>
    import SelectRules from "./selectRules";
    export default {
        name: "DetailBottomBar",
        components: {SelectRules},
        props:{
            shopCart:{
                type:Object,
                default(){
                    return {}
                }
            },
        },
        data(){
          return{
              // isShow1:true,
              // isShow2:false,
              // count:0,
              // isActive:false,
              // sel:[],
              cartNum: 0,
              defaultprice: '',
              mianUrl: '',
              styleCart: {}
          }
        },
        methods:{
            getCartNum () {
                // this.cartNum = this.cartNum + this.shopCart
                this.$emit('addCart')
            },
            selectStyle(string) {
                console.log(this.shopCart);
                //获取一个值当商品默认价格
                this.defaultprice = this.shopCart.defaultPrice;
                //获取一个值当商品默认图片
                this.mianUrl = this.shopCart.skus[0].img
                console.log(this.mianUrl);
                this.styleCart = this.shopCart
                this.$refs.styleSelect.showModal = true //是否显示选择商品的弹框
                this.$refs.styleSelect.goodName = 'NIKE 跑鞋'//商品名称
                this.$refs.styleSelect.getSpecifications('')
            },
            // goodsShow(){
            //     console.log('加入购物车按钮被点击了');
            //     this.isShow1 = !this.isShow1
            //     this.isShow2 = !this.isShow2
            // },
            // btn_user (e,index,ind) {
            //     console.log('点击的是' + e.target.innerHTML)
            //     this.isActive = !this.isActive
            //     this.sel[index] = ind;
            //     this.$set(this.sel, index, ind)
            //     // set的方法来给数组赋值或者用concat连接一个空数组来对数组进行重新赋值。
            // },
            // reducecount(){
            //     this.count--
            // },
            // increasecount(){
            //     this.count++
            // },
            // addToCart(){
            //     // this.isShow1 = !this.isShow1
            //     // this.isShow2 = !this.isShow2
            //     this.$emit('addCart')
            // },

        }
    }
</script>

<style scoped>
  .bottom-bar{
    height: 58px;
    position: relative;
    display: flex;
    top: 445px;
    background-color: #ffffff;
    text-align: center;
    z-index: 10;
  }
  .bar-item{
    flex: 1;
    display: flex;
  }
  .bar-item>div {
    flex: 1;
  }
  .bar-left .text{
    font-size: 13px;
  }
  .bar-left .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin: 10px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }
  .bar-left .service{
    background-position: 0 -54px;
  }
  .bar-left .shop{
    background-position: 0 -98px;
  }
  .bar-right{
    font-size: 15px;
    color: #ffffff;
    line-height: 58px;
  }
  .bar-right .cart{
    background-color: gold;
    color: #333333;
  }
  .bar-right .buy{
    background-color: #ff8198;
  }

</style>
