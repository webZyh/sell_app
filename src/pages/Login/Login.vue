<template>
    <section class="loginContainer">
      <div class="loginInner">
          <div class="login_header">
            <h2 class="login_logo">外卖</h2>
            <div class="login_header_title">
              <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
              <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
            </div>
          </div>
          <div class="login_content">
            <form>
              <div :class="{on:loginWay}">
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                  <button :disabled="!rightPhone" class="get_verification" :class="{active : rightPhone}" @click.prevent="getCode()">{{computedTime>0?`已发送(${computedTime})s`:'获取验证码'}}</button>
                </section>
                <section class="login_verification">
                  <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
                </section>
                <section class="login_hint">
                  温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                  <a href="javascript:;">《用户服务协议》</a>
                </section>
              </div>
              <div :class="{on:!loginWay}">
                <section>
                  <section class="login_message">
                    <input type="tel" placeholder="手机/邮箱/用户名" v-model="name">
                  </section>
                  <section class="login_verification">
                    <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-if="pwdShow">
                    <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                    <div class="switch_button" :class="{off:!pwdShow , on:pwdShow}" @click="pwdShow = !pwdShow">
                      <div class="switch_circle" :class="{right:pwdShow}"></div>
                      <span class="switch_text">{{pwdShow?'abc':'...'}}</span>
                    </div>
                  </section>
                  <section class="login_message">
                    <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                    <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref='captcha'>
                  </section>
                </section>
              </div>
              <button class="login_submit" @click.prevent="login()">登录</button>
            </form>
            <a href="javascript:;" class="about_us">关于我们</a>
          </div>
          <a href="javascript:" class="go_back" @click="$router.back()">
            <i class="iconfont icon-jiantou2"></i>
          </a>
      </div>
      <AlertTip v-show="alertShow" :alertText="alertText" @closeTip="closeAlert()"/>
    </section>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip'

  //不通过actions发送请求
  import {reqSendCode,reqPwdLogin,reqSmsLogin} from '../../api'
    export default {
      data(){
        return{
          loginWay: true, //为true时表示登录方式为短信登录
          computedTime: 0, //计时
          flag: false,   //是否正在计时，false表示没有在计时
          phone:'',
          code:'',
          name:'',
          pwd:'',
          captcha:'',    
          pwdShow:false,   //是否显示密码,为true表示显示密码
          alertShow: false,   //是否显示弹出框，默认不弹出
          alertText:'',      //弹出的内容
        }
      },
      computed:{
        rightPhone(){
          return /^1\d{10}$/.test(this.phone);
        }
      },
      methods:{
        async getCode(){
          //启动倒计时
          if(!this.computedTime){
            //this.flag = true;
            this.computedTime = 30;
            this.timer = setInterval(()=>{
              this.computedTime--;
              if(this.computedTime == 0){
                clearInterval(this.timer);
                //this.flag = false;
              }
            },1000);
          }
          //发送ajax请求(向指定手机号发送验证码)

          const result = await reqSendCode(this.phone);
          if(result.code === 1){  //短信验证码发送失败
            //显示提示
            this.showAlert(result.msg);
            //停止计时
            if(this.computedTime){
              this.computedTime = 0;
              //清除定时器
              clearInterval(this.timer)
            }
          }
        },
        //点击登录按钮登录
        async login(){

          let result;

          //前端表单验证
          if(this.loginWay){  //短信登录方式
            const {phone,code} = this;
            if(!this.rightPhone){
              this.showAlert('请输入正确的手机号！');
              return false;
            }else if(!/\d{6}/.test(this.code)){
              this.showAlert('验证码必须是6位数字！');
              return false;
            }

            //发送ajax请求短信登录
            result = await reqSmsLogin(phone,code)
            //console.log(result)


          }else{  //账户密码登录方式
            const {name,pwd,captcha} = this;
            if(!this.name){
              this.showAlert('用户名不能为空！');
              return false;
            }else if(!this.pwd){
              this.showAlert('密码不能为空！');
              return false;
            }else if(!this.captcha){
              this.showAlert('验证码不能为空！');
              return false;
            }

            //发送ajax请求账号密码登录
            result = await reqPwdLogin({name, pwd, captcha});
            //console.log(result)
          }

          //统一处理短信登录和账号密码登录的请求结果
          if(result.code === 0){
            const user = result.data;
            //将user的数据保存到vuex的state中
            this.$store.dispatch('recordUser',user)
            //成功，跳转到个人中心
            this.$router.replace('/personal');
          }else{
            //失败
            //弹出提示
            this.showAlert(result.msg);
            //刷新图形验证码
            this.getCaptcha();
            //清空验证码输入框
            this.captcha = '';
            //this.code = '';
          }
        },
        showAlert(alertText){
          this.alertShow = true;
          this.alertText = alertText;
        },
        //关闭弹窗
        closeAlert(){
          this.alertText = '';
          this.alertShow = false;
        },
        getCaptcha(event){
          //event.target.src = 'http://localhost:4000/captcha?time='+Date.now()
          this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+Date.now();
        }
      },
      components:{
        AlertTip
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.active
                  color #000
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
