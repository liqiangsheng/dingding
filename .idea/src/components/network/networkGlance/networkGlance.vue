<template>
  <div id="app">
    <div class="container">
      <div class="selector_list">
        <div class="list">
          网点编号 :
          <el-input
            placeholder="请输入内容"
            v-model="siteId">
          </el-input>
        </div>
        <div class="list">
          网点名称 :
          <el-input
            placeholder="请输入内容"
            v-model="siteName">
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
              {{item.id | placeholder}}
            </td>
            <td>
              {{item.city| placeholder}}
            </td>

            <td>
              {{item.name| placeholder}}
            </td>
            <td>
              {{item.peopleNum| placeholder}}
            </td>
            <td>
              {{item.waitService+item.waitAllocation+item.abnormalHangUp}}
            </td>
            <td>
              {{item.state|userState}}
            </td>
            <td>
              {{item.loginTime|moment('YYYY-MM-DD HH:mm:ss')|placeholder}}
            </td>
            <td>
              <span :class="{'recover':item.state=='2'}" v-show="$isButtonObj('bn-site-list-forbidden')"><el-button type="text" @click="open2(item)"><i></i>
                  {{item.state|enableDisable}}
                </el-button>
              </span>
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
    <!--弹框-->
    <!--<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>-->
    <el-dialog style="z-index:999999"  :visible.sync="dialogTableVisible" size="tiny">
      <ul class="alert_forbidden_text">
        <li v-for="(item,index) in alertForbiddenList" :key="index" @click="selectorForbidden(item,index)">
          {{item.name}} <span v-show="item.selector!='0'"></span>
        </li>
      </ul>
      <textarea class="alert_forbidden_area" v-model="textareaContent" >
        </textarea>
      <el-button class="confirm_btn"
                 @click="confirmForbidden(alertForbiddenList,textareaContent)" type="primary">确定</el-button>
    </el-dialog>
    <div>
    </div>
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
//        查询数据 start
        optionList: [
          {
            name: "所属城市",
            key: "cityId",
            SourceTypeValue: '',
            SourceType: []
          },
          {
            name: "服务区域",
            key: "areaId",
            SourceTypeValue: '',
            SourceType: []
          },
          {
            name: "服务工种",
            key: "skillId",
            SourceTypeValue: '',
            SourceType: []
          }
        ],
        siteId:"",
        siteName:"",
        props: {
          value: 'label',
          children: 'cities',
        },
        selectorBehindObj:{},
//        查询数据 end
        isDetailed:{
          isShow:false,
          title:"网点业务信息"
        },
//禁用弹窗数据 start
        textareaContent:"",
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
        isActive:"0",
        isEdit:true,
        TextIsShow:false,
        dialogTableVisible: false,
        checked:false,
//禁用弹窗数据 end
//table 数据  start
        theadsName:[
          '序号',
          '网点编号',
          '城市',
          '网点名称',
          '人数',
          '待服务工单数',
          '状态',
          '近期登陆',
          '操作'
        ],
        sortData: [
          {
            index:4,
            sortAscendingValues:[" people_num asc "],  //升序
            gradeDownValues:[" people_num desc "],     //降序
          },  {
            index:5,
            sortAscendingValues:[" wait_service,wait_allocation,abnormal_hang_up asc "],  //升序
            gradeDownValues:[" wait_service,wait_allocation,abnormal_hang_up desc "],     //降序
          },  {
            index:6,
            sortAscendingValues:[" state asc "],  //升序
            gradeDownValues:[" state desc "],     //降序
          },  {
            index:7,
            sortAscendingValues:[" login_time asc "],  //升序
            gradeDownValues:[" login_time desc "],     //降序
          },
        ],
        tableListData:{
          pageNo:1,
          pageSize:50,
          total:50,
          pageTotal: 1,
          siteInfos:[]
        },
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0,
//table 数据  end
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
          "name":this.siteName,
          "phoneNum":this.telBind,
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
          console.log(this.tableListData);
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
//      <!--弹窗功能end-->
//      <!--获取城市下的区域信息与服务工种 start-->
      selector(item,values,SourceTypeValue){
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        });
        if("cityId"==key){
          let url=this.$apidomain+"/common/findareaandstreetoptions?cityId="+this.selectorBehindObj.cityId;
          this.$http.get(url).then(r=>{
            let data=r.data;
            this.optionList.forEach((v)=>{
              if("areaId"==v.key){
                v.SourceType.push({"id":"","value":"---请选择---"});
                data.result.forEach((v2)=>{
                  v.SourceType.push({"id":v2.id,"value":v2.label});
                })
              }
            });
          });
        }
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
      isText(){
        this.TextIsShow=true;
      },
      accomplish(prams){ //完成编辑
        console.log(prams);
        this.isEdit=true;
        this.$store.commit("edit",false);
      },
      edit(){  //编辑
        this.isEdit=false;
        this.$store.commit("edit",true)
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
      wholeSelector(data,currentState){ //全选
        console.log(currentState);
        data.forEach((v,i)=>{
          v.checked=currentState
        })
      },
      derive(){        //导出事件

      },
      forbidden(){ //禁用数据

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
      forbidden(){
        this.isForbidden=true;
        this.isClose=false;
        this.dialogTableVisible=true;
      },
      close(){
        this.isClose=true;
        this.isForbidden=false;
        this.$store.commit("displayAlert",false); //通过vux 传递数据

      },
    },
    mounted() {
    },

  }
