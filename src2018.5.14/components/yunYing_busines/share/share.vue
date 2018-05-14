<template>
  <div id="app">
    <div class="open_list" v-if="isOpenList">
      <div class="dable_lsit">
        <!--导出-->
        <table cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th v-for="(item,index) in alertOpenHeaderName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in alertDataList">
            <td v-show="false"></td>
            <td>
              {{item.enrollment}}
            </td>
            <td>
              {{item.earnPoint}}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>


    <div class="container">
      <div class="title_box">
          <div class="title_left" v-if="alertDataList">
            <p >方案状态：{{alertDataList.available==="0"?"禁用":"正常"}}</p>
            <p class="cursor" @click="openList">展开 <i class=" detailed share_icon open_icon"></i> </p>
            <p class="cursor" @click="isOpenList=false">收起 <i class=" detailed share_icon up_icon"></i></p>
          </div>
        <p v-else>请点击【编辑】按钮设置好友推荐的奖励信息！</p>
        <div class="title_right">
          <div class="cursor" v-if="originalData.available==='1'&&alertDataList" @click="openFirmFor(originalData)"><i class="detailed share_icon"></i>&nbsp;禁用</div>
          <div class="cursor" v-if="originalData.available!='1'&&alertDataList" @click="openFirmFor(originalData)"><i class="detailed share_icon start"></i>&nbsp;启用</div>
          <div class="cursor" @click="Edit"><i class="edit_icon share_icon"></i>&nbsp;编辑</div>
        </div>
      </div>
      <div class="user_sum">
        <user-sum class="sum" :suerSum="item" v-for="(item,index) in userSum" :key="index" v-if="item.sum!==undefined"></user-sum>
      </div>
      <div class="selector_list">
        <div class="list" v-for="(item,index) in inpusData">
          <inputs :item="item"></inputs>
        </div>
      </div>
      <!--查询按钮-->
      <div class="btn_inquiry" @click="quiry">
        查询
      </div>
      <div class="dable_lsit">
        <!--<div class="derive">-->
          <!--<el-button size="large">总查询</el-button>-->
          <!--<el-button style="margin-left:0;" size="large">按天查询</el-button>-->
          <!--<el-button style="margin-left:0;" size="large">按期查询</el-button>-->
        <!--</div>-->
        <table cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="(item,index) in tableListData.userFriendsShareRecords">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.userPhoneNum|placeholder}}
            </td>
            <td>
              {{item.recommendNum|placeholder}}
            </td>
            <td>
              {{item.totalCommission|placeholder}}
            </td>
            <td>
              {{item.state|userState}}
            </td>
            <td>
              {{item.operation|placeholder}}
            </td>
            <td>
                <span :class="{'recover':item.state=='forbidden'}" v-show="$isButtonObj('bn-master-account-forbidden')"><el-button type="text" @click="open2(item)"><i></i>
                  {{item.state|enableDisable}}
                </el-button>
                </span>
              <span style="padding:0 10px" class="details_icon" v-show="$isButtonObj('bn-master-account-details')||true"><el-button type="text" @click="details(item,index)"> <i class="edit_icon"></i> 编辑</el-button></span>
              <router-link  :to="'/yunYing_busines/integral?id='+item.id" tag="span" class="details_icon" v-show="$isButtonObj('bn-master-account-details')||true"><el-button type="text"> <i class="details_icon"></i> 详情</el-button></router-link>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="paging">
          <p class="home">总页数{{tableListData.pageNo}}/{{tableListData.pageTotal}}</p>
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
      </div>
    </div>
    <div>
    </div>
    <div class="alert" v-if="isAlertEdit.isShow">
      <alert-info :title="showTitle" :data="isAlertEdit" :getOpenData="getOpenData" :originalData="editOriginalData">
      </alert-info>
    </div>
    <edit-alert :editAlert="editAlert" :quiry="quiry"></edit-alert>
    <forbidden-alert :data="confirmForbiddenData" :getTableList="quiry"></forbidden-alert>
  </div>
</template>
<script>

  import alertInfo from "./alertInfo";
  import inputs from "@/components/commInfo/inputs";
