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
          <li>充值账号:<span>{{this.xianshiData.officialPartnerName}}</span></li>
          <li>当前余额:<span>{{this.xianshiData.balance}}元</span></li>
          <li>充值金额:<span style="color:rgba(230,88,49,1);font-size:20px;">{{this.price1}}元</span><a class="chongzhi" @click="modifyClick">修改充值金额</a></li>
        </ul>
      </section>
      <div class="footer">
        <ul id="list">
          <li v-for="(item,index) in fangshi" @click="tabClick(item,index)" :class="{active:xianshiIndex==index}">{{item}}</li>
        </ul>
        <div>
          <WechatScavengingCater :weachat="weachat"  @success="success" v-if="xianshiIndex == 0"></WechatScavengingCater>
          <TransferAccountsCater :zhifubao="zhifubao" @success="success" v-if="xianshiIndex ==1"></TransferAccountsCater>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
//  import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
  import WechatScavengingCater from "./wechatScavengingCater.vue"
  import TransferAccountsCater from "./transferAccountsCater.vue"
  export default {
    components:{
      WechatScavengingCater,TransferAccountsCater
    },
    data() {
      return {
        xianshiIndex : 0,
        zhifuDataObj:{},//支付数据
        userInfo:"", //账号
        price1:"", //充值余额
        fangshi:["微信扫码充值","支付宝扫码充值"],
        xianshiData:{}, //显示的数据
        weachat:{}, //微信数据
        zhifubao:{}, //支付宝数据
        zhifubao2:{},//支付宝初始数据
        weixinchushiOBJ:{},
        data:{index:"0"},
        results:{
        }
      }
    },
    methods: {
      success(v){
        console.log(v,"dsds")
        this.close1();
//        location.reload();
      },
      modifyClick(){
        this.close1();
      },
      close1(){ //充值
        this.$emit("isClose1",false)
      },
      tabClick(v,index){
        console.log(index)
        this.xianshiIndex = index;
//        this. weixinchushiData();
        if(index === 0){
          console.log(this.weixinchushiOBJ,"sdfdsyfds反对发射点")
          let priceObj = {faPayJournalAccountId:this.weixinchushiOBJ.faPayJournalAccountId};
//            priceObj.faPayJournalAccountId=this.weixinchushiOBJ.faPayJournalAccountId; // 二维码id
            priceObj.payAmount=this.price1; //价格
            priceObj.paymentChannel=2;
            priceObj.payType = 1; //1微信//2支付宝
            let priceObjurl=this.$apidomain+"/officialpartnerpay/recharge"
            this.$http.post(priceObjurl,priceObj).then(res=>{
            console.log(res,"微信二次")
            if(res.data.code === "0000"){
              this.weachat = res.data.result;
            }else{
              alert(res.data.error)
            }
          })
          sessionStorage.setItem("weachat",JSON.stringify(this.weachat))

        }else if(index === 1){
          let priceObj1 = {};
          priceObj1.faPayJournalAccountId=this.zhifubao2.faPayJournalAccountId; // 二维码id
          priceObj1.payAmount=this.price1; //价格
          priceObj1.paymentChannel=2;
          priceObj1.payType = 2; //1微信//2支付宝
          let priceObj1url=this.$apidomain+"/officialpartnerpay/recharge"
          this.$http.post(priceObj1url,priceObj1).then(res=>{
            console.log(res,"支付宝二次")
            if(res.data.code === "0000"){
               this.zhifubao = res.data.result;
               sessionStorage.setItem("zhifubao",JSON.stringify(this.zhifubao))
            }else{
              alert(res.data.error)
            }

          })
        }
      },
      weixinchushiData(){
         let priceObj = {};
         priceObj.faPayJournalAccountId="";
         priceObj.payAmount=JSON.parse(sessionStorage.getItem("price1")); //价格
         priceObj.paymentChannel=2;
         priceObj.payType = 1; //1微信//2支付宝
         let urlweahat=this.$apidomain+"/officialpartnerpay/recharge"
          this.$http.post(urlweahat,priceObj).then(res=>{

           if(res.data.code === "0000"){
             this.weixinchushiOBJ=res.data.result;
           }else{
             return this.$queryFun.successAlert.call(this,res.data.error)
           }

       })  //微信初始数据

      }
    },
    mounted() {
    },
    computed:{
    },
    created(){
      this.price1 = JSON.parse(sessionStorage.getItem("price1"));//价格
      this.weixinchushiData();


      let url=this.$apidomain+"/officialPartnerAccountInfo/findOne";
      this.$http.post(url).then(res=>{
        console.log(res,"初始")
        if(res.data.code === "0000"){
          this.xianshiData = res.data.result;
        }else{
          return this.$queryFun.successAlert.call(this,res.data.error)
        }
      });
      let priceObj2 = {}; //支付宝
      priceObj2.faPayJournalAccountId=""; // 二维码id
      priceObj2.payAmount=JSON.parse(sessionStorage.getItem("price1")); //价格
      priceObj2.paymentChannel=2;
      priceObj2.payType = 2; //1微信//2支付宝
      let priceObj2url=this.$apidomain+"/officialpartnerpay/recharge";
      this.$http.post(priceObj2url,priceObj2).then(res=>{
        console.log(res)
        if(res.data.code === "0000"){
          this.zhifubao2 =res.data.result;
        }else{
          alert(res.data.res)
        }
      })
      this.fangshi.forEach((item,index)=>{
             this.tabClick(item,0);
      })


    }
  }
</script>

<style scoped lang="scss">
  .footer{
    width: 100%;
    height: 70%;

    #list{
      width:100%;
      height:42px ;
      border: 1px solid #d1dbe5;
      background: #f3f3f3;
      border-bottom: none;
      li{
        float: left;
        border-right: 1px solid #d1dbe5;
        border-bottom: 1px solid #d1dbe5;
        padding: 0 16px;
        height:42px;
        box-sizing:border-box;
        line-height:42px;
        display:inline-block;
        list-style:none;
        font-size:14px;
        color:#8391a5;
        position:relative;
        font-family: MicrosoftYaHei;
      }
      li.active{
        font-family: MicrosoftYaHei;
        border-bottom: 0;
        background: #FFFFFF;
        color:#20a0ff;
      }
    }
  }

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
  .content{
    padding-top:1.5em;
    ul{
      padding: 0 20px 20px 20px;
      li{
        height:40px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(94,109,130,1);
        line-height:40px;
        span{
          margin-left: 40px;
        }
        .chongzhi{
          margin-left: 10%;
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





