<template>
  <el-card class="box-card">
    <div>新增分类</div>

  <el-form ref="form" :model="form" label-width="80px">

    <el-form-item label="项目名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="上级分类">家电维修-冰箱</el-form-item>
    <el-form-item label="末级分类">是</el-form-item>
    <el-form-item label="末级多选">
      <el-radio-group v-model="form.resource">
        <el-radio label="true">是</el-radio>
        <el-radio label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动形式">
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        :closable="true"
        :close-transition="false"
        @close="handleClose(tag)"
      >
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else style="background:#20a0ff;color:#fff;display: block;"  size="small" @click="showInput">+新增标签</el-button>
    </el-form-item>
    <el-form-item class="btn_bottom">
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="cancelDialog('materialEdit')">取消</el-button>
    </el-form-item>
  </el-form>
  </el-card>
</template>
<script>

  export default {
    props: ['categoryData'],
    data() {
      return {
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        form: {
          name: '',
          resource: '',
        }
      }
    },

    methods: {
      onSubmit() {
      let firstClass=this.dynamicTags.join(",");     //上级分类
      let boole=this.form.resource;
      let name=this.form.name

      },




      cancelDialog (name) {
        this.categoryData.isShow=false;
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>
<style scoped lang="scss">
  .box-card{
    width: 30%;
    height:600px;
    overflow: scroll;
    margin: 0 auto;
    transform:translateY(30%);
  }
  .btn_bottom{
    margin-left:0;
    position:relative;
    bottom:-50px;
  }
</style>
