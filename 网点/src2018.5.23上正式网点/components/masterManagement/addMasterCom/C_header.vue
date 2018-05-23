<template>
  <div>
    <header>
      <span class="left" v-if="left_number==1" @click="addMaster">取消</span>    <!--新建取消-->
      <!--<span class="left" v-if="left_number==2" @click="cancel">取消</span>        &lt;!&ndash;修改服务工种取消&ndash;&gt;-->
      <!--<span class="left" v-if="left_number==5" @click="cancel">取消</span>        &lt;!&ndash;修改服务区域取消&ndash;&gt;-->
      <!--<span class="left" v-if="left_number==3" @click="left_number_one">取消</span>  &lt;!&ndash;新建服务工种取消&ndash;&gt;-->
      <!--<span class="left" v-if="left_number==4" @click="left_number_two">取消</span>  &lt;!&ndash;新建服务工种取消&ndash;&gt;-->
      <span class="center">{{title}}</span>
      <span class="right" v-if="right_number==1" @click="right_number_one">完成</span>    <!--新建服务工种完成-->
      <span class="right" v-if="right_number==2" @click="right_number_two">完成</span>    <!--新建服务区域完成-->
      <span class="right" v-if="right_number==3" @click="right_number_three">保存</span>   <!--编辑详情保存-->
      <span class="right" v-if="right_number==4" @click="right_number_four">保存</span>   <!--修改服务工种完成-->


    </header>
  </div>
</template>
<script>
  export default {
    components: {},
    props: ['title', "left_number", "right_number", 'reset', 'submit', 'addReset', 'addResetArea', 'editResetWorker'],
    data() {
      return {}
    },
    methods: {
      left_number_one() {
        this.addReset();
      },
      left_number_two() {
        this.addResetArea()
      },
      addMaster() {
        let isBool = true;
        this.$emit('isClose', isBool)
        // this.goBack();
      },
      cancel() {
        // let isBool = true;
        // this.$emit('isClose', isBool)
        this.editResetWorker();
//        this.$router.go(-1);
      },
      right_number_one() {
        this.addReset();
      },
      right_number_two() {
        this.addResetArea();
      },
      right_number_three() {

        this.submit();
      },
      right_number_four() {
        this.editResetWorker()
      }
    }

  }
</script>
<style scoped lang="less">
  header {
    position: fixed;
    text-align: center;
    padding: .23rem 0;
    height: .9rem;
    width: 100%;
    border-bottom: .02rem solid #B7B7B7;
    background: #FFFFFF;
    z-index: 12000;
    margin-bottom: 1rem;
    span {
      display: inline-block;
      position: absolute;
    }
    .center {
      width: 1.44rem;
      height: .5rem;
      font-size: .36rem;
      left: 3rem;
      font-family: PingFangSC-Regular;
      color: rgba(57, 57, 57, 1);
      line-height: .5rem;
      font-weight: 800;
    }
    .left, .right {
      width: .6rem;
      height: .42rem;
      font-size: .3rem;
      font-family: PingFangSC-Regular;
      color: rgba(83, 107, 210, 1);
      line-height: .42rem;
      left: .42rem;
      top: .31rem;
    }
    .right {
      left: 6.48rem;
    }
  }
</style>



