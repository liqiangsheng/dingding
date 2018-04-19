<template>
  <div id="app">
    <div class="container" >
      <div class="selector_list">
        <div class="list">
          子类编号 :
          <el-input
            placeholder="请输入内容"
            v-model="selectorBehindObj.id">
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
          <tr v-for="(item,index) in tableListData.officialPartnerSubsetInfos" :key="index">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.id}}
            </td>
            <td>
              {{item.name}}
            </td>
            <td>
              {{item.officialPartnerName}}
            </td>
            <td>
              {{item.userNumber}}
            </td>
            <td>
              {{item.totalOutput}}
            </td>
            <td>
              {{item.totalWater}}
            </td>
            <td>
              {{item.state|userState}}
            </td>
            <td class="operate" >
              <span :class="{'recover':item.state=='2'}" v-show="$isButtonObj('bn-channel-subset-forbidden')"><el-button type="text" @click="open2(item)"><i></i>
                  {{item.state|enableDisable}}
                </el-button></span>
              <span class="details_icon " id="edit" v-show="$isButtonObj('bn-channel-subset-edit')"><el-button type="text" @click="addEdit(item,'0')"><i></i>详情</el-button></span>
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
      <detail :isDetailed="isDetailed" :quiry="quiry">
      </detail>
    </div>

    <!--详情弹框 end-->
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
  import detail from "./channelDetail.vue"
  export default {
    components:{
      detail,
    },
    data() {
      return {
        edit:{
          isShow:false
        },
//显示详情数据 start
        isDetailed:{
          title:"子渠道详情",
          isShow:false
        },
 //显示详情数据 end
 //查询列表数据 start
        optionList:[
          {
            name:"状态",
            key:"state",
            SourceTypeValue: '',
            SourceType:[
              {
                value: '---请选择---',
                id:""
              }, {
                value: '启用',
                id:"1"
              }, {
                value: '禁用',
                id:"2"
              }
            ]
          },{
            name:"渠道",
            key:"officialPartnerId",
            SourceTypeValue: '',
            SourceType:[]
          }
        ],
 //查询列表数据 end
        textareaContent:"",
        flag:true,
        dialogTableVisible: false,
        alertForbiddenList:[
          {
            name:"停止合作",
            selector:"0",
          }, {
            name:"违规操作",
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
          '子类编号',
          '子类名称',
          '渠道',
          '用户量',
          '总单量',
          '总流水',
          '状态',
          '操作'
        ],
        sortData: [
          {
            index:4,
            sortAscendingValues:[" user_number asc "],  //升序
            gradeDownValues:[" user_number desc "],     //降序
          },  {
            index:5,
            sortAscendingValues:[" total_output asc "],  //升序
            gradeDownValues:[" total_output desc "],     //降序
          },  {
            index:6,
            sortAscendingValues:[" total_water asc "],  //升序
            gradeDownValues:[" total_water desc "],     //降序
          }
        ],
        isClose:false,
        isForbidden:false,
        cityId:"", //城市id
        isActive:"0",   //选中的
        selectorBehindObj:{
          channelName:'',
          code:"",
        },
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
      })
    },
    methods: {
      quiry(){
        this.getTableList(this.paramsData());
      },
// 列表操作 start
  //全选 操作 start
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
  //全选 操作 end
  //获取 表格数据 start
      getTableList(params){
          let url=`${this.$apidomain}/officialPartnerSubsetInfo/findPage`;
          this.$http.get(url,params).then(r=>{
          let data=r.data;
          console.log(data.result);
          this.tableListData = data.result;
          this.showPages = data.result.pageNo;
          this.currentPageSize = data.result.pageSize;
          this.total = data.result.total;
          this.pageTotal = data.result.pageTotal
          })
      },
  //获取表格数 end
  //表格传递的参数 start
      paramsData(){
          return {params: {
              "pageNo":JSON.stringify(this.showPages),
              "pageSize":JSON.stringify(this.currentPageSize),
              "id":this.selectorBehindObj.id,
              "state":this.selectorBehindObj.state,
              "officialPartnerId":this.selectorBehindObj.officialPartnerId,
              }
          }
      },
  //表格传递的参数 end
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
            let url=this.$apidomain+"/officialPartnerSubsetInfo/updateOfficialPartnerSubsetInfo";
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
        let url=this.$apidomain+"/officialPartnerSubsetInfo/updateOfficialPartnerSubsetInfo";
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
      add(){      //新增

      },
      addEdit(item,status){
        this.isDetailed.id = item.id;
        this.isDetailed.isShow=true;        //弹出对话框
      },

  //选中后的下拉列表
      selector(item,values,SourceTypeValue){
         this.selectorFilter({key:item.key,values:values,selectorVal:SourceTypeValue})
      },
//查询


//分页 事件 start
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
  //分页 事件 end

      //过滤下拉列表
      selectorFilter(obj){
        obj.values.forEach((v,i)=>{
          if(v.value===obj.selectorVal){
              this.selectorBehindObj[obj.key]=v.id;
          }
        })
      }
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
      #Reminded_icon {
        i {
          background: url(../../../../static/images/del.png) center center no-repeat;
          background-size: 100% 100%;
          width: 14px;
          height: 14px;
        }
      }
      #edit {
        i {
          background: url(../../../../static/images/en.png) center center no-repeat;
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



