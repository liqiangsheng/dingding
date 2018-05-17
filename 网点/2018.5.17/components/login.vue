<template>
<div>
    <div class="login_box">
        <mu-text-field label="用户名" hintText="请输入用户名" v-model="userName"  style="text-align:left;" labelFloat/><br/>
        <mu-text-field label="密码"   hintText="请输入密码" v-model="passWord" type="password" style="text-align:left;" labelFloat/><br/>
        <mt-button type="primary" style="width:6.3rem;" @click="submit">登录</mt-button>
    </div>

</div>
</template>
<script>
import storage from "@/assets/js/storage"
  export default {
    components:{
    },
    data () {
      return {
       userName:"",
       passWord:""
      }
    },
    methods:{
        submit(){
            if(!this.userName){
                return this.$Toast("请输入用户名")
            }else if(!this.passWord){
                return this.$Toast("请输入密码")
            }
            let params={
                    "username":this.userName,
                    "password":md5(this.passWord),
                    "type":"2"
                },
                url =`${this.$common.apidomain}/login/login`;
                this.$http.post(url,params).then(res=>this.$httpFilter(res).then(data=>{
                    const result=data.result;
                     let date=new Date()
                     date.setTime(date.getTime()+6*60*60*1000);
                     storage.setLocalStorage("userInfo",Object.assign({targetTime:date.getTime()},result))
                     this.$router.push({ path: '/'});
                },err=>{}))
                return;

        }
    },
    created() {

    },
   mounted(){

   },
  }
</script>
<style scoped lang="less">
 .has-label{
     margin:0 auto;
     width:80%;
 }
 .mu-text-field-hint{
     text-align: left;
 }
 .login_box{
     padding-top:.7rem;
        text-align: center;
        .mu-text-field.focus-state{
            color:#536BD2;
            font-size:0.38rem;
            font-family:PingFangSC-Regular;
    }
 }
 .mint-button--primary{
   background: #536BD2;
   margin-top:1rem;
 }
</style>

<style lang="less">
</style>
