<template>
  <div class="month_sum">
      <div style="width: 100%;background: #ffffff">
          <div class="center">
              <div class="center_data">
                  <ul>
                     <li>
                          <span>对象类型</span>
                          <el-select v-model="object_type" placeholder="请选择" >
                            <el-option
                              v-for="(item,index) in objectType"
                              :key="index"
                              :label="item.name"
                              :value="item.name">
                            </el-option>
                          </el-select>
                      </li>
                      <li>
                          <span>账单状态</span>
                          <el-select v-model="bill_state" placeholder="请选择" >
                            <el-option
                              v-for="(item,index) in billState"
                              :key="index"
                              :label="item.name"
                              :value="item.name">
                            </el-option>
                          </el-select>
                      </li>
                      <li>
                          <span>结款状态</span>
                          <el-select v-model="kont_state" placeholder="请选择" >
                            <el-option
                              v-for="(item,index) in kontState"
                              :key="index"
                              :label="item.name"
                              :value="item.name">
                            </el-option>
                          </el-select>
                      </li>
                  </ul>
              </div>
              <div class="list">
                 <ul>
                    <li>
                          <span>对象编号</span>
                        <el-input
                            placeholder="请输入查询关键字"
                            v-model="objectCode"
                            clearable>
                        </el-input>
                    </li>
                     <li>
                        <span>金额大于</span>
                        <el-input
                            placeholder="请输入数字"
                            v-model="amount"
                            clearable>
                        </el-input>
                    </li>
                 </ul>
              </div>
              <div class="btn">
                  <el-button  @click="query">查询</el-button>
                  <el-button @click="reset">重置</el-button>
              </div>
          </div>
      </div>
      <div class="tableList">
          <table border="0" cellspacing="0" >
              <thead>
                  <tr>
                      <th v-for="(item,index) in tableTh" :key="index">{{item}}</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item,index) in tableListData.list" :key="index">
                      <td>{{index+1}}</td>
                      <td>{{item.bookkeepingTime}}</td>
                      <td>{{item.officialPartnerId}}</td>
                      <td>{{item.officialPartnerName}}</td>
                      <td>{{item.operationFee}}</td>
                      <td>{{item.pendingFee}}</td>
                      <td>{{item.billState|billState}}</td>
                      <td>{{item.junctionsState|kontState}}</td>
                      <td>{{item.createTime}}</td>
                      <td>
                        <p  v-if="item.junctionsState==='1'" @click="check(item)" :class="{active:item.junctionsState==='1','actives':false}">确认结款</p>
                        <p  v-if="item.junctionsState==='2'" @click="check(item)" :class="{active:false,actives:item.junctionsType==='2'}">{{item.junctionsType|billPayType}}</p>
                        <span class="track" @click="jump(item)">明细</span>
                      </td>
                  </tr>
              </tbody>
          </table>
          <!-- 分页 -->
          <!--分页 -->
            <Pagination
            :data="pageData"
            :getTableList="getTableList"
            :paramsData="paramsData"
            :tableListData="tableListData"
            ></Pagination>
      </div>
      <money v-if="isMoney" @isClose="isClose" :accountList='accountList'></money>
  </div>
</template>
<script>
    const isPushPath = (tabPathList,path) => !tabPathList.some( v => v.path === path);
    import money from "./alertInfo/money"
    export default{
       components:{
            money
        },
       props:["typeState"],
       data(){
           return{
            accountList:{},        //确认结款传给子组件ID
            isMoney:false,
            object_type:"",      //对象类型
            objectCode:"",      //对象编号
            amount:"",          //金额大于
            isCheckboxList:[],  //全选,反选
            checked:false,      //全选,反选
            date:"",          //日期范围
            bill_state:"",    //账单状态
            kont_state:"",   //结款状态
            tableTh:["序号","记账周期","渠道编号","渠道名称","账单金额 (元)","待结金额 ()","账单状态","结款状态","记账时间","操作"],       //表格头部
            billState:[  //账单状态
                {"id":"","name":"所有"},
                {"id":"2","name":"已出账"},
                {"id":"1","name":"未出账"}
                ] ,
            kontState:[ //结款状态
                {"id":"","name":"所有"},
                {"id":"2","name":"已结款"},
                {"id":"1","name":"未结款"},
            ],
            objectType:[
                {"id":"1","name":"渠道1"},
                {"id":"1","name":"渠道2"},
                {"id":"1","name":"渠道3"},
            ],
            //分页
              tableListData:{
                page:1,
                rows:20,
                startRow:0,
                pageTotal: 1,
                list:[]
                },
                pageData:{
                size:20,
                startRow:0,
                total:0,
                pageTotal:0,
                }
           }
       },
       created(){
        this.getTableList(this.paramsData())
       },
       methods:{
           //全选,反选start
            checkbox(index){
                        this.$queryFun.isCheckbox.call(this,this.tableListData.list,index);
                    },
                    wholeSelector(item,currentState){
                        this.$queryFun.wholeSelector.call(this,item,currentState);
                    },
             //全选反选end
             //传回后台参数
             paramsData(){
                 let billState,kontState
                 if(this.bill_state=="未出账"){
                     billState=1;
                 }else if(this.bill_state=="已出账"){
                     billState=2;
                 }else{
                     billState="";
                 }
                 if(this.kont_state=="未结款"){
                     kontState=1;
                 }else if(this.kont_state=="已结款"){
                     kontState=2;
                 }else{
                     kontState="";
                 }
                 return{
                     "officialPartnerId":this.objectCode,  //账单编号
                     "billState":billState,      //账单状态
                     "junctionsState":kontState,  //结款状态
                     "type":this.typeState ,             //汇总类型
                     "operationFee":this.amount         //金额大于
                 }
             },
             //表格数据请求
             getTableList(params){
                const url = `${this.$apidomain}/billManageController/all`;
                this.$http.post(url,params).then(res =>{
                    let data = res.data;
                    //console.log(data.result,"渠道账单结算月汇总流水列表");
                    if(data.code=="0000"){
                        this.tableListData = data.result;
                        this.pageData.total = data.result.total;
                        this.pageData.pageTotal = data.result.pages;
                        this.isCheckboxList = [];
                        this.tableListData.list.forEach((v,i) =>{
                            this.isCheckboxList.push(false);
                            this.tableListData.list[i].isCheckboxList = false;
                        })
                    }else{
                        this.$queryFun.successAlert.call(this,data.error);
                    }
                })
             },
             //查询
             query(){
                this.getTableList(this.paramsData());
             },
             //重置
             reset(){
               this.bill_state="";    //账单状态
               this.kont_state="";   //结款状态
               this.object_type="";
               this.objectCode="";
               this.amount="";
             },
             //页签跳转
            jump(state){
                let billData={};
                billData.billTime = state.bookkeepingTime;
                billData.billType = this.typeState;
                //console.log("传给账单详情参数",billData)
                let path=`/finance/billingDetails`;
                if(isPushPath(this.$store.state.tabPathList, path))this.$store.commit("pushTabPathList",{
                            path:`/finance/billingDetails`,
                            name:"账单明细"
                        });
                    this.$router.push({path});
                    this.$store.dispatch("billDateTime",billData);
                },
             isClose(v){
                this.isMoney=v;
             },
             check(data){
                // console.log(data.junctionsState,"状态")
                 if(data.junctionsState==="1"){
                   this.accountList = data;
                   this.isMoney = true;
                 }
                 
                // console.log(this.isMoney)
             }
       }
    }
