<template>
  <div class="WechatScavengingCater">
    <header>
      <p @click="tel">支付遇到问题？<img src="/static/images/wenhao.png" alt=""></p>
      <p v-show="clickShow">致电客服热线：400-999-1891</p>
    </header>
    <content>
      <p>推荐微信扫码支付</p>
      <p><img :src="weachat.createCodeUrl" alt=""></p>
    </content>
    <footer>
      <el-button type="primary" click="success">我已成功支付</el-button>
    </footer>

  </div>
</template>
<script>
  export default {
    props:["weachat"],
    components:{
    },
    data() {
      return {
        clickShow:false, //支付问题电话
      }
    },
    methods: {
      tel(){ //支付问题电话
        this.clickShow =!this.clickShow
      },
      success(){//成功支付

      }
    },
    mounted() {

    },
    created(){
   console.log(this.weachat)
      console.log(this.$store.state.weachat)
    }
  }
</script>

<style scoped lang="scss">
.WechatScavengingCater{
  width: 100%;
  overflow: hidden;
  header{
    width: 100%;
    height: 70px;
    p:nth-child(1){
      position: absolute;
      right:80px;
      top:20px;
      height:20px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      color:rgba(32,160,255,1);
      line-height:20px;
      cursor: pointer;
    }
    p:nth-child(2){
      position: absolute;
      right:40px;
      top:50px;
      height:59px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      background:rgba(255,247,204,1);
      line-height:59px;
    }
  }
  content{
    width:100%;
    p:nth-child(1){
         width: 100%;
         text-align: center;
         height:22px;
         font-size:16px;
         font-family:PingFangSC-Regular;
         color:rgba(94,109,130,1);
         line-height:22px;
       }
    p:nth-child(2){
      margin: 20px 0;
      width: 100%;
      text-align: center;
      img{
        display: inline-block;
        width: 162px;
        height: 162px;
        border: 1px solid rgba(216,216,216,1);
        background:rgba(216,216,216,1) ;
      }

    }
  }
  footer{
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>





