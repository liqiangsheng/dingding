<template>
  <div id="app">
    <div>
      <AddAlter @isClose="isClose" v-if="addShow" @pejianzengjia="pejianzengjia" :cityId="cityId"
                :QuDaoId="QuDaoId"></AddAlter>
      <AddAlterOne @isClose="isClose" v-if="addShowONE" @pejianzengjia="pejianzengjia" :bianjiData1="bianjiData1"
                   :cityId="cityId" :QuDaoId="QuDaoId"></AddAlterOne>
      <BianjiAlter @isClose="isClose" v-if="bianjiShow" @pejianzengjia="pejianzengjia" :bianjiData="bianjiData"
                   :cityId="cityId" :QuDaoId="QuDaoId"></BianjiAlter>
      <LookAtMoreAlter @isClose="isClose" v-if="lookAtMoreShow" @pejianzengjia="pejianzengjia" @flaga="flaga"
                       :QuDaoId="QuDaoId" :numID="numID" :cityId="cityId"></LookAtMoreAlter>
      <div>
        <div class="yuyue">
          <p class="yuyueP"><span></span>预约信息（带<b style="color: #EA5413">*</b>为必填）</p><br>
          <ul>
            <li>　　联系人<span>*</span>
              <el-input v-model="input1" @blur="input1Blur" placeholder="请填写联系人" style="width: 200px"></el-input>
              <span v-show="inputOne" style="color: red;">{{inputOne}}</span>
            </li>
            <li>联系人手机<span>*</span>
              <el-input v-model="input2" @blur="input2Blur" placeholder="请填写正确手机号码" style="width: 200px"></el-input>
              <span v-show="inputTwo" style="color: red;">{{inputTwo}}</span>
              　　　<b style="font-weight:100; margin: 0 20px">座机</b>
              <el-input v-model="input6" placeholder="请填写正确座机（非必填）" style="width: 200px"></el-input>
            </li>
            <li id="citycity" v-show="isShowCity">　服务地区<span>*</span>
              <!--expand-trigger="hover"-->
              <el-cascader
                style="width:200px;"
                :disabled="cityOneShow"
                :options="options"
                :props="props"
                placeholder="请选择城市"
                v-model="selectedOptions2"
                @change="handleChange">
              </el-cascader>
              街道<span>*</span>
              <el-cascader id="city" style="width:200px;"
                           @change="changeSelector($event)"
                           ref="one"
                           :options="serveAreas"
                           placeholder="请选择区域"
                           v-model="selectedOptions1"
                           :props="props2"
              ></el-cascader>
              <el-button  type="primary"
                         @click="goBack()"> 返回
              </el-button>
            </li>
            <li>
              <!--腾讯地图控件start-->
              <div class="list_name">
                小区/大厦
              </div>
              :
              <el-input class="iconfo_city" :disabled="isShowCity" placeholder="小区/大厦" style="width:30%;"
                        v-model="addressData.value" @blur="getAddress(addressData)"></el-input>
              &nbsp;
              &nbsp; <span v-if="!!addressData.cityInfo&&!isShowCity&&addressData.addressComponent">
              {{addressData.addressComponent.province}}{{addressData.addressComponent.city}}{{addressData.addressComponent.district}}{{typeof addressData.addressComponent.township === 'object' ? '' : addressData.addressComponent.township}}
            </span>
              <el-button v-if="(!!addressData.cityInfo&&!isShowCity)||amendAddress" type="primary"
                         @click="correct(addressData)"> 纠正
              </el-button>
              <!--腾讯地图控件end-->
            </li>
            <li>　详细地址<span>*</span>
              <el-input v-model="input4" @blur="input4Blur" placeholder="请填写详细地址" style="width: 200px"></el-input>
              <span v-show="inputFour" style="color: red;">{{inputFour}}</span>
            </li>
            <li id="shijian">　预约时间<span></span>   <!--新增-->  <!--<DatePicker type="datetime" v-model="input5" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择预约日期" style="width: 200px;height: 36px"></DatePicker>&lt;!&ndash;</Col>&ndash;&gt;-->
              <DatePicker type="date" v-model="input5" :options="options3" placeholder="请选择预约日期" :style="timeStyle"
                          @focus.native.capture="timeSlotOne()"></DatePicker>
              <div class="timeOptions" style="position: relative;" v-show="timeInputShow">
                时间段<span></span>
                <el-input style="width: 200px" :disabled="timeBoxShowOne" type="text" v-model="timeOptions"
                          @focus="timeSlot()" placeholder="请选择预约时间段"></el-input>
                <img class="timeImg" src="/static/images/time.png" @click="emtyTime()">
                <div class="timeSlot" v-show="timeBoxShow">
                  <p><span @click="restDate()">重新选择日期</span><span>选择上门时间</span></p>
                  <ul>
                    <li id="hour" v-for="(item,index) in hour" v-if="item.bool==false">
                      <!--<el-button :disabled="item.bool" :class="{timeActive:timeIndex == index}"-->
                                 <!--@click="timeClick(item,index)" type="info"><i v-if="item.bool"></i>{{item.time}}-->
                      <!--</el-button>-->
                      <el-button :class="{timeActive:timeIndex == index}" @click="timeClick(item,index)" type="info">{{item.time}}</el-button>
                    </li>
                  </ul>

                </div>
              </div>
              <span v-show="inputFive" style="color: red;margin-left: 20px">{{inputFive}}</span>
              <span  v-show="timeOptionOne" style="color: red;margin-left: 20px">{{timeOptionOne}}</span>
            </li>
            <li>
              <div class="ziqudao">
                <p class="ziqudaoP">　主渠道
                  <el-select v-model="value1" placeholder="请选择主渠道" @change="zuqudaoA(value1)">
                    <el-option
                      v-for="(item,index) in zhuqudao"
                      :key="index"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                  　　子渠道:
                  <el-select v-model="value" placeholder="请选择子渠道" @change="ziqudaoA(value)" :disabled="disabled">
                    <el-option
                      value="0"
                      v-for="(item,index) in ziqudao"
                      :key="index"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </p>

              </div>
            </li>
            <li>
              渠道商订单号
              <el-input v-model="channelDealer  "  placeholder="选填" style="width: 200px;margin-left: 10px;"></el-input>
            </li>
          </ul>
        </div>
        <div class="chanpin">
          <p class="chanpinP"><span></span>产品信息</p><br>
          <span style="color: #EA5413">请选择服务产品*</span>
          <el-button type="success" @click="addProduct" v-if="xiaohui">添加产品</el-button>
          <el-button type="success" @click="addProduct1" v-if="xiaohui1">继续添加</el-button>
         <span v-show="peijiankuangOne" style="color: red">{{peijiankuangOne}}</span>
          <!--新增-->
          <div id="history" v-if="historyDataShow" :style="historyAddStyle">
            <p>历史下单<br>(快捷选择)</p>
            <ul>
              <li v-for="(item,index) in historyData" @click="historyAdd(item,index)"
                  :class="{historyActive:historyIndex==index}">
                {{item.serviceFullName}}<br>
                {{item.serviceBrand}}　{{item.serviceModel}}
              </li>
            </ul>
            <p class="more" @click="lookAtMore">查看更多</p>
            <el-button type="primary" style="position: absolute;left: 7%;bottom: 20px" v-if="historyAddShow"
                       @click="addOK">确定添加
            </el-button>
          </div>
          <div class="alertOne" v-if="peijiankuang">
            <!--表格数据-->
            <table cellSpacing="0px" cellpadding="0">
              <thead>
              <tr class="theads">
                <th v-for="(item,index) in theadsName">{{item}}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in tableListData" id="trHover">
                <!--序号-->
                <td>
                  {{index + 1}}
                </td>
                <!--产品名称-->
                <td style="flex-grow:3">
                  {{item.serviceInfo.fullName}}
                </td>
                <!--品牌-->
                <td>
                  {{item.serviceBrand}}
                </td>
                <!--型号-->
                <td>
                  {{item.serviceModel}}
                </td>
                <!--数量-->
                <td>
                  {{item.size}}
                </td>
                <!--检测费-->
                <td>
                  {{item.serviceInfo.price1}}
                </td>
                <!--服务费-->
                <td>
                  {{item.serviceInfo.price2DiscountFee}}
                  <!--操作-->
                </td>
                <td>
                  <span class="track" @click="detailClick(item,index)">删除</span>
                  <span class="detail" @click="bianjiClick(item,index)">编辑</span>
                </td>
              </tr>
              </tbody>
            </table>
            <!--表格数据结束-->
            <ul class="feiyongList">
              <li>检测费小计：{{zongjia.toFixed(2)}}</li>
              <li>服务费小计：{{fuwufei.toFixed(2)}}</li>
              <li>预估价：{{yujifei.toFixed(2)}}</li>
            </ul>

          </div>
        </div>

        <section style="margin-bottom:2em;">
          <div class="list_name" style="min-width: 10em;color:#23A1FE;font-size:15px;text-align: left">
            已收定金（选填）
          </div>
          <el-input v-model="payedPrice" type="number" min="1"></el-input>
        </section>

        <ul class="jinji">
          <li class="jinjiduP"><span></span><b style="float: left;font-weight: 100">紧急程度</b>
            <p @click="danxuan3(item,index)" v-for="(item,index) in jinjidu">
              <el-button>{{item}}</el-button>
              <img src="/static/images/danxuan.png" v-show="jinjiduIndex == index"></p>
          </li>
        </ul>


        <ul class="zhibao" v-show="qudaoShow">
          <li class="zhibaoP"><span></span><b style="float: left;font-weight: 100">渠道质保</b>
            <p @click="danxuan2(item,index)" v-for="(item,index) in zhibao">
              <el-button>{{item}}</el-button>
              <img src="/static/images/danxuan.png" v-show="jinjiduIndex1 == index"></p>
          </li>
        </ul>
        <div>
          <p id="beizhu" class="qitaP" style="width: 100%;height: 100px;position: relative"><span>　　　备注</span>
            <el-input
              type="textarea"
              placeholder="请填写其他备注"
              v-model="qita">
            </el-input>
          </p>
          <p class="addTijiao" style="width: 90%;margin:20px 8%;">
            <el-button type="primary" :disabled="buttonDisabled" @click="addTijiao" style="width:200px">提交</el-button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AddAlter from "./alertInfoOnes/addAlert.vue" //增加
  import AddAlterOne from "./alertInfoOnes/addAlertOne.vue" //增加1
  import BianjiAlter from "./alertInfoOnes/bianjiAlert.vue"  //编辑
  import LookAtMoreAlter from "./alertInfoOnes/lookAtMoreAlterOne.vue"  //查看更多历史记录
  import {TimestampCalculation, ArraySlice} from "./js/TimestampCalculationone"

  export default {
//      inject:["reload"],  //局部刷新
    components: {
      AddAlter, BianjiAlter, AddAlterOne, LookAtMoreAlter
    },
    data() {
      return {
        buttonDisabled:false, //点击提交按钮禁用
        isTip:false,
        tipText:'',     //地址错误提示
        address:{
          value: ""
        },    //复制的地址
        province:'',   //省
        provinceList:[],
        city:'',
        cityList:[],
        area:'',
        areaList:[],
        street:'',
        streetList:[],


        channelDealer:'',
        tabPathList:this.$store.state.tabPathList,
        inputOne:"", //联系人异常
        inputTwo:"",//联系人手机异常
        inputFour: "",//　详细地址异常*
        inputFive: "",//　　预约时间异常*
        timeOptionOne:"",//时间段异常
        peijiankuangOne : "",//请添加服务产品异常
        cityOneShow: false,
        historyIndex: -1,
        amendAddress: false,
        yijiName: "",//一级分类
        historyObjData: {},//
        payedPrice: "",
        historyAddData: "",//历史数据
        historyAddStyle: {height: "90px"},//历史记录的样式
        historyAddShow: false,//确定按钮显示
        historyDataShow: false, //历史记录显示
        lookAtMoreShow: false, //更多显示
        historyData: [], //首页显示的历史记录
        timeStyle: {width: "320px", height: "36px","margin-left":"4px"},
        timeInputShow: false,
        timeBoxShowOne: true,
        timeBoxShow: false,
        newArry: [],
        allTime: "",//日期加时间段
        timeIndex: -1,  //选中下标
        hour: [{bool: false, time: "00:00-01:00", num: 1}, {bool: false, time: "01:00-02:00", num: 2},
          {bool: false, time: "02:00-03:00", num: 3}, {bool: false, time: "03:00-04:00", num: 4},
          {bool: false, time: "04:00-05:00", num: 5}, {bool: false, time: "05:00-06:00", num: 6},
          {bool: false, time: "06:00-07:00", num: 7}, {bool: false, time: "07:00-08:00", num: 8},
          {bool: false, time: "08:00-09:00", num: 9}, {bool: false, time: "09:00-10:00", num: 10},
          {bool: false, time: "10:00-11:00", num: 11}, {bool: false, time: "11:00-12:00", num: 12},
          {bool: false, time: "12:00-13:00", num: 13}, {bool: false, time: "13:00-14:00", num: 14},
          {bool: false, time: "14:00-15:00", num: 15}, {bool: false, time: "15:00-16:00", num: 16},
          {bool: false, time: "16:00-17:00", num: 17}, {bool: false, time: "17:00-18:00", num: 18},
          {bool: false, time: "18:00-19:00", num: 19}, {bool: false, time: "19:00-20:00", num: 20},
          {bool: false, time: "20:00-21:00", num: 21}, {bool: false, time: "21:00-22:00", num: 22},
          {bool: false, time: "22:00-23:00", num: 23}, {bool: false, time: "23:00-00:00", num: 24},
        ],//小时
        timeOptions: "",//时间段预约
        timeOptionsTime: "",
        options3: {
          disabledDate(date) { // - 86400000一天的时间
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        isShowCity: false,
        isShowCity1: false,
        qudaoShow: false,
        disabled: true,
        addressData: {
          value: ""
        },
        zhuqudao: [],//主渠道
        zhuqudaoId: "",//主渠道ID
        value1: "",////主渠道值
        //区域start
        cityId: "",
        selectedOptions2: [], //城市选择
        selectedOptions1: [],//区域选择
        options: [],
        props: {
          value: 'id',
          label: 'label',
          children: 'cities'
        },
        serveAreas: [],
        props2: {
          value: 'id',
          label: 'label',
          children: 'cities',
        },
        //区域end
        jinjiduIndex: 0,//紧急度下标
        jinjiduIndex1: 0,//渠道质保下标
        zhibao: ["质保外", "质保内"],//质保
        zhibaoStr: "0",
        jinjiduStr: "0",
        jinjidu: ["正常", "加急"],//紧急度
        bianjiShow: false, //编辑唐匡
        theadsName: ["序号", "产品名称", "品牌", "型号", "数量", "检测费", "服务费", "操作"],
        input1: "", //　联系人
        input2: "",//　联系人手机
        input4: "",//　详细地址*
        input5: "",//　　预约时间*
        input6: "",//　座机
        qita: "",//其他
        ziqudao: [],//子渠道
        value: "",//子渠道
        addShow: false,      //增加配件弹框
        addShowONE: false,     //增加配件11
        peijiankuang: false,  //配件显示宽
        xiaohui: true,
        xiaohui1: false,
        tableListData: [], //展示数据
        bianjiData: {}, //编辑数据
        bianjiData1: {}, //编辑数据
        linkmanAreaId: "",//街道ID
        linkmanName: "", //街道名字
        flag: true,
        chushiId: "", //子渠道id
        xiaoqudaoId: "",//小子渠道Id
        chongzhiShow: false, //充值显示
        chongzhiShow1: false, //充值显示成功
        flagOne: 1,
        zongjia: 0,
        fuwufei: 0,
        yujifei: 0,
        mainOrderId: "",// 订单Id
        settleType: "",//主渠道类型
        QuDaoId: "",
        bianjiIndex: "",
        numID: "",  //新增给传值
      }
    },
    computed: {},
    created() {
      //主渠道
      let findchannelurl = common.apidomain + "/common/findChannelByNormal";
      this.$http.get(findchannelurl).then(res => {
        if (res.data.code === "0000") {
          this.zhuqudao = [{id: "", name: "--请选择--"}, ...res.data.result];
        }

      });
//城市
      let cityurl = `${this.$apidomain}/common/findprovinceandcitylist`;
      this.$http.get(cityurl).then(res => {
        if (res.data.code === '0000') {
          this.options = res.data.result;
        }
      });

    },
    watch: {
      //自动识别地址
      'addressData.value':function(newVal,oldVal){
        if(newVal.lastIndexOf('街道') !==-1){
          this.input4 = newVal.split('街道')[1]
        }else if(newVal.lastIndexOf('街道') ==-1&&newVal.lastIndexOf('区') !==-1){
          this.input4 = newVal.split('区')[1]
        }else if(newVal.lastIndexOf('街道') ==-1&&newVal.lastIndexOf('区') ==-1 &&newVal.lastIndexOf('市') !==-1){
          this.input4 = newVal.split('市')[1]
        }else{
          this.input4 = newVal

        }
      },


      "addressData.addressComponent": function (e) {
        console.log(e.citycode)
        const url = `${this.$apidomain}/areainfo/getAreaIdByCityCode?cityCode=${e.citycode}`
        this.$http.get(url).then(res => {
          console.log(res)
          const data = res.data;
          if (data.code === "0000") {
            this.cityId = data.result
          } else {
            this.$queryFun.successAlert.call(this, data.error)
          }
        })
      },
      tableListData: function (newLength, oldlength) {
        if (newLength.length > 0) {
          this.peijiankuangOne = "";
          this.cityOneShow = true;
          this.isShowCity = true;
          this.numID = newLength[0].fenlei;
          // 新增
          let ControllerUrl = `${this.$apidomain}/officialProductLabelController/all?page=1&rows=20&type=1&serviceId=${this.numID}&areaId=${this.cityId}`;
          this.$http.get(ControllerUrl).then(res => {
            if (res.data.code === "0000") {
              this.historyAddShow = false;
              this.isHistoryAddShow();
              this.historyCarter(res.data.result.list);
            } else {
              this.$queryFun.successAlert.call(this, res.data.error);
            }
          })
        } else {
          this.cityOneShow = false;
          this.isShowCity = false;
          this.numID = "";
          let ControllerUrl = `${this.$apidomain}/officialProductLabelController/all?type=1&areaId=${this.cityId}`;
          this.$http.get(ControllerUrl).then(res => {
            if (res.data.code === "0000") {
              this.historyAddShow = false;
              this.isHistoryAddShow();
              this.historyCarter(res.data.result.list);
            } else {
              this.$queryFun.successAlert.call(this, res.data.error);
            }
          })

        }
      },
      input5: function (newInput, oldInput) {
        if (newInput) {
          this.timeBoxShowOne = false;
          this.timeInputShow = true;
          this.timeStyle = {width: "200px", height: "36px","margin-left":"4px"}
        } else {
          this.timeInputShow = false;
          this.timeBoxShowOne = true;
          this.timeBoxShow = false;
          this.timeStyle = {width: "320px", height: "36px","margin-left":"4px"}
        }
        if (this.$moment(Date.now()).format("YYYY-MM-DD") == this.$moment(newInput).format("YYYY-MM-DD")) {
          let aaa = new Date().getHours();
          this.hour.forEach((v, i) => {
            if (aaa + 2 > v.num) {
              v.bool = true;
              this.timeIndex = i + 1;
            }
          })
        } else {
          let aaa = new Date().getHours();

          this.hour.forEach((v, i) => {
            v.bool = false;
            this.timeIndex = 0;
          })
        }
      },
      input1:function(new1,old1){
        if(new1 != ""){
          let res2 = /^[\u4e00-\u9fa5a-zA-Z0-9]{1,20}$/;
          if(res2.test(new1) == false ){
            this.inputOne = " 请填写联系人，长度不超过20字符，不可输入特殊符号"
          }else{
            this.inputOne = ""
          }
        }
      },
      input2:function(new1,old1){
        if(new1 != ""){
          if(new1.length == 11){
            this.inputTwo = ""
          }else{
            this.inputTwo = "请填写正确手机号，长度为11位数字"
          }

        }
      },
      input4:function(new1,old1){
        if(new1 != ""){
          this.inputFour = ""
        }
      },
      timeOptions:function(new1,old1){
        if(new1 != ""){
          this.timeOptionOne = ""
        }
      }
    },
    methods: {
      goBack(){
        this.isShowCity = false;
      },
      input1Blur(){
        if(this.input1){
          let res2 = /^[\u4e00-\u9fa5a-zA-Z0-9]{1,20}$/;
          if(res2.test(this.input1) == false ){
            this.inputOne = " 请填写联系人，长度不超过20字符，不可输入特殊符号"
          }else{
            this.inputOne = ""
          }
        }else{
          this.inputOne = "请填写联系人姓名";
        }
      },
      input2Blur(){
        let reg = /^1\d{10}$/;
        if(this.input2){
          if(this.input2 == 11 || reg.test(this.input2) == true){
            this.inputTwo = ""
          }else{
            this.inputTwo = "请填写正确手机号，长度为11位数字"
          }
        }else{
          this.inputTwo = "请填写联系人手机号";
        }
      },
      input4Blur(){
        if(this.input4){
          this.inputFour = "";
        }else{
          this.inputFour = "请填写详细地址";
        }
      },
      isHistoryAddShow() { //是否显示确定按钮
        if (this.historyAddShow == false) {
          this.historyAddStyle = {height: "90px"}
        } else {
          this.historyAddStyle = {height: "147px"}
        }
      },
      historyCarter(historyCarterLength) {  //新建工单页面历史记录显示数据
        if (historyCarterLength.length >= 4) {
          this.historyDataShow = true;
          this.historyData = historyCarterLength.slice(0, 4)
        } else if (historyCarterLength.length < 4 && historyCarterLength) {
          this.historyDataShow = true;
          this.historyData = historyCarterLength;
        } else if (!historyCarterLength) {
          this.historyDataShow = false;
        }
      },
      flaga(v) {
        this.flagOne = v;
      },
      addOK() {//确定添加
        if (this.input1 == "") {
          this.inputOne = "请填写联系人姓名"
          return
        }else{
          this.inputOne = ""
        }

        if (this.input2 == "") {
          this.inputTwo = "请填写联系人手机号"
          return
        }else{
          this.inputTwo = "";
        }
        let reg = /^1\d{10}$/;
        if (reg.test(this.input2) == false) {
          this.inputTwo = "请填写正确手机号，长度为11位数字"
          return
        }else{
          this.inputTwo = ""
        }
        if (this.selectedOptions1.length <= 0 && !Object.keys(this.addressCode(this.addressData.addressComponent)).length) {
          return this.$queryFun.successAlert.call(this, "请选择城市，街道");
        }
        if (this.input4 == "") {
          this.inputFour ="请填写详细地址"
          return
        }else{
          this.inputFour =""
        }

        let bbb = this.historyAddData.serviceId.substring(0, this.historyAddData.serviceId.length - 3);
        this.xiaoqudaoid = this.$store.state.xiaoqudaoId ? this.$store.state.xiaoqudaoId : JSON.parse(sessionStorage.getItem("userInfo"))[0].id;
        let urlThree = this.$common.apidomain + "/articleinfo/findChannelListServiceInfo?labelId=" + bbb + "&areaId=" + this.$store.state.cityIdid + "&relevanceKey=" + this.xiaoqudaoid;

        this.$http.get(urlThree).then(res => {
          this.abcdefg = ArraySlice(res.data.result.serviceInfo.labelId);
          if (res.data.code === "0000") {
            this.historyObjData.numData = this.abcdefg;
            this.historyObjData.fenlei = this.historyAddData.serviceId.substring(3, -3);
            this.historyObjData.serviceBrand = this.historyAddData.serviceBrand;
            this.historyObjData.serviceModel = this.historyAddData.serviceModel;
            this.historyObjData.serviceId = this.historyAddData.serviceId;
            this.historyObjData.serviceInfo = res.data.result.serviceInfo;
            this.historyObjData.serviceSize = 1;
            this.historyObjData.serviceTags = res.data.result.serviceInfo.tags;
            this.flagOne = 4;
            this.pejianzengjia(JSON.stringify(this.historyObjData));
            this.$queryFun.successAlert.call(this, "添加成功");
          } else {
            return this.$queryFun.successAlert.call(this, res.data.error);
          }
        })
      },
      historyAdd(v, i) { //点击添加显示
        this.historyIndex = i;
        this.historyAddData = v;
        this.historyAddShow = true;
        this.isHistoryAddShow();
      },
      lookAtMore() { //查看更多
        if (this.input1 == "") {
          this.inputOne = "请填写联系人姓名"
          return
        }else{
          this.inputOne = ""
        }
        if (this.input2 == "") {
          this.inputTwo = "请填写联系人手机号"
          return
        }else{
          this.inputTwo = ""
        }
        let reg = /^1\d{10}$/;
        if (reg.test(this.input2) == false) {
          this.inputTwo = "请填写正确手机号，长度为11位数字"
          return
        }else{
          this.inputTwo = ""
        }
        if (this.selectedOptions1.length <= 0 && !Object.keys(this.addressCode(this.addressData.addressComponent)).length) {
          return this.$queryFun.successAlert.call(this, "请选择城市，街道");
        }
        if (this.input4 == "") {
          this.inputFour ="请填写详细地址"
          return
        }else{
          this.inputFour =""
        }
        this.lookAtMoreShow = true;
      },
      emtyTime() {// 清楚时间段
        this.timeOptions = "";
        this.timeBoxShow = false;
      },
      restDate() {// 重新选择日期
        this.input5 = "";
        this.timeOptions = "";
        this.timeInputShow = false;
        this.$queryFun.successAlert.call(this, "请重新选择日期");
      },
      timeClick(v, i) {// 时间阶段选择
        this.timeIndex = i;
        this.timeOptions = v.time;
        this.timeOptionsTime = TimestampCalculation(v.time)
        this.timeBoxShow = false;
      },
      timeSlot() {
        this.timeBoxShow = true;
      },
      timeSlotOne() {
        this.timeBoxShow = true;
      },
      //返回
      goBack(){
        this.isShowCity = false;
      },
      //纠正
      correct() {
        //this.addressData = {value: ""};
        this.isShowCity = true;
        this.amendAddress = false
        this.isShowCity1 = true;
      },
      getAddress(e) {
        this.$queryFun.getAddress.call(this, e);
        if(e.value !==''&&e.value.lastIndexOf('省') !==-1&&e.value.lastIndexOf('市') !==-1&&e.value.lastIndexOf('区') !==-1&&e.value.lastIndexOf('街道') !==-1){
          this.province = e.value.split('省')[0]+'省';
          this.city = e.value.split('省')[1].split('市')[0]+'市';
          this.area = e.value.split('省')[1].split('市')[1].split('区')[0]+'区';
          this.street = e.value.split('省')[1].split('市')[1].split('区')[1].split('街道')[0]+'街道';
        }
      },

      zuqudaoA(value) { //主渠道
        this.zhuqudao.forEach((v, i) => {
          if (value == v.name) {
            this.zhuqudaoId = v.id;
            this.settleType = v.settleType;
            this.QuDaoId = v.id;
          }
        });
        //子渠
        this.value = '--请选择--'
//        this.ziqudao=[{id:this.zhuqudaoId,name:"--请选择--"}];
        let url1 = this.$apidomain + "/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo?officialPartnerId=" + this.zhuqudaoId;
        this.$http.get(url1).then(res => {
          if (res.data.code === "0000") {
            this.ziqudao = [{id: this.zhuqudaoId, name: "--请选择--"}, ...res.data.result];
            this.disabled = false;
          }
        });
        if (this.settleType == "1") {
          this.qudaoShow = true;
          this.zhibaoStr = "0";
        } else {
          this.qudaoShow = false;
          this.zhibaoStr = "2";
        }
      },

      ziqudaoA(value) { //子渠道
        this.ziqudao.forEach((v, i) => {
          if (value == v.name) {
            this.xiaoqudaoId = v.id;
            this.QuDaoId = v.id;
          }
        })
      },
      handleChange(value) {
        this.cityId = value[value.length - 1];
        this.$store.dispatch("cityIdid1", this.cityId);
//        this.$store.dispatch("cityIdid",this.cityId)
        //选择区域街道
        let cityIdurl = this.$apidomain + "/common/findareaandstreetoptions?cityId=" + this.cityId;//获取区域
        this.$http.get(cityIdurl).then(res => {
          this.serveAreas = res.data.result;
        })
        //历史记录
        let ControllerUrl = `${this.$apidomain}/officialProductLabelController/all?type=1&areaId=${this.cityId}`;
        this.$http.get(ControllerUrl).then(res => {
          if (res.data.code === "0000") {
            this.historyCarter(res.data.result.list);
          } else {
            this.$queryFun.successAlert.call(this, res.data.error);
          }
        })
      },
      changeSelector($event) {
        this.linkmanAreaId = this.selectedOptions1[this.selectedOptions1.length - 1];
        this.linkmanName = this.$refs.one.currentLabels[1];

      },

      addTijiao() { //提交
        if(this.qudaoShow == false){
          this.zhibaoStr = "2";
        }
        if (this.input1 == "") {
          this.inputOne = "请填写联系人姓名"
          return
        }else{
          this.inputOne = ""
        }
        if (this.input2 == "") {
          this.inputTwo = "请填写联系人手机号"
          return
        }else{
          this.inputTwo = ""
        }
        let reg = /^1\d{10}$/;
        if (reg.test(this.input2) == false) {
          this.inputTwo = "请填写正确手机号，长度为11位数字"
          return
        }else{
          this.inputTwo = ""
        }
        if (this.selectedOptions1.length <= 0 && !Object.keys(this.addressCode(this.addressData.addressComponent)).length) {
          return this.$queryFun.successAlert.call(this, "请选择城市，街道");
        }
        if (this.input4 == "") {
          this.inputFour ="请填写详细地址"
          return
        }else{
          this.inputFour =""
        }
        if (this.peijiankuang == false) {
          this.peijiankuangOne = "请选择服务产品";
          return
        }else{
          this.peijiankuangOne = "";
        }
        if (this.danxuanShow1 == false && this.danxuanShow2 == false) {
          return this.$queryFun.successAlert.call(this, "请选择质保状态");
        }
        if (this.danxuanShow3 == false && this.danxuanShow4 == false) {
          return this.$queryFun.successAlert.call(this, "请选择紧急程度");
        }
        this.buttonDisabled = true;
        this.query();
      },
      detailClick(v, i) {  //删除
        this.tableListData.splice(i, 1);
        let c = [];
        let d = [];
        this.tableListData.forEach((v, i) => {
          c.push(v.serviceInfo.price1)
          this.zongjia = Math.max.apply(null, c); //求最大值
          d.push(v.serviceInfo.price2DiscountFee * v.size)
          this.fuwufei = eval(d.join("+"));//求和
          this.yujifei = this.zongjia + this.fuwufei;  //求总金额
        })
        if (this.tableListData.length <= 0) {
          this.peijiankuang = false;
          this.xiaohui = true;
          this.xiaohui1 = false;
        }

      },
      bianjiClick(v, i) {  //编辑
        this.bianjiIndex = i;
        this.flagOne = 3;
        this.bianjiData = v;
        this.bianjiShow = true;
      },
      pejianzengjia(obj) {  //增加

        if (this.flagOne == 1) {
          this.bianjiData1 = obj;
          this.peijiankuang = true;
          this.tableListData.push(obj)
        } else if (this.flagOne == 2) {
          this.bianjiData1 = obj;
          this.peijiankuang = true;
          this.tableListData.push(obj)

        } else if (this.flagOne == 3) {
          this.bianjiData1 = obj;
          this.peijiankuang = true;
          this.tableListData.splice(this.bianjiIndex, 1, obj)
        } else if (this.flagOne == 4) {
          this.flagOne == 1;
          this.bianjiData1 = JSON.parse(obj);
          this.peijiankuang = true;
          this.tableListData.push(JSON.parse(obj))
        }
        console.log(this.tableListData)
        if (this.tableListData.length > 0) {
          this.xiaohui = false;
          this.xiaohui1 = true;
        } else if (this.tableListData.length <= 0) {
          this.xiaohui = true;
          this.xiaohui1 = false;
        }
        let c = [];
        let d = [];
        this.tableListData.forEach((v, i) => {
          c.push(v.serviceInfo.price1)
          this.zongjia = Math.max.apply(null, c); //求最大值
          d.push(v.serviceInfo.price2DiscountFee * v.serviceSize)
          this.fuwufei = eval(d.join("+"));//求和
          this.yujifei = this.zongjia + this.fuwufei;  //求总金额
        })
      },
      isClose(val) {//增加配件弹框
        this.addShow = val;
        this.addShowONE = val;
        this.bianjiShow = val;
        this.chongzhiShow = val; //充值显示
        this.chongzhiShow1 = val; //充值显示成功
        this.lookAtMoreShow = val;
      },


      addProduct1() {//添加产品

        this.flagOne = 2;
        this.xiaohui = false;
        if (this.input1 == "") {
          this.inputOne = "请填写联系人姓名"
          return
        }else{
          this.inputOne = ""
        }
        if (this.input2 == "") {
          this.inputTwo = "请填写联系人手机号"
          return
        }else{
          this.inputTwo = ""
        }
        let reg = /^1\d{10}$/;
        if (reg.test(this.input2) == false) {
          this.inputTwo = "请填写正确手机号，长度为11位数字"
          return
        }else{
          this.inputTwo = ""
        }
        if (this.selectedOptions1.length <= 0 && !Object.keys(this.addressCode(this.addressData.addressComponent)).length) {
          return this.$queryFun.successAlert.call(this, "请选择城市，街道");
        }
        if (this.input4 == "") {
          this.inputFour ="请填写详细地址"
          return
        }else{
          this.inputFour =""
        }
        this.addShowONE = true;
      },
      addressCode(data = null) {
        let cityData = {};
        if (data) {
          cityData.townCode = typeof data.towncode === "object" ? '' : data.towncode;
          cityData.adCode = data.adcode;
//          cityData.linkmanBuilding = this.addressData.value;
          cityData.linkmanBuilding = "";
          cityData.cityCode = data.citycode;
          this.linkmanAreaId = '';
          this.linkmanArea = "";
        }
        return cityData;
      },
      addProduct() {//添加产品
        this.flagOne = 1;
        this.xiaohui1 = false;

        if (this.input1 == "") {
          this.inputOne = "请填写联系人姓名"
          return
        }else{
          this.inputOne = ""
        }
        if (this.input2 == "") {
          this.inputTwo = "请填写联系人手机号"
          return
        }else{
          this.inputTwo = ""
        }
        let reg = /^1\d{10}$/;
        if (!reg.test(this.input2)) {
          this.inputTwo = "请填写正确手机号，长度为11位数字"
          return
        }else{
          this.inputTwo = ""
        }
        if (this.selectedOptions1.length <= 0 && !Object.keys(this.addressCode(this.addressData.addressComponent)).length) {
          return this.$queryFun.successAlert.call(this, "请选择城市，街道");
        }
        if (!this.cityId) {
          return this.$queryFun.successAlert.call(this, "该服务城市尚未开通")
        }
        if (this.input4 == "") {
          this.inputFour ="请填写详细地址"
          return
        }else{
          this.inputFour =""
        }
        this.addShow = true;
      },
      query() {  //初始数据
        if(this.input5 != ""){
          this.input5 = this.$moment(this.input5).format("YYYY-MM-DD HH:mm:ss");
          let date = new Date(this.input5);
          this.allTime = this.$moment(this.timeOptionsTime + date.getTime()).format("YYYY-MM-DD HH:mm:ss")
        }else{
          this.allTime = "";
        }

        this.getTableList(this.paramsData());
      },
      paramsData() {  //传数据给后台

        let aaaaaa = JSON.stringify(this.tableListData);
        return Object.assign({
          "thirdOrderId":this.channelDealer,     //渠道商订单号
          "officialPartnerId": this.zhuqudaoId, //主渠道ID
          "appointmentDatetime": this.allTime, //预约时间
          "linkmanAddress": this.input4, //详细地址
          "linkmanArea": this.linkmanName, //街道
          "linkmanAreaId": this.linkmanAreaId, //街道id
          "payedPrice": Number(this.payedPrice) || "",
          "linkmanName": this.input1, //联系人名称
          "linkmanPhoneNum": this.input2, //联系人手机号
          "linkmanTelephone": this.input6, //联系人座机
          "serviceIdsJson": aaaaaa, // 产品信息
          "orderRemark": this.qita, // 订单备注其他
          "officialPartnerSubsetId": this.xiaoqudaoId,    //  子渠道id
          "emergencyDegree": this.jinjiduStr, // 紧急度
          "channelWarranty": this.zhibaoStr,    //  渠道质保
        }, this.addressCode(this.addressData.addressComponent));
      },
      getTableList(params) {
        let url = this.$apidomain + "/order/submit";
        this.$http.post(url, params).then(res => {
          if (res.data.code == "0000") {
            //充值显示
            this.$queryFun.successAlert.call(this, "恭喜工单新建成功", "1");
//            this.reload();
            this.buttonDisabled = false;
            this.input1 = "";
            this.input2 = "";
            this.input3= "";
            this.input4 = "";
            this.input5 = "";
            this.input6 = "";
            this.value1 = "";
            this.value = "";
            this.settleType = "0"
            this.zhuqudaoId = "";
            this.xiaoqudaoId = "";
            this.channelDealer="";
            if (this.settleType == "1") {
              this.qudaoShow = true;
              this.zhibaoStr = "0";
            } else {
              this.qudaoShow = false;
              this.zhibaoStr = "2";
            }
            this.qudaoShow = false;
            this.jinjiduIndex1 = 0;
            this.jinjiduIndex = 0;
            this.timeOptions = "";
            this.qita = "";
            this.payedPrice = "";
            this.addressData.value = "";
            this.tableListData = [];
            if (this.tableListData.length <= 0) {
              this.peijiankuang = false;
              this.xiaohui = true;
              this.xiaohui1 = false;
            }
            let obj1={name: "新建工单", path: "/order/list0"}
            this.$store.commit("spliceTabByPath",obj1.path)
            let obj={name: "待分配工单", path: "/order/list2"}
            this.$router.push({path: "/order/list2"});
              if(this.tabPathList.length>7){
//              this.tabPathList.splice(0,1);
                this.$store.commit("spliceTabPathList",0)
              }
              let isAddPath=true, o={};
              this.tabPathList.forEach(v=>{
                if(obj.path===v.path){
//                this.$store.commit("spliceTabByPath",path)
                  isAddPath=false;
                }
              });
              if(isAddPath){
                o.name=obj.name;
                o.path=obj.path;
//                  this.tabPathList.push(o)
                this.$store.commit("pushTabPathList",o)
              }

          } else {
            this.buttonDisabled = false;
            return this.$queryFun.successAlert.call(this, res.data.error)
          }

        })
      },

      danxuan2(v, i) {//保外单选
        this.jinjiduIndex1 = i;
        if (i == 0) {
          this.zhibaoStr = "0";
        } else if (i == 1) {
          this.zhibaoStr = "1";
        }
      },
      danxuan3(v, i) {//正常单选
        this.jinjiduIndex = i;
        if (i == 0) {
          this.jinjiduStr = "0";
        } else if (i == 1) {
          this.jinjiduStr = "1";
        }
      },

//
    },
    mounted() {

    },
  }
</script>
<style lang="scss">
  #hour {
    .el-button {
      width: 140px;
      height: 38px;
      position: relative;
      span {
        height: 38px;
        width: 140px;
        display: inline-block;
        line-height: 38px;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    i {
      display: inline-block;
      position: absolute;
      background: #ccc;
      opacity: 0.8;
      width: 140px;
      height: 38px;
      left: 0;
      top: 0;
    }
  }

  .iconfo_city::after {
    content: "";
    display: block;
    position: absolute;
    /*width:10px;*/
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    /*height: 10px;*/
    background: red;
  }

  #beizhu .el-textarea__inner {
    width: 400px;
    position: absolute;
    /*float: left;*/
    left: 98px;
    top: 0;
  }

  #shijian .ivu-input {
    height: 36px !important;
    border: 1px solid #bfcbd9
  }

  #citycity {
    .el-cascader__label {
      line-height: 36px !important;
    }
  }

