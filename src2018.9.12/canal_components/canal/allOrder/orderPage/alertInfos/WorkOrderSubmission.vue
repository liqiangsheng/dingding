<template>
  <!--订单支付Work order submission-->
  <div>
    <div class="creditIsRunningLow"><!--背阴-->
      </div>
      <div class="creditIsRunningLow_box">
          <div class="el-message-box__title">
            <span>订单提交</span>
            <i class="el-message-box__close el-icon-close" @click="close"></i>
        </div>
        <div class="center">
               <p><img src="/static/images/tanchuangOK.png"></p>
               <p>订单提交成功</p>
        </div>
        <div class="footer">
               <p><el-button type="primary" @click="knowClick">知道了</el-button></p>
        </div>
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
      close(){ //传值给父级
//        this.$emit("isClose",false)
        this.$router.push({path: "/census/canalCensus"})
        location.reload()
      },
      knowClick(){ //知道了

        this.$router.push({path: "/census/canalCensus"})
        location.reload()
      }

    },
    mounted() {
    },
    created(){


    },

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
    width: 600px;
    height: 500px;
    background-color: #fff;
    position: absolute;
    left: 30%;
    top:24%;
    z-index:2008;
    border-radius: 3px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
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
      line-height:46px;
      text-align: center;
    }
  }
  .center{
    width: 100%;
    padding: 10%;
    height: 40%;
    p{
      width: 100%;
      text-align: center;
    }
    p:nth-child(2){
      font-size:20px;
      height: 80px;
      font-family:PingFangSC-Regular;
      color:rgba(230,88,49,1);
      line-height: 80px;
    }

  }
  .footer{
    width: 100%;
    height: 60%;
    padding: 0 10%;
    p:nth-child(1){
      width:100%;
      height:25px;
      font-size:18px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:25px;
      text-align: center;
    }
    p:nth-child(2){
      width:100%;
      height:25px;
      font-size:18px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:25px;
      text-align: center;
      margin-top: 20%;
       .el-button{
         width: 30%;
       }
    }
  }

</style>








