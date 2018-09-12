<template>
    <div id="app">
      <div class="container">
        <div class="selector_list">
          <div class="list">
              创建时间 :
            <DatePicker v-model.trim="timeQuantum" type="datetimerange" format="yyyy-MM-dd" placeholder="请选择创建时间"
                        style="width: 200px"></DatePicker>
          </div>
          <div class="list">
              交易流水号 :
            <el-input
              style="width:200px;"
              placeholder="请填写交易流水号"
              v-model.trim="selectorBehindObj.id">
            </el-input>
          </div>
          <div class="list">
              订单号 :
            <el-input
              style="width:220px;"
              placeholder="请填写订单号"
              v-model.trim="selectorBehindObj.mainOrderNum">
            </el-input>
          </div>
          <div  v-for="(item,index) in optionList" :key="index" class="list">
            {{item.name}} :
            <el-select
              v-model.trim="item.SourceTypeValue"  :placeholder="'请选择'+item.name"
              @change="selector(item,item.SourceType,item.SourceTypeValue)">
              <el-option
                v-for="items in item.SourceType"
                :key="items.name"
                :value="items.name"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <!--查询按钮-->
        <div class="btn">
          <el-button  @click="query">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
        </div>
      <div class="table_box">
        <table cellSpacing="0px" cellpadding="0">
          <thead>
            <tr class="theads">
              <th v-for="(item,index) in theadsName" :key="index">
                {{item}}
              </th>
            </tr>
          </thead>
          <tbody>
             <tr v-for="(item,index) in tableListData" :key="index">
               <td>{{index+1}}</td>
               <td>
                 <span id="orderLine" @click="orderClick(item.mainOrderNum)">{{item.mainOrderNum}}</span>
               </td>
               <td>{{item.id}}</td>
               <td>{{item.refundType|payTypeShow}}</td>
               <td>{{item.paySource|paySourceShow}}</td>
               <td>{{item.refundFee?item.refundFee:'无'}}</td>

               <td style="width: 150px">{{item.refundDesc?item.refundDesc:'无'}}</td>
               <td>{{item.createTime|moment('YYYY-MM-DD HH:mm:ss')}}</td>
               <td>
                   <span>
                    {{item.payState|parStates}}
                  </span>
               </td>
               <td>
                 <span v-if="item.payState==='Refunded'||item.payState==='Pay'" style="color:rgba(136,136,136,1);">已通过</span>
                 <span v-if="item.payState==='RefundFailed'" style="color:rgba(136,136,136,1);">已驳回</span>
                 <span @click="adopts('通过',item)" v-if="item.payState==='WaitingForRefund'">通过&nbsp&nbsp&nbsp&nbsp</span>
                 <span @click="adopts('驳回',item)" v-if="item.payState==='WaitingForRefund'">驳回</span>
               </td>
             </tr>
          </tbody>
        </table>
        <!--分页组件-->
        <div class="paging">
          <p class="home">总页数{{pageTotal}}</p>
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
        <!--分页组件结束-->
      </div>
      <adopt v-if="isShow" @isClose="isClose" :childrenInfo="childrenInfo" :query="query"></adopt>
    </div>
</template>

