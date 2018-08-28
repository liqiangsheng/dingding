<template>
  <div id="app">
    <parseDetail v-if="!isParseDetail" @isOpen="isOpen" :isOkName="isOkName"></parseDetail>
          <div v-show="isParseDetail" ><!--审核列表-->

              <div class="container">
                <!--下拉列表-->
                <div class="selector_list">

                  <div class="selector_listLeft">
                    <div class="list">
                      配件名称 :
                      <el-input
                        placeholder="请填写配件名称"
                        v-model.trim="inputParams.accessoriesName">
                      </el-input>
                    </div>
                    <!--分类-->
                    <div class="list">
                      分类 :
                      <el-select v-model.trim="orderLabel" placeholder="请选择分类" @change="selectorFnlei(orderLabel)">
                        <el-option
                          v-for="(item,index) in labeloptions2"
                          :key="index"
                          :label="item.name"
                          :value="item.name">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="list">
                      产品全称 :
                      <el-input
                        placeholder="请填写产品全称"
                        v-model.trim="inputParams.allProductName">
                      </el-input>
                    </div>
                    <div class="list">
                      工单号 :
                      <el-input
                        placeholder="请填写工单号"
                        v-model.trim="inputParams.orderName">
                      </el-input>
                    </div>
                    <div class="list">
                      工程师姓名 :
                      <el-input
                        placeholder="请填写工程师姓名"
                        v-model.trim="inputParams.engineerName">
                      </el-input>
                    </div>
                    <div class="list">
                      工程师手机号 :
                      <el-input
                        placeholder="请填写工程师手机号"
                        v-model.trim="inputParams.engineerPhone">
                      </el-input>
                    </div>
                    <div class="list">
                      申领时间 :
                      <el-date-picker
                        v-model.trim="timeQuantum"
                        type="daterange"
                        align="right"
                        placeholder="请选择申领时间"
                        :picker-options="pickerOptions2">
                      </el-date-picker>
                    </div>
                    <!--申领状态-->
                    <div class="list">
                      申领状态 :
                      <el-select v-model.trim="claimStatus" placeholder="请选择申领状态" @change="selectorOne(claimStatus)">
                        <el-option
                          v-for="item in claimStatusArray"
                          :key="item.id"
                          :label="item.name"
                          :value="item.name">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="list" >
                      工单渠道:
                      <el-input placeholder="请选择工单渠道                ▼"
                                @focus="showChannel" v-if="channelShow"></el-input>
                      <el-cascader id="labelIds"
                                   placeholder="请选择工单渠道"
                                   @change="changeSelector2"
                                   change-on-select
                                   :options="labeloptions"
                                    v-if="!channelShow"
                                   :props="prop"
                      ></el-cascader>
                    </div>
                    <div class="list">
                      渠道质保 :
                      <el-select v-model.trim="quality" placeholder="请选择渠道质保" @change="qualityClick(quality)">
                        <el-option
                          v-for="(item,index) in channelQuality"
                          :key="index"
                          :label="item.name"
                          :value="item.name">
                        </el-option>
                      </el-select>
                    </div>
                  </div>


                </div>
                <!--下拉列表结束-->

                <!--查询按钮-->
                <div class="footerBnt">
                  <el-button style="width: 160px" type="primary"  @click="quiry">查询</el-button>
                  <el-button  style="width: 100px" @click="reset">重置</el-button>
                  <!--<el-button style="width:100px;float: right;margin-right: 100px" @click="exportOrder">导出</el-button>-->
                </div>
                <!--查询按钮结束-->

                <!--table表格-->
                <div class="dable_lsit" >

                  <!--表格数据-->
                  <table cellSpacing="0px" cellpadding="0"  id="table">
                    <thead>
                        <tr class="theads">
                          <th v-for="(item,index) in theadsName">
                            {{item}}
                          </th>
                        </tr>
                    </thead>

                    <tbody>
                    <tr v-for="(item,index) in tableListData.list">
                      <!--序号-->
                      <td>
                        {{index+1}}
                      </td>
                      <!--配件名称-->
                      <td>
                        {{item.name}}
                      </td>
                      <!--分类-->
                      <td>
                        <span v-if="item.serviceMountings.coreMainOrder">{{item.serviceMountings.coreMainOrder.fLabelBusiness|FLabelBusinessShow}}</span>
                        <span v-if="!item.serviceMountings.coreMainOrder">无</span>
                      </td>
                      <!--产品全称-->
                      <td>
                        {{item.serviceMountings.serviceName}}
                      </td>
                      <!--工单号-->
                      <td>
                        {{item.serviceMountings.mainOrderId}}
                      </td>
                      <!--工单渠道-->
                      <td>
                        <span v-if="item.serviceMountings.coreMainOrder">{{item.serviceMountings.coreMainOrder.officialPartnerName?item.serviceMountings.coreMainOrder.officialPartnerName:"无"}}</span><span v-if="item.serviceMountings.coreMainOrder" v-show="item.serviceMountings.coreMainOrder.officialPartnerSubsetName">-{{item.serviceMountings.coreMainOrder.officialPartnerSubsetName}}</span>
                        <span v-if="!item.serviceMountings.coreMainOrder">无</span>
                      </td>
                      <!--渠道质保-->
                      <td>
                        <span v-if="item.serviceMountings.coreMainOrder">{{item.serviceMountings.coreMainOrder.channelWarranty|channelWarranty}}</span>
                        <span v-if="!item.serviceMountings.coreMainOrder">无</span>
                      </td>
                      <!--工程师信息-->
                      <td>
                        {{item.serviceMountings.coreMainOrder?item.serviceMountings.coreMainOrder.masterName:'无'}}
                        <br>
                        {{item.serviceMountings.coreMainOrder?item.serviceMountings.coreMainOrder.masterPhoneNum:'无'}}
                      </td>
                      <!--申领时间-->
                      <td>
                        {{item.createTime | moment('YYYY-MM-DD HH:mm:ss')}}
                      </td>
                      <!--取件方式-->
                      <td>
                       {{item.shippingType|ShippingType}}
                      </td>
                      <!--是否需返还旧件-->
                      <td>
                        {{item.returnOldMountings|ReturnOldMountings}}
                      </td>
                      <!--申领状态-->
                      <td>
                        {{item.state|parseState}}
                      </td>
                      <!--操作-->
                      <td id="iconS">
                          <span v-if="item.state == '10'" @click="okAlter(name='申领通过',item.id,item.name)">通过</span>
                          <span v-if="item.state == '10'"  style="color: #E65831" @click="okAlter(name='申请驳回',item.id,item.name)">驳回</span>
                          <span v-if="item.state == '20'" id="deliverGoods" @click="okAlter(name='发货',item.id,item.name)">发货</span>
                          <span v-if="item.state == '30'"  id="okGoods" @click="okAlter(name='确认取件',item.id,item.name)">确认取件</span>
                          <span v-if="item.state == '40'"id="endGoods" @click="okAlter(name='完结',item.id,item.name)">完结</span>
                          <span v-if="item.state == '10'||item.state == '20'||item.state == '30'||item.state == '40'||item.state == '50'||item.state == '60'||item.state == '70'"  id="detailGoods" @click="detailAlter(name='申领详情',item.id)">详情</span>
                      </td>

                    </tr>
                    </tbody>
                  </table>
                  <div class="paging">
                    <p class="home">总页数{{tableListData.pageNum}}/{{tableListData.pages}}</p>
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
                  <!--表格数据结束-->
                </div>
                <OkAlter v-if="isOkParse" @isClose="isClose" :isOkName="isOkName" :stateId="stateId" :parseName="parseName"></OkAlter>

              </div>

          </div>
    </div>
