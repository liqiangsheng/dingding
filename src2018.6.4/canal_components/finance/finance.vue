<template>
  <div id="app" class="channel-app-box">
    <div class="container">
      <div class="selector_list">
          计算日期 :
        <!-- <DatePicker v-model="time" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 230px"></DatePicker> -->
          <el-date-picker
            v-model="time"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="pickerOptions2"
          >
          </el-date-picker>
         &nbsp; &nbsp;
        &nbsp;
        <el-button @click="quiry(time)" style="padding-left:30px;padding-right:30px;" type="primary">查询</el-button>
      </div>
      <div class="dable_lsit table">
        <p style="float:none;margin-bottom:20px;">{{text}}</p>
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
              {{item.statisticsStartDate|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td>
              {{item.statisticsEndDate|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td>
              {{item.revenue}}
            </td>
            <td>
              {{item.withdrawDeposit}}
            </td>
            <td>
              {{item.withdrawDepositTime|moment('YYYY-MM-DD HH:mm:ss')}}
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
        text:"注：渠道收入按实际入账为准",
        //查询的date    数据  start
        time:[],
    
        //查询的date    数据  end
        theadsName:[
          '序号',
          '起始时间',
          '结束时间',
          '渠道总收入（元）',
          '入账金额（元）',
          '提现时间',
        ],
        tableListData:[],          //表格数据
      }
    },
    created(){
      this.quiry();
    },
    methods: {
//      <!--分页查询数据对象功能组合start-->
      quiry(date=[]){
        let startDate,startEnd;
        if(date.length===2&&date[0]&&date[1]){
          startDate= this.$moment(date[0]).format('YYYY-MM-DD');
          startEnd= this.$moment(date[1]).format('YYYY-MM-DD');
        }
        this.getTableList(this.paramsData(startDate,startEnd));
      },
      paramsData(startDate="",startEnd=""){
        return {params: {
          "objectId":this.$getLocalStorage("enrolleeinfo")[0].id,
          "startDate":startDate,
          "startEnd":startEnd,
        }}
      },
      getTableList(params){
        let url=this.$apidomain+"/statisticsSectionCapitalInfo/findlistStatisticsSectionCapitalInfo";
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
<style>
  .el-dialog__wrapper{
    z-index: 9999 !important;
  }
  .el-message-box__wrapper{
    z-index: 9999 !important;
  }
</style>
<style scoped lang="scss">
  @import "../../assets/styles/comminStyle";
  @import "../../assets/styles/Ch_comminStyle";
  #app{
    .container{
      >.selector_list{
        margin-top:25px;
      }
    }
  }
  .dable_lsit{
    background:#fff;
    padding:20px;
  }
</style>

<style>
  .ivu-select-dropdown{
    z-index: 999999999 !important;
  }
</style>






