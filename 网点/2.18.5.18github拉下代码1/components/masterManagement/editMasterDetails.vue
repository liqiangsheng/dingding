<template>
  <div class="addMasterList">
    <C_header title="编辑详情" left_number='2' right_number='3'></C_header>
    <div class="inputList">
      <div class="masterName">
        {{masterInfo.name}}
        <span>{{masterInfo.workState | masterList}}</span>
      </div>
      <ul>
        <li v-for="(item,index) in inputList" :key="index">
          <label>{{item.label}}</label>
          <input type="text" :disabled='item.disable' :class='{bgcolor:item.disable}' v-model="item.id">
        </li>
      </ul>
      <p>服务城市</p>
      <select name="" id="">
        <option value=""></option>
      </select>
      <select name="" id="">
        <option value=""></option>
      </select>
      <!-- 服务区域 -->
      <div>
        <p class="serviceArea">服务区域</p>
        <div @click='selectArea()'>
            <span>
                <img src="../../assets/images/editMaster.png" alt="">
            </span>
          <span>修改</span>
        </div>
      </div>
      <!-- 服务工种 -->
      <div>
        <p class="serviceArea">服务工种</p>
        <div @click='selectWorker()'>
            <span>
                <img src="../../assets/images/editMaster.png" alt="">
            </span>
          <span>修改</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <p>注册时间: 2018-05-08</p>
      <p>认证时间: 2018-05-12</p>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        inputList: [
          {'label': '师傅编号', 'placeholder': '', 'disable': true, 'id': ''},
          {'label': '师傅手机号', 'placeholder': '', 'disable': true, 'id': ''},
          {'label': '身份证号码', 'placeholder': '', 'disable': true, 'id': '421123198906856925'},
          {'label': '紧急联系人', 'placeholder': '', 'disable': false, 'id': '凤舞九天'},
          {'label': '紧急联系人号码', 'placeholder': '', 'disable': false, 'id': '13526895645'},
          {'label': '师傅等级', 'placeholder': '', 'disable': true, 'id': '中级'},
        ],
        masterInfo: {}
      }
    },
    created() {
      this.getMasterDetails();
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
      getMasterDetails() {
        let url = this.$common.apidomain + "/masterinfo/finddetail?id=" + JSON.parse(sessionStorage.getItem('masterDetail')).id;
        this.$http.get(url).then(res => {
          let data = res.data;
          if (data.code === "0000") {
            console.log(data.result, '//////')
            this.masterInfo = data.result.masterInfo;
            this.inputList[0].id = this.masterInfo.id;
            this.inputList[1].id = this.masterInfo.phoneNum;
            this.inputList[2].id = this.masterInfo.idNum;
            this.inputList[3].id = this.masterInfo.emergencyContact;
            this.inputList[4].id = this.masterInfo.emergencyPhoneNum;
            if (this.masterInfo.level === 'Primary') {
              this.inputList[5].id = '初级师傅';
            } else if (this.masterInfo.level === 'MiddleRank') {
              this.inputList[5].id = '中级师傅';
            } else {
              this.inputList[5].id = "高级师傅";
            }
            console.log(this.masterInfo, 'masterInfo')
          } else {
            this.$Toast(data.error);
          }
        })
      }

    }
  }
</script>
<style scoped lang="less">
  .addMasterList {
    width: 100%;
    position: absolute;
    top: -.96rem;
    //background:rgba(241,241,241,1);
  }

  .inputList {
    background: #FFFFFF;
    padding: 0 .6rem;
    .masterName {
      // width:108px;
      margin: .6rem 0 0 .15rem;
      height: .5rem;
      font-size: .36rem;
      font-family: PingFangSC-Semibold;
      color: rgba(57, 57, 57, 1);
      line-height: .5rem;
      //border:.01rem solid gray;
      font-weight: 600;
      > span {
        width: 1.2rem;
        height: .42rem;
        margin: 0.04rem .41rem;
        background: rgba(255, 255, 255, 1);
        border-radius: .22rem;
        border: .01rem solid RGBA(83, 107, 210, 1);
        color: RGBA(83, 107, 210, 1);
        text-align: center;
        font-size: .24rem;
        font-weight: 500;
        line-height: .42rem;
        display: inline-block;
      }
    }
    ul {
      margin-top: .49rem;
    }
    label, p {
      width: 100%;
      height: .4rem;
      font-size: .28rem;
      font-family: PingFangSC-Regular;
      color: RGBA(136, 136, 136, 1);
      line-height: .4rem;
    }
    label {
      margin-left: .15rem;
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
        color: RGBA(57, 57, 57, 1);
        text-indent: .16rem;
      }
      .bgcolor {
        background: RGBA(238, 238, 238, 1);
        color: RGBA(136, 136, 136, 1);
      }
    }
    select {
      width: 3rem;
      height: .9rem;
      background: rgba(238, 238, 238, 1);
      border-radius: .1rem;
      margin-bottom: .67rem;
    }
    select:nth-of-type(1) {
      margin-right: .2rem;
    }
    > div:nth-of-type(2), > div:nth-of-type(3) {
      position: relative;
      .serviceArea {
        color: RGBA(83, 107, 210, 1);
        height: .64rem;
        line-height: .64rem;
        margin-bottom: .26rem;
      }
      > div {
        position: absolute;
        right: 0;
        top: 0rem;
        width: 1.52rem;
        height: .64rem;
        background: rgba(223, 81, 98, 1);
        border-radius: .08rem;
        > span:nth-of-type(1) {
          display: inline-block;
          width: .3rem;
          height: .3rem;
          margin: .17rem .12rem .17rem .27rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        > span:nth-of-type(2) {
          display: inline-block;
          position: absolute;
          bottom: -.4rem;
          width: .56rem;
          height: .4rem;
          font-size: .28rem;
          font-family: PingFangSC-Regular;
          color: rgba(255, 255, 255, 1);
          line-height: .4rem;
          margin-bottom: .5rem;
        }
      }
    }
  }

  .bottom {
    width: 7.5rem;
    height: 1.29rem;
    background: RGBA(241, 241, 241, 1);
    padding: .24rem 0 .3rem .62rem;
    > p {
      //width:;
      height: .33rem;
      font-size: .24rem;
      font-family: PingFangSC-Regular;
      color: rgba(136, 136, 136, 1);
      line-height: .33rem;
    }
  }
</style>
