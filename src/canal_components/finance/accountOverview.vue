<template>
    <div id="app" >
      <nav class="nav_container">
        <div class="data_list">
            <p>可用余额（元）</p>
            <p class="sum">0.00</p>
          <div class="button_container">
          <el-button @click="recharge" type="primary">充值</el-button>
          <el-button >提现</el-button>
          </div>
        </div>
        <div class="data_list">
            <div class="data_list_item">
               <p>提成收入（元） <span>截止到昨天</span></p>
                <p class="sum">0.00</p>
              <div class="button_container">
                <a href="###">查看收入明细>></a>
              </div>
            </div>
          <div class="data_list_item">
               <p>待结款金额（元） <span>不含未出账</span></p>
                <p class="sum">0.00</p>
              <div class="button_container">
                <a href="###">查看账单记录>></a>
              </div>
            </div>

        </div>
      </nav>
<!---->
      <section class="nav_title" >
          <span>最近交易明细</span>
          <a style="color:#20A0FF" href="##">查看更多>></a>
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
              {{item.id}}
            </td>
            <td>
              {{item.name}}
            </td>
            <td>
              {{item.details}}
            </td>
            <td>
              {{item.userNumber}}
            </td>
            <td>
              {{item.totalOutput}}
            </td>
            <td>
              {{item.completeCount||0}}
            </td>
            <td>
              {{item.totalWater}}
            </td>

          </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
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

              tableListData:[],          //表格数据
            }

        },
        methods: {
          recharge(){
            this.$router.push({path:"/finance/accountRecharge"})
          },
          quiry(){
            this.getTableList(this.paramsData(this.params));
          },
          paramsData(channel=""){
            return {params: {
              "officialPartnerId":this.$getLocalStorage("enrolleeinfo")[0].id,
              "id":channel.channel
            }}
          },
          getTableList(params){
            let url=this.$apidomain+"/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo";
            this.$http.get(url,params).then(r=>{
              let data=r.data;
              this.tableListData = data.result;

              this.showPages = data.result.pageNo;
              this.currentPageSize = data.result.pageSize;
              this.total = data.result.total;
              this.pageTotal = data.result.pageTotal;
            })
          },
        },
        created() {
          this.quiry()
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
        margin-right:15px;
        /*background: yellow;*/
      }
      >.data_list:last-of-type{
        flex:1;
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
        }
      }

    }
  }

</style>


