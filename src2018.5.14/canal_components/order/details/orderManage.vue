<template>
  <div id="app" class="channel-app-box">
    <!--导航栏-->
    <!--导航栏结束-->
    <!--content内容区域-->
    <div class="container">
      <!--下拉列表-->
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
          </el-date-picker>&nbsp;&nbsp;
          <el-button @click="quiry(timeQuantum)" style="padding-left:30px;padding-right:30px;" type="primary">查询</el-button>
        </div>
      </div>
      <!--下拉列表结束-->
      <!--table表格-->
      <div class="dable_lsit">

        <!--导出按钮-->
        <div class="derive">
          <el-button @click="addOrderIs" size="large" class="derive_btn">自建工单</el-button>
        </div>
        <!--导出按钮结束-->
        <!--表格数据-->
        <table cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.orders">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.id}}
            </td>  <td>
              {{item.linkmanName}}
            </td> <td>
              {{item.fLabelBusiness|FLabelBusiness}}
            </td>
            <td>
              {{item.officialPartnerSubsetName}}
            </td>
            <td>
              {{item.linkmanArea}}
            </td>
            <td>
              {{item.total}}
            </td>
            <td>
              {{item.channelOfRevenue|channelOfRevenueShow}}
            </td>
          </tr>
          </tbody>
        </table>
        <!--表格数据结束-->
        <!--分页组件-->
        <div class="paging">
          <p class="home">总页数{{tableListData.pageNo}}/{{tableListData.pageTotal}}</p>
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
          <p class="home last_page cursor" @click="lasePage">尾页</p>
          <p class="home cursor" @click="firstPage">首页</p>
        </div>
        <!--分页组件结束-->
      </div>
      <!--table表格结束-->
    </div>
    <!--新建工单start-->
    <div class="alert" v-if="isAddorder.isShow">
      <add-order :isAddorder="isAddorder"  :quiry="quiry">
      </add-order>
    </div>
    <!--新建工单end-->
  </div>
</template>
<script>
  import addOrder from "./addOrder";
  export default {
    components:{
      addOrder
    },
    data() {
      return {
        //新建工单；
        isAddorder:{
          isShow:false,
          title: "新建工单",
        },
        selectorBehindObj:{},
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
        theadsName: [
          '序号',
          '工单号',
          '联系人',
          '分类',
          '子渠道名称',
          '服务区域',
          '工单总金额（元）',
          '渠道收入（元）',
        ],
        tableListData: {},          //表格数据
        showPages: 1,
        currentPageSize: 20,
        total: 0,
        pageTotal: 0,
      }
    },
    created(){
      this.quiry(false);
    },
    methods: {
      quiry(isTime=[]){
        if(isTime.length&&isTime[0]&&isTime[1]){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }else{
          this.statisticsDateStartStr = "";
          this.statisticsDateEndStr = "";
        }
        this.getTableList(this.paramsData());
      },
      paramsData(){
        return{params:{
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "officialPartnerId":this.$getLocalStorage("enrolleeinfo")[0].id,
          "createTimeStartStr":this.statisticsDateStartStr,
          "createTimeEndStr":this.statisticsDateEndStr,
        }};
      },
      //table 数据 start;
      getTableList(params){
        let url=this.$apidomain+"/orderquery/findpage";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.tableListData = data.result;
          this.showPages = data.result.pageNo;
          this.currentPageSize = data.result.pageSize;
          this.total = data.result.total;
          this.pageTotal = data.result.pageTotal;
        })
      },
//table 数据 end
      //显示新建工单；
      addOrderIs(){
        this.isAddorder.isShow=true;
      },
      //显示新建工单；end

      //添加备注
      addRemarksIsShow(item){
        this.addRemarksObj.orderId=item.id;
        this.addRemarksObj.isShow=true;
      },
      //退款isAlert
      drawbackIsShow(data){
        this.isDrawback.isShow=true;
        this.isDrawback.orderId=data.id;
      },
      //退款isAlert   END

      selectorForbidden(item,index){
        this.alertForbiddenList.forEach((v)=>{
          v.selector=false;
        });
        item.selector=!item.selector;

      },
      batchOrder(list){
        let newAr=[]
        list.forEach(v=>{
          if(v.isCheckboxList){
            newAr.push(v)
          }
        });
      },
      add(){      //新增
        this.isAdd=true
      },
      details(item,index){
        this.$store.commit("displayAlert",true); //通过vux 传递数据
        this.isAlert=this.$store.state.isAlert;          //弹出对话框
      },

//分页查询 事件 start
      handleSizeChange(val) {      //每页显示多少条
        this.$queryFun.handleSizeChange.call(this,val)
      },
      handleCurrentChange(val) {
        this.$queryFun.handleCurrentChange.call(this,val)
      },
      firstPage(){
        this.$queryFun.firstPage.call(this)
      },
      lasePage(){
        this.$queryFun.lasePage.call(this)
      },
      handleItemChange(val) {
      },
      changeSelector(value){             //区域
        this.areaoptions1.forEach((v,i)=>{
          if(value[0]===v.label){
            this.areaId=v.id;    //选择区
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.areaId=e.id    //选择街道
              }
            })
          }
        });
        this.selectorBehindObj['areaId']=this.areaId
      },
    },
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/styles/comminStyle2";
  @import "../../../assets/styles/Ch_comminStyle";
  #app{
    .container{
      >.selector_list{
        margin-top:30px;
        >.list{
          width:100%;
          text-align: left;
        }
      }
    }
    h3{
      font-weight: normal;
      position:absolute;
      font-size: 14px;
      left:50%;
      top:15px;
      transform: translateX(-50%);
      text-align: center;
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
  .el-icon-close{
    z-index: 9999;
    position:absolute;
    top:18%;
    right:4%;
    font-size: 25px;
  }
  .alert_forbidden_area{
    width:100%;
    height:60px;
    border:1px solid #c0c0c0;
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
      padding-bottom:70px;

  }
  .derive_btn{
    margin-bottom:15px;
  }

</style>
<style>
  .el-notification{
    z-index: 99999 !important;
    top:20px !important;
  }
</style>

