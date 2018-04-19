<template>
  <div id="app">
    <div class="container">
      <div class="selector_list">

        <div class="list">
          网点电话 :
          <el-input
            placeholder="请输入内容"
            v-model="companyTel">
          </el-input>
        </div>
        <div class="list">
          网点名称 :
          <el-input
            placeholder="请输入内容"
            v-model="siteName">
          </el-input>
        </div>
        <div class="list">
          联系人 :
          <el-input
            placeholder="请输入内容"
            v-model="linkmanName">
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
          <el-button @click="add()" size="large" class="derive_btn" v-show="$isButtonObj('bn-site-account-new')">新增</el-button>
        </div>

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
          <tr v-for="(item,index) in tableListData.siteInfos">
            <td>
             {{index+1}}
            </td>
            <td>
              {{item.city|placeholder}}
            </td>
            <td>
              {{item.name|placeholder}}
            </td>
            <td>
              {{item.username|placeholder}}
            </td>
            <td>
              {{item.companyTel|placeholderTel}}
            </td>
            <td>
              {{item.state | userState}}
            </td>
            <td>
              {{item.registerTime|moment('YYYY-MM-DD HH:mm:ss')|placeholder}}
            </td>
            <td>
              <span :class="{'recover':item.state=='2'}" v-show="$isButtonObj('bn-site-list-forbidden')" ><el-button type="text" @click="open2(item)"><i></i>
                  {{item.state|enableDisable}}
                </el-button></span>
              <span class="details_icon" v-show="$isButtonObj('bn-site-list-details')"><el-button type="text" @click="details(item,index)"><i></i>详情</el-button></span>
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
      <textarea class="alert_forbidden_area" v-model="textareaContent">
        </textarea>
      <el-button class="confirm_btn" @click="confirmForbidden(alertForbiddenList,textareaContent)" type="primary">确定</el-button>
    </el-dialog>

    <!--新增网点alert Start-->
    <div class="alert" v-if="isAdd.isShow">
      <add-network :isAdd="isAdd" :quiry="quiry">
      </add-network>
    </div>
    <!--新增网点alert End-->
  </div>
</template>
<script>
  import alertInfo from "./alertInfo";
  import addNetwork from "./addAlert";
  export default {
    components:{
      alertInfo,
      addNetwork
    },
    data() {
      return {
        //添加网点 start
        isAdd:{
          title:"新增网点",
          isShow:false
        },
        //添加网点 end
        isDetailed:{
          isShow:false,
          title:"认证详情"
        },
        optionList: [
          {
            name: "所属城市",
            key: "cityId",
            SourceTypeValue: '',
            SourceType: []
          },
          {
            name: "服务工种",
            key: "skillId",
            SourceTypeValue: '',
            SourceType: []
          },
        ],
        textareaContent:"",
        siteName:"",
        companyTel:"",
        linkmanName:"",
        flag:true,
        dialogTableVisible: false,
        alertForbiddenList:[
          {
            name:"多次恶意违规收费",
            selector:"0",
          }, {
            name:"多次被投诉",
            selector:"0",
          }, {
            name:"关键资料不全",
            selector:"0",
          }, {
            name:"引导用户线下付款",
            selector:"0",
          }, {
            name:"师傅离职",
            selector:"0",
          }, {
            name:"其他",
            selector:"0",
          }
        ],
        currentPage4: 1,
        checked:false,
        theadsName:[
          '序号',
          '城市',
          '网点名称',
          '用户名',
          '公司电话',
          '状态',
          '注册时间',
          '操作'
        ],
        sortData: [
          {
            index:5,
            sortAscendingValues:[" state asc "],  //升序
            gradeDownValues:[" state desc "],     //降序
          },  {
            index:6,
            sortAscendingValues:[" register_time asc "],  //升序
            gradeDownValues:[" register_time desc "],     //降序
          }
        ],
        input7: '',
        telBind:'',   //绑定手机
        isClose:false,
        isForbidden:false,
        isAlert:this.$store.state.isAlert,
        isActive:"0",   //选中的
        props: {
          value: 'label',
          children: 'cities',
        },
        selectorBehindObj:{},
        tableListData:{
          pageNo:1,
          pageSize:20,
          total:0,
          pageTotal: 1,
          siteInfos:[]
        },
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0,
      }
    },
    created(){
      this.quiry();
      let url=this.$apidomain+"/common/findcitylistareainfo";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.optionList.forEach((v)=>{
          if("cityId"==v.key){
            v.SourceType.push({"id":"","value":"---请选择---"});
            data.result.forEach((v2)=>{
              v.SourceType.push({"id":v2.id,"value":v2.name});
            })
          }
        });
      });

      url=this.$apidomain+"/common/findflabelbusinessname";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.optionList.forEach((v)=>{
          if("skillId"==v.key){
            v.SourceType.push({"id":"","value":"---请选择---"});
            data.result.forEach((v2)=>{
              v.SourceType.push({"id":v2.id,"value":v2.name});
            })
          }
        });
      });
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
          "id":this.siteId,
          "name":this.siteName,//网点名称
          "companyTel":this.companyTel,//网点电话
          "linkmanName":this.linkmanName,//联系人
          "certificateState":this.selectorBehindObj.certificateState,
          "state":this.selectorBehindObj.state,
          "type":this.selectorBehindObj.type,
          "level":this.selectorBehindObj.level,
          "siteId":this.selectorBehindObj.siteId,
          "cityId":this.selectorBehindObj.cityId,
          "skillId":this.selectorBehindObj.skillId,
          "areaId":this.selectorBehindObj.areaId,
        }}
      },
      getTableList(params){
        let url=this.$apidomain+"/siteInfo/findPage";
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
        this.isDetailed.id = item.id;
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
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.selectorBehindObj.cityId=e.id
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
//      <!--获取城市下的区域信息与服务工种 end-->
      //      <!--禁用启用操作 start-->
      open2(item) {
        if("1"==item.state){
          this.dialogTableVisible = true;
          this.objItem = item;
        }else{
          this.$confirm('此操作将恢复该数据，是否继续？', '恢复', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var o={};
            o.id=item.id;
            o.state = "1";
            let url=this.$apidomain+"/siteInfo/updateSiteInfo";
            this.$http.post(url,o).then(res=>{
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
        let url=this.$apidomain+"/siteInfo/updateSiteInfo";
        this.$http.post(url,o).then(res=>{
          let data = res.data;
          if("0000"==data.code){
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
      selectorArea(item,values,SourceTypeValue){  //认证状态
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        });
        console.log(this.selectorBehindObj);
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
      changeSelector(value){
        this.options2.forEach((v,i)=>{
          if(value[0]===v.label){
            this.cityId=v.id;    //选择城市
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                this.cityId=e.id    //选择区
              }
            })
          }
        });
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

      //禁用和恢复 操作
      Reminded(item){       //提点操作
        alert("设置提点跳转")
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
</style>
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


