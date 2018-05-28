<template>
  <div>
  <AddAlter @isClose="isClose" v-if="addShow" @pejianzengjia="pejianzengjia" :cityId="cityId" :xiaoqudaoId="xiaoqudaoId"></AddAlter>
  <AddAlterOne @isClose="isClose" v-if="addShowONE" @pejianzengjia="pejianzengjia" :bianjiData1="bianjiData1" :cityId="cityId" :xiaoqudaoId="xiaoqudaoId"></AddAlterOne>
  <BianjiAlter @isClose="isClose" v-if="bianjiShow" @pejianzengjia="pejianzengjia" :bianjiData="bianjiData"  :cityId="cityId" :xiaoqudaoId="xiaoqudaoId"></BianjiAlter>
  <CreditIsRunningLow v-if="chongzhiShow" @isClose="isClose"  :yujifei="yujifei"></CreditIsRunningLow>
  <WorkOrderSubmission @isClose="isClose" v-if="chongzhiShow1"></WorkOrderSubmission>
    <LookAtMoreAlter @isClose="isClose" v-if="lookAtMoreShow"  @pejianzengjia="pejianzengjia" @flaga="flaga"></LookAtMoreAlter>
  <div style="overflow-y: auto;padding: 20px;">
    <div class="yuyue">
      <p class="yuyueP"><span></span>预约信息（带<b style="color: #EA5413">*</b>为必填）</p><br>
      <ul>
        <li>　　联系人<span>*</span><el-input v-model="input1" placeholder="请输入联系人" style="width: 200px"></el-input></li>
        <li>联系人手机<span>*</span><el-input v-model="input2" placeholder="请输入正确手机号码" style="width: 200px"></el-input> 　　　<b style="font-weight:100; margin: 0 20px">座机</b><el-input v-model="input6" placeholder="请输入正确座机（非必填）" style="width: 200px"></el-input></li>
        <li id="citycity">　服务地区<span>*</span>
          <el-cascader
            expand-trigger="hover"
            :options="options"
            :props="props"
            style="width:200px;transform: translateX(-4px)"
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
        </li>
        <li>　详细地址<span>*</span><el-input v-model="input4" placeholder="请填写详细地址" style="width: 480px"></el-input></li>
        <li id="shijian" style="position: relative;">　预约时间<span>*</span>
<!--新增-->
          <DatePicker type="date" v-model="input5" :options="options3" placeholder="请选择预约日期"  :style="timeStyle"  @focus="timeSlotOne()"></DatePicker>
          <div class="timeOptions"  style="position: relative;" v-show="timeInputShow">
            时间段<span>*</span> <el-input style="width: 200px" :disabled="timeBoxShowOne" type="text" v-model="timeOptions"  @focus="timeSlot()" placeholder="请选择预约时间段"></el-input></el-input>
            <img class="timeImg" src="/static/images/time.png" @click="emtyTime()">
            <div class="timeSlot" v-show="timeBoxShow">
              <p><span @click="restDate()">重新选择日期</span><span>选择上门时间</span></p>
              <ul>
                <li id="hour" v-for="(item,index) in hour">
                  <el-button :disabled="item.bool" :class="{timeActive:timeIndex == index}" @click="timeClick(item,index)" type="info"><i v-if="item.bool"></i>{{item.time}}</el-button>

                </li>
              </ul>

            </div>
          </div>

        </li>

      <li>
        <p class="ziqudaoP">　　子渠道
          <el-select v-model="value" placeholder="请选择子渠道" @change="ziqudaoA(value)">
            <el-option
              v-for="(item,index) in ziqudao"
              :key="index"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </p>
      </li>
      </ul>
    </div>

    <div class="chanpin">
      <p class="chanpinP"><span></span>产品信息</p><br>
      <el-button type="success" @click="addProduct" v-if="xiaohui"style="transform: translateX(27px)">添加产品</el-button>
      <el-button type="success" @click="addProduct1" v-if="xiaohui1"style="transform: translateX(27px)">继续添加</el-button>
