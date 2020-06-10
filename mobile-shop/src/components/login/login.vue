<template>
  <div id="login">
    <div class="header">
      <div class="topDiv"></div>
      <van-icon name="arrow-left" color="rgba(0,0,0,0.6)" size="0.6rem" style="position: absolute;top: 57%;left: 1%" @click="back()"/>
      <p>登录</p>
    </div>
    <div class="loginBody" ref="loginBody">
      <van-field v-model="tel" type="number" label="手机号" placeholder="请输入手机号" style="border-bottom: 1px solid #f5f5f5" />
      <van-field
        v-model="sms"
        center
        clearable
        label="验证码"
        placeholder="请输入短信验证码"
        style="border-bottom: 1px solid #f5f5f5"
      >
        <template #button>
          <van-button size="small" type="primary" class="getCode" :disabled="tel.length!==11 || endTime !== 0" @click="getCode()">{{noText}}</van-button>
        </template>
      </van-field>
      <p class="msg">（未注册过的用户将直接创建新账户）</p>
      <van-button type="primary" class="loginButton" :disabled="sms.length!==6||tel.length!==11" @click="login()">登录</van-button>
      <div class="loginFooter">
        <div></div>
        <span>其他登录方式</span>
        <div @click="wxLoginFn()">
          <img class="weChat" src="../../assets/weChat.png">
        </div>
      </div>
      <p class="msg2">登录即代表您同意手机超市<span>《服务协议》</span>和<span>《隐私政策》</span></p>
    </div>
  </div>
</template>

<script>
  import Vue  from 'vue'
  import axios from 'axios'
  import Cookies from 'js-cookie'
  import { Toast } from 'vant';

  Vue.use(Toast);
  export default {
        name: "login",
      data(){
          return {
            tel: '',
            sms: '',
            endTime: 0,
            noText: '获取验证码',
            userInfo: {}
          }
      },
      methods:{
          back(){
            this.$router.go(-1);
          },
        getCode(){
          let param = new URLSearchParams();
          param.append('tel', this.tel);
          axios.post('http://192.168.43.218/shop/postCode.php',param).then((data) => {
            window.sessionStorage.setItem('code', data.data.tel + ':' + data.data.code);
            // const millisecond = new Date().getTime();
            // const expiresTime = new Date(millisecond + 60 * 1000 * 15);
            // Cookies.set('code', data.data.tel + ':' + data.data.code, {
            //   expires: expiresTime,
            // });
            this.endTime = 59;
            this.noText = this.endTime + 'S';
            const declineTime = setInterval(() => {
              this.endTime --;
              if (this.endTime === 0) {
                this.noText = '获取验证码';
                clearInterval(declineTime);
              } else {
                this.noText = this.endTime + 'S';
              }
            }, 1000);
            this.sms = data.data.code;
          })
        },
        getMyAddress(){
          let param = new URLSearchParams();
          param.append('user', this.$store.state.userInfo.tel);
          axios.post('http://192.168.43.218/shop/getAddress.php',param).then((data) => {
            this.$store.commit('setMyAddressList',data.data.data);
            data.data.data.forEach(e => {
              if (e.isDefault === 'true') {
                this.$store.commit('setPlace',e);
              }
            });
          });
        },
        login(){
            try {
              const code = window.sessionStorage.getItem('code');
              const phone = code.toString().substring(0, 11);
              const no = code.toString().substring(12);
              if (this.tel === phone && this.sms === no) {
                let param = new URLSearchParams();
                param.append('tel', this.tel);
                param.append('code', this.sms);
                axios.post('http://192.168.43.218/shop/login.php',param).then((data) => {
                  // const millisecond = new Date().getTime();
                  // const expiresTime = new Date(millisecond + 60 * 1000);
                  window.localStorage.setItem('token', data.data.token);
                  // Cookies.set('token', data.data.token, {
                  //   expires: expiresTime,
                  // });
                  this.$store.commit('setUserInfo', data.data.data[0]);
                  this.$store.commit('setIsLogin', true);
                  this.getMyAddress();
                  this.back();
                })
              } else {
                Toast.fail('验证码错误');
                this.sms = '';
              }
            } catch (e) {
              Toast.fail('验证码已过期');
              this.sms = '';
              console.log(Cookies.get('code'));
            }
        },
        getCookie(key){
            const res = document.cookie.split(',');
            for (let i=0;i<res.length;i++){
              const temp = res[i].split('=');
              if (temp[0].trim()===key){
                return temp[1]
              }
            }
        },
        wxLoginFn() {
          let pages = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+'wx4868b35061f87885'+'&redirect_uri='+''+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
          window.location.href = pages;
          return;
          let self = this;
          getService();

          // 微信授权登录对象
          let aweixin = null;
          // 当前环境支持的所有授权登录对象
          let auths = null;

          // 获取登录授权认证服务列表，单独保存微信登录授权对象
          function getService(){
            plus.oauth.getServices(function(services){
              // plus.nativeUI.alert("services:"+JSON.stringify(services));
              auths = services;
              authLogin()
            }, function(e){
              plus.nativeUI.alert("获取登录授权服务列表失败，请稍后重试");
              // plus.nativeUI.alert("获取登录授权服务列表失败："+JSON.stringify(e));
            } );
          }

          // 获取微信登录授权对象后可进行登录认证操作
          function authLogin(){
            for(let i = 0; i < auths.length; i++){
              if(auths[i].id === 'weixin'){
                aweixin = auths[i];
                break;
              }
            }
            if(!aweixin){
              plus.nativeUI.alert("当前环境不支持微信登录");
              return;
            }
            if(!aweixin.authResult){
              aweixin.login(function(e){
                // plus.nativeUI.alert("登录认证成功!"+JSON.stringify(e));
                authUserInfo()
              }, function(e){
                // plus.nativeUI.alert("登录认证失败: "+JSON.stringify(e));
              } );
            }else{
              authUserInfo()
              console.log("已经登录认证!");
            }
          }

          // 获取微信登录授权对象后获取用户信息操作
          function authUserInfo(){
            Toast.loading({
              mask: true,
              message: '微信登录中...'
          });

            if(!aweixin){
              Toast.clear();
              plus.nativeUI.alert("当前环境不支持微信登录");
              return;
            }
            if(aweixin.authResult){
              aweixin.getUserInfo( function(e){
                //登录成功处理
                Toast.clear();
                // plus.nativeUI.alert("获取用户信息成功："+JSON.stringify(aweixin.userInfo));
                let wxUserInfo = aweixin.userInfo;
                // authLoginOut(); //注销登录防止切换账号获取到旧信息
                console.log('wxUserInfo:' + JSON.stringify(wxUserInfo));
              }, function(e){
                console.log("获取用户信息失败： "+JSON.stringify(e));
              } );
            }else{
              Toast.clear();
              plus.nativeUI.alert("未登录认证!");
            }
          }

          // 注销登录认证
          function authLoginOut(){
            if(!aweixin){
              plus.nativeUI.alert("当前环境不支持微信登录");
              return;
            }
            aweixin.logout(function(e){
              // plus.nativeUI.alert("注销登录认证成功!"+JSON.stringify(e));
            }, function(e){
              console.log("注销登录认证失败: "+JSON.stringify(e));
            });
          }
        }
      },
      mounted() {
        const h = document.documentElement.clientHeight || document.body.clientHeight;
        this.$refs.loginBody.style.height = h * 0.88 + 'px';
      },
      watch: {
          $route(){
            this.tel = '';
            this.sms = '';
          }
      }
    }
