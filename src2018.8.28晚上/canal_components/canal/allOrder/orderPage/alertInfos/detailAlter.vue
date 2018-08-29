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
                                      <li><span style="flex-grow: 1">工单号</span><span>{{detailData.id}}</span><span style="flex-grow: 1">工单状态</span><span>{{detailData.state|orderStateShow}}</span></li>
                                      <li><span style="flex-grow: 1">质保状态</span><span>{{detailData.channelWarranty|qudaozhibao}}</span><span style="flex-grow: 1">紧急程度</span><span><b :style="isStyle">{{detailData.emergencyDegree|jinjidu}}</b></span></li>
                                      <li><span style="flex-grow: 1">联系人</span><span>{{detailData.linkmanName}}</span><span style="flex-grow: 1">联系人手机</span><span>{{detailData.linkmanPhoneNum}}</span></li>
                                      <li><span style="flex-grow: 1">服务地址</span><span style="flex-grow: 5">{{detailData.linkmanDetails}}</span></li>
                                      <li><span style="flex-grow: 1">预约时间</span><span>{{detailData.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}</span><span style="flex-grow: 1">完成时间</span><span>{{detailData.canWithdrawDepositAmount|moment('YYYY-MM-DD HH:mm:ss')}}</span></li>
                                      <li><span style="flex-grow: 1">服务时长</span><span>{{detailData.workTimeLimit}}</span><span style="flex-grow: 1">子渠道</span><span>{{detailData.officialPartnerSubsetName}}</span></li>
                                      <li><span style="flex-grow: 1">工程师工号</span><span>{{detailData.masterId}}</span><span style="flex-grow: 1">工单类型</span><span>{{detailData.type|orderType}}</span></li>
                                      <li><span style="flex-grow: 1">备注</span><span style="flex-grow: 5">{{detailData.remark}}</span></li>
                                    </ul>
                              </div>
                         </div>
                         <div class="userInformation1">
                           <p><span></span>服务类型</p>
                           <div class="userInfos1"  v-for="(item,index) in chanpingleixing">
                             <div class="userInfosBox2">
                                 <ul class="list1">
                                   <li style="flex-grow:2">产品名称</li>
                                   <li style="flex-grow:10">{{item.serviceFullName}}</li>
                                   <li style="flex-grow:2">品牌</li>
                                   <li style="flex-grow:4">{{item.serviceBrand}}</li>
                                   <li style="flex-grow:2">型号</li>
                                   <li style="flex-grow:4">{{item.serviceModel}}</li>

                                 </ul>
                               <ul class="list2">
                                 <li style="flex-grow:2">服务费</li>
                                 <li style="flex-grow:10">{{item.price2}}</li>
                                 <li style="flex-grow:2">检测费</li>
                                 <li>{{item.price1}}</li>
                                 <li style="flex-grow:2">数量</li>
                                 <li>{{item.serviceSize}}</li>
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
                     <br>
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
                                     <li>{{detailData.waitAmount}}</li>
                                     <li>结款状态</li>
                                     <li style="text-indent: 2px"> {{detailData.state|orderStateShow1}}</li>
                                   </ul>
                               </div>
                             </div>
                           </div>

                     <div class="userInformation5">
                       <p><span></span>工单凭证</p>
                       <div class="userInfos2">
                           <ul>
                             <li v-for="(item,index) in zhaopianData">
                               <img :src="item.name"><br>
                               <p>拍照时间：{{item.id}}</p><br>
                               <p>拍照地点：{{pianzheng.idPhonesAddress}}</p>
                             </li>
                           </ul>
                       </div>
                     </div>
                     <div class="userInformation6" v-show="tbodyS">
                       <p><span></span>备注信息</p>
                       <div class="userInfos2">
                        <ul class="list1"><li v-for="(item,index) in theadS">{{item}}</li></ul>
                         <ul class="list2">
                           <li v-for="(item,index) in tbodyS"><span>{{item.operator}}</span><span>{{item.operateTimeStr}}</span><span>{{item.reasonOfComplaint}}</span><span>{{item.remark}}</span></li>
                         </ul>
                       </div>
                     </div>


                             <div class="userInformation3">
                               <p @click="weibaiClick">申请维保？<img src="/static/images/wenhao.png" style="width: 18px;height: 18px"></p>
                               <p v-show="shenqingweibao">致电客服热线：400-999-1891</p>
                               <el-button type="primary" v-show="fukuanShow" @click="fukuanClcik">{{fukuan}}</el-button>
                             </div>
                         </div>
                   </div>
            </div>
      <CreditIsRunningLow v-if="CreditIsRunningLowShow" :detailDataOrderTotal="detailData.waitAmount" @isClose="isClose"></CreditIsRunningLow>
      <WorkOrderSubmission v-if="WorkOrderSubmissionShow"  @isClose="isClose"></WorkOrderSubmission>
  </div>
</template>
<script>
  import CreditIsRunningLow from "./creditIsRunningLow.vue"
  import WorkOrderSubmission from "./WorkOrderSubmission.vue"
  export default {
    components:{
      CreditIsRunningLow,WorkOrderSubmission
    },
    props:["detailAlterId"],
    data() {
      return {
        theadS:["操作人","时间","类型","备注"],
        tbodyS:[], //备注
        pianzheng:{}, //凭证
        zhaopian:[], //图片
        xianshiTime:[],//显示时间
        zhaopianData:[],
        fukuan:"去支付",
        fukuanShow:false,
        WorkOrderSubmissionShow:false,
        CreditIsRunningLowShow:false,
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
      let url = this.$apidomain +"/orderquery/findOneDetails?id="+this.$store.state.detailAlterId;
      this.$http.get(url).then(res=>{
        console.log(res);
        this.tbodyS =res.data.result.coreMainOrderExceptionRecords?res.data.result.coreMainOrderExceptionRecords:[];//备注
        this.pianzheng = res.data.result.coreMainOrderSubsidiary;//凭证
        this.zhaopian = res.data.result.coreMainOrderSubsidiary?res.data.result.coreMainOrderSubsidiary.idPhotos.split(","):[];
        this.xianshiTime =res.data.result.coreMainOrderSubsidiary?res.data.result.coreMainOrderSubsidiary.idPhonesTime.split(","):[];
        this.zhaopian.forEach((v,i)=>{
          this.zhaopianData.push({});
          this.zhaopianData[i].name = this.zhaopian[i];
          this.zhaopianData[i].id = this.xianshiTime[i];
        });
        this.detailData = res.data.result.coreMainOrder;
        if(this.detailData.emergencyDegree =="1"){
          this.isStyle = {background:"red",color:"#ffffff"}
        }
        if(this.detailData.state =="01"){
            this.fukuan ="去付款";
            this.fukuanShow = true;
        }else if(this.detailData.state =="11"){
          this.fukuan ="去付尾款";
          this.fukuanShow = true;
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

      })
    },
    methods: {
      getTableList(){
            sessionStorage.removeItem("mainOrderId");
            sessionStorage.setItem('mainOrderId', JSON.stringify(this.detailData.id));
            let mainOrderIdObj={};
            mainOrderIdObj.mainOrderId = this.detailData.id;
            mainOrderIdObj.officialPartnerId = this.detailData.officialPartnerId;
            console.log(mainOrderIdObj)
            let mainOrderIdUrl=this.$apidomain+"/order/payCallback";
            this.$http.post(mainOrderIdUrl,mainOrderIdObj).then(res1=>{
              if(res1.data.code =="0000"){
                this.WorkOrderSubmissionShow = true;
              }else if(res1.data.code=="0902"){
                   this.CreditIsRunningLowShow =true;
              }else{
                return this.$queryFun.successAlert.call(this,res1.data.error)
              }
            })
      },
      isClose(){
        this.CreditIsRunningLowShow =false;
      },
      fukuanClcik(){//去结款
//        this.CreditIsRunningLowShow =true;
        this.getTableList()
      },
       close(){ //传值给父亲组件
        let isbool = false;
        this.$emit("isClose1",isbool)
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
            text-align: left;
            text-indent:10px;
            display: flex;
          font-size:14px;
          font-family:PingFangSC-Regular;
          color:rgba(94,109,130,1);
          line-height:36px;
          span{
            display: inline-block;
            flex: 2;
            border: 1px solid #CCCCCC;
            border-top:0 ;
            border-left:0;
          }
        }
        li:nth-child(2n){
          background: #f3f3f3;
        }



      }
    }
  }
  .userInformation1{
    width: 100%;
    padding-bottom: 10px;
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
            text-align: left;
            text-indent:10px;
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
            text-align: left;
            text-indent:10px;
            height:38px;
            background:rgba(229,233,242,1);
            /*background:rgba(255,247,204,1);*/
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
              text-align: left;
              text-indent:10px;
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
            text-align: left;
            text-indent:10px;
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
            text-align: left;
            text-indent:10px;
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
    position: relative;
    .el-button{
      position: absolute;
      right: 20px;
      bottom: -10px;
    }
    p:nth-child(1){
      /*width: 100%;*/
      font-size:14px;
      font-family:PingFangSC-Regular;
      color:rgba(32,160,255,1);
      line-height:20px;
      padding: 0 10px;
      line-height:39px;
      cursor: pointer;
      float: left;
      img{
        transform: translateY(4px);
      }
    }
    p:nth-child(2){
      transform: translateY(-10px);
      height: 59px;
      float: left;
      font-size:14px;
      background:rgba(255,247,204,1);
      font-family:PingFangSC-Regular;
      color:rgba(74,74,74,1);
      line-height:59px;
      padding: 0 10px;
    }
  }
  .userInformation5{
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
      ul{
        width: 100%;
        display: flex;
        flex-wrap:wrap;
        li{
          width: 206px;
          margin:10px 28px 10px 0;
          img{
            display: inline-block;
            width: 100%;
            margin-bottom: 13px;
          }
          p{
            width:100%;
            font-size:13px;
            font-family:PingFangSC-Regular;
            color:rgba(51,51,51,1);
            line-height:18px;
          }
        }
      }
    }

  }
  .userInformation6{
    width: 100%;
    margin-top: 10px;
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
      overflow: hidden;
      .list1{
        width: 100%;
        overflow: hidden;
        li{
          height:44px;
          background:rgba(224,230,237,1);
          border:1px solid rgba(192,204,218,1);
          float: left;
          text-align: center;
          line-height: 44px;
          font-size:14px;
          font-family:PingFangSC-Regular;
          color:rgba(94,109,130,1);
          border-right: 0;
        }
        li:nth-child(1){
          width: 15%;
        }
        li:nth-child(2){
          width: 20%;
        }
        li:nth-child(3){
          width: 15%;
        }
        li:nth-child(4){
          width: 50%;
          border-right:1px solid rgba(192,204,218,1);
        }
      }
      .list2{
        width: 100%;
        li{
          width: 100%;
          height: 44px;
          overflow: hidden;
          border: 1px solid rgba(192,204,218,1);
          border-top: 0;
          span{
            height: 100%;
            float: left;
            display: inline-block;
            font-size:14px;
            font-family:PingFangSC-Regular;
            color:rgba(94,109,130,1);
            line-height:36px;
            text-align: center;
            border-right: 1px solid rgba(192,204,218,1);
            /*border-left: 1px solid rgba(192,204,218,1);*/
          }
          span:nth-child(1){
            width: 15%;
            border-left: 0;
          }
          span:nth-child(2){
            width: 20%;
          }
          span:nth-child(3){
            width: 15%;
          }
          span:nth-child(4){
            width: 50%;
            padding: 10px 21px 0 21px;
            font-size:14px;
            font-family:PingFangSC-Regular;
            color:#393939;
            line-height:14px;
            text-align: left;
            border-right: 0;
          }
        }
      }
    }

  }
</style>


