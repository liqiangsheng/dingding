<template>
  <div class="addMasterList">
    <header>
      <span @click="cancel">取消</span>
      <span>新建师傅</span>
    </header>
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
      <select name="" id="">
        <option value=""></option>
      </select>
      <p>服务区域<span>*</span></p>
      <font>
        <span><img src="../../assets/images/addService.png" alt=""></span>
        <span>添加</span>
      </font>
      <p>服务工种<span>*</span></p>
      <font>
        <span><img src="../../assets/images/addService.png" alt=""></span>
        <span>添加</span>
      </font>
      <p>证件信息</p>
      <div class="idCard">
        <div>
          <div>
            <span><img src="../../assets/images/idBack.png" alt=""></span>
          </div>
          <div>身份证正面照<span>*</span></div>
        </div>
        <div>
          <div>
            <span><img src="../../assets/images/idPostive.png" alt=""></span>
          </div>
          <div>身份证反面照<span>*</span></div>
        </div>
      </div>
      <div class="idCard idOther">
        <div>
          <div>
            <span><img src="../../assets/images/idHand.png" alt=""></span>
          </div>
          <div>本人手持身份证照<span>*</span></div>
        </div>
        <div>
          <div>
            <span><img src="../../assets/images/idOther.png" alt=""></span>
          </div>
          <div>其他证件照<span>*</span></div>
        </div>
      </div>
      <div class="text">
        <p>上传照片注意事项:</p>
        <p>1. 电子照片文件格式必须为JPG,JPEG,GIF,BMP,PNG格式, 最多可上传10张证件照</p>
        <p>2. 上传照片必须为标准证件照,请确保证件号码,姓名和照片清晰可见, 否则不能通过审核</p>
      </div>
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
        ]
      }
    },
    methods: {
      cancel() {
        this.$router.push({path: '/master'});
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
      height: 2.3rem;
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
          border-radius: .08rem;
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
      > div:nth-of-type(1) {
        margin-right: .2rem;
      }
    }
    .idOther {
      margin-bottom: .4rem;
      > div:nth-of-type(2) {
        > div:nth-of-type(1) {
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
      p {
        font-size: .24rem;
        width: 100%;
        font-family: PingFangSC-Regular;
        color: rgba(230, 88, 49, 1);
        line-height: .33rem;
      }
    }
  }
</style>
