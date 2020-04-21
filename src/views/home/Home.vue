<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
  </div>
</template>

<script>
    // 子组件
    import HomeSwiper from "./childComps/HomeSwiper";

    import {getHomeMultidata} from "network/home";
    export default {
        name: "Home",
        components: {HomeSwiper},
        data(){
            return{
                //二。存储请求顾来的数据，在res执行完之前把它保存起来,不被回收掉
                // result:null
                banners:[],
                recommends:[],
                // titles: ['流行','新款','精选']
            }
        },
        created() {
            //1.请求多个数据
            getHomeMultidata().then(res =>{
                // console.log(res)
                // this.result = res
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            })
        }
    }
</script>

<style scoped>
  #home{
    /*让轮播图完全显示*/
    padding-top: 44px;
  }
</style>
