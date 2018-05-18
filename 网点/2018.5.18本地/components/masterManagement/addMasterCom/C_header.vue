<template>
  <div>
    <header>
      <span @click="cancel">{{leftName}}</span>
      <span>{{title}}</span>
      <span>{{rightName}}</span>
    </header>
  </div>
</template>
<script>
  export default {
    components: {},
    props: ['title', "leftName", "rightName"],
    data() {
      return {}
    },
    methods: {
      cancel() {
        this.$router.go(-1)
      }
    }

  }
</script>
<style scoped lang="less">
  header {
    position: relative;
    text-align: center;
    padding: .23rem 0;
    border-bottom: .02rem solid #B7B7B7;
    background: #FFFFFF;
    span {
      display: inline-block;
    }
    span:nth-of-type(2) {
      width: 1.44rem;
      height: .5rem;
      font-size: .36rem;
      font-family: PingFangSC-Regular;
      color: rgba(57, 57, 57, 1);
      line-height: .5rem;
      font-weight: 800;
    }
    span:nth-of-type(1), span:nth-of-type(3) {
      width: .6rem;
      height: .42rem;
      font-size: .3rem;
      font-family: PingFangSC-Regular;
      color: rgba(83, 107, 210, 1);
      line-height: .42rem;
      position: absolute;
      left: .42rem;
      top: .31rem;
    }
    span:nth-of-type(3) {
      left: 6.48rem;
    }
  }
</style>



