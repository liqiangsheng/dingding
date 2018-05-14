
<template>
  <div id="app">
    <div class="container">
      <div class="selector_list">
        <div class="list">
          选择日期区间：
          <el-date-picker
            v-model="timeQuantum"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="pickerOptions2"
          >
          </el-date-picker>
        </div>
      </div>
      <!--查询按钮-->
      <div class="btn_inquiry" @click="quiry(true)">
        查询
      </div>
      <div class="dable_lsit table">
        <table cellSpacing="0px" cellpadding="0">
          <thead >
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in dataList">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.labelName}}
            </td>
            <td>
              {{item.serviceTotalNum}}
            </td>
            <td>
              {{item.serviceCompleteNum}}
            </td>
            <td>
              {{item.revenue}}
            </td>
            <td style="color:blue;cursor:pointer" @click="detail(item,index)">
              查看二级分类
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!--查看明细弹窗 start-->
    <div class="alert" v-if="dailyIsShow.isShow">
      <alert-info :dailyIsShow="dailyIsShow">
      </alert-info>
    </div>
    <!--查看明细弹窗 end-->
    <p class="el-icon-close close" @click="close(isCategory)"></p>
  </div>
</template>
<script>
  import alertInfo from "./secondClassify";
  export default {
    props:["isCategory"],
    components:{
      alertInfo
    },
    data() {
      return {
//   查看区域详情 start
        dailyIsShow:{
          isShow:false
        },
        //查看区域详情 end

        edit:{
          isShow:false,
          isDisabled:false
        },
        checked:false,

        //查询的date    数据  start
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
        //查询的date    数据  end
        dataList:[],
        theadsName:[
          '序号',
          '服务类型(一级类目)',
          '下单台数',
          '完成工单台数',
          '营收(元)',
          '操作'
        ],
      }
    },
    created(){
      this.quiry(false);
    },
    methods: {
      quiry(isTime){
        if(isTime&&this.timeQuantum&&this.timeQuantum[0]&&this.timeQuantum[1]){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }else{
          this.statisticsDateStartStr = ""
          this.statisticsDateEndStr=""
        }
        this.getTableList(this.paramsData());
      },
      paramsData(){
        return {params: {
          "statisticsDateStartStr":this.statisticsDateStartStr,
          "statisticsDateEndStr":this.statisticsDateEndStr,
        }}
      },
      getTableList(params){
        let url=`${this.$apidomain}/statisticsOrderSecondClassify/findlistStatisticsOrderSecondClassify`;
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.dataList = data.result;
        })
      },
      detail(item,index){
        this.dailyIsShow.statisticsDateStartStr = this.statisticsDateStartStr;
        this.dailyIsShow.statisticsDateEndStr = this.statisticsDateEndStr;
        this.dailyIsShow.labelId = item.labelId;
        this.dailyIsShow.isShow=true;
      },
      //关闭start
      close(isUserDetails){
        isUserDetails.isShow=false;
        this.$store.commit("sendRefuseData",false)
      },
      //关闭 end
      //查询数据 start
      selectorDateStart(date){    //起始时间
        if(date){
          this.date.startDate=date;
        }
      },
      selectorDateEnd(date){   //结束时间
        if(date){
          this.date.startEnd=date;
        }
      },
      selectorDate(val){      //j记账时间
        if(val){
          this.Date=val
        }
      },
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }

        })
      },
    },
    mounted() {
    }
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

  @import "../../../assets/styles/comminStyle2";
  #app{
    .container{
      >.selector_list{
        margin-top:0;
      }
    }
    .list{
      width:auto;
    }
    .table {
      #Reminded_icon {
        i {
          background: url(../../../../static/images/del.png) center center no-repeat;
          background-size: 100% 100%;
          width: 14px;
          height: 14px;
        }
      }
      #edit {
        i {
          background: url(../../../../static/images/en.png) center center no-repeat;
          background-size: 100% 100%;
        }
      }
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






