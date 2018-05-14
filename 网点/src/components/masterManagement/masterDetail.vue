<template>
  <!--师傅详情-->
  <div id="masterDetail">
    <div class="masterDetailHeader">
      <div class="masterDetailOne">
        <p><span>平均分:4.3</span></p>
      </div>
      <ul class="masterDetailTwo">
        <li><span>本月总接单量</span><span>10</span></li>
        <li><span>上月总接单量</span><span>15</span></li>
        <li><span>总接单量</span><span>215</span></li>
      </ul>
      <ul class="masterDetailThree">
         <li><span>205</span><br><span>已完成</span></li>
        <li><span>5</span><br><span>待服务</span></li>
        <li><span>10</span><br><span>遗留单</span></li>

      </ul>
      <ul class="masterDetailFour">
        <li><span>0</span><br><span>异常结款</span></li>
        <li><span>100%</span><br><span>准时率</span></li>
        <li><span>100%</span><br><span>完工率</span></li>
      </ul>

    </div>

  </div>
</template>
<script>
    export default {
      data() {
        return {
        }
      },
      methods: {


      }

    }

</script>
<style scoped lang="less">
  #masterDetail{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top:0;
    background:rgba(241,241,241,1);
    overflow-y: auto;
  }
  .masterDetailHeader{
    width: 100%;
    background: linear-gradient(138.7deg,rgba(135,154,238,1),rgba(83,107,210,1));
    padding-bottom:0.5rem ;
  }
.masterDetailOne{
  width: 100%;
  height: 1.5rem;
  overflow: hidden;
  p{
    margin: 0.5rem 0 0 35%;
    width:2.24rem;
    height:0.5rem;
    background:rgba(255,255,255,1);
    font-size:0.28rem;
    font-family:PingFangSC-Regular;
    color:rgba(83,107,210,1);
    border-radius: 0.29rem ;
    text-align: center;
    line-height: 0.5rem;
  }
}
  .masterDetailTwo{
    width: 100%;
    overflow: hidden;
    padding: 0 10%;
    li{
      width: 100%;
      height: 0.88rem;
      border-bottom: 0.01rem solid #AFBBEC;
      margin-bottom: 0.35rem;
      span{
        float: left;
        margin-left: 0.15rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        color:rgba(255,255,255,1);
      }
      span:nth-child(2){
        float: right;
        margin-right: 0.15rem;
        font-size:0.4rem;
        font-family:PingFangSC-Semibold;
        color:rgba(255,255,255,1);
      }
    }
  }
  .masterDetailThree{
    width: 100%;
    overflow: hidden;
    padding: 0 10%;
    display: flex;
    margin-bottom:0.35rem ;
    li{
      flex: 1;
      text-align: center;
      height: .94rem;
      border-right: 0.01rem solid #AFBBEC;
      span:nth-child(1){
        font-size:0.36rem;
        font-family:PingFangSC-Semibold;
        color:rgba(255,255,255,1)
      }
      span:last-child{
        font-size:0.26rem;
        font-family:PingFangSC-Regular;
        color:rgba(169,183,241,1);
      }
    }
    li:nth-child(3){
      border-right: 0;
    }
  }
  .masterDetailFour{
    width: 100%;
    overflow: hidden;
    padding: 0 10%;
    display: flex;
    margin-bottom:0.35rem ;
    li{
      height: 0.94rem;
      border-right: 0.01rem solid #AFBBEC;
      flex: 1;
      text-align: center;
      span:nth-child(1){
        font-size:0.36rem;
        font-family:PingFangSC-Semibold;
        color:rgba(255,255,255,1)
      }
      span:last-child{
        font-size:0.26rem;
        font-family:PingFangSC-Regular;
        color:rgba(169,183,241,1);
      }
    }
    li:nth-child(3){
      border-right: 0;
    }
  }
</style>


