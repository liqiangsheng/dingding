<template>
  <div id="app">
    <div class="container">
      <div class="user_sum">
        <user-sum class="sum" :suerSum="item" v-for="(item,index) in userSum" :key="index"></user-sum>
      </div>
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
        </div>
        <div  style="width:50%;float:left">
          <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        </div>
        <div style="width:50%;float:left">
          <ve-line :data="chartData2" :settings="chartSettings"></ve-line>
        </div>
        <el-button @click="details" size="large">更多详情</el-button>
      </div>
    </div>
    <!--大弹框 详情-->
    <div class="alert" v-if="isDetailed.isShow">
      <detail :isDetailed="isDetailed">
      </detail>
    </div>
  </div>
</template>
<script>
  import detail from "./alert/pdetail.vue"
  import userSum from "../../user/userSum"
  export default {
    components:{
      detail,
      userSum
    },
    data() {
      return {
        //<!--弹窗基础数据start-->
        isDetailed:{
          title:"工单统计详情",
          isShow:false
        },
        //<!--弹窗基础数据end-->
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
//            sName:"条"
          },
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
          columns: ['日期', '单量'],
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
      let url=this.$apidomain+"/siteItem/countListBySite?siteId="+this.$getLocalStorage("enrolleeinfo")[0].id;
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
      this.quiry(false);
    },
    methods: {
//      <!--分页查询数据对象功能组合start-->
      quiry(isTime){
        if(isTime){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }
        let url=this.$apidomain+"/siteItem/findList";
        this.$http.get(url,this.paramsData()).then(r=>{
          let data=r.data;
          this.chartData.rows=[];
          this.chartData2.rows=[];
          data.result.forEach((v)=>{
            let dateStr = this.$moment(v.statisticsDate).format('MM月DD日');
            this.chartData.rows.push({'日期':dateStr,'单量':v.orderTotalNum});
            this.chartData2.rows.push({'日期':dateStr,'营收':v.revenue});
          });
        });
      },
      paramsData(){
        return {params: {
          "siteId":this.$getLocalStorage("enrolleeinfo")[0].id,
          "statisticsDateStartStr":this.statisticsDateStartStr,
          "statisticsDateEndStr":this.statisticsDateEndStr,
        }}
      },
//      <!--分页查询数据对象功能组合end-->
//      <!--弹窗功能start-->
      details(){
        this.isDetailed.isShow=true;
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

</style>


