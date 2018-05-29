<template>
    <div>
     <el-dialog style="z-index:999999"   :visible.sync="dialogTableVisible.isShow" size="tiny">
      <ul class="alert_forbidden_text">
        <li v-for="(item,index) in alertForbiddenList" :key="index" @click="selectorForbidden(item,index)">
          {{item.name}} <span v-show="item.selector!='0'"></span>
        </li>
      </ul>
      <textarea class="alert_forbidden_area" v-model="textareaContent">
        </textarea>
      <el-button class="confirm_btn" @click="confirmForbidden(alertForbiddenList,textareaContent)" type="primary">确定</el-button>
      </el-dialog>
    </div>
</template>
<script>
    export default {
      props:["confirmForbidden","dialogTableVisible"],
        data() {
            return {
              alertForbiddenList:this.$store.state.alertForbiddenList,
              textareaContent:"",
            }
        },
      watch:{
        "dialogTableVisible.isShow":function(g,f){
         this.alertForbiddenList.forEach((v,i)=>{
           this.alertForbiddenList[i].selector="0"
         })
        }
      },
        methods: {
          selectorForbidden(item,index){
            this.alertForbiddenList.forEach((v)=>{
              v.selector=false;
            });
            item.selector=!item.selector;
          },
        },
        created() {

        }
    }
</script>
<style scoped lang="scss">
  .alert_forbidden_text{
    list-style: none;
    >li{
      line-height: 3em;
      border-top:1px solid rgba(0,0,0,.1);
    }
    >li:first-of-type{
      border:none;
    }
    span{
      width:10px;
      /*float:right;*/
      margin-left:20px;
      height:10px;
      display: inline-block;
      background:green;
      border-radius: 50%;
    }
  }
  .alert_forbidden_area{
    width:100%;
    height:60px;
    border:1px solid #c0c0c0;
  }
</style>


