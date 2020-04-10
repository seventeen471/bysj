<template>
    <div id="home">
      <div class="header">
        <div :style="'opacity:' + headerOpacity">
        <van-icon name="location" color="#fff" size="0.8rem" class="location"/>
        <span>朗诗寓</span>
        <van-icon name="play" color="#fff" style="transform: rotateZ(90deg) scale(0.5) translate(2.2rem)"/>
        <van-icon name="bell" color="#fff" size="0.6rem" class="message" info="2" style="transform: translate(5.3rem,1.2rem)"/>
        </div>
        <div :style="scrollTop <= 32 ? searchCSS1 : searchCSS2">
        <van-search
          input-align="center"
          shape="round"
          background="#FA8072"
          placeholder="冬瓜"
          style="transform: translateY(0.95rem); width: 10rem;"
          disabled
        />
        </div>
      </div>
      <div class="swipe">
        <mt-swipe :auto="6000">
          <mt-swipe-item>
            <img src="https://img.alicdn.com/tfs/TB1JtlTyVP7gK0jSZFjXXc5aXXa-750-291.jpg_Q90.jpg">
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="https://img.alicdn.com/tfs/TB1bS4Jx1H2gK0jSZJnXXaT1FXa-750-291.jpg_Q90.jpg">
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="https://img.alicdn.com/tfs/TB19vgjuFT7gK0jSZFpXXaTkpXa-750-291.jpg_Q90.jpg">
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="https://gw.alicdn.com/tfs/TB1WKCbzHr1gK0jSZFDXXb9yVXa-750-291.jpg_Q90.jpg">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="body">
        <div class="ico">
        <van-icon name="clock-o" color="#FA8072" size="0.44rem" style="transform: translate(0.35rem,-0.06rem)"/><span>最快29分钟送达</span>
        <van-icon name="gold-coin-o" color="#FA8072" size="0.44rem" style="transform: translate(0.35rem,-0.06rem)" /><span>满28元免配送费</span>
        <van-icon name="passed" color="#FA8072" size="0.44rem" style="transform: translate(0.35rem,-0.06rem)" /><span>安心退</span>
        </div>
        <div class="homeClass">
          <div class="class1">
          <div><img class="classImg1" src="../assets/classAll.jpg"></div>
          <div><img class="classImg2" src="../assets/classAll.jpg"></div>
          <div><img class="classImg3" src="../assets/classAll.jpg"></div>
          <div><img class="classImg4" src="../assets/classAll.jpg"></div>
          </div>
          <div class="className"><span>蔬菜豆品</span><span>肉禽蛋类</span><span>水产海鲜</span><span>新鲜水果</span></div>
          <div class="class2">
          <div><img class="classImg5" src="../assets/classAll.jpg"></div>
          <div><img class="classImg6" src="../assets/classAll.jpg"></div>
          <div><img class="classImg7" src="../assets/classAll.jpg"></div>
          <div><img class="classImg8" src="../assets/classAll.jpg"></div>
          </div>
          <div class="className"><span>乳品烘焙</span><span>米面粮油</span><span>方便速食</span><span>酒饮零食</span></div>
        </div>
        <div style="margin-top: -2.05rem">
        <div style="width: 100%;background-color: #F5F5F5">
        <div class="vip">
          <van-icon name="vip-card" color="#FFD700" size="0.8rem" style="transform: translate(-4.4rem, 0.06rem);"/>
          <p>开通会员，享9.5折</p>
          <p style="transform: translate(3.7rem,0.12rem);">开通</p><van-icon name="arrow" size="0.4rem" color="#FA8072" style="transform: translate(3rem,-0.15rem)"/>
        </div>
        </div>
        <div style="width: 100%; height: 0.267rem;background-color: #F5F5F5"></div>
        <div class="timeShop">
          <div class="timeShopHerder">
            <div class="l">l</div><p>限时抢购</p>
            <div class="timeShow">
            <span>{{h | two}}</span>:<span>{{m | two}}</span>:<span>{{s | two}}</span>
            </div>
            <p class="more">更多</p>
          </div>
          <div class="timeShopBody">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <div class="recommend">
          <header> -- 热销推荐 --</header>
          <div class="two">
            <div></div>
            <div></div>
          </div>
          <div class="two">
            <div></div>
            <div></div>
          </div>
          <div class="two">
            <div></div>
            <div></div>
          </div>
          <div class="two">
            <div></div>
            <div></div>
          </div>
          <div class="two">
            <div></div>
            <div></div>
          </div>
        </div>
        <div style="text-align: center;color: #bfbfbf;font-size:0.4rem;margin-bottom:15%;padding-bottom:0.9rem;padding-top:0.6rem;background-color: #F5F5F5"> -- 已经到底了 -- </div>
      </div>
      </div>
      <myFooter></myFooter>
    </div>