<!--新增-->
      <div id="history" v-if="historyDataShow" :style="historyAddStyle">
        <p>历史下单<br>(快捷选择)</p>
        <ul>
          <li v-for="(item,index) in historyData" @click="historyAdd(item,index)">
         {{item.serviceFullName}}<br>
            {{item.serviceBrand}}　{{item.serviceModel}}
          </li>
        </ul>
        <p class="more" @click="lookAtMore">查看更多工单</p>
        <el-button type="primary" style="position: absolute;left: 7%;bottom: 20px" v-if="historyAddShow" @click="addOK">确定添加</el-button>
      </div>

      <div class="alertOne" v-if="peijiankuang">
        <!--表格数据-->
        <table  cellSpacing="0px" cellpadding="0">
          <thead>
          <tr class="theads">
            <th v-for="(item,index) in theadsName">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in tableListData" id="trHover">
            <!--序号-->
            <td>
              {{index+1}}
            </td>
            <!--产品名称-->
            <td>
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
          <li>检测费小计：{{zongjia.toFixed(2)}}元</li>
          <li>服务费小计：{{fuwufei.toFixed(2)}}元</li>
          <li>预估价：{{yujifei.toFixed(2)}}元</li>
        </ul>

      </div>
    </div>

    <ul class="zhibao" v-if="zhibaoIsShow">
    <li class="zhibaoP"><span></span><b style="float: left;font-weight: 100">质保状态</b>
        <p @click="danxuan2(item,index)" v-for="(item,index) in zhibao"><el-button>{{item}}</el-button><img src="/static/images/danxuan.png"  v-show="jinjiduIndex1 == index"></p>
      </li>

  </ul>
    <ul class= "jinji">
      <li class="jinjiduP"><span></span><b style="float: left;font-weight: 100">紧急程度</b>
        <p @click="danxuan3(item,index)" v-for="(item,index) in jinjidu">
          <el-button>{{item}}</el-button><img src="/static/images/danxuan.png" v-show="jinjiduIndex == index">
        </p>
      </li>

    </ul>
    <div class="ziqudao">

      <p class="qitaP"><span style="transform: translateY(12px)">　　　其他</span><el-input
        type="textarea"
        placeholder="请输入其他备注"
        v-model="qita">
      </el-input>
      </p>
      <p class="addTijiao" style="width: 90%;margin:20px 8%;">
        <el-button type="primary" @click="addTijiao" style="width: 200px">提交</el-button>
      </p>
    </div>
  </div>
  </div>
