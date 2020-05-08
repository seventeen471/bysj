<template>
  <transition>
    <div id="search" v-if="show">
      <div v-if="$route.path === '/search'">
      <div class="header">
        <div class="topDiv"></div>
        <van-icon name="arrow-left" color="rgba(0,0,0,0.6)" size="0.6rem" style="position: absolute;top: 57%;left: 0.5%" @click="back()"/>
        <input v-focus placeholder="冬瓜" v-model="searchValue" @click="inputFocus()">
        <van-icon class="search" size="0.5rem" name="search" />
<!--        <span v-if="!searchClick" @click="search()">搜索</span>-->
<!--        <router-link to="shopCar">-->
<!--        <van-icon name="cart-o" size="0.85rem" color="#bfbfbf" info="2" class="shop-car" v-if="searchClick"/>-->
<!--        </router-link>-->
        <span @click="search()">搜索</span>
      </div>
      <div class="search-body">
        <div v-if="!searchClick">
        <div class="history">
          <span>历史搜索</span>
          <van-icon class="delete" name="delete" color="#ccc" size="0.5rem" @click="deleteWords()"/>
        </div>
        <div class="key-words">
          <div v-for="item in myWords" @click="wordsClick(item)">{{item}}</div>
        </div>
        <div class="hot">
          <span>热门搜索</span>
          <div class="hot-words">
            <div v-for="(item,i) in hotWords" :style="'color:'+ (i===0||i===1||i===2||i===3? '#FA8072': '')" @click="wordsClick(item)">{{item}}
              <van-icon size="0.3rem" color="#FA8072" name="fire" v-if="i===0||i===1||i===2||i===3"/>
            </div>
          </div>
        </div>
        </div>
        <div v-if="searchClick" class="result">
          <router-view></router-view>
          <div class="resultBody">
            <div class="goods" v-for="item in searchResultArr" :key="item.id">
              <img :src="item.src">
              <div class="p1-div">
                <p class="p1">{{item['big_title']}}</p>
              </div>
              <p class="p2">{{item['small_title']}}</p>
              <div class="charge-add">
                <span class="charge">￥{{item['charge']}}</span>
                <van-icon name="add" size="0.55rem" color="#FF6347" class="shop-car" @click="addThis(item)"/>
              </div>
            </div>
            <div class="resultEmpty" v-if="resultIsEmpty">
              <img src="../../../assets/empty.png">
              <p>未找到相关内容</p>
            </div>
          </div>
          <div class="recommend">
            <header> -- 你可能还需要 --</header>
            <div class="recommendBody">
              <div class="goods" v-for="item in hotRecommendArr" :key="item.id">
                <img :src="item.src">
                <div class="p1-div">
                  <p class="p1">{{item['big_title']}}</p>
                </div>
                <p class="p2">{{item['small_title']}}</p>
                <div class="charge-add">
                  <span class="charge">￥{{item['charge']}}</span>
                  <van-icon name="add" size="0.55rem" color="#FF6347" class="shop-car" @click="addThis(item)"/>
                </div>
              </div>
            </div>
          </div>
          <div style="text-align: center;color: #bfbfbf;font-size:0.4rem;padding-bottom:0.9rem;padding-top:0.6rem;background-color: #F5F5F5"> -- 已经到底了 -- </div>
        </div>
        </div>
      </div>
      </div>
  </transition>
</template>

<script>
  import axios from 'axios'
  import Vue from 'vue'
  import { Toast } from 'vant';

  Vue.use(Toast);
    export default {
        name: "search",
        data() {
          return {
            show: false,
            searchClick: false,
            searchValue: '',
            myWords: JSON.parse(window.localStorage.getItem('myWords')),
            hotWords: ['牛肉','鸡蛋','火锅','牛排','排骨','牛奶','虾','鸡胸肉','豆腐','土豆','水饺','面包'],
            hotRecommendArr: [],
            searchResultArr: [],
            resultIsEmpty: false,
          }
        },
      methods: {
          search() {
            this.searchClick = true; // 显示购物车图标
            // setTimeout(() => {
            //   this.showNeed = true;
            // },500);
            if (!this.searchValue) {
              this.searchValue = '冬瓜';
            }
              let isHas = false;
              for (const item of this.myWords) {
                isHas = (item === this.searchValue);
                if (isHas) {break;}
              }
              if (!isHas) {
                this.myWords.push(this.searchValue);
                this.myWords.reverse();
                window.localStorage.setItem('myWords', JSON.stringify(this.myWords));
              }
            // const arr = Array.from(new Set([...this.myWords]));
            this.getSearchResult();
          },
          back(){
            this.show = false;
            setTimeout(() => {
              this.$router.go(-1);
            },150)
          },
        inputFocus() {
          this.searchClick = false;
          this.resultIsEmpty = false;
          this.searchResultArr = [];
          this.hotRecommendArr = [];
        },
        deleteWords(){
            this.myWords = [];
          window.localStorage.setItem('myWords', JSON.stringify(this.myWords));
        },
        wordsClick(item){
            this.searchValue = item;
            this.search();
        },
       getSearchResult() {
          let param = new URLSearchParams();
          param.append('key_words', this.searchValue);
          axios.post('http://192.168.43.218/shop/search.php',param).then((data) => {
            // Indicator.close();
            if (data.data) {
              this.resultIsEmpty = false;
              this.searchResultArr = data.data;
            } else {
              this.resultIsEmpty = true;
            }
            axios.get('http://192.168.43.218/shop/getHotRecommend.php').then(data => {
              this.hotRecommendArr = data.data.reverse();
            });
          })
        },
        addThis(item){
          this.$store.commit('addShopCar',item);
          Toast.success('添加成功');
        }
      },
      mounted() {
          this.show = true;
      },
      directives: {
        focus: {
          inserted: el => {
            setTimeout(() => {
              el.focus();
            },200);
          }
        }
      }
    }