</script>
<style scoped lang="scss">
  /*@import "../../../assets/styles/comminStyle";*/
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
  #app{
    .city{
      padding:0;
    }
    .alert{
      width:100vw;
      height:100vh;
      background:rgba(0,0,0,0.6);
      position:absolute;
      top:0;
      z-index:9999;
      right:0;
      .btn{
        position:absolute;
        bottom:17%;
        left:50%;
        transform:translateX(-50%);
        text-align:center;
        overflow: hidden;
        button{
          width:200px;
          cursor:pointer;
          line-height:44px;
          border:none;
          padding:0;
          margin:0;
          transform: rotate(-360deg);
          border: 1px solid #979797;
          border-radius: 4px;
          float:left;
          background:#fff;
          outline:none;
        }
        .selector{
          color:#fff;
          background: #279447;
        }
        .forbidden_btn{
          background: #ff5351;
          color:#fff;
        }
      }
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
    >.container{
      font-size:14px;
      width:100%;
      overflow:hidden;
      >.user_sum{
        width:100%;
        height:20px;
        float:left;
        >span{
          margin-right:35px;
          color:blue;
          font-size:14px;
          >b{
            font-weight:normal;
            color:#000;

          }
        }
        >span:last-of-type{
          color:green;
          font-size:14px;
        }

      }
      >.selector_list{
        width:100%;
        overflow: hidden;
        margin-top:40px;
        min-width:1351px;
        >.list{
          float:left;
          line-height:60px;
          list-style:none;
          font-size:14px;
          margin-right:5%;

        }
        .el-input{
          width:auto;
        }

        >.list:nth-of-type(3n){
          /*margin-right:0;*/
        }
      }
      .btn_inquiry{
        width:200px;
        height:44px;
        margin:0 auto;
        cursor:pointer;
        margin-top:30px;
        text-align:center;
        line-height:44px;
        background: #A470CD;
        border-radius: 4px;
        color:#fff;
      }
    }
    .dable_lsit{
      margin-top:50px;
      >.paging{
        text-align:right;
        width:100%;
        line-height:50px;
        >input,select{
          width:42px;
          height:20px;
          padding:0;
        }
        >.link_page{
          background: #1C5B94;
          color:#fff;
        }
        .home{
          float:right;
        }
        .last_page{
          color:blue;
          margin-left:10px;
        }
        .el-pagination{
          float:right;
          padding-top:12px;
        }
      }
      margin-bottom:200px;
      table{
        width:100%;
        .theads{

          >th{
            padding:10px 10px;
            text-align:center;
            background: #E5E9F2;
            box-shadow: inset 0 1px 0 0 #E0E6ED,
            inset 0 -1px 0 0 #E0E6ED;

          }
          >.multiple{
            width:30px;
            cursor:pointer;
            box-size:border-box;
          }
        }
        >tbody{
          >tr{
            border-top:1px solid #ccc;
            >td{
              border-bottom:1px solid #ccc;
              padding:10px 10px;
              text-align:center;
            }
            >td:first-of-type{
              border-right:1px solid #ccc;
            }
            >td:last-of-type{
              //display: flex;
              padding-top:0;
              padding-bottom:0;
              >span{
                flex:1;
                height:100%;
                /*float:left;*/
                padding-top:4px;
                /*padding-left:30px;*/
                i{
                  width:16px;
                  height:16px;
                  background:url(../../../../static/images/ban.png) center center no-repeat;
                  background-size:100% 100%;
                  float:left;
                  margin-right:3px;
                  vertical-align: middle;
                }
              }
              >.details_icon{
                flex:1;
                /*float:right;*/
                padding-left:0px;
                /*padding-top:8px;*/
                text-align: center;
                /*padding-right:20px;*/
                cursor:pointer;
                i{
                  width:16px;
                  height:16px;
                  margin-right:0;
                  /*margin-top:3px;*/
                  background:url(../../../../static/images/detailed.png) center center no-repeat;
                  background-size:100% 100%;
                }
              }
              >.Reminded_icon{
                i{
                  background:url(../../../../static/images/Reminded.png) center center no-repeat;
                  background-size:100% 100%;
                }
              }
              >.recover{
                i{
                  background:url(../../../../static/images/recover.png) center center no-repeat;
                  background-size:100% 100%;
                }
              }
            }
          }
          >tr:nth-of-type(even){
            background: #F9FAFC;
          }
        }
      }
      >.derive{
        float:right;
        >.derive_btn{
          margin-left:0;
        }
      }
    }
  }
  .confirm_btn{
    transform:translateX(110%);

  }
</style>



