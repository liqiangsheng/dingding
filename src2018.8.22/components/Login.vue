<template>
  <!--<el-form v-show="isChannel" ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"-->
           <!--class="demo-ruleForm login-container" >-->
    <!--<h3 class="title">系统登录</h3>-->
    <!--<el-form-item prop="username" style="text-align: center" >-->
      <!--<el-input type="text" v-model.trim="account.username" auto-complete="off" placeholder="账号"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item prop="pwd" style="text-align: center" >-->
      <!--<el-input type="password" v-model.trim="account.pwd" auto-complete="off" placeholder="密码"-->
                <!--ref="password"></el-input>-->
    <!--</el-form-item>-->
    <!--&lt;!&ndash;<el-checkbox v-model.trim="checked"  checked class="remember">记住密码</el-checkbox>&ndash;&gt;-->
    <!--<el-form-item  style="width:100%;text-align: center">-->
      <!--<el-button type="primary"  style="width:200px;" @click.native.prevent="handleLogin" :loading="logining">登录</el-button>-->
    <!--</el-form-item>-->
  <!--</el-form>-->
  <div v-show="isChannel" ref="AccountFrom" :model="account" :rules="rules" class="login-container">
     <h3 class="title" :class="{title1:errorHintsShow==true}">叮叮快修后台管理系统登录</h3>
    <div id="errorHints" v-if="errorHintsShow">{{errorHints}}</div>
    <div class="loginBox">
        <img src="../../static/images/cityPosition.png" alt="" style="top: 10px;">
      <!--<select placeholder="请选择城市" v-model="cityValue" @change="cityClick(cityValue)" style="width: 200px;height: 40px">-->
        <!--<option v-for="(item,index) in options.options1"  :key="index"  v-bind:value="item.domain">{{item.cityName}}</option>-->
      <!--</select>-->
      <el-select v-model="cityValue" placeholder="请选择城市" @change="cityClick(cityValue)" style="width: 268px;height: 40px" id="el-input__inner2">
        <!--<el-select v-model="cityValue" placeholder="请选择城市" style="width: 268px;height: 40px" id="el-input__inner2">-->
            <el-option
              v-for="(item,index) in options.options1"
              :key="index"
              :label="item.cityName"
              :value="item.cityName">
            </el-option>
        </el-select>
    </div>
    <div class="loginBox">
      <img src="../../static/images/userName.png" alt="">
      <el-input type="text" v-model.trim="account.username"  placeholder="请填写账号" id="el-input__inner"></el-input>
    </div>
     <div class="loginBox">
       <img src="../../static/images/passWord.png" alt="">
       <el-input type="password" v-model.trim="account.pwd"  placeholder="请填写密码" ref="password"id="el-input__inner1"></el-input>
     </div>
    <div style="width: 268px;margin-top: 17px;margin-bottom: 30px;overflow: hidden">
      <el-checkbox style="float: right;font-size:12px;line-height: 17px;color:rgba(136,136,136,1)" v-model="checked1">保存密码</el-checkbox>
    </div>
    <div class="loginBox">
      <button class="el-button" @click="handleLogin">登录</button>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  import {requestLogin} from '../api/api';
  import {
    setSession,
    getSession,
    setLocalStorageUserInfo,
    getLocalStorage,
    getLocalStorageUserInfo
  } from "../../static/js/session";
  //import NProgress from 'nprogress'

  export default {
    data() {
      return {
        checked1:false, //默认不选中记住密码
        errorHintsShow:false,
        errorHints:"密码错误", //错误提示
        cityValue:"",
        cityId:"",
        options:{
          label: '城市名',
          options1:this.$store.state.cityUrl
        },
        type:"",
        isChannel:getSession("KEY")[0]==="3"?false:true,
        logining: false,
        account: {
          username: '',
          pwd: ''
        },
        rules: {
          username: [
            {required: true, message: '请填写账号', trigger: 'blur'},
            //{ validator: validaePass }
          ],
          pwd: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    watch:{

    },
    methods: {
      cityClick(value){ //城市选择
        console.log(value)
          this.options.options1.forEach((obj,i) =>{
            if(obj.cityName === value){
//                 window.location.href = obj.domain;
            }
          })
      },
      handleLogin() {

          let url =`${this.$apidomain}/login/login`;
          let params={"username":this.account.username,"password":md5(this.account.pwd),"type":getSession("KEY")[0]};
           this.$http.post(url,params).then(res=>{
            let data=res.data;
            if(data.code==="0000"){
              console.log(data.result,'登陆数据')
              localStorage.setItem("cityValue",JSON.stringify(this.cityValue));
              sessionStorage.setItem('access-user', JSON.stringify(data.result));
              setSession("userInfo",data.result);
              setLocalStorageUserInfo("enrolleeinfo",data.result);
              setSession("fle",true);
              setSession("update","0");
              this.$router.push({ path: '/'});
              if(this.checked1 === true&&getSession("KEY")[0]==="1"){
                let obj ={userName:this.account.username,password:this.account.pwd,checked1:this.checked1,cityValue:this.cityValue}
                Cookies.set("longinData",JSON.stringify(obj)) //记住密码
              }else {
                Cookies.remove("longinData") //记住密码
              }
              if(this.checked1 === true&&getSession("KEY")[0]==="2"){
                let obj ={userName:this.account.username,password:this.account.pwd,checked1:this.checked1,cityValue:this.cityValue}
                Cookies.set("longinData2",JSON.stringify(obj)) //记住密码
              }else {
                Cookies.remove("longinData2") //记住密码
              }
              if(this.checked1 === true&&getSession("KEY")[0]==="3"){
                let obj ={userName:this.account.username,password:this.account.pwd,checked1:this.checked1,cityValue:this.cityValue}
                Cookies.set("longinData3",JSON.stringify(obj)) //记住密码
              }else {
                Cookies.remove("longinData3") //记住密码
              }
            }else{
              this.errorHintsShow=true;
              this.errorHints = res.data.error;
//              this.$queryFun.successAlert.call(this.data.error);
            }
        })
      }
    },
    mounted(){
      this.$nextTick(function (){
            this.$refs.password.$refs.input.onkeydown= eve=>{
                if(eve.keyCode===13)this.handleLogin();
            }
      })
    },
    created(){
      let href = window.location.href;
//      let href ="0101"
      this.options.options1.forEach((item,index)=>{
        if(href.startsWith(item.domain)){
          this.cityValue = item.cityName;
        }
      })
//      let cityUrl = this.$apidomain+"/areaDomain/findAreaDomainList?modelName="+getSession("KEY")[0];
//      this.$http.get(cityUrl).then(res=>{
//        if(res.data.code === "0000"){
//          console.log(res.data,'城市数据')
//          this.options.options1 =res.data.result;
//        }else{
//          this.$queryFun.successAlert.call(this,data.error);
//        }
//      })
//      let mapUrl = 'https://restapi.amap.com/v3/ip?output=json&key=6f7abd3e0d62ca6affa0e32b55138d1a';
//      this.$http.get(mapUrl).then(res=>{
//        console.log(res,"asdfd")
//        this.cityValue = res.data.city
//      })
      let loginData;
      if(getSession("KEY")[0]==="1"){
        loginData = Cookies.get("longinData")?JSON.parse(Cookies.get("longinData")):""; //获取密码存在cookie
      }else if(getSession("KEY")[0]==="2"){
         loginData = Cookies.get("longinData2")?JSON.parse(Cookies.get("longinData2")):"" ;//获取密码存在cookie
      }else if(getSession("KEY")[0]==="3"){
         loginData = Cookies.get("longinData3")?JSON.parse(Cookies.get("longinData3")):"" ;//获取密码存在cookie
      }
//      if(loginData&&loginData.cityValue == str){
        if(loginData != ""){
        this.account= {
          username: loginData.userName,
          pwd: loginData.password
        }
          this.checked1=loginData.checked1;
          this.cityValue=loginData.cityValue;
      }else{
        this.account= {
          username: "",
          pwd:""
        }
        this.checked1=false;
      }

        if(getSession("KEY")[0]==="3"&&window.location.href.indexOf("http://localhost")===-1&&false){ //测试
//      if(getSession("KEY")[0]==="3"&&window.location.href.indexOf("http://localhost")===-1){//上线用
        setTimeout(()=>{
          window.location.href=this.$common.channelLogin;
        },1000);
      }else{
         setTimeout(()=>{
              this.isChannel=true;
        },1000);
      }

      if(JSON.parse(Cookies.get('enrolleeinfo'))){
        Cookies.set('access-user', getLocalStorageUserInfo("enrolleeinfo")[0]);
        this.$router.push({ path: '/'});
      }
      this.$router.push({ path: '/' });
    }
  }
</script>
<style>

  body{
    background: #D9EBFF;
  }
  .el-form-item__error{
    margin-left:33px;
    /*line-height: 2em;*/
  }
  #el-input__inner .el-input__inner{
    text-indent: 20px !important;
    height: 40px;
  }
  #el-input__inner1 .el-input__inner{
    text-indent: 20px !important;
    height: 40px;
  }
  #el-input__inner2 .el-input__inner{
    text-indent: 20px !important;
    height: 40px;
  }
