<template>
    <div style="display: inline-block">
      <div v-for="(item,index) in images" class="files_image_box" >
        <div class="files_cover">
          <i class="el-icon-delete2 files_del_icon cursor" @click="delFilesImage(item,index)"></i>
        </div>
        <div class="images_background" :style="{backgroundImage:'url('+item.url+')'}"></div>
      </div>
      <a href="javascript:;" class="file">
        上传凭证
        <input  type="file" style="z-index: 9999" @change="onchangeFile" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" >
      </a>
    </div>
</template>
<script>
    export default {
      props:["images","delFilesImage","onchangeFile"],
        data() {
            return {

            }
        },
        methods: {},
        created() {

        }
    }
</script>
<style scoped lang="scss">
  .files_del_icon{
    display: none;
  }
  .files_image_box{
    display: inline-block;
    position: relative;
    height:140px;
    margin-right:1em;
    width:280px;
    >.files_cover{
      position:absolute;
      width:100%;
      height: 100%;
      &:hover{
        z-index: 999999;
        animation: rgba .8s ease;
        animation-fill-mode:forwards;
        .files_del_icon{
          position:absolute;
          display: block;
          top:50%;
          left:50%;

          transform:translate(-50%,-50%);

          font-size: 35px;
          color:#fff;
        }
      }
    }
    .images_background{
      background-size:100% 100%;
      width:100%;
      height:100%;
    }
  }
  .file {
    position:relative;
    display: inline-block;
    border: 1px solid #97A3AA;
    border-radius: 4px;
    padding: 4px 12px;
    width:280px;
    height: 140px;
    line-height: 13em;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    background:#EEEEEE;
    text-indent: 0;
    font-size:16px;
    font-family:PingFangSC-Regular;
    color:rgba(136,136,136,1);
    text-align: center;
    input {
      position: absolute;
      font-size: 100px;
      width: 100%;
      height: 100%;
      right: 0;
      top: 0;
      opacity: 0;
    }
    &::after{
      content:"";
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-75%);
      background:url(../../assets/images/upload.png) center center no-repeat;
      background-size:100% 100%;
      width: 53px;
      height: 53px;
    }
   &:hover {
      background: #dedede;
      text-decoration: none;
    }
  }
  @keyframes rgba {
    0%{
      background:rgba(0,0,0,0);
    }
    100%{
      background:rgba(0,0,0,0.3);
    }

  }
</style>


