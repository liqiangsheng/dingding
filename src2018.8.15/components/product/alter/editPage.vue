<template>
  <div>
      <div class="addAlert"><!--背阴-->
      </div>
      <div class="addAlert_box" >
          <div class="el-message-box__title">
              <span>{{editData.title}}</span>
            <i @click="close"></i>
          </div>
        <ul class="centent">
          <li><span class="name">配件编号</span><span class="value">{{}}</span><span class="name nameMargin">产品名称</span><span class="value">{{}}</span></li>
          <li><span class="name">配件名称</span><span class="value">{{}}</span><span class="name nameMargin">服务费类型</span><span class="value">{{}}</span></li>
          <li><span class="name">商品编号</span><span class="value">{{}}</span></li>
          <li id="el-input__inner1"><span class="name">配件费用</span><el-input min=0 style="width: 100px;margin: 0 12px 0 17px;text-align: right" type="number" v-model="priceNum"></el-input><span>元</span></li>
        </ul>

        <div class="li">
          <el-button @click="quxiao">取消</el-button>
          <el-button type="primary" @click="yes">确定</el-button>
        </div>
      </div>
  </div>

</template>
<script>

  export default {
    props:["editData"],
    components:{
    },
    data() {
      return {
        priceNum:0, //编辑修改价格
       }

    },
    methods: {



      close(){ //传值给父级
        this.$emit("isClose",false)
      },
      quxiao(){ //取消
        this. close();
      },
      yes(){ //确定

      },

      quiry(){ //数据传递

      },

    },


    mounted() {
    },
    created(){
       this.stateType()
    }
  }
</script>
<style>
 #el-input__inner1 .el-input__inner{
    text-align: right;
    padding: 0;
  }
</style>
<style scoped lang="scss">

  .addAlert{
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
  .addAlert_box{
    width: 600px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    left: 30%;
    top:25%;
    z-index:2008;
    border-radius:8px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .el-message-box__title{
    width: 100%;
    height:48px;
    position: relative;
    border-bottom:2px solid #D7D7D7;
    i{
      display: inline-block;
      position: absolute;
      right: 10px;
      top:10px;
      width: 15px;
      height: 15px;
      cursor: pointer;
     background: url(../../../../static/images/pruductclose.png) no-repeat center;
    }
    i:hover{
      cursor: pointer;
      background: url(../../../../static/images/pruduct1close.png) no-repeat center;
    }
    span{
      width: 100%;
      display: inline-block;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:42px;
      text-align: center;
    }
  }
  .centent{
    padding: 14px 0px 0 62px;
    li{
      margin-bottom: 13px;
      .name{
        display: inline-block;
        font-size:13px;
        width: 65px;
        font-family:PingFangSC-Regular;
        color:rgba(94,109,130,1);
        text-align: right;
        line-height:30px;
      }
      .value{
        display: inline-block;
        font-size:13px;
        margin-left: 14px;
        font-family:PingFangSC-Regular;
        color:rgba(51,51,51,1);
        line-height:30px;
      }
      .nameMargin{
        margin-left: 100px;
      }



    }

  }
  .li{
    width: 100%;
    position: absolute;
    bottom: 20px;
    left: 0;
    text-align: center;
    .el-button{
      width: 200px;
    }
  }
</style>








