<template>
    <div id="app">
      <section class="container">
          <span class="price_name">账户可{{recharge?'':rechargeText}}用余额（元）</span> &nbsp;&nbsp;&nbsp;
          <span class="price_sum">{{!!creditCardMessage.canWithdrawDepositAmount?creditCardMessage.canWithdrawDepositAmount.toFixed(2):0.00}}</span>
<!--提现 start -->
        <div class="account" v-if="!recharge" >
          <div class="title">{{creditCardMessage.title}}</div>
          <div class="content">
            <p>{{creditCardMessage.bankCardBranch}}</p> <br>
            <span>
          </span>
            尾号 {{creditCardMessage.bankCard}}
          </div>
        </div>
 <!--提现 end -->
        <br>
        <span class="list_name">{{rechargeText}}金额</span>
        <el-input style="width:300px;" v-model.trim="money" type="number"
                  :placeholder="'请输入'+rechargeText+'金额'"></el-input>
      </section>
      <el-button type="primary" @click="enter(money)">确认{{rechargeText}}</el-button>

      <account-alert  v-if="$store.state.accountOverviewAlertData.isShow"></account-alert>

    </div>
</template>
<script>
  import accountAlert from "./components/accountAlert"
    export default {
    components:{
      accountAlert
    },
        data() {
            return {
              money:"",
              balance:"",
              creditCardMessage:this.$store.state.creditCardMessage
            }
        },
        methods: {
          enter(money){
            if(!money){
              return this.$queryFun.successAlert.call(this,`请输入${this.rechargeText}金额`)
            }else if(money=="0"){
              return this.$queryFun.successAlert.call(this,`${this.rechargeText}金额不得小于1`)
            }else if(this.recharge){
              this.$store.commit("changeAccountAlertData",{
                title:this.rechargeText,
                money,
                wechatOrderId:'',
                alipayOrderId:'',
                alipayWeborderId:'',
                withdraw:false,
                image:"rechar_success",         //成功的icon
                successTitle:"恭喜充值成功！",
                successDescribe:"具体到账时间以银行收款时间为准"
              });
              this.$store.commit("closeIsOpen")
            }else{
              const url =`${this.$common.apidomain}/officialpartnerpay/putforward`;
              this.$http.post(url,{payAmount:money}).then( res => {
                const data=res.data;
                if(data.code==="0000"){
                  this.$store.commit("pushCreditCardMessage",{balance:data.result})
                  this.$store.commit("closeIsOpen")
                }else{
                  this.$queryFun.successAlert.call(this,data.error);
                }
              });
              this.$store.commit("changeAccountAlertData",{
                title:this.rechargeText,
                image:"rechar_wait",
                withdraw:true,
                successTitle:"您的提现申请正在审核中",
                successDescribe:"您于2018/02/11 12:11:00 提交的提现申请已在审核中，1-3个工作日将会返回到您的充值账号中。具体以银行到账时间为准"
              });
            }
          }
        },
        computed:{

          recharge(){
            return this.$route.params.state==="1"?true:false;
          },
          rechargeText (){
             return this.recharge?"充值":"提现";
          },
        },
        created() {
          if(JSON.stringify(this.creditCardMessage)==="{}"){
            const url = `${this.$common.apidomain}/officialPartnerAccountInfo/findOne`
            this.$http.post(url).then(res=>{
              const data= res.data;
              if(data.code==="0000"){
                for(let k in data.result){
                  this.$set(this.creditCardMessage,k,data.result[k]);
                }
                this.$store.commit("pushCreditCardMessage",data.result);

              }else{
                this.$queryFun.successAlert.call(this,data.error);
              }
            })
          }
        }
    }
</script>
<style scoped lang="scss">
  div,p,span,a{
    font-family:PingFangSC-Regular;
  }
  #app{
    width:100%;
    min-height:87vh;
    font-size:62.5%;
    .container{
      padding-top:80px;
      margin-left:50px;
      .price_name{
        font-size:18px;
        line-height: 5em;
      }
      .price_sum{
        color:#EA5413;
        font-size: 26px;
      }
    }
    .list_name{
      text-align: left;
      width:7em;
      font-size:18px;
    }
    button{
      transform:translate(12.8em,2em);
      padding-left:3.2em;
      padding-right:3.2em;

    }
  }
  .account{
    width:436px;
    border:1px solid #C0CCDA;

    .title{
      line-height: 36px;
      color:rgba(94,109,130,1);
      font-size: 14px;
      padding:0 10px;
      background:#E0E6ED;

    }
    .content{

      padding:19px 10px;
      p{
        display: block;
        width:100%;
        margin-bottom:.5em;
        font-size:18px;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1)
      }
      span{
        font-size:16px;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
      }
    }
  }
</style>