</style>
<style scoped lang="scss">
  @import "../../assets/styles/comminStyle";

  @font-face {
    font-family: 'iconfont';  /* project id 681163 */
    src: url('//at.alicdn.com/t/font_681163_qfu8f6ts42c5wmi.eot');
    src: url('//at.alicdn.com/t/font_681163_qfu8f6ts42c5wmi.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_681163_qfu8f6ts42c5wmi.woff') format('woff'),
    url('//at.alicdn.com/t/font_681163_qfu8f6ts42c5wmi.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_681163_qfu8f6ts42c5wmi.svg#iconfont') format('svg');
  }

  .el-menu-demo {
    background: #FFFFFF;
    margin-bottom: 2px;
    .el-menu-item {
      background: #FFFFFF;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: rgba(136, 136, 136, 1);
      border-bottom: 5px solid transparent;
    }
    .el-menu-item:hover {
      background: #FFFFFF;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      color: rgba(230, 88, 49, 1);
      border-bottom: 5px solid rgba(230, 88, 49, 1);
    }
  }

  .chanpin {
    width: 100%;
    margin-bottom: 15px;
    /*overflow: hidden;*/
    .alertOne {
      width: 100%;
      padding: 10px 0;
      table {
        width: 100%;
        thead {
          width: 100%;
          background: rgba(229, 233, 242, 1);
          tr {
            width: 100%;
            th {
              height: 52px;
              font-size: 14px;
              font-family: PingFangSC-Regular;
              color: rgba(57, 57, 57, 1);
              line-height: 52px;
              text-align: center;
            }
          ;
          }
        }
        tbody {
          width: 100%;
          tr {
            width: 100%;
            background: rgba(255, 255, 255, 1);

            td {
              height: 46px;
              line-height: 46px;
              text-align: center;
              border: 1px solid #bfcbd9;
              border-left: 0;
              border-top: 0;
              .track, .detail {
                cursor: pointer;
                color: rgba(32, 160, 255, 1);
              }
              .track:hover, .detail:hover {
                color: purple;
              }
            }
            td:nth-child(1) {
              border-left: 1px solid #bfcbd9;
            }

          }
          tr:nth-child(1) td {
            border-top: 1px solid #bfcbd9;
          }
          tr:hover {
            background: #DBF0FF;
          }
        }
      }
    }
    .feiyongList {
      width: 100%;
      height: 44px;
      background: rgba(255, 247, 204, 1);
      padding-left: 50%;
      li {
        height: 44px;
        line-height: 44px;
        float: left;
        margin: 0 5%;
      }
      li:last-child {
        color: #EA3047;
      }
    }
    .chanpinP {
      width: 100%;
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      color: rgba(136, 136, 136, 1);
      line-height: 22px;
      span {
        display: inline-block;
        width: 4px;
        height: 18px;
        background: rgba(230, 88, 49, 1);
        margin: 0 5px;
        transform: translateY(2px);
      }
    }
    .el-button {
      margin: 20px 1%;

    }
  }

  .yuyue {
    width: 100%;
    .yuyueP {
      width: 100%;
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      color: rgba(136, 136, 136, 1);
      line-height: 22px;
      margin-bottom: 15px;
      span {
        display: inline-block;
        width: 4px;
        height: 18px;
        background: rgba(230, 88, 49, 1);
        margin: 0 5px;
        transform: translateY(2px);
      }

    }
    ul {
      width: 100%;
      li {
        width: 100%;
        margin-bottom: 15px;
        padding-left: 10px;
        span {
          color: #EA5413;
          margin-right: 20px;
        }
      }
    }
  }

  .zhibao {
    width: 100%;
    overflow: hidden;
    margin-bottom: 15px;
    .zhibaoP {
      margin-bottom: 15px;
      width: 100%;
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      color: rgba(136, 136, 136, 1);
      line-height: 22px;
      span {
        display: inline-block;
        width: 4px;
        height: 18px;
        background: rgba(230, 88, 49, 1);
        margin: 0 5px;
        transform: translateY(2px);
        float: left;
      }
      p {
        width: 200px;
        margin-left: 20px;
        float: left;
        position: relative;
        .el-button {
          width: 200px;
        }
        img {
          display: inline-block;
          position: absolute;
          right: 0;
          top: 0;
        }
      }

    }
  }

  .jinji {
    width: 100%;
    overflow: hidden;
    margin-bottom: 15px;
    .jinjiduP {
      margin-bottom: 15px;
      width: 100%;
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      color: rgba(136, 136, 136, 1);
      line-height: 22px;
      margin-bottom: 15px;
      span {
        display: inline-block;
        width: 4px;
        height: 18px;
        background: rgba(230, 88, 49, 1);
        margin: 0 5px;
        transform: translateY(2px);
        float: left;
      }
      p {
        position: relative;
        width: 200px;
        margin-left: 20px;
        float: left;
        .el-button {
          width: 200px;
        }
        img {
          display: inline-block;
          position: absolute;
          right: 0;
          top: 0;
        }
      }

    }
  }

  .ziqudao {
    width: 100%;
    padding: 0 0 0 15px;

    .ziqudaoP {
      overflow: hidden;
      margin-bottom: 15px;
      width: 100%;
      .el-select {
        margin-left: 20px;
        width: 200px;
      }

    }
  }

  .qitaP {
    margin-bottom: 15px;
    span {
      display: inline-block;
      transform: translateY(12px);
    }

  }

  .timeImg {
    display: inline-block;
    width: 16px;
    height: 16px;
    position: absolute;
    left: 240px;
    top: 15px;
  }

  .timeOptions {
    position: absolute;
    left: 10px;
    top: 0px;
    display: inline-block;
    input {
      width: 200px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #bfcbd9;
      box-sizing: border-box;
      color: #1f2d3d;
      font-size: inherit;
      height: 36px;
      line-height: 1;
      outline: 0;
      padding: 3px 10px;
      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
      transform: translateX(-2px);
      /*position: absolute;*/
      /*left: 150px;*/
    }
  }

  .timeSlot {
    position: absolute;
    top: 36px;
    left: 0px;
    width: 340px;
    border: 1px solid #C0CCDA;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 8px 0px rgba(187, 187, 187, 0.5);
    border-radius: 8px;
    z-index: 2;
    p {
      position: relative;
      width: 100%;
      height: 38px;
      background: rgba(224, 230, 237, 1);
      text-align: center;
      border-radius: 7px 7px 0px 0px;
      span:nth-child(1) {
        display: inline-block;
        position: absolute;
        left: 11px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        color: rgba(32, 160, 255, 1);
        line-height: 38px;
      }
      span:nth-child(2) {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        color: rgba(57, 57, 57, 1);
        line-height: 38px;
      }
    }
    ul {
      /*overflow: hidden;*/
      width: 100%;
      max-height: 320px;
      overflow-y: auto;
      padding: 15px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 136px;
        height: 36px;
        margin-right: 16px;
        /*text-align: center;*/
        /*overflow: hidden;*/
        button {
          transform: translateX(-12px);
          border: 1px solid #DFE4E9;
          border-radius: 4px;
          width: 136px;
          height: 36px;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          color: rgba(136, 136, 136, 1);
          background: #FFFFFF;
          line-height: 36px;
          text-align: center;
        }
        button:hover {
          background: #DFE4E9;
          color: black;
        }
        button.timeActive {
          background: #20A0FF;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          color: rgba(255, 255, 255, 1);
          border: none;
        }
      }
      li:nth-child(2n) {
        margin-right: 0;
      }

    }
  }

  #history {
    position: relative;
    width: 100%;
    height: 147px;
    border: 1px solid #CCCCCC;
    padding: 10px;
    p:nth-child(1) {
      width: 7%;
      float: left;
      padding: 10px 0;
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: rgba(94, 109, 130, 1);
      line-height: 20px;
    }
    p.more {
      width: 7%;
      float: left;
      height: 60px;
      padding: 10px 0;
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: rgba(32, 160, 255, 1);
      line-height: 20px;
    }
    ul {
      float: left;
      width: 86%;
      display: flex;
      overflow-x: auto;
      li {
        height: 65px;
        background: #F8F8F8;
        flex: 1;
        width: 150px;
        margin-right: 10px;
        text-align: left;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        color: rgba(136, 136, 136, 1);
        line-height: 20px;
      }
      li.historyActive {
        font-family: PingFangSC-Regular;
        color: rgba(32, 160, 255, 1);
        background: #E8F7FD;
      }
      li:hover {
        font-family: PingFangSC-Regular;
        color: rgba(32, 160, 255, 1);
        background: #E8F7FD;
      }
    }
  }
</style>