</script>

<style lang="less" scoped>
  #search {
    position: relative;
    .header {
      position: fixed;
      width: 100vw;
      /*height: 12vh;*/
      height: 2.592rem;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      z-index: 2;
      .topDiv {
        width: 100vw;
        height: 38.36%;
        position: absolute;
        top: 0;
        background-color: rgba(0, 0, 0, 0.12);
      }

      .search {
        position: absolute;
        top: 60%;
        left: 12vw;
        opacity: 0.5;
      }
      .shop-car{
        position: absolute;
        top: 52%;
        right: 4%;
      }

      input {
        /*transform: translate(-3vw,-1.5vh);*/
        transform: translate(-3vw,-0.35rem);
        width: 75vw;
        /*height: 3.6vh;*/
        height: 0.779rem;
        border-radius: 0.2rem;
        border-color: transparent;
        background-color: #F5F5F5;
        text-align: center;
        font-size: 0.4rem;
        color: rgba(0,0,0,0.8);
      }
      span{
        font-size: 0.47rem;
        color: rgba(0,0,0,0.8);
        position: absolute;
        top: 56%;
        right: 3%;
      }
    }
    .search-body{
      width: 100vw;
      height: 88vh;
      overflow-x: hidden;
      overflow-y: scroll;
      background-color: #fff;
      position: absolute;
      /*top: 12vh;*/
      top: 2.55rem;
      .history{
        display: flex;
        justify-content: space-between;
        span{
          font-weight: bolder;
          font-size: 0.43rem;
          color: rgba(0,0,0,0.8);
          padding-left: 4%;
          padding-top: 2%;
        }
        .delete{
          padding-right: 5%;
          padding-top: 2%;
        }
      }
      .key-words, .hot-words{
        width: 9.9rem;
        div{
          display: inline-block;
          background-color: #f5f5f5;
          font-size: 0.38rem;
          color: rgba(0,0,0,0.8);
          margin-left: 5%;
          padding: 0.2rem;
          border-radius: 0.1rem;
          margin-top: 4%;
        }
      }
    }
  }
  .hot{
    margin-top: 5%;
    span{
      font-weight: bolder;
      font-size: 0.43rem;
      color: rgba(0,0,0,0.8);
      padding-left: 4%;
      padding-top: 2%;
    }
  }
  .v-enter, .v-leave-to{
    transform: translateX(10rem);
  }
  .v-enter-active, .v-leave-active{
    transition: all 0.3s ease;
  }
  .result, .recommend{
    width: 100%;
    background-color: #F5F5F5;
    /*position: absolute;*/
    margin-top: 1%;
    z-index: -1;
    header{
      text-align: center;
      font-size: 0.4rem;
      padding-top: 0.35rem;
      margin-bottom: 0.3rem;
      font-weight: bold;
    }
    /*.resultBody{*/
    /*  !*display: flex;*!*/
    /*  !*justify-content: space-evenly;*!*/
    /*  !*flex-wrap: wrap;*!*/
    /*  padding-left: 3%;*/
    /*  padding-top: 1%;*/
    /*  background-color: #f5f5f5;*/
    /*  div{*/
    /*    display: inline-block;*/
    /*    width: 47.5%;*/
    /*    height: 6.2rem;*/
    /*    background-color: #fff;*/
    /*    border-radius: 0.2rem;*/
    /*    !*margin-top: 0.2rem;*!*/
    /*    !*margin: 0.1rem 0 0.1rem 0;*!*/
    /*    z-index: 1;*/
    /*  }*/
    /*}*/
  }
  .recommend{
    margin-top: 5%;
  }
  .recommendBody, .resultBody{
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
  .resultEmpty{
    width: 10rem;
    height: 5rem;
    background-color: #fff;
    margin-left: -3%;
    padding-top: 12%;
    margin-top: -1%;
    img{
      display: block;
      width: 2rem;
      margin: 0 auto;
    }
    p{
      text-align: center;
      margin-top: 5%;
      font-size: 0.45rem;
      color: rgba(0,0,0,0.8);
    }
  }
  .header{
    border-bottom: 1px solid #f5f5f5;
  }
</style>
