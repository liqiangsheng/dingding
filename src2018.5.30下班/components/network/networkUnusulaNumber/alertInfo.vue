
<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{isDetailed.title}}  <p class="closeX" id="closeX" @click="close(isDetailed)"></p></h3>
      <div class="scrollbar content">
        <div class="left_info">
          <p class="title">师傅信息</p>
          <ul>
            <li><div class="list_name"> 城市 : </div> {{dataObj.city}}</li>
            <li> <div class="list_name"> 网点名称 : </div> {{dataObj.name}}</li>
            <li> <div class="list_name">网点编码 : </div> {{dataObj.id}}</li>
            <li> <div class="list_name">
              用户名 :
            </div> {{dataObj.username}}</li>
            <li > <div class="list_name">
              手机号 :
            </div> {{dataObj.linkmanPhoneNum}}
            </li>
            <li>
              <div class="list_name">
                服务区域 :
              </div>
                  {{areas}}
            </li>
            <li>
              <div class="list_name">
                联系人 :
              </div>
                 {{dataObj.linkmanName}}
            </li><li>
            <div class="list_name">
              公司电话 :
            </div>
                 {{dataObj.companyTel}}
            </li><li>
            <div class="list_name">
                主营业务 :
            </div>
               {{skills}}
            </li>
            <li>
              <div class="list_name">
                认证资料 :
              </div>
            </li>
            <li class="images_box">
              <img :src="dataObj.idPhotos1" alt="">
              <img :src="dataObj.idPhotos2" alt="">
              <img :src="dataObj.idPhotos3" alt="">
            </li>
            <li>
              <div class="list_name">
                人数 :
              </div>
              {{dataObj.peopleNum}}
            </li> <li>
            <div class="list_name">
              异常原因 :
            </div>
             {{dataObj.forbiddenCause}} - {{dataObj.forbiddenRemark}}
            </li>
          </ul>
        </div>
      </div>
      <div class="consume_info">
      </div>
    </div>

    <div class="btn">
      <button @click="close(isDetailed)">关闭</button>
    </div>
  </div>
</template>
<script>
  export default {
    props:["isDetailed","quiry"],
    data(){
      return{
        dataObj:{
          },

        areaoptions1: [],
        labeloptions2: [],
        props: {
          value: 'label',
          children: 'cities',
        },
        skills:[],
        areas:[],
        primary:"primary",
      }
    },
    created(){
      let url=this.$apidomain+"/siteInfo/findDetail?id="+this.isDetailed.id;
      this.$http.get(url).then(r=> {
        let data = r.data;
        if(data.code==="0000"){
          this.dataObj = data.result.siteInfo;
          this.areas=data.result.areas.map(v=>{
              return v.label;
          }).join(",");
        }
        this.skills = data.result.skills.map(v=>{
          return v.label
        }).join(",");
        if(this.dataObj.idPhotos){
          let phone = this.dataObj.idPhotos.split(",");
          if(phone[0]){
            this.dataObj.idPhotos1=phone[0];
          }
          if(phone[1]){
            this.dataObj.idPhotos2=phone[1];
          }
          if(phone[2]){
            this.dataObj.idPhotos1=phone[2];
          }
        }

      })
    },
    methods: {

      close(isShow){   //关闭弹窗
        isShow.isShow=false
      },

    },
    mounted() {

    },
    watch:{

    }
  }
</script>
<style lang="scss">

  .el-select-dropdown, .el-cascader-menus, .el-dialog__wrapper{
    z-index: 9999 !important;
  }
</style>
<style scoped lang="scss">
  @import "../../../assets/styles/commButton";
  .el-input, .el-input__inner{
    width:auto;
  }
  .container{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    overflow: hidden;
    letter-spacing: 0;
    width:60%;
    border-radius: 10px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    background:#fff;
    height:70%;
    >h3{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      padding-left:10px;
      letter-spacing: 0;
    }
    >.content{
      width:100%;
      height:78%;
      display:flex;
      overflow-y: auto;
         img{
             display: block;
             margin-right:10px;
             width:180px;
             float:left;
             height: 95px;
        }
      >.left_info{
        width:100%;
        >.title{
          padding-left:10px;
        }
      }
      .title{
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }
    }
    .consume_info{
      padding-bottom:200px;
      position:relative;
      >.title{
        padding-left:10px;
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }
    }
  }
  ul{
    padding-left:10px;
    list-style:none;
    >li{
      line-height:40px;
    }
    >.images_box{
      overflow: hidden;
      padding-left:85px;
    }
  }
  .el-select-dropdown__item{
    line-height: 20px;
  }
  .closeX{
    background:url(../../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
    background-origin: content-box;
  }
</style>

