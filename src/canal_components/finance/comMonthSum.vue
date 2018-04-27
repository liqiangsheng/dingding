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
                  </ul>
              </div>
              <div class="btn">
                  <el-button type="primary">查询</el-button>
              </div>
          </div>
      </div>
      <div class="tableList">
          <table border="0" cellspacing="0" >
              <thead>
                  <tr>
                      <th><el-checkbox v-model="checked"></el-checkbox></th>
                      <th>记账周期<img src="../../../static/images/paixu.png"></th>
                      <th>预估收入<img src="../../../static/images/paixu.png"></th>
                      <th>已结收入</th>
                      <th>交易笔数</th>
                      <th>记账时间</th>
                      <th>操作</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item,index) in dataList" :key="index">
                      <td><el-checkbox v-model="checked"></el-checkbox></td>
                      <td>{{item.date}}</td>
                      <td>{{item.money}}</td>
                      <td>{{item.billState}}</td>
                      <td>{{item.state}}</td>
                      <td>{{item.billDate}}</td>
                      <td>
                          <span class="track" @click="queryClick(item,index)">查看明细</span>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
      <PoPup @isClose="isClose" v-if="queryShow"></PoPup>
  </div>
</template>
<script>
    import PoPup from "./comPupop"
    export default{
       components:{
        PoPup
       },
       data(){
           return{
            checked:"",
            date_state:"",   //年份选择
            //bill_state:"",    //账单状态
            //kont_state:"",   //结款状态
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
            dataList:[
                {"date":"2018/10/11","money":"120","billState":"222","state":"60","billDate":"2018/04/05 12:12:00","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","billState":"222","state":"60","billDate":"2018/04/05 12:12:00","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","billState":"222","state":"60","billDate":"2018/04/05 12:12:00","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","billState":"222","state":"60","billDate":"2018/04/05 12:12:00","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","billState":"222","state":"60","billDate":"2018/04/05 12:12:00","operation":"查看明细"},
                {"date":"2018/10/11","money":"120","billState":"222","state":"60","billDate":"2018/04/05 12:12:00","operation":"查看明细"},
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
             },
             queryClick(){
                 this.queryShow = true;
             },
             isClose(v){
                 this.queryShow = v;
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
      width: 100%;
      background:#FFFFFF;
  }
  .tableList table{
      border-color:#E0E6ED;
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
</style>

