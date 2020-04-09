<template>
    <div id="classify">
      <div class="header">
        <div class="topDiv"></div>
        <input value="冬瓜">
        <van-icon class="search" size="0.5rem" name="search" />
      </div>
      <div class="content">
        <div class="top-nav">
          <div :style="topIndex===1?topStyle1:topStyle2" @click="topClick(1)">蔬菜豆品</div>
          <div :style="topIndex===2?topStyle1:topStyle2" @click="topClick(2)">肉禽蛋类</div>
          <div :style="topIndex===3?topStyle1:topStyle2" @click="topClick(3)">水产海鲜</div>
          <div :style="topIndex===4?topStyle1:topStyle2" @click="topClick(4)">新鲜水果</div>
          <div :style="topIndex===5?topStyle1:topStyle2" @click="topClick(5)">乳品烘焙</div>
          <div :style="topIndex===6?topStyle1:topStyle2" @click="topClick(6)">米面粮油</div>
          <div :style="topIndex===7?topStyle1:topStyle2" @click="topClick(7)">方便速食</div>
          <div :style="topIndex===8?topStyle1:topStyle2" @click="topClick(8)">酒饮零食</div>
        </div>
        <div class="left-nav">
          <div v-for="(item,i) in classArr" :key="item.id" :style="'color:'+(i+1===leftIndex?'#FA8072':'')"
               @click="leftNavClick(i+1)"><strong v-if="i+1===leftIndex">l</strong>{{item.value}}
          </div>
        </div>
        <div class="oder">
          <span :style="'position:absolute;left:2vw;color:'+(oderIndex===1?'#FA8072':'#bfbfbf')" @click="oderClick(1)">综合</span>
          <span :style="'position:absolute;left:46vw;color:'+(oderIndex===2?'#FA8072':'#bfbfbf')" @click="oderClick(2)">销量</span>
          <span :style="'position:absolute;left:60vw;color:'+(oderIndex===3?'#FA8072':'#bfbfbf')" @click="oderClick(3)">
            价格
            <van-icon size="0.2rem" style="transform: rotateZ(-90deg);position: absolute;top: 25%;left: 7vw;" :color="oderIndex===3&&!isUp?'#FA8072':'#bfbfbf'" name="play" />
            <van-icon size="0.2rem" style="transform: rotateZ(90deg);position: absolute;top: 45%;left: 7vw;" :color="oderIndex===3&&isUp?'#FA8072':'#bfbfbf'"  name="play" />
          </span>
        </div>
        <div class="body classBody">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
        </div>
      </div>
      <myFooter></myFooter>
    </div>
</template>

