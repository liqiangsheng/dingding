<template>
 <div>
        <div class="detailAlert"><!--背阴-->
        </div>
        <div class="detailAlert_box">
            <div class="el-message-box__title">
              <span>订单详情</span>
              <i class="el-message-box__close el-icon-close" @click="close"></i>
            </div>
            <div class="detailBox">
                   <div class="detail">
                         <div class="userInformation">
                              <p><span></span>服务信息</p>
                              <div class="userInfos">
                                    <ul class="userInfosBox">
                                      <li><span>工单号</span><span>{{}}</span></li>
                                      <li><span>质保状态</span><span>{{}}</span></li>
                                      <li><span>联系人</span><span>{{}}</span></li>
                                      <li><span>服务地址</span><span>{{}}</span></li>
                                      <li><span>预约时间</span><span>{{}}</span></li>
                                      <li><span>服务时长</span><span>{{}}</span></li>
                                      <li><span>师傅工号</span><span>{{}}</span></li>
                                      <li><span>子渠道</span><span>{{}}</span></li>
                                    </ul>
                                     <ul class="userInfosBox1">
                                       <li><span>工单状态</span><span>{{}}</span></li>
                                       <li><span>紧急程度</span><span>{{}}</span></li>
                                       <li><span>联系人手机</span><span>{{}}</span></li>
                                       <li><span style="border-right: 0;">　</span><span style="color: #FFFFFF">叮叮快修</span></li>
                                       <li><span>完成时间</span><span>{{}}</span></li>
                                       <li><span>子渠道</span><span>{{}}</span></li>
                                       <li><span>工单类型</span><span>{{}}</span></li>
                                       <li><span>备注</span><span>{{}}</span></li>
                                     </ul>
                              </div>
                         </div>
                         <div class="userInformation1">
                           <p><span></span>服务类型</p>
                           <div class="userInfos1">
                             <div class="userInfosBox2">

                             </div>
                             <div class="userInfosBox3"></div>
                           </div>
                         </div>
                           <div class="userInformation2">
                             <p><span></span>费用说明</p>
                             <div class="userInfos2">
                               <div class="userInfosBox4"></div>
                               <div class="userInfosBox5"></div>
                             </div>
                           </div>
                             <div class="userInformation3">
                               <p>申请维保？<img src=""></p>
                               <p>致电客服热线：400-999-1891</p>
                             </div>
                         </div>
                   </div>
            </div>
        </div>
  </div>
