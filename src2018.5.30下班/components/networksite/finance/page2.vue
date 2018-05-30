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
          <tr v-for="(item,index) in tableListData">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.statisticsStartDate|moment('YYYY-MM-DD')}}
            </td>
            <td>
              {{item.statisticsEndDate|moment('YYYY-MM-DD')}}
            </td>
            <td>
              {{item.revenue}}
            </td>
            <td>
              {{item.penalty}}
            </td>
            <td>
              {{item.award}}
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
    <div>
    </div>
  </div>
</template>
<script>
  export default {
    components:{
    },
    data() {
      return {
        //<!--弹窗基础数据start-->
        isDetailed:{
          title:"师傅详情",
          isShow:false
        },
        //<!--弹窗基础数据end-->
        //<!--搜索框筛选数据start-->
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
        masterName:"", //姓名
        //<!--搜索框筛选数据end-->
        //<!--搜索框与table与分页start-->
        checked:false,
        theadsName:[
          '序号',
          '起始时间',
          '终止时间',
          '工单营收（元）',
          '罚款（元）',
          '奖励（元）',
          '入账金额（元）',
          '提现时间'
        ],
        selectorBehindObj:{},
        tableListData:[],
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
            name:"本期收入"
          },{
            color:"green",
            sum:"0", //总用户量
            name:"上期收入"
          },{
            color:"green",
            sum:"0", //总用户量
            name:"累计收入"
          },
        ],
        //<!--顶部数据模板end-->
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
          "siteId":this.$getLocalStorage("enrolleeinfo")[0].id,
        }}
      },
      getTableList(params){
        let url=this.$apidomain+"/siteItem/findCapitalInfoList";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.tableListData = data.result;
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
        console.log(currentState);
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
          console.log(addDataAlert.selectorBehindObj);  //参数
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


