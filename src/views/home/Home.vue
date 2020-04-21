<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <home-recommend-view :recommends="recommends"/>
    <tab-control class="tab-control" :titles="titles" @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>
  </div>
</template>

<script>
    // 子组件
    import HomeSwiper from "./childComps/HomeSwiper";
    import HomeRecommendView from "./childComps/HomeRecommendView";

    // 公共组件
    import NavBar from "components/common/navbar/NavBar";
    import TabControl from "../../components/common/tabControl/TabControl";
    import GoodsList from "../../components/content/goods/GoodsList";

    // 请求方法
    //不是default导出的要用大括号导入
    import {getHomeMultidata,getHomeGoods} from "network/home";
    export default {
        name: "Home",
        components: {GoodsList, NavBar,HomeSwiper,HomeRecommendView,TabControl},
        data(){
            return{
                //二。存储请求顾来的数据，在res执行完之前把它保存起来,不被回收掉
                // result:null
                banners:[],
                recommends:[],
                goods:{
                  'pop':{page:0,list:[]},
                  'new':{page:0,list:[]},
                  'sell':{page:0,list:[]},
                },
                titles: ['流行','新款','精选'],
                //设置默认值
                currentType:'pop'
            }
        },
        computed: {
            showGoods() {
              return this.goods[this.currentType].list
            }
        },
        created() {
            //1.请求多个数据
            this.getHomeMultidata()
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')
        },
        methods:{
            /*
            * 网络请求相关
            * */
            getHomeMultidata(){
                getHomeMultidata().then(res =>{
                    // console.log(res)
                    // this.result = res
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                })
            },
            getHomeGoods(type){
                //在原来配置的基础上加1
                const page = this.goods[type].page + 1
                getHomeGoods(type,page).then(res =>{
                    // console.log(res)
                    // res=>pop的前三十条数据，第一页的
                    //现在我们要保存res数据
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].list.page += 1
                })
            },

            /*
            * 事件监听相关
            * */
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
                }
            }
        }
    }
</script>

<style scoped>
  #home{
    /*让轮播图完全显示*/
    padding-top: 44px;
  }
  #app{
    margin-top: 44px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;
    /*没达到static，达到flex,但是有的浏览器不支持，手机端一般都支持*/
    top: 44px;
    z-index: 9;
  }
</style>
