<template>
  <div id="app">
    <div class="container" v-if="!isShow()">
      <div class="user_sum">
        <user-sum class="sum" :suerSum="item" v-for="(item,index) in userSum" :key="index"></user-sum>
      </div>
      <br/>
      <br/>
      <br/>
      <div >
        <div  style="width:50%;float:left">
          <div slot="header" class="clearfix">
            每日下单详情
            <span style="line-height: 36px;">选择日期区间：</span>
            <el-date-picker
              v-model="timeQuantum1"
              type="daterange"
              align="right"
              placeholder="选择日期范围"
              :picker-options="pickerOptions2"
              @change="quiry1(true)">
            </el-date-picker>
          </div>
          <el-button v-show="$isButtonObj('bn-operation-data-details')" @click="(function(){isEverydayOrder.isShow=true}())" size="large">更多详情</el-button>
          <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        </div>
        <div style="width:50%;float:left">
          <div slot="header" class="clearfix">
            每日用户详情
            <span style="line-height: 36px;">选择日期区间：</span>
            <el-date-picker
              v-model="timeQuantum2"
              type="daterange"
              align="right"
              placeholder="选择日期范围"
              :picker-options="pickerOptions2"
              @change="quiry2(true)">
            </el-date-picker>
          </div>
          <el-button v-show="$isButtonObj('bn-operation-data-details')" @click="(function(){isUserDetails.isShow=true}())" size="large">更多详情</el-button>
          <ve-line :data="chartData2" :settings="chartSettings"></ve-line>
        </div>
        <div  style="width:50%;float:left">
          <div slot="header" class="clearfix">
            每日渠道详情
            <span style="line-height: 36px;">选择日期区间：</span>
            <el-date-picker
              v-model="timeQuantum3"
              type="daterange"
              align="right"
              placeholder="选择日期范围"
              :picker-options="pickerOptions2"
              @change="quiry3(true)">
            </el-date-picker>
          </div>
          <el-button v-show="$isButtonObj('bn-operation-data-details')" @click="(function(){isCanalDetails.isShow=true}())" size="large">更多详情</el-button>
          <ve-line :data="chartData3" :settings="chartSettings"></ve-line>
        </div>
        <div style="width:50%;float:left">
          <div slot="header" class="clearfix">
            每日品类详情
            <span style="line-height: 36px;">选择日期区间：</span>
            <el-date-picker
              v-model="timeQuantum4"
              type="daterange"
              align="right"
              placeholder="选择日期范围"
              :picker-options="pickerOptions2"
              @change="quiry4(true)">
            </el-date-picker>
          </div>
          <el-button v-show="$isButtonObj('bn-operation-data-details')" @click="(function(){isCategory.isShow=true}())" size="large">更多详情</el-button>
          <ve-line :data="chartData4" :settings="chartSettings"></ve-line>
        </div>
      </div>
    </div>

    <!--渠道详情 start-->
    <canal-details :isCanalDetails="isCanalDetails" v-if="isCanalDetails.isShow"></canal-details>
    <!--渠道详情 end-->

    <!--每日下单详情 start-->
    <order-details :isEverydayOrder="isEverydayOrder" v-if="isEverydayOrder.isShow"></order-details>
    <!--每日下单详情 end-->

    <!--每日用户详情 start-->
    <user-details :isUserDetails="isUserDetails" v-if="isUserDetails.isShow"></user-details>
    <!--每日用户详情 end-->

    <!--品类下单详情 start-->
    <category-details :isCategory="isCategory" v-if="isCategory.isShow"></category-details>
    <!--品类下单详情 end-->
  </div>
