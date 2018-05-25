<template>
    <div id="app">
      <el-dialog style="z-index:999999"  :visible.sync="data.isShow" size="tiny">
        <h3>{{data.title}}</h3>
        <textarea class="alert_forbidden_area" v-model="textareaContent" placeholder="输入其他原因">
        </textarea>
        <el-button
          style="position:relative;left:50%;transform:translateX(-50%);width:180px"  @click="masterImposeOperate(data,textareaContent)" type="primary">确定</el-button>
      </el-dialog>
    </div>
</template>
<script>
    export default {
      props:["data","getTableList"],
        data() {
            return {
              textareaContent:""
            }
        },
        methods: {
          masterImposeOperate(item,textareaContent){
            if(textareaContent){
                    let url=`${this.$apidomain}/${this.data.url}`,
                        o=item.params;
                        o["remark"]=textareaContent;
              this.$http.post(url,o).then(r=>{
                      let data=r.data;
                      if(data.code==='0000'){
                        this.$message({
                          message: '禁用成功',
                          type: 'success'
                        });
                       this.data.params={};
                        this.textareaContent='';
                        this.getTableList();
                        item.isShow=false;
                      }else{
                        this.$message.error(data.error);
                      }
                    })
                  }else{
                    this.$message({
                      message: '请填写备注',
                      type: 'warning'
                    });
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


