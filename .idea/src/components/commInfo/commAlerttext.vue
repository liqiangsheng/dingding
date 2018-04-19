<template>
  <div id="app">
    <el-dialog style="z-index:999999"  :visible.sync="data.isShow" size="tiny">
      <h3>{{data.title}}</h3>
      <textarea class="alert_forbidden_area" v-model="textareaContent" placeholder="输入标签名以英文逗号分隔...">
        </textarea>
      <el-button
        style="position:relative;left:50%;transform:translateX(-50%);width:180px"  @click="masterImposeOperate(data,textareaContent)" type="primary">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props:["data","query"],
    data() {
      return {
        "textareaContent":this.data.text,
      }
    },
    methods: {
      masterImposeOperate(item,textareaContent){
        if(textareaContent){
          let params=this.data.params;
              params["tags"]=textareaContent;
              this.data.subMit(params);
        }else{
          this.$queryFun.successAlert.call(this,"请输入文本内容","0");
        }
      }
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
    font-size: 14px;
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




