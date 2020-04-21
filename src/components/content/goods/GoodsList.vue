<template>
    <div class="goods">
<!--      ul>li{商品列表$}*10-->
     <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"/>
    </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
    export default {
        name: "GoodsList",
        components: {GoodsListItem},
        props:{
            goods:{
                type:Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
.goods{
  display: flex;
  /*父组件如果写flex都是写在一行里的*/
  flex-wrap: wrap;
  /*让图片均等分布*/
  justify-content: space-around;/*中间距离均等分布*/
}

</style>
