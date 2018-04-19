<template>
  <el-form v-show="isChannel" ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container" >
    <h3 class="title">系统登录</h3>
    <el-form-item prop="username" style="text-align: center" >
      <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="pwd" style="text-align: center" >
      <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码" ref="password" ></el-input>
    </el-form-item>
    <!--<el-checkbox v-model="checked"  checked class="remember">记住密码</el-checkbox>-->
    <el-form-item  style="width:100%;text-align: center">
      <el-button type="primary"  style="width:200px;" @click.native.prevent="handleLogin" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  import {requestLogin} from '../api/api';
  import { setSession,
    getSession,
    setLocalStorageUserInfo,
    getLocalStorage,
    getLocalStorageUserInfo
  } from "../../static/js/session";
  //import NProgress from 'nprogress'

  export default {
    data() {
      return {
        type:"",
        isChannel:getSession("KEY")[0]==="3"?false:true,
        logining: false,
        account: {
          username: '',
          pwd: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            //{ validator: validaePass }
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleLogin() {
        this.$router.push({ path: '/' });
          let url =`${this.$apidomain}/login/login`;
          let params={"username":this.account.username,"password":md5(this.account.pwd),"type":getSession("KEY")[0]};
        this.$http.post(url,params).then(res=>{
            let data=res.data;
            if(data.code==="0000"){
              this.logining=false;
              sessionStorage.setItem('access-user', JSON.stringify(data.result));
              setSession("userInfo",data.result);
              setLocalStorageUserInfo("enrolleeinfo",data.result);
              setSession("fle",true);
              this.$router.push({ path: '/'});
              history.go(0)
            }else{
              this.logining=false;
              this.$queryFun.successAlert.call(this,data.error);
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
      if(getSession("KEY")[0]==="3"&&window.location.href.indexOf("http://localhost")===-1){
        setTimeout(()=>{
          window.location.href=this.$common.channelLogin;
        },1000);
      }else{
         setTimeout(()=>{
              this.isChannel=true;
        },1000);
      }
      if(getLocalStorageUserInfo("enrolleeinfo")[0]&&getLocalStorageUserInfo("enrolleeinfo")[0].token){
//        setLocalStorage("enrolleeinfo",JSON.stringify(getLocalStorage("enrolleeinfo")[0]));
        sessionStorage.setItem('access-user', JSON.stringify(getLocalStorageUserInfo("enrolleeinfo")[0]));
        this.$router.push({ path: '/'});
      }
      this.$router.push({ path: '/' });
    }
  }
</script>
<style>
  body{
    background: #DFE9FB;
  }
  .el-form-item__error{
    margin-left:33px;
    /*line-height: 2em;*/
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
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    background: -ms-linear-gradient(top, #fff, #6495ed);        /* IE 10 */
    background:-moz-linear-gradient(top,#b8c4cb,#f6f6f8);/*火狐*/
    background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#b8c4cb), to(#f6f6f8));/*谷歌*/
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#6495ed));      /* Safari 4-5, Chrome 1-9*/
    background: -webkit-linear-gradient(top, #fff, #6495ed,#fff);   /*Safari5.1 Chrome 10+*/
    background: -o-linear-gradient(top, #fff, #6495ed);  /*Opera 11.10+*/

    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
