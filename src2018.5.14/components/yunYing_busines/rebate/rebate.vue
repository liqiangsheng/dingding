<template>
  <div id="app">
    <div class="container">
      <div class="selector_list">
        <div class="list">
          折扣名称 :
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
          <tr v-for="(item,index) in tableListData.serviceSales">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.saleName|placeholder}}
            </td>
            <td>
              {{item.startTime|moment('YYYY-MM-DD HH:mm:ss')}}~{{item.endTime|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td>
              {{item.orderTotalNum}}
            </td>
            <td>
              {{item.serviceTotalNum|placeholder}}
            </td>
            <td>
              {{item.updateTime|moment('YYYY-MM-DD HH:mm:ss')||item.createTime|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td>
              {{item.saleState | agioStatus}}
            </td>
            <td>
                <span :class="{'recover':item.saleState==3}" v-show="$isButtonObj('bn-master-account-forbidden')"><el-button type="text" @click="open2(item)"><i></i>
                  {{item.saleState | agioStatusButton}}
                </el-button>
                </span>
              <span class="details_icon Reminded_icon" id="Reminded_icon" v-show="$isButtonObj('bn-site-remind-delete')"><el-button type="text" @click="del(item)"><i class="del_icon"></i> &nbsp;删除</el-button></span>
              <span class="details_icon"><el-button type="text" @click="details(item,index)"><i></i>详情</el-button></span>
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
      <add-alert :quiry="quiry" :isAdd="isDetailed"></add-alert>
    </div>
    <!--大弹框 详情end-->

    <div class="alert" v-if="isAdd.isShow" >
      <add-alert :quiry="quiry" :isAdd="isAdd"></add-alert>
    </div>

    <!--弹框-->
    <!--<forbidden-alert :data="forbiddenData" :getTableList="quiry"></forbidden-alert>-->
      <div>
    </div>
  </div>
</template>
<script>
  import addAlert from "./comments/addAlert"

  export default {
    components:{
      addAlert
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
          title:"设置折扣",
          isShow:false
        },
        isAdd:{
          title:"设置折扣",
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
            name: "活动状态",
            key: "state",
            SourceTypeValue: '',
            SourceType: this.$store.state.rebateState,
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
          '折扣名称',
          '折扣周期',
          "下单数",
          '完工数',
          '近期更新',
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
      // getEE(){
      //      let url=this.$apidomain+"/common/findlabelbusinessoptions";

      // },
//      <!--分页查询数据对象功能组合start-->
      del(item){
        this.$confirm('此操作将删除该数据，是否继续？', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url=`${this.$apidomain}/sale/deleteServiceSale?id=${item.id}`;
          this.$http.get(url).then(res=>{
            let data = res.data;
            if(data.code==="0000"){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.quiry()
            }else{
              this.$message.error(data.error);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      quiry(){
        this.getTableList(this.paramsData());
      },
      paramsData(){
        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "saleState":this.selectorBehindObj.state?this.selectorBehindObj.state-0:"",
          "saleName":this.selectorBehindObj.userName,
          "userRoleId":this.selectorBehindObj.userRoleId
        }}
      },
      getTableList(params){
        let url=this.$apidomain+"/sale/findpage";
        this.$http.get(url,params).then(r=>{
            let data=r.data;
          if(data.code==="0000"){
            this.tableListData = data.result;
              this.showPages = data.result.pageNo;
              this.currentPageSize = data.result.pageSize;
              this.total = data.result.total;
              this.pageTotal = data.result.pageTotal;
          }else{
              this.$queryFun.successAlert.call(this,data.error);
          }
        })
      },
//      <!--分页查询数据对象功能组合end-->
//      <!--弹窗功能start-->

      details(item,index){    //详情 编辑
        this.isDetailed.isShow=true;
        this.isDetailed.data=item;
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
//      <!--恢复 ||禁用 start-->
      isForbiddenFun(item,status,text){
        let url=`${this.$apidomain}/sale/stopServiceSale?id=${item.id}&status=${status}`;
        this.$confirm(`此操作将${text}该数据，是否继续？, ${text}`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(url).then(res=>{
            let data = res.data;
            if(data.code==="0000"){
              this.$message({type: 'success', message: `${text}成功!`});
              this.getTableList(this.paramsData())
            }else{
                this.$queryFun.successAlert.call(this,data.error);
            }
          })
        }).catch(() => {
          this.$queryFun.successAlert.call(this,`已取消${text}`);
        });
      },
      open2(item) {
        item.saleState===2?this.isForbiddenFun(item,3,"禁用"):this.isForbiddenFun(item,2,"启用");
      },
//      <!--恢复 ||禁用 end-->
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
        data.forEach((v,i)=>{
          v.checked=currentState
        })
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
        let key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        })
      },
      isSelector(index){
        this.isActive=index;
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
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/styles/comminStyle2";
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




