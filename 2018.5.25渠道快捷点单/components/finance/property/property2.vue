<template>
  <div id="app">
    <div class="container" v-if="isDetaileds.isShow">
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
        <!--城市-->
      </div>
      <!--查询按钮-->
      <div class="btn_inquiry" @click="query(timeQuantum)">
        查询
      </div>
      <div class="dable_lsit">
        <!--导出-->
        <table cellSpacing="0px" cellpadding="0">
          <thead  >
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">
              {{item}}
              <seqencing-icon v-if="$queryFun.sortFun(index,sortData)" :data="$queryFun.sortFun(index,sortData)" :getTableList="getTableList" :params="paramsData()" ></seqencing-icon>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.productInfos">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.statisticsDate|moment('YYYY-MM-DD')}}
            </td>
            <td>
              {{item.revenue}}
            </td>
            <td>
              {{item.expend}}
            </td>
            <td>
              {{item.netIncrease}}
            </td>
            <td>
              <span @click="details(item,index,isDatail)" v-show="$isButtonObj('bn-finance-property-record-details')"><i></i>查看明细</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
      <detail :isDatail="isDatail" v-if="isDatail.isShow"></detail>
    <p class="closeX" @click="close(isDetaileds)"></p>
    <!--<drawback :isDrawback="isDrawback"></drawback>-->
  </div>
</template>
<script>
//  import drawback from "./drawback"
  import detail from "./detail"
  export default {
    props:["isDetaileds"],
    components:{
//      drawback,
      detail
    },
    data() {
      return {
        isDatail:{
          isShow:false
        },
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
        //
        isDrawback:{
          isShow:false,
        },
        checked:false,
        theadsName:[
          '序号',
          '记账时间',
          '收入(元)',
          '支出(元)',
          '净增额(元)',
          '操作'
        ],
        sortData: [
          {
            index:1,
            sortAscendingValues:[" statistics_date asc "],  //升序
            gradeDownValues:[" statistics_date desc "],     //降序
          },  {
            index:2,
            sortAscendingValues:[" revenue asc "],  //升序
            gradeDownValues:[" revenue desc "],     //降序
          },  {
            index:3,
            sortAscendingValues:[" expend asc "],  //升序
            gradeDownValues:[" expend desc "],     //降序
          },  {
            index:4,
            sortAscendingValues:[" net_increase asc "],  //升序
            gradeDownValues:[" net_increase desc "],     //降序
          },
        ],
        name: '',
        cityId: '', //城市id
        props: {
          value: 'label',
          children: 'cities',
        },
        selectorBehindObj: {
          objNumber:"",
          accountNumber:"",
          number:"",
          time:""
        },
        tableListData:{
          productInfos:[]
        },
      }
    },
    created(){
      this.query(false);
    },
    methods: {
//      <!--分页查询数据对象功能组合start-->
      query(isTime){
        if(isTime&&isTime.length>=2&&isTime[0]&&isTime[1]){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }else{
          this.statisticsDateStartStr =""
          this.statisticsDateEndStr =""
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
        let url=this.$apidomain+"/statisticsSystemIncomeAndExpenses/findList";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.tableListData.productInfos = data.result;
        })
      },
//      <!--分页查询数据对象功能组合end-->
      close(isSow){
        isSow.isShow=false;
      },
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        })
      },
      details(item,index,isShow){
        isShow.statisticsDateStr=this.$moment(item.statisticsDate).format('YYYY-MM-DD');
        isShow.isShow=true
      },
      wholeSelector(data,currentState){ //全选
        data.forEach((v,i)=>{
          v.checked=currentState
        })
      },
      isCheckbox(data,checkedAll){
        if (!data.checked) {
          this.checked = false;
          return;
        }
        checkedAll.forEach((v, i) => {
          this.checked = v.checked;
        })
      },
      changeSelector(value){
        this.options2.forEach((v,i)=>{
          if(value[0]===v.label){
            this.cityId=v.id;    //选择城市
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.cityId=e.id    //选择区
              }
            })
          }
        });
      },
      handleItemChange(){

      },
      derive(){

      },
    },
    mounted() {

    },

  }
