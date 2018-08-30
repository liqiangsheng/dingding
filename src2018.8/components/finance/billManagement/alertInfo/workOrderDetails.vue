<template>
 <div>
        <div class="detailAlert"><!--背阴-->
        </div>
        <div class="detailAlert_box">
            <div class="el-message-box__title">
              <span>订单详情</span>
              <i class="el-message-box__close el-icon-close" @click="close"></i>
            </div>
            <div class="detailBox">
                   <div class="detail">
                         <div class="userInformation">
                              <p><span></span>服务信息</p>
                              <div class="userInfos">
                                    <ul class="userInfosBox">
                                      <li><span>工单号</span><span>{{detailData.id}}</span><span>工单状态</span><span>{{detailData.state|orderStateShow}}</span></li>
                                      <li><span>质保状态</span><span>{{detailData.channelWarranty|qudaozhibao}}</span><span>紧急程度</span><span><b :style="isStyle">{{detailData.emergencyDegree|jinjidu}}</b></span></li>
                                      <li><span>联系人</span><span>{{detailData.linkmanName}}</span><span>联系人手机</span><span>{{detailData.linkmanPhoneNum}}</span></li>
                                      <li><span style="flex-grow: 1">服务地址</span><span style="flex-grow: 3">{{detailData.linkmanDetails}}</span></li>
                                      <li><span>预约时间</span><span>{{detailData.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}</span><span>完成时间</span><span>{{detailData.createTime|moment('YYYY-MM-DD HH:mm:ss')}}</span></li>
                                      <li><span>服务时长</span><span>{{detailData.workTimeLimit}}</span><span>子渠道</span><span>{{detailData.officialPartnerSubsetName}}</span></li>
                                      <li><span>工程师工号</span><span>{{detailData.masterId}}</span><span>工单类型</span><span>{{detailData.type|orderType}}</span></li>
                                      <li><span style="flex-grow: 1">备注</span><span style="flex-grow: 3">{{detailData.remark}}</span></li>
                                    </ul>
                              </div>
                         </div>
                         <div class="userInformation1">
                           <p><span></span>服务类型</p>
                           <div class="userInfos1"  v-for="(item,index) in chanpingleixing">
                             <div class="userInfosBox2">
                                 <ul class="list1">
                                   <li>产品名称</li>
                                   <li style="flex-grow:4">{{item.serviceFullName}}</li>
                                   <li>品牌</li>
                                   <li>{{item.serviceBrand}}</li>
                                   <li>型号</li>
                                   <li>{{item.serviceModel}}</li>
                                   <li style="flex-grow:1">数量</li>
                                   <li style="flex-grow:1;border-right:0;">{{item.serviceSize}}</li>
                                 </ul>
                               <ul class="list2">
                                 <li style="flex-grow:2">服务费</li>
                                 <li>{{item.price2}}</li>
                                 <li style="flex-grow:2">检测费</li>
                                 <li>{{item.price1}}</li>
                               </ul>
                               <ul class="list3" v-show="listShow">
                                 <li v-for="(item1,index2) in item.mountings">
                                   <span>配件{{index2+1}}</span><span style="flex-grow:6">{{item1.serviceMountingsName}}</span>
                                   <span>单价</span><span style="flex-grow:4">{{item1.serviceMountingsPrice}}</span>
                                   <span>数量</span><span style="flex-grow:3">{{item1.serviceMountingsCount}}</span>
                                 </li>
                               </ul>
                             </div>
                           </div>
                         </div>
                           <div class="userInformation2">
                             <p><span></span>费用说明</p>
                             <div class="userInfos2">
                               <div class="userInfosBox4">
                                   <ul class="list1">
                                     <li>总检测费</li>
                                     <li>{{detailData.price1Subtotal}}</li>
                                     <li>总服务费</li>
                                     <li>{{detailData.price2Subtotal}}</li>
                                     <li>总配件费</li>
                                     <li>{{detailData.price3Subtotal}}</li>
                                     <li>总高空费</li>
                                     <li style="border-right:0;">{{detailData.price4Subtotal}}</li>
                                     <li>工单总费用</li>
                                     <li style="border-right:0;">{{detailData.orderTotal}}</li>
                                   </ul>
                                   <ul class="list2">
                                     <li>已退款</li>
                                     <li>{{detailData.refundAmount}}</li>
                                     <li>已返现</li>
                                     <li>{{detailData.cashbackAmount}}</li>
                                     <li>已付款</li>
                                     <li>{{detailData.paidAmount}}</li>
                                     <li>待付款</li>
                                     <li>{{detailData.paidAmount}}</li>
                                     <li>结款状态</li>
                                     <li> {{detailData.state|orderStateShow1}}</li>
                                   </ul>
                               </div>
                             </div>
                           </div>
                             <div class="userInformation3">
                               <p @click="weibaiClick">申请维保？<img src="/static/images/wenhao.png" style="width: 18px;height: 18px;transform:translateY(4px)"></p>
                               <p v-show="shenqingweibao">致电客服热线：400-999-1891</p>
                             </div>
                         </div>
                   </div>
            </div>

  </div>
</template>
<script>
  export default {
    components:{
    },
    props:["mainOrderId"],
    data() {
      return {
        listShow:false,  //服务类型 配件费
        peijian:[], //配件列表
        detailData:{}, //详情数据
        shenqingweibao:false, //申请维保
        chanpingleixing:[], //产品类型
        peijian:[], //配件
        isStyle:{"background":"#ffffff"}
      }
    },
    created(){
//          console.log(this.$store.state.detailAlterId,"vuex异步")
      let url = this.$apidomain +"/orderquery/findOneDetails?id="+this.mainOrderId;
      this.$http.get(url).then(res=>{
        console.log(res,"详情数据")
        if(res.data.code==="0000"){
        this.detailData = res.data.result.coreMainOrder;
        if(this.detailData.emergencyDegree =="1"){
          this.isStyle = {background:"red",color:"#ffffff"}
        }

        this.chanpingleixing = res.data.result.coreMainOrderServices;
        if(!this.detailData.remark){
          this.detailData.remark = "暂无";
        }
        this.chanpingleixing.forEach(res=>{
          this.peijian = res.mountings;
          if(this.peijian.length <= 0){
               this.listShow = false;
          }else {
            this.listShow = true;
          }
        })
        }
      })
    },
    methods: {
       close(){ //传值给父亲组件
        let isbool = false;
        this.$emit("isClose",isbool)
        },
      weibaiClick(){ //申请维保
         this.shenqingweibao = !this.shenqingweibao;
      },
    },
    mounted() {
    },
  }
</script>

<style scoped lang="scss">
  .detailAlert{
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
  .detailAlert_box{
    width: 80%;
    height: 75%;
    background-color: #fff;
    position: absolute;
    left: 11%;
    top:12%;
    z-index:10000;
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
      right: 14px;
      top:14px;
    }
    span{
      width: 100%;
      display: inline-block;
      height:14px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:48px;
      text-align: center;
    }
  }
.detailBox{
  width: 100%;
  height: 93%;
  padding: 10px;
  overflow-y: auto;
}
  .detail{
    width:100%;
    overflow-y: auto;
  }
  .userInformation{
    width: 100%;
    p{
      height:22px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(136,136,136,1);
      line-height:22px;
      span{
        display: inline-block;
        width:4px;
        height:18px;
        background:rgba(230,88,49,1);
        transform: translateY(4px);
        margin-right: 10px;
      }
    }
    .userInfos{
      width: 100%;
      padding: 20px;
      display: flex;

      .userInfosBox{
        flex: 1;
        border-left: 1px solid #CCCCCC;
        border-top: 1px solid #CCCCCC;
          li{
            text-align: center;
            display: flex;
          font-size:14px;
          font-family:PingFangSC-Regular;
          color:rgba(94,109,130,1);
          line-height:36px;
          span{
            display: inline-block;
            flex: 1;
            border: 1px solid #CCCCCC;
            border-top:0 ;
            border-left:0;
          }
        }



      }
    }
  }
  .userInformation1{
    width: 100%;
    p{
      height:22px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(136,136,136,1);
      line-height:22px;
      span{
        display: inline-block;
        width:4px;
        height:18px;
        background:rgba(230,88,49,1);
        transform: translateY(4px);
        margin-right: 10px;
      }
    }
    .userInfos1{
      width: 100%;
      padding: 20px;
      display: flex;
      .userInfosBox2{
        flex: 1;
        border: 1px solid #CCCCCC;
        border-bottom: 0;
        .list1{
          width:100%;
          display: flex;
          li{
            font-size:14px;
            flex: 2;
            text-align: center;
            height:38px;
            background:rgba(229,233,242,1);
            line-height: 38px;
            border-right: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
          }
        }
        .list2{
          width: 100%;
          display: flex;
          li{
            flex: 4;
            font-size:14px;
            text-align: center;
            height:38px;
            background:rgba(255,247,204,1);
            line-height: 38px;
            border-right: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
          }
        }
        .list3{
          width: 100%;
          li{
            width: 100%;
            display: flex;
            span{
              height:38px;
              text-align: center;
              background:rgba(255,255,255,1);
              font-size:14px;
              font-family:PingFangSC-Regular;
              color:rgba(94,109,130,1);
              line-height:36px;
              flex: 2;
              border-right: 1px solid #cccccc;
              border-bottom: 1px solid #cccccc;
            }
          }
        }
      }


    }
    .userInfos2{
      width: 100%;
      padding: 20px;
      display: flex;
    }
  }
  .userInformation2{
    width: 100%;
    p{
      height:22px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(136,136,136,1);
      line-height:22px;
      span{
        display: inline-block;
        width:4px;
        height:18px;
        background:rgba(230,88,49,1);
        transform: translateY(4px);
        margin-right: 10px;
      }
    }
    .userInfos2{
      width: 100%;
      padding: 20px;
      display: flex;
      .userInfosBox4 {
        flex: 1;
        border: 1px solid #CCCCCC;
        .list1 {
          width: 100%;
          display: flex;
          li {
            flex: 2;
            text-align: center;
            height: 38px;
            line-height: 38px;
            font-size:14px;
            border-right: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
          }
        }
        .list2 {
          width: 100%;
          display: flex;
          li {
            flex: 4;
            text-align: center;
            height: 38px;
            font-size:14px;
            background: rgba(255, 247, 204, 1);
            line-height: 38px;
            border-right: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
          }
        }
      }
    }

  }
  .userInformation3{
    width: 100%;
    padding: 20px;
    p:nth-child(1){
      width: 100%;
      font-size:14px;
      font-family:PingFangSC-Regular;
      color:rgba(32,160,255,1);
      line-height:20px;
      padding: 0 10px;
      line-height:39px;
      cursor: pointer;
    }
    p:nth-child(2){
      height: 59px;
      font-size:14px;
      background:rgba(255,247,204,1);
      font-family:PingFangSC-Regular;
      color:rgba(74,74,74,1);
      line-height:59px;
      padding: 0 10px;
    }
  }
</style>


