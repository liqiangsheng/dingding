<template>
  <div id="app">
    <div class="container">
      <div class="selector_list">
        <div class="list">
          用户名 :
          <el-input
            placeholder="请输入用户名"
            v-model="selectorBehindObj.userName">
          </el-input>
        </div>

        <div  v-for="(item,index) in optionList" :key="index" class="list">
          {{item.name}} :
          <el-select
            v-model="item.SourceTypeValue" placeholder="请选择" @change="selector(item,item.SourceType,item.SourceTypeValue)">
            <el-option
              v-for="items in item.SourceType"
              :key="items.value"
              :value="items.value"
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
        <div class="derive">
          <el-button @click="add" size="large" v-show="$isButtonObj('bn-master-account-newaccount')">新增</el-button>
        </div>
        <table cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.sysUsers">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.id|placeholder}}
            </td>
            <td>
              {{item.name|placeholder}}
            </td>
            <td>
              {{item.userRoleId |userRoleName}}
            </td>
            <td>
              {{item.phoneNum|placeholder}}
            </td>
            <td>
              {{item.loginTime|moment('YYYY-MM-DD HH:mm:ss')|placeholder}}
            </td>
            <td>
              {{item.state | userState}}
            </td>

            <td>
                <span :class="{'recover':item.state=='0'}" v-show="$isButtonObj('bn-master-account-forbidden')"><el-button type="text" @click="open2(item)"><i></i>
                  {{item.state|enableDisable}}
                </el-button></span>
              <span class="details_icon"><el-button type="text" @click="details(item,index)"><i></i>详情</el-button></span>
              <!--<span class="details_icon Reminded_icon"><el-button type="text" @click="Reminded(item,index)"><i></i>提点</el-button></span>-->
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
      <alert-info :isDetailed="isDetailed" :quiry="quiry">
      </alert-info>
    </div>
    <!--大弹框 详情end-->

    <div class="alert" v-if="isAdd.isShow" >
      <add-alert :isAdd="isAdd" :quiry="quiry">
      </add-alert>
    </div>

    <!--弹框-->
    <forbidden-alert :data="forbiddenData" :getTableList="quiry"></forbidden-alert>
      <div>
    </div>
  </div>
</template>
<script>
  import alertInfo from "./alertInfo";
  import addAlert from "./add/addAlert";
  import forbiddenAlert from "./forbiddenAlert";

  export default {
    components:{

      alertInfo,
      addAlert,
      forbiddenAlert
    },
    data() {
      return {
        forbiddenData:{
          isShow:false,
          title:"禁用账号",
          params:{
           "id":""
          },
          url:"sysUser/startUsing"
        },
        //<!--弹窗基础数据start-->
        isDetailed:{
          title:"账号详情",
          isShow:false
        },
        isAdd:{
          title:"新增师傅",
          isShow:false
        },
        //<!--弹窗基础数据end-->
        //<!--禁用启用start-->
        textareaContent:"",
        alertForbiddenList:this.$store.state.alertForbiddenList,
        dialogTableVisible: false,
        //<!--禁用启用end-->
        //<!--搜索框筛选数据start-->

        areaoptions1: [],
        labeloptions2: [],
        optionList: [
          {
            name: "角色名称",
            key: "userRoleId",
            SourceTypeValue: '',
            SourceType: []
          },{
            name: "状态",
            key: "state",
            SourceTypeValue: '',
            SourceType: this.$store.state.state,
          }
        ],
        props: {
          value: 'label',
          children: 'cities',
        },
        //<!--搜索框筛选数据end-->
        //<!--搜索框与table与分页start-->
        checked:false,
        theadsName:[
          '序号',
          '用户编号',
          '用户名',
          "角色名称",
          '手机号码',
          '最近登陆',
          '状态',
          '操作'
        ],
        selectorBehindObj:{
          userName:"",
        },
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
        //<!--搜索框与table与分页end-->
        isClose:false,
        isForbidden:false,
        isAlert:this.$store.state.isAlert,
        isActive:"0",
        //<!--顶部数据模板start-->

        //<!--顶部数据模板end-->
      }
    },
    created(){
     this.quiry();
      let url=this.$apidomain+"/common/findSysUserRole";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.optionList.forEach((v)=>{
          if("userRoleId"===v.key){
            v.SourceType.push({"id":"","value":"---请选择---"});
            data.result.forEach((v2)=>{
              v.SourceType.push({"id":v2.id,"value":v2.name});
            })
          }
        });
      }
      );
      url=this.$apidomain+"/common/findlabelbusinessoptions";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.labeloptions2 = data.result;
      })
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
          "state":this.selectorBehindObj.state,
          "name":this.selectorBehindObj.userName,
          "userRoleId":this.selectorBehindObj.userRoleId
        }}
      },
      getTableList(params){
        let url=this.$apidomain+"/sysUser/findPage";
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
        this.isDetailed.data = item;
        this.isDetailed.isShow=true;
      },
      add(){
        this.isAdd.isShow=true
      },
//      <!--弹窗功能end-->
//      <!--获取城市下的区域信息与服务工种 start-->
      changeSelector1(value){
        this.areaoptions1.forEach((v,i)=>{
          if(value[0]===v.label){
            this.selectorBehindObj.areaId=v.id;
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.selectorBehindObj.areaId=e.id
              }
            })
          }
        });
      },
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

//      <!--恢复 start-->
      open2(item) {
        if("1"==item.state){
          this.forbiddenData.params["id"]=item.id;
          this.forbiddenData.isShow = true;
          this.objItem = item;
        }else{
          this.$confirm('此操作将恢复该数据，是否继续？', '恢复', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let url=this.$apidomain+"/sysUser/forbidden";
            this.$http.post(url,{"id":item.id}).then(res=>{
              let data = res.data;
              this.$message({
                type: 'success',
                message: '恢复成功!'
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
      selectorForbidden(item,index){
        this.alertForbiddenList.forEach((v)=>{
          v.selector=false;
        });
        item.selector=!item.selector;
      },
//      <!--禁用启用操作 end-->
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
        console.log(currentState);
        data.forEach((v,i)=>{

          v.checked=currentState
        })
      },
      Reminded(item,index){
        this.$store.commit("displayAlert",true);
        this.isAlert=this.$store.state.isAlert;
      },
      derive(){

      },
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
      isSelector(index){
        this.isActive=index;
      },
      forbidden(){
        this.isForbidden=true;
        this.isClose=false;
        this.dialogTableVisible=true;
      },
      close(pre,addDataAlert){
        if(pre==="preserve"){    //判断是否是保存
          addDataAlert.inputs.forEach(v=>{
            addDataAlert.selectorBehindObj[v.key]=v.value
          });
        }
        this.isClose=true;
        this.isForbidden=false;
        this.isAdd=false;
        this.$store.commit("displayAlert",false); //通过vux 传递数据
        this.isAlert=this.$store.state.isAlert;
      },
    },
    mounted() {
    },
  }
</script>
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




