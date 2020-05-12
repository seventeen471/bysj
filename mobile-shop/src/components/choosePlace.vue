<template>
    <div id="choosePlaceDiv">
      <div class="header">
        <div class="topDiv"></div>
        <van-icon name="arrow-left" color="rgba(0,0,0,0.6)" size="0.6rem" style="position: absolute;top: 57%;left: 1%" @click="back()"/>
        <p>选择收货地址</p>
<!--        <span>新增</span>-->
      </div>
      <div class="searchDiv">
      <input id="suggestid" placeholder="输入您的收货地址" v-model="searchValue" @focus="inFocus()">
      </div>
      <div class="body">
        <div id="map"></div>
        <p class="p1" v-if="checkedPlace.small">所选地址</p>
        <div v-if="checkedPlace.small" @click="choosePlace(checkedPlace)">
          <p>{{checkedPlace.small}}</p>
          <p>{{checkedPlace.big}}</p>
<!--          <van-icon name="aim" class="aim" color="#FA8072" size="0.6rem" @click="getPosition()" />-->
        </div>
        <p class="p1">我的地址</p>
        <div style="margin-bottom: 1%" v-for="item in myPlaceArr" @click="choosePlace(item)">
          <p>{{item.small}}</p>
          <p>{{item.big}}</p>
        </div>
      </div>
    </div>
</template>

<script>
  import { Indicator } from 'mint-ui';
    export default {
        name: "choosePlace",
      data(){
          return {
            h: 0,
            searchValue: '',
            checkedPlace: {
              big: '',
              small: ''
            },
            myPlaceArr: [{
              big: '江苏省南京市玄武区龙蟠路159号',
              small: '南京林业大学'
            },{
              big: '江苏省苏州市工业园区星汉街5号',
              small: '腾飞新苏坊7楼'
            },{
              big: '江苏省苏州市吴中区北港路198号',
              small: '朗诗遇'
            }]
          }
      },
      methods: {
          back(){
            this.$router.go(-1);
          },
        inFocus(){
          // document.getElementsByTagName('body')[0].style.height = this.h;
        },
        choosePlace(item){
            this.$store.commit('setPlace',item);
            this.$router.go(-1);
        },
        initMap() {
          Indicator.open('地图加载中...');
          const that = this;
          const doc = document
      const map = new BMap.Map('map'); //  创建地图实例
      let lo;
      let la;
      const geolocation = new BMap.Geolocation(); // 获取定位
      geolocation.getCurrentPosition(function (r) {
        Indicator.close();
        if (this.getStatus() === 0) {
          lo = r.point.lng;
          la = r.point.lat;
          let mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          map.centerAndZoom(new BMap.Point(r.point.lng, r.point.lat), 11);  // 初始化地图,设置中心点坐标为当前定位和地图级别
        } else {
          console.log('定位失败' + this.getStatus());
        }
      }, {enableHighAccuracy: true});
      map.enableScrollWheelZoom(true); // 开启缩放
      map.disableDragging(); // 禁止拖拽
          map.addEventListener("touchmove", function (e) {
            map.enableDragging();
          });
          map.addEventListener("touchend", function (e) {
            map.disableDragging();
          });
      const ac = new BMap.Autocomplete({
        'input': 'suggestid', 'location': map
      });
          var myValue;
          ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
            doc.getElementById('suggestid').blur();
            var _value = e.item.value;
            myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            setPlace();
          });

          function setPlace(){
            map.clearOverlays();    //清除地图上所有覆盖物
            function myFun(){
              var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
              map.centerAndZoom(pp, 18);
              map.addOverlay(new BMap.Marker(pp));    //添加标注
            }
            var local = new BMap.LocalSearch(map, { //智能搜索
              onSearchComplete: myFun
            });
            local.search(myValue);
          }
          function getInfo(e){ // 点击某点，定位标移到该点，且获取该点信息
            map.clearOverlays(); // 清除地图上的覆盖物
            let mk = new BMap.Marker(e.point);
            map.addOverlay(mk);
            // map.centerAndZoom(new BMap.Point(e.point.lng, e.point.lat));
            let point = new BMap.Point(e.point.lng,e.point.lat);
            let gc = new BMap.Geocoder();
            gc.getLocation(point, (rs) => {
              const opts = {
                width: 100,     // 信息窗口宽度
                title: rs.surroundingPois[0]['title'], // 信息窗口标题
                fontSize: 0.4+'rem',
                enableAutoPan: true,
                offset: new BMap.Size(0, -25),
              };
              const html =
                `<span style="color: gray;font-size: 0.4rem">地址：${rs.address}</span><br/>
        <div>
          <div><button style=\'display:block;margin:0 auto;color:#FA8072;font-size: 0.4rem;\' id=\'markerInfo\'> 确定 </button></div></div>`
              const infoWindow = new BMap.InfoWindow(html, opts);  // 创建信息窗口对象
              map.openInfoWindow(infoWindow, e.point); // 开启信息窗口
              setTimeout(() => {
                document.getElementById('markerInfo').addEventListener('click', () => {
                  that.searchValue = '';
                  that.checkedPlace = {
                    big: rs.address,
                    small: rs.surroundingPois[0]['title']
                  };
                  map.clearOverlays(); // 清除地图上的覆盖物
                }, false);
              });
            });
          }
      map.addEventListener('click', getInfo);
    }
      },
      mounted() {
          this.initMap();
        this.h = window.innerHeight;
      }
    }
</script>

<style lang="less" scoped>
  .header {
    position: fixed;
    width: 100vw;
    height: 10%;
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
  .searchDiv{
    width: 100%;
    height: 6%;
    background-color: #fff;
    position: absolute;
    top: 10%;
    input{
      display: block;
      margin: 0 auto;
      width: 92%;
      height: 62%;
      border-radius: 0.4rem;
      border-color: transparent;
      background-color: #F5F5F5;
      text-align: center;
      font-size: 0.4rem;
      color: rgba(0,0,0,0.8);
    }
  }
  .body{
    width: 100%;
    height: 83.7%;
    overflow-y: scroll;
    overflow-x: hidden;
    position: absolute;
    top: 16%;
    #map{
      width: 100%;
      height: 60%;
    }
    .p1{
      height: 3.5%;
      font-size: 0.38rem;
      opacity: 0.6;
      padding-top: 2%;
      padding-left: 4%;
    }
    div{
      height: 12%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 4%;
      position: relative;
      p:nth-child(1){
        font-size: 0.42rem;
        font-weight: bold;
      }
      p:nth-child(2){
        margin-top: 2%;
        font-size: 0.37rem;
        opacity: 0.6;
      }
      .aim{
        position: absolute;
        right: 5%;
        top: 35%;
      }
    }
  }
</style>
