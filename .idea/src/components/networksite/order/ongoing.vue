<template>
  <div id="app">
    <div class="container">
      <div class="selector_list">
        <div class="list">
          下单手机号 :
          <el-input
            placeholder="请输入内容"
            v-model="userPhoneNum">
          </el-input>
        </div>
        <div class="list">
          师傅编号 :
          <el-input
            placeholder="请输入内容"
            v-model="masterId">
          </el-input>
        </div>
      </div>
      <!--查询按钮-->
      <div class="btn_inquiry" @click="quiry">
        查询
      </div>
      <div class="dable_lsit">
        <!--导出-->
        <div class="derive">
          <!--<el-button @click="add" size="large">新增</el-button>-->
        </div>
        <table cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.orders">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.id}}
            </td>
            <td>
              {{item.linkmanName}}
            </td>
            <td>
              {{item.userPhoneNum}}
            </td>
            <td>
              {{item.linkmanArea}}
            </td>
            <td>
              {{item.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td>
              {{item.masterId}}
            </td>
            <td>
              {{item.masterName}}
            </td>
            <td >
              {{item.state|orderStateShow}}
            </td>
            <td>
              <span class="details_icon"><el-button type="text" @click="details(item,index)"><i></i>查看详情</el-button></span>
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
    <!--大弹框 详情-->
    <div class="alert" v-if="isDetailed.isShow">

      <transactionDetail :isDetailed="isDetailed" :quiry="quiry">

      </transactionDetail>

    </div>
    <!--大弹框 详情end-->
    <!--<div class="alert" v-if="isAdd.isShow" >-->
      <!--<add-alert :isAdd="isAdd" :quiry="quiry">-->
      <!--</add-alert>-->
    <!--</div>-->

    <!--弹框-->
    <!--<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>-->
    <!--<el-dialog style="z-index:999999"  :visible.sync="dialogTableVisible" size="tiny">-->
      <!--<ul class="alert_forbidden_text">-->
        <!--<li v-for="(item,index) in alertForbiddenList" :key="index" @click="selectorForbidden(item,index)">-->
          <!--{{item.name}} <span v-show="item.selector!='0'"></span>-->
        <!--</li>-->
      <!--</ul>-->
      <!--<textarea class="alert_forbidden_area" v-model="textareaContent">-->
        <!--</textarea>-->
      <!--<el-button class="confirm_btn" @click="confirmForbidden(alertForbiddenList,textareaContent)" type="primary">确定</el-button>-->
    <!--</el-dialog>-->
    <div>
    </div>
  </div>
</template>
<script>
//  import alertInfo from "./accountList_alert";
import transactionDetail from './alert/transactionDetail.vue'
  export default {
    components:{
      transactionDetail,
//      alertInfo,
    },
    data() {
      return {
        userPhoneNum:"",
        //<!--弹窗基础数据start-->
        isDetailed:{
          title:"订单信息",
          isShow:false,
          orderId:"",
        },
//        isAdd:{
//          title:"新增师傅",
//          isShow:false
//        },
        //<!--弹窗基础数据end-->
//        <!--禁用启用start-->
//        textareaContent:"",
//        alertForbiddenList:[
//          {
//            name:"多次恶意违规收费",
//            selector:"0",
//          }, {
//            name:"多次被投诉",
//            selector:"0",
//          }, {
//            name:"关键资料不全",
//            selector:"0",
//          }, {
//            name:"引导用户线下付款",
//            selector:"0",
//          }, {
//            name:"师傅离职",
//            selector:"0",
//          }, {
//            name:"其他",
//            selector:"0",
//          }
//        ],
//        dialogTableVisible: false,
        //<!--禁用启用end-->
        //<!--搜索框筛选数据start-->
        linkmanPhoneNum:'',
        masterId:'',
        areaoptions1: [],
        city: {
          name: "所属城市",
          key: "cityId",
          SourceTypeValue: '', //选中后的
          SourceType: []
        },
        optionList: [
          {
            name: "师傅类型",
            key: "type",
            SourceTypeValue: '',
            SourceType: [
              {
                value: '---请选择---',
                id: ""
              }, {
                value: '自营师傅',
                id: "1"
              }, {
                value: '兼职师傅',
                id: "2"
              }, {
                value: '网点师傅',
                id: "3"
              }
            ]
          },{
            name: "师傅等级",
            key: "level",
            SourceTypeValue: '',
            SourceType: [
              {
                value: '---请选择---',
                id: ""
              }, {
                value: '初级师傅',
                id: "Primary"
              }, {
                value: '中级师傅',
                id: "MiddleRank"
              }, {
                value: '高级师傅',
                id: "Advanced"
              }
            ]
          },{
            name: "所属网点",
            key: "siteId",
            SourceTypeValue: '',
            SourceType: []
          },
        ],
        props: {
          value: 'label',
          children: 'cities',
        },
        //<!--搜索框筛选数据end-->
        //<!--搜索框与table与分页start-->
        theadsName:[
          '序号',
          '工单号',
          '联系人',
          '下单手机号',
          '服务区域',
          '预约时间',
          '师傅编号',
          '师傅姓名',
          '工单状态',
          '操作'
        ],
        selectorBehindObj:{},
        tableListData:{
          pageNo:1,
          pageSize:20,
          total:0,
          pageTotal: 1,
          orders:[]
        },
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0,
        //<!--搜索框与table与分页end-->
        //<!--顶部数据模板start-->
//        userSum:[
//          {
//            sum:"0", //总用户量
//            color:"blue",
//            name:"今日新增数量"
//          },{
//            color:"green",
//            sum:"0", //总用户量
//            name:"总师傅数量"
//          },{
//            color:"green",
//            sum:"0", //总用户量
//            name:"待审核师傅数量"
//          },
//        ],
        //<!--顶部数据模板end-->
      }
    },
    created(){
      this.quiry();
//      let url=this.$apidomain+"/common/findlabelbusinessoptions";
//      this.$http.get(url).then(r=>{
//        let data=r.data;
//        this.labeloptions2 = data.result;
//      })
//      url=this.$apidomain+"/common/findcitylistareainfo";
//      this.$http.get(url).then(r=>{
//        let data=r.data;
//        this.city.SourceType.push({"id":"","value":"---请选择---"});
//        data.result.forEach((v)=>{
//          this.city.SourceType.push({"id":v.id,"value":v.name});
//        })
//      });
    },
    methods: {
//      <!--分页查询数据对象功能组合start-->
      quiry(){
        this.getTableList(this.paramsData());
      },
      paramsData(){
        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "userPhoneNum":this.userPhoneNum,
          "masterId":this.masterId,
          "siteId":this.$getLocalStorage("enrolleeinfo")[0].id,
          "state":"05,06,07,10,11,13",
        }}
      },
      getTableList(params){
        let url=this.$apidomain+"/orderquery/findpage";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.tableListData = data.result;
          this.showPages = data.result.pageNo;
          this.currentPageSize = data.result.pageSize;
          this.total = data.result.total;
          this.pageTotal = data.result.pageTotal;
        })
      },
