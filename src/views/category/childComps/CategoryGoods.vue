<template>
<!--  <div class="category-goods" v-if="subcategories.list">-->
<!--    <div class="item" v-for="(item,index) in subcategories.list" :key="index">-->
<!--      <a :href="item.link">-->
<!--        <img class="item-img" :src="item.image" alt="" @load="imgLoad">-->
<!--        <div class="item-text">{{item.title}}</div>-->
<!--      </a>-->
<!--    </div>-->
<!--  </div>-->
  <div>
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list" >
      <div class="item" v-for="(item, index) in subcategories.list" :key="index">
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt=""  @load="imageLoad">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
    import GridView from "components/common/gridView/GridView";

    export default {
        name: "CategoryGoods",
        components: {
            GridView
        },
        data() {
            return{
                counter:0,
                imagesLength:0
            }
        },
        props:{
            subcategories: {
                type: Object,
                default() {
                    return []
                }
            }
        },
        methods:{
            imageLoad() {
                if (!this.isLoad) {
                    this.$emit('GoodsImageLoad')
                    this.isLoad = true
                }
            }
        }
    }
</script>

<style scoped>
  .panel img {
    width: 100%;
  }

  .item {
    text-align: center;
    font-size: 12px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
  /*.category-goods{*/
  /*  display: block;*/
  /*  height: 100%;*/
  /*}*/

  /*.item {*/
  /*  width: 32%;*/
  /*  text-align: center;*/
  /*  font-size: 12px;*/
  /*  float: left;*/
  /*  padding: 8px;*/
  /*}*/

  /*.item-img {*/
  /*  width: 100%;*/
  /*  border-radius: 25px;*/
  /*}*/

  /*.item-text {*/
  /*  margin-top: 15px;*/
  /*}*/
</style>
