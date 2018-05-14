<template>
  <div id="app">
    <div class="container">
      网点业务信息：<div class="user_sum">
        <user-sum class="sum" :suerSum="item" v-for="(item,index) in userSum" :key="index"></user-sum>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <div class="content">
        <div class="left_info">
          <p class="title">网点信息</p>
          <ul>
            <li>网点编号:{{dataObj.id}}</li>
            <li>网点名称:{{dataObj.name}}</li>
            <li>登陆账号:{{dataObj.username}}</li>
            <li>公司电话:{{dataObj.companyTel}}</li>
            <li>联系人:{{dataObj.linkmanName}}</li>
            <li>联系电话:{{dataObj.linkmanPhoneNum}}</li>
            <li>主营业务:{{skills|listshow}} </li>
            <li>服务区域:{{areas|listshow}} </li>
            <li>师傅人数:{{dataObj.peopleNum}}</li>
            <li>注册时间:{{dataObj.registerTime|moment('YYYY-MM-DD HH:mm:ss')}}</li>
            <li>近期登陆:{{dataObj.loginTime|moment('YYYY-MM-DD HH:mm:ss')}}</li>
            <el-button @click="Openpas" type="primary">修改密码</el-button>
          </ul>
        </div>
      </div>
    </div>
    <el-dialog style="z-index:999999;"  :visible.sync="dialogTableVisible" size="min" v-if="dialogTableVisible">
      <ul class="alert_forbidden_text">
        <li>
          <el-input v-model="newPass" placeholder="请输入新密码" type="password"></el-input>
        </li>
        <li>
          <el-input v-model="affirmPas" placeholder="请确认密码" type="password"></el-input>
          <br><span class="prompt" style="color:red;">{{text}}</span>
        </li>
      </ul>
      <el-button class="confirm_btn" @click="pas" type="primary">确定修改</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import userSum from "../../user/userSum.vue"
  export default {
    components:{
      userSum,
    },
    watch:{
      "dialogTableVisible":function(v,o){
        if(v){
          this.text=""
        }
      }
    },
    data(){
      return{
        dataObj:{},
        skills:[],
        areas:[],
        pristinePass:"",
        text:"",
        newPass:"",
        affirmPas:"",
        dialogTableVisible:false,
        //<!--顶部数据模板start-->
        userSum:[
          {
            sum:"88", //总用户量
            color:"blue",
            name:"网点服务分",
            sName:"%"
          },{
            color:"green",
            sum:"2000", //总用户量
            name:"网点总工单",
            sName:"单"
          },{
            color:"green",
            sum:"1000", //总用户量
            name:"已完成工单",
            sName:"单"
          },{
            color:"green",
            sum:"20", //总用户量
            name:"投诉工单数",
            sName:"单"
          },
        ],
        //<!--顶部数据模板end-->
      }
    },
    created(){
      let url=this.$apidomain+"/siteInfo/findDetail?id="+this.$getLocalStorage("enrolleeinfo")[0].id;
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.dataObj = data.result.siteInfo;
        this.skills = data.result.skills;
        this.areas = data.result.areas;
        this.userSum.forEach((v)=>{
          if("网点服务分"==v.name){
            v.sum = this.dataObj.serviceScore;
          }else if("网点总工单"==v.name){
            v.sum = this.dataObj.allOrderCount;
          }else if("已完成工单"==v.name){
            v.sum = this.dataObj.completeCount;
          }else if("投诉工单数"==v.name){
            v.sum = this.dataObj.complainOrder;
          }
        });
      });
    },
    methods: {
      Openpas(){
        this.dialogTableVisible=true;
      },
      pas(){

        if(!this.affirmPas || !this.newPass){
          this.text="请输入密码..."
          return;
        }
        if(this.affirmPas===this.newPass){
          var o={};
          o.id=this.dataObj.id;
          o.password = md5(this.newPass);
          let url=this.$apidomain+"/siteInfo/updateSiteInfo";
          this.$http.post(url,o).then(res=>{
            let data = res.data;
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.getTableList(this.paramsData())
          })
        }else{
          this.text="密码输入不一致"
        }
      }

    },
    mounted() {

    },

  }
</script>

<style scoped lang="scss">
  .el-input{
  }
  .confirm_btn{
    width:175px;
    /*transform:translateX(30%);*/
    display: block;
    margin:0 auto;

  }
  .alert_forbidden_text{
    padding:0 50px;
    text-align: center;
  }
  .prompt{
    text-align:left;
    float:left;
    height:auto;
    line-height:1.5em;
  }
  .container{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    overflow: hidden;
    overflow-y: auto;
    letter-spacing: 0;
    width:100%;
    border-radius: 10px;
    /*position:absolute;*/
    /*left:50%;*/
    /*top:50%;*/
    /*<!--transform:translate(-50%,-50%);-->*/
    background:#fff;
    height:70%;
    >h3{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      padding-left:10px;
      letter-spacing: 0;
    }
    .alert_forbidden_text{
      /*padding:0 60px;*/
      >li{
        line-height: 4em;
      }
    }
    >.content{

      width:100%;
      display:flex;

      >div{

        flex:1;

        >ul{

          >li{
          }
        }
      }
      >.left_info{
        >.title{
          padding-left:10px;
        }
      }
      .title{
        line-height:30px;
        width:100%;

      }
    }
    .consume_info{
      padding-bottom:200px;
      position:relative;
      >.title{
        padding-left:10px;
        line-height:30px;
        width:100%;
      }

    }
  }
  ul{
    padding-left:10px;
    list-style:none;
    >li{
      line-height:40px;
    }
  }

</style>
