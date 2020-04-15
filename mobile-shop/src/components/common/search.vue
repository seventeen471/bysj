<template>
  <transition mode="out-in">
    <div id="search" v-if="show">
      <div class="header">
        <div class="topDiv"></div>
        <van-icon name="arrow-left" color="rgba(0,0,0,0.4)" size="0.75rem" style="position: absolute;top: 55%;left: 0.5%" @click="back()"/>
        <input v-focus placeholder="冬瓜" v-model="searchValue" @click="searchClick = false">
        <van-icon class="search" size="0.5rem" name="search" />
        <span v-if="!searchClick" @click="search()">搜索</span>
        <van-icon name="cart-o" size="0.85rem" color="#bfbfbf" info="2" class="shop-car" v-if="searchClick"/>
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
          <div class="resultBody">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="recommend">
            <header> -- 猜你喜欢 --</header>
            <div class="recommendBody">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div style="text-align: center;color: #bfbfbf;font-size:0.4rem;padding-bottom:0.9rem;padding-top:0.6rem;background-color: #F5F5F5"> -- 已经到底了 -- </div>
        </div>
        </div>
      </div>
  </transition>
</template>

<script>
    export default {
        name: "search",
        data() {
          return {
            show: false,
            searchClick: false,
            searchValue: '',
            myWords: JSON.parse(window.localStorage.getItem('myWords')),
            hotWords: ['牛肉','鸡蛋','火锅','牛排','排骨','牛奶','虾','鸡胸肉','豆腐','土豆','水饺','面包'],
          }
        },
      methods: {
          search() {
            this.searchClick = true; // 显示购物车图标
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
          },
          back(){
            this.show = false;
            setTimeout(() => {
              this.$router.go(-1);
            },150)
          },
        deleteWords(){
            this.myWords = [];
          window.localStorage.setItem('myWords', JSON.stringify(this.myWords));
        },
        wordsClick(item){
            this.searchValue = item;
            this.search();
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
    z-index: -1;
    header{
      text-align: center;
      font-size: 0.4rem;
      padding-top: 0.35rem;
      margin-bottom: 0.3rem;
      font-weight: bold;
    }
    .resultBody, .recommendBody{
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      background-color: #f5f5f5;
      div{
        width: 47.5%;
        height: 6.2rem;
        background-color: #fff;
        border-radius: 0.2rem;
        margin-top: 0.2rem;
        z-index: 1;
      }
    }
  }
</style>
