<template>
    <div id="classify">
      <div class="header">
        <div class="topDiv"></div>
        <router-link to="search">
        <input value="冬瓜">
        <van-icon class="search" size="0.5rem" color="rgba(0,0,0,0.6)" name="search" />
        </router-link>
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
               @click="leftNavClick(i+1,item.value)"><strong v-if="i+1===leftIndex">l</strong>{{item.value}}
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
          <div class="one" v-for="item in allObjArr" :key="item.id" @click="intoDetail(item)">
            <img :src="item.src">
            <div class="oneRightDiv">
              <div>
                <p>{{item['big_title']}}</p>
                <p>{{item['small_title']}}</p>
              </div>
              <div>
                <span class="charge">￥{{item['charge']}}</span>
                <van-icon name="add" size="0.5rem" color="#FF6347" class="addTo" @click.stop="addThis(item, $event)"/>
              </div>
            </div>
          </div>
          <div class="resultEmpty" v-if="!allObjArr.length">
            <img src="../../assets/empty.png">
            <p>等待上货</p>
          </div>
        </div>
      </div>
      <myFooter></myFooter>
    </div>
</template>

<script>
  import myFooter from '../common/myFooter'
  import axios from 'axios'
  import Vue from 'vue';
  import { Dialog } from 'vant';
  Vue.use(Dialog);
    export default {
        name: "classify",
        data() {
          return {
            topIndex: 1,
            topStyle1: 'border-color:'+'#FA8072'+';'+'color:'+'#FA8072',
            topStyle2: 'border-color:'+'#fff'+';'+'color:'+'rgba(0,0,0,0.7)',
            leftIndex: 1,
            oderIndex: 1,
            isUp: true,
            topScroll: 0,
            leftScroll: 0,
            bodyScroll: 0,
            classArr: [],
            classArr1: [{id:1,value:'全部'},{id:2,value:'新品'},{id:3,value:'平价好菜'},{id:4,value:'叶菜类'},
              {id:5,value:'根茎类'},{id:6,value:'菌菇类'},{id:7,value:'瓜果类'},{id:8,value:'豆类'},{id:9,value:'香辛蒜葱'},
              {id:10,value:'球茎类'},{id:11,value:'有机蔬菜'},{id:12,value:'火锅组合'}],
            classArr2: [{id:1,value:'全部'},{id:2,value:'新品'},{id:3,value:'猪肉'},{id:4,value:'牛肉'},
              {id:5,value:'羊肉'},{id:6,value:'牛排'},{id:7,value:'蛋类'},{id:8,value:'鸡鸭血'},{id:9,value:'腊肉'},
              {id:10,value:'腊肠'}],
            classArr3: [{id:1,value:'全部'},{id:2,value:'新品'},{id:3,value:'活鱼'},{id:4,value:'活虾'},
              {id:5,value:'活扇贝类'},{id:6,value:'活蟹其他'},{id:7,value:'冰鲜鱼类'},{id:8,value:'冰鲜虾蟹'},{id:9,value:'冷冻软体'},
              {id:10,value:'水发干货'},{id:11,value:'冰鲜海鲜'}],
            classArr4: [{id:1,value:'全部'},{id:2,value:'新品'},{id:3,value:'当季现货'},{id:4,value:'榴莲季'},
              {id:5,value:'柑橘橙柚'},{id:6,value:'苹果梨蕉'},{id:7,value:'桃李杏枣'},{id:8,value:'葡提浆果'},{id:9,value:'热带水果'},
              {id:10,value:'瓜类'},{id:11,value:'更多鲜果'},{id:12,value:'鲜果礼盒'}],
            classArr5: [{id:1,value:'全部'},{id:2,value:'新品'},{id:3,value:'箱装奶'},{id:4,value:'今日鲜奶'},
              {id:5,value:'鲜奶'},{id:6,value:'酸奶'},{id:7,value:'超值组合'},{id:8,value:'面包类'},{id:9,value:'蛋糕类'},
              {id:10,value:'牛奶饮品'},{id:11,value:'常温乳品'},{id:12,value:'烘焙材料'}],
            classArr6: [{id:1,value:'全部'},{id:2,value:'新品'},{id:3,value:'鲜面'},{id:4,value:'年糕'},
              {id:5,value:'米类'},{id:6,value:'食用油'},{id:7,value:'挂面'},{id:8,value:'面粉'},{id:9,value:'五谷杂粮'}],
            classArr7: [{id:1,value:'全部'},{id:2,value:'新品'},{id:3,value:'包子馒头'},{id:4,value:'面点小食'},
              {id:5,value:'吐司面包'},{id:6,value:'蛋糕点心'},{id:7,value:'饺子汤圆'},{id:8,value:'熟食腊味'},{id:9,value:'方便速食'},
              {id:10,value:'方便粉面'},{id:11,value:'佐餐小食'}],
            classArr8: [{id:1,value:'全部'},{id:2,value:'新品'},{id:3,value:'饮用水'},{id:4,value:'冲调'},
              {id:5,value:'碳酸饮料'},{id:6,value:'啤酒'},{id:7,value:'黄酒'},{id:8,value:'茶饮'},{id:9,value:'果饮'},
              {id:10,value:'乳饮'},{id:11,value:'功能饮料'},{id:12,value:'葡萄酒'},{id:13,value:'白酒'}],
            allObjArr: [],
            constAllObj: [],
          }
        },
      methods: {
        topClick(index) {
            this.topIndex = index;
            this.leftIndex = 1;
            this.classArr = this['classArr' + index];
            let name;
            switch (index) {
              case 1:
                name = '蔬菜豆品';break;
              case 2:
                name = '肉禽蛋类';break;
              case 3:
                name = '水产海鲜';break;
              case 4:
                name = '新鲜水果';break;
              case 5:
                name = '乳品烘焙';break;
              case 6:
                name = '米面粮油';break;
              case 7:
                name = '方便速食';break;
              case 8:
                name = '酒饮零食';break;

            }
          let param = new URLSearchParams();
          param.append('className', name);
          axios.post('http://192.168.43.218/shop/getClassifyAllObj.php',param).then((data) => {
            this.constAllObj = data.data;
            this.allObjArr = data.data;
          })
          },
        leftNavClick(index,name) {
            this.leftIndex = index;
          this.allObjArr = this.constAllObj;
            let newArr = [];
            for (let i=0;i<this.allObjArr.length;i++) {
              if (this.allObjArr[i]['class2'].toString().includes(name) || name === '全部') {
                newArr.push(this.allObjArr[i]);
              }
            }
          this.allObjArr = newArr;
        },
        oderClick(index){
          this.oderIndex = index;
          if (index===3){
            this.isUp = !this.isUp;
            if (this.isUp) {
              this.allObjArr.sort((a,b) => {
                return b['charge'] - a['charge'];
              })
            } else {
              this.allObjArr.sort((a,b) => {
                return a['charge'] - b['charge'];
              })
            }
          }
        },
        gotoScrollLeft() {
          if (this.$route.query.index) {
            this.topClick(parseInt(this.$route.query.index));
            switch (parseInt(this.$route.query.index)) {
              case 3:
                document.getElementsByClassName('top-nav')[0].scrollLeft = 73;
                break;
              case 4:
                document.getElementsByClassName('top-nav')[0].scrollLeft = 180;
                break;
              case 5:
                document.getElementsByClassName('top-nav')[0].scrollLeft = 285;
                break;
              case 6:
                document.getElementsByClassName('top-nav')[0].scrollLeft = 390;
                break;
              case 7:
                document.getElementsByClassName('top-nav')[0].scrollLeft = 472;
                break;
              case 8:
                document.getElementsByClassName('top-nav')[0].scrollLeft = 472;
                break;
              default:
                document.getElementsByClassName('top-nav')[0].scrollLeft = 0;
            }

          }
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
          this.$store.commit('changePageY',event.pageY - height);
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
      beforeMount(){
          this.classArr = this.classArr1;
      },
      mounted(){
          this.gotoScrollLeft();
        document.getElementsByClassName('top-nav')[0].addEventListener('scroll', () => {
            this.topScroll = document.getElementsByClassName('top-nav')[0].scrollLeft.toString();
          }, false);
          document.getElementsByClassName('left-nav')[0].addEventListener('scroll', () => {
            this.leftScroll = document.getElementsByClassName('left-nav')[0].scrollTop.toString();
          }, false);
          document.getElementsByClassName('classBody')[0].addEventListener('scroll', () => {
            this.bodyScroll = document.getElementsByClassName('classBody')[0].scrollTop.toString();
          }, false);
        this.topClick(1);
      },
      watch: {
          $route(){
            try {
              document.getElementsByClassName('top-nav')[0].scrollLeft = parseFloat(this.topScroll);
              document.getElementsByClassName('left-nav')[0].scrollTop = parseFloat(this.leftScroll);
              document.getElementsByClassName('classBody')[0].scrollTop = parseFloat(this.bodyScroll);
            } catch (e) {
            }
            this.gotoScrollLeft();
          },
        oderIndex(){
          if (this.oderIndex===1){ // 综合: 销量高价格低的排到前面
            this.allObjArr.sort((a,b) => {
              return b['sales']/b['charge'] - a['sales']/a['charge'];
            })
          }
          if (this.oderIndex===2){ // 销量
            this.allObjArr.sort((a,b) => {
              return b['sales'] - a['sales'];
            })
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
      background-color: rgba(0,0,0,0.12);
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
  .one{
    display: flex;
    /*justify-content: space-around;*/
    align-items: center;
    padding-left: 3%;
    padding-right: 3%;
    border: 1px solid #f5f5f5!important;
    border-bottom:  none!important;
    img{
      width: 33%;
      height: 70%;
    }
    .oneRightDiv{
      margin-left: 2%;
      width: 60%!important;
      height: 80%!important;
      display: flex;
      flex-direction: column;
      div:nth-child(1){
        height: 65%;
        display: flex;
        flex-direction: column;
        border: none!important;
        /*justify-content: space-around;*/
        p{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
        }
        p:nth-child(1){
          /*height: 60%;*/
          margin-top: 4%;
          font-size: 0.38rem;
          white-space: nowrap;
          opacity: 0.8;
        }
        p:nth-child(2){
          margin-top: 2%;
          font-size: 0.32rem;
          opacity: 0.4;
          /*height: 40%;*/
        }
      }
      div:nth-child(2){
        height: 35%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: none!important;
        span{
          color: #FF6347;
          font-size: 0.45rem;
          float: left;
        }
        .addTo{
        color: red;
          margin-right: 7%;
      }
      }
    }
  }
  *{
    border: none!important;
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
      font-size: 0.4rem;
      color: rgba(0,0,0,0.4);
    }
  }
</style>
