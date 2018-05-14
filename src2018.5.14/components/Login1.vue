+<template>
  <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <el-form-item prop="username" style="text-align: center">
      <span class="fon"></span><el-input type="text" v-model="account.username" auto-complete="off" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item prop="pwd" style="text-align: center">
      <span class="fon"></span><el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <!--<el-checkbox v-model="checked"  checked class="remember">记住密码</el-checkbox>-->
    <el-form-item style="width:100%;text-align: center">
      <div class="but" :class="{'active':dj}" @click="handleLogin" :loading="logining">登录</div>
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
        dj:false,
        type:"",
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
//        this.$router.push({ path: '/' });
          this.dj=true;
          let url =`${this.$apidomain}/login/login`;
          let params={"username":this.account.username,"password":md5(this.account.pwd),"type":getSession("KEY")[0]};
        this.$http.post(url,params).then(res=>{
            let data=res.data;
          console.log(data);
          if(data.code==="0000"){
              this.logining=false;
              sessionStorage.setItem('access-user', JSON.stringify(data.result));
              setSession("userInfo",data.result);
              setLocalStorageUserInfo("enrolleeinfo",data.result);
              setSession("fle",true);
//              本地
//              window.top.location.href="http://localhost:8080";
//              测试
              window.top.location.href=this.$pcApi;
//                正式
//             window.top.location.href="http://manage.dingdingkuaixiu.com";



//            window.open("http://channel.testdist.dingdingkuaixiu.com/",'_self');

//              this.$router.push({ path: '/'});
//              history.go(0)
            }else{
              this.logining=false;
            this.dj=false;
              alert(data.error);
            }
        })
      }
    },
    created(){

        if(getLocalStorageUserInfo("enrolleeinfo")[0]&&getLocalStorageUserInfo("enrolleeinfo")[0].token){
//        setLocalStorage("enrolleeinfo",JSON.stringify(getLocalStorage("enrolleeinfo")[0]));
          sessionStorage.setItem('access-user', JSON.stringify(getLocalStorageUserInfo("enrolleeinfo")[0]));
          this.$router.push({ path: '/login1'});
        }
        this.$router.push({ path: '/login1' });


    }
  }
</script>
<style>
  html,body{
    width:100%;
    height: 100%;
    background: #fff;
  }
  .el-form-item{
  	margin-bottom: 18px;
  }
  .el-form-item__error{
    left: 58px !important;
  }
  .fon{
    font-size: 18px;
    color: #4c4c4c;
    padding-right:15px ;
  }
  .el-button{
    margin-left: 24px;
  }
  .but{
    /*position: absolute;*/
    /*right:20px;*/
    margin-left: 35%;
    width: 124px;
    height: 49px;
    font-size: 20px;
    font-family: "微软雅黑";
    background: url("../../static/images/loginColor.png");
    line-height: 49px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
  .but:hover{
    /*position: absolute;*/
    /*right:20px;*/
    margin-left: 35%;
    width: 124px;
    height: 49px;
     font-size: 20px;
    font-family: "微软雅黑";
    background: url("../../static/images/loginColor.png");
    line-height: 49px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
  .but.active{
    margin-left: 35%;
    width: 124px;
    height: 49px;
     font-size: 20px;
    font-family: "微软雅黑";
    background: url("../../static/images/loginColor.png");
    line-height: 49px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
  .el-input__inner{
    width: 232px;
  }
</style>
<style lang="scss" scoped>

  /*.login-container {*/
    /*!*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*!*/
    /*-webkit-border-radius: 5px;*/
    /*border-radius: 5px;*/
    /*-moz-border-radius: 5px;*/
    /*background-clip: padding-box;*/
    /*margin: 160px auto;*/
    /*width: 350px;*/
    /*padding: 35px 35px 15px 35px;*/
    /*background: #fff;*/
    /*border: 1px solid #eaeaea;*/
    /*box-shadow: 0 0 25px #cac6c6;*/

    /*background: -ms-linear-gradient(top, #fff, #6495ed);        !* IE 10 *!*/
    /*background:-moz-linear-gradient(top,#b8c4cb,#f6f6f8);!*火狐*!*/
    /*background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#b8c4cb), to(#f6f6f8));!*谷歌*!*/
    /*background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#6495ed));      !* Safari 4-5, Chrome 1-9*!*/
    /*background: -webkit-linear-gradient(top, #fff, #6495ed,#fff);   !*Safari5.1 Chrome 10+*!*/
    /*background: -o-linear-gradient(top, #fff, #6495ed);  !*Opera 11.10+*!*/

    /*.title {*/
      /*margin: 0px auto 40px auto;*/
      /*text-align: center;*/
      /*color: #505458;*/
    /*}*/
    /*.remember {*/
      /*margin: 0px 0px 35px 0px;*/
    /*}*/
  /*}*/
</style>
