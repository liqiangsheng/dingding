<template>
  <div>
      <div class="addAlert"><!--背阴-->
      </div>
      <div class="addAlert_box" v-if="isOkName=='申请通过'||isOkName=='申请驳回'||isOkName=='确认取件'">
          <div class="el-message-box__title">
              <span>{{isOkName}}</span>
              <i class="el-message-box__close el-icon-close" @click="close"></i>
          </div>
        <ul class="centent">
          <li>
            <span class="transLateY">备注信息</span>
            <el-input
              style="width: 561px;height: 211px"
              type="textarea"
              :rows="10"
              placeholder="请填写备注信息"
              v-model="noteInformation">
            </el-input>
          </li>
        </ul>

        <div class="li">
          <el-button @click="quxiao">取消</el-button>
          <el-button type="primary" @click="yes">确定</el-button>
        </div>
      </div>
    <div class="addAlert_box" v-if="isOkName=='发货'">
      <div class="el-message-box__title">
        <span>{{isOkName}}</span>
        <i class="el-message-box__close el-icon-close" @click="close"></i>
      </div>
      <ul class="centent">
        <li  class="list">
          <span>发货方式</span>
            <el-select v-model.trim="delivery" placeholder="请选择发货方式" @change="selectorOne(delivery)">
              <el-option
                v-for="item in deliveryArray"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
        </li>
        <li  class="list" v-show="logisticsSingleNumberShow">
          <span>物流单号</span>
          <el-input
            style="width: 561px;"
            placeholder="请填写物流单号"
            v-model.trim="logisticsSingleNumber">
          </el-input>
          <span style="color: red" v-if="logisticsSingleNumberError">{{logisticsSingleNumberError}}</span>
        </li>
        <li>
          <span class="transLateY">备注信息</span>
          <el-input
            style="width: 561px;height: 211px"
            type="textarea"
            :rows="10"
            placeholder="请填写备注信息"
            v-model="noteInformation">
          </el-input>
        </li>
      </ul>

      <div class="li">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="yes">确定</el-button>
      </div>
    </div>

    <div class="addAlert_box" v-if="isOkName=='完结'">
      <div class="el-message-box__title">
        <span>{{isOkName}}</span>
        <i class="el-message-box__close el-icon-close" @click="close"></i>
      </div>
      <ul class="centent">
        <li>
          <img class="YesSelect" @click="Reasons" :src="isReasons"><span>已返还旧件</span>
        </li>
        <li>
          <span>请上传凭证</span>
          <b><input type="file" @change="onchangeFile($event,0)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"></b>
          <b><input type="file" @change="onchangeFile($event,1)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"></b>
          <b v-show="threeFileShow"><input type="file" @change="onchangeFile($event,2)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"></b>
        </li>
        <li>
          <span class="transLateY">备注信息</span>
          <el-input
            style="width: 561px;height: 211px"
            type="textarea"
            :rows="10"
            placeholder="请填写备注信息"
            v-model="noteInformation">
          </el-input>
        </li>
      </ul>

      <div class="li">
        <el-button @click="quxiao">取消</el-button>
        <el-button type="primary" @click="yes">确定</el-button>
      </div>
    </div>
  </div>