</script>

<style lang="less" scoped>
  #login{
    width: 10rem;
    height: 100vh;
    background-color: #fff;
    position: relative;
  }
  .header {
    position: fixed;
    width: 100vw;
    height: 2.161rem;
    /*height: 10%;*/
    background-color: #fff;
    .topDiv {
      width: 100vw;
      height: 46%;
      background-color: rgba(0, 0, 0, 0.12);
    }
    p{
      text-align: center;
      margin-top: 2.5%;
      font-size: 0.47rem;
      color: rgba(0,0,0,0.8);
    }
  }
  .loginBody{
    position: absolute;
    top: 2.2rem;
    /*height: 88vh;*/
    .getCode{
      border-radius: 0.15rem;
      height: 0.74rem;
      background-color: #FA8072;
      border-color: #FA8072;
    }
    .loginButton{
      display: block;
      width: 80%;
      height: 0.9rem;
      margin: 0.6rem auto;
      font-size: 0.42rem;
      font-weight: bold;
      border-radius: 0.25rem;
      background-color: #FA8072;
      border-color: #FA8072;
    }
    .msg{
      opacity: 0.5;
      font-size: 0.36rem;
      text-align: center;
      margin-top: 0.5rem;
    }
  }
  .loginFooter{
    position: absolute;
    bottom: 0;
    width: 10rem;
    height: 5.2rem;
    display: flex;
    justify-content: space-around;
    div{
      width: 26%;
      border-top: 2px solid #f5f5f5;
    }
    span{
      position: absolute;
      top: -5%;
      font-size: 0.4rem;
      opacity: 0.6;
    }
  }
  .weChat{
    width: 1rem;
    transform: translate(-1.68rem,1rem);
  }
  .msg2{
    width: 10rem;
    position: absolute;
    bottom: 5%;
    font-size: 0.36rem;
    opacity: 0.5;
    text-align: center;
    span{
      color: #FA8072;
    }
  }
</style>
