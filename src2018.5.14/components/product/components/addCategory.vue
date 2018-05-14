<template>
  <el-card class="box-card">
    <div>新增分类</div>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="项目名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="上级分类">
      {{name}}
      <!--<el-select v-model="value" placeholder="请选择" @change="prevClassName">-->
        <!--<el-option style="z-index: 9999"-->
          <!--v-for="item in options"-->
          <!--:key="item.id"-->
          <!--:label="item.value"-->
          <!--:value="item.id">-->
        <!--</el-option>-->
      <!--</el-select>-->
    </el-form-item>
    <el-form-item label="末级分类">
      <el-radio-group v-model="form.last">
        <el-radio label="true">是</el-radio>
        <el-radio label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
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
    props: ['categoryData','quiry'],
    data() {
      return {
        options: [
          {
          value: '选项1',
          id: '0'
        }, {
          value: '选项2',
          id: '1'
        }, {
          value: '选项3',
          id: '2'
        }, {
          value: '选项4',
          id: '3'
        }, {
          value: '选项5',
          id: '4'
        }
        ],
        value: '',
        name:"家电维修",
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        prevClassNameId:'',
        form: {
          name: '',
          resource: '',
          last:""
        },
        selectorBehindObj:{

        }
      }
    },
    created(){
      this.selectorBehindObj.id = this.categoryData.params.id;
      this.form = this.categoryData.params;
    },
    methods: {
      onSubmit() {

        let url=this.$apidomain+"/labelbusiness/save";
        this.$http.post(url,this.selectorBehindObj).then(res=>{
          let data = res.data;
          this.$notify({
            title: '成功',
            message: '新建成功',
            type: 'success'});
          this.quiry();
          this.isAdd.isShow=false
        })
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
      },
      prevClassName(v){
        this.prevClassNameId=v;
      },
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
<style>
  .el-select-dropdown{
    z-index:9999 !important;
  }
</style>
