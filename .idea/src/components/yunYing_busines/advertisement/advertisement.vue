<template>
  <div id="app">
    <div class="container">
      <div class="dable_lsit table">
        <!--导出-->
        <app-button :props="buttonObj" v-show="$isButtonObj('bn-operation-advertising-apply')" ></app-button>
        <div class="derive" style="margin-bottom:10px;">
          <el-button @click="addAdvertisement(isAdd)" size="large" v-show="$isButtonObj('bn-operation-advertising-new')">新增广告</el-button>
        </div>
        <div style="overflow-x: auto;width:100%" >
        <table id="table" cellSpacing="0px" cellpadding="0">
          <thead >
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">
              {{item}}
              <seqencing-icon v-if="$queryFun.sortFun(index,sortData)" :data="$queryFun.sortFun(index,sortData)" :getTableList="getTableList" :params="paramsData()" ></seqencing-icon>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData.advertisingInfos">
            <td style="width:60px;">
              {{index+1}}
            </td>
            <!--<td  :style="{backgroundImage: 'url(' + item.image + ')'}" style="width:80px;background-size:100% 100%" >-->
            <td style="padding:0;padding-left:10px;">
              <img :src="item.image" alt="" style="width:100px;display:block">
            </td>

            <!--</td>-->
            <td>
              {{item.name|placeholder}}
            </td>
            <td>
              {{item.url|placeholder}}
            </td>
            <td>
              {{item.remark|placeholder}}
            </td>
            <td>
              {{item.startTime|moment('YYYY-MM-DD HH:mm:ss')}}-{{item.endTime|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td style="width:150px;">
              {{item.showKey|advertisingShow}}
            </td>
            <td style="width:50px;">
              {{item.sort||0}}
            </td>
            <td>
              {{item.state|adstate}}
            </td>
            <td style="width:200px;" class="operate" >
              <span class="details_icon Reminded_icon" id="Reminded_icon" v-show="$isButtonObj('bn-operation-advertising-delete')" ><el-button type="text" @click="del(item,index)"><i></i>删除</el-button></span>
              <span class="details_icon " id="edit" v-show="$isButtonObj('bn-operation-advertising-edit')"><el-button type="text" @click="addEdit(item,'0')"><i></i>编辑</el-button></span>
              <span class="details_icon " id="qi" v-show="item.state==2"><el-button type="text" @click="enable(item.id,item.state)"><i></i>启用</el-button></span>
              <span class="details_icon " id="ti" v-show="item.state==1"><el-button type="text" @click="disable(item.id,item.state)"><i></i>停用</el-button></span>
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
    <!--新增广告start-->
    <div class="alert" v-if="isAdd.isShow" >
      <add :isAdd="isAdd" :quiry="quiry">
      </add>
    </div>
    <!--编辑广告start-->
    <div class="alert" v-if="isChange.isShow" >
      <change :isAdd="isChange" :quiry="quiry">
      </change>
    </div>
  </div>
</template>
<script>
  import add from './editAdvertisement.vue'
  import appButton from "@/components/commInfo/Button"
  import change from './changeAdvertisement.vue'
  export default {
    components:{
      appButton,
      add,
      change
    },
    data() {
      return {
        buttonObj:{
          name:"应用列表",
          http:"advertisingInfo/findadvertisingInfo",
        },
        isAdd:{
          isShow:false,
          title:"新增广告"
        },
//新增广告  start
        isChange:{
          title:"编辑广告",
          isShow:false
        },
 //新增广告  end

 //查询列表数据 start
        name:"",    //名称
        optionList:[       //下拉列表数据
          {
            name:"消息类型",
            key:"businessType",
            SourceTypeValue: '',
            SourceType:[
              {
                value: '---请选择---',
                id:""
              }, {
                value:'系统消息',
                id:"SysMessage"
              }, {
                value: '活动消息',
                id:"ActivityMessage"
              }
            ]
          },
        ],
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
          '图片',
          '广告名称',
          '图片链接',
          '内容描述',
          "展示周期",
          '广告栏位置',
          '排序',
          "状态",
          '操作'
        ],
        sortData: [
          {
            index:6,
            sortAscendingValues:[" show_key asc "],  //升序
            gradeDownValues:[" show_key desc "],     //降序
          }
        ],
        isClose:false,
        isForbidden:false,
        cityId:"", //城市id
        isActive:"0",   //选中的

        selectorBehindObj:{},
        tableListData:{},          //表格数据
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0,
      }
    },
    methods: {
      enable(id,state){
        this.$confirm('此操作将启用该广告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url=this.$apidomain+"/advertisingInfo/updateState";
          let parma={
            "id":id,
            "state":1
          };
          this.$http.post(url,parma).then(r=>{
            let data=r.data;
//            console.log(data);
            if(data.code=="0000"){
              this.quiry();
              this.$message({
                type: 'info',
                message: '启用成功'
              });
            }else{
              alert(data.error)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消启用'
          });
        });


      },
      disable(id,state){
        this.$confirm('此操作将停用该广告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url=this.$apidomain+"/advertisingInfo/updateState";
          let parma={
            "id":id,
            "state":2
          };
          this.$http.post(url,parma).then(r=>{
            let data=r.data;
//            console.log(data);
            if(data.code=="0000"){
              this.quiry();
              this.$message({
                type: 'info',
                message: '停用成功'
              });
            }else{
              alert(data.error)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消停用'
          });
        });
      },
// 列表操作 start
        //应用列表 start
        appList(isShow){
           sShow.isShow=true;

        },
        //应用列表 end
        //新增广告 start
        addAdvertisement(isShow){
           isShow.isShow=true;
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
            let url=this.$apidomain+"/advertisingInfo/findPage?state!=4";
            this.$http.get(url,params).then(r=>{
            let data=r.data;
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
                "type" :this.selectorBehindObj.businessType,
               // "state":"0,1,2,3"
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
              let url=this.$apidomain+"/advertisingInfo/updateState";
              this.$http.post(url,{"id":item.id,"state":4}).then(res=>{
                let data=res.data;
                if(data.code==='0000'){
                  this.quiry();
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }else{
                  alert(data.error)
                }
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
        let o={};
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
      },
      selectorForbidden(item,index){
        this.alertForbiddenList.forEach((v)=>{
          v.selector=false;
        });
        item.selector=!item.selector;
      },
      open2(status) {
        if(!status){
          this.dialogTableVisible=true;
        }else{
          alert("执行恢复操作")
        }
      },
      add(){

      },
      addEdit(item,status){
        this.isChange.id=item.id;
        this.isChange.title="编辑广告";
        this.isChange.isShow=true;
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
      this.quiry()
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
      #qi{
        i {
          background: url(../../../../static/images/recover.png) center center no-repeat;
          background-size: 100% 100%;
          width: 14px;
          height: 14px;
        }
      }
      #ti{
        i {
          background: url(../../../../static/images/ban.png) center center no-repeat;
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
