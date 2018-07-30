<template>
  <div id="app">
    <div class="container">
      <div class="dable_lsit">
        <!--导出-->
        <table cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in masterInfos">
            <td>
              {{index+1}}
            </td>
            <td>
              {{item.id}}
            </td>
            <td>
              {{item.city}}
            </td>
            <td>
              {{item.name}}
            </td>
            <td>
              {{item.phoneNum }}
            </td>
            <td>
              {{item.type|mastertype}}
            </td>
            <td>
              {{item.site}}
            </td>
            <td>
              {{item.loginTime|moment('YYYY-MM-DD HH:mm:ss')}}
            </td>
            <td>
              {{item.state | userState}}
            </td>
            <td>
              <span class="details_icon"><el-button type="text" @click="details(item,index)"><i></i>详情</el-button></span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--大弹框 详情-->
    <div class="alert" v-if="isDetailed.isShow">
      <alert-info :isDetailed="isDetailed">
      </alert-info>
    </div>
    <!--大弹框 详情end-->
    <!--<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>-->
    <div>
    </div>
  </div>
</template>
<script>

  import alertInfo from "./alertInfo";
  import { getSession } from "../../../static/js/session";

  export default {
    components:{
      alertInfo
    },
    data() {
      return {
        checked:false,
        theadsName:[
          '序号',
          '师傅编号',
          '城市',
          '姓名',
          '手机号码',
          '师傅类别',
          '所属网点',
          '近期登陆',
          '状态',
          '操作'
        ],
        selectorBehindObj:{},
        masterInfos:[],
        //<!--搜索框与table与分页end-->
        isAlert:this.$store.state.isAlert,
        isActive:"0",
        isDetailed:{
          isShow:false,
        }
      }
    },
    created(){

    },
    methods: {
      paramsData(){
        return {params: {
          "siteId":this.$getLocalStorage("enrolleeinfo")[0].id
        }}
      },
      details(item,index){
        this.isDetailed.id = item.id;
        this.isDetailed.isShow=true;
      },
    },
    mounted() {
    },
  }
</script>
<style scoped lang="scss">
  @import "../../assets/styles/comminStyle";
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


