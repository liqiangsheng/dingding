<template>
  <div class="month_sum">
      <div style="width: 100%;background: #ffffff">
          <div class="center">
              <div class="center_data">
                  <ul>
                      <li>
                         <span class="demonstration">年份选择</span>
                            <el-date-picker
                            v-model="date_state"
                            type="year"
                            placeholder="选择年">
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
                      <th>记账日期<img src="../../../static/images/paixu.png"></th>
                      <th>账单金额 (元)<img src="../../../static/images/paixu.png"></th>
                      <th>待结金额 (元)<img src="../../../static/images/paixu.png"></th>
                      <th>账单状态</th>                     
                      <th>结款状态<img src="../../../static/images/jiekuan.png" alt=""></th>
                      <th>操作</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item,index) in tableListData.list" :key="index">
                      <td><el-checkbox v-model="isCheckboxList[index]" @change="checkbox(index)"></el-checkbox></td>
                      <td>{{item.createTime}}</td>
                      <td>{{item.operationFee}}</td>
                      <td>{{item.pendingFee}}</td>
                      <td>{{item.billState|billState}}</td>
                      <td>{{item.junctionsState|kontState}}</td>
                      <td>
                          <!-- <span class="track" @click="queryClick()">查看明细</span> -->
                          <span class="track" @click="jump(item)">查看明细</span>
                      </td>
                  </tr>
              </tbody>
          </table>
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
            date_state:"",   //年份选择
            bill_state:"",    //账单状态
            kont_state:"",   //结款状态
             dateState:[  //分类
                {"id":"","name":"2015"},
                {"id":"","name":"2016"},
                {"id":"","name":"2017"},
                {"id":"","name":"2018"},
                ] ,
            billState:[  //账单状态
                {"id":"","name":"所有"},
                {"id":"","name":"已出账"},
                {"id":"","name":"未出账"},
                ] ,
            kontState:[ //结款状态
                {"id":"","name":"所有"},
                {"id":"","name":"已结款"},
                {"id":"","name":"未结款"},
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
         this.getTableList(this.paramsData());
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
             //传给后台参数
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
                    //console.log(data,"渠道账单结算流水列表");
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
              // console.log("参数",this.paramsData())
               this.getTableList(this.paramsData());
             },
             //重置
             reset(){
               this.bill_state="";
               this.date_state="";
               this.kont_state="";
             },
             //页签跳转
             jump(state){
                let billData={};
                billData.billTime = state.createTime;
                billData.billType = this.typeState;
                let path=`/finance/bill/billSettlementDetails`;
                if(isPushPath(this.$store.state.tabPathList, path))this.$store.commit("pushTabPathList",{
                            path:`/finance/bill/billSettlementDetails`,
                            name:"账单结算明细"
                        });
                    this.$router.push({path});
                    this.$store.dispatch("billDataTime",billData);
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
      width:95%;
      margin-left:31px;
      margin-top:30px;
      .center_data{
          ul{
               display:flex;
              li{
                  float: left;
                  margin-right:36px;
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
      border-right:1px solid #E0E6ED;
      th,td{
          text-align:center;
          border-top:1px solid #E0E6ED;
          border-left:1px solid #E0E6ED;
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
              cursor:pointer;
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
</style>

