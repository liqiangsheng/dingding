<template>
    <div id="app">
      <div>
        <div id="detailAlert"><!--背阴-->
        </div>
        <div id="detailAlert_box">
          <div class="el-message-box__title">
            <span>充值</span>
            <i class="el-message-box__close el-icon-close" @click="data.isShow=false"></i>
          </div>
          <section class="content">
              <ul>
                <li>
                  <div class="list_name">
                    充值账号
                  </div>
                    金业地产
                </li>
                <li>
                  <div class="list_name">
                    当前余额
                  </div>
                    0.00元
                </li>
                <li>
                  <div class="list_name">
                    充值金额
                  </div>
                  <span class="money">
                      1,600.00元
                  </span>
                  <span class="revise"> 修改充值金额</span>
                </li>
              </ul>
          </section>

          <section id="el-tabs">
            <el-tabs type="border-card">

              <el-tab-pane label="微信扫码充值">
                <wechat-scavenging :type="'wechat'"></wechat-scavenging>
              </el-tab-pane>

              <el-tab-pane label="支付宝扫码充值">
                <wechat-scavenging :type="'alipay'"></wechat-scavenging>
              </el-tab-pane>

              <el-tab-pane label="线下转账充值">
                <transfer-accounts></transfer-accounts>
              </el-tab-pane>

            </el-tabs>
          </section>
        </div>
      </div>
    </div>
</template>
<script>
  import wechatScavenging from "./wechatScavenging"
  import transferAccounts from "./transferAccounts"
    export default {
    components:{
      wechatScavenging,
      transferAccounts
    },
      props:["data"],
        data() {
            return {

            }
        },
        methods: {
          close(){

          }
        },
        created() {

        }
    }
</script>

<style scoped lang="scss">
  /*@import "../../../assets/styles/ch_alert.scss";*/
  p,div,ul,li,span,h3{
    font-family:PingFangSC-Regular;
  }
  #detailAlert{
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
  #detailAlert_box{
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
  .el-message-box__title{
    width: 100%;
    height:7%;
    position: relative;
    background:rgba(243,243,243,1);
    .el-message-box__close{
      position: absolute;
      right: 14px;
      top:14px;
    }
    span{
      width: 100%;
      display: inline-block;
      height:14px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:48px;
      text-align: center;
    }
  }
  #app{
    font-size: 62.5%;
    .list_name{
      width:7em;
      margin-right:2em;
      color:#5E6D82;
    }
    .content{
      padding-top:1.5em;
      >ul{
        >li{
          font-size:14px;
          line-height: 3em;
          .money{
            color:#E65831;
            font-size:20px;
            font-family:PingFangSC-Regular;
          }
          .revise{
            color:#20A0FF;
            transform:translateX(60%);
            display: inline-block;
            font-size:14px;
          }
        }
      }
    }

  }

</style>
<style lang="scss">
  #el-tabs{
    >.el-tabs--border-card{
      > .el-tabs__header{
        > .el-tabs__nav-wrap{
          >.el-tabs__nav-scroll {
            >.el-tabs__nav{
              >.el-tabs__item.is-active{
                color:#000;
              }
            }
          }
        }
      }
    }
  }
</style>