</template>

<script>
  import Vue from 'vue';
  import 'mint-ui/lib/style.css'
  import { Swipe, SwipeItem } from 'mint-ui';
  import myFooter from './myFooter';


  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
    export default {
        name: "home",
      data() {
          return{
            s: 0,
            m: 0,
            h: 4,
            // docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
            // showHeight: document.documentElement.clientHeight,   //实时屏幕高度
            // hidshow: true,  //显示或者隐藏footer
            scrollTop: '0',
            searchCSS1: '',
            searchCSS2: 'transform: translateY(-0.95rem);position: fixed;background-color:#FA8072;z-index:999;',
            distanceY: 0,
          }
      },
      methods: {
        homeScroll() {
          document.getElementById('app').addEventListener('scroll', () => {
            // this.scrollTop = Math.abs(document.getElementsByClassName('header')[0].getBoundingClientRect().y);
            this.scrollTop = document.getElementById('app').scrollTop;
          }, false);
        },
        // touchMove() {
        //   let dom = document.getElementsByTagName('html')[0];
        //   dom.addEventListener('touchstart', (e) => {
        //       let startX = e.targetTouches[0].pageX;
        //       let startY = e.targetTouches[0].pageY;
        //     dom.addEventListener('touchmove', (e) => {
        //       //获取滑动屏幕时的X,Y
        //       let endX = e.targetTouches[0].pageX;
        //       let endY = e.targetTouches[0].pageY;
        //       //获取滑动距离
        //       let distanceX = endX-startX;
        //       let distanceY = endY-startY;
        //       if (Math.abs(distanceX) === 0) {
        //         dom.style.position = 'static';
        //       } else {
        //         // dom.style.position = 'fixed';
        //       }
        //     },false);
        //   },false);
        // },
        startTimeSub() {
          let si = setInterval(() => {
            if (this.s === 0) {
              if (this.h === this.m === 0) {
                if (this.s === 0) {
                  clearInterval(si);
                } else {
                  this.s = 59;
                }
              } else {
                this.s = 59;
              }
            } else {
              this.s --;
            }
          }, 1000);
        }
      },
      watch: {
          s() {
            if (this.s === 59) {
              if (this.m === 0) {
                this.m = 59
              } else {
                this.m--;
              }
            }
          },
          m() {
            if (this.m === 59) {
              if (this.h === 0) {
                this.h = 23
              } else {
                this.h--;
              }
            }
          },
        // showHeight() {
        //   if(this.docmHeight > this.showHeight){
        //     this.hidshow = false
        //   }else{
        //     this.hidshow = true
        //   }
        // },
        $route() {
          document.getElementById('app').scrollTop = parseFloat(window.sessionStorage.getItem(this.$route.meta.who));
        }
      },
      computed: {
        headerOpacity() {
          return 1 - this.scrollTop * 0.03125;
        }
      },
      filters: {
          two(value) {
            return value.toString().padStart(2,'0');
          }
      },
      mounted() {
          // this.touchMove();
        this.homeScroll();
          this.startTimeSub();
          window.onresize = ()=>{
          return(()=>{
            this.showHeight = document.body.clientHeight;
          })()
        };
      },
      components: {
          myFooter
      },
      destroyed() {
        document.getElementById('app').removeEventListener('scroll', () => {
          this.scrollTop = document.getElementById('app').scrollTop;
        }, false);
      }
    }
</script>

