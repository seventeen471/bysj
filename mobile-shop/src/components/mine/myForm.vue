<template>
    <div id="myForm">
      <div class="header">
        <div class="topDiv"></div>
        <van-icon name="arrow-left" color="rgba(0,0,0,0.6)" size="0.6rem" style="position: absolute;top: 57%;left: 1%" @click="back()"/>
<!--        <input value="搜索订单">-->
<!--        <van-icon class="search" size="0.5rem" color="rgba(0,0,0,0.6)" name="search" />-->
        <p>我的订单</p>
      </div>
      <div class="body">
        <van-tabs v-model="active" animated color="#FA8072">
          <van-tab title="全部" name="a">
            <div class="one" v-for="item in allListArr" :key="item.form_id">
              <div @click="gotoResult(item.form_id)"><span>{{item.time}}</span><span>{{item.status | statusName}}</span></div>
              <div class="goodsDiv" @click="gotoResult(item.form_id)">
                <img v-for="item2 in JSON.parse(item.goods_obj)" :key="item2.id" :src="item2.src">
              </div>
              <div @click="gotoResult(item.form_id)"><span>共{{item.all_mount}}件 实付：￥</span><span>{{item.true_pay}}</span></div>
              <div v-if="item.status==='0'">
                <span @click.stop="goPay(item.form_id)">去付款</span>
                <span @click.stop="cancelDeal(item.form_id)">取消订单</span>
              </div>
              <div v-if="item.status==='1'">
                <span @click.stop="updateStatus(item.form_id,'2')">确认收货</span>
              </div>
              <div v-if="item.status==='2'">
                <span>去评价</span>
                <span @click.stop="again(JSON.parse(item.goods_obj),item.all_mount,item.all_fee)">再来一单</span>
                <span @click.stop="deleteDeal(item.form_id, item.list_id)">删除订单</span>
              </div>
              <div v-if="item.status==='3'">
                <span @click.stop="again(JSON.parse(item.goods_obj),item.all_mount,item.all_fee)">再来一单</span>
                <span @click.stop="deleteDeal(item.form_id, item.list_id)">删除订单</span>
              </div>
              <div v-if="item.status==='4'">
                <span @click.stop="updateStatus(item.form_id,'5')">确认退款</span>
              </div>
<!--              <van-popover-->
<!--                v-model="showPopover"-->
<!--                trigger="click"-->
<!--                :actions="actions"-->
<!--                placement="bottom-start"-->
<!--                @select="onSelect"-->
<!--                class="more"-->
<!--              >-->
<!--                <template #reference>-->
<!--                  <span type="primary" @click="setCurrentFrom(item.status, item.form_id, item.list_id)">更多</span>-->
<!--                </template>-->
<!--              </van-popover>-->
              <div v-if="item.status==='5' || item.status==='6'">
                <span @click.stop="deleteDeal(item.form_id, item.list_id)">删除订单</span>
              </div>
            </div>
            <p class="noMore">没有更多订单了</p>
          </van-tab>
          <van-tab title="待支付" name="b">
            <van-empty v-if="Arr0.length===0" style="margin-top: 35%" description="还没有相关订单" />
            <div v-if="Arr0.length!==0" class="one" v-for="item in Arr0" :key="item.form_id" @click="gotoResult(item.form_id)">
              <div><span>{{item.time}}</span><span>{{item.status | statusName}}</span></div>
              <div class="goodsDiv">
                <img v-for="item2 in JSON.parse(item.goods_obj)" :key="item2.id" :src="item2.src">
              </div>
              <div><span>共{{item.all_mount}}件 实付：￥</span><span>{{item.true_pay}}</span></div>
              <div>
                <span @click.stop="goPay(item.form_id)">去付款</span>
                <span @click.stop="cancelDeal(item.form_id)">取消订单</span>
              </div>
            </div>
            <p v-if="Arr0.length!==0" class="noMore">没有更多订单了</p>
          </van-tab>
          <van-tab title="待收货" name="c">
            <van-empty v-if="Arr1.length===0" style="margin-top: 35%" description="还没有相关订单" />
            <div v-if="Arr1.length!==0" class="one" v-for="item in Arr1" :key="item.form_id" @click="gotoResult(item.form_id)">
              <div><span>{{item.time}}</span><span>{{item.status | statusName}}</span></div>
              <div class="goodsDiv">
                <img v-for="item2 in JSON.parse(item.goods_obj)" :key="item2.id" :src="item2.src">
              </div>
              <div><span>共{{item.all_mount}}件 实付：￥</span><span>{{item.true_pay}}</span></div>
              <div>
                <span @click.stop="updateStatus(item.form_id,'2')">确认收货</span>
              </div>
            </div>
            <p v-if="Arr1.length!==0" class="noMore">没有更多订单了</p>
          </van-tab>
          <van-tab title="待评价" name="d">
            <van-empty v-if="Arr2.length===0" style="margin-top: 35%" description="还没有相关订单" />
            <div v-if="Arr2.length!==0" class="one" v-for="item in Arr2" :key="item.form_id" @click="gotoResult(item.form_id)">
              <div><span>{{item.time}}</span><span>{{item.status | statusName}}</span></div>
              <div class="goodsDiv">
                <img v-for="item2 in JSON.parse(item.goods_obj)" :key="item2.id" :src="item2.src">
              </div>
              <div><span>共{{item.all_mount}}件 实付：￥</span><span>{{item.true_pay}}</span></div>
              <div>
                <span @click.stop="again(JSON.parse(item.goods_obj),item.all_mount,item.all_fee)">再来一单</span>
                <span>去评价</span>
              </div>
            </div>
            <p v-if="Arr2.length!==0" class="noMore">没有更多订单了</p>
          </van-tab>
        </van-tabs>
      </div>
      <myDialog v-if="isVisible" title="付款成功?" left="否" right="是" @fnLeft="fnLeft(payId)" @fnRight="fnRight(payId)"></myDialog>
    </div>
