<template>
  <!--取消-->
  <div class="waitForService">
    <div style="width: 100%;background: #ffffff">
      <div class="center">
        <div class="centerDate">
          <ul>
            <li><span style="display: inline-block;transform: translateY(-10px)">取消时间:　　</span>
              <Row style="display: inline-block">
                <Col span="12">
                <DatePicker type="daterange" confirm placement="bottom-end" placeholder="请选择日期"
                            style="width: 200px;display: inline-block" v-model.trim="date"></DatePicker>
                </Col>
              </Row>
            </li>
            <li>
              分类 :　　　
              <el-select v-model.trim="orderLabel" placeholder="请选择" @change="selectorOne(orderLabel)">
                <el-option
                  v-for="item in labeloptions2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </li>
            <li>子渠道：　　
              <el-select v-model.trim="ziqudao" filterable placeholder="请选择" @change="zhibaoqudao(ziqudao)">
                <el-option
                  v-for="(item,index) in ziqudaoData"
                  :key="index"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </li>
            <li>渠道质保：　
              <el-select v-model.trim="ziqudaozhibao" filterable placeholder="请选择"
                         @change="ziqudaozhibaoClick(ziqudaozhibao)">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>

          </ul>
        </div>
        <div class="centerDateOne">
          <ul>
            <li>紧急度：　　
              <el-select v-model.trim="jinjidu" filterable placeholder="请选择" @change="jinjiduClick(jinjidu)">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li>工单号：　　
              <el-input
                placeholder="请填写工单号"
                style="width: 200px"
                v-model.trim="gongdanhao">
              </el-input>
            </li>
            <li>联系手机号 :
              <el-input
                placeholder="请填写手机号"
                style="width: 200px"
                v-model.trim="tel">
              </el-input>
            </li>
            <li>联系人：　　
              <el-input
                placeholder="请填写联系人"
                style="width: 200px"
                v-model.trim="lianxiren">
              </el-input>
            </li>
          </ul>

        </div>
        <div class="bnt">
          <el-button type="primary" @click="query(date)">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
      </div>
    </div>
    <div class="tableList">
      <!--表格数据-->
      <table>
        <thead>
        <tr class="theads">
          <th v-for="(item,index) in theadsName">{{item}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tableListData.list">
          <!--序号-->
          <td style="flex-grow:.5">
            {{index+1}}
          </td>
          <!--工单号号-->
          <td style="flex-grow:1.5">
            {{item.id}}
          </td>
          <!--联系人-->
          <td>
            {{item.linkmanName}}
          </td>
          <!--联系人手机号-->
          <td>
            {{item.linkmanPhoneNum}}
          </td>
          <!--分类-->
          <td>
            {{item.fLabelBusiness|FLabelBusiness}}
          </td>
          <!--预约时间-->
          <td>
            {{item.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}
          </td>
          <!--子渠道-->
          <td style="flex-grow:1.5">
            {{item.officialPartnerSubsetName}}
          </td>
          <!--渠道质保-->
          <td style="flex-grow:.5">
            {{item.channelWarranty|qudaozhibao}}
          </td>
          <!--紧急度-->
          <td style="flex-grow:.5">
            <span :class="{active:item.isbool}">{{item.emergencyDegree|jinjidu}}</span>
          </td>
          <!--操作-->
          <td>
            <span class="track" @click="trackClick(item,index)">跟踪</span>
            <span class="detail" @click="detailClick(item,index)">详情</span>
          </td>
        </tr>
        </tbody>
      </table>
      <!--表格数据结束-->

    </div>
    <!--分页组件-->
    <div class="paging">
      <p class="home">总页数{{tableListData.pageNum}}/{{tableListData.pages}}</p>
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
      <p class="home last_page cursor" @click="lasePage">尾页</p>
      <p class="home cursor" @click="firstPage">首页</p>
    </div>
    <!--分页组件结束-->
    <TrackAlert @isClose="isClose" v-if="trackShow" :trackAlterId="trackAlterId"></TrackAlert>
    <DetailAlert @isClose1="isClose1" v-if="trackShow1" :detailAlterId="detailAlterId"></DetailAlert>
  </div>
</template>
<script>
  import TrackAlert from "./alertInfos/truckAlert.vue"
  import DetailAlert from "./alertInfos/detailAlter.vue"
  export default {
    components:{
      TrackAlert,DetailAlert
    },
    data() {
      return {
        options:[{  // 子渠道
          value: '1',
          label: '-请选择-'
        }],
        ziqudao:"",
        options1:[{//渠道质保
          value: '2',
          label: '--请选择--'
        },{
          value: '0',
          label: '质保外'
        },{
          value: '1',
          label: '质保内'
        }],
        ziqudaozhibao:"",
        options2:[{//紧急度
          value: '2',
          label: '--请选择--'
        },{
          value: '0',
          label: '正常'
        },{
          value: '1',
          label: '加急'
        }],
        jinjidu:"",
        gongdanhao:"", //工单号
        tel:"",  //手机号
        lianxiren:"", //联系人
        theadsName:["序号","工单号","联系人","联系人手机号","分类","取消时间","子渠道","渠道质保","紧急度","操作"],
        date:[], //日期
        selone:'',  //分类
        orderLabel:"",
        labeloptions2:[  //分类
          {
            "id":"",
            "name":"--请选择--"
          }
        ],
        chushiId:{}, //  登录信息
        kehuID:"",  //客户id
        ziqudaoData:[], //子渠道数据
        tableListData: {},          //表格数据
        showPages: 1,  //分页
        currentPageSize: 20,//分页
        total: 0,//分页
        pageTotal: 0,//分页
        statisticsDateStartStr:"", //开始日期
        statisticsDateEndStr : "", //结束日期
        state:["01","03"], //状态
        officialPartnerSubsetId:"", //子渠道选中ID
        styleRed:{"background":"#ffffff",color:"black"}, //背景色加急
        trackShow: false,         //跟踪显示
        trackAlterId : "",//渠道跟踪ID
        trackShow1:false, //详情显示
        detailAlterId : "",//渠道详情ID
      }
    },
    beforeRouteEnter(to,from,next){
      next(Vue=>{
        Vue.query(false);
      })
    },
    beforeRouterLeave(to,from,next){
      next()
    },
    created(){
      this.query(false);
      //子渠道
      this.chushiId = JSON.parse(localStorage.getItem("userInfo"))
      this.kehuID = this.chushiId.id;
      let url1 = this.$apidomain+"/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo?officialPartnerId="+this.chushiId.id;
      this.$http.get(url1).then(res=>{
        this.ziqudaoData = [{name:"--请选择--"},...res.data.result];
      });

// 分类
      let url=this.$apidomain+"/common/findflabelbusinessname";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.labeloptions2=this.labeloptions2.concat(data.result);
      });
    },
    methods: {
      jinjiduClick(value){
        if(value == "2"){
          this.jinjidu = "";
        }
      },
      ziqudaozhibaoClick(value){
        if(value == "2"){
          this.ziqudaozhibao = "";
        }
      },
      isClose(v){////接收给儿子组件数据
        this.trackShow = v;
      },
      trackClick(vItem,Iindex){ //跟踪
        this.trackShow = true;
        this.$store.commit("trackAlterId",vItem.id)
        this.trackAlterId = vItem.id;
      },
      isClose1(v){////接收给儿子组件数据
        this.trackShow1 = v;
      },
      detailClick(vItem1,Iindex1){ //详情
        this.trackShow1 = true;
//        this.$store.commit("detailAlterId",vItem1.id)
        this.$store.dispatch("detailAlterId",vItem1.id);
        this.detailAlterId = vItem1.id;
      },
      zhibaoqudao(value){
        this.ziqudaoData.forEach(item=>{
          if(item.name == value){
            this.officialPartnerSubsetId = item.id;
          }
        })
      },
      selectorOne(item){       //选中后的下拉列表
        this.labeloptions2.forEach(v=>{
          if(v.name==item){
            this.selone=v.id
          }
        })
      },
      reset(){ //重置
        this.ziqudao ="";
        this.ziqudaozhibao = "";
        this.jinjidu="";
        this.gongdanhao=""; //工单号
        this.tel=""; //手机号
        this.lianxiren=""; //联系人
        this.date=[]; //日期
        this.orderLabel="";
        this.query();
      },
      query(isTime=[]){  //初始数据
        if(isTime.length&&isTime[0]&&isTime[1]){
          this.statisticsDateStartStr = this.$moment( this.date [0]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.date[0]).format('YYYY-MM-DD');
          this.statisticsDateEndStr = this.$moment( this.date [1]).format('YYYY-MM-DD').includes("Invalid")?"":this.$moment(this.date[1]).format('YYYY-MM-DD');
        }else{
          this.statisticsDateStartStr = "";
          this.statisticsDateEndStr = "";
        }
        this.getTableList(this.paramsData());
      },
      paramsData(){  //传数据给后台
        return{params:{
          "page":JSON.stringify(this.showPages),
          "rows":JSON.stringify(this.currentPageSize),
          "officialPartnerId":this.$getLocalStorage("enrolleeinfo")[0].id, //客户 id
          "cancelTimeStartStr":this.statisticsDateStartStr, //开始时间
          "cancelTimeEndStr":this.statisticsDateEndStr,//结束时间
          "state":"02,16,14", //状态
          "officialPartnerSubsetId":this.officialPartnerSubsetId, //子渠道ID
          "channelWarranty":this.ziqudaozhibao, //渠道质保
          "emergencyDegree":this.jinjidu, //紧急度
          "fLabelBusiness":this.selone, //分类
          "linkmanPhoneNum":this.tel, //手机号
          "linkmanName":this.lianxiren, // 联系人
          "id":this.gongdanhao, // 工单号
        }};
      },
      //table 数据 start;
      getTableList(params){
        let url=this.$apidomain+"/manage/order/findOrderPage";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.tableListData = data.result;
          this.tableListData.list.forEach((v,i)=>{
            this.tableListData.list[i].isbool =false;
            if(!v.officialPartnerSubsetName){
              v.officialPartnerSubsetName = "无"
            }else{
              v.officialPartnerSubsetName = v.officialPartnerSubsetName;
            }
            if(this.tableListData.list[i].emergencyDegree == "1"){
              v.isbool =true;
            }else if(this.tableListData.list[i].emergencyDegree == "0"){
              v.isbool = false;
            }
          })
          this.showPages = data.result.pageNum;
          this.currentPageSize = data.result.pageSize;
          this.total = data.result.total;
          this.pageTotal = data.result.pages;
        })
      },
      //分页查询 事件 start
      handleSizeChange(val) {      //每页显示多少条
        this.currentPageSize=val;
        let params  = this.paramsData();
        params['params'].orderByClause = this.$store.state.sort_data;
        this.getTableList(params);
      },
      handleCurrentChange(val) {
        this.showPages=val;
        let params  = this.paramsData();
        params['params'].orderByClause = this.$store.state.sort_data;
        if(this.tableListData.list.length !==0){
          this.getTableList(params);
        }
      },
      firstPage(){
        if(  this.showPages===1 ){
          return alert("已经是第一页")
        }
        this.showPages=1;     //第一页
        let params  = this.paramsData();
        params['params'].orderByClause = this.$store.state.sort_data;
        this.getTableList(params);
      },
      lasePage(){
        if(this.showPages===this.pageTotal){
          return alert("已经是最后一页")
        }
        let params  = this.paramsData();
        params['params'].orderByClause = this.$store.state.sort_data;
        this.showPages=this.pageTotal; //最后一页
        this.getTableList(params);
      },
    },
    mounted() {
    },
  }
