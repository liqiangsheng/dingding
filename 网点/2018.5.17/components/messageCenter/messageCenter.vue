<template>
  <!--消息中心-->
    <div id="messageCenter">
         <div class="messageCenterBox">
           <!--<div class="messageCenterBox" v-for="(item,index) in messageCenterList">-->
             <p><span>2018-05-10 14:58:04</span></p>
             <p>亲爱的XXXX网点，2018-05-10 15:00:00 有新的工单派发给您，请您及时为工单分配师傅，为用户提供优质的上门服务，如有问题，请咨询客服电话4009991891, 祝您生活愉快。</p>
         </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              messageCenterList:[],
            }
        },
        methods: {},
        created() {

        }
    }
</script>
<style scoped lang="less">
#messageCenter{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right:0;
  overflow-y: auto;
  background:rgba(241,241,241,1);
}
  .messageCenterBox{
    width: 100%;
    padding: 0.42rem;
    background: #ffffff;
    margin-top: 0.16rem;
    p:nth-child(1){
      width: 100%;
      height: 0.4rem;
      margin-bottom: 0.2rem;
      span{
        float: right;
        text-align: right;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        color:rgba(83,107,210,1);
        line-height:0.4rem;
      }
    }
    p:nth-child(2){
      width: 100%;
      font-size:0.32rem;
      font-family:PingFangSC-Regular;
      color:rgba(57,57,57,1);
      line-height:0.48rem;
    }
  }
</style>


