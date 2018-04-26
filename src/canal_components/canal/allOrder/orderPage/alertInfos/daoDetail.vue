<template>
  <!--订单支付Work order submission-->
  <div>
    <div class="creditIsRunningLow"><!--背阴-->
      </div>
      <div class="creditIsRunningLow_box">
          <div class="el-message-box__title">
            <i class="el-message-box__close el-icon-close" @click="close"></i>
        </div>
        <p class="center">
            确定删除吗？
        </p>
        <div class="footer">
               <p><el-button @click="NOClick">取消删除</el-button><el-button type="primary" @click="OKClick">确定删除</el-button></p>

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
    methods: {
      close(){ //传值给父级
        this.$emit("isClose",false)
      },
      NOClick(){ // 取消删除
        this.$emit("isClose",false)
      },
      OKClick(){//确定删除

      },

    },
    mounted() {
    },
    created(){


    },

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
    width: 20%;
    height: 15%;
    background-color: #fff;
    position: absolute;
    left: 45%;
    top:46%;
    z-index:2008;
    border-radius: 3px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .el-message-box__title{
    width: 100%;
    height:20%;
    position: relative;
    background:rgba(243,243,243,1);
    .el-message-box__close{
      position: absolute;
      right: 10px;
      top:10px;
    }
  }
  .center{
    width: 100%;
    height: 50%;
    text-align: center;
    line-height: 80px;
  }
  .footer{
    width: 100%;
    height: 30%;
    p:nth-child(1){
      width:100%;
      font-size:18px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:25px;
      text-align: center;
      .el-button{
        width: 40%;
    }
    }
  }

</style>








