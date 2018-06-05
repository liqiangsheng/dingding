<template>
  <el-card class="box-card">
    <el-form ref="categoryAddForm" :model="categoryAddForm" label-width="80px">
      <el-form-item label="类目名称">
        <el-input v-model="categoryAddForm.categoryName"></el-input>
      </el-form-item>
      <el-form-item label="上级分类">
        <el-select v-model="categoryAddForm.firstCategory" placeholder="一级分类">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="末级分类">
        <el-radio-group v-model="categoryAddForm.lastCategory">
          <el-radio label="true">是</el-radio>
          <el-radio label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="末级多选">
        <el-radio-group v-model="categoryAddForm.multipleChoose">
          <el-radio label="true">是</el-radio>
          <el-radio label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="服务区域">
        <el-select v-model="categoryAddForm.serviceRegion" placeholder="请选择服务区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="resetForm('categoryAddForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>
<script>
  export default {
    data() {
      return {
        categoryAddForm:{
          categoryName:'',
          firstCategory:'',
          lastCategory:'',
          multipleChoose:'',
          serviceRegion:''
        }
      }
    },
    methods: {
      onSubmit() {

      },
      resetForm (name) {
        this.categoryAddForm = {}
        this.$emit('closeReset', false)

      }
    }
  }
</script>
<style scoped lang="scss">
  .box-card{
    width: 480px;
    height:600px;
    overflow: scroll;
  }
</style>