</template>
<script>
  export default {
    components:{
    },
    data() {
      return {

      }
    },
    created(){

    },
    methods: {
       close(){ //传值给父亲组件
        let isbool = false;
        this.$emit("isClose1",isbool)
        }
    },
    mounted() {
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
    width: 80%;
    height: 75%;
    background-color: #fff;
    position: absolute;
    left: 11%;
    top:12%;
    z-index:2008;
    border-radius: 3px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .el-message-box__title{
    width: 100%;
    height:7%;
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
      height:14px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:48px;
      text-align: center;
    }
  }
.detailBox{
  width: 100%;
  height: 93%;
  padding: 10px;
  overflow: hidden;
}
  .detail{
    width:100%;
    overflow-y: auto;
  }
  .userInformation{
    width: 100%;
    p{
      height:22px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(136,136,136,1);
      line-height:22px;
      span{
        display: inline-block;
        width:4px;
        height:18px;
        background:rgba(230,88,49,1);
        transform: translateY(4px);
        margin-right: 10px;
      }
    }
    .userInfos{
      width: 100%;
      padding: 20px;
      display: flex;
      .userInfosBox,.userInfosBox1{
         flex: 1;
      }
      .userInfosBox{
        width: 100%;
        border: 1px solid #CCCCCC;
        border-bottom:0;
        border-right:0;
          li{
          font-size:14px;
          font-family:PingFangSC-Regular;
          color:rgba(94,109,130,1);
          line-height:36px;
          display: flex;
          span:nth-child(1){
            width: 120px;
            text-align: center;
            border-bottom: 1px solid #CCCCCC;
          }
            span:nth-child(2){
              flex: 1;
              text-align: center;
              border-left: 1px solid #CCCCCC;
              border-bottom: 1px solid #CCCCCC;
            }

        }


      }
      .userInfosBox1{
        width: 100%;
        border: 1px solid #CCCCCC;
        border-bottom:0;
        border-left:0;
        li:nth-child(4){
          border-left:0;
          span{
            border-left: 0;
            border-right: 0;
            /*background: red;*/
          }
        }

        li{
          font-size:14px;
          font-family:PingFangSC-Regular;
          color:rgba(94,109,130,1);
          border-left: 1px solid #CCCCCC;
          line-height:36px;
          display: flex;
          span:nth-child(1){
            width: 120px;
            text-align: center;
            border-bottom: 1px solid #CCCCCC;
            border-right: 1px solid #CCCCCC;
          }
          span:nth-child(2){
            flex: 1;
            text-align: center;
            border-bottom: 1px solid #CCCCCC;
          }

        }
      }
    }
    .userInfos1{
      width: 100%;
      padding: 20px;
      display: flex;
      .userInfosBox,.userInfosBox1{
        flex: 1;
      }
      .userInfosBox{
        background: red;
        height: 100px;
      }
      .userInfosBox1{
        background: green;
        height: 100px;
      }
    }
  }
  .userInformation1{
    width: 100%;
    p{
      height:22px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(136,136,136,1);
      line-height:22px;
      span{
        display: inline-block;
        width:4px;
        height:18px;
        background:rgba(230,88,49,1);
        transform: translateY(4px);
        margin-right: 10px;
      }
    }
    .userInfos1{
      width: 100%;
      padding: 20px;
      display: flex;
      .userInfosBox2,.userInfosBox3{
        flex: 1;
      }
      .userInfosBox2{
        background: red;
        height: 100px;
      }
      .userInfosBox3{
        background: green;
        height: 100px;
      }
    }
    .userInfos2{
      width: 100%;
      padding: 20px;
      display: flex;
      .userInfosBox2,.userInfosBox3{
        flex: 1;
      }
      .userInfosBox2{
        background: red;
        height: 100px;
      }
      .userInfosBox3{
        background: green;
        height: 100px;
      }
    }
  }
  .userInformation2{
    width: 100%;
    p{
      height:22px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(136,136,136,1);
      line-height:22px;
      span{
        display: inline-block;
        width:4px;
        height:18px;
        background:rgba(230,88,49,1);
        transform: translateY(4px);
        margin-right: 10px;
      }
    }
    .userInfos2{
      width: 100%;
      padding: 20px;
      display: flex;
      .userInfosBox,.userInfosBox1{
        flex: 1;
      }
      .userInfosBox4{
        background: red;
        height: 100px;
      }
      .userInfosBox5{
        background: green;
        height: 100px;
      }
    }
    .userInfos2{
      width: 100%;
      padding: 20px;
      display: flex;
      .userInfosBox4,.userInfosBox5{
        flex: 1;
      }
      .userInfosBox4{
        background: red;
        height: 100px;
      }
      .userInfosBox5{
        background: green;
        height: 100px;
      }
    }
  }
  .userInformation3{
    width: 100%;
    padding: 20px;
    p:nth-child(1){
      width: 100%;
      font-size:14px;
      font-family:PingFangSC-Regular;
      color:rgba(32,160,255,1);
      line-height:20px;
      padding: 0 10px;
      line-height:39px;
    }
    p:nth-child(2){
      height: 59px;
      font-size:14px;
      background:rgba(255,247,204,1);
      font-family:PingFangSC-Regular;
      color:rgba(74,74,74,1);
      line-height:59px;
      padding: 0 10px;
    }
  }
</style>


