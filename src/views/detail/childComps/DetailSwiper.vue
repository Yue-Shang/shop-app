<template>
  <swiper  class="dswiper">
    <swiper-item v-for="(item,index) in topImages" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

    export default {
        name: "DetailSwiper",
        components:{
            Swiper, SwiperItem
        },
        props: {
            topImages:{
                type: Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style scoped>
.dswiper{
  height: 300px;
}
.dswiper img{
  padding:0 20% 0 20%;
}
</style>
