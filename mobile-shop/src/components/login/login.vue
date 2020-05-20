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
        <div>
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