</template>

<script>
  import axios from 'axios'
  import { Toast } from 'vant';
  import { Dialog } from 'vant';
  import Vue from 'vue';
  import myDialog from '../common/myDialog'
  import { Popover } from 'vant';
  Vue.use(Popover);
  Vue.use(Dialog);
    export default {
        name: "myForm",
      data(){
        return{
          active: 'a',
          allListArr: [],
          Arr0: [],
          Arr1: [],
          Arr2: [],
          isVisible: false,
          payId: '',
          showPopover: false,
          actions: [{ text: '删除订单', disabled: true}],
          currentFrom: {}
        }
      },
      methods:{
        back(){
          this.$router.go(-1);
        },
        setCurrentFrom(status, form_id, list_id) {
          if (status === '2' || status === '3' || status === '5' || status === '6') {
            this.actions[0].disabled = false
          } else {
            this.actions[0].disabled = true
          }
          this.currentFrom.form_id = form_id
          this.currentFrom.list_id = list_id
        },
        onSelect(action) {
          switch (action.text) {
            case '删除订单':
              this.deleteDeal(this.currentFrom.form_id,this.currentFrom.list_id)
          };
        },
        gotoResult(id){
          this.$router.push('/dealResult?id=' + id);
        },
        queryForm(){
          this.allListArr = [];
            this.Arr0 = [];
            this.Arr1 = [];
            this.Arr2 = [];
          let param = new URLSearchParams();
          param.append('user', this.$store.state.userInfo.tel);
          axios.post(this.$url + '/shop/queryForm.php',param).then((data) => {
            this.allListArr = data.data.data.reverse();
            this.allListArr.forEach(e => {
              if (e.status === '0') {
                this.Arr0.push(e);
              }
              if (e.status === '1') {
                this.Arr1.push(e);
              }
              if (e.status === '2') {
                this.Arr2.push(e);
              }
            });
          });
        },
        updateStatus(id,status){
          let param = new URLSearchParams();
          param.append('type', '2'); // 1新增2更新3删除
          param.append('id', id);
          param.append('status', status); // 0待付款，1待签收，2已签收,3已评价，4退款中，5已退款，6已取消
          axios.post(this.$url + '/shop/editForm.php',param).then((data) => {
            if (data.data.isSucc) {
              switch (status) {
                case '2':
                  Toast.success('收货成功');
                  break;
                case '3':
                  Toast.success('评价成功');
                  break;
                case '5':
                  Toast.success('确认退款成功');
                  break;
                case '6':
                  Toast.success('取消成功');
                  break;
              }
              this.queryForm();
            }
          });
        },
        cancelDeal(id){
          Dialog.confirm({
            title: '提示',
            message: '下单五分钟内可以取消订单，确认取消吗？',
          })
            .then(() => {
              this.updateStatus(id,'6')
            })
            .catch(() => {
            });
        },
        deleteDeal(form_id,list_id){
          Dialog.confirm({
            title: '提示',
            message: '确认删除该订单吗？',
          })
            .then(() => {
              let param = new URLSearchParams();
              param.append('type', '3'); // 1新增2更新3删除
              param.append('form_id', form_id);
              param.append('list_id', list_id);
              axios.post(this.$url + '/shop/editForm.php', param).then((data) => {
                if (data.data.isSucc) {
                  Toast.success('删除成功');
                  this.queryForm();
                }
              })
            }).catch(() => {
                });
        },
        again(obj,allMount,allFee){
          let dealObj = {};
          dealObj['dealGoods'] = obj;
          dealObj['allCharge'] = allFee;
          dealObj['allMount'] = allMount;
          this.$store.commit('setDealObj',dealObj);
          this.$router.push('/makeDeal');
        },
        goPay(id){
          this.isVisible = true;
          this.payId = id;
        },
        fnLeft(id){
          this.isVisible = false;
          this.$router.push('/dealResult?id=' + id);
        },
        fnRight(id){
          this.isVisible = false;
          this.$router.push('/payResult?id=' + id);
        },
      },
      beforeMount() {
          this.active = this.$route.query.index;
        this.queryForm();
      },
      watch:{
          $route(to,from){
            if (from.path==='/mine'){
              this.active = this.$route.query.index;
            }
            this.queryForm();
          }
      },
      filters: {
        statusName(code) {
          let name = '';
          switch (code) {
            case '0':
              name = '待支付';
              break;
            case '1':
              name = '待收货';
              break;
            case '2':
              name = '已收货';
              break;
            case '3':
              name = '已评价';
              break;
            case '4':
              name = '退款中';
              break;
            case '5':
              name = '已退款';
              break;
            case '6':
              name = '已取消';
              break;
          }
          return name;
        }
      },
      components: {
        myDialog
      },
    }
