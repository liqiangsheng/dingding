<template>
  <!--工单详情-->
  <div style="position: absolute;left: 0;top:0.96rem;bottom: 0;right: 0;">
    <priceDetail @contentFooterOne="contentFooterOne" v-if="contentFooter1"></priceDetail>

    <div id="orderDetail">
      <div class="orderDetail_title">
        <p><span>{{orderInfo.state|BackOrderStatus}}</span><img src="../../../assets/images/gobackTwo.png"></p>
      </div>
          <div class="orderDetail_header">
            <ul class="orderDetail_headercenter">
              <li> <p><span>工单号：{{orderInfo.id}}</span><span>{{orderInfo.channelWarranty|channelWarranty}}</span></p></li>
               <li><h3>{{orderInfo.fLabelBusiness|FLabelBusiness}}</h3></li>
              <li v-for="(item,index) in serviceInfos"><span>{{item.serviceFullName}}</span><span>×{{item.serviceSize}}</span></li>
              <li v-show="AccessoriesTable">配件信息</li>
              <li id="parts" v-for="(item,index) in mountings"><span>{{item.name}}</span><span>￥{{item.price}}</span></li>
              <li id="price">
                     <p><span>服务费</span><span>￥{{orderInfo.price2Subtotal}}</span></p>
                      <p><span>检测费</span><span>￥{{orderInfo.price1Subtotal}}</span></p>
                      <p><span>高空费</span><span>￥{{orderInfo.price4Subtotal}}</span></p>
              </li>
            </ul>

          </div>
        <div class="orderDetail_content">
          <div class="orderDetail_contentTitle">
            <div class="orderDetail_contentTitleLeft">
               <p><span>{{orderInfo.linkmanName}}</span><span>{{orderInfo.userPhoneNum}}</span></p>
               <p>{{orderInfo.linkmanDetails}}</p>
            </div>
            <a class="orderDetail_contentTitleRight" :href="'tel:'+orderInfo.userPhoneNum">
              <img src="../../../assets/images/telPhoneOne.png">
              <p>联系用户</p>
            </a>
          </div>
          <ul class="orderDetail_contentContent">
               <p id="Bailout"><span>{{orderInfo.emergencyDegree|Emergencydegree}}</span></p>
                <li><span>预约时间</span><span>{{orderInfo.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}</span></li>
                <li><span>完成时间</span><span>{{orderInfo.serviceTimeComplete}}</span></li>
                <li><span>准时偏差</span><span>{{orderInfo.completeTimeLimit}}</span></li>
                <li><span>备注</span><span>{{orderInfo.remark||"无"}}</span></li>
          </ul>
        </div>
      <ul  class="orderDetail_contentMaster">
        <li>师傅信息</li>
        <li><span>{{orderInfo.masterName}}</span><span>{{orderInfo.masterPhoneNum}}</span></li>
        <li><span>师傅编号</span><span>{{orderInfo.masterId}}</span></li>
      </ul>
      <div class="orderDetail_contentStar">
        <p>
          <span>工单评分</span>
          <span>
            <img :src="allPath[0]">
             <img :src="allPath[1]">
             <img :src="allPath[2]">
             <img :src="allPath[3]">
             <img :src="allPath[4]">
          </span>
            <span>{{starAll}}</span>
        </p>
      </div>
      <div  class="orderDetail_contentFooter" v-show="contentFooter">
         <li><span>待收款 </span><span>￥{{orderInfo.waitAmount}}</span></li>
        <li><span>工单总费用 </span><span>￥{{orderInfo.orderTotal}}</span></li>
        <p @click="priceDetail">费用详情 <img src="../../../assets/images/xiangxia.png"></p>
      </div>
    </div>
    </div>
</template>
<script>
  import {star} from "../js/star"
  import priceDetail from "./priceDetail.vue"
    export default {
    components:{
      priceDetail
    },
        data() {
            return {
              contentFooter:true, //费用详情
              contentFooter1:false, //费用详情
              innerGuaranteeShow:false, //保内
              bailOut: false,//保外
              star1:"star2",
              star2:"star2",
              star3:"star2",
              star4:"star2",
              star5:"star2",
              starAll:0,
              allPath:[],
              serviceInfos:[],
              orderInfo:{},
              coreMainOrderEvaluate:{},
              AccessoriesTable:true,
              mountings:[],
            }
        },
        methods: {
          priceDetail(){ //点击显示详情
          this.contentFooter1 = true;
          },
          contentFooterOne(){
            this.contentFooter1 = false;
          }
        },
        created() {

          if(JSON.parse(sessionStorage.getItem("orderDetailId"))==1){
              this.bailOut = true;
              this.innerGuaranteeShow = false;
          }else if(JSON.parse(sessionStorage.getItem("orderDetailId"))==2){
            this.bailOut = false;
            this.innerGuaranteeShow = true;
          }else{
            this.bailOut = false;
            this.innerGuaranteeShow = false;
          }
//          http://admin.test.dingdingkuaixiu.com/orderquery/findOneDetails?id=201805140938422068247698
          let url=this.$common.apidomain+"/orderquery/findOneDetails?id=201805140938422068247698"
          this.$http.get(url).then(res=>this.$httpFilter(res).then(data=>{
            console.log(data)
            this.orderInfo = data.result.coreMainOrder;
            this.$store.commit("orderInfo",this.orderInfo)
            this.serviceInfos = data.result.coreMainOrderServices;
            this.serviceInfos.forEach(v=>{
              this.mountings = v.mountings;
              if(this.mountings.length<=0){
                this.AccessoriesTable = false;
              }else{
                this.AccessoriesTable = true;
              }
            })
            if(data.result.coreMainOrderEvaluates&&data.result.coreMainOrderEvaluates.length>0){
              this.coreMainOrderEvaluate = data.result.coreMainOrderEvaluates[0];
              this.starAll = this.coreMainOrderEvaluate.level;
            }else{
              this.starAll = 0;
            }
          }));
          this.allPath=star(this.starAll,this.star1,this.star2,this.star3,this.star4,this.star5);
        }
    }
</script>
<style scoped lang="less">
#orderDetail{
  position: absolute;
  left: 0;
  top:0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
  background:rgba(241,241,241,1);
}
.orderDetail_title{
  width: 100%;
  height: 1rem;
  background: #536BD2;
  padding: 0 0.41rem;
  p{
    width: 100%;
    span{
      font-size:0.36rem;
      font-family:PingFangSC-Regular;
      color:rgba(255,255,255,1);
      line-height:1rem;
    }
    img{
      display: inline-block;
      width: 0.55rem;
      height: 0.75rem;
      float: right;
      margin-top: 0.1rem;
      transform: rotate(180deg);
    }
  }
}
  .orderDetail_header{
    width: 100%;
    background: #ffffff;
    padding: 0.25rem;
    .orderDetail_headercenter{
      width: 100%;
      margin-top: 0.2rem;
      border: 0.01rem solid #C3C3C3;
      overflow: hidden;
      border-radius: 0.08rem;
      li{
        width: 100%;
        padding: 0 0.25rem 0 0.25rem;
        height: 0.56rem;
      }
      li:nth-child(1){
        margin-top: 0.25rem;
        width: 100%;
        border-bottom: 0.01rem solid #D6D6D6;
        p{
          width: 100%;
          height: 0.33rem;
          span:nth-child(1){
            font-size:0.28rem;
            font-family:PingFangSC-Regular;
            color:rgba(57,57,57,1);
            line-height:0.33rem;
          }
          span:nth-child(2){
            float: right;
            margin-right:.2rem ;
            font-size:0.28rem;
            font-family:PingFangSC-Regular;
            color:rgba(230,88,49,1);
            line-height:0.4rem;
          }
        }
      }
      li:nth-child(2){
        margin-top: 0.25rem;
        h3{
          font-size:0.28rem;
          font-family:PingFangSC-Regular;
          color:rgba(57,57,57,1);
          line-height:0.56rem;
        }
      }
      li:nth-child(3){
        position: relative;
        span:nth-child(1){
          font-size:0.28rem;
          font-family:PingFangSC-Regular;
          color:rgba(57,57,57,1);
          line-height:0.56rem;
        }
        span:nth-child(2){
          position: absolute;
          right: 0.3rem;
          top: -0.2rem;
          font-size:0.28rem;
          font-family:Monaco;
          color:rgba(57,57,57,1);
          line-height:0.41rem;
        }
      }
      li:nth-child(4){
        width: 100%;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        color:rgba(136,136,136,1);
        line-height:0.56rem;
      }
      #parts{
        width: 100%;
        span:nth-child(1){
          font-size:0.28rem;
          font-family:PingFangSC-Regular;
          color:rgba(57,57,57,1);
          line-height:0.56rem;
        }
        span:nth-child(2){
          font-size:0.28rem;
          font-family:PingFangSC-Regular;
          color:rgba(57,57,57,1);
          line-height:0.42rem;
          float: right;
        }
      }
      #price{
        width: 100%;
        overflow: hidden;
        height: 0.9rem;
        margin-top: 0.5rem;
        overflow: hidden;
        border-top: 0.01rem solid #D6D6D6;
        p{
         float: left;
          margin-top: 0.25rem;
          width: 33%;
          font-size:0.28rem;
          font-family:PingFangSC-Regular;
          color:rgba(136,136,136,1);
          line-height:0.56rem;
        }
        p:nth-child(2){
          text-align: right;
        }
        p:last-child{
          float: right;
          text-align: right;
        }
      }
    }
  }
  .orderDetail_content{
    width:100%;
    padding: 0.25rem;
    margin-top: 0.16rem;
    background: #ffffff;
    .orderDetail_contentTitle{
      width:100%;
      height: 1.39rem;
      .orderDetail_contentTitleLeft{
        width: 79.9%;
        height: 1.39rem;
        float: left;
        border-right: 0.01rem solid #C3C3C3;
        p:nth-child(1){
          width: 100%;
          span:nth-child(1){
            font-size:0.32rem;
            font-family:PingFangSC-Regular;
            color:rgba(57,57,57,1);
            line-height:0.5rem;
          }
          span:nth-child(2){
            font-size:0.32rem;
            font-family:PingFangSC-Regular;
            color:rgba(57,57,57,1);
            line-height:0.5rem;
            margin: 0 0.57rem;
          }
        }
        p:nth-child(2){
          font-size:0.32rem;
          font-family:PingFangSC-Regular;
          color:rgba(57,57,57,1);
          line-height:0.5rem;
        }
      }
      .orderDetail_contentTitleRight{
        display: block;
        width: 20%;
        float: right;
        height: 1.39rem;
        img{
          margin: 10% auto;
          display: block;
          width: 0.7rem;
          height: 0.7rem;
        }
        p{
          text-align: center;
          width: 100%;
          font-family:PingFangSC-Regular;
          color:rgba(83,107,210,1);
          line-height:0.33rem;
        }
      }
    }
    .orderDetail_contentContent{
      width:100%;
      padding: 0.32rem 0;
      border-top: 0.01rem solid #C3C3C3;
      margin-top: 0.35rem;
      position: relative;

      li{
        width: 100%;
        height: 0.4rem;
        margin-bottom: 0.12rem;
        span:nth-child(1){
          display: inline-block;
          width: 1.2rem;
          text-align: right;
          font-size:0.28rem;
          font-family:PingFangSC-Regular;
          color:rgba(136,136,136,1);
          line-height:0.4rem;
          margin-right: 0.5rem;
        }
        span:nth-child(2){
          font-size:0.28rem;
          font-family:PingFangSC-Regular;
          color:rgba(57,57,57,1);
          line-height:0.5rem;
        }
      }
      #Bailout{
        position: absolute;
        right: 1.5rem;
        top:0.35rem;
        span{
          display: inline-block;
          width: 0.7rem;
          height: 0.32rem;
        }
      }
    }
  }
