<template>
    <div id="app" >
      <nav class="nav_container">
        <div class="data_list">
            <p>可用余额（元）</p>
            <p class="sum">{{creditCardMessage.canWithdrawDepositAmount}}</p>
          <div class="button_container">
              <el-button @click="recharge('1')" type="primary">充值</el-button>
              <el-button @click="recharge('0')">提现</el-button>
          </div>
        </div>
        <div class="data_list">
            <div class="data_list_item">
               <p>提成收入（元） <span>截止到昨天</span></p>
                <p class="sum">{{findExtractTotal.toFixed(2)}}</p>
              <div class="button_container">
                <a href="javescript:;" @click="extract">查看收入明细>></a>
              </div>
            </div>
          <div class="data_list_item">
               <p>待结款金额（元） <span>不含未出账</span></p>
                <p class="sum">{{findPendingTotal.toFixed(2)}}</p>
              <div class="button_container">
                <a href="javescript:;" @click="billDetail">查看账单记录>></a>
              </div>
            </div>
        </div>
      </nav>

<!---->
      <section class="nav_title">
          <span>最近交易明细</span>
          <a style="color:#20A0FF" href="javascript:;" @click="examineMore">查看更多>></a>
      </section>
      <div class="dable_lsit table">
        <!--导出-->
        <table cellSpacing="0px" cellpadding="0">
          <thead >
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.journalAccountNum}}
            </td>
            <td>
              {{item.payType |payType}}
            </td>
            <td>
              {{item.operationFee}}
            </td>
            <td>
              {{item.remark||'无'}}
            </td>
            <td>
              {{item.paySource | channelPaySourceShow}}
            </td>
            <td>
              {{item.createTime}}
            </td>
            <td>
              {{item.payState|payState}}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>
<script>

  const isPushPath = (tabPathList,path) => !tabPathList.some( v => v.path === path),
        filterNavTabers = function (path,name) {
            if(isPushPath(this.$store.state.tabPathList, path)) this.$store.commit("pushTabPathList",{path, name,});
            this.$router.push({path});
        };

  export default {
        data() {
            return {
              valu:"",
              positionList:[],
              creditCardMessage:this.$store.state.creditCardMessage,
              findPendingTotal:0,
              //查询的date    数据  end
              theadsName:[
                '序号',
                '流水号',
                '交易类型',
                '交易金额（元）',
                '费用说明',
                '支付方式',
                '交易时间',
                '交易状态'
              ],
              findExtractTotal:0,
              tableListData:[],          //表格数据
            }

        },
    //  /finance/commission/commissionSettlementDetails 提成明细
//    \\/finance/bill/billSettlementDetails   账单结算明细
        methods: {
          billDetail(){
            const {path,name} = {path:`/finance/bill/billSettlementDetails`,name:"账单结算明细"};
            filterNavTabers.call(this,path,name)
          },
          extract(){
            const {path,name} = {path:`/finance/commission/commissionSettlementDetails`,name:"提成结算明细"};
                  filterNavTabers.call(this,path,name)
          },
          examineMore(){
              const {path,name}= {path:`/finance/transactionDetail`, name:"交易明细" };
                   filterNavTabers.call(this,path,name)
          },
          recharge(state){
           let {path,name}={path:`/finance/accountRecharge/${state}`,name:!!parseInt(state)?"充值":"提现"};
                filterNavTabers.call(this,path,name)
          },
          getTableList(){
            let url=`${this.$apidomain}/officialpartnercostflowController/all`;
            this.$http.post( url ,{ page:1, rows:20 }).then( r => this.getFilter(r.data).then( res => this.tableListData = res.list ))
          },
          getFilter (res) {
           return new Promise((resolve, reject) => {
              if(res.code==="0000"){
                resolve(res.result)
              }else{
                reject(res);
                this.$queryFun.successAlert.call(this,res.error);
              }
            });
          }
        },
        created() {

          const getFilterData= data => {

                if(data.code==="0000"){
                  return data.result;
                }else{
                  this.$queryFun.successAlert.call(this,data.error);
                  return 0;
                }
          },findPendingTotalUrl = `${this.$common.apidomain}/officialPartnerAccountInfo/findPendingTotal`;

          this.getTableList();
          const url = `${this.$common.apidomain}/officialPartnerAccountInfo/findOne`,
                _url = `${this.$common.apidomain}/officialPartnerAccountInfo/findExtractTotal`;

          this.$http.post(url).then(res => this.getFilter(res.data).then(res=>{
            for(let k in res ){ this.$set(this.creditCardMessage,k,res[k] ) }
            this.$store.commit("pushCreditCardMessage",res);
          }) );

          this.$http.post( findPendingTotalUrl ).then( res => this.findPendingTotal = getFilterData(res.data)-0 )

          this.$http.post(_url).then( res => this.findExtractTotal = getFilterData(res.data) );

        }
    }
</script>
<style scoped lang="scss">
  @import "../../assets/styles/comminStyle";
  @import "../../assets/styles/Ch_comminStyle";
  p,div,nav,h3,h4,span{
    font-family:PingFangSC-Regular;
  }
  #app{
    font-size:62.5%;
    >.nav_container{
      margin-top:30px;
      margin-bottom:5.3em;
      width:100%;
      height:146px;
      display: flex;
      padding:0 3.7em 0 2.8em;
      >.data_list{
        height:100%;
        /*background:red;*/
        border:1px solid #C0CCDA;
        position:relative;
        >p{
          display: block;
          width:100%;
          font-size: 2em;
          text-align: center;
          line-height: 4.7em;
        }
        >.sum{
          font-size: 2.6em;
          line-height:.4em;
        }
        >.button_container{
          width:100%;
          padding:0 23px;
          /*margin-top:90px;*/
          display: flex;
          position:absolute;
          bottom:1em;
          button{
            flex:1;
          }
          button:last-of-type{
            margin-left:1.6em;
          }
        }
      }
      > .data_list:first-of-type{
        width:340px;
        min-width:320px;
        margin-right:15px;
        /*background: yellow;*/
      }
      >.data_list:last-of-type{
        flex:1;
        min-width: 411px;
        display: flex;
        >.data_list_item{
          flex:1;
          >p{
            display: block;
            width:100%;
            font-size: 2em;
            text-align: center;
            line-height: 4.7em;
            span{
              color:#888888;
              font-size: .6em;
            }
          }
          .sum{
            font-size: 2.6em;
            line-height:.5em;
          }
          .button_container{
            font-size: 1.8em;
            text-align: center;
            line-height: 5em;
            >a{
              color:#20A0FF;
            }

          }
        }
        >.data_list_item:last-of-type{
          position:relative;
          &::after{
            content:"";
            width:1px;
            height:60%;
            background:#C0CCDA;
            position:absolute;
            left:0;
            top:50%;
            transform:translateY(-50%);
          }
        }
      }
    }
    .nav_title{
      font-size:2em;
      line-height: 1em;
      border-left:4px solid red;
      /*margin-bottom:2em;*/
      text-indent: .5em;
      margin-left:17px;
      a{
       float: right;
        padding-right:33px;
      }
    }
    .table.dable_lsit {
      margin-top:2em;
      >table{
        tr{
          >td{
            font-size:14px;
            border-left:1px solid #ccc;
          }
          >td:first-of-type{
            border-left:none;
          }
        }
      }
    }
  }

</style>


