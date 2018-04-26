<template>
  <!--余额不足creditIsRunningLow-->
  <div>
    <div class="creditIsRunningLow"><!--背阴-->
    </div>
    <div class="creditIsRunningLow_box">
      <div class="el-message-box__title">
        <span>充值</span>
        <i class="el-message-box__close el-icon-close" @click="close1"></i>
      </div>
      <section class="content">
        <ul>
          <li>充值账号:<span>{{}}</span></li>
          <li>当前余额:<span>{{}}</span></li>
          <li>充值金额:<span>{{}}</span><a href="">修改充值金额</a></li>
        </ul>
      </section>
      <section id="el-tabs">
        <el-tabs type="border-card" @tab-click="tabClick">

          <el-tab-pane label="微信扫码充值">
            <wechat-scavenging :createCodeUrl="createCodeUrl" :type="'wechat'"></wechat-scavenging>
          </el-tab-pane>

          <el-tab-pane label="支付宝扫码充值">
            <wechat-scavenging :createCodeUrl="createCodeUrl" :type="'alipay'"></wechat-scavenging>
          </el-tab-pane>

        </el-tabs>
      </section>
    </div>
  </div>
</template>
<script>
  export default {
    components:{
    },
    data() {
      return {

      }
    },
    methods: {
      close1(){ //充值
        this.$emit("isClose1",false)
      }
    },
    mounted() {
    },
    created(){

    }
  }
</script>

<style scoped lang="scss">
  .creditIsRunningLow{
    width: 100%;
    background: black;
    position: absolute;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index:2007;
    opacity: 0.2;
  }
  .creditIsRunningLow_box{
    width: 70%;
    height: 70%;
    background-color: #fff;
    position: absolute;
    left: 15%;
    top:18%;
    z-index:2008;
    border-radius: 3px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .content{
    padding-top:1.5em;
    >ul{
      >li{
        font-size:14px;
        line-height: 3em;
        .money{
          color:#E65831;
          font-size:20px;
          font-family:PingFangSC-Regular;
        }
        .revise{
          color:#20A0FF;
          transform:translateX(60%);
          display: inline-block;
          font-size:14px;
        }
      }
    }
  }
  .el-message-box__title{
    width: 100%;
    height:7%;
    position: relative;
    background:rgba(243,243,243,1);
    .el-message-box__close{
      position: absolute;
      right: 10px;
      top:10px;
    }
    span{
      width: 100%;
      display: inline-block;
      height:14px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:36px;
      text-align: center;
    }
  }


</style>





