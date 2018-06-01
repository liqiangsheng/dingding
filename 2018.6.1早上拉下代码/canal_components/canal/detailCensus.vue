<template>
  <div id="app" class="channel-app-box">
    <div class="container">
      <div class="selector_list">
        <div class="list" style="width:100%;text-align: left">
          <div class="list_name" style="width:100px;">
            选择日期区间 :
          </div>
            <el-date-picker
            v-model="timeQuantum"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="pickerOptions2"
          >
          </el-date-picker>
          &nbsp;
          &nbsp;
          <el-button style="padding-left:20px;padding-right:20px;" type="primary" @click="quiry">查询</el-button>
        </div>
      </div>
      <div class="dable_lsit">
        <table cellSpacing="0px" cellpadding="0">
          <thead>
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
              {{item.statisticsDate | moment('YYYY-MM-DD')}}
            </td>
            <td>
              {{item.orderTotalNum}}
            </td>
            <td>
              {{item.orderCompleteNum}}
            </td> <td>
              {{item.revenue}}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:["isDetailed"],
    components:{
    },
    data() {
      return {
         pickerOptions2: {
                shortcuts: [
                  {
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
                }
                ]
        },
        //<!--搜索框与table与分页start-->
        date:[],
        theadsName:[
          '序号',
          '日期',
          '下单工单数',
          '完工工单数',
          '工单总营收（元）'
        ],
        selectorBehindObj:{},
        timeQuantum:[],
        tableListData:[],
      }
    },
    created(){
      this.quiry();
    },
    methods: {
//      <!--分页查询数据对象功能组合start-->
      resetting(){
        this.date=[];
      },
   
      quiry(){
        let Time={statisticsDateStartStr:"",statisticsDateEndStr:""}
        if(this.timeQuantum.length===2&&this.timeQuantum[0]&&this.timeQuantum[1]){
              Time.statisticsDateStartStr=this.$moment(this.timeQuantum[0]).format("YYYY-MM-DD");
              Time.statisticsDateEndStr=this.$moment(this.timeQuantum[1]).format("YYYY-MM-DD");
        }
        this.getTableList(this.paramsData(Time));
      },
      paramsData(Time){
        return {params: {
          "channelId":this.$getLocalStorage("enrolleeinfo")[0].id,
          "statisticsDateStartStr":Time.statisticsDateStartStr,
          "statisticsDateEndStr":Time.statisticsDateEndStr,
          "orderByClause":" statistics_date desc ",
        }}
      },
      getTableList(params){
        let url=this.$apidomain+"/statisticsOrderChannel/findlist";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.tableListData = data.result;
        })
      },
//      <!--分页查询数据对象功能组合end-->
    },
    mounted() {
    },
  }
</script>
<style scoped lang="scss">
  @import "../../assets/styles/comminStyle";
  @import "../../assets/styles/Ch_comminStyle";
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
  .dable_lsit{
    background:#fff;
    padding:20px;
  }

</style>



