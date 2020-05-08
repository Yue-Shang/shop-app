<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" :key="showImage" @load="imageLoad" ><!--监听是否加载完-->
    <div class="goods-info">
      <p>{{goods.title}}</p>
      <span class="price">{{goods.price}}</span>
      <span class="collect">{{goods.cfav}}</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
        props:{
            goods:{
                type:Object,
                default() {
                    return {}
                }
            }
        },
        computed: {
            showImage() {
                //解决image地址来自不同地方，还要用一个插件的问题
                // return this.goods.image || this.goods.show.img || this.goods.img
                return this.goods.img || this.goods.image || this.goods.show.img
            }
        },
        methods:{
            imageLoad(){
                this.$bus.$emit('itemImageLoad')
            },
            itemClick(){
                // console.log('跳转到详情页');
                this.$router.push('/detail/' + this.goods.iid)
            }
        }
    }
</script>

<style scoped>
.goods-item{
  padding-bottom: 40px;
  position: relative;
  width: 48%;
  /*margin: 10px;*/
}
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content:'';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
