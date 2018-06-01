<template>
  <!--退出弹框-->
    <div class="signOutAlter">
      <div id="signOut">
        <div id="signOutBox">
          <p><img @click="cancelClick" src="../../../assets/images/close.png"></p>
          <p>确认退出登录吗？</p>
          <p><button @click="cancelClick">取消</button><button @click="determine">确定</button></p>
        </div>
      </div>
      </div>

</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
          determine(){
             localStorage.removeItem("userInfo","");
             this.$router.push({path:"/login"})
          },
          cancelClick(){
                this.$emit("isClose",false)
          },

        },
        created() {

        }
    }
</script>
<style scoped lang="less">
  signOutAlter{
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
  #signOut{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    bottom: 0;
    right: 0;
    background: black;
    opacity: 0.6;
  }
  #signOutBox{
    width: 80%;
    height: 3.39rem;
    margin: 60% auto;
    background: #ffffff;
    z-index: 1000;
    overflow: hidden;
    border-radius: 0.08rem;
    p:nth-child(1){
      width: 100%;
      height: 0.3rem;
      margin-top: 0.2rem;
      img{
        display: inline-block;
        margin-right: 0.2rem;
        width: 0.3rem;
        height: 0.3rem;
        float: right;
      }
    }
    p:nth-child(2){
      width: 100%;
      height: 1.89rem;
      text-align: center;
      font-size:0.32rem;
      font-family:PingFangSC-Regular;
      color:rgba(57,57,57,1);
      line-height:1.85rem;
    }
    p:nth-child(3){
      width: 100%;
      display: flex;
      button{
        flex: 1;
        border:0;
        height: 1rem;
        font-size:0.36rem;
        font-family:PingFangSC-Regular;
        color:rgba(83,107,210,1);
        border-top: 0.03rem solid #cccccc;
        background: 0;
        border-right:  0.03rem solid #cccccc;
      }
    }
  }
</style>


