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
     <!--手机号码-->
     <div class="list">
       绑定手机 :
       <el-input
         placeholder="请输入内容"
         v-model="telBind">
       </el-input>
     </div>
   </div>
   <!--查询按钮-->
   <div class="btn_inquiry" @click="quiry">
     查询
   </div>
   <div class="dable_lsit">
     <!--导出-->
     <table cellSpacing="0px" cellpadding="0">
       <thead >

       <tr class="theads">
         <th v-for="(item,index) in theadsName" :key="index">{{item}}
           <seqencing-icon v-if="$queryFun.sortFun(index,sortData)" :data="$queryFun.sortFun(index,sortData)" :getTableList="getTableList" :params="paramsData()" ></seqencing-icon>
         </th>
       </tr>

       </thead>
       <tbody>
       <tr v-for="(item,index) in tableListData.userInfos">
         <td>
           {{index+1}}
         </td>
         <td>
           {{item.phoneNum|placeholderTel}}
         </td>
         <td>
           {{item.city|placeholder}}
         </td>
         <td>
           {{item.loginTime|moment('YYYY-MM-DD HH:mm:ss')|placeholder}}
         </td>
         <td>
           {{item.source|placeholder}}
         </td>
         <td>
           {{item.sourceType | userSourceType}}
         </td>
         <td>
           {{item.forbiddenCause|placeholder}}
         </td>
         <td>
           {{item.attentionState | userAtentionState}}
         </td>
         <td>
           {{item.state | userState}}
         </td>
         <td>
           <span @click="singleRecover(item)" v-show="$isButtonObj('bn-user-abnormal-recover')"><el-button type="text" ><i></i>恢复</el-button></span>
           <span @click="details(item,index)" v-show="$isButtonObj('bn-user-abnormal-details')"><i></i>详情</span>
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
 <div class="alert" v-if="isAlert">
   <alert-info :dataObj="alertInfo" :title="title">

   </alert-info>
   <div class="btn">
     <!--<button @click="forbidden" :class="{'selector':isForbidden}">禁用</button>-->
     <button @click="close" :class="{'selector':isClose}">关闭</button>
   </div>
 </div>
</div>
</template>
<script>
  import alertInfo from "./alertInfo";
  import common from "@/api/baseHttp"
  export default {
    components:{
      alertInfo,
    },
    data() {
      return {
        title:"异常用户详情",
        currentPage4: 1,
        checked:false,
        theadsName:[
          '序号',
          '绑定手机',
          '城市',
          '近期登陆',
          '渠道',
          '来源类型',
          '异常原因',
          '关注状态',
          '状态',
          '操作'
        ],
        sortData: [
          {
            index:3,
            sortAscendingValues:[" login_time asc "],  //升序
            gradeDownValues:[" login_time desc "],     //降序
          },  {
            index:7,
            sortAscendingValues:[" attention_state asc "],  //升序
            gradeDownValues:[" attention_state desc "],     //降序
          },
        ],
        input7: '',
        telBind:'',   //绑定手机
        isClose:false,
        alertInfo:{       //alertinfo
          title:"用户详情",
        },
        isForbidden:false,
        isAlert:this.$store.state.isAlert,
        isActive:"0",   //选中的
        props: {
          value: 'label',
          children: 'cities',
        },
        optionList:[
          {
          name:"渠道",
          key:"sourceId",
          SourceTypeValue: '', //选中后的
          SourceType:[]
        }, {
          name:"来源类型",
          key:"sourceType",
          SourceTypeValue: '', //选中后的
          SourceType:[
            {     //来源类型
              id:"",
              value: '---请选择---'
            },{     //来源类型
              id:"1",
              value: '渠道'
            }, {
              id:"2",
              value: '分享'
            }, {
              id:"0",
              value: '无'
            }
          ]
        }, {
          name:"城市",
          key:"cityId",
          SourceTypeValue: '', //选中后的
          SourceType:[]
        }
        ],
        selectorBehindObj:{},
        tableListData:{
                pageNo:1,
                pageSize:50,
                total:50,
                pageTotal: 1,
          userInfos:[]
        },          //表格数据
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0,
      }
    },
    methods: {
      isSelector(index){
          this.isActive=index;
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
        data.forEach((v,i)=>{
          v.checked=currentState
        })
      },

      singleRecover(item){   //table 单个恢复按钮
        this.$confirm('此操作将恢复该数据，是否继续？', '恢复', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var o={};
          o.id=item.id;
          o.state = "1";
          let url=common.apidomain+"/userInfo/updateUserInfo";
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
      },
      derive(){        //导出事件

      },
      recover(){      //恢复事件

      },
      details(item){
        let url=common.apidomain+"/userInfo/findonedetails?id="+item.id;
        this.$http.get(url).then(res=>{
          let data = res.data;
          this.alertInfo = data.result;
          this.alertInfo.close=this.close;
          this.$store.commit("displayAlert",true); //通过vux 传递数据
          this.isAlert=this.$store.state.isAlert;          //弹出对话框
        })
      },
      paramsData(){
        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "phoneNum":this.telBind,
          "cause":this.selectorBehindObj.cause,
          "state":"2",
          "channelId":this.selectorBehindObj.sourceId,
          "sourceType":this.selectorBehindObj.sourceType,
          "cityId":this.selectorBehindObj.cityId,
        }}
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
      quiry(){
        this.getTableList(this.paramsData());
      },
      isSelector(index){
        this.isActive=index;
      },
      forbidden(){
        this.isForbidden=true;
        this.isClose=false;
      },
      close(){
        this.isClose=true;
        this.isForbidden=false
        this.$store.commit("displayAlert",false); //通过vux 传递数据
        this.isAlert=this.$store.state.isAlert;
      },
      getTableList(params){
        let url=common.apidomain+"/userInfo/findPage";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.tableListData = data.result;
          this.showPages = data.result.pageNo;
          this.currentPageSize = data.result.pageSize;
          this.total = data.result.total
          this.pageTotal = data.result.pageTotal
        })
      }

    },
    mounted() {

    },
    created(){
      let url=common.apidomain+"/common/findchannel";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.optionList.forEach((v)=>{
          if("sourceId"===v.key){
            v.SourceType.push({"id":"","value":"---请选择---"});
            data.result.forEach((v2)=>{
              v.SourceType.push({"id":v2.id,"value":v2.name});
            })
          }
        });
        url=common.apidomain+"/common/findcitylistareainfo";
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
          this.getTableList(this.paramsData());
        });
      })
    }
  }
</script>

<style scoped lang="scss">
  .top_nav{
       font-size:14px;
    overflow: hidden;
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
            padding-top:0;
            padding-bottom:0;
            >span{
              height:100%;
              float:left;
              padding-top:4px;
              padding-left:30px;
              i{
                width:16px;
                height:16px;
                background:url(../../../static/images/recover.png) center center no-repeat;
                background-size:100% 100%;
                float:left;
                margin-right:3px;
                vertical-align: middle;
              }
            }
            >span:last-of-type{
              float:right;
              padding-left:0px;
              padding-top:8px;
              padding-right:20px;
              cursor:pointer;
              i{
                width:16px;
                height:16px;
                margin-top:3px;
                background:url(../../../static/images/detailed.png) center center no-repeat;
                background-size:100% 100%;
                float:left;
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
#city{
  line-height:40px;
}
.el-button--text{
  color:#000;
}
.el-button--large{
  width:120px;
}
.sum{
float:left;
}
</style>
