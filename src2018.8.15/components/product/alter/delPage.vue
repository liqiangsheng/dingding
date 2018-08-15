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
          <li><img src="/static/images/warn.png" alt="确定删除该配件吗？"><span>确定删除该配件吗？</span></li>
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
    width: 390px;
    height: 202px;
    background-color: #fff;
    position: absolute;
    left: 40%;
    top:30%;
    z-index:2008;
    border-radius:8px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .el-message-box__title{
    padding-top:20px;
    width: 100%;
    position: relative;
    i{
      display: inline-block;
      position: absolute;
      right: 20px;
      top:20px;
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
      line-height:16px;
      text-indent: 20px;
    }
  }
  .centent{
    padding: 30px 20px 0 20px;
    li{
      width: 100%;
      height: 40px;
      img{
        display: inline-block;
        width: 40px;
        height: 40px;
        transform: translateY(12px);
      }
      span{
        display: inline-block;
        height: 40px;
        line-height: 40px;
        margin-left: 14px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(71,86,105,1);
      }
    }

  }
  .li{
    width: 100%;
    position: absolute;
    bottom: 15px;
    right: 20px;
    text-align: right;
    .el-button{
      width: 64px;
    }
  }
</style>