//  import pageing from "@/components/commInfo/pageing";
  import userSum from "../../user/userSum.vue"
  import editAlert from "./editAlert"
  import forbiddenAlert from "./forbiddenAlert"
  export default {
    components:{
      alertInfo,
      forbiddenAlert,
      editAlert,
      inputs,
//      pageIng:pageing,
      userSum,
    },
    data() {
      return {
        originalData:"",
        editOriginalData:{},
        pagesData:{
          showPages:0,
          currentPageSize:20,
          total:0,
          pageTotal:0,
        },

        confirmForbiddenData:{
          title:"",
          id:"",
          params:{},
          url:"",
          isShow:false
        },
        editAlert:{
          isShow:false,
          data:[]
        },
        dialogTableVisible:{isShow:false},
        dialogTable:{
          isShow:false
        },
        showTitle:"推荐规则设置",
        isAlertEdit:{
          isShow:false
        },
        isOpenList:false,
        inpusData:[
          {
          name:"绑定手机号",
          type:"text",
          key:"userPhoneNum",
          value:""
        }, {
          name:"积分大于",
          key:"totalCommission",
          type:"number",
          value:""
        },
        ],

        alertOpenHeaderName:[
          "推荐数",
          "积分（分）",
        ],
        alertDataList:[],
        theadsName:[
          '序号',
          '绑定手机号',
          '推荐人数',
          '累加积分',
          '状态',
          '操作员',
          '操作'
        ],
        selectorBehindObj:{},
        tableListData:{
          pageNo:1,
          pageSize:20,
          total:0,
          pageTotal: 1,
          userFriendsShareRecords:[]
        },
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0,

        userSum:[
          {
            sum:"",
            color:"blue",
            name:"营销人员"
          },{
            color:"green",
            sum:"",
            name:"累计结算金额"
          },{
            color:"#2A2A2A",
            sum:"" ,
            name:"未结算金额"
          },{
            color:"#003200",
            sum:"" ,
            name:"上期结算金额"
          }, {
            color: "#320000",
            sum: "",
            name:"新增营销人员"
          },{
            color:"green",
            sum:"" ,
            name:"新增用户"
          },
        ],
      }
    },
    created(){
      this.quiry();
        this.getOpenData();
        let url=`${this.$apidomain}/userFriendsShareRecord/countList`;
        this.$http.get(url).then(res=>{
            let data=res.data,
                r=data.result;
          this.userSum[0].sum=r.marketingPersonnel;
          this.userSum[1].sum=r.accumulationSettlement;
            this.userSum[2].sum=r.pendingTheSettlement;
            this.userSum[3].sum=r.lastpayamount;
            this.userSum[4].sum=r.newMarketingPersonnel;
            this.userSum[5].sum=r.newUser
        })

    },
    watch:{

    },
    methods: {
      openFirmFor(data){
        let url=`${this.$apidomain}/userFriendsShareRecord/saveSetting`,
          params=JSON.parse(JSON.stringify(data));
        if(data.available==='0'){
          //启用
          params.available="1";
            this.$http.post(url,params).then(res=>{
            let data=res.data;
            if(data.code==="0000"){
              this.$message({
                type: 'success',
                message: '启用成功!'
              });
              this.getOpenData();
            }else{
              this.$message.error(data.error);
            }
          })
        }else{
//          禁用;
          params.available="0";
          this.$http.post(url,params).then(res=>{
            let data=res.data;
            if(data.code==="0000"){
              this.$message({
                type: 'success',
                message: '禁用成功!'
              });
              this.getOpenData();
            }else{
              this.$message.error(data.error);
            }
          })
        }
      },
      getOpenData(){
        let url =`${this.$apidomain}/userFriendsShareRecord/findSetting`;
        this.$http.get(url).then(res=>{
          let data=res.data;
          this.originalData=data.result;
          this.alertDataList= data.result.details;
        })
      },
      openList(){
        this.isOpenList=true;
      },
      Edit(){
        let originalData={
          details:[
            {
              enrollment:1,
              earnPoint:1,
            }
          ]
        };
        this.editOriginalData=this.originalData.details?this.originalData:originalData;

        this.isAlertEdit.isShow=true;
      },
//      <!--分页查询数据对象功能组合start-->
      quiry(){
          this.inpusData.forEach(v=>{
            this.selectorBehindObj[v.key]=v.value;
          });
        this.getTableList(this.paramsData());
      },
      paramsData(){
        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "userPhoneNum":this.selectorBehindObj.userPhoneNum,
          "totalCommission":this.selectorBehindObj.totalCommission
        }}
      },
      getTableList(params){
        let url=this.$apidomain+"/userFriendsShareRecord/findPage";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.tableListData = data.result;
          this.showPages = data.result.pageNo;
          this.currentPageSize = data.result.pageSize;
          this.total = data.result.total;
          this.pageTotal = data.result.pageTotal;
//          this.tableListData.userFriendsShareRecords=[
//            {
//              "id": "string",
//              "operation": "string",
//              "operationId": "string",
//              "recommendNum": 0,
//              "state": "using",
//              "totalCommission": 0,
//              "totalCumulativeFraction": 0,
//              "userName": "string",
//              "userPhoneNum": "1212121212"
//            },
//              {
//              "id": "string",
//              "operation": "string",
//              "operationId": "string",
//              "recommendNum": 1,
//              "state": "forbidden",
//              "totalCommission": 2,
//              "totalCumulativeFraction": 4,
//              "userName": "string",
//              "userPhoneNum": "string"
//            },
//            ]
        })
      },
//      <!--分页查询数据对象功能组合end-->
//      <!--弹窗功能start-->
      details(item,index){
        this.editAlert.data=item;
        this.editAlert.isShow=true;
      },

//      <!--弹窗功能end-->
//      <!--获取城市下的区域信息与服务工种 start-->



