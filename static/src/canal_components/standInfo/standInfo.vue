<template>
  <div id="app" class="channel-app-box">
    <div class="container">
        <!--导出-->
        <!--<div class="derive">-->
          <!--<el-button @click="addAdvertisement(isAdd)" size="large" v-show="$isButtonObj('bn-operation-msg-new')||true">新建消息</el-button>-->
        <!--</div>-->
        <div class="dable_lsit" style=" margin-top:10px;">
          <div style="overflow-x: auto">
        <table cellSpacing="0px" class="table"  id="table" cellpadding="0">
          <thead >
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">
              {{item}}
              <seqencing-icon v-if="$queryFun.sortFun(index,sortData)" :data="$queryFun.sortFun(index,sortData)" :getTableList="getTableList" :params="paramsData()" ></seqencing-icon>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.sysMessages">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.type|sysMessageTypeShow}}
            </td>
            <td>
              {{item.responseObjectType|sysMessageTargetTypeShow}}
            </td>
            <td style="width:400px;">
              {{item.content}}
            </td>
            <td>
              {{item.createTime | moment("YYYY-MM-DD HH:mm:ss")}}
            </td>
          </tr>
          </tbody>
        </table>
          </div>
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
    <div class="alert" v-if="isAdd.isShow">
      <add :isAdd="isAdd" :quiry="quiry">
      </add>
    </div>
  </div>
</template>
<script>
   import add from "./addAdvertisement";
  export default {
    components:{
      add
    },
    data() {
      return {
//新增广告  start
        isAdd:{
          title:"新建消息",
          isShow:false
        },
 //新增广告  end
 //查询列表数据 start
        name:"",    //名称
 //查询列表数据 end
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
          '消息类型',
          '接受对象类型',
          '内容截选',
          '建立时间',
        ],
        sortData: [
          {
            index:1,
            sortAscendingValues:[" type asc "],  //升序
            gradeDownValues:[" type desc "],     //降序
          },  {
            index:3,
            sortAscendingValues:[" response_object_type asc "],  //升序
            gradeDownValues:[" response_object_type desc "],     //降序
          },  {
            index:5,
            sortAscendingValues:[" create_time asc "],  //升序
            gradeDownValues:[" create_time desc "],     //降序
          }
        ],
        isClose:false,
        isForbidden:false,
        cityId:"", //城市id
        isActive:"0",   //选中的
        selectorBehindObj:{},
        tableListData:{},
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0,
      }
    },
    methods: {
// 列表操作 start
        //新增广告 start
            addAdvertisement(isShow){
              this.isAdd.isShow=true;

            },
        //新增广告 end
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
                let url=`${this.$apidomain}/sysMessage/findPage`;
                this.$http.get(url,params).then(r=>{
                let data=r.data;
                this.tableListData = data.result;
                this.showPages = data.result.pageNo;
                this.currentPageSize = data.result.pageSize;
                this.total = data.result.total;
                this.pageTotal = data.result.pageTotal;
                })
            },
        //获取表格数 end
        //表格传递的参数 start
            paramsData(){
                return {
                  params: {
                    "pageNo":JSON.stringify(this.showPages),
                    "pageSize":JSON.stringify(this.currentPageSize),
                    "type": this.selectorBehindObj.type
                    }
                }
            },
        //表格传递的参数 end
        //删除数据 start
            del(item,index){
                this.$confirm('此操作将删除该数据，是否继续？', '禁用', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                }).then(() => {
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                        });
                }).catch(() => {
                        this.$message({
                        type: 'info',
                        message: '已取消删除'
                        });
                });
            },
        //删除数据 end
 // 列表操作 end
      confirmForbidden(item,textContent){      //jin'yo'g
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

      open2(status) {
        if(!status){
//           this.$confirm('此操作将禁用该数据，是否继续？', '禁用', {
//             confirmButtonText: '确定',
//             cancelButtonText: '取消',
//             type: 'warning'
          this.dialogTableVisible=true;
//           }).then(() => {
//             this.$message({
//               type: 'success',
//               message: '禁用成功!'
//             });
//           }).catch(() => {
//             this.$message({
//               type: 'info',
//               message: '已取消禁用'
//             });
//           });
        }else{
          alert("执行恢复操作")
        }
      },
      add(){      //新增

      },
      addEdit(item,status){

        this.edit.isShow=true;        //弹出对话框
      },

  //选中后的下拉列表
      selector(item,values,SourceTypeValue){
         this.selectorFilter({key:item.key,values:values,selectorVal:SourceTypeValue})
      },
//查询
      quiry(){

        this.getTableList(this.paramsData())
      },

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
    created(){
      this.getTableList();
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
  @import "../../assets/styles/comminStyle";
  @import "../../assets/styles/Ch_comminStyle";

  #app{

    .container{
      >.selector_list{
        margin-top:0;
      }
    }
    .table {
      width:100%;
    }

      #table{
        width:100% !important;
      }

    .dable_lsit{
      padding:20px;
      padding-top:10px;
      background:#fff;
      padding-bottom:80px;
    }
    .derive{
      text-align: right;
      margin-top:20px;
      margin-right:20px;
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
