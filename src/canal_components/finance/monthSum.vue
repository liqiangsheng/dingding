<template>
  <div class="month_sum">
      <div style="width: 100%;background: #ffffff">
          <div class="center">
              <div class="center_data">
                  <ul>
                      <li>
                         <span>年份选择</span>
                          <el-select v-model="date_state" placeholder="请选择" @change="selectorOne(date_state)">
                            <el-option
                              v-for="item in dateState"
                              :key="item.id"
                              :label="item.name"
                              :value="item.name">
                            </el-option>
                          </el-select>
                      </li>
                      <li>
                          <span>账单状态</span>
                          <el-select v-model="bill_state" placeholder="请选择" @change="selectorOne(bill_state)">
                            <el-option
                              v-for="item in billState"
                              :key="item.id"
                              :label="item.name"
                              :value="item.name">
                            </el-option>
                          </el-select>
                      </li>
                      <li>
                          <span>结款状态</span>
                          <el-select v-model="kont_state" placeholder="请选择" @change="selectorOne(kont_state)">
                            <el-option
                              v-for="item in kontState"
                              :key="item.id"
                              :label="item.name"
                              :value="item.name">
                            </el-option>
                          </el-select>
                      </li>
                  </ul>
              </div>
              <div class="btn">
                  <el-button type="primary">查询</el-button>
                  <el-button>重置</el-button>
              </div>
          </div>
      </div>
      <div class="tableList">
          <table border="1" cellspacing="0" >
              <thead>
                  <tr>
                      <th><input type="checkbox"/></th>
                      <th>记账日期</th>
                      <th>账单金额 (元)</th>
                      <th>账单状态</th>
                      <th>结款状态</th>
                      <th>操作</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item,index) in dataList" :key="index">
                      <td><input type="checkbox"/></td>
                      <td>{{item.date}}</td>
                      <td>{{item.money}}</td>
                      <td>{{item.billState}}</td>
                      <td>{{item.state}}</td>
                      <td>{{item.operation}}</td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>
<script>
    export default{
       components:{

       },
       data(){
           return{
            orderLabel:"",
             dateState:[  //分类
                {"id":"","name":"2015"},
                {"id":"","name":"2016"},
                {"id":"","name":"2017"},
                {"id":"","name":"2018"},
                ] ,
            billState:[  //分类
                {"id":"","name":"旭日"},
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
                {"date":"2018/10/11","money":"120","billState":"出账","state":"已结款","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","billState":"出账","state":"已结款","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","billState":"出账","state":"已结款","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","billState":"出账","state":"已结款","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","billState":"出账","state":"已结款","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","billState":"出账","state":"已结款","operation":"查看明细"},
            ]
           }
       },
       methods:{
            selectorOne(item){       //选中后的下拉列表
                this.labeloptions2.forEach(v=>{
                if(v.name==item){
                    this.selone=v.id
                }
                })
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
      th,td{
          text-align:center;
      }
      tr{
          height:45px;
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
             }
             th:nth-of-type(3){
                 width:200px;
             }
             th:nth-of-type(4){
                 width:146px;
             }
             th:nth-of-type(5){
                 width:160px;
             }
             th:nth-of-type(6){
                 width:420px;
             }
          }
      }
     
  }
</style>

