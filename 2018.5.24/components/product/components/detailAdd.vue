<template>
  <el-card class="box-card" style="width:80px">
      分类:
      <vue-editor v-model="detailForm.content"></vue-editor>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="resetForm('detailForm')">取消</el-button>
      </el-form-item>
  </el-card>
</template>
<script>
  import { VueEditor } from 'vue2-editor'
  export default {
    components:{
      VueEditor
    },
    data() {
      return {
        detailForm:{
          category:'',
          content:'<h1>content<h1>'
        },
        props: {
          value: 'label',
          children: 'cities',
        },
        options2: [
          {
            label: '武汉',
            id:"0101",
            cities: [
              {label: "洪山区",id:"010101"},
              {label: "武昌区",id:"010102"},
              {label: "汉口区",id:"010103"},
              {label: "江夏区",id:"010104"},
              {label: "汉阳区",id:"010105"},
            ]
          }, {
            label: '深圳',
            id:"0102",
            cities: [
              {label: "南山区",id:"010201"},
              {label: "罗湖区",id:"010202"},
              {label: "宝安区",id:"010203"},
              {label: "龙华区",id:"010204"}
            ]
          }
        ],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    methods: {
      onSubmit() {
        this.$emit('cancelEdit', false)
      },
      resetForm(name) {
        this.detailForm = {}
        this.detailForm.content = '<h1>content<h1>'
        this.$emit('closeReset', false)
      }
    }
  }
</script>
<style scoped lang="scss">
  /*.box-card{*/
    /*width: 480px;*/
    /*height:600px;*/
    /*overflow: scroll;*/
  /*}*/
</style>
