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
        </div>  <div class="list">
          网点名称 :
          <el-input
            placeholder="请输入内容"
            v-model="networkName">
          </el-input>
        </div>  <div class="list">
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
      <div class="dable_lsit table">
        <!--导出-->
        <table cellSpacing="0px" cellpadding="0">
          <thead>
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
              {{item.forbiddenCause}}-{{item.forbiddenRemark}}
            </td>
            <td>
              {{item.registerTime | moment('YYYY-MM-DD HH:mm:ss')|placeholder}}
            </td>
            <td>
              <span  v-show="$isButtonObj('bn-site-list-forbidden')"><el-button type="text" @click="open2(item,index)"><i :class="item.state==='1'?'forbidden_icon':'start_icon'"></i>{{item.state|isStartState}}</el-button></span>
              <span class="details_icon " id="edit" v-show="$isButtonObj('bn-site-abnormal-details')"><el-button type="text" @click="addEdit(item,false)"><i></i>详情</el-button></span>
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
    <!--详情-->
    <div class="alert" v-if="isDetailed.isShow">
      <alert-info :isDetailed="isDetailed" :quiry="quiry">
      </alert-info>
    </div>
    <!--编辑弹框end-->
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
        //查询数据 start
        companyTel:"",   //网点电话
        networkName:"",   //网点名称
        linkmanName:"",      //联系人
        //查询数据 end
//详情数据 start
        isDetailed:{
          isShow:false,
          id:"",
          title:"网点账号详情"
        },
//详情数据 end
        edit:{
          isShow:false,
          title:"师傅提点设置"
        },
        optionList:[
          {
            name: "服务工种",
            key: "skillId",
            SourceTypeValue: '',
            SourceType: []
          },{
            name: "所属城市",
            key: "cityId",
            SourceTypeValue: '',
            SourceType: []
          },
        ],

        textareaContent:"",
        flag:true,
        dialogTableVisible: false,
        alertForbiddenList:[
          {
            name:"师傅违规操作",
            selector:"0",
          }, {
            name:" 师傅认证资料不全",
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
          '城市',
          "网点名称",
          '用户名',
          '公司电话',
          '异常原因',
          '注册时间',
          '操作'
        ],
        sortData: [
          {
            index:6,
            sortAscendingValues:[" register_time asc "],  //升序
            gradeDownValues:[" register_time desc "],     //降序
          }
        ],
        input7: '',
        classify:'',
        isClose:false,
        isForbidden:false,
        cityId:"",
        isAlert:this.$store.state.isAlert,
        isActive:"0",
        options2: [
        ],
        selectorBehindObj:{},
        tableListData:{
          pageNo:1,
          pageSize:50,
          total:50,
          pageTotal: 1,
        },          //表格数据
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
          if("cityId"===v.key){
            v.SourceType.push({"id":"","value":"---请选择---"});
            data.result.forEach((v2)=>{
              v.SourceType.push({"id":v2.id,"value":v2.name});
            })
          }
        });
      });
      let url1=this.$apidomain+"/common/findflabelbusinessname";
      this.$http.get(url1).then(r=>{
        let data=r.data;
        this.optionList.forEach((v)=>{
          if("skillId"===v.key){
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
          "name":this.networkName,//网点名称
          "companyTel":this.companyTel,//网点电话
          "linkmanName":this.linkmanName,//联系人
//          "certificateState":this.selectorBehindObj.certificateState,
          "state":"2",
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
          this.tableListData.siteInfos.forEach((v,i)=>{
            v.checked=false;
          });
//          return data.code;
        })
      },
//恢复 start
      open2(item,index) {
//          this.dialogTableVisible=true;
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
           if(data.code==="0000"){
             this.$message({
               type: 'success',
               message: '恢复成功!'
             });
             this.getTableList(this.paramsData())
           }
            });

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消恢复用'
            });
          });
      },
//恢复 end

      addEdit(item,isAdd){
        this.isDetailed.id=item.id
        this.isDetailed.isShow=true;

      },
      confirmForbidden(item,textContent){
        var o={};
        item.forEach((v)=>{
          if(v.selector===true){
            o.refuseContent=v.name
          }
        });
        if(textContent){
          o.refuseContentText=textContent;

        }
        this.dialogTableVisible=false;
        this.$store.commit("sendRefuseData",o);
      },
      selectorForbidden(item,index){
        this.alertForbiddenList.forEach((v)=>{
          v.selector=false;
        });
        item.selector=!item.selector;

      },
      selectorArea(item,values,SourceTypeValue){
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
    },
    mounted() {
    },
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
  #app{
    .container{
      >.selector_list{
        margin-top:0;
      }


    }
    .table {
      #edit {
        /*i {*/
          /*background: url(../../../../static/images/en.png) center center no-repeat;*/
          /*background-size: 100% 100%;*/
        /*}*/
      }
      .child_table{
        tr{
          border:none;
          >.child_table_td{
            border:none;
            padding:10px ;
          }
        }
      }
    }

    }

  .alert{
    >p{
      position:absolute;
      top:16%;
      padding:10px 15px;
      cursor: pointer;
      right:22%;
      font-size: 35px;
    }
  }
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



