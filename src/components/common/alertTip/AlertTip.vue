<!--登录页面提示弹框-->
<template>
  <div class="alert_container">
    <section class="tip_text_container">
      <div class="tip_icon"></div>
      <p class="tip_text">{{alertText}}</p>
      <div class="confrim" @click="closeTip">确认</div>
    </section>
  </div>
</template>

<script>
    export default {
        props: {
            alertText: String
        },

        methods: {
            closeTip () {
                // 分发自定义事件(事件名: closeTip)
                this.$emit('closeTip')
            }
        }
    }
</script>

<style scoped>
  .alert_container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: rgba(0, 0, 0, .5);
  }

    .tip_text_container{
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -90px;
      margin-left: -110px;
      width: 60%;
      animation: tipMove .4s;
      background-color: rgba(255, 255, 255, 1);
      border: 1px;
      padding-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 5px;
    }

      .tip_icon{
        width: 50px;
        height: 50px;
        background: url("~assets/img/login/warning.png") no-repeat;
      }
      .tip_text{
        font-size:14px;
        color:#333;
        line-height:20px;
        text-align:center;
        margin-top:10px;
        padding:0 5px;
      }

      .confrim{
        font-size:18px;
        font-weight:bold;
        margin-top:10px;
        background-color:#FF8198;;
        width:100%;
        text-align:center;
        line-height:35px;
        border:1px;
        color:#fff;
        border-bottom-left-radius:5px;
        border-bottom-right-radius:5px;
      }

</style>
