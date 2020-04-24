<template>
  <div id="home">
    <div class="wrapper">
      <!--    <p>为了让滚动更加顺滑,用better-scroll这个插件</p>-->
      <ul>
        <li>分类列表1</li>
        <li>分类列表2</li>
        <li>分类列表3</li>
        <li>分类列表4</li>
        <li>分类列表5</li>
        <li>分类列表974</li>
        <li>分类列表975</li>
        <li>分类列表976</li>
        <li>分类列表977</li>
        <li>分类列表978</li>
        <li>分类列表979</li>
        <li>分类列表980</li>
        <li>分类列表981</li>
        <li>分类列表982</li>
        <li>分类列表983</li>
        <li>分类列表984</li>
        <li>分类列表985</li>
        <li>分类列表986</li>
        <li>分类列表987</li>
        <li>分类列表988</li>
        <li>分类列表989</li>
        <li>分类列表990</li>
        <li>分类列表991</li>
        <li>分类列表992</li>
        <li>分类列表993</li>
        <li>分类列表994</li>
        <li>分类列表995</li>
        <li>分类列表996</li>
        <li>分类列表997</li>
        <li>分类列表998</li>
        <li>分类列表999</li>
        <li>分类列表1000</li>
        <li>分类列表976</li>
        <li>分类列表977</li>
        <li>分类列表978</li>
        <li>分类列表979</li>
        <li>分类列表980</li>
        <li>分类列表981</li>
        <li>分类列表982</li>
        <li>分类列表983</li>
        <li>分类列表984</li>
        <li>分类列表985</li>
        <li>分类列表986</li>
        <li>分类列表987</li>
        <li>分类列表988</li>
        <li>分类列表989</li>
        <li>分类列表990</li>
        <li>分类列表991</li>
        <li>分类列表992</li>
        <li>分类列表993</li>
        <li>分类列表994</li>
        <li>分类列表995</li>
        <li>分类列表996</li>
        <li>分类列表997</li>
        <li>分类列表998</li>
        <li>分类列表999</li>
        <li>分类列表1000</li>
      </ul>
    </div>
  </div>

</template>

<script>
    import BScroll from '@better-scroll/core'
    import Pullup from '@better-scroll/pull-up'

    BScroll.use(Pullup)
    export default {
        name: "Category.vue",
        data (){
            return{
               scroll:null
            }
        },
        //注意这里用的生命周期是mounted，created是在组件创建完成之后调用的，这时候还没有挂载模板所以找不到wrapper
       mounted() {
            // new BScroll(document.querySelector('.content'))直接查找标签
           this.scroll = new BScroll(document.querySelector('.wrapper'),{
                probeType:3,
               pullUpLoad: true
            })
           this.scroll.on('scroll',(position) => {
               // console.log(position)
           })
           this.scroll.on('pullingUp',() =>{
               console.log('上拉加载更多')
               this.scroll.finishPullUp()//标识一次上拉加载动作结束。
           })
        }
    }
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
.wrapper{
  /*height: 150px;*/
  background-color: antiquewhite;
    height: calc(100% - 93px);;
    overflow: hidden;
    margin-top: 44px;
}
</style>
