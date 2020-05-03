<template>
    <div class="toast" v-show="isShow">
      <div>{{message}}</div>
    </div>
</template>

<script>
    export default {
        name: "Toast",
        // props:{
        //     message:{
        //         type:String,
        //         default: ''
        //     },
        //     isShow:{
        //         type: Boolean,
        //         default: false
        //     }
        // },
        data() {
            return {
                message: '',
                isShow: false
            }
        },
        methods:{
            show(message, duration = 1500) {//设置默认值
                this.isShow = true;
                this.message = message;

                setTimeout(() => {
                    this.isShow = false;
                    this.message = ''
                },1500)
            }
        }
    }
</script>

<style scoped>
 .toast{
   position: fixed;
   top: 50%;
   left: 50%;
   border-radius: 5px;
   padding: 8px 10px;
   color: #ffffff;
   background-color: rgba(0,0,0,.7);

   z-index: 999;

   /*这是我们会发现框框向右偏移,用transform调位置*/
   transform: translate(-50%,-50%);
 }
</style>
