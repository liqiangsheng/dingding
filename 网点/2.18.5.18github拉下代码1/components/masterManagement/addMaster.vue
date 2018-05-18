<template>
  <div class="addMasterList">
    <C_header title="新建师傅" left_number='1' :goBack='cancelAdd'></C_header>
    <div class="inputList">
      <ul>
        <li v-for="(item,index) in inputList" :key="index">
          <label>{{item.label}}<span>*</span></label>
          <input type="text" :placeholder="item.placeholder" v-model='item.value'>
        </li>
      </ul>
      <p>服务城市<span>*</span></p>
      <div class="selectCity">
        <span><img src="../../assets/images/selectArrow.png"></span>
        <span><img src="../../assets/images/selectArrow.png"></span>
        <select v-model="selectProvince">
          <!-- <option>请选择</option> -->
          <option value="广东" selected>广东</option>
        </select>
        <select v-model="selectCity">
          <!-- <option>请选择</option> -->
          <option v-for="(item,index) in cityList" :key='index' :value="item.id" selected>{{item.name}}</option>
        </select>
      </div>
      <p>服务区域<span>*</span></p>
      <font @click="selectArea()">
        <span><img src="../../assets/images/addService.png" alt=""></span>
        <span>添加</span>
      </font>
      <p>服务工种<span>*</span></p>
      <font @click="selectWorker()">
        <span><img src="../../assets/images/addService.png" alt=""></span>
        <span>添加</span>
      </font>
      <p>证件信息</p>
      <div class="idCard">
        <input type="file" ref="file" id="file" v-on:change="traditional_file($event)"
               accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" style="display: none">
        <div @click="uploadImg('身份证正面')">
          <div>
            <span><img src="../../assets/images/idBack.png" alt=""></span>
            <span class="uploadImg" v-if="idPositiveImg.length!==0">
              <img :src="idPositiveImg" alt="">
              <font class="closeImg" @click="closeImg('正面')">×</font>
            </span>
          </div>
          <div>身份证正面照<span>*</span></div>
        </div>
        <div @click="uploadImg('身份证反面')">
          <div>
            <span><img src="../../assets/images/idPostive.png" alt=""></span>
            <span class="uploadImg" v-if="idBackImg.length!==0">
              <img :src="idBackImg" alt="">
              <font class="closeImg" @click="closeImg('反面')">×</font>
            </span>
          </div>
          <div>身份证反面照<span>*</span></div>
        </div>
      </div>
      <div class="idCard idOther">
        <div @click="uploadImg('手持身份证')">
          <div>
            <span><img src="../../assets/images/idHand.png" alt=""></span>
            <span class="uploadImg" v-if="idHandImg.length!==0">
              <img :src="idHandImg" alt="">
              <font class="closeImg" @click="closeImg('手持')">×</font>
            </span>
          </div>
          <div>本人手持身份证照<span>*</span></div>
        </div>
        <div class="otherImg" v-for="(item,index) in idOtherImg" :key="index">
          <div>
            <span><img src="../../assets/images/idOther.png" alt=""></span>
            <span class="uploadImg">
              <img :src="item" alt="">
              <font class="closeImg" @click="closeImg('其他',index)">×</font>
            </span>
          </div>
          <div>其他证件照</div>
        </div>
        <div class="otherImg" @click="uploadImg('其他证件')">
          <div>
            <span><img src="../../assets/images/idOther.png" alt=""></span>
          </div>
          <div>其他证件照</div>
        </div>
      </div>
      <div class="text">
        <p>上传照片注意事项:</p>
        <p>1. 电子照片文件格式必须为JPG,JPEG,GIF,BMP,PNG格式, 最多可上传10张证件照</p>
        <p>2. 上传照片必须为标准证件照,请确保证件号码,姓名和照片清晰可见, 否则不能通过审核</p>
      </div>
      <button @click="submit()">提交</button>
    </div>
    <div v-if='isShow'>
      <div class="backLayer"></div>
      <div class='upLayer'>
        <div class='top'>
          <span><img src="../../assets/images/close.png"></span>
          <span>您还未保存信息,确认退出吗?</span>
        </div>
        <p @click="cancels()">取消</p>
        <p @click="confirm()">确认</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        isShow: false,
        isClose: false,
        selectProvince: "",
        selectCity: "",
        inputList: [
          {'label': '师傅姓名', 'placeholder': '请输入师傅姓名', 'value': ''},
          {'label': '师傅手机号', 'placeholder': '请输入师傅手机号', 'value': ''},
          {'label': '身份证号码', 'placeholder': '请输入身份证号码', 'value': ''},
          {'label': '紧急联系人', 'placeholder': '请输入紧急联系人姓名', 'value': ''},
          {'label': '紧急联系人号码', 'placeholder': '请输入紧急联系人号码', 'value': ''},
        ],
        cityList: [],            //城市
        idPositiveImg: '',     //正面身份证照片
        idBackImg: '',         //背面身份证照片
        idHandImg: '',         //手持身份证照片
        idOtherImg: [],         //其他证件
        index: '',
        totalImg: [],           //总图片数
        serviceWorker: {},
        serviceArea: {},
        masterList: {},
        selected: false
      }
    },
    created() {
      this.masterList = this.$store.getters.masterDetails;
      this.serviceArea = this.$store.getters.serviceArea;
      this.serviceWorker = this.$store.getters.serviceWorker;
      this.getCityList();
      this.inputList[0].value = this.masterList.name;
      this.inputList[1].value = this.masterList.phoneNum;
      this.inputList[2].value = this.masterList.idNum;
      this.inputList[3].value = this.masterList.emergencyContact;
      this.inputList[4].value = this.masterList.emergencyPhoneNum;
      this.selected = this.masterList.selected;
    },
    methods: {
      cancelAdd() {
        this.$router.push({path: '/master'})
      },
      //取消
      cancel() {
        this.$router.push({path: '/master'});
      },
      cancels() {
        this.isShow = false;
      },
      confirm() {
        this.$router.go(-1)
      },
      //选择城市
      indexSelect(event) {
        // console.log(event.target.value, '12356')
        // console.log('213', this.selected)
      },
      //选择服务区域
      selectArea() {
        if (this.selectCity.length == 0 || this.selectProvince.length == 0) {
          this.$Toast('请选择服务城市')
          return;
        }
        this.$router.push({path: '/serviceArea'});
        let masterDetails = {};
        masterDetails.name = this.inputList[0].value;                        //师傅姓名
        masterDetails.phoneNum = this.inputList[1].value;                    //师傅手机号
        masterDetails.idNum = this.inputList[2].value;                      //身份证号码
        masterDetails.emergencyContact = this.inputList[3].value;           //紧急联系人
        masterDetails.emergencyPhoneNum = this.inputList[4].value;          //紧急联系人电话
        masterDetails.selected = true;          //紧急联系人电话
        this.$store.dispatch('masterDetails', masterDetails);
      },
      //选择服务工种
      selectWorker() {
        this.$router.push({path: '/serviceWorker'});
      },
      //上传图片
      uploadImg(data) {
        this.index = data;
        document.getElementById('file').click();
      },
      traditional_file(event) { //inout的file
        let _this = this;
        let filesObj = event.target.files[0];
        let param = new FormData(); // 创建form对象
        param.append('file', filesObj);  // 通过append向form对象添加数据
        let dataReq = param;
        let url = _this.$common.apidomain + "/upload/kindeditorjson";
        if (_this.totalImg.length > 9) {
          _this.$Toast('最多只能上传10张图片')
          return;
        }
        _this.$http.post(url, param).then(res => {
          let data = res.data;
          if (_this.index === "身份证正面") {
            _this.totalImg.push(data.url)
            _this.idPositiveImg = data.url;
          } else if (_this.index === '身份证反面') {
            _this.totalImg.push(data.url)
            _this.idBackImg = data.url;
          } else if (_this.index === '手持身份证') {
            _this.totalImg.push(data.url)
            _this.idHandImg = data.url;
          } else if (_this.index === '其他证件') {
            _this.totalImg.push(data.url)
            _this.idOtherImg.push(data.url);
          }
        })
      },
      //更换图片
      closeImg(data, index) {
        event.stopPropagation()
        if (data === '正面') {
          this.totalImg.splice(this.totalImg.findIndex(v => v.id === this.idPositiveImg), 1);
          this.idPositiveImg = "";
        } else if (data === '反面') {
          this.totalImg.splice(this.totalImg.findIndex(v => v.id === this.idBackImg), 1);
          this.idBackImg = "";
        } else if (data === '手持') {
          this.totalImg.splice(this.totalImg.findIndex(v => v.id === this.idHandImg), 1);
          this.idHandImg = "";
        } else if (data === '其他') {
          this.totalImg.splice(this.totalImg.findIndex(v => v.id === this.idOtherImg[index]), 1);
          this.idOtherImg.splice(index, 1);
        }
      },
      //城市数据
      getCityList() {
        let url = this.$common.apidomain + "/common/findcitylistareainfo"     //服务城市列表
        this.$http.get(url).then(res => {
          let data = res.data;
          if (data.code === '0000') {
            this.cityList = data.result;
            console.log(this.cityList, '城市')
          } else {
            this.$Toast(data.error)
          }
        })
      },
      //传给后台参数
      params() {
        return {
          areaIds: this.serviceArea.id.join(','),                    //服务区域
          skillIds: this.serviceWorker.id.join(','),                     //服务工种
          city: this.cityList[0].name,                       //城市名称
          cityId: this.cityList[0].id,                     //城市id
          name: this.inputList[0].value,                        //师傅姓名
          phoneNum: this.inputList[1].value,                    //师傅手机号
          idNum: this.inputList[2].value,                       //身份证号码
          emergencyContact: this.inputList[3].value,           //紧急联系人
          emergencyPhoneNum: this.inputList[4].value,           //紧急联系人电话
          idPhotos: this.totalImg.join(','),                    //所有凭证
          //site:'',                        //网点
          // siteId:"",                      //网点Id
          //type:'3'                        //师傅类型
          //level:'',                       //师傅等级
        }
      },
      //提交
      submit() {
        // console.log(this.params(), '参数')
        let url = this.$common.apidomain + '/masterinfo/submit'
        this.$http.post(url, this.params()).then(res => {
          let data = res.data;
          if (data.code === '000') {
            console.log(data, '提交数据')
            this.$router.push({path: '/master'});
          } else {
            this.$Toast(data.error);
          }

        })
      },
    }
  }