<script>
  import myFooter from './myFooter'
    export default {
        name: "classify",
        data() {
          return {
            topIndex: 1,
            topStyle1: 'border-color:'+'#FA8072'+';'+'color:'+'#FA8072',
            topStyle2: 'border-color:'+'#fff'+';'+'color:'+'grey',
            leftIndex: 1,
            oderIndex: 1,
            isUp: true,
            topScroll: 0,
            leftScroll: 0,
            bodyScroll: 0,
            classArr: [],
            classArr1: [{id:1,value:'推荐'},{id:2,value:'新品'},{id:3,value:'平价好菜'},{id:4,value:'叶菜类'},
              {id:5,value:'根茎类'},{id:6,value:'菌菇类'},{id:7,value:'瓜果类'},{id:8,value:'豆类'},{id:9,value:'香辛蒜葱'},
              {id:10,value:'球茎类'},{id:11,value:'有机蔬菜'},{id:12,value:'火锅组合'}],
            classArr2: [{id:1,value:'推荐'},{id:2,value:'新品'},{id:3,value:'平价好菜'},{id:4,value:'hh类'},
              {id:5,value:'根茎类'},{id:6,value:'菌菇类'},{id:7,value:'瓜果类'},{id:8,value:'豆类'},{id:9,value:'香辛蒜葱'},
              {id:10,value:'球茎类'},{id:11,value:'有机蔬菜'},{id:12,value:'火锅组合'}],
          }
        },
      methods: {
        topClick(index) {
            this.topIndex = index;
            this.classArr = this['classArr' + index];
          },
        leftNavClick(index) {
            this.leftIndex = index;
          },
        oderClick(index){
            this.oderIndex = index;
            if (index===3){
              this.isUp = !this.isUp;
            }
        },
      },
      beforeMount(){
          this.classArr = this.classArr1;
      },
      mounted(){
          document.getElementsByClassName('top-nav')[0].addEventListener('scroll', () => {
            this.topScroll = document.getElementsByClassName('top-nav')[0].scrollLeft.toString();
          }, false);
          document.getElementsByClassName('left-nav')[0].addEventListener('scroll', () => {
            this.leftScroll = document.getElementsByClassName('left-nav')[0].scrollTop.toString();
          }, false);
          document.getElementsByClassName('classBody')[0].addEventListener('scroll', () => {
            this.bodyScroll = document.getElementsByClassName('classBody')[0].scrollTop.toString();
          }, false);
      },
      watch: {
          $route(){
            try {
              document.getElementsByClassName('top-nav')[0].scrollLeft = parseFloat(this.topScroll);
              document.getElementsByClassName('left-nav')[0].scrollTop = parseFloat(this.leftScroll);
              document.getElementsByClassName('classBody')[0].scrollTop = parseFloat(this.bodyScroll);
            } catch (e) {
            }
          }
      },
        components: {
          myFooter
        },
      destroyed() {
        document.getElementsByClassName('top-nav')[0].removeEventListener('scroll', () => {
          this.topScroll = document.getElementsByClassName('top-nav')[0].scrollLeft.toString();
        }, false);
        document.getElementsByClassName('left-nav')[0].removeEventListener('scroll', () => {
          this.leftScroll = document.getElementsByClassName('left-nav')[0].scrollTop.toString();
        }, false);
        document.getElementsByClassName('classBody')[0].removeEventListener('scroll', () => {
          this.bodyScroll = document.getElementsByClassName('classBody')[0].scrollTop.toString();
        }, false);
      }
    }
</script>

<style lang="less" scoped>
  .header{
    position: relative;
    width: 100vw;
    height: 10vh;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    .topDiv{
      width: 100vw;
      height: 46%;
      position: absolute;
      top: 0;
      background-color: rgba(0,0,0,0.1);
    }
    .search{
      position: absolute;
      top: 6.1vh;
      left: 8vw;
      opacity: 0.5;
    }
    input{
      transform: translateY(-1vh);
      width: 94vw;
      height: 3vh;
      border-radius: 5rem;
      border-color: transparent;
      background-color: #F5F5F5;
      text-align: center;
      font-size: 0.4rem;
      color: #bfbfbf;
    }
  }
  .content {
    position: relative;
    width: 100vw;
    height: 82vh;
    background-color: #fff;
    .left-nav{
      width: 27vw;
      height: 75vh;
      position: absolute;
      left: 0;
      top: 7.8%;
      background-color: #fff;
      border-right: 1px solid #f5f5f5;
      overflow-y: scroll;
      div{
        width: 100%;
        height: 8.5%;
        text-align: center;
        font-size: 0.35rem;
        font-weight: lighter;
        padding-top: 3.8%;
        opacity: 0.8;
        position: relative;
        strong{
          font-size: 0.5rem;
          display: inline-block;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
    .top-nav{
      width: 100vw;
      height: 5.2vh;
      overflow-x: scroll;
      background-color: #f5f5f5;
      white-space: nowrap;
      padding-top: 2%;
      div{
        display: inline-block;
        width: 25vw;
        height: 4vh;
        text-align: center;
        background-color: #fff;
        border: 1px solid #fff;
        border-radius: 0.1rem;
        font-size: 0.4rem;
        line-height: 4vh;
        margin-right: 2%;
        color: grey;
      }
    }
    .oder{
      position: absolute;
      right: 0;
      width: 72vw;
      height: 3vh;
      border-top: 1px solid #f5f5f5;
      border-bottom: 1px solid #f5f5f5;
      font-size: 0.32rem;
      line-height: 3vh;
      color: #bfbfbf;
      span{
        display: inline-block;
      }
    }
    .body {
      position: absolute;
      right: 0;
      top: 11%;
      width: 72vw;
      height: 72.5vh;
      overflow-y: scroll;
      div{
        width: 100%;
        height: 20%;
        border-bottom: 1px solid #F5F5F5;
        text-align: center;
      }
    }
  }
</style>
