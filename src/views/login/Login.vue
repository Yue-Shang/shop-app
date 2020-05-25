<template>
    <div class="login">
      <nav-bar>
        <div slot="left" @click="backClick" class="login-back"></div>
      </nav-bar>
      <div><span class="login-logo"></span></div>
      <div class="login-header">
        <a href="javascript:;" :class="{active: isActive}" @click="isActive=true"><span>短信登录</span></a>
        <a href="javascript:;" :class="{active: !isActive}" @click="isActive=false"><span>密码登录</span></a>
      </div>
      <div class="login_content">
        <form>
          <!-- 短信登陆 -->
          <div :class="{active2: !isActive}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification"
                      :class="{right_phone: rightPhone}"
                      @click.prevent="getCode">{{codeTime>0 ? `已发送(${codeTime}s)` : '获取验证码'}}</button>
              <!--prevent禁止默认行为-->
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <!-- 密码登陆 -->
          <div :class="{active2: isActive}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <!-- 是否显示密码 -->
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{showPwd ? '隐藏' : '显示'}}</span>
                </div>
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="other-login">————其他登录方式————</a>
<!--        <router-link to="/oauth">-->
          <div class="weixin"></div>
<!--        </router-link>-->
      </div>
      <alert-tip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"/>
      </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import AlertTip from "components/common/alertTip/AlertTip";
    export default {
        name: "Login",
        components: {AlertTip, NavBar},
        data(){
            return{
              isActive:true,
              phone:'',//手机号
              codeTime: 0, // 验证码倒计时
              code:'',//验证码
              name:'',//用户名
              pwd:'',//用户密码
              showPwd:false,//是否显示密码
              showAlert:false,//是否显示校验弹框
              alertText:'',//提示文本
            }
        },
        methods:{
            //启动倒计时
            async getCode(){
                //如果当前没有计时
                if(!this.codeTime){
                    //发送ajax请求（向指定手机号发送验证短信）
                    this.codeTime = 30
                    const intercalId = setInterval(()=>{
                        this.codeTime--
                        if (this.codeTime<=0){
                            //停止计时
                            clearInterval(intercalId)
                        }
                    },1000)

                }
            },
            //异步登录按钮
            alertMessage(alertText){
              this.showAlert = true
              this.alertText = alertText
            },
            login(){
                //前台表单验证
                if(this.isActive){//短信登录
                    const {rightPhone,authCode,phone,code} = this
                    if (!this.rightPhone){
                        //手机号不正确
                        this.alertMessage('手机号不正确');
                    }else if (!this.authCode) {
                        //验证必须是6位数字
                        this.alertMessage('验证必须是6位数字');
                    }
                }else{//密码登录
                    const {name,pwd} = this
                    if (!this.name) {
                        //用户名必须指定
                        this.alertMessage('用户名必须指定');
                    }else if(!this.pwd) {
                        //密码必须指定
                        this.alertMessage('密码必须指定');
                    }
                }
            },
            //弹框的“确定”按钮
            closeTip(){
                this.showAlert = false
                this.alertText = ''
            },
            //返回按钮
            backClick(){
                this.$router.back()
            }
        },
        computed:{
            rightPhone(){
                return /^1\d{10}$/.test(this.phone)
            },
            authCode(){
                return /^\d{6}$/.test(this.code)
            }
        }
    }
</script>

<style scoped>
     .login{
       height: 667px;
       width: 375px;
     }
     .login-back{
       width: 44px;
       height: 44px;
       background: url("~assets/img/login/loginback.png") no-repeat;
     }
     .login-logo{
       background: url("~assets/img/login/shoplogo.png") 0 0/100%;
       width: 100px;
       height: 100px;
       position: absolute;
       top: 80px;
       left: 135px;
       border-radius: 50px;
     }
     .login-header{
       padding: 0 50px;
       display: flex;
     }
     .login-header a{
       padding-top: 160px;
       text-align: center;
       flex: 1;
     }
     .active span{
       border-bottom:3px solid #FF8198;
       color: #FF8198;
     }
     .active2 {
       display: none;
     }
     .login_content{
       padding: 0 30px;
     }
     .login_content input {
       width: 100%;
       height: 100%;
       padding-left: 10px;
       box-sizing: border-box;
       border: 1px solid #ddd;
       border-radius: 4px;
       outline: 0;
       font: 400 14px Arial;
     }
     .login_content input:focus{
       border: 1px solid #FF8198;
     }
     .login_message {
       position: relative;
       margin-top: 16px;
       height: 48px;
       font-size: 14px;
       background: #fff;
     }
     .get_verification {
       position: absolute;
       top: 50%;
       right: 10px;
       transform: translateY(-50%);
       border: 0;
       color: #ccc;
       font-size: 14px;
       background: transparent;
     }
     .right_phone{
       color: black;
     }
     .login_verification {
       position: relative;
       margin-top: 16px;
       height: 48px;
       font-size: 14px;
       background: #fff;
     }
     .switch_button {
       font-size: 12px;
       border: 1px solid #ddd;
       border-radius: 8px;
       transition: background-color .3s, border-color .3s;
       padding: 0 6px;
       width: 45px;
       height: 16px;
       line-height: 16px;
       color: #fff;
       position: absolute;
       top: 50%;
       right: 10px;
       transform: translateY(-50%);
     }
     .switch_text {
       float: right;
       color: #cdcdcd;
     }
     .on{
       background: #FF8198;;
     }
     .off{
       background: white;
     }
     .switch_circle{
       position:absolute;
       top:-1px;
       left:-1px;
       width:16px;
       height:16px;
       border:1px solid #ddd;
       border-radius:50%;
       background:#fff;
       box-shadow:0 2px 4px 0 rgba(0,0,0,.1);
       transition:transform .3s;
     }
     .right{
       transform:translateX(30px);
     }
     .login_hint{
       margin-top:12px;
       color:#999;
       font-size:14px;
       line-height:20px;
     }

      .login_submit{
       display:block;
       width:100%;
       height:42px;
       margin-top:30px;
       border-radius:4px;
       background:#FF8198;
       color:#fff;
       text-align:center;
       font-size:16px;
       line-height:42px;
       border:0;
     }


     .login_hint a{
       color: #ff738d;
      }
     .other-login{
       display:block;
       font-size:12px;
       margin-top:20px;
       text-align:center;
       color:#999;
     }
    .weixin{
      background: url("~assets/img/login/weixin.png") 0 0/100%;
      width: 50px;
      height: 50px;
      display:block;
      margin-left:130px;
      margin-top: 10px;
    }
</style>
