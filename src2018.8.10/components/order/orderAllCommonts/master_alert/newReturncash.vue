<template>
  <div id="app">
      <h3>{{isRepair.title}} <img src="/static/images/del.png" @click="close(isRepair)"></h3>
      <ul class="alert_forbidden_text">
        <h4>基本信息</h4>
        <li>
          <span class="listName">工单号</span> {{isRepair.data.orderNumber}}
        </li>
        <li>
          <span class="listName">服务产品 </span> {{isRepair.data1.serviceFullName}}
        </li>
        <li>
          <span class="listName">工程师工号 </span> {{isRepair.data.masterId}}
        </li>
        <li>
          <span class="listName">工程师姓名 </span> {{isRepair.data.masterName}}
        </li>
        <li style="margin-bottom: 18px">
          <span class="listName">工程师手机号 </span>{{isRepair.data.masterPhoneNum}}
        </li>
        <h4>内容填写</h4>
        <li>
          <span class="listName">服务时间</span>
          <DatePicker v-model.trim="newtime" :options="options3" type="date" format="yyyy-MM-dd" placeholder="选择日期和时间" style="width: 200px">
          </DatePicker>
            <div class="timeOptions" style="position: relative;" v-show="timeInputShow">
              时间段<span></span>
              <el-input style="width: 200px" :disabled="timeBoxShowOne" type="text" v-model="timeOptions"
                        @focus="timeSlot()" placeholder="请选择预约时间段"></el-input>
              <img class="timeImg" src="/static/images/time.png" @click="emtyTime()">
              <div class="timeSlot" v-show="timeBoxShow">
                <p><span @click="restDate()">重新选择日期</span><span>选择上门时间</span></p>
                <ul>
                  <li id="hour" v-for="(item,index) in hour" v-if="item.bool==false">
                    <el-button :class="{timeActive:timeIndex == index}" @click="timeClick(item,index)" type="info">{{item.time}}</el-button>
                  </li>
                </ul>

              </div>
            </div>
          <span style="color: #999999;margin-left: 12px;font-size: 13px"> 选填</span>
        </li>
        <li>
          <span style="transform: translateY(-40px)" class="listName">备注信息</span>
          <el-input
            style="display: inline-block !important;width: 80%;margin-top: 14px"
            class="alert_forbidden_area"
            type="textarea"
            :rows="3"
            placeholder="请填写备注（选填）"
            v-model.trim="newObj.remark">
          </el-input>
        </li>

      </ul>
    <div class="bottom">
      <el-button  @click="cancel(isRepair)">取消</el-button>
      <el-button  @click="refer(isRepair)" type="primary">确定</el-button> &nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  </div>
</template>
<script>
  import {TimestampCalculation, ArraySlice} from "../../js/TimestampCalculationone"
  export default {
    props:["isRepair","findOne"],
    data() {

      return {
        timeOptions: "",//时间段预约
        timeBoxShow: false,
        timeBoxShowOne: true,
        timeInputShow: false,
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
        options3: {
          disabledDate(date) { // - 86400000一天的时间
            return date && date.valueOf() <  Date.now() - 86400000;
          }
        },
        newtime:'',
        objData:{alertForbiddenList:[]},
        newObj:{
          appointmentDatetime:'',//最新预约时间
          masterId:'',//工程师编号
          orderId:'',//工单编号
          orderServiceId:'',//订单服务编号
          remark:'',//备注
          type:'',//工单类型(0:正常工单 1:返修工单)
        }
      }
    },
    watch:{
      newtime: function (newInput, oldInput) {
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
    },
    methods: {
      timeSlotOne() {
        this.timeBoxShow = true;
      },
      timeClick(v, i) {// 时间阶段选择
        this.timeIndex = i;
        this.timeOptions = v.time;
        this.timeOptionsTime = TimestampCalculation(v.time)
        this.timeBoxShow = false;
      },
      restDate() {// 重新选择日期
        this.newtime = "";
        this.timeOptions = "";
        this.timeInputShow = false;
        this.$queryFun.successAlert.call(this, "请重新选择日期");
      },
      emtyTime() {// 清楚时间段
        this.timeOptions = "";
        this.timeBoxShow = false;
      },
      timeSlot() {
        this.timeBoxShow = true;
      },
      close(isShow){
        isShow.isShow = false;
      },
      cancel(isShow){ //取消
        isShow.isShow=false;
      },
      refer(isShow){
        let url=this.$apidomain+'/order/submitRework';
        let time;
        if(this.newtime){
          if(this.timeOptions == ""){
           return alert("请选择时间段");
          }else {
            time=this.$moment(this.newtime).format('YYYY-MM-DD HH:mm:ss').includes("Invalid")?"":this.$moment(this.newtime).format('YYYY-MM-DD  HH:mm:ss');
            time =this.$moment(Date.parse(new Date(time))+TimestampCalculation(this.timeOptions)).format('YYYY-MM-DD HH:mm:ss')
          }
        }else {
          time = "";
        }
        this.newObj.appointmentDatetime=time;
        if(this.isRepair.data.masterId){
          this.newObj.masterId=this.isRepair.data.masterId;
        }else{
          this.newObj.masterId="";
        }
        this.newObj.orderId=this.isRepair.data.orderNumber;
        this.newObj.orderServiceId=this.isRepair.data1.id;
        this.newObj.type="1";
          this.$http.post(url,this.newObj).then((r)=>{
            if(r.data.code=="0000"){
              alert("添加成功");
              isShow.isShow=false;
            }else{
              alert(r.data.error)
            }
          })

      },

    },
    created() {

    }
  }
</script>
<style>
  .el-dialog__body{
    padding-top:0 ;
  }
</style>
<style scoped lang="scss">
  #app{
    position:relative;
    width: 960px;
    height: 620px;
    background: #fff;
    margin: 10% 0 0  15%;
    border-radius:8px;
    border:1px solid rgba(151,151,151,1);
    h3 {
      position: relative;
      border-bottom: 2px solid rgba(151, 151, 151, 1);
      width: 100%;
      height: 48px;
      text-align: center;
      line-height: 48px;
      img {
        position: absolute;
        top: 15px;
        right: 30px;
      }
    }
    .alert_forbidden_text{
      list-style: none;
      width: 100%;
      height: 488px;
      padding: 23px 29px 0 29px;
      >li{
        line-height: 3em;
        line-height: 3em;
        /*border-top:1px solid rgba(0,0,0,.1);*/
        >.order_number{
          float:right;
          padding-right:30px;
        }
      }
      >li:first-of-type{
        border:none;
      }
      >h4{
        width: 100%;
        height:30px;
        line-height: 30px;
        padding-left: 12px;
        background:rgba(240,240,240,1);
        margin-bottom: 18px;
      }
      span{
        display: inline-block;
      }
    }
    .bottom{
      width: 100%;
      height: 40px;
      padding-left: 28%;
      button{
        width: 200px;
        /*margin-left: 13%;*/
      }
    }
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
  .timeImg {
    display: inline-block;
    width: 16px;
    height: 16px;
    position: absolute;
    left: 220px;
    top: 10px;
  }
  .listName{
    width: 75px;
    text-align: right;
    margin-right:8px ;
    color:#5E6D82;
  }

</style>
<style lang="scss">
  #hour {
    margin-bottom: 5px;
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
</style>

