<template>
  <transition name="fade">
    <div class="self-modal" v-show='showModal' @click="cancelClick" v-bind:style="styleObj" @click.prevent.stop>
      <!--图片放大功能-->
      <!--@click.stop 阻止事件冒泡-->
      <div class="imgMask" v-if="showBigImg" @click.stop="showBigImg=!showBigImg">
        <div class="showImg">
          <mt-swipe :auto="0" :show-indicators="false" :continuous="false" :defaultIndex="num">
            <mt-swipe-item v-for="(item,index) in imgUrls" :key="item.id">
              <div class="testNum"  >{{index+1+'/'+imgUrls.length}}</div>
              <img :src="item.img" class="img"/>
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
      <!-- 自定义内容：点击不同尺寸显示不同图片 -->
      <div  :class="[isIphoneX ? 'isIphoneX-career' : 'career']" @click.prevent.stop>
        <div class="selectGoods" >
          <div class="bgColse"  @click="cancelClick">
            <img class="close" src="../../../assets/Close@2x.png" >
          </div>
          <div class="picture" @click="bigImg(0)">

            <img class="headerImg" v-if="selectedGoods.img===undefined"  v-bind:src="mainPic">
            <img class="headerImg" v-else  v-bind:src="selectedGoods.img">
          </div>
<!--          初始价格/库存/图片-->
          <div class="priceAndRules" v-if="selectedGoods.img===undefined">
            <div class="price">{{defaultprice}}</div>
            <div class="stock">库存{{stock}}件</div>
            <div class="selected">{{expressSelected}}</div>
          </div>
          <div class="priceAndRules" v-else>
            <div class="price">¥ {{selectedGoods.price}}</div>
            <div class="stock">库存{{selectedGoods.stock}}件</div>
            <div class="selected">{{expressSelected}}</div>
          </div>
        </div>
        <div class="selectGoods">
          <div class="selStyle">
            <div class="selected">颜色分类</div>
            <div v-for="(item,index) in selectStyles" :key="index"  class="selStyle">
              <div class="styleSel"  @click="isSelectCol(index,allStyles[index].style)" v-if="allStyles[index].isHasStyle&&!item.isSelectStyle">{{allStyles[index].style}}</div>
              <div class="selectedStyle" v-else-if="allStyles[index].isHasStyle&&item.isSelectStyle" >{{allStyles[index].style}}</div>
              <div class="noStyleRules" v-else >{{allStyles[index].style}}</div>
            </div>
          </div>
          <div class="selRules">
            <div class="selected">选择尺码</div>
            <div v-for="(item,index) in selectRules" :key="index" class="selStyle">
              <div class="styleRules" @click="isSelectSize(index,allRules[index].size)" v-if="allRules[index].isHasRule&&!item.isSelectRule">{{allRules[index].size}}</div>
              <div class="selectedStyle"  v-else-if="allRules[index].isHasRule&&item.isSelectRule">{{allRules[index].size}}</div>
              <!--<div class="noStyleRules"  v-if="!allRules[index].isHasRule">{{allRules[index].size}}</div>-->
              <div class="noStyleRules" v-else >{{allRules[index].size}}</div>
            </div>
          </div>
        </div>
        <div class="num">
          <div class="buyNum">购买数量</div>
          <div class="selNum">
            <img src="../../../assets/Reduce@2x.png" v-if="buyNum>1" @click="minus">
            <img src="../../../assets/Reduce@2x.png" v-else>
            <div class="dataNum">{{buyNum}}</div>
            <img src="../../../assets/Add@2x.png" @click="add">
          </div>
        </div>
        <div class="bottom"  @click="sureClick">确定</div>
        <!--<div v-else class="bottom">-->
        <!--<div></div>-->
        <!--</div>-->
      </div>
      <!--<slot></slot>-->
    </div>
  </transition>
</template>

