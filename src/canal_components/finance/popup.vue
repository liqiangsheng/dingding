<template>
  <div>
      <div class="trackAlert"><!--背阴--> </div>
      <div class="trackAlert_box">
          <!-- 头部 -->
        <div class="headBox">
           <span>账单结算明细</span>
           <i class="el-message-box__close el-icon-close" @click="close"></i>
        </div>
        <!-- 头部end -->
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
                          <span>子渠道</span>
                          <el-select v-model="kont_state" placeholder="请选择" @change="selectorOne(kont_state)">
                            <el-option
                              v-for="item in kontState"
                              :key="item.id"
                              :label="item.name"
                              :value="item.name">
                            </el-option>
                          </el-select>
                      </li>
                       <li>
                           <span>工单号</span>
                          <el-input  placeholder="请输入工单号" v-model="gongdanhao"></el-input>
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
                        <th><input type="checkbox" v-model="tabSelect"/></th>
                        <th>序号</th>
                        <th>创建时间 <img src="../../../static/images/paixu.png"></th>
                        <th>工单号</th>
                        <th>联系人</th>
                        <th>联系人手机</th>
                        <th>服务区域</th>
                        <th>金额 (元)<img src="../../../static/images/paixu.png"></th>
                        <th>结款状态<img src="../../../static/images/paixu.png"></th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in dataList" :key="index">
                        <td><input type="checkbox"/></td>
                        <td>{{index+1}}</td>
                        <td>{{item.a}}</td>
                        <td>{{item.b}}</td>
                        <td>{{item.c}}</td>
                        <td>{{item.d}}</td>
                        <td>{{item.e}}</td>
                        <td>{{item.f}}</td>
                        <td>{{item.g}}</td>
                        <td>
                            <span class="track" @click="queryClick(item,index)">工单详情</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    props:["trackAlterId"],
    components:{
    },
    data() {
      return {
        userInformation:[],//用户信息
        detailInformation:{},//详情信息
        createTimeInformation:[],//时间信息
        isShow:false,  //备注显示消失
        dataList:[
            {"a":"2018/03/02 12:30:00","b":"20015894616536","c":"小明","d":"123456789100","e":"康佳大厦","f":"666.00","g":"已结款"},
            {"a":"2018/03/02 12:30:00","b":"20015894616536","c":"小明","d":"123456789100","e":"康佳大厦","f":"666.00","g":"已结款"},
            {"a":"2018/03/02 12:30:00","b":"20015894616536","c":"小明","d":"123456789100","e":"康佳大厦","f":"666.00","g":"已结款"},
            {"a":"2018/03/02 12:30:00","b":"20015894616536","c":"小明","d":"123456789100","e":"康佳大厦","f":"666.00","g":"已结款"},
            {"a":"2018/03/02 12:30:00","b":"20015894616536","c":"小明","d":"123456789100","e":"康佳大厦","f":"666.00","g":"已结款"},
            {"a":"2018/03/02 12:30:00","b":"20015894616536","c":"小明","d":"123456789100","e":"康佳大厦","f":"666.00","g":"已结款"},
            {"a":"2018/03/02 12:30:00","b":"20015894616536","c":"小明","d":"123456789100","e":"康佳大厦","f":"666.00","g":"已结款"},
        ]
      }
    },
    watch:{
    },
    created(){
//      console.log(this.$store.state.trackAlterId)
        let url = this.$apidomain+"/orderquery/findOrderTracking?mainOrderId="+this.trackAlterId;
        this.$http.get(url).then(res=>{
             this.detailInformation = res.data.result.order;
             this.userInformation = res.data.result.coreMainOrderRecords;
             this.userInformation.forEach(v=>{
                if(!v.operateRemark){
                          this.isShow = false;
                }else{
                   this.isShow =true;
                }
             })
        })
    },
    methods: {
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
  .trackAlert{
    width: 100%;
    background: black;
    position: absolute;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index:2007;
    opacity: 0.2;
  }
  .trackAlert_box{
    width: 1180px;
    height: 700px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left:-590px;   //往左上角移动元素的一半宽高
    margin-top:-350px;
    //left:-590px;
    z-index:2008;
    border-radius: 3px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .headBox{
    width: 100%;
    height:60px;
    position: relative;
    background:rgba(243,243,243,1);
    .el-message-box__close{
      position: absolute;
      right: 14px;
      top:14px;
    }
    .el-message-box__close:hover{
        cursor:pointer;
    }
    span{
      width: 100%;
      display: inline-block;
      height:14px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:#393939;
      line-height:60px;
      text-align: center;
    }
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
      .btn{
          margin-left:62px;
          .el-button{
              width:140px;
          }
      }
  }
   .tableList{
      margin-top:45px;
      border-bottom:1px solid #E0E6ED
  }
  .tableList,.tableList table{
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
            td:nth-of-type(10){
                color:#20A0FF;
            }
            span:hover{
                cursor:pointer;
            }
        }
        tr:hover{
            background:#F7F8FA;
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
              width:120px;
               img{
                position: absolute;
                top:15px;
                right:10px;
              }
          }
        th:nth-of-type(9){
              width:100px;
               img{
                position: absolute;
                top:15px;
                right:8px;
              }
          }
        th:nth-of-type(10){
              width:84px;
          }
     
      }

  }
</style>


