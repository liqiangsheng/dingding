<template>
  <div>
      <div class="trackAlert_box">
        <!-- 查询 -->
        <div class="center">
              <div class="center_data">
                  <ul>
                      <li>
                          <span style="display: inline-block;transform: translateY(-10px)">日期范围</span>
                          <Row style="display: inline-block">
                            <Col span="12">
                            <DatePicker type="daterange" confirm placement="bottom-end" placeholder="请选择日期"
                                        style="width: 200px;display: inline-block" v-model.trim="date"></DatePicker>
                            </Col>
                          </Row>
                      </li>
                      <li>
                          <span>渠道质保</span>
                        <el-select v-model.trim="qudaozhibao" placeholder="请选择">
                            <el-option
                              v-for="(item,index) in billState"
                              :key="index"
                              :label="item.name"
                              :value="item.name">
                            </el-option>
                          </el-select>
                      </li>
                      <li>
                          <span>子渠道</span>
                        <el-select v-model.trim="ziqudao" placeholder="请选择" @change="selectChild(ziqudao)">
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
              <div class="list">
                  <ul>
                      <li>
                           <span>工单号</span>
                        <el-input placeholder="请填写工单号" v-model.trim="gongdanhao" clearable></el-input>
                      </li>
                      <li>
                           <span>联系人手机号</span></span>
                        <el-input placeholder="请填写手机号" v-model.trim="tel" clearable></el-input>
                      </li>
                  </ul>
              </div>
              <div class="btn">
                  <el-button type="primary" @click="primary">查询</el-button>
                  <el-button @click="reset">重置</el-button>
              </div>
          </div>
          <!-- 查询end -->
          <div class="exporting" @click="derive">
            <img src="../../assets/images/daochugray.png">
            <span>导出表格</span>
          </div>
          <!-- 查询表格 -->
         <div class="tableList">
            <table border="0" cellspacing="0" >
                <thead>
                    <tr>
                      <th>
                        <el-checkbox v-model.trim="checked"
                                     @change="wholeSelector(tableListData.list,checked)"></el-checkbox>
                      </th>
                        <th>序号</th>
                        <th>创建时间 <img src="../../../static/images/paixu.png"></th>
                        <th>工单号</th>
                        <th>联系人</th>
                        <th>联系人手机</th>
                        <th>服务区域</th>
                        <th>工单总费用  (元)<img src="../../../static/images/paixu.png"></th>
                        <th>待付款元 ()<img src="../../../static/images/paixu.png"></th>
                        <th>渠道质保</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tableListData.list" :key="index">
                      <td>
                        <el-checkbox v-model.trim="isCheckboxList[index]" @change="checkbox(index)"></el-checkbox>
                      </td>
                        <td>{{index+1}}</td>
                        <td>{{item.createTime}}</td>      <!--创建时间 -->
                        <td>{{item.mainOrderId}}</td>     <!-- 工单号-->
                        <td>{{item.linkmanName }}</td>   <!--联系人 -->
                        <td>{{item.linkmanPhoneNum}}</td>               <!-- 联系人手机号-->
                        <td>{{item.linkmanArea}}</td>                <!--服务区域 -->
                        <td>{{item.mainOrderTotalFee}}</td> <!-- 工单总费用-->
                        <td>{{item.pendingFee}}</td>        <!-- 代付款-->
                        <td>{{item.channelWarranty|channelWarranty}}</td> <!--渠道质保 -->
                        <td>
                            <span class="track" @click="skip(item)">工单详情</span>
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
      <work-order-details v-if="ordeShow" @isClose="isClose" :mainOrderId="mainOrderId"></work-order-details>
  </div>
