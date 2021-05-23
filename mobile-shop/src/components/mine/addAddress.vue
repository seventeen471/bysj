<template>
  <div id="myAddress">
    <div class="header">
      <div class="topDiv"></div>
      <van-icon name="arrow-left" color="rgba(0,0,0,0.6)" size="0.6rem" style="position: absolute;top: 57%;left: 1%" @click="back()"/>
      <p v-if="$route.query.isAdd">新增地址</p>
      <p v-if="!$route.query.isAdd">编辑地址</p>
    </div>
    <div class="newAddressBody">
      <van-cell-group>
        <van-field
          v-model="name"
          required
          label="收货人"
          placeholder="请输入收货人"
          class="list"
        />
        <van-field
          v-model="phone"
          required
          label="手机号"
          type="number"
          placeholder="请输入手机号"
          class="list"
        />
        <van-field
          v-model="address"
          required
          label="收货地址"
          placeholder="点击选择收货地址"
          class="list"
          disabled
          @click="$router.push('/choosePlace?isAdd=true')"
        />
        <van-field
          v-model="doorNo"
          label="楼号门牌"
          placeholder="请输入楼号门牌"
          class="list"
        />
      </van-cell-group>
      <div class="mark">
        <span>标签</span>
        <div>
        <van-tag :color="mark==='家'?'#FA8072':''" plain @click="mark='家'">家</van-tag>
        <van-tag :color="mark==='公司'?'#FA8072':''" plain @click="mark='公司'">公司</van-tag>
        <van-tag :color="mark==='学校'?'#FA8072':''" plain @click="mark='学校'">学校</van-tag>
        <van-tag :color="mark==='其他'?'#FA8072':''" plain @click="mark='其他'">其他</van-tag>
        </div>
      </div>
      <van-cell-group>
        <van-switch-cell v-model="isDefault" class="list" active-color="#FA8072" title="设为默认地址" />
      </van-cell-group>
      <van-button v-if="$route.query.isAdd" type="primary" color="#FA8072" class="addressButton" :disabled="!name||phone.length!==11||!address" @click="add()">添加</van-button>
      <van-button v-if="!$route.query.isAdd" type="primary" color="#FA8072" class="addressButton" :disabled="!name||phone.length!==11||!address" @click="save()">保存</van-button>
      <van-button v-if="!$route.query.isAdd" type="primary" color="lightGrey" class="addressButton" @click="deletee()">删除</van-button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { AddressEdit } from 'vant';
  import axios from 'axios'
  import { Dialog } from 'vant';

  Vue.use(AddressEdit);
    export default {
        name: "addAddress",
      data() {
        return {
          name: '',
          phone: '',
          address: '',
          doorNo: '',
          mark: '',
          isDefault: false,
          id: ''

        };
      },
      methods:{
        back(){
          this.$router.go(-1);
        },
        add(){
          let param = new URLSearchParams();
          param.append('type', '2');
          param.append('user', this.$store.state.userInfo.tel);
          param.append('name', this.name);
          param.append('phone', this.phone);
          param.append('big_address', this.$store.state.chooseAddress.big_address);
          param.append('small_address', this.$store.state.chooseAddress.small_address);
          param.append('door_no', this.doorNo);
          param.append('mark', this.mark);
          param.append('isDefault', this.isDefault?'true':'false');
          axios.post(this.$url + '/shop/changeAddress.php',param).then((data) => {
            if (data.data.isSucc) {
              this.$router.go(-1);
            }
          });
        },
        save(){
          let param = new URLSearchParams();
          param.append('type', '1');
          param.append('id', this.id);
          param.append('user', this.$store.state.userInfo.tel);
          param.append('name', this.name);
          param.append('phone', this.phone);
          param.append('big_address', this.$store.state.chooseAddress.big_address);
          param.append('small_address', this.$store.state.chooseAddress.small_address);
          param.append('door_no', this.doorNo);
          param.append('mark', this.mark);
          param.append('isDefault', this.isDefault?'true':'false');
          axios.post(this.$url + '/shop/changeAddress.php',param).then((data) => {
            if (data.data.isSucc) {
              this.$router.go(-1);
            }
          });
        },
        deletee(){
          Dialog.confirm({
            title: '提示',
            message: '确认删除吗？',
          })
            .then(() => {
              let param = new URLSearchParams();
              param.append('type', '3');
              param.append('id', this.id);
              param.append('user', this.$store.state.userInfo.tel);
              axios.post(this.$url + '/shop/changeAddress.php',param).then((data) => {
                if (data.data.isSucc) {
                  this.$router.go(-1);
                }
              });
            })
            .catch(() => {
            });
        },
        getEditAddress() {
            const obj = JSON.parse(window.sessionStorage.getItem('editAddress'));
            this.name = obj.name;
            this.phone = obj.phone;
            const obj2 = {
              big_address: obj.big_address,
              small_address: obj.small_address
            };
            this.$store.commit('setChooseAddress', obj2);
            this.doorNo = obj.door_no;
            this.id = obj.id;
            this.address = obj.small_address;
            this.mark = obj.mark;
            this.isDefault = obj.isDefault === 'true';
        }
      },
      watch:{
          $route(to,from){
            if (from.path==='/myAddress' && this.$route.query.isEdit) {
              this.getEditAddress();
              return;
            }
            if (from.path==='/myAddress' && this.$route.query.isAdd) {
              this.$store.commit('setChooseAddress', {});
              this.name = '';
              this.phone = '';
              this.doorNo = '';
              this.id = '';
              this.address = '';
              this.mark = '';
              this.isDefault = 'false';
            }
            if (from.path==='/choosePlace' && this.$store.state.chooseAddress.big_address) {
              this.address = this.$store.state.chooseAddress.small_address;
            } else {
              this.address = '';
            }
          }
      },
      beforeMount(){
        if (this.$route.query.isEdit) {
          this.getEditAddress();
        }
      },
      beforeRouteLeave(to,from,next){
        window.sessionStorage.removeItem('editAddress');
        next();
      }
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
    p{
      text-align: center;
      margin-top: 2.5%;
      font-size: 0.47rem;
      color: rgba(0,0,0,0.8);
    }
  }
  .newAddressBody{
    width: 10rem;
    height: 89.8vh;
    position: absolute;
    top: 2.161rem;
  }
  .mark{
    height: 6%;
    font-size: 0.42rem;
    color: rgba(0,0,0,0.8);
    background-color: #fff;
    display: flex;
    align-items: center;
    span{
      margin-left: 4.3%;
    }
    div{
      width: 50%;
      display: flex;
      justify-content: space-around;
      transform: translateX(28%);
    }
  }
  .list{
    height: 6%;
    font-size: 0.42rem;
  }
  .addressButton{
    width: 80%;
    display: block;
    margin: 4% auto;
    height: 5%;
    border-radius: 0.2rem;
  }
</style>
