<template>
  <div>
      <div class="detailAlert"></div>   <!--背阴-->
      <div class="detailAlert_box">
            <div class="el-message-box__title">
              <span>异常备注</span>
              <i class="el-message-box__close el-icon-close" @click="close"></i>
            </div>
            <!-- 输入框 -->
            <div class="details-list">
               <p>1. 如需重新服务或维护该工单费用,报成功异常后请客服挂起该工单;</p>
               <p>2. 如需重新计算该工单的提点,则报异常后,维护对象提点后再次结算该工单;</p>
               <textarea v-model="text" placeholder="请填写账号异常原因"></textarea>
            </div>
            <!-- 底部按钮 -->
            <div class="btn">
                  <el-button @click="close">取消</el-button>
                  <el-button type="success" @click="submit">确定</el-button>
              </div>
     </div>
  </div>
</template>
<script>
    export default{
      components:{

      },
      props:["display"],
      data(){
          return{
           text:""      //备注
          }

      },
      methods:{
         submit(){

         },
         close(){
             let isbool =false;
             this.$emit("isClose",isbool)
         }
      },
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
    width: 906px;
    height: 500px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top:50%;
    margin-top: -250px;
    margin-left:-453px;
    z-index:10000;
    border-radius: 3px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .el-message-box__title{
    width: 100%;
    height:44px;
    position: relative;
    background:#FFFFFF;
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
      color:#333333;
      line-height:44px;
      text-align: center;
    }
  }
  .details-list{
    height:200px;
    width: 703px;
    //background: red;
    margin: 54px 101px 0px 102px;
    p{
        color:#393939;
        font-size:14px;
        height: 30px;
        line-height: 30px;
    }
    p:nth-of-type(2){
        margin-bottom: 27px;
    }
  }
  textarea{
      text-indent: 10px;
      font-size: 14px;
      width: 100%;
      height:131px;
      overflow-y: auto;
      resize: none;
      border-radius: 4px;
  }
  .btn{
          margin-left:266px;
          bottom:40px;
          position:absolute;
          //transform: translateY(180px);
          //margin-top:100px;
          .el-button{
              width: 140px;
              margin-right: 10px;
          }
      }
</style>

