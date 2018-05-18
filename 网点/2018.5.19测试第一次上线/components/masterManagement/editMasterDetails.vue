<template>
  <div class="addMasterList">
    <C_header title="编辑详情" left_number='2' right_number='3' :submit='submit' @isClose="isClose"></C_header>
    <div class="inputList">
      <div class="masterName">
        {{masterInfo.name}}
        <span>{{masterInfo.workState | masterList}}</span>
      </div>
      <ul>
        <li v-for="(item,index) in inputList" :key="index">
          <label>{{item.label}}</label>
          <input type="text" :disabled='item.disable' :class='{bgcolor:item.disable,el:!item.disable}' v-model="item.id"
                 v-on:blur='changeText()'>
        </li>
      </ul>
      <p>服务城市</p>
      <div class="selectCity">
        <span><img src="../../assets/images/selectArrow.png"></span>
        <span><img src="../../assets/images/selectArrow.png"></span>
        <select v-model="selectProvince">
          <!-- <option>请选择</option> -->
          <option value="0" selected>广东</option>
        </select>
        <select v-model="selectCity">
          <!-- <option>请选择</option> -->
          <option v-for="(item,index) in cityList" :key='index' :value="item.id" selected>{{item.name}}</option>
        </select>
      </div>
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
      <div>{{areaText}}</div>
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
      <div>{{workerText}}</div>
    </div>
    <div class="bottom">
      <p>注册时间: 2018-05-08</p>
      <p>认证时间: 2018-05-12</p>
    </div>
    <div v-if='isShow'>
      <div class="backLayer"></div>
      <div class='upLayer'>
        <div class='top'>
          <span @click='cancels()'><img src="../../assets/images/close.png"></span>
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
        inputList: [
          {'label': '师傅编号', 'placeholder': '', 'disable': true, 'id': ''},
          {'label': '师傅手机号', 'placeholder': '', 'disable': true, 'id': ''},
          {'label': '身份证号码', 'placeholder': '', 'disable': true, 'id': ''},
          {'label': '紧急联系人', 'placeholder': '', 'disable': false, 'id': ''},
          {'label': '紧急联系人号码', 'placeholder': '', 'disable': false, 'id': ''},
          {'label': '师傅等级', 'placeholder': '', 'disable': true, 'id': ''},
        ],
        isShow: false,
        selectProvince: "",
        selectCity: "",
        cityList: [],            //城市
        masterInfo: {},
        workerID: [],   //接收后台工种id
        workerLabel: [],
        areaId: [],    //区域id
        areaLabel: [],
        serviceWorker: {},
        serviceArea: {},
        workerText: '',
        areaText: ''
      }
    },
    created() {
      this.getCityList();
      this.getMasterDetails();
      this.serviceArea = this.$store.getters.serviceArea;
      this.serviceWorker = this.$store.getters.serviceWorker;
      this.inputList[3].id = this.$store.getters.editDetails.emergencyContact;   //紧急联系人
      this.inputList[4].id = this.$store.getters.editDetails.emergencyPhoneNum;  //紧急联系人号码
      this.selectProvince = this.$store.getters.selectProvince;
      this.selectCity = this.$store.getters.city;
      this.workerText = this.serviceWorker.label.join(' , ');
      this.areaText = this.serviceArea.label.join(' , ');
    },
    watch: {
      inputlist(newVal, oldVal) {
        // console.log('有变动')
      }
    },
    methods: {
      //取消
      isClose(v) {
        this.isShow = v;
      },
      cancel() {
        this.$router.push({path: '/master'});
      },
      cancels() {
        this.isShow = false;
      },
      confirm() {
        this.$router.push({path: '/master'})
      },
      //失去焦点事件
      changeText() {
        let input = document.getElementsByClassName('el');
        // console.log(input.value,'..')
        this.setMaster();

      },
      //挂载师傅详情
      setMaster() {
        let editDetails = {};
        editDetails.emergencyContact = this.inputList[3].id;           //紧急联系人
        editDetails.emergencyPhoneNum = this.inputList[4].id;          //紧急联系人电话
        editDetails.selected = true;          //紧急联系人电话
        this.$store.dispatch('editDetails', editDetails);
      },
      //挂载数据
      setStore() {

        //服务区域
        let serviceArea = {}
        serviceArea.id = this.areaId;
        serviceArea.label = this.areaLabel;
        this.$store.dispatch('serviceArea', serviceArea);

        //服务工种
        let serviceWorker = {}
        serviceWorker.id = this.workerID;
        serviceWorker.label = this.workerLabel;
        this.$store.dispatch('serviceWorker', serviceWorker);
      },
      //选择服务区域
      selectArea() {
        //挂载数据到store
        if (this.selectCity.length == 0 || this.selectProvince.length == 0) {
          this.$Toast('请选择服务城市')
          return;
        }
        this.setMaster()
        this.setStore();
        this.$router.push({path: '/serviceArea'});

      },
      //选择服务工种
      selectWorker() {
        this.setMaster()
        this.setStore();
        this.$router.push({path: '/serviceWorker'});
      },
      getMasterDetails() {
        let url = this.$common.apidomain + "/masterinfo/finddetail?id=" + JSON.parse(sessionStorage.getItem('masterDetail')).id;
        this.$http.get(url).then(res => {
          let data = res.data;
          if (data.code === "0000") {
            this.masterInfo = data.result.masterInfo;
            this.inputList[0].id = this.masterInfo.id;
            this.inputList[1].id = this.masterInfo.phoneNum;
            this.inputList[2].id = this.masterInfo.idNum;
            let editDetails = {};
            editDetails.emergencyContact = this.masterInfo.emergencyContact;           //紧急联系人
            editDetails.emergencyPhoneNum = this.masterInfo.emergencyPhoneNum;         //紧急联系人电话
            this.$store.dispatch('editDetails', editDetails);
            this.$store.dispatch('selectProvince', "0")
            this.$store.dispatch('city', "0101")
            if (this.masterInfo.level === 'Primary') {
              this.inputList[5].id = '初级师傅';
            } else if (this.masterInfo.level === 'MiddleRank') {
              this.inputList[5].id = '中级师傅';
            } else {
              this.inputList[5].id = "高级师傅";
            }
            //
            data.result.areas.forEach((v, i) => {
              this.areaId.push(v.id);
              this.areaLabel.push(v.label)
            });
            data.result.skills.forEach((v, i) => {
              this.workerID.push(v.id);
              this.workerLabel.push(v.label);
            })
            this.setStore();

          } else {
            this.$Toast(data.error);
          }
        })
      },
      //城市数据
      getCityList() {
        let url = this.$common.apidomain + "/common/findcitylistareainfo"     //服务城市列表
        this.$http.get(url).then(res => {
          let data = res.data;
          if (data.code === '0000') {
            this.cityList = data.result;
          } else {
            this.$Toast(data.error)
          }
        })
      },
      params() {

        return {
          areaIds: this.serviceArea.id.join(','),                    //服务区域
          skillIds: this.serviceWorker.id.join(','),                     //服务工种
          city: this.cityList[0].name,                       //城市名称
          cityId: this.cityList[0].id,                     //城市id
          emergencyContact: this.inputList[3].id,           //紧急联系人
          emergencyPhoneNum: this.inputList[4].id,           //紧急联系人电话
          id: JSON.parse(sessionStorage.getItem('masterDetail')).id
        }
      },
      submit() {
        let url = this.$common.apidomain + '/masterinfo/changeInfo';
        this.$http.post(url, this.params()).then(res => {
          let data = res.data;
          if (data.code === '0000') {
            this.$Toast('修改成功')
            this.$router.go(-1);
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
      margin-top: -5rem;
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
        color: RGBA(83, 107, 210, 1);
        width: 2.99rem;
        border-right: .01rem solid RGBA(151, 151, 151, 1);
      }
      p:nth-of-type(2) {
        color: RGBA(136, 136, 136, 1);
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

  .inputList {
    background: #FFFFFF;
    padding: 0 .6rem;
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
    > div:nth-of-type(3), > div:nth-of-type(5) {
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
