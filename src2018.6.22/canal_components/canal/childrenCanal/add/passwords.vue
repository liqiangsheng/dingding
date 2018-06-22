<template>
  <!--余额不足creditIsRunningLow-->
  <div>
    <div class="creditIsRunningLow"><!--背阴-->
    </div>
    <div class="creditIsRunningLow_box">
      <div class="el-message-box__title">
        <span>修改密码</span>
        <i class="el-message-box__close el-icon-close" @click="close"></i>
      </div>
      <div class="center">
        <p>新密码
          <el-input v-model.trim="password1" placeholder="请输入新密码"></el-input>
        </p>
        <p>再次输入新密码
          <el-input v-model.trim="password2" placeholder="请再次输入新密码"></el-input>
        </p>
      </div>
      <div class="footer" style="text-align: center">
        <el-button @click="delClick">　取消　</el-button>
        <el-button type="primary" @click="Okclick">确定修改</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:["dataObjID"],
    components:{
    },
    data() {
      return {
        password1:'',
        password2:'',
      }
    },
    methods: {
      close(){
        this.$emit("isClose",false)
      },
      delClick(){
        this.$queryFun.successAlert.call(this,"取消修改");
         this.close();
      },
      Okclick(){
        if(this.password1.length<6){
          this.$queryFun.successAlert.call(this,"密码不能少于6位");
          return;
        }
        if(this.password2 !=this.password1 ){
          this.$queryFun.successAlert.call(this,"再次输入新密码与修改密码不一致");
          return;
        }
        //let o = {"id":this.dataObjID,"password":md5(this.password2)};
        let urlR=this.$apidomain+"/officialPartnerSubsetAccountInfo/updatePassword?id="+this.dataObjID+"&password="+md5(this.password2);
        this.$http.get(urlR).then(res=>{
          if(res.data.code==='0000') {
            //console.log(res.data,"12312")
            this.$queryFun.successAlert.call(this,"修改密码成功","1");
            this.close();

          }else{
            this.$queryFun.successAlert.call(this,res.data.error);
          }
        })
        //this.$emit("password",this.password2)
      }
    },
    mounted() {
    },
    created(){
    }
  }
</script>

<style scoped lang="scss">
  .creditIsRunningLow{
    width: 100%;
    background: black;
    position: absolute;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index:2007;
    opacity: 0.2;
  }
  .creditIsRunningLow_box{
    width: 600px;
    height:400px;
    background-color: #fff;
    position: absolute;
    left: 30%;
    top:24%;
    z-index:2008;
    border-radius: 3px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .el-message-box__title{
    width: 100%;
    height:40px;
    position: relative;
    background:rgba(243,243,243,1);
    .el-message-box__close{
      position: absolute;
      right: 10px;
      top:10px;
    }
    span{
      width: 100%;
      display: inline-block;
      height:14px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:36px;
      text-align: center;
    }
  }
  .center{
    width: 100%;
    height: 300px;
    padding: 50px;
    overflow: hidden;
    p{
      width: 65%;
      margin-bottom: 30px;
      text-align: right;
      margin-right: 35%;
    }
  }

</style>





