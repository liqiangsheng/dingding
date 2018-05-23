<template>
  <div>
    <div class="login_box">
      <mu-text-field label="新密码"   ref="password"   hintText="请输入新密码" v-model="newPassWord" type="password" style="text-align:left;" labelFloat/><br/>
      <mu-text-field label="确认密码"  ref="password"   hintText="请再次输入新密码" v-model="affirmPassWord" type="password" style="text-align:left;" labelFloat/><br/>
      <mt-button type="primary" style="width:6.3rem;" @click="submit">确定修改</mt-button>
    </div>
  </div>
</template>
<script>
  import storage from "@/assets/js/storage"
  const exp = /^[0-9a-zA-Z]+$/;
  export default {
    components:{

    },
    data () {
      return {
        newPassWord:"",
        affirmPassWord:"",
        siteId:"",
        isExp:false,
      }
    },
    watch:{
      "newPassWord":function(e){
        this.isExp=exp.test(e);
        if(this.newPassWord.length&&!this.isExp){
          this.$Toast({
            message: '密码必须为数字或英文',
            position: 'center',
            duration: 2000
          });
        }
      }
    },
    methods:{
      submit(){
        if(!this.newPassWord){
          return this.$Toast({
            message: '请输入新密码',
            position: 'bottom',
            duration: 1800
          });
        }else if(!this.affirmPassWord){
          return this.$Toast({
            message: '请再次输入新密码',
            position: 'bottom',
            duration: 1800
          });
        }else if(this.affirmPassWord!==this.newPassWord){
          return this.$Toast({
            message: '密码不一致',
            position: 'bottom',
            duration: 1800
          });
        }else if(!this.isExp){
          return this.$Toast("密码必须为数字或英文")
        }
        let params={
            "id":this.siteId,
            "password":md5(this.affirmPassWord),
          },
          url =`${this.$common.apidomain}/siteInfo/updateSiteInfo`;
        this.$http.post(url,params).then(res=>this.$httpFilter(res).then(data=>{
          this.$ToastMessage("修改成功");
          setTimeout(()=>{
            this.$router.back(-1);
          },1500)
        },err=>{}));
      }
    },
    created() {
      let url=`${this.$common.apidomain}/siteInfo/findDetail?id=${storage.getLocalStorage("userInfo").id}`;
      this.$http.post(url).then(res=>this.$httpFilter(res).then(data=>{
          const result = data.result;
                this.siteId = result.siteInfo.id
      }));
    },
    mounted(){
      this.$nextTick(()=>{
        this.$refs.password.$refs.input.addEventListener("keydown",(e)=>{
          if(e &&e.key==="Enter"&& e.keyCode==13)this.submit();
        });
      })
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
  .login_box{
    .mu-text-field-focus-line{
      background:#536BD2;
    }
  }

</style>
