<!--这里是滚动插件-->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
    import BScroll from '@better-scroll/core'
    import Pullup from '@better-scroll/pull-up'

    BScroll.use(Pullup)

    export default {
        name: "Scroll",
        props:{
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            },
            data: {
                type: Array,
                default: () => {
                    return []
                }
            },
        },
        data(){
            return {
                scroll: null
            }
        },
        methods:{
            scrollTo(x, y, time =300) {
                //逻辑与，前面不执行，后面都不执行
                this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                this.scroll.finishPullUp()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            },
            getScrollY() {
                //这里不能写 return this.scroll ? this.scroll.y : 0否则点详情再返回会回到顶部，有bug
                return this.scroll.y
            }
        },
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,//控制div是否可以点击
                probeType: this.probeType,
                pullUpLoad: this.pullUpLoad
            })
          // 监听滚动的位置
            if(this.probeType === 2 || this.probeType === 3) {
              this.scroll.on('scroll',(position) =>{
                  this.$emit('scroll', position)
                  // console.log(position);
              })
            }
            // 监听滚动到底部
            if(this.pullUpLoad) {
                this.scroll.on('pullingUp', () => {
                    this.$emit('pullingUp')
                })
            }
            // console.log(this.scroll)
            //打印BScroll {…}
            // 里面有一个属性scrollerHeight,我们看看这个值是多少，值太小了不对（应该在1000以上，最好是4000上下）

        },
        watch: {
            data() {
                setTimeout(this.refresh, 20)
            }
        }

    }
</script>

<style scoped>
</style>
