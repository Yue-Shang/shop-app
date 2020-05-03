<template>
    <div class="bottom-bar">
      <div class="check-content">
        <check-button
          class="check-button"
          :is-checked="isSelectAll"
          @click.native="checkClick"/>
        <span>全选</span>
      </div>

      <div class="price">
        合计：{{totalPrice}}
      </div>

      <div class="calculate" @click="calcClick">
        去计算：{{checkLength}}
      </div>
    </div>
</template>

<script>
    import CheckButton from "components/content/checkButton/CheckButton";

    import { mapGetters } from 'vuex'

    export default {
        name: "CartBottomBar",
        components: {CheckButton},
        computed: {
            ...mapGetters(['cartList']),
            totalPrice() {
                return '￥' + this.cartList.filter(item => {
                    return item.checked
                }).reduce((preValue, item) => {
                    return preValue + item.lowNowPrice * item.count
                }, 0).toFixed(2)
            },
            checkLength() {
                return this.cartList.filter(item => item.checked).length
            },
            //这里主要是如果上面全选了，下面的全选按钮就显示全选
            isSelectAll() {
                // 最好要有这个判断条件，不然购物车为空的时候也是选中状态
                if (this.cartList.length === 0) return false
                //方法一：使用filter 先找一下有多少个被选中的，再取反
                return !(this.cartList.filter(item => !item.checked).length)
                // return !(this.cartList.filter(item => item.checked).length)
                // 方法二：使用find
                // return !this.cartList.find(item => !item.checked)
                // 方法三：普通遍历
                // for (let item of this.cartList) {
                //     if (!item.checked) {
                //         return false
                //     }
                // }
                // return true
            }
        },
        methods:{
            //这里是点击全选按钮，上面改变状态
            checkClick() {
                if (this.isSelectAll) {//全部选中
                    this.cartList.forEach(item => item.checked = false)
                } else {//部分或全部不选中
                    this.cartList.forEach(item => item.checked = true)
                }
            },
            calcClick() {
                if (!this.isSelectAll) {
                    this.$toast.show('请选购商品哦')
                }
            }
        }
    }
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;
    bottom: 0;

    height: 44px;
    line-height: 44px;

    background-color: #e3e7e5;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 70px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    margin-left: 40px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    background: orangered;
    border-radius: 25px;
    color: white;
    text-align: center;
    margin: 5px;
  }
</style>
