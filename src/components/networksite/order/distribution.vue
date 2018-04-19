<template>
  <div id="app">
    <div class="container">
      <div class="selector_list">
        <div class="list">
          工单号 :
          <el-input
            placeholder="请输入内容"
            v-model="inputParams.orderNumber">
          </el-input>
        </div>
        <div class="list">
          联系手机号 :
          <el-input
            placeholder="请输入内容"
            v-model="inputParams.orderTel">
          </el-input>
        </div>
        <div class="list">
          下单手机号 :
          <el-input
            placeholder="请输入内容"
            v-model="inputParams.userPhoneNum">
          </el-input>
        </div>
        <div class="list">
          预约时间 :
          <el-date-picker
            v-model="timeQuantum"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
        <div class="list">
          下单时间 :
          <el-date-picker
            v-model="timeQuantum2"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
        <div class="list">
          区域 :
          <el-cascader id="city"
                       @change="changeSelector"
                       :options="areaoptions1"
                       change-on-select
                       @active-item-change="handleItemChange"
                       :props="props"
          ></el-cascader>
        </div>
      </div>
      <!--查询按钮-->
      <div class="btn_inquiry" @click="quiry">查询</div>
      <!--查询按钮结束-->
      <div class="dable_lsit">
        <!--导出按钮-->
        <div class="derive">
          <el-button @click="batchSendOrders(tableList)" size="large">批量派单</el-button>
        </div>
        <table cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th class="multiple">
              <el-checkbox v-model="checked" @change="wholeSelector(tableList,checked)"></el-checkbox>
            </th>
            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableList">
            <td>
            <el-checkbox v-model="isCheckboxList[index]" @change="isCheckbox(item,index)"></el-checkbox>
            </td>
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.id}}
            </td>
            <td>
              {{item.userPhoneNum | placeholder}}
            </td>
            <td>
              {{item.linkmanName}}
            </td>
            <td>
              {{item.linkmanPhoneNum | placeholder}}
            </td>
            <td>
              {{item.linkmanArea}}
            </td>
            <td>
              {{item.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td>
              {{item.fLabelBusiness|FLabelBusinessShow}}
            </td>
            <td>
              {{item.createTime|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td>
              <span class="details_icon"><el-button type="text" @click="sendOrders(item,index,item.id,true)"><i></i>派单</el-button></span>
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
    <div class="alert" v-if="orderDetailed.isShow">
      <transactionDetail :isDetailed="orderDetailed" :quiry="quiry">
      </transactionDetail>
    </div>
    <!--大弹框 详情end-->
    <!--替换师傅弹框 start-->
    <div class="alert" v-if="isSendOrders.isShow">
      <replace-master :isSendOrders="isSendOrders" :quiry="quiry"></replace-master>
    </div>
    <!--替换师傅弹框end-->
  </div>
</template>
<script>
  import replaceMaster from "./alert/replaceMaster_alert"
  import transactionDetail from './alert/transactionDetail.vue'
  import {selectorCheck,selectorAll,getThis,getTableListData} from "@/components/order/js/pagingPages"
  export default {
    components: {
      transactionDetail,
      replaceMaster
    },
    data() {
      return {
        //画图数据start
        inputParams: {
          orderNumber: "",//工单号
          orderTel: "",//下单手机号
          masterJobNumber: "",//师傅工号
        },
        timeQuantum:[],
        statisticsDateStartStr:"",
        statisticsDateEndStr:"",
        timeQuantum2:[],
        statisticsDateStartStr2:"",
        statisticsDateEndStr2:"",
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
        //
        isCheckboxList:[],
        tableList:[],
        isSendOrders:{
          title:"分配工单",
          isShow:false,
          skills:"",
          areaId:"",
        },
        orderDetailed:{
          title:"工单详情",
          isShow:false,
          orderId:"",
        },
        props: {
          value: 'label',
          children: 'cities',
        },
        theadsName:[
          '序号',
          '工单号',
          '下单手机号',
          '联系人',
          '联系手机号',
          '服务区域',
          '预约时间',
          '服务类型',
          '下单时间',
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
        areaoptions1: [],
        selectorBehindObj:{},
      }
    },
    created(){
      let url=this.$apidomain+"/common/findareaandstreetoptions?cityId="+this.$getLocalStorage("enrolleeinfo")[0].cityId;
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.areaoptions1 = data.result;
      })
      getThis(this);
      this.quiry();
    },
    methods: {
//      <!--分页查询数据对象功能组合start-->
      quiry(){
        if(this.timeQuantum.length>0){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }
        if(this.timeQuantum2.length>0) {
          this.statisticsDateStartStr2 = this.$moment(this.timeQuantum2[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr2 = this.$moment(this.timeQuantum2[1]).format('YYYY-MM-DD');
        }
        this.getTableList(this.paramsData());
      },
      paramsData(){
        for(let key in this.inputParams){
          this.selectorBehindObj[key]=this.inputParams[key]
        }
        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "siteId":this.$getLocalStorage("enrolleeinfo")[0].id,
          "state":"04",
          "id":this.inputParams.orderNumber,
          "userPhoneNum":this.selectorBehindObj.userPhoneNum, //下订单手机号码
          "linkmanPhoneNum":this.selectorBehindObj.orderTel, //下订单手机号码
          "appointmentDatetimeStartStr":this.statisticsDateStartStr, //师傅工号
          "appointmentDatetimeEndStr":this.statisticsDateEndStr, //师傅工号
          "createTimeStartStr":this.statisticsDateStartStr2, //师傅工号
          "createTimeEndStr":this.statisticsDateEndStr2, //师傅工号
        }}
      },
      getTableList(params){
        let url=this.$apidomain+"/orderquery/findpage";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          if(data.code==='0000'){
            getTableListData(data);
          }else{
            alert(data.error)
          }
        })
      },
//      <!--分页查询数据对象功能组合end-->
//      <!--弹窗功能start-->
      orderDetails(item,index){
        this.orderDetailed.orderId = item.id;
        this.orderDetailed.isShow=true;
      },
      batchSendOrders(list){
        let newAr=[];
        console.log(list);
        list.forEach(v=>{
          if(v.isCheckboxList){
            newAr.push(v)
          }
        });
        console.log(newAr);
        if(newAr.length==0){
          alert("请选择需要分配的工单");
          return;
        }
        //一级分类 服务地址到区级别 时间不限制
        let isList = true;
        let flabel = "";
        let areaId = "";
        let str = "";
        newAr.forEach(v=>{
          if(""==flabel){
            flabel = v.fLabelBusiness;
          }
          if(""==areaId){
            areaId = v.linkmanAreaId.substring(0,4);
          }
          if(flabel != v.fLabelBusiness){
            isList = false;
          }
          if(areaId != v.linkmanAreaId.substring(0,4)){
            isList = false;
          }
          str += v.id+","
        });
        if(!isList){
          alert("所选择的分配的工单一级分类或服务区域不统一....");
          return ;
        }
        str = str.substring(0,str.length-1);
        console.log(str);
        this.sendOrders(newAr[0],null,str,false);
      },
      sendOrders(item,index,orderIds,type){
        this.isSendOrders.appointmentDatetime=item.appointmentDatetime;
        this.isSendOrders.skills=item.skills;
        this.isSendOrders.areaId=item.areaId;
        this.isSendOrders.orderIds=orderIds;
        this.isSendOrders.isShow=true;
        this.isSendOrders.isSiteShow=type;
      },
//      <!--弹窗功能end-->
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
      wholeSelector(data,currentState){ //全选
        selectorAll(data,currentState)
      },
      isCheckbox(data,index) {   //列表单选
        selectorCheck(data,index,this);
      },
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
