<template>
    <div>
      <el-select v-model="Value" :placeholder="placeholder||'请选择'" >
        <el-option
        v-for="(item,index) in messageList"
        :key="item.id"
        :label="item.name"
        :value="item.id">
        </el-option>
      </el-select>
    </div>
</template>
<script>
    export default {
        props:["messageList","placeholder","value"],
        data() {
            return {
              Value:"",
            }
        },
        methods: {

        },
        computed:{

        },
      watch:{
          "Value":function(l){
             for(let i=0; i<this.messageList.length; i++){
               if(this.messageList[i].id===l){
                 return this.$emit("selectorData",this.messageList[i]);
               }
             }
          },
      },
        created() {
          if(!!this.value){
            this.Value=this.value
          }
        }
    }
</script>
<style scoped lang="scss">

</style>


