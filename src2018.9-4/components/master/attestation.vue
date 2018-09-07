<template>
  <div id="app">
    <div class="container" style="width: 101%">
      <div class="selector_list">
        <div class="list">
          工程师手机号 :
          <el-input
            placeholder="请填写内容"
            v-model.trim="telBind">
          </el-input>
        </div>
        <div class="list">
          工程师姓名 :
          <el-input
            placeholder="请填写内容"
            v-model.trim="name">
          </el-input>
        </div>
        <div class="list orderType">
          服务工种 :
          <el-cascader id="skill"
                       @change="changeSelector2"
                       :options="labeloptions2"
                       change-on-select
                       @active-item-change="handleItemChange"
                       :props="props"
          ></el-cascader>
        </div>
        <div class="list">
          认证状态 :
          <el-select
            v-model.trim="certificateState.SourceTypeValue" placeholder="请选择"
            @change="selectorArea(certificateState,certificateState.SourceType,certificateState.SourceTypeValue)">
            <el-option
              v-for="items in certificateState.SourceType"
              :key="items.value"
              :value="items.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="list">
          认证来源:
          <el-select
            v-model.trim="laiyuan" placeholder="请选择" @change="laiyuanType(laiyuan)">
            <el-option
              v-for="items in laiyuanArray"
              :key="items.id"
              :label="items.name"
              :value="items.name"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!--查询按钮-->
      <div class="btn_inquiry" @click="quiry">
        查询
      </div>
      <div class="dable_lsit">
        <!--导出-->
        <table cellSpacing="0px" cellpadding="0">
          <thead  >
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">
              {{item}}
              <seqencing-icon v-if="$queryFun.sortFun(index,sortData)" :data="$queryFun.sortFun(index,sortData)" :getTableList="getTableList" :params="paramsData()" ></seqencing-icon>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.masterInfos">
            <!--序号-->
            <td>
              {{index+1}}
            </td>
            <!--工程师编号-->
            <td>
              {{item.id|placeholder}}
            </td>
            <!--工程师姓名-->
            <td>
              {{item.name|placeholder}}
            </td>
            <!--服务城市-->
            <td>
              {{item.city|placeholder}}
            </td>
            <!--工程师手机号-->
            <td>
              {{item.phoneNum|placeholder}}
            </td>
            <!--提交时间-->
            <td>
              {{item.certificateTime|moment('YYYY-MM-DD HH:mm:ss')|placeholder}}
            </td>
            <!--注册时间-->
            <td>
              {{item.createTime|moment('YYYY-MM-DD HH:mm:ss')|placeholder}}
            </td>
            <!--认证来源-->
            <td>
              {{item.source | sourceType}}
            </td>
            <!--认证状态 -->
            <td>
              {{item.certificateState | certificateState}}
            </td>
            <!--操作-->
            <td>
                <span class="recover" v-if="'2'!=item.certificateState" v-show="$isButtonObj('bn-master-authentication-details')">
                  <el-button type="text" @click="open2(item,false)"><i></i>
                    {{text.forbidden}}
                  </el-button>
                </span>
                <span :class="{'recover':item.btnType=='0'}" v-if="'2'!=item.certificateState" v-show="$isButtonObj('bn-master-authentication-details')">
                  <el-button type="text" @click="open2(item,true)"><i></i>
                  {{text.recover}}
                </el-button></span>
                <span class="details_icon" v-show="$isButtonObj('bn-master-authentication-details')"><el-button type="text" @click="details(item,index)"><i></i>详情</el-button></span>
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
    <div class="alert" v-if="isDetailed.isShow">
      <alert-info :isDetailed="isDetailed" :quiry="quiry">
      </alert-info>
    </div>
    <el-dialog style="z-index:999999"  :visible.sync="dialogTableVisible" size="tiny">
      <ul class="alert_forbidden_text">
        <li v-for="(item,index) in alertForbiddenList" :key="index" @click="selectorForbidden(item,index)">
          {{item.name}} <span v-show="item.selector!='0'"></span>
        </li>
      </ul>
      <textarea class="alert_forbidden_area" v-model.trim="textareaContent">
        </textarea>
      <el-button class="confirm_btn" @click="confirmForbidden(alertForbiddenList,textareaContent)" type="primary">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
  import alertInfo from "./alertInfo";
  export default {
    components:{
      alertInfo,
    },
    data() {
      return {
        numType: "",
        laiyuanArray: [{
          id: "1",
          name: "Android端"
        },
          {
            id: "2",
            name: "Ios端"
          },
          {
            id: "3",
            name: "官网端"
          }],
        laiyuan: '',
        text:{
          forbidden:"认证驳回",
          recover:"认证通过"
        },
        isDetailed:{
          isShow:false,
          title:"认证详情"
        },
        objItem:{},
        certificateState:{
          name: "认证状态",
          key: "certificateState",
          SourceTypeValue: '',
          SourceType: [
            {
              value: '---请选择---',
              id: "1,3"
            },
            {
              value: '认证中',
              id: "1"
            }, {
              value: '认证驳回',
              id: "3"
            }
          ]
        },
        textareaContent:"",
        flag:true,
        dialogTableVisible: false,
        alertForbiddenList:[
          {
            name:"个人信息缺失",
            selector:"0",
          }, {
            name:"图片信息缺失",
            selector:"0",
          }, {
            name:"关键信息错误",
            selector:"0",
          }, {
            name:"该城市未开通",
            selector:"0",
          }, {
            name:" 其他",
            selector:"0",
          }
        ],
        currentPage4: 1,
        checked:false,
        theadsName:[
          '序号',
          '工程师编号',
          '工程师姓名',
          '服务城市',
          '工程师手机号',
          '提交时间',
          '注册时间',
          '认证来源',
          '认证状态',
          '操作'
        ],
        sortData: [
          {
            index:5,
            sortAscendingValues:[" create_time asc "],  //升序
            gradeDownValues:[" create_time desc "],     //降序
          }
          , {
            index:7,
            sortAscendingValues:[" source asc "],  //升序
            gradeDownValues:[" source desc "],     //降序
          }
          , {
            index:6,
            sortAscendingValues:[" register_time asc "],  //升序
            gradeDownValues:[" register_time desc "],     //降序
          }
        ],
        input7: '',
        telBind:'',   //绑定手机
        isClose:false,
        name:"",
        isForbidden:false,
        isAlert:this.$store.state.isAlert,
        isActive:"0",   //选中的
        areaoptions1: [],
        labeloptions2: [],
        props: {
          value: 'label',
          children: 'cities',
        },
        selectorBehindObj: {"certificateState": "1,3"},
        tableListData:{
          pageNo:1,
          pageSize:20,
          total:0,
          pageTotal: 1,
          masterInfos:[]
        },
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0,
      }
    },
    beforeRouteEnter(to,from,next){
      next(Vue=>{
        Vue.quiry();
      })
    },
    beforeRouterLeave(to,from,next){
      next()
    },
    created(){
      this.quiry();
      let url=this.$apidomain+"/common/findlabelbusinessoptions";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.labeloptions2 = data.result;
      })
      url=this.$apidomain+"/common/findprovinceandcitylist";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.areaoptions1 = data.result;
      })
    },
    methods: {
      laiyuanType(value) {
        this.laiyuanArray.forEach((item, index) => {
          if (item.name == value) {
            this.numType = item.id;
          }
        })

      },
//      <!--分页查询数据对象功能组合start-->
      quiry(){
        this.getTableList(this.paramsData());
      },
      paramsData(){
        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "phoneNum":this.telBind,
          "name":this.name,
          "certificateState":this.selectorBehindObj.certificateState,
          "skillId": this.selectorBehindObj.skillId,
          "source": this.numType||"",
        }}
      },
      getTableList(params){
        let url=this.$apidomain+"/masterinfo/findPage";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.tableListData = data.result;
          this.showPages = data.result.pageNo;
          this.currentPageSize = data.result.pageSize;
          this.total = data.result.total;
          this.pageTotal = data.result.pageTotal
         this.tableListData.masterInfos.forEach(v=>{
               v.checked=false
         })
        })
      },
