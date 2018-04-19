<template>
<div id="app">
      <div class="container">
        <p class="closeX" id="closeX" @click="(function(){detailData.isShow=false}())"></p>
        <div class="title_text">
          <div class="list_name">
            分类 :
          </div>
             {{detailData.classifyName}}
        </div>
        <div class="input_title">

          <div class="list_name">
            标题 :
          </div>
          <el-input
            placeholder="请输入内容"
            v-model="title">
          </el-input>
        </div>
        <div class="list_name">
          主图片 :
        </div>

        <a ref="fileBackground" href="javascript:;" class="file" :style="{background:'url('+dataObj.imageUrl+')'}">
          <input type="file" @change="onchangeFile($event)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
        </a>
        <i @click="delImg" class="el-icon-circle-cross imageIcon"></i>
        <vue-editor v-model="content"></vue-editor>
      </div>

          <div class="btn">
              <el-button type="primary" @click="onSubmit(detailData.content)">确定</el-button>
               <button @click="(function(){detailData.isShow=false}())">关闭</button>
         </div>
</div>
</template>
<script>
  import { VueEditor } from 'vue2-editor'
  export default {
    props: ['detailData'],
    components:{VueEditor},
    data() {
      return {
        htmlForEditor: '',
        editorOption:{},
        content: '',
        showModuleName: true,
        // output content from editor
        result: '',
        // set image upload api url
        path: '/api/v1/help/upload/wangEditorH5File',
        title:"",
        objData:{},
        dataObj:{
          id:this.detailData.data.id,
        }
      }
    },
    created(){
      let url=this.$apidomain+"/labelbusinessdetails/findone?id="+this.detailData.data.id;
      this.$http.get(url).then(res=>{
        let data = res.data;
        if(data.code==='0000'&&data.result){
          this.dataObj = data.result;
          this.content= data.result.content;
          this.title=data.result.title
        }
      })
    },
    computed: {

    },
    mounted(){

    },
    methods: {
      delImg(){
        this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dataObj.imageUrl="";
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$refs.fileBackground.style.background="none"
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      submit(){

      },
      onSubmit() {
        let url=this.$apidomain+"/labelbusinessdetails/update";
        this.$http.post(url,{"id":this.dataObj.id,"content":this.content,"imageUrl":this.objData.imageUrl,"title":this.title}).then(res=>{
          let data = res.data;
          if(data.code==='0000'){
            this.$message({
              type: 'success',
              message: '提交成功!'
            });
            this.detailData.isShow=false;
          }else{
            this.$message.error(data.error);
          }
        })
      },
      onchangeFile(event,keyImg){
        let filesObj=event.target.files[0],
         filesName=event.target.files[0].name,
         img=event.target.parentElement,
         url=this.$apiupdate+"/upload/kindeditorjson",
         param = new FormData(); // 创建form对象
        param.append('file',filesObj, filesName);  // 通过append向form对象添加数据
        this.$http.post(url,param,{headers: {'Content-Type': 'multipart/form-data'}}).then(res=>{
          let data=res.data;
          console.log(data);
          if(data.error==0){
            img.style.background= "url("+data.url+") center center no-repeat";
            img.style.backgroundSize= "100% 100%";
            this.objData.imageUrl=data.url;   //参数是ajax返回的图片地址
          }else{
            alert("上传失败")
          }
        });
      },

      focus: function () {
        this.$refs.editor.focus()
      },
      reset:function () {
        var newContent = prompt('please input some html code: ')
        if(newContent){
          this.content = newContent
        }
      },
    }
  }

</script>
<style scoped lang="scss">
@import "../../../assets/styles/alert_style";
@import "../../../assets/styles/commButton";

  .box-card{
    /*width: 580px;*/
   height:200px;
    /*overflow: scroll;*/
  }
  .closeX{
    margin-right:0;
    background:url(../../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
    background-origin: content-box;
  }
  .quill-editor{
    height:400px;
  }
.file {
  margin-bottom:20px;
  position: relative;
  display: inline-block;
  /*float:left;*/
  border: 1px solid #99D3F5;
  border-radius: 4px;
  width:175px;
  padding:0;
  height: 80px;
  overflow: hidden;
  vertical-align: text-top;
  color: #1E88C7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
}
.file input {
  position: absolute;
  font-size: 100px;
  width:100%;
  height: 100%;
  right: 0;
  top: 0;
  opacity: 0;
}
.file:hover {
  background: #AADFFD;
  border-color: #78C3F3;
  color: #004974;
  text-decoration: none;
}
  .input_title{
    margin-bottom:20px;
  }
  .container{
    min-width:900px !important;
  }
.imageIcon{
      position:relative;
     top:-2px;
     cursor: pointer;
    transform:translate(-50%,-50%);
    right:0;
}
</style>
<style>
 .ql-editor > p{
  float:none !important;
 }
 .quillWrapper{
   height:50% !important;
 }
  .toolbar{
    z-index: 99999 !important;
  }
 .vue-html5-editor{
   z-index: 99999 !important;
 }
 .el-message-box__wrapper{
   z-index: 99999 !important;
 }
 .toolbar ul{
   z-index: 99999 !important;
 }
</style>
