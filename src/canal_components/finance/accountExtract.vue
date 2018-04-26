<template>
  <!-- 提现 -->
  <div id="app">
    <section class="container">
      <span class="price_name">账户可提现余额（元）</span> &nbsp;&nbsp;&nbsp;
      <span class="price_sum">3,230.00</span> <br>
      <div class="account">
        <div class="title">提现到此银行账号</div>
        <div class="content">
          <p>中国建设银行（华侨城支行）</p> <br>
          <span>
            尾号2000
          </span>
        </div>
      </div>
      <br>
      <span class="list_name">提现金额</span> <el-input style="width:300px;" placeholder="请输入充值金额"></el-input>
    </section>

    <el-button type="primary" @click="enter">确认提现</el-button>

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

      }
    },
    methods: {
      enter(){
        this.$store.commit("closeIsOpen")
      }
    },
    created() {
      this.$store.commit("changeAccountAlertData",{title:"提现"})
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