</template>
<script>

  export default {
    props:["isOkName"],
    components:{
    },
    data() {
      return {
        threeFileShow:false,
        isReasonsBool:false, //显示什么图片
        isReasons:"./static/images/reasons.png",//选中
        delivery:'',//发货方式
        deliveryArray:[//发货方式
          {
            id:"1",
            name:"自提"
          },
          {
            id:"2",
            name:"快递"
          }
        ],
        logisticsSingleNumberShow:false,//物流单号是否显示
        logisticsSingleNumber:"", //物流单号
        logisticsSingleNumberError:"", //物流单号不填写
        noteInformation:"",//备注信息
        upImg:"", //上传图片
        upImg1:"", //上传图片
        upImg2:"", //上传图片
        upImgStr:"",
       }

    },
    methods: {
      onchangeFile(e,i){ //上传图片
        if(i == 1){
          this.threeFileShow =true;
          this.upDataImg(e,i);
        }
        if(i == 0){
          this.upDataImg(e,i);
        }
        if(i == 2){
          this.upDataImg(e,i);
        }



      },
      Reasons(){ //是否已还旧件
       this.isReasonsBool = !this.isReasonsBool;
       if(this.isReasonsBool === false){
         this.isReasons = "./static/images/reasons.png";
       }else{
         this.isReasons = "./static/images/isReasons.png";
       }
      },
      selectorOne(v){ //取货方式
        if(v === "快递"){
          this.logisticsSingleNumberShow = true;
        }else{
          this.logisticsSingleNumberShow = false;
        }
      },
      close(){ //传值给父级
        this.$emit("isClose",false)
      },
      quxiao(){ //取消

        this. close();
      },
      yes(){ //确定
         if(this.delivery === "快递"&&this.logisticsSingleNumber === "" ){
             this.logisticsSingleNumberError = "请填写快递单号"
             return
         }else{
           this.logisticsSingleNumberError = "";
         }
      },
      upDataImg(event,index){
        let filesObj=event.target.files[0];
        let filesName=event.target.files[0].name;
        let img=event.target.parentElement;
//        let url=this.$apidomain+"/upload/kindeditorjson";
        let url=this.$apiupdate+"/upload/kindeditorjson";
        let param = new FormData(); // 创建form对象
        param.append('file',filesObj, filesName);  // 通过append向form对象添加数据
        this.$http.post(url,param,{headers: {'Content-Type': 'multipart/form-data'}}).then(res=>{
          let data=res.data;
          if(data.error==0){
            img.style.background= "url("+data.url+") center center no-repeat";
            img.style.backgroundSize= "100% 100%";
            this.upImg=data.url;   //参数是ajax返回的图片地址
              if(index == 0){
                this.upImg=data.url;   //参数是ajax返回的图片地址
                this.upImgStr =this.upImgStr+","+this.upImg
              }
            if(index == 1){
              this.upImg1=data.url;   //参数是ajax返回的图片地址
              this.upImgStr =this.upImgStr+","+this.upImg
            }
            if(index == 2){
              this.upImg2=data.url;   //参数是ajax返回的图片地址
              this.upImgStr =this.upImgStr+","+this.upImg
            }
            this.upImgStr = this.upImgStr.slice(1,this.upImgStr.length)

          }else{
            this.$queryFun.successAlert.call(this,"上传失败");
          }
        });
      },
    },


    mounted() {
    },
    created(){


    }
  }
</script>
<style scoped lang="scss">

  .addAlert{
    width: 100%;
    background: black;
    position: absolute;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index:2007;
    opacity: 0.2;
  }
  .addAlert_box{
    width: 960px;
    height: 620px;
    background-color: #fff;
    position: absolute;
    left: 20%;
    top:14%;
    z-index:2008;
    border-radius:8px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .el-message-box__title{
    width: 100%;
    height:7%;
    position: relative;
    background:rgba(243,243,243,1);
    .el-message-box__close{
      position: absolute;
      right: 10px;
      top:10px;
    }
    span{
      width: 100%;
      display: inline-block;
      height:14px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:36px;
      text-align: center;
    }
  }
  .centent{
    padding: 70px 62px 0 62px;
    li{
      margin-bottom: 13px;
      .YesSelect{
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-left: 86px;
        margin-right: 10px;
        transform: translateY(5px);
      }
      b{
        width: 206px;
        height: 113px;
        display: inline-block;
        background: url("../../../../static/images/IDImg4.png");
        cursor: pointer;
        border-radius:4px;
        position: relative;
        input {
          position: absolute;
          font-size: 100px;
          width:100%;
          height: 100%;
          right: 0;
          top: 0;
          opacity: 0;
        }
      }
      b:nth-last-child(1){
        border: 1px solid #CACADB;
        background:none;
      }
      b:hover {
        background: #AADFFD;
        border-color: #78C3F3;
        color: #004974;
        text-decoration: none;
      }

      span{
        width: 70px;
        text-align: right;
        display: inline-block;
        font-size:13px;
        font-family:PingFangSC-Regular;
        line-height:18px;display: inline-block;
        margin-right: 10px;
      }
      .transLateY{
        transform: translateY(-180px);
      }
      textarea{
        width: 561px;
        height: 211px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        line-height:14px;
      }
    }

  }
  .li{
    width: 100%;
    position: absolute;
    bottom: 42px;
    left: 0;
    text-align: center;
    .el-button{
      width: 200px;
    }
  }
</style>