</script>
<style scoped lang='scss'>
   .month_sum{
        width:100%;
        //display:flex;
        background:rgba(229,233,242,1);
   }
  .center{
      margin-top:41px;
      margin-left:31px;

      font-size:14px;
      ul{
          display:flex;
          li{
              margin-right:36px;
              margin-bottom: 18px;
              span{
                  margin-right: 14px;
              }
          }
      }
      .center_data{
          .ivu-input{
              height:36px;
          }
          ul li:nth-of-type(1){
              .ivu-select-dropdown{
                  left:0px !important;
              }
          }
          li:nth-of-type(2){
              margin-left:42px;
          }
      }
      .btn{
          margin-left:76px;
          .el-button{
              width:140px;
              margin-bottom: 40px;
              background: #A470CD;
              border: 1px solid #A470CD;
              color:#FFFFFF;
          }
          .el-button:nth-of-type(2){
              width:100px;
              background: #FFFFFF;
              color:#A470CD;
          }
      }
      .list{
          .el-input{
              width:200px;
          }
          ul>li:nth-of-type(2){
              margin-left:42px;
          }
      }
      }
  .tableList,.tableList table{
      width: 100%;
      background:#FFFFFF;
  }
  .tableList table{
      border-color:#E0E6ED;
      //border-spacing: 1px;
      color:#393939;
      font-size: 14px;
      border-bottom:1px solid #E0E6ED;
      border-left:1px solid #E0E6ED;
      th,td{
          text-align:center;
          border-top:1px solid #E0E6ED;
          border-right:1px solid #E0E6ED;
      }
      th{
          background:#E5E9F2;
          position: relative;
      }
      tr{
          height:45px;
          td:nth-of-type(10){
              color:#20A0FF;
              p{
                  width:80px;
                  height:30px;
                  line-height: 30px;
                  text-align: center;
                  font-size: 14px;
                  margin: 9px 38px 7px 39px;
                  color:#393939;
              }
              .active{
                  border-radius: 4px;
                  background:#A470CD;
                  color: #FFFFFF;
              }
              .actives{
                  background:#54BA82;
                  color: #FFFFFF;
                  border-radius: 4px;
              }
              span{
                  width: 62px;
                  height: 17px;
                  line-height: 17px;
                  margin:14px 40px 15px 0px;
                  display: inline-block;
              }
              span:hover{
                  cursor: pointer;
              }
          }
      }
      tr:hover{
         background:#DBF0FF;
      }
      thead{
           tr{
             height:45px;
             background:#E0E6ED;
             th:nth-of-type(1){
                 width:44px;
             }
             th:nth-of-type(2){
                 width:130px;
             }
             th:nth-of-type(3){
                 width:120px;
             }
             th:nth-of-type(4){
                 width:180px;
             }
             th:nth-of-type(5){
                 width:140px;

             }
             th:nth-of-type(6){
                 width:140px;
             }
             th:nth-of-type(7){
                 width:100px;
             }
             th:nth-of-type(8){
                 width:100px;
             }
             th:nth-of-type(9){
                 width:180px;
             }
             th:nth-of-type(10){
                 width:268px;
             }
          }
      }

  }
.paging{
      //margin-right:50px;
      font-size: 14px;
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
</style>

