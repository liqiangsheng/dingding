<template>
    <div id="app">
      <section class="container">
          <span class="price_name">账户可用余额（元）</span> &nbsp;&nbsp;&nbsp;
          <span class="price_sum">3,230.00</span> <br>
          <span class="list_name">充值金额</span> <el-input style="width:300px;" placeholder="请输入充值金额"></el-input>
      </section>
      <el-button type="primary" @click="enter">确认充值</el-button>
      <account-alert :data="alertData" v-if="alertData.isShow"></account-alert>
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
              alertData:{isShow:false}
            }
        },
        methods: {
          enter(){
            this.alertData.isShow=!this.alertData.isShow
          }
        },
        created() {

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


