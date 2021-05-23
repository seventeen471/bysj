<template>
    <div>
    <div id="home" class="home">
      <div class="header">
        <div :style="'opacity:' + headerOpacity">
          <router-link to="/choosePlace">
        <van-icon name="location" color="#fff" size="0.8rem" class="location"/>
        <span v-if="$store.state.place.small_address">{{$store.state.place.small_address}}</span>
        <span v-if="!$store.state.place.small_address">选择收货地址</span>
        <van-icon name="play" color="#fff" style="transform: rotateZ(90deg) scale(0.5) translate(2.2rem)"/>
          </router-link>
          <router-link to="/myNews">
        <van-icon name="bell" color="#fff" size="0.6rem" class="message" style="position: absolute;top: 6.4%;left: 32%"/>
          </router-link>
        </div>
        <div :style="scrollTop <= 32 ? searchCSS1 : searchCSS2">
        <van-search
          input-align="center"
          shape="round"
          background="#FA8072"
          placeholder="冬瓜"
          style="transform: translateY(0.95rem); width: 10rem;"
          disabled
          @click="goToSearch()"
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
          <div @click="classClick(1)"><img class="classImg1" src="../../assets/classAll.jpg"></div>
          <div @click="classClick(2)"><img class="classImg2" src="../../assets/classAll.jpg"></div>
          <div @click="classClick(3)"><img class="classImg3" src="../../assets/classAll.jpg"></div>
          <div @click="classClick(4)"><img class="classImg4" src="../../assets/classAll.jpg"></div>
          </div>
          <div class="className"><span @click="classClick(1)">蔬菜豆品</span><span @click="classClick(2)">肉禽蛋类</span>
            <span @click="classClick(3)">水产海鲜</span><span @click="classClick(4)">新鲜水果</span></div>
          <div class="class2">
          <div @click="classClick(5)"><img class="classImg5" src="../../assets/classAll.jpg"></div>
          <div @click="classClick(6)"><img class="classImg6" src="../../assets/classAll.jpg"></div>
          <div @click="classClick(7)"><img class="classImg7" src="../../assets/classAll.jpg"></div>
          <div @click="classClick(8)"><img class="classImg8" src="../../assets/classAll.jpg"></div>
          </div>
          <div class="className"><span @click="classClick(5)">乳品烘焙</span><span @click="classClick(6)">米面粮油</span>
            <span @click="classClick(7)">方便速食</span><span @click="classClick(8)">酒饮零食</span></div>
        </div>
        <div style="margin-top: -2.05rem">
        <div style="width: 100%;background-color: #F5F5F5">
        <div class="vip">
          <van-icon name="vip-card" color="#FFD700" size="0.8rem" style="transform: translate(-4rem, 0.06rem);"/>
          <p>开通会员，享9.5折</p>
          <p style="transform: translate(4.4rem,0.15rem);">开通</p><van-icon name="arrow" size="0.4rem" color="#FA8072" style="transform: translate(3.6rem,-0.15rem)"/>
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
              <li v-for="item in timeShoppingArr" :key="item.id" @click="intoDetail(item)">
                <img :src="item.src">
                <div class="p1-div">
                  <p class="p1">{{item['big_title']}}</p>
                </div>
                <p class="p2">{{item['small_title']}}</p>
                <div class="charge-add">
                  <span class="charge">￥{{item['charge']}}</span>
                  <van-icon name="add" size="0.5rem" color="#FF6347" class="shop-car" @click.stop="addThis(item, $event)"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="recommend">
          <header> -- 热销推荐 --</header>
          <div class="recommendBody">
            <div class="goods" v-for="item in hotRecommendArr" :key="item.id" @click="intoDetail(item)">
              <img :src="item.src">
              <div class="p1-div">
                <p class="p1">{{item['big_title']}}</p>
              </div>
              <p class="p2">{{item['small_title']}}</p>
              <div class="charge-add">
                <span class="charge">￥{{item['charge']}}</span>
                <van-icon name="add" size="0.55rem" color="#FF6347" class="shop-car" @click.stop="addThis(item, $event)"/>
              </div>
            </div>
        </div>
        </div>
        <div style="text-align: center;color: #bfbfbf;font-size:0.4rem;margin-bottom:15%;padding-top:0.6rem;background-color: #F5F5F5"> -- 已经到底了 -- </div>
      </div>
      </div>
    </div>
      <myFooter class="myFooter"></myFooter>
    </div>
