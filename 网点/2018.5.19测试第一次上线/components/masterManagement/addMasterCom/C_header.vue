<template>
  <div>
    <header>
      <span v-if="left_number==1" @click="addMaster">取消</span>
      <span v-if="left_number==2" @click="cancel">取消</span>
      <span>{{title}}</span>
      <span v-if="right_number==1" @click="right_number_one">完成</span>
      <span v-if="right_number==2" @click="right_number_two">完成</span>
      <span v-if="right_number==3" @click="right_number_three">保存</span>
    </header>
  </div>
</template>
<script>
  export default {
    components: {},
    props: ['title', "left_number", "right_number", 'reset', 'submit'],
    data() {
      return {}
    },
    methods: {
      addMaster() {
        let isBool = true;
        this.$emit('isClose', isBool)
        // this.goBack();
      },
      cancel() {
        let isBool = true;
        this.$emit('isClose', isBool)
      },
      right_number_one() {
        this.reset();
      },
      right_number_two() {
        this.reset();
      },
      right_number_three() {

        this.submit();
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



