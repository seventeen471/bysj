<template>
    <div id="shopCar">
      <div class="header">
        <div class="topDiv"></div>
        <p>购物车</p>
        <span v-if="checkArr.length" @click="deleteChoosed()">删除</span>
      </div>
      <div class="shopCarBody">
        <div class="emptyDiv" v-if="!$store.state.shopCarArr.length">
        <div class="empty">
         <img src="../../assets/shopCar.png">
        </div>
          <p>购物车里空空如也</p>
          <router-link to="home">
          <van-button type="primary" size="small" color="#FA8072" class="goSeeSee">去逛逛</van-button>
          </router-link>
        </div>
        <div class="goodsDiv">
          <van-checkbox-group v-model="checkArr">
            <van-checkbox class="goods" label-disabled checked-color="#FA8072" icon-size="0.55rem" v-for="item in $store.state.shopCarArr" :name="item.id" :key="item.id">
<!--            <van-checkbox class="goods" checked-color="#FA8072" icon-size="0.55rem" v-for="(item,i) in $store.state.shopCarObj" :name="i" :key="i">-->
<!--              <div>{{i}}</div>-->
<!--              <div>{{item}}</div>-->
              <img :src="item['src']">
              <div class="goodsInfo">
              <span class="name">{{item['big_title']}}</span>
              <span class="charge">￥{{item['charge']}}</span>
              <span class="do">
                <span @click="subThis(item)">-</span>
                <span>{{item['myMount']}}</span>
                <span @click="addThis(item,$event)">+</span>
              </span>
              </div>
            </van-checkbox>
          </van-checkbox-group>
        </div>
        <div class="recommend">
          <header> -- 猜你喜欢 --</header>
          <div class="recommendBody">
            <div class="goods" v-for="item in hotRecommendArr" :key="item.id" @click="intoDetail(item)">
              <img :src="item.src">
              <div class="p1-div">
                <p class="p1">{{item['big_title']}}</p>
              </div>
              <p class="p2">{{item['small_title']}}</p>
              <div class="charge-add">
                <span class="charge">￥{{item['charge']}}</span>
                <van-icon name="add" size="0.55rem" color="#FF6347" class="shop-car" @click.stop="addThis(item,$event)"/>
              </div>
            </div>
          </div>
          <div style="text-align: center;color: #bfbfbf;font-size:0.4rem;margin-bottom:5%;padding-top:0.6rem;background-color: #F5F5F5"> -- 已经到底了 -- </div>
        </div>
      </div>
      <div class="bottomDiv">
        <van-checkbox v-model="allChecked" checked-color="#FA8072" icon-size="0.55rem" class="allCheck" @click="allCheckClick()">全选</van-checkbox>
        <div class="spanDiv">
          <div style="float: right;margin-right: -2%">
        <span>不含运费</span>
        <span>合计：</span>
        <span>￥{{allCharge}}</span>
          </div>
        </div>
        <van-button type="primary" color="#FA8072" class="goPay">去结算 ({{checkedMount}})</van-button>
      </div>
      <my-footer></my-footer>
    </div>
</template>

<script>
  import myFooter from '../common/myFooter'
  import axios from 'axios'
  import Vue from 'vue';
  import { Dialog } from 'vant';
  Vue.use(Dialog);
    export default {
        name: "shopCar",
        data() {
          return {
            allChecked: false,
            bodyScroll: 0,
            checkArr: [],
            goodsArr: [{id:'a',img: 'http://192.168.43.218/shop/img/hotRecommend/1.jpg',name:'进口香蕉 约500g',charge:5.9,mount:1},
              {id:'b',img: 'http://192.168.43.218/shop/img/goods2.jpg',name:'恒都精选冷冻肥牛卷 300g',charge:23.8,mount:1},
              {id:'c',img: 'http://192.168.43.218/shop/img/goods3.jpg',name:'可口可乐 2L/瓶',charge:6.9,mount:2}],
            hotRecommendArr: [],
          }
        },
      methods: {
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
          this.$store.commit('changePageY',event.pageY - height);
          setTimeout(() => {
            document.getElementsByClassName('transitionImg')[0].style.display = 'none';
          },950);
          // Toast.success('添加成功');
        },
        subThis(item){
          this.$store.commit('subShopCar',item);
        },
        allCheckClick() {
          if (!this.allChecked) {
            this.checkArr = [];
            for (let item of this.$store.state.shopCarArr) {
              this.checkArr.push(item.id);
            }
          } else {
            this.checkArr = [];
          }
        },
        deleteChoosed(){
          this.checkArr.forEach((e,index) => {
            const obj = {};
            obj['id'] = e;
            this.$store.commit('changeIsDeleteChoosed',true);
            this.$store.commit('subShopCar',obj);
            this.$store.commit('changeIsDeleteChoosed',false);
            this.checkArr.splice(index,1);
            this.deleteChoosed();
          });
        },
        intoDetail(obj){
          this.$router.push('detailPage');
          this.$store.commit('setDetaliObj',obj);
        }
      },
      mounted(){
        document.getElementsByClassName('shopCarBody')[0].addEventListener('scroll', () => {
          this.bodyScroll = document.getElementsByClassName('shopCarBody')[0].scrollTop.toString();
        }, false);
      },
      watch: {
        $route(){
          try {
            document.getElementsByClassName('shopCarBody')[0].scrollTop = parseFloat(this.bodyScroll);
          } catch (e) {
          }
        },
        checkArr(){
          let has = 0;
          for (let id of this.checkArr){
            for (let item of this.$store.state.shopCarArr) {
              if (id === item.id) {
                has ++;
                break;
              }
            }
          }
          if (this.$store.state.shopCarArr.length === has) {
            this.allChecked = true;
          } else {
            this.allChecked = false;
          }
        },
      },
      computed: {
          allCharge(){
            let charge = 0;
            for (let id of this.checkArr){
              for (let item of this.$store.state.shopCarArr) {
                if (id === item.id) {
                  charge += item.charge * item.myMount;
                }
              }
            }
            return charge.toFixed(1);
          },
        checkedMount() {
          let checkedMount = 0;
          for (let id of this.checkArr){
            for (let item of this.$store.state.shopCarArr) {
              if (id === item.id) {
                checkedMount += item.myMount;
              }
            }
          }
          return checkedMount;
        }
      },
      beforeMount(){
        axios.get('http://192.168.43.218/shop/getHotRecommend.php').then(data => {
          this.hotRecommendArr = data.data.reverse();
        });
      },
        components: {
          myFooter
        },
      destroyed() {
        document.getElementsByClassName('shopCarBody')[0].removeEventListener('scroll', () => {
          this.bodyScroll = document.getElementsByClassName('shopCarBody')[0].scrollTop.toString();
        }, false);
      }
    }
