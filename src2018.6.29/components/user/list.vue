<template>
    <div id="app">
      <div class="container" >
            <biaoqian v-show="biaoqianShow" :str="str" @fouShow="fouShow"></biaoqian>
            <div class="user_sum">
              <user-sum class="sum"  :suerSum="item" v-for="(item,index) in userSum" :key="index"></user-sum>
            </div>
            <div class="selector_list">
              <div  v-for="(item,index) in optionList" :key="index" class="list">
                {{item.name}} :
                <el-select :disabled="item.disabled"
                           v-model.trim="item.SourceTypeValue" placeholder="请选择"
                           @change="selector(item,item.SourceType,item.SourceTypeValue)">
                  <el-option
                  v-for="items in item.SourceType"
                  :key="items.name"
                  :value="items.value"
                >
                </el-option>
                </el-select>
              </div>

              <!--手机号码-->

              <div class="list" v-for="(item,index) in inputsList">
                {{item.name}} :
                <el-input
                  placeholder="请填写内容"
                  v-model.trim="inputParams[item.KEY]">
                </el-input>
              </div>
            </div>
           <el-button class="btn_biaoqian" @click="dabiaoqian(tableListData.userInfos)">打标签</el-button>
        <!--查询按钮-->
            <div class="btn_inquiry" @click="quiry">
              查询
            </div>
            <div class="dable_lsit" >
              <table cellSpacing="0px" cellpadding="0" >
                <thead  >
                <tr class="theads">
                <th>
                  <el-checkbox v-model.trim="checked"
                               @change="workChang(tableListData.userInfos,checked)"></el-checkbox>
               </th>
                  <th v-for="(item,index) in theadsName"
                      :key="index">{{item}}<seqencing-icon v-if="$queryFun.sortFun(index,sortData)"
                                                                :data="$queryFun.sortFun(index,sortData)"
                                                                :getTableList="getTableList"
                                                                :params="paramsData()"
                  ></seqencing-icon></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in tableListData.userInfos">
                  <td>
                    <el-checkbox v-model.trim="isCheckboxList[index]" @change="isCheckbox(item,index)"></el-checkbox>
                  </td>
                  <!--序号-->
                  <td>
                    {{index+1}}
                  </td>
                  <!--绑定手机-->
                  <td>
                    {{item.phoneNum||placeholderTel}}
                  </td>
                  <!--城市-->
                  <td>
                    {{item.city||placeholder}}
                  </td>
                  <!-- 昵称 -->
                  <td>
                    {{item.nickName||placeholder}}
                  </td>
                  <!--性别-->
                  <td>
                    {{item.sex|placeholderSex}}
                  </td>
                  <!--标签-->
                  <td>
                    {{item.label||placeholder}}
                  </td>
                  <!--子渠道-->
                  <td>
                    {{item.channel||placeholder}}
                  </td>
                  <!--渠道-->
                  <td>
                    {{item.channelParent||placeholder}}
                  </td>
                  <!--来源类型-->
                  <td>
                    {{item.sourceType | userSourceType}}
                  </td>
                  <!--关注状态-->
                  <td>
                    {{item.attentionState | userAtentionState}}
                  </td>
                  <!--状态-->
                  <td>
                    {{item.state | userState("isState")}}
                  </td>
                  <!--近期登陆-->
                  <td>
                    {{item.loginTime|moment('YYYY-MM-DD HH:mm:ss')||placeholder}}
                  </td>
                  <!--操作-->
                  <td>
                    <span  :class="{'recover':item.state=='2'}" v-show="$isButtonObj('bn-user-list-forbidden')">
                      <el-button type="text" @click="open2(item)" v-show="$isButtonObj('bn-user-list-details')"><i></i>
                        {{item.state|enableDisable}}
                      </el-button>
                    </span>
                    <span @click="details(item,index)"> <i class="detailed_icon"></i>详情</span>
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
      <!--弹框-->
      <div class="alert" v-if="isAlert">
        <alert-info :dataObj="alertInfo" :title="showTitle">
        </alert-info>
            <div class="btn">
              <button @click="close" :class="{'selector':isClose}">关闭</button>
         </div>
      </div>
      <!--弹框-->
      <el-dialog style="z-index:999999"  :visible.sync="dialogTableVisible" size="tiny" >
        <ul class="alert_forbidden_text">
          <li v-for="(item,index) in alertForbiddenList" :key="index" @click="selectorForbidden(item,index)">
            {{item.name}} <span v-show="item.selector!='0'"></span>
          </li>
        </ul>
        <textarea class="alert_forbidden_area" v-model.trim="textareaContent">
        </textarea>
        <el-button class="confirm_btn" @click="confirmForbidden(alertForbiddenList,textareaContent)" type="primary">确定</el-button>
      </el-dialog>
    </div>