</template>
<script>
  let newArr=[];
  import AddAlter from "./alertInfos/addAlert.vue" //增加
  import AddAlterOne from "./alertInfos/addAlertOne.vue" //增加1
  import BianjiAlter from "./alertInfos/bianjiAlert.vue"  //编辑
  import LookAtMoreAlter from "./alertInfos/lookAtMoreAlter.vue"  //查看更多历史记录
  import CreditIsRunningLow from "./alertInfos/creditIsRunningLow.vue" //余额不足
  import WorkOrderSubmission from "./alertInfos/WorkOrderSubmission.vue" //支付成功
  import {TimestampCalculation} from "./js/TimestampCalculation"
  import {getTime} from "./js/time"
  export default {
    components:{
      AddAlter,BianjiAlter,CreditIsRunningLow,WorkOrderSubmission,AddAlterOne,LookAtMoreAlter
    },
    data() {
      return {
        yijiName:"",//一级分类
        historyObjData:{},//
        historyAddData:"",//历史数据
        historyAddStyle:{height:"90px"},//历史记录的样式
        historyAddShow:false,//确定按钮显示
        historyDataShow:false, //历史记录显示
        lookAtMoreShow:false, //更多显示
        historyData:[], //首页显示的历史记录
        timeStyle:{width:"320px",height:"36px"},
        timeInputShow:false,
        timeBoxShowOne:true,
        timeBoxShow:false,
        newArry:[],
        allTime:"",//日期加时间段
        timeIndex:-1,  //选中下标
        hour:[{bool:false,time:"09:00-10:00",num:10},{bool:false,time:"10:00-11:00",num:11},{bool:false,time:"11:00-12:00",num:12},{bool:false,time:"12:00-13:00",num:13},{bool:false,time:"13:00-14:00",num:14},{bool:false,time:"14:00-15:00",num:15},{bool:false,time:"15:00-16:00",num:16},{bool:false,time:"16:00-17:00",num:17},{bool:false,time:"17:00-18:00",num:18},{bool:false,time:"18:00-19:00",num:19},{bool:false,time:"19:00-20:00",num:20}],//小时
        timeOptions:"",//时间段预约
        timeOptionsTime:"",
        options3: {
          disabledDate (date) { // - 86400000一天的时间
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        //区域start
        cityId:"",
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
        jinjiduIndex:0,//紧急度下标
        jinjiduIndex1:0,//紧急度下标
        zhibaoIsShow:false,
        zhibao:["质保外","质保内"],//质保
        zhibaoStr:"0",
        jinjiduStr:"0",
        jinjidu:["正常","加急"],//紧急度
        bianjiShow:false, //编辑唐匡
        theadsName:["序号","产品名称","品牌","型号","数量","检测费","服务费","操作"],
        input1:"", //　联系人
        input2:"",//　联系人手机
        input4:"",//　详细地址*
        input5:"",//　　预约时间*
        input6:"",//　座机
        qita:"",//其他
        ziqudao:[],//子渠道
        value:"",//子渠道
        addShow:false,      //增加配件弹框
        addShowONE:false,     //增加配件11
        peijiankuang:false,  //配件显示宽
        xiaohui:true,
        xiaohui1:false,
        tableListData:[], //展示数据
        bianjiData:{}, //编辑数据
        bianjiData1:{}, //编辑数据
        linkmanAreaId:"",//街道ID
        linkmanName:"", //街道名字
        flag: true,
        chushiId:"", //子渠道id
        xiaoqudaoId:"",//小子渠道Id
        chongzhiShow:false, //充值显示
        chongzhiShow1:false, //充值显示成功
        flagOne:1,
        zongjia:0,
        fuwufei:0,
        yujifei:0,
        mainOrderId:"",// 订单Id
        ziqudaoIdOne:"",
        count:0,

      }
    },
    computed:{

    },
    created(){


        //子渠道
      this.chushiId = JSON.parse(sessionStorage.getItem("userInfo"));
      this.xiaoqudaoId ="";
      let url1 = this.$apidomain+"/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo?officialPartnerId="+this.chushiId[0].id;
      this.$http.get(url1).then(res=>{
        this.ziqudao = [{name:"--请选择--",id:""},...res.data.result];

      });
      if(this.chushiId[0].channelSettleType == "1"){
        this.zhibaoIsShow =true;
        this. zhibaoStr ="0";
        this.danxuanShow1 = true;
        this.danxuanShow2 = false;
      }else{
        this. zhibaoStr ="";
        this.zhibaoIsShow =false;
        this.danxuanShow1 = true;
        this.danxuanShow2 = false;
      }

      let cityurl = `${this.$apidomain}/common/findprovinceandcitylist`;
      this.$http.get(cityurl).then(res=>{
        if (res.data.code === '0000') {
          this.options =res.data.result;
        }
      });
      let ControllerUrl = `${this.$apidomain}/officialProductLabelController/all?type=3`;
      this.$http.get(ControllerUrl).then(res=>{
        if(res.data.code === "0000"){
                if(res.data.result.list.length>4){
                  this.historyDataShow =true;
                  this.historyData = res.data.result.list.slice(0,4)
                }else if(res.data.result.list.length< 4 && res.data.result.list){
                  this.historyDataShow =true;
                   this.historyData =res.data.result.list;
                }else if(!res.data.result.list){
                  this.historyDataShow =false;
          }
        }else{
          this.$queryFun.successAlert.call(this,res.data.error);
        }
      })
    },
    watch:{
      input5:function (newInput,oldInput) {
        if(newInput){
          this.timeBoxShowOne = false;
          this.timeInputShow = true;
          this.timeBoxShow = true;
          this.timeStyle={width:"200px",height:"36px"}
        }else{
          this.timeInputShow = false;
          this.timeBoxShowOne = true;
          this.timeBoxShow = false;
          this.timeBoxShow = false;
          this.timeStyle={width:"320px",height:"36px"}
        }
        if( this.$moment(Date.now()).format("YYYY-MM-DD") == this.$moment(newInput).format("YYYY-MM-DD")){
            let aaa = new Date().getHours();
            this.hour.forEach((v,i)=>{
              if(aaa+2>v.num){
               v.bool = true;
                this.timeIndex = i+1;
              }
            })
        }else{
          let aaa = new Date().getHours();

          this.hour.forEach((v,i)=>{
              v.bool = false;
              this.timeIndex = 0;
          })
        }
      }
    },
    methods: {
      flaga(v){
        this.flagOne =v;
      },
      addOK(){//确定添加
//        historyAddData
        if(this.input1 == ""){
          return this.$queryFun.successAlert.call(this,"请填写联系人")
        }

        if(this.input2 == ""){
          return this.$queryFun.successAlert.call(this,"请填写联系人手机");

        }
        let reg =  /^1\d{10}$/;
        if(reg.test(this.input2)==false){
          return this.$queryFun.successAlert.call(this,"请填写正确手机号");
        }
        if(this.selectedOptions2.length<=0||this.selectedOptions1.length<=0){
          return this.$queryFun.successAlert.call(this,"请填写服务地区");
        }
        if(this.input4 == ""){
          return this.$queryFun.successAlert.call(this,"请填写详细地址");
        }
        if(this.input5 == ""){
          return this.$queryFun.successAlert.call(this,"请填写预约时间");
        }
        if(this.timeOptions == ""){
          return this.$queryFun.successAlert.call(this,"请填写预约时间段");
        };
        this.xiaoqudaoid=this.$store.state.xiaoqudaoId?this.$store.state.xiaoqudaoId:JSON.parse(sessionStorage.getItem("userInfo"))[0].id;
        let urlThree=this.$common.apidomain+"/articleinfo/findChannelListServiceInfo?labelId="+this.historyAddData.serviceId+"&areaId="+this.$store.state.cityIdid+"&relevanceKey="+this.xiaoqudaoid;

        this.$http.get(urlThree).then(res=>{
          let a,b,c,d,e,f;
          let aaa =res.data.result.serviceInfo.labelId.substring(3,-3)
          if(res.data.result.serviceInfo.labelId.length == 18){
            a = res.data.result.serviceInfo.labelId.substring(3,-3);
            b=res.data.result.serviceInfo.labelId.substring(6,-6);
            c=res.data.result.serviceInfo.labelId.substring(9,-9);
            d=res.data.result.serviceInfo.labelId.substring(12,-12);
            e=res.data.result.serviceInfo.labelId.substring(15,-15);
            f=res.data.result.serviceInfo.labelId.substring(18,-18);
            this.abcdefg =[a,b,c,d,e,f];
          }else if(res.data.result.serviceInfo.labelId.length == 15){
            a = res.data.result.serviceInfo.labelId.substring(3,-3);
            b=res.data.result.serviceInfo.labelId.substring(6,-6);
            c=res.data.result.serviceInfo.labelId.substring(9,-9);
            d=res.data.result.serviceInfo.labelId.substring(12,-12);
            e=res.data.result.serviceInfo.labelId.substring(15,-15);
            this.abcdefg =[a,b,c,d,e];
          }
          else if(res.data.result.serviceInfo.labelId.length == 12){
            a = res.data.result.serviceInfo.labelId.substring(3,-3);
            b=res.data.result.serviceInfo.labelId.substring(6,-6);
            c=res.data.result.serviceInfo.labelId.substring(9,-9);
            d=res.data.result.serviceInfo.labelId.substring(12,-12);
            this.abcdefg =[a,b,c,d];
          }else if(res.data.result.serviceInfo.labelId.length == 9){
            a = res.data.result.serviceInfo.labelId.substring(3,-3);
            b=res.data.result.serviceInfo.labelId.substring(6,-6);
            c=res.data.result.serviceInfo.labelId.substring(9,-9);
            this.abcdefg =[a,b,c];
          }else if(res.data.result.serviceInfo.labelId.length == 6){
            a = res.data.result.serviceInfo.labelId.substring(3,-3);
            b=res.data.result.serviceInfo.labelId.substring(6,-6);
            this.abcdefg =[a,b];
          }

          if(res.data.code === "0000"){
            this.historyObjData.numData = this.abcdefg;
            this.historyObjData.fenlei = this.historyAddData.serviceId.substring(3,-3);
            this.historyObjData.serviceBrand = this.historyAddData.serviceBrand;
            this.historyObjData.serviceModel = this.historyAddData.serviceModel;
            this.historyObjData.id = res.data.result.serviceInfo.id;
            this.historyObjData.serviceInfo = res.data.result.serviceInfo;
            this.historyObjData.size = 1;
            this.historyObjData.tags =  res.data.result.serviceInfo.tags;
            if("001"== this.historyObjData.fenlei){
              this.yijiName = "家电清洗";
            }else if("002"== this.historyObjData.fenlei){
              this.yijiName = "家电维修";
            }else if("003"== this.historyObjData.fenlei){
              this.yijiName = "手机维修";
            }else if("004" == this.historyObjData.fenlei){
              this.yijiName =  "家居维修";
            }else if("005"== this.historyObjData.fenlei){
              this.yijiName = "开锁修锁";
            }else if("006"== this.historyObjData.fenlei){
              this.yijiName = "管道疏通";
            }else if("007"==this.historyObjData.fenlei){
              this.yijiName = "灯具线路";
            }else if("008"== this.historyObjData.fenlei){
              this.yijiName = "卫浴洁具";
            }else if("009"== this.historyObjData.fenlei){
              this.yijiName = "安装服务";
            }
            this.historyObjData.yijiName = this.yijiName;
//           this.newArry.push(JSON.stringify(this.historyObjData))
            this.flagOne = 4;
            this.pejianzengjia(JSON.stringify(this.historyObjData));

            this.$queryFun.successAlert.call(this,"添加成功");
          }else{
            return this.$queryFun.successAlert.call(this,res.data.error);
          }
        })
      },
      historyAdd(v,i){ //点击添加显示
        this.historyAddData = v;
         this.historyAddShow = true;
         if( this.historyAddShow == false){
           this.historyAddStyle = {height:"90px"}
         }else{
           this.historyAddStyle = {height:"147px"}
         }
        console.log(this.tableListData);
      },
      lookAtMore(){ //查看更多
        if(this.input1 == ""){
          return this.$queryFun.successAlert.call(this,"请填写联系人")
        }

        if(this.input2 == ""){
          return this.$queryFun.successAlert.call(this,"请填写联系人手机");

        }
        let reg =  /^1\d{10}$/;
        if(reg.test(this.input2)==false){
          return this.$queryFun.successAlert.call(this,"请填写正确手机号");
        }
        if(this.selectedOptions2.length<=0||this.selectedOptions1.length<=0){
          return this.$queryFun.successAlert.call(this,"请填写服务地区");
        }
        if(this.input4 == ""){
          return this.$queryFun.successAlert.call(this,"请填写详细地址");
        }
        if(this.input5 == ""){
          return this.$queryFun.successAlert.call(this,"请填写预约时间");
        }
        if(this.timeOptions == ""){
          return this.$queryFun.successAlert.call(this,"请填写预约时间段");
        }
        this.lookAtMoreShow = true;
      },
      emtyTime(){// 清楚时间段
        this.timeOptions = "";
        this.timeBoxShow = false;
      },
      restDate(){// 重新选择日期
         this.input5 = "";
         this.timeOptions = "";
        this.timeInputShow = false;
        this.$queryFun.successAlert.call(this,"请重新选择日期");
      },
      timeClick(v,i){// 时间阶段选择
         this.timeIndex = i;
         this.timeOptions = v.time;
         this.timeOptionsTime = TimestampCalculation(v.time)
        this.timeBoxShow = false;
      },
      timeSlot(){
        this.timeBoxShow = true;
      },
      ziqudaoA(value){ //子渠道
         this.ziqudao.forEach((v,i)=>{
             if(value == v.name){
                this.xiaoqudaoId = v.id;
                this.$store.dispatch("xiaoqudaoId",this.xiaoqudaoId)
                this.ziqudaoIdOne =v.id;
             }
         })
      },
      handleChange(value) {
        this.cityId = value[value.length - 1];
          this.$store.dispatch("cityIdid",this.cityId);
        //选择区域街道
        let cityIdurl=this.$apidomain+"/common/findareaandstreetoptions?cityId="+ this.cityId;//获取区域
        this.$http.get(cityIdurl).then(res=>{
          this.serveAreas = res.data.result;
        })
      },
      changeSelector($event) {
        this.linkmanAreaId = this.selectedOptions1[this.selectedOptions1.length - 1];
        this.linkmanName =this.$refs.one.currentLabels[1];
       },

      addTijiao(){ //提交
        if(this.input1 == ""){
          return this.$queryFun.successAlert.call(this,"请填写联系人")
        }

        if(this.input2 == ""){
          return this.$queryFun.successAlert.call(this,"请填写联系人手机");

        }
        let reg =  /^1\d{10}$/;
        if(reg.test(this.input2)==false){
          return this.$queryFun.successAlert.call(this,"请填写正确手机号");
        }
        if(this.selectedOptions2.length<=0||this.selectedOptions1.length<=0){
          return this.$queryFun.successAlert.call(this,"请填写服务地区");
        }
        if(this.input4 == ""){
          return this.$queryFun.successAlert.call(this,"请填写详细地址");
        }
        if(this.input5 == ""){
          return this.$queryFun.successAlert.call(this,"请填写预约时间");
        }
        if(this.timeOptions == ""){
          return this.$queryFun.successAlert.call(this,"请填写预约时间段");
        }
        if(this.peijiankuang == false){
          return  this.$queryFun.successAlert.call(this,"请添加产品");
        }
        if(this.danxuanShow1 == false&&this.danxuanShow2 == false){
          return this.$queryFun.successAlert.call(this,"请选择质保状态");
        }
        if(this.danxuanShow3 == false&&this.danxuanShow4 == false){
          return  this.$queryFun.successAlert.call(this,"请选择紧急程度");

        }
         this.query();
      },
      detailClick(v,i){  //删除
        this.tableListData.splice(i,1);
        let c=[];
        let d=[];
        this.tableListData.forEach((v,i)=>{
          c.push(v.serviceInfo.price1);
          this.zongjia=Math.max.apply(null, c); //求最大值
          d.push(v.serviceInfo.price2DiscountFee*v.size)
          this.fuwufei= eval(d.join("+"));//求和
          this.yujifei = this.zongjia+this.fuwufei;  //求总金额
        });
        if(this.tableListData.length <= 0){
          this.peijiankuang = false;
          this.xiaohui = true;
          this.xiaohui1 = false;
        }

      },
      bianjiClick(v,i){  //编辑

         this.flagOne = 3;
          this.bianjiData = v;
          this.bianjiShow = true;
      },
      pejianzengjia(obj){  //配件增加

        if(this.flagOne == 1){
          this.bianjiData1 = obj;
          this.peijiankuang = true;
          this.tableListData.push(obj);
        }else if(this.flagOne == 2){
          this.bianjiData1 = obj;
          this.peijiankuang = true;
          this.tableListData.push(obj)
        }else if(this.flagOne == 3){
          this.bianjiData1 = obj;
          this.peijiankuang = true;
            for(let i=0;i<this.tableListData.length;i++){
              this.tableListData.splice(this.tableListData[i],1,obj)
            }
        }else if(this.flagOne == 4){
          this.flagOne =1;
          this.bianjiData1 = JSON.parse(obj);
          this.peijiankuang = true;
          this.tableListData.push(JSON.parse(obj))
        }

        if(this.tableListData.length > 0){
          this.xiaohui = false;
          this.xiaohui1 = true;
        }else if(this.tableListData.length <= 0){
          this.xiaohui = true;
          this.xiaohui1 = false;
        }
        let c=[];
        let d=[];
        this.tableListData.forEach((v,i)=>{
          c.push(v.serviceInfo.price1)
          this.zongjia=Math.max.apply(null, c); //求最大值
            d.push(v.serviceInfo.price2DiscountFee*v.size)
          this.fuwufei= eval(d.join("+"));//求和
         this.yujifei = this.zongjia+this.fuwufei;  //求总金额

        })
      },
      isClose(val){//增加配件弹框
        this.addShow = val;
        this.addShowONE = val;
        this.bianjiShow = val;
        this.chongzhiShow = val; //充值显示
        this.chongzhiShow1 = val; //充值显示成功
        this.lookAtMoreShow = val;
      },


      addProduct1(){//添加产品
         this.flagOne = 2;
         this.xiaohui = false;
        if(this.input1 == ""){
          return this.$queryFun.successAlert.call(this,"请填写联系人")
        }

        if(this.input2 == ""){
          return this.$queryFun.successAlert.call(this,"请填写联系人手机");

        }
        let reg =  /^1\d{10}$/;
        if(reg.test(this.input2)==false){
          return this.$queryFun.successAlert.call(this,"请填写正确手机号");
        }
        if(this.selectedOptions2.length<=0||this.selectedOptions1.length<=0){
          return this.$queryFun.successAlert.call(this,"请填写服务地区");
        }
        if(this.input4 == ""){
          return this.$queryFun.successAlert.call(this,"请填写详细地址");
        }
        if(this.input5 == ""){
          return this.$queryFun.successAlert.call(this,"请填写预约时间");
        }
        if(this.timeOptions == ""){
          return this.$queryFun.successAlert.call(this,"请填写预约时间段");
        }
          this.addShowONE = true;


      },
      addProduct(){//添加产品
        this.flagOne = 1;
        this.xiaohui1 = false;
        if(this.input1 == ""){
          return this.$queryFun.successAlert.call(this,"请填写联系人")
        }

        if(this.input2 == ""){
          return this.$queryFun.successAlert.call(this,"请填写联系人手机");

        }
        let reg =  /^1\d{10}$/;
        if(reg.test(this.input2)==false){
          return this.$queryFun.successAlert.call(this,"请填写正确手机号");
        }
        if(this.selectedOptions2.length<=0||this.selectedOptions1.length<=0){
          return this.$queryFun.successAlert.call(this,"请填写服务地区");
        }
        if(this.input4 == ""){
          return this.$queryFun.successAlert.call(this,"请填写详细地址");
        }
        if(this.input5 == ""){
          return this.$queryFun.successAlert.call(this,"请填写预约时间");
        }
        if(this.timeOptions == ""){
          return this.$queryFun.successAlert.call(this,"请填写预约时间段");
        }
        this.addShow = true;
      },
      danxuan2(v,i){//保外单选
        this.jinjiduIndex1 = i;
        if(i==0){
          this.zhibaoStr = "0";
        }else if(i==1){
          this.zhibaoStr = "1";
        }
      },
      danxuan3(v,i){//正常单选
        this.jinjiduIndex = i;
        if(i==0){
          this.jinjiduStr = "0";
        }else if(i==1){
          this.jinjiduStr = "1";
        }
      },

      query(){  //初始数据
        this.input5 = this.$moment(this.input5).format("YYYY-MM-DD HH:mm:ss");
        let date = new Date(this.input5);
        this.allTime =this.$moment(this.timeOptionsTime+date.getTime()).format("YYYY-MM-DD HH:mm:ss")
        this.getTableList(this.paramsData());
      },
      paramsData(){  //传数据给后台
          let aaaaaa=JSON.stringify(this.tableListData);
        return{
          "officialPartnerId":this.chushiId[0].id, //主渠道ID
          "appointmentDatetime":this.allTime, //预约时间
          "linkmanAddress":this.input4, //详细地址
          "linkmanArea":this.linkmanName, //街道
          "linkmanAreaId":this.linkmanAreaId, //街道id
          "linkmanName":this.input1, //联系人名称
          "linkmanPhoneNum":this.input2, //联系人手机号
          "linkmanTelephone":this.input6, //联系人座机
          "serviceIdsJson":aaaaaa, // 产品信息
          "orderRemark":this.qita, // 订单备注其他
          "officialPartnerSubsetId":this.ziqudaoIdOne,    //  子渠道id
          "emergencyDegree":this.jinjiduStr, // 紧急度
          "channelWarranty":this.zhibaoStr,    //  渠道质保

        };
      },
      getTableList(params){
        let url=this.$apidomain+"/order/submitByChannel";
        this.$http.post(url,params).then(res=>{
              if(res.data.code == "0000"){
                    if(this.chushiId[0].channelSettleType == "1"){
                      this.$queryFun.successAlert.call(this,"工单提交成功","1");
                       this.chongzhiShow1 = true;
                    }else{
                      //充值显示
                      this.mainOrderId = res.data.result.id;
                      sessionStorage.removeItem("mainOrderId");
                      sessionStorage.setItem('mainOrderId', JSON.stringify(this.mainOrderId));
                      let mainOrderIdObj={};
                      mainOrderIdObj.mainOrderId = this.mainOrderId;
                      mainOrderIdObj.officialPartnerId = this.chushiId[0].id;
                      let mainOrderIdUrl=this.$apidomain+"/order/payCallback";
                      this.$http.post(mainOrderIdUrl,mainOrderIdObj).then(res1=>{
                        if(res1.data.code=="0000"){
                          this.$queryFun.successAlert.call(this,"工单提交成功","1");
                          this.chongzhiShow1 = true;
                        }else if(res1.data.code=="0902"){
                          this.chongzhiShow=true;    //充值显示
                        }else{
                          return this.$queryFun.successAlert.call(this,res1.data.error)
                        }
                      })
                    }
              }else{
                alert(res.data.error)
              }

         })
      },
//
    },
    mounted() {
    },
  }
</script>
<style lang="scss">

  #hour {
    .el-button{
      width: 140px;
      height: 38px;
      position: relative;
      span{
       height: 38px;
        width: 140px;
        display: inline-block;
        line-height: 38px;
        position: absolute;
        left: 0;
        top:0;
      }
    }
    i{
      display: inline-block;position: absolute;
      background:#ccc;
      opacity: 0.8;
      width: 140px;
      height: 38px;
      left: 0;
      top:0;
    }
  }
  #shijian .ivu-input{
    height: 36px !important;
    border: 1px solid #bfcbd9;
    position: absolute;
    left: -3px;
    top:-10px;

  }
  /*#shijian .ivu-select-dropdown{*/
    /*width: 30%;*/
  /*}*/
  #citycity {
    .el-cascader__label {
      line-height: 36px !important;
    }
  }

