<template>
  <div id="app">
    <div class="container">
        <div class="dable_lsit">
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
                {{item.masterId}}
              </td>
              <td>
                <span><el-button type="text" @click="details(item,index)"><i>{{item.masterName}}</i></el-button></span>
              </td>
              <td :class="{red:item.state=='05'||item.state=='06'}">
                {{item.state|orderStateShow}}
              </td>
              <td>
                {{item.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}
              </td>
              <td>
                {{item.id}}
              </td>
              <td :class="{red:item.startWorkDeviation<0}">
                {{item.startWorkDeviation|startWorkDeviationShow}}
              </td>
              <td :class="{red:item.deviation<0}">
                {{item.deviation|startWorkDeviationShow}}
              </td>
              <td>
                {{item.linkmanName}}
              </td>
              <td>
                {{item.linkmanPhoneNum}}
              </td>
              <td>
                {{item.linkmanArea}}
              </td>
              <td>
                {{item.linkmanDetails}}
              </td>
              <td>
                {{item.fLabelBusiness|FLabelBusinessShow}}
              </td>
              <td>
                <span class="details_icon"><el-button type="text" @click="orderDetails(item,index)"><i></i>查看详情</el-button></span>
              </td>
            </tr>
            </tbody>
          </table>
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
            <p class="home last_page" @click="lasePage">尾页</p>
            <p class="home" @click="firstPage">首页</p>
          </div>
        </div>
    </div>
    <!--大弹框 详情start-->
    <div class="alert" v-if="isDetailed.isShow">
      <monitorDetail :isDetailed="isDetailed" :quiry="quiry">
      </monitorDetail>
    </div>
    <!--大弹框 详情end-->
    <!--订单详细 详情start-->
    <div class="alert" v-if="orderDetailed.isShow">
      <transactionDetail :isDetailed="orderDetailed" :quiry="quiry">
      </transactionDetail>
    </div>
    <!--订单详细 详情end-->
  </div>
</template>
<script>
  import monitorDetail from './alert/monitorDetail.vue'
  import transactionDetail from './alert/transactionDetail.vue'
  export default {
    components: { monitorDetail,transactionDetail },
    data() {
      return {
        orderDetailed:{
          title:"工单详情",
          isShow:false,
          orderId:"",
        },
        isDetailed:{
          title:"师傅今日工单列表",
          isShow:false,
          masterId:"",
          masterName:"",
        },
        theadsName:[
          '序号',
          '师傅编号',
          '师傅姓名',
          '工单状态',
          '预约时间',
          '工单号',
          '上工偏差',
          '准时偏差',
          '客户姓名',
          '手机号',
          '服务区域',
          '服务地址',
          '服务类型',
          '操作',
        ],
        tableListData:{
          pageNum:1,
          pageSize:50,
          total:50,
          pageTotal: 1,
          orders:[]
        },
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0,
        //基本页面 固定参数start
        checked:false,
        //基本页面 固定参数end
      }
    },
    created(){
      this.quiry();
    },
    methods: {
//      <!--分页查询数据对象功能组合start-->
      quiry(){
        this.getTableList(this.paramsData());
      },
      paramsData(){
        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "siteId":this.$getLocalStorage("enrolleeinfo")[0].id,
          "state":"04,05,06,07,08,10,11",
        }}
      },
      getTableList(params){
        let url=this.$apidomain+"/orderquery/findpagedetection";
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
//      <!--弹窗功能start-->
      details(item,index){
        this.isDetailed.masterId = item.masterId;
        this.isDetailed.masterName = item.masterName;
        this.isDetailed.title = this.isDetailed.masterName+"-师傅今日工单详情";
        this.isDetailed.isShow=true;
      },
      orderDetails(item,index){
        this.orderDetailed.orderId = item.id;
        this.orderDetailed.isShow=true;
      },
//      <!--弹窗功能end-->
//    基本页面  固定函数 start
      handleSizeChange(val) {
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
        this.showPages=1;
        this.getTableList(this.paramsData());
      },
      lasePage(){
        if(this.showPages===this.pageTotal){
          return alert("已经是最后一页")
        }
        this.showPages=this.pageTotal;
        this.getTableList(this.paramsData());
      },
      handleItemChange(val) {
      },
//    基本页面  固定函数 end
    },
    mounted() {

    }
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
