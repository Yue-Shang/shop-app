<!--这是评论区商品图片点击放大功能,图片左右滑动功能待完善-->
<template>
  <div class="commentPhoto" v-if="isShow">
    <div class="info-content">
      <div class="info-imgs">
          <img :src="item" v-for="(item,index) in commentPhoto.images" :key="index" @click="toggleShow">
      </div>
      <div class="info-detail">
        <div class="user-name">{{commentPhoto.user.uname}}</div>
        <span class="user-style">{{commentPhoto.style}}</span>
        <p class="user-content">{{commentPhoto.content}}</p>
      </div>
    </div>
  </div>
</template>


<script>

    export default {
        props: {
            commentPhoto: {
                type:Object,
                default() {
                    return {};
                }
            }
        },

        data () {
            return {
                isShow: false,
                startPointX: 0,
                changePointX: 0,
                showIndex: 0,
            }
        },

        methods: {
            toggleShow () {
                this.isShow = !this.isShow
            },
        },
    }
</script>

<style scoped>
  .commentPhoto{
    position: relative;
    display: flex;
    /*z-index: 10;*/
    /*width: 80%;*/
    /*position:fixed;*/
    /*left:50%;*/
    top:-200px;
    /*bottom:48px;*/
    z-index:101;
    width:375px;
    height:600px;
    background: rgba(0,0,0,0.8);
  }
  .info-imgs{
    position:absolute;
    left:50%;
    top:270px;
    transform:translate(-50%, -50%);
    width:80%;
    height:65%;
    z-index:66;
    background:#fff;
    border-radius:5px;
    overflow: hidden;
  }
  .info-imgs img{
    width: 100%;
    height: 100%;
    float: left;
    margin-right: 20px;

  }
  .info-detail{
    position: absolute;
    padding: 18px;
    bottom: 10px;
  }
  .user-name,.user-content{
    color: #ffffff;
    font-size: 14px;
  }
  .user-style{
    color: #ABABAB;
    font-size: 12px;
  }
</style>