</style>
<style lang="scss" scoped>

  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 390px;
    min-height: 390px;
    padding: 35px 15px 15px 55px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #A7D1EF;

    background: -ms-linear-gradient(top, #fff, #6495ed);        /* IE 10 */
    background:-moz-linear-gradient(top,#b8c4cb,#f6f6f8);/*火狐*/
    background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#b8c4cb), to(#f6f6f8));/*谷歌*/
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#6495ed));      /* Safari 4-5, Chrome 1-9*/
    background: -webkit-linear-gradient(top, #fff, #6495ed,#fff);   /*Safari5.1 Chrome 10+*/
    background: -o-linear-gradient(top, #fff, #6495ed);  /*Opera 11.10+*/
    .title {
      margin: 0px 0 54px -50px;
      text-align: center;
      font-size: 18px;
      color: #505458;
    }
    .title1 {
      margin: 0px 0 8px -50px;
      text-align: center;
      font-size: 18px;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    .loginBox{
      width: 100%;
      position: relative;
      img{
        position: absolute;
        display: inline-block;
        width: 16px;
        height: 19px;
        z-index: 1;
        top: 20px;
        left: 10px;
      }
      .el-input{
        margin-top: 8px;
        width:268px;
      }
      .el-button{
        margin-top: 8px;
        width:268px;
        height:40px;
        background: #23A1FE;
        cursor: pointer;
        font-size:13px;
        color:rgba(255,255,255,1);
      }
      .el-button:hover{
        width:268px;
        height:40px;
        background:rgba(77,179,255,1);
        border-radius:4px;
        font-size:13px;
        color:rgba(255,255,255,1);
      }
      .el-button.active{
        width:268px;
        height:40px;
        background:rgba(29,144,230,1);
        border-radius:4px;
        font-size:13px;
        color:rgba(255,255,255,1);
      }

    }

  }
  #errorHints{
    margin-bottom: 8px;
    padding-top: 10px;
    width: 268px;
    min-height:42px;
    background:rgba(255,241,241,1);
    border:1px solid rgba(230,88,49,1);
    font-size:13px;
    font-family:PingFangSC-Regular;
    color:rgba(230,88,49,1);
    line-height:18px;
     text-align: center;
  }
</style>
