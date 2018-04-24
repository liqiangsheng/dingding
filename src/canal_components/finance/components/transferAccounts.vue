<template>
    <div id="app">
      <section class="text">
          <p>
            请打款至以下账户，打款成功获保留截图，并上传提交，待财务审核通过后，即可充值成功，如有疑问， 请致电客服：400-999-1891
          </p>
          <div class="content">
            <p>
              首款方户名：深圳叮叮科技有限公司
            </p>
            <p>
              收款方开户行：中国建设银行股份有限公司深圳高新园支行
            </p>
            <p>
              收款方账号：4425 0100 0048 0000 1047
            </p>

          </div>
      </section>
      <section class="files">
        <img height="140px;" width="280px" style="margin-right:10px;" v-for="(item,index) in images" :src="item.url" alt="">
        <a href="javascript:;" class="file">
          上传凭证
          <input type="file" @change="onchangeFile" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" >
        </a>
      </section>
      <section class="submit">
        <el-button type="primary" style="margin:0 auto;"> 确认提交</el-button>
      </section>

    </div>
</template>
<script>
    export default {
        data() {
            return {
              dataObj:{},
              selectorBehindObj:{},
              images:[],
            }
        },
        methods: {
          onchangeFile(event){
            let filesObj=event.target.files[0];

            let filesName=event.target.files[0].name;

            let url=this.$apiupdate+"/upload/kindeditorjson";

            let param = new FormData(); // 创建form对象

            param.append('file',filesObj, filesName);  // 通过append向form对象添加数据

            this.$http.post(url,param,{headers: {'Content-Type': 'multipart/form-data'}}).then(res=>{
              let data=res.data;
              if(data.error===0){
                this.images.push(data);   //参数是ajax返回的图片地址

              }else{

                alert("上传失败");
              }

            });
          },
        },
        created() {

        }
      ,
      watch:{

      }
    }
</script>
<style scoped lang="scss">
  p,div,span{
    font-family:PingFangSC-Regular;
  }
  #app{
    .text{
      margin-bottom:2em;
      >p{
        font-size:14px;
        color:#393939;
        line-height: 3em;
        text-indent: 1.5em;
      }
      >.content{
        overflow: hidden;
        width:100%;
        display: block;
        background:#FFF7CC;
        padding:0 20px;
        >p{
          display: block;
          width:100%;
          line-height: 2em;
          font-size:14px;
          color:#393939;
          font-family:PingFangSC-Semibold;
        }
      }
    }
    .submit{
      width:100%;
      text-align: center;
      >button{
        padding-left:3em;
        padding-right:3em;
      }


    }
  }
  .files{

    .file {
      position: relative;
      display: inline-block;
      border: 1px solid #99D3F5;
      border-radius: 4px;
      padding: 4px 12px;
      width:280px;
      height: 140px;
      line-height: 120px;
      overflow: hidden;
      color: #1E88C7;
      font-size:18px;
      text-decoration: none;
      text-indent: 0;

      text-align: center;
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
  }
  .el-tabs__content{
    /*height:100%;*/
  }
</style>


