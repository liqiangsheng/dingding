<template>
    <div>
      <section class="assist">
        <p>支付遇到问题？</p>
      </section>
      <section class="alipay" v-if="type==='alipay'">
        <el-button>切换至网页版</el-button>
      </section>
      <section class="center">
        <p> {{type==='alipay'?'支付宝扫码支付':'推荐微信扫码支付'}} </p>
        <img src="../../../assets/logo.png" alt="">
        <el-button type="primary"> 我已成功支付</el-button>
      </section>
    </div>
</template>
<script>
    export default {
        props:["type"],
        data() {
            return {

            }
        },
        methods: {

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
    transform :translate(120%,-50%);
    >button{
      border:1px solid #20A0FF;
      color:#20A0FF;
    }
  }
</style>


