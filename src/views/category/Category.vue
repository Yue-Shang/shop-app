<template>
  <div id="category">
    <nav-bar class="category-nav"><div slot="center">分类</div></nav-bar>
    <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick" ref="tabControl1" class="tab-control1" v-show="isTabFixed"/>
    <div class="content">
      <category-list :category="category" @selectUtem="selectUtem"/>
      <scroll id="tab-content"
              :data="[categoryData]"
              :pull-up-load="true"
              :probe-type="3"
              @scroll="contentScroll"
              ref="scroll">
         <div>
            <category-goods :subcategories="showSubcategory" @GoodsImageLoad="GoodsImageLoad"/>
            <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick" ref="tabControl2"/>
            <goods-list :goods="showCategoryDetail" class="goods-list"/>
         </div>
        </scroll>
    </div>
  </div>
</template>

<script>
    import CategoryList from "./childComps/CategoryList";
    import CategoryGoods from "./childComps/CategoryGoods";

    import NavBar from "components/common/navbar/NavBar";
    import GoodsList from "components/content/goods/GoodsList";

    import Scroll from "components/common/scroll/Scroll";
    import TabControl from "components/common/tabControl/TabControl";

    import {getCategoryList,getSubcategory,getCategoryDetail} from "network/Category";
    import {POP, SELL, NEW} from "@/common/const";
    import {tabControlMixin} from "@/common/mixin";
    export default {
        name: "Category",
        components:{
            NavBar,
            Scroll,
            TabControl,
            CategoryList,
            CategoryGoods,
            GoodsList

        },
        mixins: [tabControlMixin],
        data (){
            return{
                category:[],
                // isTabFixed:false,
                isActive: -1,
                categoryData: {},
                tabOffsetTop: 0,
                isTabFixed: false
            }
        },
        created() {
            this.getCategoryList()
        },
        computed: {
            showSubcategory() {
                console.log(this.isActive);
                if (this.isActive === -1) return {};
                return this.categoryData[this.isActive].subcategories;
            },
            showCategoryDetail() {
                if (this.isActive === -1) return []
                return this.categoryData[this.isActive].categoryDetail[this.currentType]
            }
        },
        methods:{
            getCategoryList(){
                getCategoryList().then(res =>{
                    // 1.获取分类数据
                    this.category = res.data.category.list
                    // // 2.初始化每个类别的子数据
                    for (let i = 0; i < this.category.length; i++) {
                        this.categoryData[i] = {
                            subcategories:{},
                            categoryDetail: {
                                'pop': [],
                                'new': [],
                                'sell': []
                            }
                        }
                    }
                    this.getSubcategory(0)
                })
            },
            selectUtem(index){
                this.getSubcategory(index)
            },
            getSubcategory(index){
                this.isActive = index
                const maitKey = this.category[index].maitKey;
                getSubcategory(maitKey).then(res =>{
                    this.categoryData[index].subcategories=res.data
                    this.categoryData = {...this.categoryData}
                    this.getCategoryDetail(POP)
                    this.getCategoryDetail(NEW)
                    this.getCategoryDetail(SELL)
                })
            },
            getCategoryDetail(type){
                const miniWallkey = this.category[this.isActive].miniWallkey;
                getCategoryDetail(miniWallkey, type).then(res =>{
                    console.log(res);
                    this.categoryData[this.isActive].categoryDetail[type] = res
                    this.categoryData = {...this.categoryData}
                })
            },
            GoodsImageLoad() {
                // offsetTop 指“tabControl距category-goods层下边框的距离，因为距其上边最近的是category-goods层下边框
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
                console.log('这个高度是' + this.$refs.tabControl2.$el.offsetTop);
            },
            contentScroll(position) {
                // 决定tabControl是否吸顶(position: fixed)
                this.isTabFixed = (-position.y) > this.tabOffsetTop
                // console.log('这个值现在是' + this.isTabFixed);
            },
        }
    }
</script>

<style scoped>
  #category{
    height: 100vh;
  }
  .category-nav {
    background-color: var(--color-tint);
    color: #ffffff;
    font-size: 15px;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }
  #tab-content {
    height: 100%;
    flex: 1;
  }
  .tab-control1{
    position: relative;
    z-index: 9;
    margin-left: 100px;
  }
  /*.category-content{*/
  /*  height: 100%;*/
  /*  width: 75%;*/
  /*  float: right;*/
  /*}*/
  /*.goods-list{*/
  /*  width: 100%;*/
  /*}*/
  /*.tab-control{*/
  /*  position: relative;*/
  /*  z-index: 9;*/
  /*  float: right;*/
  /*  width: 100%;*/
  /*}*/


  /*#tab-content {*/
  /*  height: 100%;*/
  /*  flex: 1;*/
  /*}*/
</style>
