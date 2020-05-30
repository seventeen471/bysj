<template>
  <div id="dialog">
    <div class="body">
      <div>{{title}}</div>
      <div>
        <span @click="fnLeft()">{{left}}</span>
        <span @click="fnRight()">{{right}}</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "myDialog",
      props: {
          title: {
            type: String,
            default: null
          },
          left: {
          type: String,
          default: '取消'
        },
          right: {
          type: String,
          default: '确定'
        },
      },
      methods: {
        fnLeft(){
          this.$emit('fnLeft');
        },
        fnRight(){
          this.$emit('fnRight');
        }
      }
    }
</script>

<style lang="less" scoped>
  @keyframes scale {
    from{
      transform: scale(0.5);
    }
    to{
      transform: scale(1);
    }
  }
 #dialog{
   width: 100vw;
   height: 100vh;
   background-color: rgba(0,0,0,0.4);
   position: absolute;
   top: 0;
   z-index: 999;
   display: flex;
   justify-content: center;
   align-items: center;
   .body{
     width: 77%;
     height: 17%;
     background-color: #fff;
     animation: scale 0.2s ease;
     border-radius: 0.15rem;
     div:nth-child(1){
       width: 100%;
       height: 70%;
       display: flex;
       justify-content: center;
       align-items: center;
       opacity: 0.8;
       font-size: 0.44rem;
       /*border-bottom: 1px solid #f5f5f5;*/
     }
     div:nth-child(2){
       width: 100%;
       height: 30%;
       display: flex;
       justify-content: space-around;
       span{
         width: 50%;
         height: 100%;
         text-align: center;
         font-size: 0.4rem;
         border-top: 1px solid #f5f5f5;
         border-right: 1px solid #f5f5f5;
         display: flex;
         align-items: center;
         justify-content: center;
         opacity: 0.8;
       }
     }
   }
 }
</style>
