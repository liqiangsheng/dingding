<template>
  <div id="app">
    <div class="container" >
      <div class="selector_list">
        <div class="list">
          流水单号 :
          <el-input
            placeholder="请填写流水单号 "
            v-model.trim="selectorBehindObj.runningNumber">
          </el-input>
        </div>
        <div class="list">
          订单号 :
          <el-input
            placeholder="请填写订单号"
            v-model.trim="selectorBehindObj.unmber">
          </el-input>
        </div>
        <div  v-for="(item,index) in optionList" :key="index" class="list">
          {{item.name}} :
          <el-select
            v-model.trim="item.SourceTypeValue" :disabled="item.disabled" :placeholder="'请选择'+item.name"
            @change="selector(item,item.SourceType,item.SourceTypeValue)">
            <el-option
              v-for="items in item.SourceType"
              :key="items.name"
              :value="items.name"
            >
            </el-option>
          </el-select>
        </div>
        <!--城市-->
        <div class="list">
          选择交易日期：
          <el-date-picker
            v-model.trim="timeQuantum"
            type="daterange"
            align="right"
            placeholder="请选择交易日期"
            :picker-options="pickerOptions2"
           >
          </el-date-picker>
        </div>
        <!--手机号码-->
      </div>
      <!--查询按钮-->
      <div class="btn">
        <el-button  @click="quiry">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </div>

      <div class="derive"  style="text-align: right" v-if="0!=tableListData.payAll||0!=tableListData.refundAll">
         订单总数:<span style="color: blue">{{tableListData.orderSum}}</span>已支付:<span style="color: green">{{tableListData.payAll}}</span>    已退款:<span style="color: red">{{tableListData.refundAll}}</span>
		 实收款:<span style="color: orange">{{tableListData.netAll}}</span>
      </div>
      <div class="dable_lsit">
        <!--导出-->
        <div class="table_box">
          <table cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">
              {{item}}
              <seqencing-icon v-if="$queryFun.sortFun(index,sortData)" :data="$queryFun.sortFun(index,sortData)" :getTableList="getTableList" :params="paramsData()" ></seqencing-icon>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.faPayJournalAccounts">
            <td>
             {{index+1}}
            </td>
            <td>
              {{item.createTime | moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td>
              <!--{{item.payType==='Pay'?item.journalAccountNum:item.thirdpartyOutRefundNo}}-->
              {{item.id}}
            </td>
            <td>
              {{item.payType|payTypeShow}}
            </td>
            <td>
              {{item.mainOrderNum}}
            </td>
              <td> {{item.payType==='Pay'?item.payAmount:item.refundFee}}</td>
            <td>
              {{item.paySource|paySourceShow}}
            </td>
            <td>
              {{item.feeType|feeTypeFaShow}}
            </td>
            <td>
              <span v-if="item.payType==='Refund'">
                {{item.payState|parState}}
              </span>
              <span v-else>
                {{item.payState|payStateShow}}
              </span>
            </td>
          </tr>
          </tbody>
        </table>
        </div>
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
    <div>
    </div>
  </div>
</template>
<script>
  import userSum from "./userSum.vue"
  export default {
    components:{
      userSum
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
        detailedIsShow:{
          isShow:false
        },
        textareaContent:"",
        isEdit:true,
        alertForbiddenList:[],
        dialogTableVisible: false,
        text:{
          forbidden:"禁用",
          recover:"恢复"
        },
        currentPage4: 1,
        checked:false,
        theadsName:[
          '序号',
          '交易时间',
          '流水号',
          '流水类型',
          '订单号',
          '交易金额',
          '交易方式',
          '费用类型',
          '交易状态',
        ],
        sortData: [
          {
            index:5,
            sortAscendingValues:[" pay_amount asc "],  //升序
            gradeDownValues:[" pay_amount desc "],     //降序
          }
        ],
        isClose:false,
        Date:"",
        isForbidden:false,
        cityId:"", //城市id
        isAlert:this.$store.state.isAlert,
        isActive:"0",   //选中的
        //流水  sum   start
        userSum:[
          {
            sum:"0",
            color:"blue",
            name:"昨日流水",
            order:"0"
          },{
            color:"green",
            sum:"0", //总用户量
            name:"昨日收入"
          },{
            color:"#7ed2df",
            sum:"0", //总用户量
            name:"昨日支出"
          }
        ],
        //流水  sum   end
        optionList:[       //下拉列表数据
          {
            name:"交易方式",
            key:"paySource",
            SourceTypeValue: '', //选中后的
            SourceType:this.$store.state.payment,
          },
          {
            name:"流水类型",
            key:"payType",
            SourceTypeValue: '', //选中后的
            SourceType:[
              {
                name:"--请选择--",
                id:""
              },
              {
                name:"支付",
                id:"Pay"
              },
              {
                name:"退款",
                id:"Refund"
              },
              {
                name:"返现",
                id:"Reappearance"
              },
              {
                name:"上缴",
                id:"MasterTurn"
              }
            ],
          },
          {
            name:"交易状态",
            key:"payState",
            disabled:false,
            SourceTypeValue: '', //选中后的
            SourceType:[
              {
                name:"--请选择--",
                id:""
              },
              {
                name:"已支付",
                id:"Pay"
              },
              {
                name:"未支付",
                id:"Refund"
              },
              {
                name:"已退款",
                id:"Pay"
              },
              {name:"未退款",
                id:"Refund"
              }
            ]
          }
        ],
        selectorBehindObj:{},
        tableListData:{
          pageNo:1,
          pageSize:20,
          total:0,
          pageTotal: 1,
          faPayJournalAccounts:[]
        },
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0,
      }

    },created(){
      this.quiry(false);
      let urlCount=this.$apidomain+"/faPayJournalAccount/countRevenueList";
      this.$http.get(urlCount).then(r=>{
        let data=r.data;
        this.userSum.forEach((v)=>{
          if("昨日流水"==v.name){
            v.sum = data.result.TotalFlowYesterday;
          }else if("昨日收入"==v.name){
            v.sum = data.result.IncomeYesterday;
          }else if("昨日支出"==v.name){
            v.sum = data.result.OutcomeYesterday;
          }
        });
      });
    },
    methods: {
//      <!--分页查询数据对象功能组合start-->
      quiry(isTime){
        if(isTime){
          if(this.timeQuantum&&(this.timeQuantum[0]!=this.timeQuantum[1])){
            this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
            this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
          }else{
            this.statisticsDateStartStr = "";
            this.statisticsDateEndStr ="";
          }
        }
        //console.log('1222222222')
        this.getTableList(this.paramsData());
      },
      //重置
      reset(){
        for(var key in this.selectorBehindObj){
       this.selectorBehindObj[key]="";
        }
        this.optionList.forEach((obj,i)=>{
          obj.SourceTypeValue = "";
        })
        this.timeQuantum = [];
        this.getTableList(this.paramsData());
      },
      paramsData(){
//           let a="",b="",c="";
//            if(this.selectorBehindObj.payType==='Reappearance'){
//              a="Reappearance"
//              c = "";
//            }else{
//              a=""
//              c = this.selectorBehindObj.payType;
//            }
//        if(this.selectorBehindObj.payType==='MasterTurn'){
//          b="MasterTurn"
//          c="";
//        }else{
//          b="";
//          c=this.selectorBehindObj.payType;
//        }
          return {
            params: {
              "pageNo":JSON.stringify(this.showPages),
              "pageSize":JSON.stringify(this.currentPageSize),
              "journalAccountNum":this.selectorBehindObj.runningNumber,
              "mainOrderNum":this.selectorBehindObj.unmber,
              "paySource":this.selectorBehindObj.paySource,
              "statisticsDateStartStr":this.statisticsDateStartStr,
              "statisticsDateEndStr":this.statisticsDateEndStr,
              "payState":this.selectorBehindObj.payState,
              "payType":this.selectorBehindObj.payType,
//              "refundType":a,
//              "feeType":b,
            }
          }
      },
      getTableList(params){
        let url=this.$apidomain+"/faPayJournalAccount/findPage";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.tableListData = data.result;
          console.log(this.tableListData,'列表详情')
          this.showPages = data.result.pageNo;
          this.currentPageSize = data.result.pageSize;
          this.total = data.result.total;
          this.pageTotal = data.result.pageTotal;
        })
      },
//      <!--分页查询数据对象功能组合end-->
// 查询数据 start
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
       /* if(item.name === "流水类型"){
          this.optionList[2].SourceTypeValue = "";
          if(item.SourceTypeValue === "支付"){
            this.optionList[2].SourceType=[{name:"--请选择--",id:""},{ name:"已支付",id:"Pay"},{name:"未支付",id:"Refund"}]
            this.optionList[2].disabled = false;
          }else if(item.SourceTypeValue === "退款"){
            this.optionList[2].disabled = false;
            this.optionList[2].SourceType=[{name:"--请选择--",id:""},{ name:"已退款",id:"Pay"},{name:"未退款",id:"Refund"}]
          }else{
            this.optionList[2].disabled = true;
          }

        }*/
        values.forEach((v,i)=>{
          if(v.name===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        })
      },
 //查询数据 send



      confirmForbidden(item,textContent){ //确定拒绝
        let o={};
        item.forEach((v)=>{
          if(v.selector===true){
            o.refuseContent=v.name
          }
        });
        if(textContent){
          o.refuseContentText=textContent; //内容
        }
        this.dialogTableVisible=false;
        this.$store.commit("sendRefuseData",o);   //通过vux 传递数据
//        alert("禁用成功")
      },
      accomplish(prams){ //完成编辑
        this.isEdit=true;
        this.$store.commit("edit",false);
      },
      edit(){  //编辑
        this.isEdit=false;
        this.$store.commit("edit",true)
      },

      selectorForbidden(item,index){
        this.alertForbiddenList.forEach((v)=>{
          v.selector=false;
        });
        item.selector=!item.selector;

      },
      selectorArea(item,values,SourceTypeValue){
        let key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        });
      },
      isCheckbox(data,checkedAll){
        if(!data.checked){
          this.checked=false;
          return;
        }
        checkedAll.forEach((v,i)=>{
          this.checked=v.checked;
        })
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
        if(this.showPages===1){
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
      forbidden(){
        this.isForbidden=true;
        this.isClose=false;
        this.dialogTableVisible=true;
      },
      close(){
        this.isClose=true;
        this.isForbidden=false;
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
  #app{
    .container{
      .table_box{
        width:100%;
        //overflow-x: auto;
        >table{
         // width:100vw;
        }
      }
      .btn{
        margin-left:76px;
        .el-button{
          width:140px;
          margin-bottom: 40px;
        }
        .el-button:nth-of-type(1){
          background: #A470CD;
          border: 1px solid #A470CD;
          color:#FFFFFF;
        }
        .el-button:nth-of-type(2){
          width:100px;
        }
        .el-button:nth-of-type(2):hover{
          color: #A470CD;
          border: 1px solid #A470CD;
        }
      }
    }
    .list{
      width:327px;
    }
  }

</style>






