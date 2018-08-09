<template>
  <div>
      <div class="detailAlert"></div>   <!--背阴-->
      <div class="detailAlert_box">
            <div class="el-message-box__title">
              <span>禁用账号</span>
              <i class="el-message-box__close el-icon-close" @click="close"></i>
            </div>
            <!-- 输入框 -->
            <div class="details-list">
              <textarea placeholder="请在此填写备注原因" v-model.trim="text"></textarea>
            </div>
            <!-- 底部按钮 -->
            <div class="btns">
                  <el-button @click="close">取消</el-button>
                  <el-button type="primary" @click ="primary">确定</el-button>
            </div>
     </div>
  </div>
</template>
<script>
    export default{
      components:{

      },
      props:["getTableList","forbiddenId"],
      data(){
          return{
              text:""  //禁用原因
          }
      },
      methods:{
          close(){
              let isbool = false;
              this.$emit('isForbiddens',isbool)
          },
          primary(){
              let params = {
                         "id":this.forbiddenId,
                         "state":"2",
                         "forbiddenCause":this.text,
                "forbiddenRemark": this.text
                     }
             let url = this.$apidomain + "/officialPartnerSubsetAccountInfo/updateSubsetAccountState";
             this.$http.post(url,params).then(res =>{
                 let data = res.data;
                 this.getTableList();
                 this.close();
             })
          }

      },
      created(){

      }
    }
</script>
<style scoped lang="scss">
  .detailAlert{
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
  .detailAlert_box{
    position: relative;
    width: 840px;
    height: 500px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top:50%;
    margin-top: -250px;
    margin-left: -420px;
    z-index:2008;
    border-radius: 3px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .el-message-box__title{
    width: 100%;
    height:44px;
    position: relative;
    background:rgba(243,243,243,1);
    .el-message-box__close{
      position: absolute;
      right: 14px;
      top:14px;
    }
    span{
      width: 100%;
      display: inline-block;
      height:44px;
      font-size:18px;
      font-family:PingFangSC-Regular;
      color:#5E6D82;
      line-height:44px;
      text-align: center;
    }
  }
  .details-list{
      margin-top:37px;
      width:773px;
      height:276px;
  }
  textarea{
      text-indent: 2em;
      margin-left: 34px;
      width:100%;
      height: 100%;
      resize: none;
      overflow-y:auto;
  }
  .btns{
          margin-left:266px;
          bottom:40px;
          position:absolute;
          //transform: translateY(90px);
          //margin-top:100px;
          .el-button{
              width: 140px;
              margin-right: 10px;
          }
      }
</style>

