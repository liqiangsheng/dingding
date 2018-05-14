
<template>
  <div id="app" class="channel-app-box">
    <div class="container">
      <ul>
        <li v-for="(item,index) in option">
          <span class="list_name">{{item.name}} : </span>
          <el-select
            v-model="item.SourceTypeValue" placeholder="请选择" @change="_$.selector({item,value:item.SourceTypeValue,params})">
            <el-option
              v-for="items in item.SourceType"
              :key="items.value"
              :value="items.value"
            >
            </el-option>
          </el-select>
        </li>
      </ul>
        &nbsp;&nbsp;&nbsp;
        <el-button style="padding-left:30px;padding-right:30px;" type="primary" @click="quiry()">查询</el-button>
      <div class="dable_lsit table">
        <!--导出-->

        <!--导出按钮-->
        <div class="derive">
          <el-button @click="add" size="large" class="derive_btn">新建子账号</el-button>
        </div>
        <!--导出按钮结束-->
        <div class="table_box">


        <table cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th class="th" v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.officialPartnerSubsetName|placeholder}}
            </td>
            <td>
              {{item.roleId|childRole}}
            </td>
            <td>
              {{item.account|placeholder}}
            </td>
            <td>
              {{item.linkmanName|placeholder}}
            </td>
            <td>
              {{item.linkmanTelephone|placeholder}}
            </td>
            <td>
              {{item.state| childState}}
            </td>
            <td>
              {{item.loginTime|moment('YYYY-MM-DD HH:mm:ss')|placeholder}}
            </td>
            <td>
                <span :class="{'recover':item.state=='2'}" v-show="$isButtonObj('bn-master-account-forbidden')||true"><el-button :style="item.state=='2'?'color:#20A0FF ':'color:#FF4949'" type="text" @click="open2(item)">
                  {{item.state|enableDisable}}
                </el-button></span>
              &nbsp;
              &nbsp;
                <span class="details_icon" v-show="$isButtonObj('bn-master-account-details')||true"><el-button style="color:#13CE66;" type="text" @click="details(item,index)">详情</el-button></span>
              </td>
          </tr>
          </tbody>
        </table>
        </div>
      </div>
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


    <!--查看明细弹窗 start-->
    <!--<div class="alert" v-if="dailyIsShow.isShow">-->
      <!--<alert-info :dailyIsShow="dailyIsShow">-->
      <!--</alert-info>-->
    <!--</div>-->
    <!--查看明细弹窗 end-->
    <!--<p class="el-icon-close close" @click="close(isEverydayOrder)"></p>-->
    <div class="alert" v-if="isDetailed.isShow">
      <alert-info :isDetailed="isDetailed" :quiry="quiry"></alert-info>
    </div>
        <!--新建工单start-->
    <div class="alert" v-if="isAdd.isShow">
      <add-alert :isAdd="isAdd"  :quiry="quiry">
      </add-alert>
    </div>
    <!--新建工单end-->
  </div>
</template>
<script>
      import alertInfo from "./childrenAccount_alert";
      import addAlert from "./add/addAlert";
  export default {
//    props:["isEverydayOrder"],
        components:{
          alertInfo,
          addAlert
        },
    data() {
      return {
        option:[
          {
            name:"子类渠道",
            key:"channel",
            SourceTypeValue:"",
            SourceType:[]
          }
        ],
//        isDetailed:{
//            title:"子账号详情",
//            isShow:false
//          },
        //新建子账号；
        isAdd:{
          isShow:false,
          title: "新建子账号",
        },
//   查看区域详情 start
  textareaContent:"",
        dailyIsShow:{
          isShow:false
        },
        isDetailed:{
          isShow:false,
          id:""
        },
        params:{},
        //查看区域详情 end

        edit:{
          isShow:false,
          isDisabled:false
        },
        checked:false,

        //查询的date    数据  start
        date:{
          startDate:"",
          startEnd:"",
        },
        dialogTableVisible:false,
        selectorBehindObj:{},
        alertForbiddenList:[
          {
            name:"已离职",
            selector:"0",
          }, {
            name:"其他",
            selector:"0",
          }
        ],
        //查询的date    数据  end
        theadsName:[
          '序号',
          '子渠道',
          '角色',
          '账号',
          '联系人',
          '手机号',
          '账号状态',
          '近期登陆',
          '操作'
        ],
        isActive:"0",   //选中的

        tableListData:[],          //表格数据
      }
    },
    created(){
      this.quiry();
      let params = {params: {
        "officialPartnerId":this.$getLocalStorage("enrolleeinfo")[0].id,
      }};
      let url=this.$apidomain+"/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo";
      this.$http.get(url,params).then(r=>{
        let data=r.data;
        this.option[0].SourceType.push({"value":"--请选择--",id:""})
        data.result.forEach((e)=>{
          this.option.forEach((v,i)=>{
            if(v.key==="channel"){
              this.option[i].SourceType.push({"value":e.name,"id":e.id})
            }
          });
        });
      })

    },
    methods: {
      resetting(){
        this.option.forEach((v,i)=>{
          this.option[i].SourceTypeValue="";
        });
        this.params={};
      },
      //      <!--分页查询数据对象功能组合start-->
      quiry(){
        this.getTableList(this.paramsData(this.params));
      },
      paramsData(channel=""){
        return {params: {
          "officialPartnerId":this.$getLocalStorage("enrolleeinfo")[0].id,
          "officialPartnerSubsetId":channel.channel
        }}
      },
      getTableList(params){
        let url=this.$apidomain+"/officialPartnerSubsetAccountInfo/findlistOfficialPartnerSubsetAccountInfo";
        this.$http.get(url,params).then(r=>{
          let data=r.data;
          this.tableListData = data.result;
      //  console.log( this.tableListData)
          this.showPages = data.result.pageNo;
          this.currentPageSize = data.result.pageSize;
          this.total = data.result.total;
          this.pageTotal = data.result.pageTotal;
        })
      },
      //显示新建工单；end
//      <!--分页查询数据对象功能组合end-->
//  //      <!--弹窗功能start-->
        details(item,index){
          this.isDetailed.id = item.id;

          this.isDetailed.isShow=true;
        },
        add(){
          this.isAdd.isShow=true
        },
//      <!--弹窗功能end-->
//      <!--恢复 start-->
        open2(item) {
       //  console.log(item.state)
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
              let url=this.$apidomain+"/officialPartnerSubsetAccountInfo/updateOfficialPartnerSubsetAccountInfo";
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
//      <!--恢复 end-->
 //禁用  start
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
          let url=this.$apidomain+"/officialPartnerSubsetAccountInfo/updateOfficialPartnerSubsetAccountInfo";
          this.$http.post(url,o).then(res=>{
            let data = res.data;
            if("0000"===data.code){
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
      areaDetail(item){
       // console.log(item.businessQrCode);
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
  @import "../../../assets/styles/Ch_comminStyle";
  #app{
    .container{
      >ul{
        margin-top:40px;
        >li{
          float:left;
        }
      }
    }
    .table {
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
  .table_box{
    background:#fff;
    padding:20px;
  }
  .derive_btn{
    margin:20px 20px 10px 0;
  }
</style>






