<template>
    <div>
      <el-dialog style="z-index:9999999999;"  :visible.sync="$store.state.isChannelPassword" size="min">
        <ul class="alert_forbidden_text">
          <li>
            <div class="list_name">
              输入新密码
            </div>
             <form class="form" action="">
                    <el-input style="width:250px;" v-model="newPass" autocomplet="off" placeholder="请输入新密码" type="password"></el-input>
             </form>
          </li>
          <li>
            <div class="list_name">
              确认新密码
            </div>
            <form class="form" action="">
                  <el-input style="width:250px;" v-model="affirmPas" placeholder="请确认密码" type="password"></el-input>
            </form>
        
          </li>
        </ul>
        <div class="btn_box">
          <el-button class="confirm_btn" @click="$store.commit('isChannelPass')">取消</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button class="confirm_btn" @click="submit" type="primary">确定</el-button>
        </div>

      </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              newPass:"",
              affirmPas:"",
              text:"",
            }
        },
        methods: {
          submit(){
            if(!this.affirmPas || !this.newPass){
              this.$queryFun.successAlert.call(this,"请输入密码...","0");

              return;
            }
            if(this.affirmPas===this.newPass){
              let o={};
              o.id=this.$getLocalStorage("enrolleeinfo")[0].id;
              o.password = md5(this.newPass);
              let url=this.$apidomain+"/officialpartnerinfo/updateOfficialPartnerInfo";
              this.$http.post(url,o).then(res=>{
                let data = res.data;
                if(data.code==="0000"){
                  this.$queryFun.successAlert.call(this,'修改成功',"1");
                  this.$store.commit('isChannelPass')
                }else{
                 this.$queryFun.successAlert.call(this,data.error,"0");
                }
              })
            }else{
              this.$queryFun.successAlert.call(this,"密码输入不一致...","0");
            }
          }
        },
        created() {
        }
    }
</script>
<style  lang="scss" scoped>
    .alert_forbidden_text{
      margin-left:40px;
      margin-right:80px;
      >li{
        line-height: 4em;
        width:auto;
        >.list_name{
          width:auto;
          margin-right:20px;
        }
      }
    }
  .btn_box{
    text-align: center;
    margin-top:20px;
    .confirm_btn{
      padding-left:30px;
      padding-right:30px;
    }
  }
.form{
    display:inline-block;
}
</style>
