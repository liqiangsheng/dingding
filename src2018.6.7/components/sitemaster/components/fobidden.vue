<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="特殊资源">
      <el-radio-group v-model="form.resource">
        <el-radio label="师傅违规操作"></el-radio>
        <el-radio label="师傅认证信息不全"></el-radio>
        <el-radio label="其他"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动形式">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default{
    data(){
      return{
        form:{
          resource:'',
          desc:''
        }
      }
    },
    methods:{
      onSubmit(){

      },
      close () {
        this.$emit('closeReset', false)
      }
    }
  }
</script>
<style>

</style>
