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
                  <el-button type="primary" round>查询</el-button>
                  <el-button>重置</el-button>
              </div>
          </div>
      </div>
      <div class="tableList">
          <table border="0" cellspacing="0" >
              <thead>
                  <tr>
                      <th><el-checkbox v-model="checked" @change="wholeSelector(dataList,checked)"></el-checkbox></th>
                      <th>记账周期 <img src="../../../static/images/paixu.png"></th>
                      <th>账单金额 (元) <img src="../../../static/images/paixu.png"></th>
                      <th>待结金额 (元)<img src="../../../static/images/paixu.png"></th>
                      <th>账单状态</th>
                      <th>结款状态 <img src="../../../static/images/jiekuan.png" alt=""></th>
                      <th>操作</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item,index) in dataList" :key="index">
                      <td><el-checkbox  v-model="isCheckboxList[index]" @change="checkbox(index)"></el-checkbox></td>
                      <td>{{item.date}}</td>
                      <td>{{item.money}}</td>
                      <td>{{item.daijie}}</td>
                      <td>{{item.billState}}</td>
                      <td>{{item.state}}</td>
                      <td>
                        <!-- <span class="track" @click="queryClick(item,index)">查看明细</span> -->
                        <span class="track" @click="jump()">查看明细</span>
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
       data(){
           return{
            isCheckboxList:[],  //全选,反选
            checked:false,      //全选,反选
            date:"",          //日期范围
            bill_state:"",    //账单状态
            kont_state:"",   //结款状态
            orderLabel:"",
            selone:"",
            tabSelect:"",
            queryShow:false,   //查询明细
            billState:[  //分类
                {"id":"","name":"唐三"},
                {"id":"","name":"凤舞"},
                {"id":"","name":"清瑶"},
                {"id":"","name":"碧血"},
                ] ,
            kontState:[
                {"id":"","name":"武庚"},
                {"id":"","name":"仓木"},
                {"id":"","name":"白雪"},
            ],
            dataList:[
                {"date":"2018/10/11","money":"120","daijie":"200","billState":"出账","state":"已结款","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","daijie":"200","billState":"出账","state":"已结款","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","daijie":"200","billState":"出账","state":"已结款","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","daijie":"200","billState":"出账","state":"已结款","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","daijie":"200","billState":"出账","state":"已结款","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","daijie":"200","billState":"出账","state":"已结款","operation":"查看明细"},
                 {"date":"2018/10/11","money":"120","daijie":"200","billState":"出账","state":"已结款","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","daijie":"200","billState":"出账","state":"已结款","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","daijie":"200","billState":"出账","state":"已结款","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","daijie":"200","billState":"出账","state":"已结款","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","daijie":"200","billState":"出账","state":"已结款","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","daijie":"200","billState":"出账","state":"已结款","operation":"查看明细"},
            ]
           }
       },
       created(){
         this.getTableList();
       },
       methods:{
           //全选,反选start
            checkbox(index){
                        this.$queryFun.isCheckbox.call(this,this.dataList,index);
                    },
                    wholeSelector(item,currentState){
                        this.$queryFun.wholeSelector.call(this,item,currentState);
                    },
             //全选反选end
             //表格数据请求
             getTableList(){
                this.isCheckboxList = [];
                this.dataList.forEach((v,i) =>{
                    this.isCheckboxList.push(false);
                    this.dataList[i].isCheckboxList = false;
                })
             },
             //页签跳转
            jump(state){
                let path=`/finance/bill/billSettlementDetails`;
                if(isPushPath(this.$store.state.tabPathList, path))this.$store.commit("pushTabPathList",{
                            path:`/finance/bill/billSettlementDetails`,
                            name:"账单结算明细"
                        });
                    this.$router.push({path});
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
</style>

