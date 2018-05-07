<template>
  <div class="month_sum">
      <div style="width: 100%;background: #ffffff">
          <div class="center">
              <div class="center_data">
                  <ul>
                      <li>
                          <span class="demonstration">日期范围</span>
                            <el-date-picker
                                v-model="date"
                                type="month"
                                placeholder="选择月">
                            </el-date-picker>
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
              <div class="btn">
                  <el-button type="primary" @click="query">查询</el-button>
                  <el-button @click="reset">重置</el-button>
              </div>
          </div>
      </div>
      <div class="tableList">
          <table border="0" cellspacing="0" >
              <thead>
                  <tr>
                      <th><el-checkbox v-model="checked" @change="wholeSelector(tableListData.list,checked)"></el-checkbox></th>
                      <th>记账周期 <img src="../../../static/images/paixu.png"></th>
                      <th>账单金额 (元) <img src="../../../static/images/paixu.png"></th>
                      <th>待结金额 (元)<img src="../../../static/images/paixu.png"></th>
                      <th>账单状态</th>
                      <th>结款状态 <img src="../../../static/images/jiekuan.png" alt=""></th>
                      <th>操作</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item,index) in tableListData.list" :key="index">
                      <td><el-checkbox  v-model="isCheckboxList[index]" @change="checkbox(index)"></el-checkbox></td>
                      <td>{{item.createTime}}</td>
                      <td>{{item.operationFee}}</td>
                      <td>{{item.pendingFee}}</td>
                      <td>{{item.billState|billState}}</td>
                      <td>{{item.junctionsState|kontState}}</td>
                      <td>
                        <!-- <span class="track" @click="queryClick(item,index)">查看明细</span> -->
                        <span class="track" @click="jump(item)">查看明细</span>
                      </td>
                  </tr>
              </tbody>
          </table>
          <!-- 分页 -->
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
</template>
<script>
    const isPushPath = (tabPathList,path) => !tabPathList.some( v => v.path === path);
    export default{
       components:{

        },
       props:["typeState"],
       data(){
           return{
            isCheckboxList:[],  //全选,反选
            checked:false,      //全选,反选
            date:"",          //日期范围
            bill_state:"",    //账单状态
            kont_state:"",   //结款状态
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
            //分页
             tableListData:{
                pageNo:1,
                pageSize:20,
                total:0,       //总条目数
                pageTotal: 1,
                list:[]
                },
                showPages:1,        //当前页数
                currentPageSize:20, //每页显示的条目个数
                total:0,
                pageTotal:0,        //总页数
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
                 const dateTime = !this.date?"":this.date.getFullYear() + '-0' + (this.date.getMonth() + 1) ;
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
                     "dateTime":dateTime,              //日期范围
                     "billState":billState,      //账单状态
                     "junctionsState":kontState,  //结款状态
                     "type":this.typeState              //汇总类型
                 }
             },
             //表格数据请求
             getTableList(params){
                const url = `${this.$apidomain}/officialPartnerBillSettlementController/all`;
                this.$http.post(url,params).then(res =>{
                    let data = res.data;
                    //console.log(data.result,"渠道账单结算流水列表");
                    if(data.code=="0000"){
                        this.tableListData = data.result;
                    }else{
                        this.$queryFun.successAlert.call(this,data.error);
                    }
                })

                this.isCheckboxList = [];
                this.tableListData.list.forEach((v,i) =>{
                    this.isCheckboxList.push(false);
                    this.tableListData.list[i].isCheckboxList = false;
                })
             },
             //查询
             query(){
                this.getTableList(this.paramsData());
             },
             //重置
             reset(){
               this.date="";          //日期范围
               this.bill_state="";    //账单状态
               this.kont_state="";   //结款状态
             },
             //页签跳转
            jump(state){
                let billData={};
                billData.billTime = state.createTime;
                billData.billType = this.typeState;
                console.log("传给账单详情参数",billData)
                let path=`/finance/bill/billSettlementDetails`;
                if(isPushPath(this.$store.state.tabPathList, path))this.$store.commit("pushTabPathList",{
                            path:`/finance/bill/billSettlementDetails`,
                            name:"账单结算明细"
                        });
                    this.$router.push({path});
                    this.$store.dispatch("billDateTime",billData);
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
      width:95%;
      margin-left:31px;
      margin-top:30px;
      .center_data{
          ul{
               display:flex;
              li{
                  float: left;
                  margin-right:36px;
                  color:#393939;
                  span{
                      font-size:14px;
                      margin-right:4px;
                  }
              }
          }
      }
      .btn{
          margin-left:65px;
          .el-button{
              width: 140px;
              margin-top: 18px;
              margin-bottom: 68px;
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
          td:nth-of-type(7){
              color:#20A0FF;
          }
          span:hover{
              cursor: pointer;
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
                 width:60px;
             }
             th:nth-of-type(2){
                 width:200px;
                 img{
                     position: absolute;
                     right:15px;
                     top:15px;
                 }
             }
             th:nth-of-type(3){
                 width:200px;
                 img{
                     position: absolute;
                     right:15px;
                     top:15px;
                 }
             }
             th:nth-of-type(4){
                 width:200px;
                 img{
                     position: absolute;
                     right:15px;
                     top:15px;
                 }
                 
             }
             th:nth-of-type(5){
                 width:146px;
    
             }
             th:nth-of-type(6){
                 width:160px;
                 img{
                     position: absolute;
                     right:15px;    
                     top:13.5px;
                 }
             }
             th:nth-of-type(7){
                 width:220px;
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

