<template>
    <div id="app">
      <el-dialog style="z-index:999999"  :visible.sync="addRemarksObj.isShow" size="tiny">
        <h3>{{addRemarksObj.title}}</h3>
        <textarea class="alert_forbidden_area" v-model="textareaContent" placeholder="输入其他原因">
        </textarea>
        <el-button
          style="position:relative;left:50%;transform:translateX(-50%);width:180px"  @click="masterImposeOperate(addRemarksObj,textareaContent)" type="primary">确定</el-button>
      </el-dialog>
    </div>
</template>
<script>
    export default {
      props:["addRemarksObj"],
        data() {
            return {
              "textareaContent":""
            }
        },
        methods: {
          masterImposeOperate(item,textareaContent){
            if(textareaContent){
                    let url=`${this.$apidomain}/order/addremark`;
                    this.$http.post(url,{"remark":textareaContent,"orderId":item.orderId}).then(r=>{
                      let data=r.data;
                      if(data.code==='0000'){
                        item.isShow=false;
                      }else{
                        alert(data.error);
                      }
                    })
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