//      <!--分页查询数据对象功能组合end-->
//      <!--弹窗功能start-->
      details(item,index){
        this.isDetailed.id = item.id;
        this.isDetailed.isShow=true;
      },
//      <!--弹窗功能end-->
      changeSelector2(value){
        this.labeloptions2.forEach((v,i)=>{
          if(value[0]===v.label){
            this.selectorBehindObj.skillId=v.id;
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.selectorBehindObj.skillId=e.id
              }
            })
          }
        });
      },
//      <!--获取城市下的区域信息与服务工种 end-->
//      <!--禁用启用操作 start-->
      open2(item,ispass) {
        if(!ispass){
          this.dialogTableVisible = true;
          this.objItem = item;
        }else{
          this.$confirm('此操作将认证通过，是否继续？', '认证通过', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var o={};
            o.id=item.id;
            o.certificateState = "2";
            o.templateCodeString="tongguo"
            let url=this.$apidomain+"/masterinfo/updateMasterinfo";
            this.$http.post(url,o).then(res=>{
              let data = res.data;
              this.$message({
                type: 'success',
                message: '认证通过!'
              });
              this.getTableList(this.paramsData())
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消恢复'
            });
          });
        }
      },
//认证驳回  start
      confirmForbidden(item,textContent){
        var o={};
        item.forEach((v)=>{
          if(v.selector===true){
            o.certificateRemark=v.name
          }
        });
        if(textContent){
          o.certificateRemark +=" : "+textContent; //内容
        }else{
          o.certificateRemark +=" ";
        }
        o.id=this.objItem.id;
        o.certificateState = "3";
        o.templateCodeString="bohui"
        let url=this.$apidomain+"/masterinfo/updateMasterinfo";
        this.$http.post(url,o).then(res=>{
          let data = res.data;
          if("0000"==data.code){
            this.dialogTableVisible=false;
            this.$message({
              type: 'success',
              message: '认证已驳回!'
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
//认证驳回  end

      selectorForbidden(item,index){
        this.alertForbiddenList.forEach((v)=>{
          v.selector=false;
        });
        item.selector=!item.selector;
      },
//      <!--禁用启用操作 end-->
      selectorArea(item,values,SourceTypeValue){  //认证状态
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        });

      },
      isCheckbox(data,checkedAll){
        if(!data.checked){
          this.checked=false;
          return;
        }
        checkedAll.forEach((v,i)=>{
          this.checked=v.checked;
        })
      },
      wholeSelector(data,currentState){
        data.forEach((v,i)=>{
          v.checked=currentState
        })
      },
      Reminded(item,index){ //提点
        alert("执行提点操作")
      },
      derive(){        //导出事件

      },
      handleSizeChange(val) {      //每页显示多少条
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
        this.showPages=1;     //第一页
        this.getTableList(this.paramsData());
      },
      lasePage(){
        if(this.showPages===this.pageTotal){
          return alert("已经是最后一页")
        }
        this.showPages=this.pageTotal; //最后一页
        this.getTableList(this.paramsData());
      },
      handleItemChange(val) {
      },
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        })
      },
      isSelector(index){
        this.isActive=index;
      },
      forbidden(){
        this.isForbidden=true;
        this.isClose=false;
        this.dialogTableVisible=true;
//        alert("这是拒绝")
      },
      close(){
        if(!this.flag){
          return alert("已经通过")
        }
        this.$confirm('是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '成功!'
          });
          this.isClose=true;
          this.isForbidden=false;
          this.flag=false;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      shutAlert(){   //关闭弹框
        this.$store.commit("displayAlert",false); //通过vux 传递数据
        this.isAlert=this.$store.state.isAlert;
      },
    },
    mounted() {
    }
  }
</script>
<style>
  .el-dialog__wrapper{
    z-index: 9999 !important;
  }
  .el-message-box__wrapper{
      z-index: 9999 !important;
  }
  .orderType > #skill > .el-cascader__label{
            line-height: 60px !important;

  }
</style>
<style scoped lang="scss">

  @import "../../assets/styles/comminStyle";
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