//      <!--分页查询数据对象功能组合end-->
//      <!--弹窗功能start-->
      details(item,index){
        this.isDetailed.orderId = item.id;
        this.isDetailed.isShow=true;
      },
//      add(){
//        this.isAdd.isShow=true
//      },
//      <!--弹窗功能end-->
//      <!--禁用启用操作 start-->
//      open2(item) {
//        if("1"==item.state){
//          this.dialogTableVisible = true;
//          this.objItem = item;
//        }else{
//          this.$confirm('此操作将恢复该数据，是否继续？', '恢复', {
//            confirmButtonText: '确定',
//            cancelButtonText: '取消',
//            type: 'warning'
//          }).then(() => {
//            var o={};
//            o.id=item.id;
//            o.state = "1";
//            let url=this.$apidomain+"/masterinfo/updateMasterinfo";
//            this.$http.post(url,o).then(res=>{
//              let data = res.data;
//              this.$message({
//                type: 'success',
//                message: '恢复成功!'
//              });
//              this.getTableList(this.paramsData())
//            })
//          }).catch(() => {
//            this.$message({
//              type: 'info',
//              message: '已取消恢复'
//            });
//          });
//        }
//      },
//      confirmForbidden(item,textContent){
//        var o={};
//        item.forEach((v)=>{
//          if(v.selector===true){
//            o.forbiddenCause=v.name
//          }
//        });
//        if(textContent){
//          o.forbiddenRemark=textContent; //内容
//        }else{
//          o.forbiddenRemark=" ";
//        }
//        o.id=this.objItem.id;
//        o.state = "2";
//        let url=this.$apidomain+"/masterinfo/updateMasterinfo";
//        this.$http.post(url,o).then(res=>{
//          let data = res.data;
//          if("0000"==data.code){
//            this.dialogTableVisible=false;
//            this.$message({
//              type: 'success',
//              message: '禁用成功!'
//            });
//            this.getTableList(this.paramsData())
//          }else{
//            this.$message({
//              type: 'error',
//              message: data.error
//            });
//          }
//        })
//      },
//      selectorForbidden(item,index){
//        this.alertForbiddenList.forEach((v)=>{
//          v.selector=false;
//        });
//        item.selector=!item.selector;
//      },
//      forbidden(){
//        this.isForbidden=true;
//        this.isClose=false;
//        this.dialogTableVisible=true;
//      },
//      close(pre,addDataAlert){
//        if(pre==="preserve"){    //判断是否是保存
//          addDataAlert.inputs.forEach(v=>{
//            addDataAlert.selectorBehindObj[v.key]=v.value
//          });
//          console.log(addDataAlert.selectorBehindObj);  //参数
//        }
//        this.isClose=true;
//        this.isForbidden=false;
//        this.isAdd=false;
//        this.$store.commit("displayAlert",false); //通过vux 传递数据
//        this.isAlert=this.$store.state.isAlert;
//      },
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
        if(  this.showPages===1 ){
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
  .confirm_btn{
    margin-left:50%;
    transform:translateX(-50%);
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


