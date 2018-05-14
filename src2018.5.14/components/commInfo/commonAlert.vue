<template>
  <div id="app">
    <el-dialog style="z-index:999999"  :visible.sync="data.isShow" size="min" id="commonAlert_001">
      <h3>{{data.title}}</h3>
      <!--<textarea class="alert_forbidden_area" v-model="text" placeholder="输入其他原因">-->
        <!--</textarea>-->
      <el-input
        style="margin-bottom:10px;margin-top:20px;"
        type="textarea"
        :rows="5"
        placeholder="请在此输入驳回原因"
        v-model="text">
      </el-input>
      <el-button
        style="position:relative;left:50%;transform:translateX(-50%);width:180px;"  @click="sendData(text)" type="primary">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props:["data","sendData"],
    data() {
      return {
        text:""
      }
    },
    methods: {

    },
    created() {
    }
  }
</script>
<style scoped lang="scss">
  #app{
    position:relative;

  }
  h3{
    font-weight: normal;
    position:absolute;
    font-size: 18px;
    left:50%;
    top:15px;
    transform: translateX(-50%);
    text-align: center;
  }
  .alert_forbidden_area{
    width:100%;
    height:200px;
    border:1px solid #ccc;
  }


</style>

<style lang="scss">
  #commonAlert_001{
    .el-dialog__body{
      padding-top:0;
    }
  }
</style>

