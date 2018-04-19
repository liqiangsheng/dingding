<template>
  <div id="app">
    <div class="container">
      <div class="selector_list">
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
        <div class="derive">
          <el-button @click="addEdit(null,true)" size="large" v-show="$isButtonObj('bn-channel-remind-new')">新增</el-button>
        </div>

        <table cellSpacing="0px" cellpadding="0">
          <thead >
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">
              {{item}}
              <seqencing-icon v-if="$queryFun.sortFun(index,sortData)" :data="$queryFun.sortFun(index,sortData)" :getTableList="getTableList" :params="paramsData()" ></seqencing-icon>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.officialPartnerCommissionConfigs">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.officialPartnerName}}
            </td>
            <td>
              {{item.area}}
            </td>
            <td>
              {{item.labelName}}
            </td>
            <td>
              {{item.feeType}}
            </td>
            <td>
              {{item.shareValue}}{{item.shareTypeKey|shareTypeKeyShow}}
            </td>
            <td class="operate" >
              <span class="details_icon Reminded_icon" id="Reminded_icon" v-show="$isButtonObj('bn-channel-remind-delete')"><el-button type="text" @click="del(item,index)"><i></i> &nbsp;删除</el-button></span>
              <span class="details_icon " id="edit" v-show="$isButtonObj('bn-channel-remind-edit')"><el-button type="text" @click="addEdit(item,false)"><i></i>编辑</el-button></span>
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

    <!--编辑弹框-->
    <div class="alert" v-if="edit.isShow">
      <alert-info :edit="edit" :quiry="quiry" >
      </alert-info>
    </div>
    <!--编辑弹框end-->

  </div>
</template>
<script>
  import alertInfo from "./channel_alert/channelEdit";
  export default {
    components:{
      alertInfo,
    },
    data() {
      return {
        //渠道管理nav end
        edit:{
          isShow:false,
          title:"渠道提点设置"
        },
        theadsName:[
          '序号',
          '渠道',
          '城市',
          '分类',
          '费用类型',
          '提点价格',
          '操作'
        ],
        sortData: [
          {
            index:4,
            sortAscendingValues:[" fee_type asc "],  //升序
            gradeDownValues:[" fee_type desc "],     //降序
          },  {
            index:5,
            sortAscendingValues:[" share_value asc "],  //升序
            gradeDownValues:[" share_value desc "],     //降序
          }
        ],
        input7: '',
        classify:'',   //分类查询
        isClose:false,
        isForbidden:false,
        cityId:"", //城市id
        isAlert:this.$store.state.isAlert,
        isActive:"0",   //选中的
        optionList:[       //下拉列表数据
           {
              name:"渠道",
              key:"officialPartnerId",
              SourceTypeValue: '', //选中后的
              SourceType:[],
            },{
              name:"城市",
              key:"areaId",
              SourceTypeValue: '', //选中后的
              SourceType:[],
            },{
              name:"分类",
              key:"labelId",
              SourceTypeValue: '', //选中后的
              SourceType:[],
            },
        ],
        selectorBehindObj:{},
        tableListData:{},          //表格数据
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0,
      }
    },
    created(){
      this.quiry();
      let url=this.$apidomain+"/common/findchannel";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.optionList.forEach((v)=>{
          if("officialPartnerId"==v.key){
            v.SourceType.push({"id":"","value":"---请选择---"});
            data.result.forEach((v2)=>{
              v.SourceType.push({"id":v2.id,"value":v2.name});
            })
          }
        });
      });
      url=this.$apidomain+"/common/findcitylistareainfo";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.optionList.forEach((v)=>{
          if("areaId"==v.key){
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
          if("labelId"==v.key){
            v.SourceType.push({"id":"","value":"---请选择---"});
            data.result.forEach((v2)=>{
              v.SourceType.push({"id":v2.id,"value":v2.name});
            })
          }
        });
      });
    },
    methods: {
      //
      quiry(){
        this.getTableList(this.paramsData());
      },
      getTableList(params){
        let url=`${this.$apidomain}/officialPartnerCommissionConfig/findPage`;
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.tableListData = data.result;
          this.showPages = data.result.pageNo;
          this.currentPageSize = data.result.pageSize;
          this.total = data.result.total;
          this.pageTotal = data.result.pageTotal
        })
      },
      paramsData(){
        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "labelId":this.selectorBehindObj.labelId,
          "areaId":this.selectorBehindObj.areaId,
          "officialPartnerId":this.selectorBehindObj.officialPartnerId}
        }
      },
      //
      del(item,index){
        this.$confirm('此操作将删除该数据，是否继续？', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url=this.$apidomain+"/mastercommissionconfig/deletemasterCommissionConfig";
          this.$http.post(url,item).then(res=>{
            let data = res.data;
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.quiry();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      confirmForbidden(item,textContent){ //确定拒绝
        var o={};
        item.forEach((v)=>{
          if(v.selector===true){
            o.refuseContent=v.name
          }
        });
        if(textContent){
          o.refuseContentText=textContent; //内容

        }
        this.dialogTableVisible=false;
        this.$store.commit("sendRefuseData",o);   //通过vux 传递数据
//        alert("禁用成功")
      },
      selectorForbidden(item,index){
        this.alertForbiddenList.forEach((v)=>{
          v.selector=false;
        });
        item.selector=!item.selector;

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
      del(item,index){ //删除
        let url=this.$apidomain+"/officialPartnerCommissionConfig/deleteOfficialPartnerCommissionConfig";
        this.$http.post(url,item).then(res=>{
          let data=res.data;
          if(data.code==='0000'){
            this.$Message.success('删除成功');
            this.getTableList();
          }
        });
      },
      derive(){        //导出事件

      },
      add(){      //新增

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
      //提点
      addEdit(item,isAdd){
        if(!isAdd){
          this.edit.item=JSON.parse(JSON.stringify(item));
        }else{
          this.edit.item=null;
        }
        this.edit.isShow=true;
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

  @import "../../assets/styles/comminStyle";
  #app{
    .container{
      >.selector_list{
        margin-top:0;
      }


    }

    .table {
      #Reminded_icon {
        i {
          background: url(../../../static/images/del.png) center center no-repeat;
          background-size: 100% 100%;
          width: 14px;
          height: 14px;
        }
      }
      #edit {
        i {
          background: url(../../../static/images/en.png) center center no-repeat;
          background-size: 100% 100%;
        }
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
  .el-input{
    width:100%;
  }


</style>



