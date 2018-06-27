<template>
  <div id="app" class="channel-app-box">
    <div class="container">
      <div class="sum_box">
        <div v-for="(item,index) in userSum" :style="item.backgroundColor">
            <div class="sum_center">
              <p>{{item.sum}} <sub style="font-size: 12px;" v-if="index>=2">元</sub></p>
              <span>{{item.name}}</span>
            </div>
        </div>
      </div>
      <br/>
      <br/>
    </div>
    <!--大弹框 详情-->
    <detail-census :isDetailed="isDetailCensus"></detail-census>
  </div>
</template>
<script>
  import userSum from "../../components/user/userSum"
  import detailCensus from "./detailCensus";
  export default {
    components:{
      userSum,detailCensus
    },
    data() {
      return {
        //<!--弹窗基础数据start-->
        isDetailed:{
          title:"工单统计详情",
          isShow:false
        },
        isDetailCensus:{
          isShow:true
        },
        //<!--弹窗基础数据end-->
        //<!--顶部数据模板start-->
        userSum:[
          {
            sum:"0", //总用户量
            backgroundColor:"background:#6CC9CC ",
            name:"本期完工工单数",
            sName:""
          },{
            backgroundColor:"background:#EBCC4C",
            sum:"0", //总用户量
            name:"上期完工工单数",
            sName:""
          },{
            backgroundColor:"background:#57C9F2",
            sum:"0", //总用户量
            name:"本期收入",
            sName:"元"
          },{
            backgroundColor:"background:#81C931",
            sum:"0", //总用户量
            sName:"元",
            name:"上期收入"
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
      let url=this.$apidomain+"/channelItem/countListByChannel?channelId="+this.$getLocalStorage("enrolleeinfo")[0].id;
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.userSum.forEach((v)=>{
          if("本期完工工单数"==v.name){
            v.sum = data.result.currentPeriodNum;
          }else if("上期完工工单数"==v.name){
            v.sum = data.result.lastCurrentPeriodNum;
          }else if("本期收入"==v.name){
            v.sum = data.result.currentPeriodTotal;
          }else if("上期收入"==v.name){
            v.sum = data.result.lastCurrentPeriodTotal;
          }
        });
      })
      this.quiry(false);
    },
    methods: {
      //更多详情；
      moreDetailed(){
        this.isDetailCensus.isShow=! this.isDetailCensus.isShow
      },
//      <!--分页查询数据对象功能组合start-->
      quiry(isTime){
        if(isTime){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }
        let url=this.$apidomain+"/statisticsOrderChannel/findlist";
        this.$http.get(url,this.paramsData()).then(r=>{
          let data=r.data;
          this.chartData.rows=[];
          this.chartData2.rows=[];
          data.result.forEach((v)=>{
            let dateStr = this.$moment(v.statisticsDate).format('MM月DD日');
            this.chartData.rows.push({'日期':dateStr,'单量':v.orderCompleteNum});
            this.chartData2.rows.push({'日期':dateStr,'营收':v.revenue});
          });
        });
      },
      paramsData(){
        return {params: {
          "channelId":this.$getLocalStorage("enrolleeinfo")[0].id,
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
  @import "../../assets/styles/comminStyle";
  #app{
    .sum_box{
      width:100%;
      display: flex;
      height: auto;
      >div{
        margin-right:20px;
        flex:1;
        height: 130px;
        color:#fff;
        text-align: center;

      >.sum_center{
        font-size: 16px;
        top:50%;
        position:relative;
        transform: translateY(-50%);
        >p{
          float:none;
          font-size:36px;
        }
      }
      }
      >div:last-of-type{
        margin-right:0;
      }
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
.derive{
  margin-right:45px;
}
</style>

<style>
  body{
    background:transparent !important;
  }
</style>
