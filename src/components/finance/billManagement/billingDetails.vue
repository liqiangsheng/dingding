<template>
  <div>
      <div class="trackAlert_box">
        <!-- 查询 -->
        <div class="center">
              <div class="center_data">
                  <ul>
                      <li>
                           <span>工单号</span>
                          <el-input  placeholder="请输入工单号" v-model="gongdanhao" clearable></el-input>
                      </li>
                      <li>
                          <span>完成时间</span>
                           <el-date-picker
                            v-model="finishDate"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions0">
                            </el-date-picker>
                      </li>
                      <li>
                          <span>子渠道</span>
                          <el-select v-model="ziqudao" placeholder="请选择"  @change="selectChild(ziqudao)">
                            <el-option
                              v-for="(item,index) in ziqudaoList"
                              :key="index"
                              :label="item.name"
                              :value="item.name">
                            </el-option>
                          </el-select>
                      </li>                     
                  </ul>
              </div>
              <div class="btn">
                  <el-button type="primary" @click="primary">查询</el-button>
                  <el-button @click="reset">重置</el-button>
              </div>
          </div>
          <!-- 查询end -->
          <!-- 查询表格 -->
         <div class="tableList">
            <table border="0" cellspacing="0" >
                <thead>
                    <tr>
                        <th><el-checkbox v-model="checked" @change="wholeSelector(tableListData.list,checked)"></el-checkbox></th>
                        <th>序号</th> 
                        <th>工单号</th>
                        <th>完成时间</th>
                        <th>服务时长<img src="../../../../static/images/paixu.png"></th>
                        <th>服务区域</th>
                        <th>子渠道</th>
                        <th>工单总费用 (元)<img src="../../../../static/images/paixu.png"></th>
                        <th>待付款 (元)<img src="../../../../static/images/paixu.png"></th>
                        <th>操作</th>                     
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tableListData.list" :key="index">
                        <td><el-checkbox v-model="isCheckboxList[index]" @change="checkbox(index)"></el-checkbox></td>
                        <td>{{index+1}}</td>
                        <td>{{item.mainOrderId}}</td>      <!--工单号 -->
                        <td>{{item.createTime}}</td>     <!-- 完成时间-->
                        <td>{{item.workTimeLimit}}</td>   <!--服务时长 -->
                        <td>{{item.linkmanArea}}</td>               <!-- 服务区域-->
                        <td>{{item.officialPartnerSubsetName}}</td>                <!--子渠道 -->
                        <td>{{item.mainOrderTotalFee}}</td> <!-- 工单总费用-->
                        <td>{{item.pendingFee}}</td>        <!-- 待付款-->
                        <td>
                            <span @click="abnormal">异常</span>
                            <span class="track" @click="skip(item)">详情</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- 分页 -->
            <Pagination
            :data="pageData"
            :getTableList="getTableList"
            :paramsData="paramsData"
            :tableListData="tableListData"
            ></Pagination>
        </div>
      </div>
      <abnormal-note v-if="isAbnormal" @isClose="isClose"></abnormal-note>
      <work-order-details v-if="ordeShow" @isClose="isClose" :mainOrderId="mainOrderId"></work-order-details>
  </div>
