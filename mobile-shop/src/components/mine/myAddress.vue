<template>
  <div id="myAddress">
    <div class="header">
      <div class="topDiv"></div>
      <van-icon name="arrow-left" color="rgba(0,0,0,0.6)" size="0.6rem" style="position: absolute;top: 57%;left: 1%" @click="back()"/>
      <p>我的收货地址</p>
    </div>
    <div class="addressBody">
      <div class="addressDiv">
        <div class="one" v-for="item in myAddressList" :key="item.id">
          <div>
            <strong>{{item['small_address']+item['door_no']}}</strong>
            &nbsp;
            <van-tag color='#FA8072'>{{item['mark']}}</van-tag>
            &nbsp;
            <van-tag v-if="item['isDefault']==='true'" color="light-grey">默认</van-tag>
          </div>
          <div>{{item['big_address']}}</div>
          <div>
            <span>{{item['name']}}</span>
            <span>{{item['phone']}}</span>
          </div>
          <router-link to="/addAddress">
          <van-icon name="edit" color="#FA8072" class="edit" size="0.7rem" @click="editAddress(item)" />
          </router-link>
        </div>
      </div>
      <router-link to="/addAddress?isAdd=true">
      <van-button type="primary" color="#FA8072" class="newAddress">新增地址</van-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "myAddress",
      data(){
          return{
            myAddressList: []
          }
      },
      methods:{
        back(){
          this.$router.go(-1);
        },
        getMyAddress(){
          let param = new URLSearchParams();
          param.append('user', this.$store.state.userInfo.tel);
          axios.post('http://192.168.43.218/shop/getAddress.php',param).then((data) => {
            this.myAddressList = data.data.data;
          });
        },
        editAddress(item){
          window.sessionStorage.setItem('editAddress',JSON.stringify(item));
        }
      },
      beforeMount() {
          this.getMyAddress();
      },
      watch:{
          $route(){
            this.getMyAddress();
          }
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
  .addressBody{
    width: 10rem;
    height: 89.8vh;
    position: absolute;
    top: 2.19rem;
    .addressDiv{
      width: 100%;
      height: 85%;
      overflow-x: hidden;
      overflow-y: scroll;
      .one{
        position: relative;
        width: 10rem;
        height: 16%;
        background-color: #fff;
        padding-left: 3.5%;
        padding-top: 5%;
        font-size: 0.38rem;
        opacity: 0.8;
        border-bottom: 1px solid #f5f5f5;
        div{
          margin-top: 1.5%;
        }
        .edit{
          position: absolute;
          right: 10%;
          top: 36%;
        }
      }
    }
    .newAddress{
      width: 80%;
      display: block;
      height: 6%;
      border-radius: 0.2rem;
      position: absolute;
      bottom: 3%;
      left: 10.2%;
    }
    }
</style>
