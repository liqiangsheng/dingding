<template>
  <div>
        <section class="content">
          <ul>
            <li v-for="(item,index) in listItem">

              <div class="list_name">

                {{item.name}}

              </div>

              {{item.value}}

              <span class="revise cursor"  @click="$store.commit('closeIsOpen')" v-if="item.revise">{{item.revise}}</span>
            </li>
          </ul>
        </section>
        <section id="el-tabs">
          <el-tabs type="border-card" @tab-click="tabClick">

            <el-tab-pane label="微信扫码充值">
              <wechat-scavenging :createCodeUrl="createCodeUrl" :type="'wechat'"></wechat-scavenging>
            </el-tab-pane>

            <el-tab-pane label="支付宝扫码充值">
              <wechat-scavenging :createCodeUrl="createCodeUrl" :type="'alipay'"></wechat-scavenging>
            </el-tab-pane>
            <el-tab-pane label="线下转账充值">
              <transfer-accounts :parentData="parentData"></transfer-accounts>
            </el-tab-pane>
          </el-tabs>
        </section>
      </div>
</template>
<script>
  import wechatScavenging from "./wechatScavenging"
  import transferAccounts from "./transferAccounts"
  import {Init} from "./js/index"
  export default {
    props:["parentData"],
    components:{
      wechatScavenging,
      transferAccounts
    },
    data() {
      return {
        createCodeUrl:"",
        listItem:[
          {
            name:'充值账号',
            value:"金业地产",
          }, {
            name:'当前余额',
            value:"0.00元",
          }, {
            name:' 充值金额',
            value:`${(this.$store.state.accountOverviewAlertData.money-0).toFixed(2)}元`,
            revise:"修改充值金额"
          },
        ]
      }
    },
    methods: {
      tabClick(eve){
        let type=JSON.stringify(parseInt(eve.index)+1),
            accountData=this.$store.state.accountOverviewAlertData;
            if(type!=="3"){
              const params= {
                payType:type,          //支付方式 1 微信   2 支付宝
                faPayJournalAccountId:type==="1"?accountData.wechatOrderId:accountData.alipayOrderId
              };
              this.parentData.isClear=false;
              this.getData(params)
            }else{
              this.parentData.isClear=true;
            }

      },
      close(){

      },
      getData(param){
        const url = `${this.$common.apidomain}/officialpartnerpay/recharge`,
              params={
                paymentChannel: "2",
                payAmount: this.$store.state.accountOverviewAlertData.money,
              };

        Object.assign(params,param);
        this.$http.post(url,params).then(res=>{
          let data=res.data;
          if(data.code==="0000"){
            let orderIdObj = params.payType==="1"?{wechatOrderId:data.result.faPayJournalAccountId}:{alipayOrderId:data.result.faPayJournalAccountId}
                this.createCodeUrl = data.result.createCodeUrl;
                this.$store.commit("changeAccountAlertData",orderIdObj);
                let url=`${this.$common.apidomain}/officialpartnercostflowController/findOne`;
                new Init({url,id:data.result.officialPartnerCostFlowId}).timeoutGet(this);
          }else{
            this.$queryFun.successAlert.call(this,data.error);
          }
        });
      }
    },
    created() {
        //支付方式 1 微信   2 支付宝

      this.getData({payType:"1",faPayJournalAccountId:this.$store.state.accountOverviewAlertData.wechatOrderId})

        ///officialpartnerpay/rechargeWeb   //支付宝网页
        ////officialpartnerpay/recharge    //二维码

    }
  }
</script>

<style scoped lang="scss">
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
#el-tabs{
  padding:10px;
  /*border:none;*/
}
</style>
<style lang="scss">
  #el-tabs{
    >.el-tabs--border-card{
      border:none;
      box-shadow: none;
      > .el-tabs__header{
        > .el-tabs__nav-wrap{
          >.el-tabs__nav-scroll {

            border:1px solid #C0CCDA;
            border-bottom:none;
            border-radius: 3px;
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



