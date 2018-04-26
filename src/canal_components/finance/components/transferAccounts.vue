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
        <upload-files :images="images" :delFilesImage="delFilesImage" :onchangeFile="onchangeFile"></upload-files>
      </section>
      <section class="submit">
        <el-button type="primary" @click="submit" style="margin:0 auto;"> 确认提交</el-button>
      </section>

    </div>
</template>
<script>
  import uploadFiles from "@/components/commInfo/uploadFiles"
  export default {
    props:["parentData"],
    components:{
      uploadFiles
    },
        data() {
            return {
              dataObj:{},
              selectorBehindObj:{},
              images:[],
            }
        },
        methods: {
          delFilesImage(e,i){
            this.$queryFun.confirm.call(this,{text:"确定删除？",title:"删除",success(){
              this.images.splice(i,1)
              this.$queryFun.successAlert.call(this,"删除成功","1")
            }})

          },

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
                this.$queryFun.successAlert.call(this,"上传失败")
              }
            });
          },
          submit(){
            setTimeout(()=>{
              let params={
                  image:"rechar_wait",
                  successTitle:"您的提现申请正在审核中",
                  successDescribe:"您于2018/02/11 12:11:00 提交的提现申请已在审核中，1-3个工作日将会返回到您的充值账号中。具体以银行到账时间为准"
              }
              this.$store.commit("changeAccountAlertData",params);
              this.parentData.isShow=true;
            },2000)
          }
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
  .el-tabs__content{
    /*height:100%;*/
  }


</style>

<style>
  .el-message-box__wrapper{
    z-index: 999999 !important;
  }
</style>
