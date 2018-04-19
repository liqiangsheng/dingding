<template>
  <div id="app">
    <div class="container">
      <div class="selector_list">
        <div class="list">
          工单号 :
          <el-input
            placeholder="请输入关键字查询"
            v-model="selectorBehindObj.mainOrderId">
          </el-input>
        </div>
        <div class="list">
          选择记账日期：
          <el-date-picker
            v-model="timeQuantum"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="pickerOptions2"
          >
          </el-date-picker>
        </div>
        <div v-for="(item,index) in optionList" :key="index" class="list">
          {{item.name}} :
          <el-select
            v-model="item.SourceTypeValue" placeholder="请选择" @change="selector(item,item.SourceType,item.SourceTypeValue)">
            <el-option
              v-for="items in item.SourceType"
              :key="items.value"
              :value="items.value"
            >
            </el-option>
          </el-select>
        </div>
        <!--城市-->
      </div>
      <!--查询按钮-->
      <div class="btn_inquiry" @click="quiry(true)">
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
          <tr v-for="(item,index) in tableListData.coreOrderSettleAccounts">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.createTime|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td>
              {{item.mainOrderId}}
            </td>
            <td>
              {{item.objectId}}
            </td>
            <td>
              {{item.objectName}}
            </td>
            <td>
              {{item.objectType|mastertype}}
            </td>
            <td>
              {{item.orderActualPaymentFee}}
            </td>
            <td>
              {{item.cause}}
            </td>
            <td>
              <span @click="details(item)" v-show="$isButtonObj('bn-finance-abnormalsettlement-againsettle')"> <i></i>再次结算</span>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="paging">
          <p class="home">总页数{{tableListData.pageNum}}/{{tableListData.pageTotal}}</p>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes='[20,50,100,200]'
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="showPages"
            :total="total"
            :page-size="currentPageSize"
            :page-count="pageTotal"
          >
          </el-pagination>
          <p class="home last_page" @click="lasePage">尾页</p>
          <p class="home" @click="firstPage">首页</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components:{
    },
    data() {
      return {
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
        checked:false,
        theadsName:[
          '序号',
          '记录时间',
          '工单号',
          '对象编号',
          '对象名称',
          '对象类型',
          '异常工单金额',
          '异常原因',
          '操作'
        ],
        sortData: [
          {
            index:1,
            sortAscendingValues:[" create_time asc "],  //升序
            gradeDownValues:[" create_time desc "],     //降序
          },{
            index:6,
            sortAscendingValues:[" order_actual_payment_fee asc "],  //升序
            gradeDownValues:[" order_actual_payment_fee desc "],     //降序
          }
        ],
        name: '',
        cityId: '', //城市id
        props: {
          value: 'label',
          children: 'cities',
        },
        selectorBehindObj: {
        },
        optionList:[       //下拉列表数据
          {
            name:"异常原因",
            key:"cause",
            SourceTypeValue: '', //选中后的
            SourceType:[
              {
                value: '---请选择---',
                id:""
              },
              {
                value: '网点提点数据缺失：上门费',
                id:"网点提点数据缺失：上门费"
              }, {
                id:"网点提点数据缺失：服务费",
                value: '网点提点数据缺失：服务费'
              }, {
                id:"网点提点数据缺失：配件费",
                value: '网点提点数据缺失：配件费'
              }, {
                id:"网点提点数据缺失：高空费",
                value: '网点提点数据缺失：高空费'
              },{
                value: '师傅提点数据缺失：上门费',
                id:"师傅提点数据缺失：上门费"
              }, {
                id:"师傅提点数据缺失：服务费",
                value: '师傅提点数据缺失：服务费'
              }, {
                id:"师傅提点数据缺失：配件费",
                value: '师傅提点数据缺失：配件费'
              }, {
                id:"师傅提点数据缺失：高空费",
                value: '师傅提点数据缺失：高空费'
              }, {
                id:"渠道提点数据缺失：服务费",
                value: '渠道提点数据缺失：服务费'
              }, {
                id:"渠道未配置提点数据",
                value: '渠道未配置提点数据'
              }, {
                id:"上门费结算为负数，结算失败",
                value: '上门费结算为负数，结算失败'
              }
            ]
          }
        ],
        tableListData:{
          pageNum:1,
          pageSize:20,
          total:0,
          pageTotal: 1,
          coreOrderSettleAccounts:[]
        },
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0
      }
    },created(){
      this.quiry(false);
    },
    methods: {
//      <!--分页查询数据对象功能组合start-->
      quiry(isTime){
        if(isTime) {
          if (this.timeQuantum&&(this.timeQuantum[0] != this.timeQuantum[1])) {
            this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
            this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
          }else{
            this.statisticsDateStartStr = "";
            this.statisticsDateEndStr="";
          }
        }
        this.getTableList(this.paramsData());
      },
      paramsData(){
        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "state":"2",
          "cause":this.selectorBehindObj.cause,
          "mainOrderId":this.selectorBehindObj.mainOrderId,
          "statisticsDateStartStr":this.statisticsDateStartStr,
          "statisticsDateEndStr":this.statisticsDateEndStr,
        }}
      },
      getTableList(params){
        let url=this.$apidomain+"/orderSettleAccounts/findPage";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.tableListData = data.result;
          this.showPages = data.result.pageNo;
          this.currentPageSize = data.result.pageSize;
          this.total = data.result.total;
          this.pageTotal = data.result.pageTotal;
        })
      },
//      <!--分页查询数据对象功能组合end-->
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        })
      },
      details(item){
        this.$confirm('此操作将再次结算该工单，是否继续？', '再次结算', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var o={};
          o.orderId=item.mainOrderId;
          let url=this.$apidomain+"/orderSettleAccounts/orderSettleAccounts";
          this.$http.post(url,o).then(res=>{
            let data = res.data;
            if("0000"===data.code){
              this.$message({
                type: 'success',
                message: '再次结算成功!'
              });
              this.quiry(true);
            }else{
              alert(data.error);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      wholeSelector(data,currentState){ //全选
        data.forEach((v,i)=>{
          v.checked=currentState
        })
      },
      handleSizeChange(val) {      //每页显示多少条
        this.currentPageSize=val;
        this.getTableList(this.paramsData());
      },
      handleCurrentChange(val) {
        this.showPages=val;
        this.getTableList(this.paramsData());
      },
      firstPage(){
        if(  this.showPages===1 ){
          return alert("已经是第一页")
        }
        this.showPages=1;     //第一页
        this.getTableList(this.paramsData());
      },
      lasePage(){
        if(this.showPages===this.pageTotal){
          return alert("已经是最后一页")
        }
        this.showPages=this.pageTotal; //最后一页
        this.getTableList(this.paramsData());
      },
      off(item){
        this.isDrawback.isShow=true;
      },
      publish(item){
        this.$confirm('此操作将下架产品，是否继续？', '下架', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '上架成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上架操作'
          });
        });
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
          width:327px;
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

</style>