</script>
<style scoped lang="scss">
  .allPage{
    width:100%;
    background:rgba(229,233,242,1);
    /*position: relative;*/
  }
  .tableList,.tableList table{
    width: 100%;
    background:rgba(229,233,242,1);

  }
  .tableList table thead{
    width: 100%;
    tr{
      width: 100%;
      th{
        height:52px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
        line-height:52px;
        text-align: center;
      };
    };
  }
  .tableList table tbody{
    width: 100%;
    tr{
      width: 100%;
      border-left: 1px solid #bfcbd9;
      background:rgba(255,255,255,1);
      td{
        height:46px;
        line-height:46px;
        text-align: center;
      }
      .active{
        background: red;
        color: #FFFFFF;
      }
    }
    tr:nth-child(2n){
      background:#F7F8FA ;
    }
  }
  .tableList table tbody tr:hover{
    background: #DBF0FF;
  }
  .center{
    width:90%;
    margin-left: 5%;
    padding: 0 0 20px ;
    .centerDate{
      width: 100%;

      ul{
        width: 100%;
        padding: 10px 0;
        display: flex;
        li{
          flex: 1;
        }
      }
    }
    .centerDateOne{
      width: 100%;
      ul{
        width: 100%;
        padding: 10px 0;
        display: flex;
        li{
          flex: 1;
        }
      }
    }
    .bnt{
      margin-top: 20px;
      width: 90%;
      margin-left: 50px;
      .el-button{
        width:200px;
      }
    }
  }
  .el-pagination{
    float: right;
    margin:12px 0;
    cursor: pointer;
  }
  .home{
    float: right;
    margin: 18px 5px;
  }
  .cursor,.track,.detail{
    cursor: pointer;
    color:rgba(32,160,255,1);
  }
  .cursor:hover,.track:hover,.detail:hover{
    color:purple;
  }

</style>



