<template>
  <div id="app">
    <div class="container">
      <div class="user_sum">
        <user-sum class="sum" :suerSum="item" v-for="(item,index) in userSum" :key="index"></user-sum>
      </div>
      <div class="selector_list">
        <div class="list">
          师傅姓名 :
          <el-input
            placeholder="请输入内容"
            v-model="masterName">
          </el-input>
        </div>
        <div class="list">
          结算日期区间：
           <DatePicker v-model="timeQuantum" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="选择日期"></DatePicker>
        </div>
      </div>
      <!--查询按钮-->
      <div class="btn_inquiry" @click="quiry">
        查询
      </div>
      <div class="dable_lsit">
        <table cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.coreOrderSettleAccounts">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.settleAccountsTime|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td>
              {{item.mainOrderId}}
            </td>
            <td>
              {{item.masterId}}
            </td>
            <td>
              {{item.masterName}}
            </td>
            <td>
              {{item.orderActualPaymentFee}}
            </td>
            <td>
              {{item.objectFee}}
            </td>
            <td>
              <span class="details_icon"><el-button type="text" @click="details(item,index)"><i></i>详情</el-button></span>
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
    <!--大弹框 详情-->
    <div class="alert" v-if="isDetailed.isShow">
      <detail :isDetailed="isDetailed" :quiry="quiry">
      </detail>
    </div>
    <div>
    </div>
  </div>
</template>
<script>
  import userSum from "../../user/userSum.vue"
  import detail from "./alert/detail.vue"
  import {getSession} from "../../../../static/js/session"
  export default {
    components:{
      userSum,
      detail
    },
    data() {
      return {
        //<!--弹窗基础数据start-->
        isDetailed:{
          title:"工单详情",
          isShow:false
        },
        //<!--弹窗基础数据end-->
        //<!--搜索框筛选数据start-->
        timeQuantum:[],
        
        masterName:"", //姓名
        //<!--搜索框筛选数据end-->
        //<!--搜索框与table与分页start-->
        checked:false,
        theadsName:[
          '序号',
          '交易时间',
          '工单号',
          '师傅编号',
          '师傅姓名',
          '工单总金额(元)',
          '网点收入(元)',
          '操作'
        ],
        selectorBehindObj:{},
        tableListData:{
          pageNo:1,
          pageSize:20,
          total:0,
          pageTotal: 1,
          coreOrderSettleAccounts:[]
        },
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0,
        //<!--搜索框与table与分页end-->
        isClose:false,
        isForbidden:false,
        isAlert:this.$store.state.isAlert,
        isActive:"0",
        //<!--顶部数据模板start-->
        userSum:[
          {
            sum:"0", //总用户量
            color:"blue",
            sName:"元",
            name:"本期收入"
          },{
            color:"green",
             sName:"元",
            sum:"0", //总用户量
            name:"上期收入"
          },{
            color:"green",
             sName:"元",
            sum:"0", //总用户量
            name:"累计收入"
          },
        ],
        //<!--顶部数据模板end-->
      }
    },
    created(){
      let siteId='';
      if(getSession("userInfo")&&getSession("userInfo").length>0)siteId=getSession("userInfo")[0].id;
      this.quiry();
      let urlCount=`${this.$apidomain}/siteItem/countFaListBySite?siteId=${siteId}`;
      this.$http.get(urlCount).then(r=>{
        let data=r.data;
        this.userSum.forEach((v)=>{
          if("本期收入"==v.name){
            v.sum = data.result.currentPeriodTotal;
          }else if("上期收入"==v.name){
            v.sum = data.result.lastCurrentPeriodTotal;
          }else if("累计收入"==v.name){
            v.sum = data.result.allTotal;
          }
        });
      });
    },
    methods: {
// <!--分页查询数据对象功能组合start-->
      quiry(isTime){
        if(isTime){
          if(this.timeQuantum[0]!=this.timeQuantum[1]){
              this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
              this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
          }else if(!this.timeQuantum[0]||!this.timeQuantum[1]){
            this.timeQuantum=[];
            this.statisticsDateEndStr="";
            this.statisticsDateStartStr="";
          }
        }
        this.getTableList(this.paramsData());
      },
      paramsData(){
        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "masterName":this.masterName,
          "siteId":this.$getLocalStorage("enrolleeinfo")[0].id,
          "statisticsDateStartStr":this.statisticsDateStartStr,
          "statisticsDateEndStr":this.statisticsDateEndStr,
        }}
      },
      getTableList(params){
        let url=this.$apidomain+"/siteItem/findFaPage";
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
        this.isDetailed.orderId = item.mainOrderId;
        this.isDetailed.isShow=true;
      },
//      <!--弹窗功能end-->
      isCheckbox(data,checkedAll){
        if(!data.checked){
          this.checked=false;
          return;
        }
        checkedAll.forEach((v,i)=>{
          this.checked=v.checked;
        })
      },
      wholeSelector(data,currentState){
        data.forEach((v,i)=>{
          v.checked=currentState
        })
      },
      Reminded(item,index){
        this.$store.commit("displayAlert",true);
        this.isAlert=this.$store.state.isAlert;
      },
      derive(){

      },
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
      selector(item,values,SourceTypeValue){
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        })
      },
      isSelector(index){
        this.isActive=index;
      },
      forbidden(){
        this.isForbidden=true;
        this.isClose=false;
        this.dialogTableVisible=true;
      },
      close(pre,addDataAlert){
        if(pre==="preserve"){    //判断是否是保存
          addDataAlert.inputs.forEach(v=>{
            addDataAlert.selectorBehindObj[v.key]=v.value
          });

        }
        this.isClose=true;
        this.isForbidden=false;
        this.isAdd=false;
        this.$store.commit("displayAlert",false); //通过vux 传递数据
        this.isAlert=this.$store.state.isAlert;
      },
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