</template>
<script>
  import OkAlter from "./alter/okAlter.vue"
  import parseDetail from "./alter/parseDetail.vue"
  export default {
    components:{
      OkAlter,parseDetail
    },
    data() {
      return {
        channelShow:false, //渠道的内容消失影藏
        quality:'',//渠道质保
        channelQuality:[//选中的质保状态
          {
            id:'2',
            name:'--请选择--'
          },
          {
            id:'0',
            name:'质保外'
          },
          {
            id:'1',
            name:'质保内'
          },

        ],
        selectQuality:'',  //选中的质保状态
        channelID:'',               //主渠道ID
        officialPartnerSubsetId:'', //子渠道ID
        prop: {
          value: 'id',
          label: "name",
          children: 'childChannel'
        },
        labeloptions:[],  //渠道
        labeloptions2:[  //分类
          {
            "id":"",
            "name":"--请选择--"
          }
        ],
        orderLabel:"",  //分类
        selone:'',//分类
        parseName:"",
        stateId:"", // 弹窗的ID
        ParseDetailID:"", //详情传的ID
        isOkName:"",// 传title给okAlter
        isOkParse:false, //确定配件显示
        isParseDetail:this.$store.state.parseDetailiD?this.$store.state.parseDetailiD.isBool:true, //配件详情
        tableListData:{}, // 列表数据
        claimStatusId:"",// 申领状态
        claimStatus:"", // 申领状态
        claimStatusArray:[
          {
            "id":"",
            "name":"--请选择--"
          },
          {
            "id":10,
            "name":"待审核"
          },
          {
            "id":20,
            "name":"待发货"
          },
          {
            "id":30,
            "name":"待收货"
          },{
            "id":40,
            "name":"待返还旧件"
          },{
            "id":50,
            "name":"已完成"
          },{
            "id":60,
            "name":"已驳回"
          }
        ],
        inputParams:{
          accessoriesName:"",//配件名称
          allProductName: "", // 产品全称
          orderName: "",// 工单号
          engineerName: "",// 工程师姓名
          engineerPhone: "",// 工程师手机号
        },
        timeQuantum: [],//下单时间
        statisticsDateStartStr:"",//下单时间开始
        statisticsDateEndStr:"",//下单时间结束
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
            }]
        },
        theadsName:["序号","配件名称","分类","产品全称","工单号","工单渠道","渠道质保","工程师信息","申领时间","取件方式","是否已返还旧件","申领状态","操作"],
        tableList:{
          pageNo:1,
          pageSize:20,
          total:0,
          pageTotal: 1,
          masterInfos:[]
        },
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0,

      }
    },
    watch:{
      "$store.state.parseDetailiD.isBool":function(newl,oldl){ //监听工单详情配件列表传过来的id
        this.isParseDetail = newl;
      }
    },
    //跳轉路由前更新数据
    beforeRouteEnter(to,from,next){
      next(Vue=>{
        Vue.quiry();
      })
    },
    beforeRouterLeave(to,from,next){
      next()
    },
    created(){
        this.quiry();
      // 分类
      let url=this.$apidomain+"/common/findflabelbusinessname";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.labeloptions2=this.labeloptions2.concat(data.result);
      });
      //渠道
      this.labeloptions=[{name:'--请选择--',id:''},{name:'--全部渠道--',id:'1'},...this.$store.state.findchannel]
      this.labeloptions.forEach((obj,i)=>{
        this.$set(obj,'childChannel',[])
      })
    },
    methods: {
      showChannel(){ //渠道重置
        this.channelShow = false;
      },
      //渠道质保下拉
      qualityClick(item){
        this.channelQuality.forEach((obj,i)=>{
            if(item === obj.name){
              this.selectQuality = obj.id;
            }
          }
        )
      },
      //渠道下拉
      changeSelector2(value){
        let urls = this.$apidomain +"/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo?officialPartnerId=";

        this.$http.get(urls+value[0]).then(res =>{
          let data = res.data;
          if(data.code==='0000'){
            this.labeloptions.forEach((obj,i)=>{
              obj.childChannel=obj.id===value[0]?data.result:[]
            })
          }

        })

        if(value.length=='1'){
          this.channelID = value[0];
          this.officialPartnerSubsetId='';
        }else if(value.length=='2'){
          this.officialPartnerSubsetId=value[1];
          this.channelID=''
        }else{
          this.channelID ="";
          this.officialPartnerSubsetId='';
        }

      },
      selectorFnlei(item){       //分类选中后的下拉列表
        this.labeloptions2.forEach(v=>{
          if(v.name==item){
            this.selone=v.id
          }
        })
      },

      detailAlter(v,data){//配件详情
        this.isOkName = v;
        this.isParseDetail = !this.isParseDetail;
        this.$store.dispatch("parseDetailiD",{id:data,isBool:false,name:"申领详情"})
      },
      okAlter(v,id,name){ //操作显示
        this.isOkName = v;
        this.isOkParse = true;
        this.stateId = id;
        this.parseName = name;
      },
      selectorOne(v){ // 申领状态
        this.claimStatusArray.forEach((item,index)=>{
            if(item.name === v){
              this.claimStatusId = item.id;
            }
        })
      },
      reset(){// 重置
        this.channelShow = true;
        this.inputParams.allProductName = "";
        this.inputParams.accessoriesName = "";
        this.inputParams.orderName ="";
        this.inputParams.engineerName = "";
        this.inputParams.engineerPhone = "";
        this.statisticsDateStartStr = "";
        this.statisticsDateEndStr = "";
        this.timeQuantum = [];
        this.claimStatus = "";
        this.claimStatusId = "";
        this.orderLabel = '';
        this.selone='';
        this.quality ="";
        this.selectQuality='';
        this.channelID=''
        this.officialPartnerSubsetId='';
        this.quiry();
      },
      isClose(v){ //弹窗关闭
        this.isOkParse = v;
        this.quiry();
      },
      isOpen(v){ //配件详情弹出关闭
        this.isParseDetail = v;
      },
      quiry(){ // 查询
        this.getTableList(this.paramsData());
      },
      getTableList(params){ //列表分页数据
        let url=this.$common.apidomain+"/mountingsApply/findMountingsApply";
        this.$http.post(url,params).then(res=>{
          if(res.data.code==='0000'){
             this.tableListData = res.data.result;
             console.log(this.tableListData)
            this.tableListData.list.forEach((item,index)=>{})
            this.showPages = res.data.result.pageNum;
            this.currentPageSize = res.data.result.pageSize;
            this.total = res.data.result.total;
            this.pageTotal = res.data.result.pageTotal;
          }else{
            this.$queryFun.successAlert.call(this,res.data.error)
          }
        })
      },
      paramsData(){// 请求参数的参数
        if(this.timeQuantum.length>0){
          this.statisticsDateStartStr = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
        }
        return {
            "page":JSON.stringify(this.showPages), //分页
            "rows":JSON.stringify(this.currentPageSize),//分页
            "name":this.inputParams.accessoriesName,   //配件名称
            "serviceName":this.inputParams.allProductName,   //产品名称
            "mainOrderId":this.inputParams.orderName,   //工单号
            "masterName":this.inputParams.engineerName,   //工程师姓名
            "masterPhoneNum":this.inputParams.engineerPhone,   //工程师手机号
            "startTime":this.statisticsDateStartStr,   //申领时间范围开始
            "endTime":this.statisticsDateEndStr,   //申领时间范围结束
            'fLabelBusiness':this.selone, //分类
            "state":this.claimStatusId, //申领状态
            'officialPartnerId':this.channelID,                     //主渠道
            'officialPartnerSubsetId':this.officialPartnerSubsetId,  //子渠道
            'channelWarranty':this.selectQuality ,                      //质保
          }
      },
      exportOrder(){ // 导出

      },
      //分页查询 事件 start
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
    },
    mounted() {

    },
  }
