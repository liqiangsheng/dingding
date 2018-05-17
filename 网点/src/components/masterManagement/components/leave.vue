<template>
  <!--请假-->
  <div id="leave_box">
    <p>此功能暂未开放，敬请期待。。。</p>
    <img src="/static/images/wait.png">
  </div>
</template>
<script>
    export default {
      data() {
        return {
          searchData:"", //搜素内容
        }
      },
      methods: {


      }

    }

</script>
<style scoped lang="less">
  #leave_box{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top:1.96rem;
    background:rgba(241,241,241,1);
    overflow-y: auto;
    img{
      width: 1.26rem;
      height: 1.26rem;
      display: inline-block;
      margin: 45% 45%;
    }

  }

</style>