<style lang="less" scoped>
  #home{
    /*width: 100%;*/
    /*height: 100%;*/
    /*overflow-x: hidden;*/
    /*overflow-y: scroll;*/
    /*background-color: #fff;*/
  }
  .location{
    margin-left: 0.3rem;
    transform: translateY(1.2rem) scale(0.8);
  }
  .message{
    transform: translate(5.7rem, 0.926rem);
  }
  .header{
    width: 100%;
    height: 6.2rem;
    background-color: #FA8072;
    span{
      display: inline-block;
      color: #fff;
      font-size: 0.45rem;
      transform: translateY(1rem);
    }
  }
    .swipe{
      width: 9.2rem;
      height: 3.5rem;
      overflow: hidden;
      border-radius: 0.213rem;
      transform: translate(0.373rem, -2.8rem);
      img{
        width: 100%;
        z-index: 1;
      }
    }
  .body{
    position: relative;
    width: 100%;
    z-index: 1;
    img{
      width: 100%;
    }
    span{
      color: #FA8072;
      font-size: 0.35rem;
    }
    .ico{
      transform: translate(-0.16rem,-2.48rem);
      display: flex;
      justify-content: space-around;
      span{
        transform: translateY(-0.1rem);
      }
    }
    .homeClass{
      height: 4.8rem;
      transform: translate(-0.1rem,-2.3rem);
      background-color: #fff;
      .class1,.class2{
        width: 100%;
        display: flex;
        justify-content: space-around;
      }
      .className{
        display: flex;
        width: 100%;
        justify-content: space-around;
        transform: translate(0.107rem,0.18rem);
        height: 0.8rem;
        span{
          color: rgba(0,0,0,0.8);
          font-size: 0.38rem;
        }
      }
      div{
        width: 1.5rem;
        height: 1.5rem;
        overflow: hidden;
      }
    }
    .vip{
      width: 93%;
      height: 0.9rem;
      background-color: #FFEFD5;
      margin: 0 auto;
      border-radius: 0.2rem;
      color: #FFA07A;
      p{
        font-size: 0.45rem;
        float: left;
        transform: translate(1.453rem,0.12rem);
        /*clear: both;*/
      }
    }
    .timeShop{
      position: relative;
      width: 100%;
      height: 4.7rem;
      background-color: #fff;
      .timeShopHerder{
        width: 100%;
        position: absolute;
        height: 0.8rem;
        .l{
          /*transform: translate(0.3rem,0.02rem);*/
          position: absolute;
          left: 3%;
          color: #FA8072;
          font-weight: bolder;
          font-size: larger;
        }
        p{
          color: black;
          font-weight: bolder;
          font-size: 0.45rem;
          position: absolute;
          left: 7%;
          transform: translateY(-0.8rem);
          margin-top: 0.9rem;
        }
        .timeShow {
          /*transform: translate(3.2rem,-2.32rem);*/
          position: absolute;
          left: 30%;
          span {
            display: inline-block;
            height: 0.4rem;
            width: 0.4rem;
            background-color: black;
            color: #fff;
            font-size: 0.3rem;
            padding-top: 0.05rem;
            /*padding-bottom: 0.05rem;*/
            padding-left: 0.1rem;
            padding-right: 0.05rem;
            transform: translateY(-0.1rem);
          }
        }
        .more{
          /*position: absolute;*/
          /*right: 0;*/
          color: #FA8072;
          /*font-weight: normal;*/
          font-weight: lighter;
          font-size: 0.45rem;
          transform: translate(7.95rem,-0.85rem);
        }
      }
      .timeShopBody{
        width: 9.95rem;
        height: 80%;
        position: absolute;
        top: 17%;
        /*border: 0.027rem solid green;*/
        /*transform: translateY(-3.6rem);*/
        overflow-x: scroll;
        overflow-y: hidden;
        ul{
          width: 208%;
          height: 3.6rem;
          display: flex;
          justify-content: space-around;
          padding-left: 0.4rem;
          li{
            width: 3rem;
            height: 3.6rem;
            border: 1px solid red;
            margin-right: 0.053rem;
          }
        }
      }
    }
    .recommend{
      width: 99%;
      background-color: #F5F5F5;
      /*position: absolute;*/
      z-index: -1;
      header{
        text-align: center;
        font-size: 0.4rem;
        padding-top: 0.35rem;
        margin-bottom: 0.3rem;
        font-weight: bold;
      }
      .two{
        width: 100%;
        display: flex;
        justify-content: space-around;
        border-right: 0.08rem solid #F5F5F5;
        border-left: 0.053rem solid #F5F5F5;
        z-index: 1;
        div{
          width: 50%;
          height: 6.2rem;
          background-color: #fff;
          border: 0.133rem solid #F5F5F5;
          border-radius: 0.267rem;
          z-index: 1;
        }
      }
    }
  }
  .classImg1{
    transform: scale(6.5) translate(0.58rem,0.26rem);
  }
  .classImg2{
    transform: scale(6.5) translate(0.295rem,0.26rem);
  }
  .classImg3{
    transform: scale(6.5) translate(0,0.26rem);
  }
  .classImg4{
    transform: scale(6.5) translate(-0.3rem,0.26rem);
  }
  .classImg5{
    transform: scale(6.5) translate(-0.58rem,0.26rem);
  }
  .classImg6{
    transform: scale(6.5) translate(0.59rem,-0.067rem);
  }
  .classImg7{
    transform: scale(6.5) translate(0.3rem,-0.067rem);
  }
  .classImg8{
    transform: scale(6.5) translate(0,-0.067rem);
  }
</style>
