<template>
  <div id="app">
    <div class="container" v-if="!isDetaileds.isShow">
      <div class="user_sum">
        <user-sum class="sum" :suerSum="item" v-for="(item,index) in userSum" :key="index"></user-sum>
        <button class="cash" @click="cash">提现</button>
      </div>
      <div class="user_sum" style="height: 0">
        <user-sum style="line-height: 4em;" class="sum" :suerSum="item" v-for="(item,index) in userSum2" :key="index"></user-sum>

      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div >
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">选择日期区间：</span>
          <el-date-picker
            v-model="timeQuantum"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="pickerOptions2"
            @change="quiry(true)">
          </el-date-picker>
          <el-button style="margin-left:20%;" @click="details"   v-show="$isButtonObj('bn-finance-property-record')">查看平台资金流水</el-button>
        </div>

        <div  style="width:50%;float:left">
          <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        </div>
      </div>
    </div>
    <!--大弹框 详情-->
    <!--<div class="alert" v-if="isDetailed.isShow">-->

    <!--</div>-->

    <div class="container" v-if="isDetaileds.isShow">
      <detail :isDetaileds="isDetaileds">

      </detail>
    </div>

    <cash :isCash="isCash"></cash>
  </div>
</template>
<script>
  import detail from "./property2.vue"
  import userSum from "../../user/userSum"
  import cash from './cash.vue'
  export default {
    components:{
      detail,
      userSum,
      cash
    },
    data() {
      return {
        yyf:"",
        //<!--弹窗基础数据start-->
        isDetaileds:{
          title:"工单统计详情",
          isShow:false
        },
        isCash:{
          title:"提现",
          isShow:false
        },
        //<!--弹窗基础数据end-->
        //<!--顶部数据模板start-->
        userSum:[
          {
            color:"green",
            sum:"0",
            name:"本期平台收入",
            sName:"元"
          },{
            color:"green",
            sum:"0",
            name:"本年平台收入",
            sName:"元"
          },{
            color:"green",
            sum:"0",
            sName:"元",
            name:"平台总收入"
          },{
            color:"green",
            sum:"0",
            name:"保证金金额",
            sName:"元"
          },
        ],
        userSum2:[
          {
            sum:"0",
            color:"blue",
            name:"昨日净增",
            sName:"元"
          },{
            color:"green",
            sum:"0",
            name:"昨日收入",
            sName:"元"
          },{
            color:"green",
            sum:"0",
            name:"昨日支出",
            sName:"元"
          }
        ],
        //<!--顶部数据模板end-->
        //画图数据start
        timeQuantum:[],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 8);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 31);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        statisticsDateStartStr:"",
        statisticsDateEndStr:"",
        chartData:{
          columns: ['日期','收入','支出','净增额'],
          rows: [],
        },
        chartSettings:{
          area: true
        },
        chartData2:{
          columns: ['日期', '营收'],
          rows: [],
        },
        //画图数据end
      }
    },
    created(){
      var _this=this;
      let url=this.$apidomain+"/statisticsSystemIncomeAndExpenses/countRevenueList";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.userSum.forEach((v)=>{
          if("本期平台收入"==v.name){
            v.sum = data.result.RevenueCurrent;
          }else if("本年平台收入"==v.name){
            v.sum = data.result.RevenueThisYear;
          }else if("平台总收入"==v.name){
            v.sum = data.result.RevenueAll;
          }else if("保证金金额"==v.name){
            v.sum = data.result.Bond;
          }else if("可用平台运营费"==v.name){
            v.sum = data.result.OperatingExpensesYesterday;
            _this.yyf=data.result.OperatingExpensesYesterday;
          }
        });
        this.userSum2.forEach((v)=>{
          if("昨日净增"==v.name){
            v.sum = data.result.IncreaseYesterday;
          }else if("昨日收入"==v.name){
            v.sum = data.result.RevenueYesterday;
          }else if("昨日支出"==v.name){
            v.sum = data.result.ExpenditureYesterday;
          }
        });
      })
      this.quiry(false);
    },
    methods: {

      cash(){
        this.isCash.isShow=true;
        if(this.yyf){
          this.isCash.yyf=this.yyf;
        }else{
          this.isCash.yyf=0
        }
      },
//      <!--分页查询数据对象功能组合start-->
      quiry(isTime){
        if(isTime){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }
        let url=this.$apidomain+"/statisticsSystemIncomeAndExpenses/findList";
        this.$http.get(url,this.paramsData()).then(r=>{
          let data=r.data;
          this.chartData.rows=[];
          data.result.forEach((v)=>{
            let dateStr = this.$moment(v.statisticsDate).format('MM月DD日');
            this.chartData.rows.push({'日期':dateStr,'收入':v.revenue,'支出':v.expend,'净增额':v.netIncrease});
          });
        });
      },
      paramsData(){
        return {params: {
          "statisticsDateStartStr":this.statisticsDateStartStr,
          "statisticsDateEndStr":this.statisticsDateEndStr,
          "orderByClause":" statistics_date asc "
        }}
      },
//      <!--分页查询数据对象功能组合end-->
//      <!--弹窗功能start-->
      details(){

        this.isDetaileds.isShow=true;
//        this.isDetailed.isShow=true;
      },
//      <!--弹窗功能end-->
    },
    mounted() {
    },
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/styles/comminStyle2";
  .confirm_btn{
    margin-left:50%;
    transform:translateX(-50%);
  }
  .alert_forbidden_text{
    list-style: none;
    >li{
      line-height: 3em;
      border-top:1px solid rgba(0,0,0,.1);
    }
    >li:first-of-type{
      border:none;
    }
    span{
      width:10px;
      /*float:right;*/
      margin-left:20px;
      height:10px;
      display: inline-block;
      background:green;
      border-radius: 50%;
    }
  }

  .alert_forbidden_area{
    width:100%;
    height:60px;
    border:1px solid #c0c0c0;
  }
  .top_nav{
    font-size:14px;
    width:100%;
    .user_type{
      padding:10px 60px;
      background: #EBDDF6;
      color:#000;
      cursor:pointer;
    }
    .selector{
      background: #A470CD;
      color:#fff;
      font-size:14px;
    }
  }

  #city{
    line-height:40px;
  }
  .el-button--text{
    color:#000;
  }
  .el-button--large{
    width:120px;
  }
  .el-dialog__wrapper{
    z-index: 999999;
  }
  .cash{
    width: 100px;
    height: 30px;
    border: none;
    outline-style: none;
    cursor: pointer;
    z-index: 999999;
  }
</style>