</script>
<style scoped lang="scss">
  @import "../../assets/styles/comminStyle";
  #app{
    .container{
      height: 100%;
      >.selector_list{
        margin-top:0;
        //width:1700px;
        overflow: hidden;
        .selector_listLeft{
          margin-left: 54px;
          float: left;
          width: 1200px;
          .list{
            padding-top: 5px;
            width: 200px;
            float: left;
            margin-left: 13px;
            .el-input{
              width: 200px;
            }
          }
        }

      }
      >.footerBnt{
        margin-left: 67px;
        margin-top: 20px;
        width: 100%;
      }
      #table {
        .theads {
           height: 60px;
           th:nth-of-type(4){
             width: 160px;
          }
         th:nth-of-type(6) {
            width: 110px;
          }
        }
      }
      #iconS{
        span{
          cursor:pointer;
          display: inline-block;
          font-family:PingFangSC-Regular;
          color: #23A1FE;
          line-height: 25px;
          font-size:13px;
          margin-right: 22px;
        }
        #deliverGoods{
           width: 66px;
          height: 30px;
          text-align: center;
          color:rgba(255,255,255,1);
          background: #54BA82;
          border-radius:4px;
        }
        #okGoods{
          width: 66px;
          height: 30px;
          text-align: center;
          color:rgba(255,255,255,1);
          background: #E67D55;
          border-radius:4px;
        }
        #endGoods{
          width: 66px;
          height: 30px;
          text-align: center;
          color:rgba(255,255,255,1);
          background: #4A90E2;
          border-radius:4px;
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
    >tbody{

    }
  }

  #orderId{
    word-break: break-all;
    /*color: #393939;*/
  }
  .activeOrder{
    color:#6C6C6C ;
  }
</style>


