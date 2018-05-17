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
    <div class="masterDetailContent">
          <ul class="personal_information">
            <li><span>张大明</span>
              <span style="color:rgba(83,107,210,1);display: inline-block;width:1.2rem;height: .42rem;border:0.01rem solid #536BD2;text-align: center;border-radius:0.22rem ;">空闲中</span>
              <span style="margin-right: 0.4rem" @click="EditInformation()"><img src="../../assets/images/EditInformation.png">编辑信息</span>
            </li>
            <li><span>师傅编号</span><span>0544231</span></li>
            <li><span>师傅手机号</span><span>13478523698</span></li>
            <li><span>身份证号</span><span>45645644646546446654</span></li>
            <li id="emergencyContact"><span>紧急联系人</span><span>陈晓霞 13714588888</span></li>
            <li><span>师傅等级</span><span>中级</span></li>
            <li><span>服务城市</span><span>深圳</span></li>
            <li><span>服务区域</span><span>罗湖区</span><br><b>南山区-西丽街道，桃源街道，粤海街道，沙河街道，蛇口街道</b></li>
            <li><span>服务工种</span><span>家电维修</span><br><b> 家电清洗-冰箱，洗衣机</b></li>
            <li id="idEdit">证件信息</li>
            <li id="imgId"><div><p><img src="../../assets/images/idBack.png"></p><span>身份证正面照</span></div>
                            <div><p><img src="../../assets/images/idBack.png"></p><span>身份证反面照</span></div>
                            <div> <p><img src="../../assets/images/idBack.png"></p><span>本人手持身份证照</span></div>
                            <div> <p><img src="../../assets/images/idBack.png"></p><span>其他证件照</span></div>
            </li>
          </ul>

    </div>
    <div class="footer">
      <p><span>注册时间:</span><span>2018-04-18</span></p>
      <p><span>认证时间:</span><span>2018-04-18</span></p>
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
        EditInformation(v){ //编辑信息
          console.log("carter")
        }

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
  .masterDetailContent{
    width: 100%;
    margin-top: 0.15rem;
    background: #ffffff;
  }
  .personal_information{
    width: 100%;
    padding: 0.2rem 0;
    li:nth-child(1){
       span:nth-child(3){
         float: right;
         font-size:0.3rem;
         font-family:PingFangSC-Regular;
         color:rgba(83,107,210,1);
         img{
           margin: 0 0.13rem;
           display: inline-block;
           width: 0.3rem;
           height: 0.3rem;
         }
       }
    }
    li{
      width: 100%;
      /*height:0.42rem;*/
      font-size:0.3rem;
      font-family:PingFangSC-Regular;
      color:rgba(57,57,57,1);
      line-height:0.42rem;
      margin-top: 0.35rem;
      span:nth-child(1){
        display: inline-block;
        width:1.6rem;
        margin-right: 0.22rem;
        font-size:0.3rem;
        line-height:0.42rem;
        font-family:PingFangSC-Regular;
        color:rgba(136,136,136,1);
        text-align: right;
      }
      span:nth-child(2){
        font-size:0.3rem;
        line-height:0.42rem;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
      }
      b{
        display: inline-block;
        font-weight: 100;
        line-height:0.42rem;
        width: 75%;
        margin-left: 25%;
        font-size:0.3rem;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
      }

    }
    #idEdit{
      width: 100%;
      text-align: center;
      height:0.6rem;
      background:rgba(241,241,241,1);
      line-height: 0.6rem;
      font-size:0.28rem;
      font-family:PingFangSC-Regular;
      color:rgba(83,107,210,1);
    }
    #emergencyContact{
      background:rgba(241,241,241,1);
    }

    #imgId{
      width: 100%;
      padding: 0.56rem;
      overflow: hidden;
      div{
        width: 45%;
        float: left;
        margin-right: 10%;
        text-align: center;
        p{
          width: 100%;
          height: 1.79rem;
          border: 0.01rem solid #cccccc;
          background:rgba(255,255,255,1);
          border-radius:0.08rem ;
          img{
              margin: 0.17rem auto;
                display: block;
                width: 2.25rem;
                height: 1.45rem;
          }
        }
        span{
          display: inline-block;
          margin: 0.2rem 0;
          height:0.4rem;
          font-size:0.28rem;
          font-family:PingFangSC-Regular;
          color:rgba(57,57,57,1);
          line-height:0.4rem;
        }
      }
      div:nth-child(2n){
        margin-right:0;
      }
    }
  }
.footer{
  width: 100%;
  padding: 0.2rem;
  p{
    height:0.33rem;
    font-size:0.24rem;
    font-family:PingFangSC-Regular;
    color:rgba(136,136,136,1);
    line-height:0.33rem;
    span:nth-child(2){
      margin: 0 0.2rem;
    }
  }
}
</style>


