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
                          <span>渠道质保</span>
                          <el-select v-model="qudaozhibao" placeholder="请选择" >
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
                          <el-select v-model="ziqudao" placeholder="请选择" >
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
                           <span>工单号</span>
                          <el-input  placeholder="请输入工单号" v-model="gongdanhao" clearable></el-input>
                      </li>
                      <li>
                           <span>联系人手机号</span></span>
                          <el-input  placeholder="请输入手机号" v-model="tel" clearable></el-input>
                      </li>
                  </ul>
              </div>
              <div class="btn">
                  <el-button type="primary">查询</el-button>
                  <el-button>重置</el-button>
              </div>
          </div>
          <!-- 查询end -->
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
                        <th>联系人手机</th>
                        <th>服务区域</th>
                        <th>工单总费用  (元)<img src="../../../static/images/paixu.png"></th>
                        <th>待付款元 ()<img src="../../../static/images/paixu.png"></th>
                        <th>渠道质保</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in dataList" :key="index">
                        <td><el-checkbox v-model="isCheckboxList[index]" @change="checkbox(index)"></el-checkbox></td>
                        <td>{{index+1}}</td>
                        <td>{{item.a}}</td>
                        <td>{{item.b}}</td>
                        <td>{{item.c}}</td>
                        <td>{{item.d}}</td>
                        <td>{{item.e}}</td>
                        <td>{{item.f}}</td>
                        <td>{{item.g}}</td>
                        <td>{{item.h}}</td>
                        <td>
                            <span class="track" @click="skip()">工单详情</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
      <work-order-details v-if="ordeShow" @isClose="isClose"></work-order-details>
  </div>
</template>
<script>
  import workOrderDetails from "./workOrderDetails"
  export default {
    props:["trackAlterId"],
    components:{
        workOrderDetails
    },
    data() {
      return {
        ordeShow:false,       //工单详情显隐
        isCheckboxList:[],  //全选,反选
        checked:false,      //全选,反选
        tabSelect:"",
        qudaozhibao:"",
        ziqudao:"",
        gongdanhao:"",
        tel:"",
        date:"",      //日期范围
        userInformation:[],//用户信息
        detailInformation:{},//详情信息
        createTimeInformation:[],//时间信息
        isShow:false,  //备注显示消失
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
            {"a":"2018/03/02 12:30:00","b":"20015894616536","c":"小明","d":"123456789100","e":"康佳大厦","f":"666.00","g":"80","h":"保内"},
            {"a":"2018/03/02 12:30:00","b":"20015894616536","c":"小明","d":"123456789100","e":"康佳大厦","f":"666.00","g":"80","h":"保内"},
            {"a":"2018/03/02 12:30:00","b":"20015894616536","c":"小明","d":"123456789100","e":"康佳大厦","f":"666.00","g":"80","h":"保内"},
            {"a":"2018/03/02 12:30:00","b":"20015894616536","c":"小明","d":"123456789100","e":"康佳大厦","f":"666.00","g":"80","h":"保内"},
            {"a":"2018/03/02 12:30:00","b":"20015894616536","c":"小明","d":"123456789100","e":"康佳大厦","f":"666.00","g":"80","h":"保内"},
            {"a":"2018/03/02 12:30:00","b":"20015894616536","c":"小明","d":"123456789100","e":"康佳大厦","f":"666.00","g":"80","h":"保内"},
            {"a":"2018/03/02 12:30:00","b":"20015894616536","c":"小明","d":"123456789100","e":"康佳大厦","f":"666.00","g":"80","h":"保内"},
            {"a":"2018/03/02 12:30:00","b":"20015894616536","c":"小明","d":"123456789100","e":"康佳大厦","f":"666.00","g":"80","h":"保内"},
            {"a":"2018/03/02 12:30:00","b":"20015894616536","c":"小明","d":"123456789100","e":"康佳大厦","f":"666.00","g":"80","h":"保内"},
        ]
      }
    },
    watch:{
    },
    created(){
         this.getTableList();
    },
    methods: {
            //全选,反选start
            checkbox(index){
                        this.$queryFun.isCheckbox.call(this,this.dataList,index);
                    },
                    wholeSelector(item,currentState){
                        this.$queryFun.wholeSelector.call(this,item,currentState);
                    },
                //全选反选end
                getTableList(){
                    this.isCheckboxList = [];
                    this.dataList.forEach((v,i) =>{
                        this.isCheckboxList.push(false);
                        this.dataList[i].isCheckboxList = false;
                    })
                },
                isClose(v){
                   this.ordeShow= v;
                },
                skip(){
                    this.ordeShow=true;
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
              width:112px;
          }
     
      }

  }
</style>


