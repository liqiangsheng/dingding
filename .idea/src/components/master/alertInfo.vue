<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title relative">{{isDetailed.title}}   <p id="closeX" class="closeX" @click="close(isDetailed)"></p></h3>
      <div class="scrollbar content">
        <div class="left_info">
          <p class="title">师傅信息</p>
          <ul>
            <li>姓名：{{dataObj.masterInfo.name |placeholder}}</li>
            <li>手机号:{{dataObj.masterInfo.phoneNum |placeholderTel}}</li>
            <li>所属网点:{{dataObj.masterInfo.site |placeholder}}</li>
            <li>服务城市:{{dataObj.masterInfo.city|placeholder}}</li>
            <li>身份证:{{dataObj.masterInfo.idNum|placeholder}}</li>
            <li>服务区域:{{dataObj.areas|listshow |placeholder}}</li>
            <li>服务工种:{{dataObj.skills|listshow|placeholder}}</li>
            <li>紧急联系人:{{dataObj.masterInfo.emergencyContact|placeholder}}</li>
            <li>联系人电话:{{dataObj.masterInfo.emergencyPhoneNum|placeholderTel}}</li>
            <li>
              <ul>
                <li>
                  本人执证照：
                  <img :src="dataObj.licenseImg" alt="">
                </li>
                <li>
                  身份证正照:
                  <img :src="dataObj.identityCardImgFront" alt="">
                </li>
                <li>
                  身份证反面:
                  <img :src="dataObj.identityCardImgReverse" alt="">
                </li>
                <li>
                  资格证照:
                  <img :src="dataObj.qualificationImg" alt="">
                </li>
              </ul>
            </li>
            <li class="option_list" v-show="3==dataObj.masterInfo.certificateState">
              驳回原因：  {{dataObj.masterInfo.certificateRemark |placeholder}}
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
          masterInfo:{},
          areas:[],
          skills:[]
        },
      }
    },
    created(){
      let url=this.$apidomain+"/masterinfo/finddetail?id="+this.isDetailed.id;
      this.$http.get(url).then(res=>{
//
        let data = res.data;
        console.log(data);
        this.dataObj = data.result;
        var images =  this.dataObj.masterInfo.idPhotos.split(",");
        this.dataObj.licenseImg = images[0];  //本人执证照
        this.dataObj.identityCardImgFront = images[1]; //身份证正面
        this.dataObj.identityCardImgReverse = images[2];//身份证反面
        this.dataObj.qualificationImg = images[3];  //资格执照
        })
    },
    methods: {
      refuse(){
        return this.$store.state.refuse
      },
      forbidden(){ //禁用数据

      },
      close(isShow){   //关闭弹窗
        isShow.isShow=false
      },
    },
    mounted() {

    },
    watch:{

    },
  }
</script>
<style lang="scss">
    .el-select-dropdown{
      z-index: 9999 !important;
    }
</style>
<style scoped lang="scss">
  @import "../../assets/styles/commButton";
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
      overflow-y: auto;
      width:100%;
      display:flex;
      height: 75%;
      >div{

        flex:1;

        >ul{
          >li{
            >ul{
              display: flex;
              flex-wrap:wrap;
              padding:0;
              >li{
                width:50%;
                margin-bottom:30px;
                >img{
                  display: block;
                  width:270px;
                  height: 130px;
                }
              }
            }
          }
        }
      }
      >.left_info{
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
  }
  .closeX{
    background:url(../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
    top:20px;
    right:0;
    background-origin: content-box;
  }
</style>

