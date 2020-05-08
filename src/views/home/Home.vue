<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :data="showGoods"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showGoods" />
    </scroll>
<!--组件怎样进行点击？监听原生组件,.native-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
    // 子组件
    import HomeSwiper from "./childComps/HomeSwiper";
    import HomeRecommendView from "./childComps/HomeRecommendView";

    // 公共组件
    import NavBar from "components/common/navbar/NavBar";
    import TabControl from "components/common/tabControl/TabControl";
    import GoodsList from "components/content/goods/GoodsList";
    import Scroll from "components/common/scroll/Scroll";
    // import BackTop from "components/common/backTop/BackTop";

    // 请求方法
    //不是default导出的要用大括号导入
    import {getHomeMultidata,getHomeGoods} from "network/home";
    import {itemListenerMixin,backTopMixin} from "common/mixin";

    export default {
        name: "Home",
        components: {
            HomeSwiper,
            HomeRecommendView,
            NavBar,
            TabControl,
            GoodsList,
            Scroll,
            // BackTop,
        },
        mixins: [itemListenerMixin,backTopMixin],
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
                currentType:'pop',
                // isShowBackTop: false,
                tabOffsetTop: 0,
                isTabFixed: false,
                saveY: 0,
                // itemImgListener: null
            }
        },
        computed: {
            showGoods() {
              return this.goods[this.currentType].list
            }
        },
        //将底部导航设置为活跃和不活跃
        activated() {
            console.log('activated设置位置' + this.saveY);
            this.$refs.scroll.scrollTo(0, this.saveY, 0);
            this.$refs.scroll.refresh()
        },
        deactivated() {
            //1.保存Y值
            this.saveY = this.$refs.scroll.getScrollY();
            console.log('deactivated记录位置' + this.saveY);
            //2.取消全局事件的监听
            this.$bus.$off('itemImgLoad',this.itemImgListener)
        },
        created() {
            //1.请求多个数据
            this.getHomeMultidata();
            //2.请求商品数据
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');
        },
        // mounted() {
        //     //接受函数debounce的返回值
        //     const refresh = debounce(this.$refs.scroll.refresh,200);//注意这里的refresh不要有括号，有括号拿到的是返回值，没有传的就是这个函数
        //     //1.监听item中图片加载完成
        //     this.itemImgListener = () =>{
        //         refresh()
        //     };
        //     this.$bus.$on('itemImageLoad',this.itemImgListener)
        //
        // },
        methods:{
            /*
            * 事件监听相关
            * */
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop';
                        break;
                    case 1:
                        this.currentType = 'new';
                        break;
                    case 2:
                        this.currentType = 'sell';
                        break;
                }
                //让两个tabControl的isActive值保持一致
                if(this.$refs.tabControl1 !== undefined) {
                    this.$refs.tabControl1.isActive = index;
                    this.$refs.tabControl2.isActive = index;
                }
            },
            // 返回顶部
            //放入mixin.js中了
            // backClick(){
                // 通过ref访问scroll中的属性
                // this.$refs.scroll.scrollTo(0,0)
            // },
            contentScroll(position) {
                //1.判断BackTop是否显示
                // this.isShowBackTop = (-position.y) > 1000;
                this.listenShowBackTop(position)
                // 2.决定tabControl是否吸顶(position: fixed)
                this.isTabFixed = (-position.y) > this.tabOffsetTop
                console.log('这个值现在是' + this.isTabFixed);
            },
            loadMore() {
                this.getHomeGoods(this.currentType)
            },
            swiperImageLoad () {
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
                console.log('这个高度是' + this.$refs.tabControl2.$el.offsetTop);
            },
            /*
            * 网络请求相关
            * */
            getHomeMultidata(){
                getHomeMultidata().then(res =>{
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

                    this.$refs.scroll.finishPullUp()
                })
            }
        }
    }

</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    font-size: 15px;
    /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  /*.tab-control{*/
  /*  position: sticky;*/
  /*  !*没达到static，达到flex,但是有的浏览器不支持，手机端一般都支持*!*/
  /*  top: 44px;*/
  /*  z-index: 9;*/
  /*}*/
  .tab-control{
    position: relative;
    z-index: 9;
  }
  .content{
     overflow: hidden;
     position: absolute;
     top: 44px;
     bottom: 44px;
     left: 0;
     right: 0;
    /*background-color: aqua;*/
  }
  /*或者*/
  /*.content{*/
  /*  background-color: antiquewhite;*/
  /*  height: calc(100% - 93px);;*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>




