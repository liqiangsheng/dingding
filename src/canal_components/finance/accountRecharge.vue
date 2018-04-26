<template>
    <div id="app">
      <section class="container">
          <span class="price_name">账户可用余额（元）</span> &nbsp;&nbsp;&nbsp;
          <span class="price_sum">3,230.00</span> <br>
          <span class="list_name">充值金额</span> <el-input style="width:300px;"   v-model="money" type="number" placeholder="请输入充值金额"></el-input>
      </section>
      <el-button type="primary" @click="enter(money)">确认充值</el-button>

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
              money:""
            }
        },
        methods: {
          enter(money){
            if(!money){
              return this.$queryFun.successAlert.call(this,"请输入充值金额")
            }else if(money=="0"){
              return this.$queryFun.successAlert.call(this,"充值金额不得小于1")
            }
            this.$store.commit("changeAccountAlertData",{
              title:"充值",
              money,
              wechatOrderId:'',
              alipayOrderId:'',
              alipayWeborderId:'',
              image:"rechar_success",         //成功的icon
              successTitle:"恭喜充值成功！",
              successDescribe:"具体到账时间以银行收款时间为准"
            });
            this.$store.commit("closeIsOpen")
          }
        },
        created() {
//
          this.$store.commit("changeAccountAlertData",{title:"充值"});

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
</style>


