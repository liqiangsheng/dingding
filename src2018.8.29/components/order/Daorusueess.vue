<template>
  <!--订单支付Work order submission-->
  <div>
    <div class="creditIsRunningLow"><!--背阴-->
    </div>
    <div class="creditIsRunningLow_box">
      <div class="el-message-box__title">
        <span>导入工单</span>
        <i class="el-message-box__close el-icon-close" @click="close"></i>
      </div>
      <div class="center">
        <p><img src="/static/images/tanchuangOK.png"></p>
        <p>恭喜您，工单提交成功</p>
      </div>
      <div class="footer">
        <p>
          <el-button type="primary" @click="allClick">查看所有工单</el-button>
          <!--<el-button @click="nextClick">继续下单</el-button>-->
        </p>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        tabPathList:this.$store.state.tabPathList,
      }
    },
    methods: {
      close() { //传值给父级
        this.$emit("isClose", false)
        this.$emit("isEmty","")
      },
      allClick() { //查看所有工单
//        this.$router.push({path: "/order/list5"})
        let obj1={name: "新建工单", path: "/order/list0"}
        this.$store.commit("spliceTabByPath",obj1.path)
        let obj={name: "全部工单", path: "/order/list5"}
        this.$router.push({path: "/order/list5"});
        if(this.tabPathList.length>7){
//              this.tabPathList.splice(0,1);
          this.$store.commit("spliceTabPathList",0)
        }
        let isAddPath=true, o={};
        this.tabPathList.forEach(v=>{
          if(obj.path===v.path){
//                this.$store.commit("spliceTabByPath",path)
            isAddPath=false;
          }
        });
        if(isAddPath){
          o.name=obj.name;
          o.path=obj.path;
//                  this.tabPathList.push(o)
          this.$store.commit("pushTabPathList",o)
        }
        this.close();
      },
      nextClick() {//继续下单
        this.close();
      },

    },
    mounted() {
    },
    created() {


    },

  }
</script>

<style scoped lang="scss">
  .creditIsRunningLow {
    width: 100%;
    background: black;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2007;
    opacity: 0.2;
  }

  .creditIsRunningLow_box {
    width: 50%;
    height: 70%;
    background-color: #fff;
    position: absolute;
    left: 25%;
    top: 16%;
    z-index: 2008;
    border-radius: 3px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }

  .el-message-box__title {
    width: 100%;
    height: 7%;
    position: relative;
    background: rgba(243, 243, 243, 1);
    .el-message-box__close {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    span {
      width: 100%;
      display: inline-block;
      height: 14px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      color: rgba(94, 109, 130, 1);
      line-height: 46px;
      text-align: center;
    }
  }

  .center {
    width: 100%;
    padding: 10%;
    height: 40%;
    p {
      width: 100%;
      text-align: center;
    }
    p:nth-child(2) {
      font-size: 20px;
      height: 80px;
      font-family: PingFangSC-Regular;
      color: rgba(230, 88, 49, 1);
      line-height: 80px;
    }

  }

  .footer {
    width: 100%;
    height: 60%;
    padding: 0 10%;
    p:nth-child(1) {
      width: 100%;
      height: 25px;
      font-size: 18px;
      font-family: PingFangSC-Regular;
      color: rgba(94, 109, 130, 1);
      line-height: 25px;
      text-align: center;
      .el-button {
        width: 30%;
      }
    }
  }

</style>