</script>

<style lang="less" scoped>
  .header {
    position: fixed;
    width: 100vw;
    height: 10vh;
    background-color: #fff;
    border-bottom: 1px solid #f5f5f5;
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
    span{
      position: absolute;
      top: 57%;
      right: 4%;
      font-size: 0.44rem;
      color: rgba(0,0,0,0.8);
    }
  }
  .shopCarBody{
    width: 100vw;
    height: 72.5vh;
    position: absolute;
    top: 10.216%;
    overflow-y: scroll;
    overflow-x: hidden;
    .emptyDiv {
      width: 100vw;
      height: 45%;
      background-color: #fff;
      padding-top: 10%;
      p{
        text-align: center;
        font-size: 0.38rem;
        color: rgba(0,0,0,0.6);
        margin-top: 5%;
      }
      .goSeeSee{
        display: block;
        font-size: 0.38rem;
        border-radius: 0.2rem;
        margin: 5% auto;
      }
      .empty {
        width: 4rem;
        height: 4rem;
        background-color: rgba(0,0,0,0.05);
        margin: 0 auto;
        border-radius: 50%;
        img {
          width: 2rem;
          opacity: 0.2;
          transform: translate(42%,45%);
        }
      }
    }
    .goodsDiv{
      width: 10rem;
      background-color: #fff;
      .goods{
        width: 10rem;
        height: 2.8rem;
        border-bottom: 2px solid #f5f5f5;
        padding-left: 3%;
        position: relative;
          img {
            width: 2.2rem;
            height: 2.2rem;
            margin-left: 10%;
          }
        .goodsInfo {
          position: absolute;
          right: 5%;
          top: 0;
          width: 55%;
          height: 90%;
          .name {
            display: inline-block;
            width: 100%;
            height: 40%;
            padding-top: 6%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: rgba(0, 0, 0, 0.9);
            font-size: 0.35rem;
          }

          .charge {
            display: inline-block;
            color: rgba(0, 0, 0, 0.9);
            font-size: 0.35rem;
            padding-top: 5%;
          }

          .do {
            display: inline-block;
            color: rgba(0, 0, 0, 0.9);
            font-size: 0.42rem;
            position: absolute;
            right: 5%;
            top: 62%;

            span:nth-child(1) {
              display: inline-block;
              font-size: 0.8rem;
              font-weight: bolder;
              transform: translate(-60%,8%);
            }

            span:nth-child(2) {
              display: inline-block;
              width: 0.7rem;
              text-align: center;
              background-color: #f5f5f5;
              transform: translateY(-3%);
            }

            span:nth-child(3) {
              display: inline-block;
              font-size: 0.6rem;
              font-weight: bolder;
              transform: translateX(30%);
            }
          }
        }
      }
    }
  }
  .bottomDiv{
    width: 100vw;
    height: 8vh;
    background-color: #fff;
    border-bottom: 1px solid #f5f5f5;
    position: fixed;
    bottom: 8.5vh;
    .allCheck{
     font-size: 0.45rem;
      color: rgba(0,0,0,0.7);
     position: absolute;
      top: 35%;
      left: 4%;
    }
    .goPay{
      width: 24vw;
      height: 2vh;
      position: absolute;
      top: 12.5%;
      right: 4%;
      font-size: 0.45rem;
      padding: 0 0 12%;
      border-radius: 0.2rem;
    }
    .spanDiv{
      width: 50%;
      height: 45%;
      position: absolute;
      top: 28%;
      left: 21%;
      span:nth-child(1), span:nth-child(2){
        font-size: 0.35rem;
        color: rgba(0,0,0,0.5);
      }
      span:nth-child(3){
        font-size: 0.5rem;
        color: #FA8072;
        font-weight: bold;
        margin-left: -6%;
      }
    }
  }
  .recommend{
    width: 100%;
    background-color: #F5F5F5;
    z-index: -1;
    margin-top: 5%;
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
        z-index: 1;
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
</style>
