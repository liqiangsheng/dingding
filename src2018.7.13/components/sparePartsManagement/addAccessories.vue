<template>
  <div id="app">
    <parseDetail v-show="!isParseDetail" @isOpen="isOpen" :isOkName="isOkName"></parseDetail>
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

                  </div>


                </div>
                <!--下拉列表结束-->

                <!--查询按钮-->
                <div class="footerBnt">
                  <el-button style="width: 160px" type="primary"  @click="quiry">查询</el-button>
                  <el-button  style="width: 100px" @click="reset">重置</el-button>
                  <el-button style="width:100px;float: right;margin-right: 100px" @click="exportOrder">导出</el-button>
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
                    <tr>
                      <!--序号-->
                      <td>
                        1
                      </td>
                      <!--配件名称-->
                      <td>
                        压缩机
                      </td>
                      <!--产品全称-->
                      <td>
                        空调-常见故障
                      </td>
                      <!--工单号-->
                      <td style=" word-break:break-all;text-align: left">
                        201805250932212541748235
                      </td>
                      <!--工程师信息-->
                      <td>
                        王永
                        <br>
                        17414785247
                      </td>
                      <!--申领时间-->
                      <td style="text-align: left">
                        2018-05-27 12:30:00
                      </td>
                      <!--取件方式-->
                      <td>
                        快递
                      </td>
                      <!--是否需返还旧件-->
                      <td>
                        是
                      </td>
                      <!--申领状态-->
                      <td>
                        待返还旧件
                      </td>
                      <!--操作-->
                      <td id="iconS">
                          <span @click="okAlter(name='申请通过')">通过</span>
                          <span style="color: #E65831" @click="okAlter(name='申请驳回')">驳回</span>
                          <span id="deliverGoods" @click="okAlter(name='发货')">发货</span>
                          <span id="okGoods" @click="okAlter(name='确认取件')">确认取件</span>
                          <span id="endGoods" @click="okAlter(name='完结')">完结</span>
                          <span id="detailGoods" @click="detailAlter(name='申领详情')">详情</span>
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
                  <!--表格数据结束-->
                </div>
                <OkAlter v-if="isOkParse" @isClose="isClose" :isOkName="isOkName"></OkAlter>

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
        isOkName:"",// 传title给okAlter
        isOkParse:false, //确定配件显示
        isParseDetail:true, //配件详情
        tableListData:{}, // 列表数据
        claimStatus:"", // 申领状态
        claimStatusArray:[
          {
            "id":"",
            "name":"--请选择--"
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
        theadsName:["序号","配件名称","产品全称","工单号","工程师信息","申领时间","取件方式","是否需返还旧件","申领状态","操作"],
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
    //跳轉路由前更新数据
    beforeRouteEnter(to,from,next){
      next(Vue=>{
//        Vue.quiry();
      })
    },
    beforeRouterLeave(to,from,next){
      next()
    },
    created(){

    },
    methods: {
      detailAlter(v){//配件详情
        this.isOkName = v;
        this.isParseDetail = !this.isParseDetail;
      },
      okAlter(v){//操作显示
        this.isOkName = v;
        this.isOkParse = true;
      },
      selectorOne(){ // 申领状态

      },
      reset(){// 重置

      },
      quiry(){ // 查询

      },
      exportOrder(){ // 导出

      },
      isClose(v){
        this.isOkParse = v;

      },
      isOpen(v){
        this.isParseDetail = v;
      },
      //分页查询 事件 start
      handleSizeChange(val) {      //每页显示多少条
        this.currentPageSize=val;
//        this.getTableList(this.paramsData());
      },
      handleCurrentChange(val) {
        this.showPages=val;
//        this.getTableList(this.paramsData());
      },
      firstPage(){
        if(  this.showPages===1 ){
          return alert("已经是第一页")
        }
        this.showPages=1;     //第一页
//        this.getTableList(this.paramsData());
      },
      lasePage(){
        if(this.showPages===this.pageTotal){
          return alert("已经是最后一页")
        }
        this.showPages=this.pageTotal; //最后一页
//        this.getTableList(this.paramsData());
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
        width:1700px;
        overflow: hidden;
        .selector_listLeft{
          margin-left: 54px;
          float: left;
          width: 1000px;
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


