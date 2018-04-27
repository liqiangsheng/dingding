<template>
  <!--余额不足creditIsRunningLow-->
  <div>
    <div class="creditIsRunningLow"><!--背阴-->
      </div>
      <div class="creditIsRunningLow_box">
          <div class="el-message-box__title">
            <span>充值</span>
            <i class="el-message-box__close el-icon-close" @click="close"></i>
        </div>
        <div class="center">
               <p><img src="/static/images/tanchuangDENG.png"></p>
               <p>您的账户余额不足，导致无法下单，请及时充</p>
               <p>您需要支付的工单金额为{{yujifei}}元，请正确选择充值金额，充值金额将预存到您的账户上。</p>
        </div>
        <div class="footer">
               <p>请选择充值金额</p>
          <ul>
            <li v-for="(item,index) in price3" > <el-button :class="{active:ActiveIndex==index}" :plain="true"     :disabled="item.disabled" @click="priceClick(item,index)">{{item.num}}元</el-button></li>
          </ul>
           <div><el-button type="primary" @click="OKClick">确定</el-button></div>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:["yujifei"],
    components:{
    },
    data() {
      return {
        price:[1,200,300,500,1000,2000,5000],
        price3:[{
          disabled:false,
          num:1},{
          disabled:false,
          num:200},{
          disabled:false,
          num:300},{
          disabled:false,
          num:500},{
          disabled:false,
          num:1000},{
          disabled:false,
          num:2000},{
          disabled:false,
          num:5000}],
        price2:[],
        ActiveIndex:0, //class下标
        disabled:false,
        a:250,
        chushiId:[], //渠道信息
        qudaoNaem:"",//渠道名字
        chongzhiPrice:"", //充值金额
        zhifuData:{}, //支付对象
       }

    },
    methods: {
      close(){ //传值给父级
        this.$emit("isClose",false)
      },
      priceClick(v,i){ //点击价格
        this.ActiveIndex = i;
        this.chongzhiPrice = v.num;
        sessionStorage.setItem("price1",JSON.stringify(v.num))

      },
      OKClick(){ // 确定按钮

        let priceObj = {};
        priceObj.faPayJournalAccountId="";
        priceObj.payAmount=this.chongzhiPrice; //价格
        priceObj.paymentChannel=2;
        priceObj.payType = 1; //1微信//2支付宝
        //        http://admin.test.dingdingkuaixiu.com/officialpartnerpay/recharge
        let url=this.$apidomain+"/officialpartnerpay/recharge"
        this.$http.post(url,priceObj).then(res=>{
          this.zhifuData=res.data.result;
//          window.sessionStorage.removeItem("price");
          sessionStorage.setItem("zhifuData",JSON.stringify(this.zhifuData))

          this.close();
          this.$emit("isBool",true)
        })
        this.$store.commit("zhifuDataObj",this.zhifuData);
      },


    },
    mounted() {
    },
    created(){
      //子渠道
      this.chushiId = JSON.parse(sessionStorage.getItem("userInfo"));
      this.qudaoNaem = this.chushiId[0].fullName;
      this.price3.forEach((v,i)=>{
        if(this.yujifei+0.1 > v.num){
          v.disabled = true;
          this.ActiveIndex =i+1;
          this.chongzhiPrice = this.price3[i+1].num;
//          this.priceClick(v.num,i+1);
          sessionStorage.setItem("price1",JSON.stringify(this.price3[i+1].num))
        }
      })

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
    width: 50%;
    height: 70%;
    background-color: #fff;
    position: absolute;
    left: 25%;
    top:16%;
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
    height: 50%;
    p{
      width: 100%;
      text-align: center;
    }
    p:nth-child(2){
      font-size:20px;
      height: 60px;
      font-family:PingFangSC-Regular;
      color:rgba(230,88,49,1);
      line-height: 60px;
    }
    p:nth-child(3){
      padding: 0 20%;
      height:48px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      color:rgba(136,136,136,1);
      line-height:24px;
    }
  }
  .footer{
    width: 100%;
    height: 50%;
    padding: 0 10%;
    p{
      width:100%;
      height:25px;
      font-size:18px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:25px;
      text-align: center;
    }
    ul{
      width: 100%;
       overflow: hidden;
      li{
        width: 20%;
        float: left;
        margin-right: 6.5%;
        /*background:rgba(234,84,19,1);*/
        /*color:rgba(136,136,136,1);*/
        /*color:rgba(255,255,255,1);*/
        /*background:rgba(216,216,216,1);*/
        border-radius: 4px ;
        margin-top: 5%;
        .el-button{
          width: 100%;
          height: 50px;
          line-height: 36px;
          border: 1px solid #EA5413;
        }
        .el-button.active{
          color:rgba(255,255,255,1);
          background:rgba(234,84,19,1)
        }
      }
      li:nth-child(4n){
        margin-right: 0;
      }

    }
    div{
      width: 100%;
      height: 36px;
      margin-top: 40px;
      text-align: center;
      .el-button{
        width: 30%;
      }
    }
  }

</style>








