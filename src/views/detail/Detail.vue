<template>
<!--    详情页面-->
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3"
    >
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
<!--      商品详情-->
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
<!--      商品参数-->
    <detail-param-info ref="params" :param-info="paramInfo"/>
<!--      用户评价-->
    <detail-comment-info ref="comment" :comment-info="commentInfo"/>
<!--      推荐列表-->
    <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
<!--    添加购物车导航-->
    <detail-bottom-bar @addCart="addToCart" :shop-cart="shopCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <toast :message="message" :isShow="isShow"/>
  </div>
</template>
<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  import Toast from "components/common/toast/Toast";
  import BackTop from "components/common/backTop/BackTop";

  import {getDetail, Goods, Shop, GoodsParam,getRecommend} from "network/detail";
  import {itemListenerMixin,backTopMixin} from "common/mixin";
  import {debounce} from "common/utils";

  import { mapActions } from 'vuex'


  export default {
        name: "Detail",
        components: {
            Toast,
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            Scroll,
            GoodsList,
            DetailBottomBar,
            BackTop
        },
        mixins: [itemListenerMixin,backTopMixin],
        data() {
            return {
                iid:null,
                topImages:[],
                goods: {},
                shop:{},
                detailInfo:{},
                paramInfo:{},
                commentInfo:{},
                recommends:[],
                shopCart:{},//接收添加到到购物车商品信息
                themeTopYs: [],
                getThemTopY:null,
                currentIndex: 0,
                isShowBackTop:false,
                message: '',
                isShow: false,
            }
        },
        created() {
            // 1.保存传入的iid
            this.iid = this.$route.params.iid;

            //2.根据iid请求数据
            this.getDetail();

            //3.请求推荐数据
            this.getRecommend()

            //4.给getThemTopY赋值(对给getThemTopY进行赋值的操作进行防抖)
            this.getThemTopY = debounce(() =>{
                this.themeTopYs = []
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop)//参数的offsetTop
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)//评论的offsetTop
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)//推荐的offsetTop
                this.themeTopYs.push(Number.MAX_VALUE)
                console.log(this.themeTopYs);
            },100)
        },
        destroyed(){
            this.$bus.$off('itemImageLoad',this.itemImgListener)
        },
        methods:{
            ...mapActions(['addCart']),
            getDetail() {
                getDetail(this.iid).then(res => {
                    console.log(res);

                    const data = res.result;

                    // 1.获取顶部轮播图数据
                    this.topImages = data.itemInfo.topImages;

                    //2.获取商品信息
                    this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);

                    //3.创建店铺信息的对象
                    this.shop = new Shop(data.shopInfo);

                    // 4.保存商品的详情数据
                    this.detailInfo = data.detailInfo;

                    // 5.获取参数的信息
                    this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

                    //6.获取评论数据
                    //有的商品没有评论，所以我们要判断一下
                    if (data.rate.cRate !== 0) {
                        this.commentInfo = data.rate.list[0]
                    }
                    //7.获取购物车选择的商品参数
                    this.shopCart = data.skuInfo
                    console.log(this.shopCart);
                })
            },
            getRecommend() {
                getRecommend().then(res => {
                    this.recommends = res.data.list
                })
            },
            imageLoad() {
                this.$refs.scroll.refresh()
                this.getThemTopY()
            },
            titleClick(index) {
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]+44,100)
                // 如果有一个没有比如评论没有,我们就跳到下一个
                if(isNaN(-this.themeTopYs[index])==true){
                    this.$refs.scroll.scrollTo(0, -this.themeTopYs[index + 1]+44,100)
                }
                console.log(-this.themeTopYs[index]);
            },
            contentScroll(position) {
                //监听滚动
                // console.log(position);
                // 1.获取y值
                const positionY = -position.y+44
                //2.positionY和主题中值进行对比
                let length = this.themeTopYs.length
                for (let i=0;i<length-1;i++) {
                    if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
                        this.currentIndex = i;
                        //鼠标移动到两个值交界处时打印
                        this.$refs.nav.isActive = this.currentIndex//实现联动，让索引值等于currentIndex值
                    }
                }
                //3.是否显示回到顶部
                  this.listenShowBackTop(position)
            },
            addToCart() {
                //1.获取购物车需要展示的信息
                const product = {}
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.newPrice;
                product.lowNowPrice = this.goods.lowNowPrice
                product.iid = this.iid;

                //2.将商品添加到购物车中
                this.addCart(product).then(res => {
                    // 在这里使用我们的组件
                    // this.isShow = true;
                    // this.message = res;
                    //
                    // setTimeout(() => {
                    //     this.isShow = false;
                    //     this.message = ''
                    // },1500)
                    this.$toast.show(res)
                })
                // this.$store.dispatch('addCart',product).then(res =>{
                //     console.log(res)
                // })
            },
        }
    }
</script>

<style scoped>
  .detail{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content{
    height: calc(100% - 44px - 500px);
  }
</style>