</template>
<script>
  import workOrderDetails from "./alertInfo/workOrderDetails"
  import abnormalNote from "./alertInfo/abnormalNote"
  export default {
    components:{
        workOrderDetails,abnormalNote
    },
    data() {
      return {
        isAbnormal:false,      //异常备注显隐
        pickerOptions0:"",
        finishDate:"",         //完成时间
        mainOrderId:"",        //订单ID
        ordeShow:false,       //工单详情显隐
        isCheckboxList:[],  //全选,反选
        checked:false,      //全选,反选
        zhuqudao:[],         //主渠道
        tabSelect:"",
        qudaozhibao:"",
        ziqudao:"",
        ziqudaoId:"",
        ziqudaoList:[],
        gongdanhao:"",
        tel:"",
        date:"",      //日期范围
        userInformation:[],//用户信息
        detailInformation:{},//详情信息
        createTimeInformation:[],//时间信息
        isShow:false,  //备注显示消失
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
    watch:{
    },
    created(){
         let parameter = this.paramsData();
         parameter.dateTime = this.$store.state.billDateTime.billTime;
         //parameter.type =  this.$store.state.billDateTime.billType; 
         console.log(parameter,"参数")
         this.getTableList(parameter);
        

         const url = this.$common.apidomain+"/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo";
         this.$http.post(url).then(res=>{
             let data = res.data
             if(data.code==="0000"){
                 this.ziqudaoList=data.result;
                 //console.log(this.ziqudaoList,"子渠道信息")
             }else{
                 this.$queryFun.successAlert.call(this,data.error)
             }
         })
    },
    methods: {
            //全选,反选start
            checkbox(index){
                        this.$queryFun.isCheckbox.call(this,this.tableListData.list,index);
                    },
                    wholeSelector(item,currentState){
                        this.$queryFun.wholeSelector.call(this,item,currentState);
                    },
                //全选反选end
                //传回后台的参数
                paramsData(){
                    let dataTime=!this.finishDate?"":this.finishDate.getFullYear()+"-"+(this.finishDate.getMonth()+1)+"-"+this.finishDate.getDate()
                    return{
                        "officialPartnerSubsetId":this.ziqudaoId,  //子渠道Id
                        "mainOrderId":this.gongdanhao,              //工单号
                        "type":this.$store.state.billDateTime.billType, //日汇总,月汇总
                        "dateTime":dataTime
                    }
                },
                getTableList(params){
                    const url = `${this.$common.apidomain}/billManageController/allFlowing`
                    this.$http.post(url,params).then(res=>{
                        let data = res.data;
                        
                        if(data.code==="0000"){
                            this.tableListData = data.result;
                            this.pageData.total = data.result.total;
                            this.pageData.pageTotal = data.result.pages;
                            this.isCheckboxList = [];
                            this.tableListData.list.forEach((v,i) =>{
                                this.isCheckboxList.push(false);
                                this.tableListData.list[i].isCheckboxList = false;
                            })
                            console.log('账单结算明细',this.tableListData)
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
                primary(){
                  this.getTableList(this.paramsData());
                },
                //重置
                reset(){
                   this.gongdanhao="";
                   this.finishDate="";
                   this.ziqudao="";
                },
                //获取子渠道Id
                selectChild(value){                 
                this.ziqudaoList.forEach((v,i)=>{
                      if(v.name===value){
                        this.ziqudaoId=v.id;
                      }
                  })
                },
                isClose(v){
                   this.ordeShow= v;
                   this.isAbnormal=v;
                },
                abnormal(){
                   this.isAbnormal=true;
                },
                skip(data){
                    this.ordeShow=true;
                    this.mainOrderId = data.mainOrderId;
                    console.log(data,"工单详情")
                }
            },
    mounted() {
            },
    updated(){

            }
  }
</script>
<style scoped lang="scss">
  .trackAlert_box{
    width: 100%;
  }
  .center{
      margin-top:61px;
      margin-left:40px;
      font-size:14px;
      ul{
          display:flex;
          li{
              margin-right:36px;
              margin-bottom: 18px;         
          }
      }
      .center_data{
          .ivu-input{
              height:36px;
          }
          ul li>span{
              margin-right: 10px;
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
          margin-left:55px; 
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
          span:nth-of-type(1){
              margin-left:15px;
          }
      }
      }
   .tableList{
      margin-top:45px;
      border-bottom:1px solid #E0E6ED;
      .tableList table{
        width:100%;
        background:#FFFFFF;
      }
  }
  .tableList table{
      border-left:1px solid #E0E6ED;           
      font-size:14px;
      th,td{
          text-align:center;
          border-top:1px solid #E0E6ED;
          border-right:1px solid #E0E6ED;
      }
      tr{
            height:45px;
            td:nth-of-type(10){
                span{
                    width:62px;
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    display: inline-block;
                }
                color:#20A0FF;
                span:nth-of-type(1){
                    color: #E65831;
                    margin: 12px 0px 12px 0px
                }
            }
            span:hover{
                cursor:pointer;
            }
        }
        tr:hover{
            background:#DBF0FF;
        }
      thead{
        th{
            background:#E5E9F2;
            position: relative;
        }
        th:nth-of-type(1){
              width:60px;
        }
        th:nth-of-type(2){
              width:50px;
          }
        th:nth-of-type(3){
              width:230px;
          }
        th:nth-of-type(4){
              width:180px;
          }
        th:nth-of-type(5){
              width:120px;
                img{
                position: absolute;
                top:15px;
                right:10px;
              }
          }
        th:nth-of-type(6){
              width:170px;
          }
        th:nth-of-type(7){
              width:150px;
          }
        th:nth-of-type(8){
              width:140px;
                img{
                position: absolute;
                top:15px;
                right:5px;
              }
          }
        th:nth-of-type(9){
              width:140px;
               img{
                position: absolute;
                top:15px;
                right:10px;
              }
          }
        th:nth-of-type(10){
              width:182px;
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