</template>

<script>
  import Vue from 'vue';
  import 'mint-ui/lib/style.css'
  import axios from 'axios'
  import { Swipe, SwipeItem } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  import myFooter from '../common/myFooter';
  Vue.use(Toast);
  import { Toast } from 'vant';


  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
    export default {
        name: "home",
      data() {
          return{
            s: 0,
            m: 0,
            h: 0,
            // docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
            // showHeight: document.documentElement.clientHeight,   //实时屏幕高度
            // hidshow: true,  //显示或者隐藏footer
            scrollTop: '0',
            searchCSS1: '',
            searchCSS2: 'transform: translateY(-0.95rem);position: fixed;background-color:#FA8072;z-index:999;',
            // distanceY: 0,
            leftScroll: 0,
            hotRecommendArr: [],
            timeShoppingArr: []
          }
      },
      methods: {
        // homeScroll() {
        //   document.getElementById('home').addEventListener('scroll', () => {
        //     // this.scrollTop = Math.abs(document.getElementsByClassName('header')[0].getBoundingClientRect().y);
        //     this.scrollTop = document.getElementById('home').scrollTop;
        //   }, false);
        // },
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
        },
        goToSearch(){
          this.$router.push('search');
        },
        classClick(index) {
          this.$router.push('/classify?index='+index);
          // this.$store.commit('classIndexChange',index);
        },
        getHotRecommend() {
          // Indicator.open('加载中...');
          axios.get(this.$url + '/shop/getHotRecommend.php').then((data) => {
            // Indicator.close();
            this.hotRecommendArr = data.data;
          });
          },
        getTimeShopping() {
          axios.get(this.$url + '/shop/getTimeShopping.php').then((data) => {
            // Indicator.close();
            this.timeShoppingArr = data.data.data;
            this.h = data.data.h;
            this.m = data.data.m;
            this.s = data.data.s;
          })
        },
        addThis(item, event){
          for (let i = 0; i < this.$store.state.shopCarArr.length; i++) {
            if (this.$store.state.shopCarArr[i].id === item.id) {
              if (this.$store.state.shopCarArr[i].myMount + 1 > item.mount) {
                Dialog.alert({
                  message: '数量不足',
                }).then(() => {
                });
                return;
              }
            }
          }
          this.$store.commit('addShopCar',item);
          document.getElementsByClassName('transitionImg')[0].style.display = 'inline-block';
          const width = document.getElementsByClassName('transitionImg')[0].clientWidth;
          const height = document.getElementsByClassName('transitionImg')[0].clientHeight;
          document.getElementsByClassName('transitionImg')[0].src = item.src;
          this.$store.commit('changePageX',event.pageX - width);
          this.$store.commit('changePageY',event.pageY - 1.5*height);
          setTimeout(() => {
            document.getElementsByClassName('transitionImg')[0].style.display = 'none';
          },950);
          // Toast.success('添加成功');
        },
        intoDetail(obj){
          this.$router.push('detailPage');
          this.$store.commit('setDetaliObj',obj);
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
          try {
            document.getElementsByClassName('timeShopBody')[0].scrollLeft = parseFloat(this.leftScroll);
            document.getElementsByClassName('home')[0].scrollTop = parseFloat(this.scrollTop);
          } catch (e) {
          }
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
      created() {
       this.getHotRecommend();
       this.getTimeShopping();
      },
      mounted() {
          // this.touchMove();
        // this.homeScroll();
          this.startTimeSub();
        document.getElementsByClassName('timeShopBody')[0].addEventListener('scroll', () => {
          this.leftScroll = document.getElementsByClassName('timeShopBody')[0].scrollLeft.toString();
        }, false);
        document.getElementsByClassName('home')[0].addEventListener('scroll', () => {
          this.scrollTop = document.getElementsByClassName('home')[0].scrollTop.toString();
        }, false);
        //   window.onresize = ()=>{
        //   return(()=>{
        //     this.showHeight = document.body.clientHeight;
        //   })()
        // };
      },
      components: {
          myFooter
      },
      destroyed() {
        document.getElementsByClassName('home')[0].removeEventListener('scroll', () => {
          this.scrollTop = document.getElementsByClassName('home')[0].scrollTop.toString();
        }, false);
        document.getElementsByClassName('timeShopBody')[0].removeEventListener('scroll', () => {
          this.leftScroll = document.getElementsByClassName('timeShopBody')[0].scrollLeft.toString();
        }, false);
      }
    }
</script>

<style lang="less" scoped>
  #home{
    width: 10rem;
    height: 92vh;
    overflow-x: hidden;
    overflow-y: scroll;
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
    position: relative;
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
    z-index: 0;
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
        padding-top: 1%;
        /*div{*/
        /*  !*margin-top: 5%;*!*/
        /*}*/
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
        font-size: 0.4rem;
        float: left;
        transform: translate(1.453rem,0.15rem);
        /*clear: both;*/
      }
    }
    .timeShop{
      position: relative;
      width: 100%;
      height: 4.9rem;
      background-color: #fff;
      .timeShopHerder{
        width: 100%;
        position: absolute;
        height: 0.8rem;
        /*z-index: 0;*/
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
        width: 9.28rem;
        height: 88%;
        position: absolute;
        top: 15%;
        left: 4%;
        /*border: 0.027rem solid green;*/
        /*transform: translateY(-3.6rem);*/
        overflow-x: scroll;
        overflow-y: hidden;
        /*z-index: 1;*/

        ul{
          height: 3.6rem;
          /*padding-left: 0.4rem;*/
          display: flex;
          flex-wrap: nowrap;
          li{
            display: inline-block;
            width: 2.65rem;
            height: 3.8rem;
            margin-right: 0.06rem;
            /*z-index: 2;*/
          }
        }
      }
    }
    .recommend{
      width: 100%;
      background-color: #F5F5F5;
      /*position: absolute;*/
      /*z-index: -1;*/
      header{
        text-align: center;
        font-size: 0.4rem;
        padding-top: 0.35rem;
        margin-bottom: 0.3rem;
        font-weight: bold;
      }
      .recommendBody{
        padding-left: 3%;
        padding-top: 1%;
        background-color: #f5f5f5;
        .goods{
          display: inline-block;
          width: 47.5%;
          height: 6.2rem;
          background-color: #fff;
          border-radius: 0.2rem;
          /*z-index: 1;*/
          margin: 1% 2% 2% 0;
          img{
            width: 3rem;
            height: 3rem;
            margin-top: 5%;
            margin-left: 20%;
          }
          .p1-div {
            width: 90%;
            margin: 0 auto;
            height: 20%;
            position: relative;
            .p1 {
              font-size: 0.42rem;
              color: rgba(0, 0, 0, 0.8);
              position: absolute;
              bottom: 0;
            }
          }
          .p2{
            width: 90%;
            margin: 0 auto;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 0.33rem;
            color: rgba(0,0,0,0.3);
          }
          .charge-add {
            width: 88%;
            margin: 0 auto;
            height: 15%;
            padding-top: 6%;
            .charge {
              color: #FF6347;
              font-size: 0.45rem;
              float: left;
            }
            .shop-car{
              float: right;
            }
          }
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
  .timeShopBody {
    ul {
      img {
        width: 2.6rem;
        height: 2.4rem;
      }

      .p1-div {
        width: 90%;
        margin: 0 auto;
        height: 10%;
        position: relative;
        .p1 {
          font-size: 0.3rem;
          color: rgba(0, 0, 0, 0.8);
          position: absolute;
          bottom: 0;
        }
      }

      .p2 {
        width: 90%;
        margin: 0 auto;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.24rem;
        color: rgba(0, 0, 0, 0.3);
      }

      .charge-add {
        width: 88%;
        margin: 0 auto;
        height: 15%;
        padding-top: 6%;

        .charge {
          color: #FF6347;
          font-size: 0.45rem;
          float: left;
        }

        .shop-car {
          margin-left: 18%;
        }
      }
    }
  }
  @keyframes addTransition {
    from{
      transform: scale(1);
    }
    to{
      transform: scale(0.1);
    }

  }
  /*.myFooter{*/
  /*  height: 8vh;*/
  /*}*/
</style>