</script>

<style scoped lang="scss">
  #app{
    .city{
      padding:0;
    }
    .alert{
      width:100vw;
      height:100vh;
      background:rgba(0,0,0,0.6);
      position:absolute;
      top:0;
      z-index:9999;
      right:0;
      .btn{
        position:absolute;
        bottom:17%;
        left:50%;
        transform:translateX(-50%);
        text-align:center;
        overflow: hidden;
        button{
          width:200px;
          cursor:pointer;
          line-height:44px;
          border:none;
          padding:0;
          margin:0;
          transform: rotate(-360deg);
          border: 1px solid #979797;
          border-radius: 4px;
          float:left;
          background:#fff;
          outline:none;
        }
        .selector{
          color:#fff;
          background: #279447;
        }
      }
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
    >.container{
      font-size:14px;
      width:100%;
      overflow:hidden;
      >.user_sum{
        width:100%;
        height:20px;
        float:left;
        >span{
          margin-right:35px;
          color:blue;
          font-size:14px;
          >b{
            font-weight:normal;
            color:#000;

          }
        }
        >span:last-of-type{
          color:green;
          font-size:14px;
        }

      }
      >.selector_list{
        width:100%;
        overflow: hidden;
        margin-top:40px;
        >.list{
          float:left;
          line-height:60px;
          list-style:none;
          font-size:14px;
          margin-right:5%;
          width:auto;
        }
        .el-input{
          width:auto;
        }

        >.list:nth-of-type(3n){
          /*margin-right:0;*/
        }
      }
      .btn_inquiry{
        width:200px;
        height:44px;
        margin:0 auto;
        cursor:pointer;
        margin-top:30px;
        text-align:center;
        line-height:44px;
        background: #A470CD;
        border-radius: 4px;
        color:#fff;
      }
    }
    .dable_lsit{
      margin-top:50px;
      >.paging{
        text-align:right;
        width:100%;
        line-height:50px;
        >input,select{
          width:42px;
          height:20px;
          padding:0;
        }
        >.link_page{
          background: #1C5B94;
          color:#fff;
        }
        .home{
          float:right;
        }
        .last_page{
          color:blue;
          margin-left:10px;
        }
        .el-pagination{
          float:right;
          padding-top:12px;
        }
      }
      margin-bottom:200px;
      table{
        width:100%;
        .theads{

          >th{
            padding:10px 10px;
            text-align:center;
            background: #E5E9F2;
            box-shadow: inset 0 1px 0 0 #E0E6ED,
            inset 0 -1px 0 0 #E0E6ED;

          }
          >.multiple{
            width:30px;
            cursor:pointer;
            box-size:border-box;
          }
        }
        >tbody{
          >tr{
            border-top:1px solid #ccc;
            >td{
              border-bottom:1px solid #ccc;
              padding:10px 10px;
              text-align:center;
            }
            >td:first-of-type{
              border-right:1px solid #ccc;
            }
            >td:last-of-type{
              padding-top:0;
              padding-bottom:0;
              >span{
                height:100%;
                float:left;
                padding-top:4px;

                padding-left:30px;
                i{
                  width:16px;
                  height:16px;
                  background:url(../../../../static/images/ban.png) center center no-repeat;
                  background-size:100% 100%;
                  float:left;
                  margin-right:3px;

                  vertical-align: middle;
                }
              }
              >span:last-of-type{
                float:right;
                padding-left:0px;
                padding-top:8px;
                padding-right:20px;
                cursor:pointer;
                i{
                  width:16px;
                  height:16px;
                  margin-top:3px;
                  background:url(../../../../static/images/detailed.png) center center no-repeat;
                  background-size:100% 100%;
                  float:left;
                }
              }
            }
          }
          >tr:nth-of-type(even){
            background: #F9FAFC;
          }
        }
      }
      >.derive{
        float:right;
      }
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
  .closeX{
    background:url(../../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
    background-origin: content-box;
    right:40px;
    z-index: 9992;
    transform:translateY(40px);
  }

</style>
