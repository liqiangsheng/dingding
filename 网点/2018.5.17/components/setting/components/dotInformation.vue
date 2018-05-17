<template>
  <!--网点信息-->
    <div id="dotInformation">
      <div class="masterDetailHeader">
        <div class="masterDetailOne">
          <p><span>215</span></p>
          <p><span>总接单量</span></p>
          <p><span>服务分80</span></p>
        </div>
        <ul class="masterDetailThree">
          <li><span>205</span><br><span>已完成</span></li>
          <li><span>5</span><br><span>待服务</span></li>
          <li><span>10</span><br><span>待分配</span></li>

        </ul>
        <div style="width: 90%;margin: 0 5% 0.3rem;height: 0.02rem;background: #D4D4D4"></div>
        <ul class="masterDetailFour">
          <li><span>5</span><br><span>异常结款</span></li>
          <li><span>5</span><br><span>异常次数</span></li>
          <li><span>0</span><br><span>投诉工单</span></li>
        </ul>

      </div>
      <div class="masterDetailContent">
        <ul class="personal_information">
          <li><span>网点编号</span><span>{{masterDetailObj.id}}</span></li>
          <li><span>网点名称</span><span>{{masterDetailObj.name}}</span></li>
          <li><span>用户名</span><span>{{masterDetailObj.username}}</span></li>
          <li><span>联系人</span><span>{{masterDetailObj.linkmanName}}</span></li>
          <li><span>手机号</span><span>{{masterDetailObj.linkmanPhoneNum}}</span></li>
          <li><span>公司电话</span><span>{{masterDetailObj.companyTel}}</span></li>
          <li><span>服务区域</span><b>{{areas}}</b></li>
          <li><span>服务工种</span><b>{{skills}}</b></li>
        </ul>

      </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              masterDetailObj:{},//师傅数据
              areas:"",  //服务地区
              skills:"",//服务工种
            }
        },
        methods: {},
        created() {
              let url=this.$common.apidomain+"/siteInfo/findDetail/?id="+JSON.parse(localStorage.getItem("userInfo")).id
              this.$http.get(url).then(res=>this.$httpFilter(res).then(data=>{
                console.log(data)
                this.masterDetailObj = data.result.siteInfo;
                data.result.areas.forEach((v,i)=>{
                  this.areas +=" "+v.label+",";
                })
                data.result.skills.forEach((v,i)=>{
                  this.skills +=" "+v.label+",";
                })
              }))
        }
    }
</script>
<style scoped lang="less">
  #dotInformation{
    position: absolute;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    background:rgba(241,241,241,1);
  }
  .masterDetailHeader{
    width: 100%;
    background: #ffffff;
    padding-bottom:0.5rem ;
  }
  .masterDetailOne{
    width: 100%;
    padding-bottom:0.5rem ;
    overflow: hidden;
    p:nth-child(1){
      width: 100%;
      margin-top: 1rem;
      text-align: center;
      font-size:0.5rem;
      font-family:PingFangSC-Semibold;
      color:rgba(83,107,210,1);
      line-height:0.7rem;
    }
    p:nth-child(2){
      width: 100%;
      text-align: center;
      font-size:0.32rem;
      font-family:PingFangSC-Regular;
      color:rgba(83,107,210,1);
      line-height:0.45rem;
    }
    p:nth-child(3){
      width: 100%;
      text-align: center;
      margin-left: 35%;
      width:2.24rem;
      height:0.5rem;
      background:rgba(83,107,210,1);
      font-size:0.28rem;
      font-family:PingFangSC-Regular;
      color:#FFFFFF;
      border-radius: 0.29rem ;
      text-align: center;
      line-height: 0.5rem;
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
      span:nth-child(1){
        font-size:0.36rem;
        font-family:PingFangSC-Semibold;
        font-family:PingFangSC-Semibold;
      }
      span:last-child{
        font-size:0.26rem;
        font-family:PingFangSC-Regular;
        font-family:PingFangSC-Semibold;
      }
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
      flex: 1;
      text-align: center;
      span:nth-child(1){
        font-size:0.36rem;
        font-family:PingFangSC-Semibold;
        font-family:PingFangSC-Semibold;
      }
      span:last-child{
        font-size:0.26rem;
        font-family:PingFangSC-Regular;
        font-family:PingFangSC-Semibold;
      }
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
        transform: translateY(-0.4rem);
        font-weight: 100;
        line-height:0.42rem;
        width: 75%;
        margin-left: 25%;
        font-size:0.3rem;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
      }

    }
    li:last-child{
      margin-top: 0;
    }
  }
</style>


