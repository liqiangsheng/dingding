<template>
  <div>
      <div class="addAlert"><!--背阴-->
      </div>
      <div class="addAlert_box" v-if="isOkName=='申领通过'||isOkName=='申请驳回'||isOkName=='确认取件'">
          <div class="el-message-box__title">
              <span>{{isOkName}}</span>
            <i @click="close"></i>
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
        <i @click="close"></i>
      </div>
      <ul class="centent">
        <li  class="list">
          <span>发货方式<a style="color: #EA5413">*</a></span>
            <el-select v-model.trim="delivery" placeholder="请选择发货方式" @change="selectorOne(delivery)">
              <el-option
                v-for="item in deliveryArray"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          <a style="color: red;" v-if="deliveryError">{{deliveryError}}</a>
        </li>
        <li  class="list" v-show="logisticsSingleNumberShow">
          <span>物流单号<a style="color: #EA5413">*</a></span>
          <el-input
            style="width: 561px;"
            placeholder="请填写物流单号"
            v-model.trim="logisticsSingleNumber">
          </el-input>
          <a style="color: red" v-if="logisticsSingleNumberError">{{logisticsSingleNumberError}}</a>
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
        <i @click="close"></i>
      </div>
      <ul class="centent">
        <li>
          <img class="YesSelect" @click="Reasons" :src="isReasons"><span>已返还旧件</span>
        </li>
        <li>
          <span style="transform: translateY(-50px)">请上传凭证</span>
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
    props:["isOkName","stateId","parseName"],
    components:{
    },
    data() {
      return {
        operatorType:"", //操作执行
        state:"", //改变的状态
        threeFileShow:false,
        isReasonsBool:false, //显示什么图片
        isReasons:"./static/images/reasons.png",//选中
        returnOldMountings:"",//是否返回旧件
        delivery:'',//发货方式
        deliveryID:"",//发货方式ID
        deliveryArray:[//发货方式
          {
            id:"2",
            name:"自取"
          },
          {
            id:"1",
            name:"快递"
          },

        ],
        deliveryError:"", //
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
         this.returnOldMountings =1;
       }else{
         this.isReasons = "./static/images/isReasons.png";
         this.returnOldMountings =2;
       }
      },
      selectorOne(v){ //取货方式
        if(v){
          this.deliveryError = "";
        }else{
          this.deliveryError  ="请填写发货方式";
        }
        if(v === "快递"){
          this.logisticsSingleNumberShow = true;
        }else{
          this.logisticsSingleNumberShow = false;
        }
        this.deliveryArray.forEach((item,index)=>{
           if(item.name === v)  this.deliveryID = item.id;
        })
      },
      close(){ //传值给父级
        this.$emit("isClose",false)
      },
      quxiao(){ //取消
        this. close();
      },
      yes(){ //确定
        if(this.isOkName === '发货'){
            if(this.delivery === ""){
              this.deliveryError  ="请填写发货方式";
              return
            }else{
              this.deliveryError  ="";
            }
        }

         if(this.delivery === "快递"&&this.logisticsSingleNumber === "" ){
             this.logisticsSingleNumberError = "请填写物流单号"
             return
         }else{
           this.logisticsSingleNumberError = "";
         }
        this.quiry();
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
            this.upImgStr = this.upImgStr.split(",");
          }else{
            this.$queryFun.successAlert.call(this,"上传失败");
          }
        });
      },
      quiry(){
            let a  =this.upImgStr?this.upImgStr.slice(1).join(","):this.upImgStr;
            let obj = {
              id: this.stateId, //配件申请ID
              operatorType: this.operatorType,//执行的操作
              state: this.state,//修改后的状态
              mountingsName: this.parseName,//配件名称
              remark:this.noteInformation,//备注
              shippingType:this.deliveryID,//发货方式
              logisticsNum:this.logisticsSingleNumber,//物流单号
              returnOldMountings:this.returnOldMountings,//是否已返还旧
              certificateImg:a,//凭证图片
            };
            let url =`${ this.$common.apidomain}/mountingsApply/updateMountingsApplyState`;
             this.$http.post(url,obj).then(res=>{
               if(res.data.code === "0000"){
                 this.$queryFun.successAlert.call(this,this.isOkName+'成功',1)
                 this. close();
               }else{
                 this.$queryFun.successAlert.call(this,res.data.error)
               }
             })
      },
      stateType(){
        if(this.isOkName === '申领通过'){
          this.returnOldMountings = "";
          this.operatorType = 2;
          this.state = 20;
        }else if(this.isOkName === '申请驳回'){
          this.returnOldMountings = "";
          this.operatorType = 6;
          this.state = 60;
        }else if(this.isOkName === '发货'){
          this.returnOldMountings = "";
          this.operatorType = 3;
          this.state = 30;
        }else if(this.isOkName === '确认取件'){
          this.returnOldMountings = "";
          this.operatorType = 4;
          this.state = 40;
        }else if(this.isOkName === '完结'){
          this.returnOldMountings = 1;
          this.operatorType = 5;
          this.state = 50;
        }
      }
    },


    mounted() {
    },
    created(){
       this.stateType()
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
    height:42px;
    position: relative;
    border-bottom:1px solid rgba(151,151,151,1);
    i{
      display: inline-block;
      position: absolute;
      right: 10px;
      top:10px;
      width: 15px;
      height: 15px;
      cursor: pointer;
      background: url(../../../../static/images/pruductclose.png) no-repeat center;
    }
    i:hover{
      cursor: pointer;
      background: url(../../../../static/images/pruduct1close.png) no-repeat center;
    }
    span{
      width: 100%;
      display: inline-block;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:42px;
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