</script>
<style scoped lang="less">
  .addMasterList {
    width: 100%;
    position: absolute;
    top: -.96rem;
    .backLayer {
      width: 100%;
      background: black;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 2007;
      opacity: 0.2;
    }
    .upLayer {
      position: relative;
      width: 6rem;
      height: 3.39rem;
      background-color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -7.6rem;
      margin-left: -3rem;
      z-index: 2008;
      border-radius: .08rem;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      .top {
        height: 2.47rem;
        width: 100%;
        border-bottom: .02rem solid RGBA(151, 151, 151, 1);
        span {
          display: inline-block;
          position: absolute;
        }
        > span:nth-of-type(1) {
          top: .36rem;
          right: .36rem;
          width: .3rem;
          height: .3rem;
          //border:.01rem dotted gray;
          > img {
            width: 99%;
            height: 99%;
          }
        }
        > span:nth-of-type(2) {
          width: 4.53rem;
          height: .45rem;
          font-size: .32rem;
          font-family: PingFangSC-Regular;
          color: rgba(57, 57, 57, 1);
          line-height: .45rem;
          top: 1.25rem;
          left: .73rem;
        }
      }
      p:nth-of-type(1) {
        width: 2.99rem;
        border-right: .01rem solid RGBA(151, 151, 151, 1);
      }
      p:nth-of-type(2) {
        width: 2.8rem;
      }
      p {
        display: inline-block;
        height: .9rem;
        font-size: .36rem;
        line-height: .9rem;
        text-align: center;
      }

    }
  }

  header {
    position: relative;
    text-align: center;
    padding: .23rem 0;
    border-bottom: .02rem solid #B7B7B7;
    margin-bottom: .52rem;
    span {
      display: inline-block;
    }
    span:nth-of-type(2) {
      width: 1.44rem;
      height: .5rem;
      font-size: .36rem;
      font-family: PingFangSC-Regular;
      color: rgba(57, 57, 57, 1);
      line-height: .5rem;
      font-weight: 800;
    }
    span:nth-of-type(1) {
      width: .6rem;
      height: .42rem;
      font-size: .3rem;
      font-family: PingFangSC-Regular;
      color: rgba(83, 107, 210, 1);
      line-height: .42rem;
      position: absolute;
      left: .42rem;
      top: .31rem;
    }
  }

  .inputList {
    padding: 0 .6rem;
    ul {
      margin-top: .52rem;
    }
    label, p {
      width: 1.27rem;
      height: .4rem;
      font-size: .28rem;
      font-family: PingFangSC-Regular;
      color: rgba(83, 107, 210, 1);
      line-height: .4rem;
      > span {
        display: inline-block;
        color: #E65831;
        transform: translateY(.06rem);
      }
    }
    ul > li {
      margin-bottom: .22rem;
      input {
        margin-top: .07rem;
        width: 6.3rem;
        height: .9rem;
        background: rgba(255, 255, 255, 1);
        border-radius: .1rem;
        border: .01rem solid #C1C1C1;
        font-size: .32rem;
        font-family: PingFangSC-Regular;
        color: rgba(195, 195, 195, 1);
        text-indent: .16rem;
      }
    }
    .selectCity {
      position: relative;
      > span {
        position: absolute;
        display: inline-block;
        width: .23rem;
        height: .17rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      > span:nth-of-type(1) {
        left: 2.57rem;
        top: .22rem;
      }
      > span:nth-of-type(2) {
        left: 5.84rem;
        top: .22rem;
      }
      select {
        width: 3rem;
        height: .9rem;
        font-size: .32rem;
        background: rgba(238, 238, 238, 1);
        border-radius: .1rem;
        margin-bottom: .25rem;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background-size: .23rem .14rem;
        //background: url("../../assets/images/selectArrow.png") no-repeat scroll right center transparent;
        padding-right: .14rem;
      }
      select:nth-of-type(1) {
        margin-right: .2rem;
      }
    }
    font {
      position: relative;
      display: block;
      width: 1.52rem;
      height: .64rem;
      background: rgba(83, 107, 210, 1);
      border-radius: .08rem;
      span:nth-of-type(2) {
        position: absolute;
        top: .12rem;
        left: .66rem;
        display: inline-block;
        width: .56rem;
        height: .4rem;
        font-size: .28rem;
        font-family: PingFangSC-Regular;
        color: rgba(255, 255, 255, 1);
        line-height: .4rem;
      }
      span:nth-of-type(1) {
        position: absolute;
        top: .17rem;
        left: .16rem;
        width: .3rem;
        height: .3rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    p:nth-of-type(1) {
      margin-bottom: .07rem;
    }
    p:nth-of-type(2) {
      margin-bottom: .17rem;
    }
    p:nth-of-type(3) {
      margin-bottom: .21rem;
    }
    font:nth-of-type(1) {
      margin-bottom: .47rem;
    }
    font:nth-of-type(2) {
      margin-bottom: .34rem;
    }
    p:nth-of-type(4) {
      height: .6rem;
      background: #F1F1F1;
      width: 120%;
      margin-left: -.6rem;
      text-align: center;
      line-height: .6rem;
      margin-bottom: .54rem;
    }
    .idCard {
      width: 100%;
      //height: 2.3rem;
      margin-bottom: .62rem;
      div {
        display: inline-block;
      }
      > div {
        position: relative;
        height: 100%;
        //display:inline-block;
        //border: .01rem solid red;
        > div:nth-of-type(1) {
          width: 3rem;
          // display:inline-block;
          background: #EEEDEF;
          height: 1.79rem;
          border: .01rem solid #888888;
          //border-radius: .08rem;
          .uploadImg {
            width: 100%;
            height: 1.79rem;
            left: 0;
            top: 0;
            border: none;
            // z-index: 20000;
            .closeImg {
              display: inline-block;
              width: .4rem;
              height: .4rem;
              line-height: .4rem;
              text-align: center;
              color: #fff;
              position: absolute;
              right: -.15rem;
              top: -.15rem;
              z-index: 3;
              border-radius: 50%;
              font-size: .32rem;
              background-color: green;
            }
          }
          span {
            position: absolute;
            display: inline-block;
            width: 1.34rem;
            height: .88rem;
            top: .45rem;
            left: .83rem;
            border: .02rem dashed #888888;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        > div:nth-of-type(2) {
          position: absolute;
          //display: inline-block;
          height: .4rem;
          width: 3rem;
          text-align: center;
          > span {
            display: inline-block;
            color: #E65831;
            transform: translateY(.06rem);
          }
        }

      }
      > div:nth-of-type(odd) {
        margin-right: .2rem;
      }
    }
    .idOther {
      padding-bottom: .2rem;
      //margin-bottom: .4rem;
      > div {
        height: 2.3rem;
        margin-bottom: .3rem;
      }
      > .otherImg {
        > div:nth-of-type(1) {
          .uploadImg {
            width: 100%;
            height: 1.79rem;
            left: 0;
            top: 0;
            border: none;
            .closeImg {
              display: inline-block;
              width: .4rem;
              height: .4rem;
              line-height: .4rem;
              text-align: center;
              color: #fff;
              position: absolute;
              right: -.15rem;
              top: -.15rem;
              z-index: 3;
              border-radius: 50%;
              font-size: .32rem;
              background-color: green;
            }
          }
          span {
            height: .61rem;
            width: .6rem;
            top: .59rem;
            left: 1.2rem;
          }
        }
      }
    }
    .text {
      height: 2.03rem;
      width: 100%;
      > p {
        font-size: .24rem;
        width: 100%;
        font-family: PingFangSC-Regular;
        color: rgba(230, 88, 49, 1);
        line-height: .33rem;
        //height:.33rem;
      }
    }
    button {
      display: inline-block;
      width: 6.3rem;
      height: .9rem;
      background: rgba(83, 107, 210, 1);
      border-radius: .1rem;
      border: none;
      margin-bottom: .6rem;
    }

  }
</style>