</style>
<style scoped lang="scss">

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
    .chanpin{
      width: 100%;
      border-top: 3px solid #F1F4F5;
      margin-bottom: 15px;
      overflow: hidden;
      .alertOne{
        width: 100%;
        padding: 10px;
         table{
            width: 100%;
           thead{
             width: 100%;
             background:rgba(229,233,242,1);
             tr{
               width: 100%;
               th{
                 height:52px;
                 font-size:14px;
                 font-family:PingFangSC-Regular;
                 color:rgba(57,57,57,1);
                 line-height:52px;
                 text-align: center;
               };
             }
           }
           tbody{
             width: 100%;
             tr{
               width: 100%;
               background:rgba(255,255,255,1);
               td:nth-child(1){
                 border-left: 1px solid #bfcbd9;
               }
               td{
                 height:46px;
                 line-height:46px;
                 text-align: center;
                 border: 1px solid #bfcbd9;
                 border-left: 0;
                .track,.detail{
                   cursor: pointer;
                   color:rgba(32,160,255,1);
                 }
                 .track:hover,.detail:hover{
                   color:purple;
                 }
               }
             }
             tr:nth-child(2n){
               background: #e4e8f1;
             }
             tr:hover{
               background: #DBF0FF;
             }
           }
          }
      }
      .feiyongList{
        width: 100%;
        height: 44px;
        background:rgba(255,247,204,1);
        padding-left:50% ;
        li{
          height: 44px;
          line-height: 44px;
          float: left;
          margin: 0 5%;
        }
        li:last-child{
          color: #EA3047;
        }
      }
      .chanpinP{
        width: 100%;
        height:22px;
        font-size:16px;
        font-family:PingFangSC-Regular;
        color:rgba(136,136,136,1);
        line-height:22px;
        span{
          display:inline-block;
          width:4px;
          height:18px;
          background:rgba(230,88,49,1);
          margin: 0 5px;
          transform: translateY(2px);
        }
      }
      .el-button{
        margin: 20px 5%;

      }
      .alertOne{
        margin: 0 10px;
      }
    }
    .yuyue{
      width:100%;
        .yuyueP{
          width: 100%;
          height:22px;
          font-size:16px;
          font-family:PingFangSC-Regular;
          color:rgba(136,136,136,1);
          line-height:22px;
          margin-bottom: 15px;
          span{
            display:inline-block;
            width:4px;
            height:18px;
            background:rgba(230,88,49,1);
            margin: 0 5px;
            transform: translateY(2px);
          }

      }
      ul{
        width: 100%;
        li{
          width: 100%;
          margin-bottom: 15px;
          padding-left: 10px;
          span{
            color: #EA5413;
            margin-right: 20px;
          }
        }
      }
    }
    .zhibao{
      width:100%;
      overflow: hidden;
      margin-bottom: 15px;
      .zhibaoP{
        margin-bottom: 15px;
        width: 100%;
        height:22px;
        font-size:16px;
        font-family:PingFangSC-Regular;
        color:rgba(136,136,136,1);
        line-height:22px;
        margin-bottom: 15px;
        span{
          display:inline-block;
          width:4px;
          height:18px;
          background:rgba(230,88,49,1);
          margin: 0 5px;
          transform: translateY(2px);
          float: left;
        }
        p{
          width: 200px;
          margin-left: 20px;
          float: left;
          position: relative;
          .el-button{
             width: 200px;
          }
          img{
            display: inline-block;
            position: absolute;
            right: 0;
            top:0;
          }
        }

      }
    }
    .jinji{
      width:100%;
      overflow: hidden;
      margin-bottom: 15px;
      .jinjiduP{
        margin-bottom: 15px;
        width: 100%;
        height:22px;
        font-size:16px;
        font-family:PingFangSC-Regular;
        color:rgba(136,136,136,1);
        line-height:22px;
        margin-bottom: 15px;
        span{
          display:inline-block;
          width:4px;
          height:18px;
          background:rgba(230,88,49,1);
          margin: 0 5px;
          transform: translateY(2px);
          float: left;
        }
        p{
          position: relative;
          width: 200px;
          margin-left: 20px;
          float: left;
          .el-button{
            width: 200px;
          }
          img{
            display: inline-block;
            position: absolute;
            right: 0;
            top:0;
          }
        }

      }
    }
    .ziqudao{
      width: 100%;
      padding: 0  0 0 15px;

      .qitaP{
        span{
          display: inline-block;
          float: left;
        }
        width: 100%;
        overflow: hidden;
        margin-bottom: 15px;
        .el-textarea{
          display: inline-block;
          float: left;
          width: 400px;
          margin-left: 22px;
        }
      }

    }
      .ziqudaoP{
        overflow: hidden;
        margin-bottom: 15px;
        width: 100%;
        .el-select{
          margin-left: 20px;
          width:200px;
        }

      }
      .timeImg{
        display: inline-block;
        width: 16px;
        height: 16px;
        position: absolute;
        left:240px;
        top:15px;
      }
      .timeOptions{
        position: absolute;
        left: 10px;
        top:9px;
        display: inline-block;
        input{
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
          transition: border-color .2s cubic-bezier(.645,.045,.355,1);
          transform: translateX(-2px);
          /*position: absolute;*/
          /*left: 150px;*/
        }
      }
  .timeSlot{
    position: absolute;
    top: 36px;
    left: 0px;
    width: 320px;
    border: 1px solid #C0CCDA;
    background:rgba(255,255,255,1);
    box-shadow: 0px 0px 8px 0px rgba(187,187,187,0.5);
    border-radius: 8px;
    z-index: 2;
    p{
      position: relative;
      width: 100%;
      height: 38px;
      background:rgba(224,230,237,1);
      text-align: center;
      border-radius: 7px 7px 0px 0px ;
      span:nth-child(1){
        display: inline-block;
        position: absolute;
        left: 11px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        color:rgba(32,160,255,1);
        line-height:38px;
      }
      span:nth-child(2){
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
        line-height:38px;
      }
    }
    ul{
      /*overflow: hidden;*/
      width: 100%;
      padding: 15px;
      display: flex;
      flex-wrap: wrap;

      li{
        width: 136px;
        height: 36px;
        margin-right: 16px;
        /*text-align: center;*/
        /*overflow: hidden;*/
        button{
          transform: translateX(-12px);
          border: 1px solid #DFE4E9;
          border-radius: 4px ;
          width: 136px;
          height: 36px;
          font-size:14px;
          font-family:PingFangSC-Regular;
          color:rgba(136,136,136,1);
          background: #FFFFFF;
          line-height:36px;
          text-align: center;
        }
        button:hover{
          background: #DFE4E9;
          color: black;
        }
        button.timeActive{
          background: #20A0FF;
          font-size:14px;
          font-family:PingFangSC-Regular;
          color:rgba(255,255,255,1);
          border: none;
        }
      }
      li:nth-child(2n){
        margin-right: 0;
      }

    }
  }
  #history{
    position: relative;
    width: 100%;
    height: 147px;
    border: 1px solid #CCCCCC;
    padding: 10px;
    p:nth-child(1){
      width: 7%;
      float: left;
      padding: 10px 0;
      text-align: center;
      font-size:14px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:20px;
    }
    p.more{
      width: 7%;
      float: left;
      height: 60px;
      padding: 10px 0;
      text-align: center;
      font-size:14px;
      font-family:PingFangSC-Regular;
      color:rgba(32,160,255,1);
      line-height:20px;
    }
    ul{
      float: left;
      width: 86%;
      display: flex;
      overflow-x:auto ;
      li{
        height: 65px;
        background: #F8F8F8;
        flex: 1;
        width: 150px;
        margin-right:10px ;
        text-align: left;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(136,136,136,1);
        line-height:20px;
      }
      li:hover{
        font-family:PingFangSC-Regular;
        color:rgba(32,160,255,1);
        background: #E8F7FD;
      }
    }
  }
</style>