</template>
<script>
  import  canalDetails from  "../details/canalDetails"    //渠道详情
  import  orderDetails from  "../details/everydayOrderDetails"    //每日下单详情
  import  userDetails from  "../details/userDetails"    //用户详情
  import  categoryDetails from  "../details/categoryDetails"    //品类详情
  import  userSum from "../../user/userSum"
  export default {
    components:{
      canalDetails,
      orderDetails,
      userDetails,
      categoryDetails,
      userSum
    },
    data() {
      return {

        //<!--顶部数据模板start-->
        userSum:[
          {
            sum:"0", //总用户量
            color:"blue",
            name:"本期新增工单数",
            sName:""
          },{
            color:"green",
            sum:"0", //总用户量
            name:"本期完工工单数",
            sName:"条"
          },{
            color:"green",
            sum:"0/0", //总用户量
            name:"上期工单数（完工/下单）",
            sName:"条"
          },{
            color:"green",
            sum:"0", //总用户量
            sName:"条",
            name:"累计工单数"
          },{
            color:"green",
            sum:"0", //总用户量
            name:"累计完工工单数",
            sName:"单"
          },
        ],
        //<!--顶部数据模板end-->
        //画图数据start
        timeQuantum1:[],
        timeQuantum2:[],
        timeQuantum3:[],
        timeQuantum4:[],
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
        chartSettings:{
          area: true
        },
        chartData:{
          columns: ['日期', '下单量', '下单服务数', '完工数', '完工服务数'],
          rows: [],
        },
        chartData2:{
          columns: ['日期', '注册用户数', '活跃用户数', '下单数', '总用户数'],
          rows: [],
        },
        chartData3:{
          columns: ['日期', '下单量', '下单服务数', '完工数', '完工服务数'],
          rows: [],
        },
        chartData4:{
          columns: ['日期', '下单量', '下单服务数', '完工数', '完工服务数'],
          rows: [],
        },
        //画图数据end
// 详情页面 start
        isCanalDetails:{  //渠道详情
          isShow:false
        },
        isEverydayOrder:{ //每日下单详情
          isShow:false
        },
        isUserDetails:{
          isShow:false
        },
        isCategory:{
          isShow:false
        },
// 详情页面 end
      }
    },
    created(){
      let url=this.$apidomain+"/siteItem/countListBySite";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.userSum.forEach((v)=>{
          if("本期新增工单数"==v.name){
            v.sum = data.result.currentPeriodAddNum;
          }else if("本期完工工单数"==v.name){
            v.sum = data.result.currentPeriodCompleteNum;
          }else if("上期工单数（完工/下单）"==v.name){
            v.sum = data.result.lastCurrentPeriodCompleteNum+'/'+data.result.lastCurrentPeriodtotalNum;
          }else if("累计工单数"==v.name){
            v.sum = data.result.accumulateNum;
          }else if("累计完工工单数"==v.name){
            v.sum = data.result.accumulateCurrentNum;
          }
        });
      })
      this.quiry1(false);
      this.quiry2(false);
      this.quiry3(false);
      this.quiry4(false);
    },
    methods: {
      isShow(){
        if(this.isCanalDetails.isShow){
          return true
        }
        if(this.isCanalDetails.isShow){
          return true
        }
        if(this.isEverydayOrder.isShow){
          return true
        }
        if( this.isUserDetails.isShow){
          return true
        }
        if( this.isCategory.isShow){
          return true
        }
      },
      quiry1(isTime){
        if(isTime&&this.timeQuantum1){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum1[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum1[1]).format('YYYY-MM-DD');
        }else{
          this.statisticsDateStartStr ="";
          this.statisticsDateEndStr =""
        }
        let url=this.$apidomain+"/statisticsOrderArea/findListByBean";
        this.$http.get(url,this.paramsData1()).then(r=>{
          let data=r.data;
          this.chartData.rows=[];
          data.result.forEach((v)=>{
            let dateStr = this.$moment(v.statisticsDate).format('MM月DD日');
            this.chartData.rows.push({'日期':dateStr,'下单量':v.orderTotalNum,"下单服务数":v.serviceTotalNum,"完工数":v.orderCompleteNum,"完工服务数":v.serviceCompleteNum});
          });
        });
      },
      paramsData1(){
        return {params: {
          "statisticsDateStartStr":this.statisticsDateStartStr,
          "statisticsDateEndStr":this.statisticsDateEndStr,
        }}
      },
      quiry2(isTime){
        if(isTime&&this.timeQuantum){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }else{
          this.statisticsDateStartStr = "";
          this.statisticsDateEndStr =""
        }
        let url=this.$apidomain+"/statisticsUserOneDay/findListByBean";
        this.$http.get(url,this.paramsData2()).then(r=>{
          let data=r.data;
          this.chartData2.rows=[];
          data.result.forEach((v)=>{
            let dateStr = this.$moment(v.statisticsDate).format('MM月DD日');
            this.chartData2.rows.push({'日期':dateStr,'注册用户数':v.registerUserNum,'活跃用户数':v.activeUserNum,'下单数':v.orderTotalNum,'总用户数':v.userTotalNum});
          });
        });
      },
      paramsData2(){
        return {params: {
          "statisticsDateStartStr":this.statisticsDateStartStr,
          "statisticsDateEndStr":this.statisticsDateEndStr,
        }}
      },
      quiry3(isTime){
        if(isTime&&this.timeQuantum){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }else{
          this.statisticsDateStartStr = "";
          this.statisticsDateEndStr =""
        }
        let url=this.$apidomain+"/statisticsOrderChannel/findListByBean";
        this.$http.get(url,this.paramsData3()).then(r=>{
          let data=r.data;
          this.chartData3.rows=[];
          data.result.forEach((v)=>{
            let dateStr = this.$moment(v.statisticsDate).format('MM月DD日');
            this.chartData3.rows.push({'日期':dateStr,'下单量':v.orderTotalNum,"下单服务数":v.serviceTotalNum,"完工数":v.orderCompleteNum,"完工服务数":v.serviceCompleteNum});
          });
        });
      },
      paramsData3(){
        return {params: {
          "statisticsDateStartStr":this.statisticsDateStartStr,
          "statisticsDateEndStr":this.statisticsDateEndStr,
        }}
      },
      quiry4(isTime){
        if(isTime){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }
        let url=this.$apidomain+"/statisticsOrderSecondClassify/findListByBean";
        this.$http.get(url,this.paramsData4()).then(r=>{
          let data=r.data;
          this.chartData4.rows=[];
          data.result.forEach((v)=>{
            let dateStr = this.$moment(v.statisticsDate).format('MM月DD日');
            this.chartData4.rows.push({'日期':dateStr,'下单量':v.orderTotalNum,"下单服务数":v.serviceTotalNum,"完工数":v.orderCompleteNum,"完工服务数":v.serviceCompleteNum});
          });
        });
      },
      paramsData4(){
        return {params: {
          "statisticsDateStartStr":this.statisticsDateStartStr,
          "statisticsDateEndStr":this.statisticsDateEndStr,
        }}
      },
      isShowContainer(){
          return this.$store.state.refuse;
      },
//      canal(){
//        this.isCanalDetails.isShow=true;
//      }
    },
    mounted() {
    },

  }
</script>

<style scoped lang="scss">

  @import "../../../assets/styles/comminStyle2";
  #app{
    .container{
      >.selector_list{
        margin-top:0;
      }
    }
    .table {

      .child_table{
        tr{
          border:none;
          >.child_table_td{
            border:none;
            padding:10px ;
          }
        }
      }
    }

  }

  .alert{
    >p{
      position:absolute;
      top:16%;
      padding:10px 15px;
      cursor: pointer;
      right:22%;
      font-size: 35px;
    }
  }
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
</style>



