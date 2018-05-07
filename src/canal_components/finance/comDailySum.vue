<template>
  <div class="month_sum">
      <div style="width: 100%;background:#FFFFFF;">
          <div class="center">
              <div class="block">
                <span class="demonstration">日期范围</span>
                <el-date-picker
                    v-model="date"
                    type="month"
                    placeholder="选择月">
                </el-date-picker>
              </div>
              <div class="btn">
                  <el-button type="primary" @click="primary()">查询</el-button>
              </div>
          </div>
      </div>
      <div class="tableList">
          <table border="0" cellspacing="0" >
              <thead>
                  <tr>
                      <th><el-checkbox v-model="checked" @change="wholeSelector(tableListData.list,checked)"></el-checkbox></th>
                      <th>记账周期<img src="../../../static/images/paixu.png"></th>
                      <th>预估收入<img src="../../../static/images/paixu.png"></th>
                      <th>已结收入</th>
                      <th>交易笔数</th>
                      <th>记账时间</th>
                      <th>操作</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item,index) in tableListData.list" :key="index">
                      <td><el-checkbox v-model="isCheckboxList[index]" @change="checkbox(index)"></el-checkbox></td>
                      <td>{{item.bookkeepingTime}}</td>
                      <td>{{item.forecastIncomeFee}}</td>
                      <td>{{item.earnedIncomeFee}}</td>
                      <td>{{item.transactionSize}}</td>
                      <td>{{item.createTime}}</td>
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
           // bill_state:"",    //账单状态
           // kont_state:"",   //结款状态
            orderLabel:"",
            queryShow:false,   //查询明细
             dateState:[  //分类
                {"id":"","name":"2015"},
                {"id":"","name":"2016"},
                {"id":"","name":"2017"},
                {"id":"","name":"2018"},
                ] ,
            billState:[  //分类
                {"id":"","name":"所有"},
                {"id":"","name":"未出账"},
                {"id":"","name":"已出账"},
                ] ,
            kontState:[
                {"id":"","name":"所有"},
                {"id":"","name":"未结款"},
                {"id":"","name":"已结款"},
            ],
            //分页
            tableListData:{
            pageNo:1,
            pageSize:20,  //每页显示多少条
            total:0,
            pageTotal: 1,
            list:[]
            },
            showPages:1,
            currentPageSize:20,
            total:0,
            pageTotal:0,
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
             //查询条件
             paramsData(){
               let log = this.date
               const dateTime =!this.data?"": log.getFullYear() + '-0' + (log.getMonth() + 1) 
               return {
                   "dataTime":dateTime,
                   "type":this.typeState
               }
             },
             //请求表格数据
             getTableList(params){              
                const url = `${this.$common.apidomain}/officialPartnerExtractSettlementController/all `;
                this.$http.post(url,params).then(res =>{
                    const data = res.data;
                    console.log(data,"提成结算");
                    if (data.code="0000") {
                        this.tableListData = data.result;
                    } else {
                        this.$queryFun.successAlert.call(this,data.error)
                    }
                })
                this.isCheckboxList = [];
                this.tableListData.list.forEach((v,i) =>{
                    this.isCheckboxList.push(false);
                    this.tableListData.list[i].isCheckboxList = false;
                })
             },
             //页签跳转
            jump(state){
                let comData={};
                comData.comTime = state.bookkeepingTime;
                comData.comType = this.typeState;
                let path=`/finance/commission/commissionSettlementDetails`;
                if(isPushPath(this.$store.state.tabPathList, path))this.$store.commit("pushTabPathList",{
                            path:`/finance/commission/commissionSettlementDetails`,
                            name:"提成结算明细"
                        });
                    this.$router.push({path});
                    this.$store.dispatch("comDateTime",comData);
                },
            //列表月份查询
            primary(date){
                this.getTableList(this.paramsData());
                
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
     // margin-bottom:50px;
     .demonstration{
         margin-right:12px;
     }
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
          margin: 18px 0px 0px 65px;
          height:100px;
          .el-button{
              width: 140px;
              margin-top: 18px;
              margin-bottom: 68px;
          }
      }
  }
  .tableList,.tableList table{
      //margin-top:50px;
      width: 100%;
      background:#FFFFFF;     
  }
  .tableList table{
      border-color:#E0E6ED;
      border-left:1px solid #E0E6ED;  
      border-bottom:1px solid #E0E6ED;     
      //border-spacing: 1px;
      color:#393939;
      font-size: 14px;
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
             }
             th:nth-of-type(5){
                 width:120px;
             }
             th:nth-of-type(6){
                 width:206px;
             }
             th:nth-of-type(7){
                 width:214px;
             }
          }
      }
     
  }
.paging{
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

