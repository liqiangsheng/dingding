<template>
  <div id="app">
    <div class="container">
      <div class="selector_list">
        <div class="list">
          师傅编号 :
          <el-input
            placeholder="请输入内容"
            v-model="masterId">
          </el-input>
        </div>
        <div class="list">
          师傅姓名 :
          <el-input
            placeholder="请输入内容"
            v-model="name">
          </el-input>
        </div>
        <div class="list">
          手机号 :
          <el-input
            placeholder="请输入内容"
            v-model="phoneNum">
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
          <tr v-for="(item,index) in tableListData.masterLeaveApplyFors">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.masterId}}
            </td>
            <td>
              {{item.name}}
            </td>
            <td>
              {{item.phoneNum}}
            </td>
            <td>
              {{item.startTime|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td>
              {{item.endTime|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td>
              {{item.type|LeaveApplyForShow}}
            </td>
            <td>
              {{item.applyForCause}}
            </td>
            <td>
              {{item.state|LeaveApplyForStateShow}}
            </td>
            <td>
              <span class="recover" v-show="0==item.state">
                  <el-button type="text" @click="open2(item)"><i></i>
                    驳回
                  </el-button>
                </span>
              <span class="" v-show="0==item.state">
                  <el-button type="text" @click="open3(item)"><i></i>
                    通过
                  </el-button>
              </span>
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

    <!--弹框-->
    <el-dialog style="z-index:999999"  :visible.sync="dialogTableVisible" size="tiny">
    <ul class="alert_forbidden_text">
    <li v-for="(item,index) in alertForbiddenList" :key="index" @click="selectorForbidden(item,index)">
    {{item.name}} <span v-show="item.selector!='0'"></span>
    </li>
    </ul>
    <textarea class="alert_forbidden_area" v-model="textareaContent">
    </textarea>
    <el-button class="confirm_btn" @click="confirmForbidden(alertForbiddenList,textareaContent)" type="primary">确定</el-button>
    </el-dialog>
    <div>
    </div>
  </div>
</template>
<script>
  import detail from "./alert/bdetail.vue";
  export default {
    components:{
      detail,
    },
    data() {
      return {
//        <!--禁用启用start-->
        textareaContent:"",
        alertForbiddenList:[
          {
            name:"请假频次过多",
            selector:"0",
          }, {
            name:"其他",
            selector:"0",
          }
        ],
        dialogTableVisible: false,
        //<!--禁用启用end-->
        //<!--搜索框筛选数据start-->
        masterId:'',
        name:'',
        phoneNum:'',
        //<!--搜索框筛选数据end-->
        //<!--搜索框与table与分页start-->
        theadsName:[
          '序号',
          '师傅编号',
          '姓名',
          '手机号',
          '开始时间',
          '结束时间',
          '请假类型',
          '请假事由',
          '申请状态',
          '操作'
        ],
        selectorBehindObj:{},
        tableListData:{
          pageNo:1,
          pageSize:20,
          total:0,
          pageTotal: 1,
          masterLeaveApplyFors:[]
        },
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0,
        //<!--搜索框与table与分页end-->
      }
    },
    created(){
      this.quiry();
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
          "siteId":this.$getLocalStorage("enrolleeinfo")[0].id,
          "masterId":this.masterId,
          "name":this.userName,
          "phoneNum":this.phoneNum,
        }}
      },
      getTableList(params){
        let url=this.$apidomain+"/masterLeaveApplyFor/findPage";
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
//      <!--禁用启用操作 start-->
      open2(item) {
        this.dialogTableVisible = true;
        this.objItem = item;
      },
      open3(item) {
        this.$confirm('此操作将通过请假申请，是否继续？', '通过', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var o={};
          o.id=item.id;
          o.state = "1";
          let url=this.$apidomain+"/masterLeaveApplyFor/updateMasterLeaveApplyFor";
          this.$http.post(url,o).then(res=>{
            let data = res.data;
            this.$message({
              type: 'success',
              message: '通过成功!'
            });
            this.quiry()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消通过'
          });
        });
      },
      confirmForbidden(item,textContent){
        var o={};
        item.forEach((v)=>{
          if(v.selector===true){
            o.rejectCause=v.name
          }
        });
        if(textContent){
          o.forbiddenRemark+="-"+textContent; //内容
        }
        o.id=this.objItem.id;
        o.state = "2";
        let url=this.$apidomain+"/masterLeaveApplyFor/updateMasterLeaveApplyFor";
        this.$http.post(url,o).then(res=>{
          let data = res.data;
          if("0000"==data.code){
            this.dialogTableVisible=false;
            this.$message({
              type: 'success',
              message: '驳回成功!'
            });
            this.quiry()
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      selectorForbidden(item,index){
        this.alertForbiddenList.forEach((v)=>{
          v.selector=false;
        });
        item.selector=!item.selector;
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


