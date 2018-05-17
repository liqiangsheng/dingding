<template>
  <!--费用详情-->
    <div id="priceDetail">
           <div class="priceDetailShow"></div>
           <div class="priceDetailContent">
             <div  class="orderDetail_contentFooter">
               <li><span>待收款 </span><span>￥{{orderInfoObj.waitAmount}}</span></li>
               <li><span>工单总费用 </span><span>￥{{orderInfoObj.orderTotal}}</span></li>
               <p @click="priceDetail">费用详情 <img src="../../../assets/images/xiangxia.png"></p>
             </div>
             <ul class="orderDetail_list">
               <li><p>￥{{orderInfoObj.price1Subtotal}}</p><p>总检测费</p></li>
               <li><p>￥{{orderInfoObj.price2Subtotal}}</p><p>总服务费</p></li>
               <li><p>￥{{orderInfoObj.price3Subtotal}}</p><p>总配件费</p></li>
               <li><p>￥{{orderInfoObj.price4Subtotal}}</p><p>总高空费</p></li>
             </ul>
             <ul class="orderDetail_Pricelist">
               <li><span>优惠金额</span><span>-￥{{orderInfoObj.subtotalTotal}}</span></li>
               <li><span>实际已收款</span><span>￥{{orderInfoObj.paidAmount}}</span></li>
               <li><span>预估收入</span><span>￥{{orderInfoObj.handleTotal}}</span></li>
               <li><span style="color:#E65831;">待收款</span><span style="color:#E65831;">￥{{orderInfoObj.waitAmount}}</span></li>
               <li><span style="color:#E65831;">工单总费用</span><span style="color:#E65831;">￥{{orderInfoObj.orderTotal}}</span></li>
             </ul>
           </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              orderInfoObj:{},
            }
        },
        methods: {
          priceDetail(){
            this.$emit("contentFooterOne",false)
          },
        },
        created() {
          this.orderInfoObj = this.$store.state.orderInfo;
console.log(this.$store.state.orderInfo)
        }
    }
</script>
<style scoped lang="less">
  #priceDetail{
    position: absolute;
    left: 0;
    top: -0.96rem;
    bottom: 0;
    right: 0;
    overflow: hidden;
    z-index: 999;
    .priceDetailShow{
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 999;
      background: black;
      opacity: 0.6;
    }
    .priceDetailContent{
      width: 100%;
      padding: 0.25rem;
      height: 6.67rem;
      position: absolute;
      left: 0;
      bottom: 0;
      background: #ffffff;
      z-index: 1000;
      box-shadow: 7px -7px 4px 0px rgba(212,212,212,0.5)

    }
  }
  .orderDetail_contentFooter{
    background: #ffffff;
    height: 1.49rem;
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
  .orderDetail_list{
    width: 100%;
    height: 1.49rem;
    background:rgba(245,245,245,1);
    display: flex;
    li{
      padding-top: 0.3rem;
      flex: 1;
      text-align: center;
      font-size: 0.26rem;
      font-family:PingFangSC-Regular;
      color:rgba(57,57,57,1);
    }
  }
  .orderDetail_Pricelist{
    padding: 0.25rem;
    height: 3rem;
    li{
      width: 100%;
      height: 0.5rem;
      span:nth-child(1){
        float: left;
        width: 50%;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
        line-height:0.6rem;
      }
      span:nth-child(2){
        float: right;
        width: 50%;
        text-align: right;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
        line-height:0.6rem;
      }
    }
  }
</style>


