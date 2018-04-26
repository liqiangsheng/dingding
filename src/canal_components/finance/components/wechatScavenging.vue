<template>
    <div>
      <section class="assist">
        <p>支付遇到问题？</p>
      </section>
      <section class="alipay" v-if="type==='alipay'">
        <el-button class="webPay" @click="webPay"></el-button>
      </section>
      <section class="center">
        <p> {{type==='alipay'?'支付宝扫码支付':'推荐微信扫码支付'}} </p>
        <img :src="createCodeUrl" alt="">
        <el-button type="primary"> 我已成功支付</el-button>
      </section>
    </div>
</template>
<script>
    export default {
        props:["type","createCodeUrl"],
        data() {
            return {

            }
        },
        methods: {
          webPay(){
            const url=`${this.$common.apidomain}/officialpartnerpay/rechargeWeb?paymentChannel=3&payType=2&openId=1&token=${this.$getLocalStorage("enrolleeinfo")[0].token}&payAmount=${this.$store.state.accountOverviewAlertData.money}`;
            window.open(url)
          },
        },
      computed:{

      },
      watch:{

      },
        created() {


        }
    }
</script>
<style scoped lang="scss">
  p,div,span{
    font-family:PingFangSC-Regular;
  }
    .assist{
      >p{
        display: block;
        width:100%;
        text-align: right;
        color:#20A0FF;
        font-size:14px;
        padding-right:3em;
      }
    }
  .center{
    display: flex;
    min-width: 162px;
    width: 162px;
    margin:auto;
    text-align: center;
    justify-content: center;
    /*align-items: center;*/
    flex-wrap: wrap;
    >p{
      width:100%;
      line-height: 3.5em;
    }
    >img{
      width:100%;
      border:1px solid #ccc;
      height:172px;
      margin-bottom:3em;
    }
  }
  .alipay{
    position:absolute;
    top:50%;
    left:50%;
    transform :translate(110%,-50%);

    >.webPay{
      width:140px;
      background:url(../../../assets/images/webPay.png) center center no-repeat;
      background-size:100% 100%;
      height:40px;
    }
  }
</style>