</template>
<script>
import tableList from "./table_lsit";
import biaoqian from "./biaoqian";
import alertInfo from "./alertInfo";
import userSum from "./userSum.vue"
import {getThis,forbiddenMsg,recover,getTableData} from "@/components/commonJs/alert_js"
  export default {
    components:{
      alertInfo,
      userSum,
      biaoqian,
    },
    data() {
      return {
        prohibit:false, //禁止
        biaoqianShow : false, //打标签
        placeholderTel:"未绑定",
        inputsList:[
          {
            KEY:"phoneNum",
            name:"绑定手机号"
          }, {
            KEY:"nickName",
            name:"昵称"
          },{
            KEY:"label",
            name:"标签"
          },
        ],
        inputParams:{},
        placeholder:"无",
        textareaContent:"",
        currentPage4: 1,
        checked:false, //多选
        isCheckboxList:[], //反选
        str : "", //id存储
        theadsName:[
            "序号",
            "绑定手机",
            "城市",
            "昵称",
            "性别",
            "标签",
            "子渠道",
            "渠道",
            "来源类型",
            "关注状态",
            "状态",
            "近期登陆",
            "操作",
        ],
        sortData: [
              {
                index:3,
                sortAscendingValues:[" nick_name asc "],  //升序
                gradeDownValues:[" nick_name desc "],     //降序
              },  {
                index:5,
                sortAscendingValues:[" label asc "],  //升序
                gradeDownValues:[" label desc "],     //降序
              },  {
                index:6,
                sortAscendingValues:[" channel asc "],  //升序
                gradeDownValues:[" channel desc "],     //降序
              },  {
                index:7,
                sortAscendingValues:[" channel_parent asc "],  //升序
                gradeDownValues:[" channel_parent desc "],     //降序
                }, {
                index:11,
                sortAscendingValues:[" login_time asc "],  //升序
                gradeDownValues:[" login_time desc "],     //降序
              }
            ],
        objItem:{},
        dialogTableVisible: false,
        alertForbiddenList:this.$store.state.alertForbiddenListUser,
        input7: '',
        telBind:'',   //绑定手机
        isClose:false,
        showTitle:"用户详情",
        alertInfo:{},
        isForbidden:false,
        isAlert:this.$store.state.isAlert,
        isActive:"0",   //选中的
        props: {
          value: 'label',
          children: 'cities',
        },
        userSum:[
          {
                sum:"0", //总用户量
                color:"blue",
                name:"总用户量"
              },{
                color:"green",
                sum:"0", //总用户量
                name:"新增"
              },
              ],
        optionList:[     //下拉列表数据
                     {
                      name:"状态",
                       disabled:false,
                      key:"state",
                      SourceTypeValue: '', //选中后的
                      SourceType:[
                                    {     //来源类型
                                      value: '---请选择---',
                                      id:""
                                    }, {
                                      value: '正常',
                                        id:"1"
                                    }, {
                                      value: '禁用',
                                          id:"2"
                                    }
                                 ]
                      },     {
                      name:"性别",
                      key:"sex",
                      disabled:false,
                      SourceTypeValue: '', //选中后的
                      SourceType:[
                                    {     //来源类型
                                      value: '---请选择---',
                                      id:""
                                    }, {
                                      value: '男',
                                        id:"1"
                                    }, {
                                      value: '女',
                                          id:"2"
                                    }
                                 ]
                      },
             {
                      name:"渠道",
                      key:"sourceId",
                      disabled:false,
                      SourceTypeValue: '', //选中后的
                      SourceType:[]
                      },
          {
            name:"子渠道",
            disabled:false,
            key:"ziSourceId",
            SourceTypeValue: '', //选中后的
            SourceType:[]
          },
          {
            name:"关注状态",
            key:"guanzhuState",
            disabled:false,
            SourceTypeValue: '', //选中后的
            SourceType:[
              {     //来源类型
                value: '---请选择---',
                id:""
              }, {
                value: '未关注',
                id:"0"
              }, {
                value: '已关注',
                id:"1"
              }, {
                value: '已取关',
                id:"2"
              }
            ]
          },
                   {
                          name:"来源类型",
                          disabled:false,
                          key:"sourceType",
                          SourceTypeValue: '', //选中后的
                          SourceType:[
                            {     //来源类型
                              id:"",
                              value: '---请选择---'
                            },{     //来源类型
                              id:"1",
                              value: '渠道入口'
                            }, {
                              id:"2",
                              value: '好友推荐'
                            }, {
                              id:"3",
                              value: '平台自建'
                            }, {
                              id:"4",
                              value: '渠道自建'
                            }, {
                              id:"5",
                              value: '官网入口'
                            }, {
                              id:"0",
                              value: '微信入口'
                            }
                          ]
                      },
          {
                          name:"城市",
                          key:"cityId",
                          disabled:false,
                          SourceTypeValue: '', //选中后的
                          SourceType:[],
                          ziqudaoId:"",
                        }
                   ],
        selectorBehindObj:{},
        tableListData:{
                pageNo:1,
                pageSize:50,
                total:50,
                pageTotal: 1,
          userInfos:[]
        },
        showPages:1,
        currentPageSize:20,
        total:0,
        pageTotal:0,
      }
    },
    beforeRouteEnter(to,from,next){
      next(Vue=>{
        Vue.quiry();
      })
    },
    beforeRouterLeave(to,from,next){
      next()
    },

    methods: {
      fouShow(item){
          this.biaoqianShow = item;
      },

       workChang(data,isBool){ //全选
             let _this = this;
            _this.isCheckboxList.forEach((item, index) => {
                _this.$set(_this.isCheckboxList, index, isBool);
            });
            _this.tableListData.userInfos.forEach((item1, index1) => {
                _this.$set(_this.tableListData.userInfos[index1], 'isCheckboxList', isBool);
            })
       },
       isCheckbox(data,index){ //单选  改变全选按钮
            let _this=this;
            let isCheck = true,i;
            _this.tableListData.userInfos[index].isCheckboxList = _this.isCheckboxList[index]
            for (i = 0; i < _this.isCheckboxList.length; i++) {
                if (!_this.isCheckboxList[i]) {
                      isCheck = false;
                      break;
              }
           };
           _this.checked = isCheck;

       },
       dabiaoqian(list){ //打标签
         let newAr=[];
         list.forEach((v,i)=>{
           if(this.isCheckboxList[i]){
             newAr.push(v)
           }
         });
         if(newAr.length==0){
           alert("请选择需要打标签的用户");
           return;
         }else{
           this.biaoqianShow = true;
         }
          for(let i= 0 ; i<newAr.length; i++){
                this.str +=newAr[i].id+",";
          }

       },
        open2(item) {
          let url=common.apidomain+"/userInfo/updateUserInfo";
          recover(item,url)
        },
      confirmForbidden(item,textContent){ //确定拒绝
        let url=`${this.$apidomain}/userInfo/updateUserInfo`;
        forbiddenMsg(item,textContent,url);
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

      details(item){
        let url=common.apidomain+"/userInfo/findonedetails?id="+item.id;
        this.$http.get(url).then(res=>{
          console.log(res,"shadjgaj")
          let data = res.data;
          this.alertInfo = data.result;
          this.alertInfo.close=this.close
          this.$store.commit("displayAlert",true); //通过vux 传递数据
          this.isAlert=this.$store.state.isAlert;          //弹出对话框
        })
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
              this.ziqudaoId = v.id;
              console.log(this.ziqudaoId)


          }
        })
        if("sourceId"==key){
          //子渠道
          this.optionList.forEach((v)=>{
            if("ziSourceId"==v.key) {
              v.disabled = false;
            }
          });
          let url1 = this.$apidomain+"/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo?officialPartnerId="+this.ziqudaoId;
          this.$http.get(url1).then(res=> {
            console.log(res)
            this.optionList.forEach((v) => {
              if ("ziSourceId" == v.key) {
                v.SourceType = [];
                    v.SourceType.push({"id": "", "value": "---请选择---"});
                res.data.result.forEach((v2) => {

                    v.SourceType.push({"id": v2.id, "value": v2.name});
                })
              }
            })
          })
        }
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
        this.isForbidden=false;
        this.$store.commit("displayAlert",false); //通过vux 传递数据
        this.isAlert=this.$store.state.isAlert;
      },
      paramsData(){
        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "phoneNum":this.inputParams.phoneNum,
          "label":this.inputParams.label,
           "nickName":this.inputParams.nickName,
          "state":this.selectorBehindObj.state,
           "sex" :this.selectorBehindObj.sex,
          "channelId":this.selectorBehindObj.sourceId,
          "sourceType":this.selectorBehindObj.sourceType,
          "cityId":this.selectorBehindObj.cityId,
          "attentionState":this.selectorBehindObj.guanzhuState,
          "channelId":this.selectorBehindObj.ziSourceId,
        }}
      },
      getTableList(params){
        let url=common.apidomain+"/userInfo/findPage";
        getTableData(params,url)
      }
        },
    mounted() {

    },
    created(){
      this.optionList.forEach((v)=>{
          if("ziSourceId"==v.key) {
            v.disabled = true;
          }
        });
      getThis(this);
      let urlCount=common.apidomain+"/userInfo/countList";
      this.$http.get(urlCount).then(r=>{
        let data=r.data;
        this.userSum.forEach((v)=>{
          if("总用户量"==v.name){
            v.sum = data.result.totalNum;
          }else if("新增"==v.name){
            v.sum = data.result.todayNum;
          }
        });
      });
      //渠道 start
      let url=common.apidomain+"/common/findchannel";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.optionList.forEach((v)=>{
          if("sourceId"==v.key){
            v.SourceType.push({"id":"","value":"---请选择---"});
            data.result.forEach((v2)=>{
              v.SourceType.push({"id":v2.id,"value":v2.name});
            })
          }
        });
        //渠道 end
        url=common.apidomain+"/common/findcitylistareainfo";
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
      })
      this.getTableList(this.paramsData());
    }
  }
</script>
<style>
  .el-button--primary{
    margin:0 auto !important;
  }
</style>
<style scoped lang="scss">
#app{

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
      width:101%;
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
    .btn_biaoqian{
      transform: translate(0px,109px);
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
                background:url(../../../static/images/ban.png) center center no-repeat;
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

</style>
<style>
  .el-input__inner{
    /*border-bottom:none;*/
  }
</style>