.orderDetail_contentMaster{
  padding: 0.25rem;
  background: #ffffff;
  width: 100%;
  margin-top: 0.16rem;
  li:nth-child(1){
    width: 100%;
    height: 0.45rem;
    font-size:0.28rem;
    font-family:PingFangSC-Regular;
    color:rgba(57,57,57,1);
    line-height:0.45rem;
  }
  li:nth-child(2){
    width: 100%;
    height: 0.5rem;
    span:nth-child(1){
      font-size:0.28rem;
      font-family:PingFangSC-Regular;
      color:rgba(57,57,57,1);
      line-height:0.5rem;
    }
    span:nth-child(2){
      font-size:0.28rem;
      font-family:PingFangSC-Regular;
      color:rgba(57,57,57,1);
      line-height:0.5rem;
      margin-left: 0.64rem;
    }
  }
  li:nth-child(3){
    width: 100%;
    height: 0.5rem;
    span:nth-child(1){
      font-size:0.28rem;
      font-family:PingFangSC-Regular;
      color:rgba(136,136,136,1);
      line-height:0.5rem;
    }
    span:nth-child(2){
      font-size:0.28rem;
      font-family:PingFangSC-Regular;
      color:rgba(136,136,136,1);
      line-height:0.5rem;
      margin-left: 0.34rem;
    }
  }
}
.orderDetail_contentStar{
  padding: 0.25rem;
  width: 100%;
  margin-top: 0.16rem;
  background: #ffffff;
  p{
    width: 100%;
    height: 0.45rem;
    span:nth-child(1){
      font-size:0.32rem;
      font-family:PingFangSC-Regular;
      color:rgba(57,57,57,1);
      line-height:0.45rem;
    }
    span:nth-child(2){
      margin-left: 0.3rem;
      img{
        display: inline-block;
        width: 0.26rem;
        height: 0.25rem;
      }
    }
    span:nth-child(3){
      font-size:0.28rem;
      font-family:PingFangSC-Regular;
      color:rgba(230,88,49,1);
      line-height:0.50rem;
      margin-left: 0.3rem;
    }
  }
}
.orderDetail_contentFooter{
  margin-top: 0.16rem;
  margin-bottom: 0.7rem;
  background: #ffffff;
  height: 1.49rem;
  padding: 0.25rem;
  position: relative;
  li:nth-child(1){
    width: 100%;
    height: 0.6rem;
    text-align: right;
    font-size:0.32rem;
    font-family:PingFangSC-Regular;
    color:rgba(230,88,49,1);
    line-height:0.6rem;
  }
  li:nth-child(2){
    width: 100%;
    text-align: right;
    height: 0.6rem;
    font-size:0.32rem;
    font-family:PingFangSC-Regular;
    color:rgba(230,88,49,1);
    line-height:0.6rem;
  }
  p{
    position: absolute;
    left: 0.44rem;
    top:0.58rem;
    span{
      display: inline-block;
      width:1.12rem;
      height:0.4rem;
      font-size:0.28rem;
      font-family:PingFangSC-Regular;
      color:rgba(83,107,210,1);
      line-height:0.4rem;
    }
    img{
      display: inline-block;
      width: 0.22rem;
      height: 0.12rem;
    }
  }
}
</style>


