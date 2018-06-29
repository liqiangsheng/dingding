<!--<template>-->
<!--<div>-->
<!--<script :id="randomId"  type="text/plain"  style="width: 100%;height: 400px;">-->

<!--</script>-->

<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import '../../../../static/UE/ueditor.config.js'-->
<!--import '../../../../static/UE/ueditor.all.min.js'-->
<!--import '../../../../static/UE/lang/zh-cn/zh-cn.js'-->
<!--export default {-->
<!--props: {-->
<!--//配置可以传递进来-->
<!--ueditorConfig:{}-->
<!--},-->
<!--data() {-->
<!--return {-->
<!--//每个编辑器生成不同的id,以防止冲突-->
<!--randomId: 'editor_' + (Math.random() * 100000000000000000),-->
<!--//编辑器实例-->
<!--instance: null,-->
<!--}-->
<!--},-->
<!--mounted() {-->
<!--this.initEditor()-->
<!--},-->
<!--beforeDestroy () {-->
<!--// 组件销毁的时候，要销毁 UEditor 实例-->
<!--if (this.instance !== null && this.instance.destroy) {-->
<!--this.instance.destroy();-->
<!--}-->
<!--},-->
<!--methods:{-->
<!--initEditor () {-->
<!--//dom元素已经挂载上去了-->
<!--this.$nextTick(() => {-->
<!--this.instance = UE.getEditor(this.randomId, this.ueditorConfig);-->
<!--// 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去-->
<!--this.instance.addListener('ready', () => {-->
<!--this.$emit('ready', this.instance);-->
<!--});-->
<!--});-->
<!--}-->
<!--},-->
<!--}-->
<!--</script>-->
<!--<style>-->
<!--</style>-->

<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>

<script>
  import '../../../../static/ueditor/ueditor.config.js'
  import '../../../../static/ueditor/ueditor.all.js'
  import '../../../../static/ueditor/lang/zh-cn/zh-cn.js'

  export default {
    name: "UEditor",
    props: {
      id: {
        type: String
      },
      config: {
        type: Object
      }
    },
    data() {
      return {
        editor: null
      }
    },
    mounted() {
      //初始化UE
      const _this = this;
      this.editor = UE.delEditor("editor");
      this.editor = UE.getEditor('editor', this.config);
    },
    destoryed() {
      this.editor.destory();
    },
    methods:{
      getUEContent: function () {
        return this.editor.getContent();
      },
      getContentTxt: function () {

        return this.editor.getContentTxt();
      }
    }
  }
</script>