//      <!--获取城市下的区域信息与服务工种 end-->
//      <!--恢复 start-->
      open2(item) {
        if("using"===item.state){
          this.confirmForbiddenData.params={
            "id":item.id,
            "remark":""
          };
          this.confirmForbiddenData.url= "userFriendsShareRecord/startUsing";
          this.confirmForbiddenData.isShow = true;
          this.objItem = item;

        }else{
          this.$confirm('此操作将恢复该数据，是否继续？', '恢复', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let url=this.$apidomain+"/userFriendsShareRecord/forbidden",
                o={"id":item.id};
            this.$http.post(url,o).then(res=>{
              let data = res.data;
              if(data.code==="0000"){
                this.$message({
                  type: 'success',
                  message: '恢复成功!'
                });
                this.getTableList(this.paramsData())
              }else{
                this.$message.error(data.error);
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消恢复'
            });
          });
        }
      },
//      <!--恢复 end-->
      //禁用  start
      confirmForbidden(item,textContent){
        var o={};
        item.forEach((v)=>{
          if(v.selector===true){
            o.forbiddenCause=v.name
          }
        });
        if(textContent){
          o.forbiddenRemark=textContent; //内容
        }else{
          o.forbiddenRemark=" ";
        }
        o.id=this.objItem.id;
        o.state = "2";
        o.templateCodeString="jinyong";
        let url=this.$apidomain+"/masterinfo/updateMasterinfo";
        this.$http.post(url,o).then(res=>{
          let data = res.data;
          if("0000"===data.code){
            this.dialogTableVisible=false;
            this.$message({
              type: 'success',
              message: '禁用成功!'
            });
            this.getTableList(this.paramsData())
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },

//      <!--禁用启用操作 end-->


      handleSizeChange(val) {
        this.currentPageSize=val;
        this.getTableList(this.paramsData());
      },
      handleCurrentChange(val) {
        this.showPages=val;
        this.getTableList(this.paramsData());
      },
      firstPage(){
        if(this.showPages===1 ){
          return alert("已经是第一页")
        }
        this.showPages=1;
        this.getTableList(this.paramsData());
      },
      lasePage(){
        if(this.showPages===this.pageTotal){
          return alert("已经是最后一页")
        }
        this.showPages=this.pageTotal;
        this.getTableList(this.paramsData());
      },
      handleItemChange(val) {
      },

      selector(item,values,SourceTypeValue){
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        })
      },

    },
    mounted() {
    },
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/styles/comminStyle2";
  #app{
    >.open_list{
      position:absolute;
      left:371px;
      top:209px;
      z-index: 9999;
      background: #fff;
      .dable_lsit{
        margin:0;
        td{
          padding-left:40px;
          padding-right:40px;
        }
      }
    }
 .dable_lsit > .derive{
      float:left;
    }
  }
  .container{

    >.title_box{
      height:50px;
      border-bottom:1px solid #979797;
      margin-bottom:10px;
      >.title_left{
        float:left;
        line-height: 50px;
        > p{
          margin:0 10px;
        }
        > p:first-of-type{
          margin:0;
        }
      }
      >.title_right{
        float:right;
        display: flex;
        width:220px;
        /*border:1px solid #979797;*/
        border-bottom:none;
        >div{
          flex:1;
          text-align: center;
          line-height: 49px;
        }
      }
      .detailed{
        background:url(../../../../static/images/ban.png) center center no-repeat;
        background-size:100% 100%;
      }

      .share_icon{
        display: inline-block;
        width:16px;
        vertical-align: middle;
        height: 16px;
      }
      .open_icon{
        background:url(../../../../static/images/open.png) center center no-repeat;
        background-size:100% 100%;
        width:8px;
        vertical-align: middle;
        height:17px;
      }
      .up_icon{
        vertical-align: middle;
        background:url(../../../../static/images/up.png) center center no-repeat;
        background-size:100% 100%;
        width:8px;
        height:17px;
      }
      .start{
        background:url(../../../../static/images/canal.png) center center no-repeat;
        background-size:100% 100%;
      }
    }



  }
  .alert_forbidden_text{
    list-style: none;
    >li{
      line-height: 3em;
      border-top:1px solid rgba(0,0,0,.1);
    }
    >li:first-of-type{
      border:none;
    }
    span{
      width:10px;
      /*float:right;*/
      margin-left:20px;
      height:10px;
      display: inline-block;
      background:green;
      border-radius: 50%;
    }
  }

  .alert_forbidden_area{
    width:100%;
    height:60px;
    border:1px solid #c0c0c0;
  }
  .top_nav{
    font-size:14px;
    width:100%;
    .user_type{
      padding:10px 60px;
      background: #EBDDF6;
      color:#000;
      cursor:pointer;
    }
    .selector{
      background: #A470CD;
      color:#fff;
      font-size:14px;
    }
  }

  #city{
    line-height:40px;
  }
  .el-button--text{
    color:#000;
  }
  .el-button--large{
    width:120px;
  }

  .el-dialog__wrapper{
    z-index: 999999;
  }

</style>