<script>
    import adopt from "./alter/adoptAndReject.vue";
    export default {
      components:{adopt},
      data(){
        return{
          selectorBehindObj:{},
          timeQuantum:[],
          startTime:'',      //开始时间
          endTime:'',         //结束时间
          optionList:[       //下拉列表数据
            {
              name:"流水类型",
              key:"refundType",
              SourceTypeValue: '', //选中后的
              SourceType:[
                {
                  name:"--请选择--",
                  id:""
                },
                {
                  name:"退款",
                  id:"RefundPortion,RefundAll"
                },
                {
                  name:"返现",
                  id:"Reappearance"
                }
              ],
            },
            //'RefundPortion','RefundAll'
            {
              name:"交易状态",
              key:"payState",
              SourceTypeValue: '', //选中后的
              SourceType:[
                {
                  name:"--请选择--",
                  id:""
                },
                { name:"已退款",
                  id:"Pay"
                },
                {name:"待退款",
                  id:"WaitingForRefund"
                },
                {name:"退款失败",
                  id:"RefundFailed"
                }
                ]
            }
          ],
          theadsName:['序号','订单号','交易流水号','流水类型','交易方式','退款金额(元)','退款原因','创建时间','交易状态','操作'],
          tableListData:[],
          isShow:false,   //弹窗的显示和隐藏
          childrenInfo:{}, //子组件
          showPages: 1,               //当前页
          currentPageSize: 20,       //每页显示条数
          total: 0,                   //总条数
          pageTotal: 0,              //总页数
        }
      },
      methods:{
        query(){
          if(this.timeQuantum.length>0){
            this.startTime = this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.timeQuantum[0]).format('YYYY-MM-DD');
            this.endTime = this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.timeQuantum[1]).format('YYYY-MM-DD');
          }
          this.getTableList(this.paramsData());
        },
        reset(){
          this.selectorBehindObj = {};
          for(var key in this.selectorBehindObj){
            this.selectorBehindObj[key] = "";
          }
          this.optionList.forEach((obj,i)=>{
            obj.SourceTypeValue = "";
          })
          this.timeQuantum = "";
          this.startTime = '' ;
          this.endTime = '';
          this.getTableList(this.paramsData());
        },
        isClose(v){
          this.isShow = v;
        },
        // 查询数据 start
        selector(item,values,SourceTypeValue){       //选中后的下拉列表
          var key=item.key;
          values.forEach((v,i)=>{
            if(v.name===SourceTypeValue){
              this.selectorBehindObj[key]=v.id;
            }
          })
        },
        //查询数据 send
        //点击订单跳转到详情
        orderClick(v){
          this.$router.push({path: "/order/list5"});
          this.$store.dispatch("orderDetailiD",{mainOrderId:v,isBool:false,title:"全部订单"})
        },
        adopts(tags,info){
          this.isShow = true;
          this.childrenInfo = {
            name:tags,
            orderInfo:info
          }
        },
        paramsData(){
         /* const filterDate = e => this.$moment( this.timeQuantum[e] ).format("YYYY-MM-DD")==="Invalid date"?'':this.$moment( this.timeQuantum[e] ).format("YYYY-MM-DD");*/
          let params = {
            pageNo:JSON.stringify(this.showPages),       //页数
            pageSize:JSON.stringify(this.currentPageSize),    //每页数量
            startTime:this.startTime,  //开始时间
            endTime:this.endTime,    //结束时间
          }
          return Object.assign(params,this.selectorBehindObj)
        },
        getTableList(params){
          let url = `${this.$apidomain}/faPayJournalAccount/findFaPayJournalAccount`
          this.$http.post(url,params).then(res=>{
            let data = res.data
            console.log(data)
            if(data.code==='0000'){
              this.tableListData = data.result.faPayJournalAccounts;
              this.total = data.result.total;
              this.pageTotal = data.result.pageTotal;
              console.log(this.pageTotal ,'列表数据')
            }
          })
        },
        //分页查询 事件 start
        handleSizeChange(val) {      //每页显示多少条
          this.currentPageSize=val;
          let params  = this.paramsData();
          this.getTableList(params);
        },
        handleCurrentChange(val) {  //切换分页
          this.showPages=val;
          let params  = this.paramsData();
          this.getTableList(params);
        },
        firstPage(){
          if(  this.showPages===1 ){
            return alert("已经是第一页")
          }
          this.showPages=1;     //第一页
          let params  = this.paramsData();
          this.getTableList(params);
        },
        lasePage(){
          if(this.showPages===this.pageTotal){
            return alert("已经是最后一页")
          }
          let params  = this.paramsData();
          this.showPages=this.pageTotal; //最后一页
          this.getTableList(params);
        },
        handleItemChange(val) {

        },
//分页查询 事件 end
      },
      created(){
        this.getTableList(this.paramsData());
      }

    }
</script>

<style scoped lang="scss">
  .container {
    overflow: hidden;
    padding-left: 54px;
    .selector_list {
      margin-top: 0;
      margin-bottom: 21px;
      overflow: hidden;
        float: left;
        .list {
          text-align: left;
          padding-top: 5px;
          line-height: normal;
          font-size:13px;
          width: 200px;
          float: left;
          margin-left: 13px;
          .el-input {
            width: 200px;
            margin: 0;
          }
        }
    }
    .btn{
      margin-left:13px;
      margin-bottom: 25px;
      .el-button{
        width:140px;
        margin-bottom: 40px;
      }
      .el-button:nth-of-type(1){
        background: #A470CD;
        border: 1px solid #A470CD;
        color:#FFFFFF;
      }
      .el-button:nth-of-type(2){
        width:100px;
      }
      .el-button:nth-of-type(2):hover{
        color: #A470CD;
        border: 1px solid #A470CD;
      }
    }
  }
  .table_box{
    margin-bottom: 50px;
    padding-right: 1px;
    table{
      width: 100%;
      border-collapse: collapse;
      border: 1px #C0CCDA solid;
      border-top: none;
      td,th{
        text-align: center;
        padding: 0 5px;
        border-right:1px solid rgba(224,230,237,1);
      }
      th{
        //font-weight: Regular;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(94,109,130,1);
      }
      tr{
        height: 44px;
        border-bottom: 1px solid rgba(224,230,237,1);
        td:last-child{
          span:hover{cursor:pointer;}
          span:first-child{
            color:rgba(32,160,255,1);
          }
          span:last-child{
            color:rgba(230,88,49,1);
          }
        }
      }
      thead{
        tr{
          height: 60px;
          background:rgba(240,240,240,1);
        }
      }
      tbody{
        tr:nth-of-type(even){
          background:rgba(248,248,248,1);
        }
        tr:hover{
          background: #C6E7FF;
        }
      }
    }
  }
  #orderLine:hover{
    color: #23A1FE;
    cursor: pointer;
    text-decoration:underline;
  }
  .paging{
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
  .handled{
    color:rgba(136,136,136,1);
  }
</style>
