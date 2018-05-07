<template>
  <!--订单支付Work order submission-->
  <div>
    <div class="creditIsRunningLow"><!--背阴-->
      </div>
      <div class="creditIsRunningLow_box">
          <div class="el-message-box__title">
            <span>导入产品</span>
            <i class="el-message-box__close el-icon-close" @click="close"></i>
        </div>
        <ul class="header">
             <li>文件名</li>
              <li>大小</li>
              <li>状态</li>
        </ul>
        <ul class="center">
          <li>{{valueObj.name}}</li>
          <li>{{valueObj.size}}</li>
          <li>{{valueObj.state}}</li>
        </ul>
        <div class="progress">
          <el-progress :text-inside="true" :stroke-width="24" :percentage="num"></el-progress>
        </div>
        <div class="footer">
               <p><el-button type="primary" @click="OKClick">完成</el-button></p>
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
             num:0,
             valueObj:{
               name:"",
               size:"",
               state:"上传中...",
             }
       }
    },
    methods: {
      close(){ //传值给父级
        this.$emit("isClose",false)
      },
      OKClick(){ //查看完成
        if(this.valueObj.state == "已完成"){
          this.$emit("centerShow",true);
          this.$emit("isClose",false)
        }else{
         return alert("上传中,请等待...");
        }

      },

    },
    mounted() {
    },
    created(){
      setTimeout(()=>{
        this.num = 100;
        this.valueObj.state = "已完成";
      },3000)

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
    width: 50%;
    height: 70%;
    background-color: #fff;
    position: absolute;
    left: 25%;
    top:16%;
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
      line-height:46px;
      text-align: center;
    }
  }
  .header{
    width:100%;
    height: 10%;
    display: flex;
    align-items:center;
    li{
      flex: 1;
      text-align: center;

    }

  }
  .center{
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    li{
      text-align: center;
      flex: 1;
    }


  }
  .footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 20%;
    p:nth-child(1){
      width:100%;
      height:25px;
      font-size:18px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:25px;
      text-align: center;
      .el-button{
        width: 30%;
      }
    }
  }

</style>