<script>

    var goodId
    function minSort (Arr) {
        var min
        for (var i = 0; i < Arr.length; i++) {
            for (var j = i; j < Arr.length; j++) {
                if (Arr[i].size > Arr[j].size) {
                    min = Arr[j]
                    Arr[j] = Arr[i]
                    Arr[i] = min
                }
            }
        }
        return Arr
    }
    export default {
        name: "selectRules",
        data () {
            return {
                isSelectStyle: '',
                isSelectRule: '',
                selectedGoods: {},
                selectedGoodsId: '',
                imgUrls: [], // 显示图片
                showBigImg: false,
                isSelStyle: false,
                showModal: false,
                stock: 300,//初始库存
                allStyles: [],
                selectedCartGoods: false,
                expressSelected: '选择 颜色分类 尺码',
                hasStyles: [],
                hasRules: [],
                allRules: [],
                selectStyles: [],
                selectRules: [],
                buyNum: 1,//购买数量
                hasSelectedStyle: '',
                hasSelectedSize: '',
                //把后台传过来的每个样式对应的尺码放到这个数组里，再去重
                  stylesAndRules: Array,
                goodName: '',// 商品名称,
                isIphoneX:false
            }
        },
        props: {
            styleObj: { // 用于承接样式类
                type: Object,
                default: function () {
                    return {
                        position: 'fixed',
                        bottom: 0,
                        top: 0,
                        left: 0,
                        width: '100%',
                        background: 'rgba(113,111,111,0.5)'
                    }
                }
            },
            price: Number,
            defaultprice:'',
            mainPic: '',
            whichBtn: String,
            styleCart:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        methods: {
            // 产品参数
            getSpecifications (id) {
                console.log(this.styleCart);
                console.log('已选中' + this.isSelectStyle)
                goodId = id
                //把数据库里存放不用样式对应不同尺码的数组赋值给stylesAndRules
                this.stylesAndRules = this.styleCart.skus;
                console.log('222222222222222222222222222');
                console.log(this.stylesAndRules);
                // 重新赋值
                this.getRightData()
            },
            getRightData () {
                var _this = this
                var imgArray = []
                var sarLength = _this.stylesAndRules.length
                // 点击方法图片组
                this.imgUrls = this.styleCart.skus
                imgArray.push(this.mainPic)
                this.imgUrls = imgArray
                var allStyles = []//取出的样式放到这里
                var allRules = []//取出的尺码放到这里
                //要求出每种颜色对应的所有尺码对象，求出每种尺码对应的所有颜色对象，要考虑到去重，及是否选中，是否有库存
                for (var i = 0; i < sarLength; i++) {
                    allStyles.push(_this.stylesAndRules[i].style)
                    allRules.push(_this.stylesAndRules[i].size)
                }


                //补充知识点：Array.from()
                //Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和
                  //可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
                // ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
                // Set 本身是一个构造函数，用来生成 Set 数据结构。

                // 每个颜色对应尺寸设置是否有库存的标签
                var newAllRules = []
                for (var i = 0; i < Array.from(new Set(allRules)).length; i++) {
                    var selStyle = {
                        'size': Array.from(new Set(allRules))[i],//把去重之后尺码给到这个对象中的‘size’
                        'isHasRule': false
                    }
                    newAllRules.push(selStyle)//把放有尺码的对象selStyle追加到newAllRules这个数组里
                }
                console.log('这是' + JSON.stringify(newAllRules))

                for (var i = 0; i < newAllRules.length; i++) {
                    for (var j = 0; j < _this.stylesAndRules.length; j++) {
                        if (_this.stylesAndRules[j].size === newAllRules[i].size && _this.stylesAndRules[j].stock > 0) {
                            console.log('相同的尺寸' + newAllRules[i].size + '库存' + _this.stylesAndRules[j].stock)
                            // if (_this.stylesAndRules[j].stock > 0) {
                            newAllRules[i].isHasRule = true
                            break
                            // }
                        }
                    }
                }

                _this.allRules = minSort(newAllRules)//对尺码做了排序（冒泡排序）
                // 每个尺寸对应的颜色设置是否有库存标签
                var newAllStyles = []
                for (var i = 0; i < Array.from(new Set(allStyles)).length; i++) {
                    var selRule = {
                        'style': Array.from(new Set(allStyles))[i],//把去重之后样式给到这个对象中的‘style’
                        'isHasStyle': false
                    }
                    newAllStyles.push(selRule)
                }
                console.log('111111111111111111111111111111111111111');
                console.log(newAllStyles);
                for (var i = 0; i < newAllStyles.length; i++) {
                    for (var j = 0; j < _this.stylesAndRules.length; j++) {
                        if (_this.stylesAndRules[j].style === newAllStyles[i].style) {
                            if (_this.stylesAndRules[j].stock > 0) {
                                newAllStyles[i].isHasStyle = true
                                break
                            }
                        }
                    }
                }
                _this.allStyles = newAllStyles

                // 每个颜色对应所有的尺码对象
                var selStyles = []
                var selRules = []
                // 获取每个颜色对应的尺寸
                for (var i = 0; i < _this.allStyles.length; i++) {
                    var allRules = []
                    for (var j = 0; j < _this.stylesAndRules.length; j++) {
                        if (_this.allStyles[i].style === _this.stylesAndRules[j].style) {
                            allRules.push(_this.stylesAndRules[j])
                        }
                    }
                    console.log('已选中' + _this.isSelectStyle)
                    var styleAndRule
                    if (_this.isSelectStyle != '' && _this.allStyles[i].style === _this.isSelectStyle) {
                        styleAndRule = {
                            'isSelectStyle': true
                        }
                    } else {
                        styleAndRule = {
                            'isSelectStyle': false
                        }
                    }
                    var eveStyle = _this.allStyles[i].style
                    styleAndRule[eveStyle] = allRules
                    selStyles.push(styleAndRule)
                }

                // 每个尺码对应的样式对象：
                for (var i = 0; i < _this.allRules.length; i++) {
                    var allStyles = []
                    for (var j = 0; j < _this.stylesAndRules.length; j++) {
                        if (_this.allRules[i].size === _this.stylesAndRules[j].size) {
                            allStyles.push(_this.stylesAndRules[j])
                        }
                    }
                    var eveRule = _this.allRules[i].size
                    var styleAndRule
                    if (_this.isSelectRule != '' && _this.allRules[i].size === _this.isSelectRule) {
                        styleAndRule = {
                            'isSelectRule': true
                        }
                    } else {
                        styleAndRule = {
                            'isSelectRule': false
                        }
                    }
                    styleAndRule[eveRule] = allStyles
                    selRules.push(styleAndRule)
                }
                _this.selectRules = selRules
                _this.selectStyles = selStyles
                console.log(_this.selectStyles);
            },

            // 确定
            sureClick () {
                if (this.isSelectStyle === '') {
                    Toast('请选择颜色')
                    return
                }
                if (this.isSelectRule === '') {
                    Toast('请选择尺码')
                    return
                }
                var _this = this

                // this.showModal = false
                this.cancelClick()
                // 保存选中商品缓存
                var goodsDetail = {
                    goosName: _this.goodName,
                    id: goodId,
                    goods: _this.selectedGoods,
                    nums: _this.buyNum
                }
                var goodsList = []
                if (this.whichBtn === '1') {
                    goodsList.push(goodsDetail)
                    localStorage.setItem('goods', JSON.stringify(goodsList))
                    this.$router.push({
                        path: 'confirmationOrder',
                        query: {
                            page: 'buy'
                        }
                    })
                } else if (this.whichBtn === '2') {
                    goodsDetail['selectedCartGoods'] = false

                    this.$emit('getCartNum', this.buyNum)
                    this.addCars({item: goodsDetail, id: _this.selectedGoodsId})
                } else if (this.whichBtn === '3') {
                    goodsDetail['selectedCartGoods'] = _this.selectedCartGoods
                    //加入购物车
                }
                return new Promise(function (resolve) {
                    resolve('sure')
                }, function (reject) {
                })
            },
            // 取消
            cancelClick () {
                console.log('取消')
                this.$emit('colseAlter')
                this.showModal = false
                return new Promise(function (resolve) {
                    resolve('cancel')
                }, function (reject) {
                })
            },
            // 点击选中颜色
            isSelectCol (index, style) {
                console.log('开始点击选中颜色吧');
                var _this = this
                var hasRules = []
                for (var i = 0; i < _this.selectStyles.length; i++) {
                    if (index === i) {
                        _this.selectStyles[i].isSelectStyle = true
                        for (var key in _this.selectStyles[i]) {
                            if (key === style) {
                                hasRules = _this.selectStyles[i][key]
                                _this.isSelectStyle = style
                            }
                        }
                    } else {
                        _this.selectStyles[i].isSelectStyle = false
                    }
                }
                // 所有尺寸全为空
                for (var j = 0; j < _this.allRules.length; j++) {
                    _this.allRules[j].isHasRule = false
                }
                // 库存中存在的致为可选
                for (var i = 0; i < hasRules.length; i++) {
                    for (var j = 0; j < _this.allRules.length; j++) {
                        if (_this.allRules[j].size === hasRules[i].size && hasRules[i].stock > 0) {
                            _this.allRules[j].isHasRule = true
                        }
                    }
                    if (_this.isSelectRule !== '') {
                        if (hasRules[i].size === _this.isSelectRule) {
                            _this.selectedGoods = hasRules[i]
                            _this.imgUrls = hasRules[i].img
                        }
                    }
                }
                if (_this.isSelectRule === '') {
                    _this.expressSelected = '请选择尺码'
                } else {
                    _this.expressSelected = '已选' + ' ' + _this.isSelectStyle + ' 尺码' + _this.isSelectRule
                }
            },
            // 选择尺寸
            isSelectSize (index, rule) {
                var _this = this
                var hasStyles = []
                for (var i = 0; i < _this.selectRules.length; i++) {
                    if (index === i) {
                        _this.selectRules[i].isSelectRule = true
                        for (var key in _this.selectRules[i]) {
                            if (key === rule) {
                                hasStyles = _this.selectRules[i][key]
                                _this.isSelectRule = rule
                            }
                        }
                    } else {
                        _this.selectRules[i].isSelectRule = false
                    }
                }
                // 所有尺寸全为空
                for (var j = 0; j < _this.allStyles.length; j++) {
                    _this.allStyles[j].isHasStyle = false
                }
                // 库存中存在的致为可选
                for (var i = 0; i < hasStyles.length; i++) {
                    for (var j = 0; j < _this.allStyles.length; j++) {
                        if (_this.allStyles[j].style === hasStyles[i].style && hasStyles[i].stock > 0) {
                            _this.allStyles[j].isHasStyle = true
                        }
                    }

                    if (_this.isSelectStyle !== '') {
                        if (hasStyles[i].style === _this.isSelectStyle) {
                            _this.selectedGoods = hasStyles[i]
                            _this.imgUrls = hasStyles[i].img
                        }
                    }
                }
                console.log(_this.isSelectStyle)
                if (_this.isSelectStyle === '') {
                    _this.expressSelected = '请选择颜色'
                } else {
                    _this.expressSelected = '已选' + ' ' + _this.isSelectStyle + ' 尺码' + _this.isSelectRule
                }
            },
            // 增添数辆
            add () {
                if (this.isSelectStyle === '') {
                    Toast('请选择颜色')
                    return
                }
                if (this.isSelectRule === '') {
                    Toast('请选择尺码')
                    return
                }
                if (this.buyNum < this.selectedGoods.stock) {
                    this.buyNum++
                } else {
                    Toast('库存不足')
                }
            },
            // 减少购买数辆
            minus () {
                this.buyNum--
            },
            // 看大图
            bigImg (index) {
                this.showBigImg = true
                this.num = index
            }
        }
    }
</script>
<style scoped>
  .self-modal{
    z-index: 3006;
  }
  .isIphoneX-career{
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    position: fixed;
    width: 100%;
    bottom: 0px;
    background: white !important;
    padding-bottom: 34px;
  }
  .career{
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    position: fixed;
    width: 100%;
    bottom: 0px;
    background: white !important;
  }
  .selectGoods{
    margin: 1rem;
    padding-bottom: 10px;
    border-bottom:1px solid #ebebeb ;
    text-align: left;
  }
  .bgColse{
    margin-top: -1rem;
    margin-right: -1rem;
    height: 4rem;
    text-align: center;
    align-items: center;
    width: 4rem;
    float: right;
  }
  .close{
    margin-top: 1rem;
    margin-right: -0.5rem;
    width: .59375rem;
    height: .5925rem;

  }
  .picture{
    width: 5.3125rem;
    height: 5.3125rem;
    display: inline-block;
  }
  .headerImg{
    width: 5.3125rem;
    height: 5.3125rem;

  }
  .imgMask{
    position: absolute;
    height: 100%;
    width:100%;
    top:0px;
    left:0;
    z-index: 100;
    background:rgba(0,0,0,1);
  }
  .testNum{
    position: absolute;
    width: 100%;
    padding-top: 2rem;
    color: white;
    text-align: center;
    font-size: .875rem;
    font-weight: bold;
  }
  .showImg{
    height: 100%;
    width: 100%;
    position: absolute;
    align-items: center;
    left: 0px;
    top:0;
  }
  .img{
    object-fit: scale-down;
    height: 100%;
    width: 100%;
  }
  .priceAndRules{
    text-align: left;
    display: inline-block;
  }
  .price{
    color: #ff6f8c;
    font-size: 1.5rem;
  }
  .stock{
    color: #999999;
    font-size: .75rem;
  }
  .selected{
    color: #333333;
    font-size:.875rem;
  }
  .selStyle .selected{
    padding-top: 5px;
  }
  .selRules .selected{
    padding-top: 10px;
  }
  .selStyle{
    display:inline-block;
  }
  .styleSel{
    margin: .3125rem;
    border:1px solid #d6d6d6;
    border-radius:1.5625rem;
    color: #333333;
    background: white;
    font-size:.75rem;
    height: 2.1875rem;
    width: auto;
    text-align: center;
    line-height: 2.1875rem;
    display: inline-block;
  }
  .selectedStyle{
    margin: .3125rem;
    border-radius:1.5625rem;
    color: white;
    background: #ff6f8c;
    font-size:.75rem;
    height: 2.1875rem;
    width: 4.3125rem;
    text-align: center;
    line-height: 2.1875rem;
    display: inline-block;
  }
  .styleRules{
    margin: .3125rem;
    border:1px solid #d6d6d6;
    border-radius:1.5625rem;
    color: #333333;
    background: white;
    font-size:.75rem;
    height: 2.1875rem;
    width: 4.3125rem;
    text-align: center;
    line-height: 2.1875rem;
    display: inline-block;
  }
  .noStyleRules{
    margin: .3125rem;
    border:1px solid #d6d6d6;
    border-radius:1.5625rem;
    color: #c4c4c4;
    background:#f8f8f8 ;
    font-size:.75rem;
    height: 2.1875rem;
    width: 4.3125rem;
    text-align: center;
    line-height: 2.1875rem;
    display: inline-block;
  }
  .num{
    text-align: left;
    height: 3.125rem;
    padding: 0px 15px;
    display: flex;
    justify-content: space-between;
  }
  .selNum{
    margin-top: .3125rem;
    height: 2.5rem;
  }
  .num img{
    padding-top: 0px;
    width: 1.375rem;
    height: 1.375rem;
    float: left;
  }
  .dataNum{
    margin-top: 0px;
    padding: 0px 10px;
    display: inline-block;
    color: #ff6f8c;
    height: 1.375rem;
    line-height: 1.375rem;
    font-size: .875rem;
    float: left;
  }

  .buyNum{
    line-height: 2.5rem;
    display: inline-block;
  }
  /*.isIphoneX-bottom{*/
  /*position: absolute;*/
  /*width: 100%;*/
  /*font-size: 1rem;*/
  /*text-align: center;*/
  /*color: white;*/
  /*background: #3fc9a5;*/
  /*line-height: 3.5875rem;*/
  /*height: 4.5875rem;*/
  /*bottom: 0px;*/
  /*}*/
  .bottom{
    width: 100%;
    font-size: 1rem;
    text-align: center;
    color: white;
    background: #ff6f8c;
    line-height:2.5rem;
    height: 2.5rem;
    border-radius: 10rem;
  }
</style>