</template>
<script>
  import workOrderDetails from "./workOrderDetails";
  export default {
    components:{
        workOrderDetails
    },
    data() {
      return {
        mainOrderId:"",        //订单ID
        ordeShow:false,       //工单详情显隐
        isCheckboxList:[],  //全选,反选
        checked:false,      //全选,反选
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
        billState:[  //分类
                {"id":"","name":"所有"},
                {"id":"","name":"保内"},
                {"id":"","name":"保外"},
                ] ,
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
      parameter.type = this.$store.state.billDateTime.billType;
         //console.log(parameter,"参数")
         this.getTableList(parameter);
         let chiId = JSON.parse(localStorage.getItem('userInfo'))
         const url = this.$common.apidomain+'/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo?officialPartnerId='+chiId[0].id;
         this.$http.post(url).then(res=>{
             let data = res.data
             if(data.code==="0000"){
                 this.ziqudaoList=data.result;
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
                    const filterDate = e => this.$moment(this.date[e]).format("YYYY-MM-DD")==="Invalid date"?'':this.$moment(this.date[e]).format("YYYY-MM-DD");
                    const startTime = !this.date?"":filterDate(0);
                    const endTime = !this.date?"":filterDate(1);
                    let quality =''
                    if(this.qudaozhibao==="保内"){
                        quality=1;
                    }else if(this.qudaozhibao==="保外"){
                        quality=2;
                    }else{
                        quality='';
                    }
                    return{
                        "startDate":startTime,                  //开始时间
                        "endDate ":endTime,                      //结束时间
                        "channelWarranty":quality,              //渠道质保
                        "officialPartnerSubsetId":this.ziqudaoId,  //子渠道Id
                        "mainOrderId":this.gongdanhao,              //工单号
                        "phoneLastNumber":this.tel,                   //联系人手机号
                        "type":null, //日汇总,月汇总
                        "dateTime":null
                    }
                },
                getTableList(params){
                    const url = `${this.$common.apidomain}/billSettlementFlowing/all`
                    this.$http.post(url,params).then(res=>{
                        let data = res.data;
                        //console.log('账单结算明细',data)
                        if(data.code==="0000"){
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
                primary(){
                  this.getTableList(this.paramsData());
                },
                //重置
                reset(){
                  this.date="";
                  this.qudaozhibao="";
                  this.ziqudao="";
                  this.gongdanhao="";
                  this.tel="";
                },
                //导出
                //导出
                derive(){
                    let data  =[];
                    this.tableListData.list.forEach((v,i)=>{
                        if(v.isCheckboxList){
                            data.push(v.id);
                        }
                    });
                    if(data.length){
                        const ids = data.join(",");
                        const url = this.$common.apidomain+"/billSettlementFlowing/exportFile ";
                        this.$http.post(url,{ids}).then(res=>{
                            let data = res.data;
                            //console.log(data,"导出")
                            if(data.code==="0000"){
                                window.location =data.result;
                                this.$queryFun.successAlert.call(this,"导出成功","1")
                            }else{
                                this.$queryFun.successAlert.call(this,data.error);
                            }
                        })
                    }else{
                        this.$queryFun.successAlert.call(this,"请选择需要导出的选项");
                    }

                },
                //获取子渠道Id
      selectChild(value) {
                this.ziqudaoList.forEach((v,i)=>{
                      if(v.name===value){
                        this.ziqudaoId=v.id;
                      }
                  })
                },
                isClose(v){
                   this.ordeShow= v;
                },
                skip(data){
                    this.ordeShow=true;
                    this.mainOrderId = data.mainOrderId;
                    //console.log(data,"工单详情")
                }
            }
  }
</script>
<style scoped lang="scss">
  .trackAlert_box{
    width: 100%;
  }
  .center{
      margin-top:48px;
      margin-left:31px;
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
          margin-left:62px;
          .el-button{
              width:140px;
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
      //margin-top:45px;
      border-bottom:1px solid #E0E6ED;
      .tableList table{
        width:100%;
        background:#FFFFFF;
      }
  }
  .tableList table{
      width:100%;
    border-left: 1px solid #E0E6ED;
      font-size:14px;
      th,td{
          text-align:center;
          border-top:1px solid #E0E6ED;
          border-right:1px solid #E0E6ED;
      }
      tr{
            height:45px;
            td:nth-of-type(11){
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
              width:180px;
              img{
                position: absolute;
                top:15px;
                right:10px;
              }
          }
        th:nth-of-type(4){
              width:220px;
          }
        th:nth-of-type(5){
              width:100px;
          }
        th:nth-of-type(6){
              width:146px;
          }
        th:nth-of-type(7){
              width:130px;
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
                right:5px;
              }
          }
        th:nth-of-type(10){
              width:90px;
          }
        th:nth-of-type(11){
              width:165px;
          }

      }

  }
.exporting{
   margin:39px 0px 20px 21px;
   span{
       font-size: 14px;
       color:#888888;
       display: inline-block;
       transform:translateY(-4px);
   }
}
.exporting:hover{
    cursor: pointer;
}

</style>


