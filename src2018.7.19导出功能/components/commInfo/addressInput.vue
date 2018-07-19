<template>
    <div class="address_box">
      <el-input style="width:230px;" v-model.trim="data.value" @change="getList(data)" @blur="getCode"></el-input>
    </div>
</template>
<script>
    export default {
        props:["data"],
        data() {
            return {
              dataList:"",
            }
        },
        methods: {
          getList(e){

          }
        },
        created() {

        }
    }
</script>
<style scoped lang="scss">
  .address_box{
    position:relative;
    display: inline-block;
  }
.data_list_container{
    overflow: auto;
    max-height:200px;
    width:230px;
    border-radius: 4px;
    background:#fff;
    border:1px solid #ccc;
    z-index: 9999999;
    position:absolute;
  >li{
    height:6em;
  }
}
</style>


