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
                                <DatePicker type="daterange" confirm placement="bottom-end" placeholder="请选择日期" style="width: 200px;display: inline-block" v-model="date"></DatePicker>
                            </Col>
                          </Row>
                      </li>
                      <li>
                          <span>结款状态</span>
                          <el-select v-model="jiekuanzhuangtai" placeholder="请选择" >
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
                          <el-select v-model="ziqudao" placeholder="请选择" @change="selector(ziqudao)">
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
                          <el-input  placeholder="请输入工单号" v-model="gongdanhao"></el-input>
                      </li>
                      <li>
                           <span>手机尾号</span></span>
                          <el-input  placeholder="请输入手机后四位" v-model="tel"></el-input>
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
                        <th><el-checkbox v-model="checked" @change="wholeSelector(dataList,checked)"></el-checkbox></th>
                        <th>序号</th>
                        <th>创建时间 <img src="../../../static/images/paixu.png"></th>
                        <th>工单号</th>
                        <th>联系人</th>
                        <th>手机尾号</th>
                        <th>服务区域</th>
                        <th>预估收入 (元)<img src="../../../static/images/paixu.png"></th>
                        <th>结款状态</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tableListData.list" :key="index">
                        <td><el-checkbox v-model="isCheckboxList[index]" @change="checkbox(index)"></el-checkbox></td>
                        <td>{{index+1}}</td>
                        <td>{{item.createTime}}</td>   <!-- 创建时间-->
                        <td>{{item.mainOrderId}}</td>   <!--工单号 -->
                        <td>{{item.linkmanName}}</td>              <!--联系人 -->
                        <td>{{item.phoneLastNumber}}</td>              <!--手机尾号 -->
                        <td>{{item.linkmanArea}}</td>              <!-- 服务区域-->
                        <td>{{item.forecastIncomeFee}}</td>  <!--预估收入 -->
                        <td>{{item.knotState|kontState}}</td>  <!--结款状态 -->
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
  </div>
</template>
<script>
  export default {
    props:[],
    components:{
    },
    data() {
      return {
        isCheckboxList:[],  //全选,反选
        checked:false,      //全选,反选
        jiekuanzhuangtai:'',
        ziqudao:"",
        ziqudaoList:[],
        ziqudaoId:"",
        date:"",          //日期范围
        gongdanhao:"",
        tel:"",
        isShow:false,  //备注显示消失
        billState:[  //分类
                {"id":"","name":"所有"},
                {"id":"","name":"已结款"},
                {"id":"","name":"未结款"}
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
        parameter.dateTime = this.$store.state.comDateTime.comTime;
        parameter.type = this.$store.state.comDateTime.comType;
        this.getTableList(parameter);
        let chiId = JSON.parse(sessionStorage.getItem("userInfo"));
        const url = this.$common.apidomain+'/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo?officialPartnerId='+chiId[0].id;
        this.$http.post(url).then(res=>{
            let data = res.data;
            if(data.code="0000"){
                this.ziqudaoList = data.result;
            }else{
                this.$queryFun.successAlert.call(this,data.error);
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
                    if(this.jiekuanzhuangtai==="未结款"){
                        quality=1;
                    }else if(this.jiekuanzhuangtai==="已结款"){
                        quality=2;
                    }else{
                        quality='';
                    }
                    return{
                        "startDate": startTime,
                        "endDate":endTime,
                        "knotState":quality,
                        "officialPartnerSubsetId":this.ziqudaoId,
                        "mainOrderId":this.gongdanhao,
                        "userPhoneNum":this.tel,
                        "type":null,
                        "dateTime":null
                    }

             },
             getTableList(params){
                const url = this.$common.apidomain +"/extractSettlementFlowing/all"
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
                       // console.log("提成查看明细",this.tableListData)
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
                this.jiekuanzhuangtai="";
                this.ziqudao="";
                this.gongdanhao="";
                this.tel=""
             },
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
                    const url = this.$common.apidomain+"/extractSettlementFlowing/exportFile";
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
             //获取子渠道ID
             selector(value){
                  this.ziqudaoList.forEach((v,i)=>{
                   if(v.name===value){
                     this.ziqudaoId=v.id;
                   }
                })
             },
            close(){ //传值给父亲组件
                let isbool = false;
                this.$emit("isClose",isbool)
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
    background-color: #fff;
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
          li:nth-of-type(2){
              margin-left:25px;
          }
          .el-input{
              width:200px;
          }
          span:nth-of-type(1){
              margin-left:15px;
          }
      }
      }
   .tableList{
      border-bottom:1px solid #E0E6ED;
      .tableList table{
          width:100%;
          background:#FFFFFF;
      }
  }
     .tableList table{
      border-left:1px solid #E0E6ED;      
      width:100%;
      background:#FFFFFF;
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
              width:198px;
              img{
                position: absolute;
                top:15px;
                right:10px;
              }
          }
        th:nth-of-type(4){
              width:270px;
          }
        th:nth-of-type(5){
              width:100px;
          }
        th:nth-of-type(6){
              width:90px;
          }
        th:nth-of-type(7){
              width:160px;
          }
        th:nth-of-type(8){
              width:160px;
               img{
                position: absolute;
                top:15px;
                right:10px;
              }
          }
        th:nth-of-type(9){
              width:102px;
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


