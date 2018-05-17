<template>
  <div class="addMasterList">
    <!-- <header>
      <span @click="cancel">取消</span>
      <span>新建师傅</span>
    </header> -->
    <C_header title="新建师傅" leftName="取消"></C_header>
    <div class="inputList">
      <ul>
        <li v-for="(item,index) in inputList" :key="index">
          <label>{{item.label}}<span>*</span></label>
          <input type="text" :placeholder="item.placeholder">
        </li>
      </ul>
      <p>服务城市<span>*</span></p>
      <select name="" id="">
        <option value=""></option>
      </select>
      <select>
        <option>--请选择--</option>
      </select>
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
      <button @click='edit()'>编辑详情</button>
      <button @click="submit()">提交</button>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        inputList: [
          {'label': '师傅姓名', 'placeholder': '请输入师傅姓名'},
          {'label': '师傅手机号', 'placeholder': '请输入师傅手机号'},
          {'label': '身份证号码', 'placeholder': '请输入身份证号码'},
          {'label': '紧急联系人', 'placeholder': '请输入紧急联系人姓名'},
          {'label': '紧急联系人号码', 'placeholder': '请输入紧急联系人号码'},
        ],
        idPositiveImg: '',     //正面身份证照片
        idBackImg: '',         //背面身份证照片
        idHandImg: '',         //手持身份证照片
        idOtherImg: [],         //其他证件
        index: '',
        totalImg: []           //总图片数
      }
    },
    methods: {
      //取消
      cancel() {
        this.$router.push({path: '/master'});
      },
      //选择服务区域
      selectArea() {
        this.$router.push({path: '/serviceArea'});
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
      //提交
      submit() {
        let url = this.$common.apidomain + "/common/findcitylistareainfo"     //服务城市列表
        let url1 = this.$common.apidomain + "/common/findareaandstreetoptions"  //服务区域列表
        let url2 = this.$common.apidomain + "/common/findlabelbusinessoptions"  //服务工种列表
        this.$http.get(url2).then(res => {
          let data = res.data;
          console.log(data, '服务城市列表')
        })
      },
      //跳转到编辑详情
      edit() {
        //this.$router.push({path: '/serviceWorker'});
        this.$router.push({path: '/editMasterDetails'});
      }
    }
  }
</script>
<style scoped lang="less">
  .addMasterList {
    width: 100%;
    position: absolute;
    top: -.96rem;
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
    select {
      width: 3rem;
      height: .9rem;
      background: rgba(238, 238, 238, 1);
      border-radius: .1rem;
      margin-bottom: .25rem;
    }
    select:nth-of-type(1) {
      margin-right: .2rem;
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