</script>

<style lang="less" scoped>
  .header {
    position: fixed;
    width: 100vw;
    height: 2.161rem;
    /*height: 10%;*/
    background-color: #fff;
    border-bottom: 1px solid #f5f5f5;
    .topDiv {
      width: 100vw;
      height: 46%;
      background-color: rgba(0, 0, 0, 0.12);
    }
    .search{
      position: absolute;
      top: 1.32rem;
      left: 2rem;
      opacity: 0.5;
    }
    input{
      transform: translateY(-1vh);
      width: 70vw;
      margin-left: 1.5rem;
      height: 0.65rem;
      border-radius: 5rem;
      border-color: transparent;
      background-color: #F5F5F5;
      text-align: center;
      font-size: 0.4rem;
      color: #bfbfbf;
    }
    p{
      text-align: center;
      margin-top: 2.5%;
      font-size: 0.47rem;
      color: rgba(0,0,0,0.8);
    }
  }
  .body{
    width: 10rem;
    height: 89.6vh;
    position: absolute;
    top: 2.18rem;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .one{
    width: 10rem;
    height: 5.3rem;
    background-color: #fff;
    position: relative;
    margin-top: 0.2rem;
    padding-bottom: 3%;
    div:nth-child(1){
      height: 17%;
      font-size: 0.38rem;
      opacity: 0.5;
      display: flex;
      align-items: center;
      padding-left: 4%;
      span:nth-child(2){
        position: absolute;
        right: 4%;
      }
    }
    .goodsDiv{
      height: 2.5rem;
      width: 95%;
      margin: 0 auto;
      border-bottom: 2px solid #f5f5f5;
      border-top: 2px solid #f5f5f5;
      overflow-y: hidden;
      overflow-x: scroll;
      display: flex;
      align-items: center;
      img{
        width: 2rem;
        margin-right: 3%;
      }
    }
    div:nth-child(3){
      /*display: inline-block;*/
      float: right;
      margin-right: 3%;
      margin-top: -0.4rem;
      span:nth-child(1){
        font-size: 0.38rem;
        opacity: 0.8;
      }
      span:nth-child(2){
        font-size: 0.4rem;
        opacity: 0.8;
        font-weight: bold;
      }
    }
    div:nth-child(4){
      height: 13%;
      /*width: 50%;*/
      /*float: right;*/
      //margin-right: 2.4%;
      margin-top: 2%;
      position: absolute;
      bottom: 6%;
      right: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span{
        width: 2.2rem;
        height: 0.65rem;
        border-radius: 0.1rem;
        font-size: 0.35rem;
        opacity: 0.8;
        border: 1px solid lightgray;
        text-align: center;
        padding-top: 2%;
        margin-right: 0.33rem;
        /*margin-right: 0.1rem;*/
      }
    }
  }
  .noMore{
    text-align: center;
    font-size: 0.4rem;
    opacity: 0.5;
    margin-top: 20%;
  }
  .more{
    font-size: 0.38rem;
    opacity: 0.8;
    transform: translate(0.4rem, 0.65rem);
  }
</style>
