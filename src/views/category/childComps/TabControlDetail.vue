<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in categoryDetail" :key="index" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
    import GoodsListItem from "components/content/goods/GoodsListItem";

    export default {
        name: "TabControlDetail",
        components: {GoodsListItem},
        props: {
            categoryDetail: {
                type: Array,
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
