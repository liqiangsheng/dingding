<template>
  <div id="app">
    <div >
      <AddAlter @isClose="isClose" v-if="addShow" @pejianzengjia="pejianzengjia" :cityId="cityId"></AddAlter>
      <AddAlterOne @isClose="isClose" v-if="addShowONE" @pejianzengjia="pejianzengjia" :bianjiData1="bianjiData1" :cityId="cityId"></AddAlterOne>
      <BianjiAlter @isClose="isClose" v-if="bianjiShow" @pejianzengjia="pejianzengjia" :bianjiData="bianjiData"  :cityId="cityId"></BianjiAlter>
      <div>
        <div class="yuyue">
          <p class="yuyueP"><span></span>预约信息（带<b style="color: #EA5413">*</b>为必填）</p><br>
          <ul>
            <li>　　联系人<span>*</span><el-input v-model="input1" placeholder="请输入联系人" style="width: 200px"></el-input></li>
            <li>联系人手机<span>*</span><el-input v-model="input2" placeholder="请输入正确手机号码" style="width: 200px"></el-input> 　　　<b style="font-weight:100; margin: 0 20px">座机</b><el-input v-model="input6" placeholder="请输入正确座机（非必填）" style="width: 200px"></el-input></li>
            <li id="citycity">　服务地区<span>*</span>
              <el-cascader
                style="width:200px;"
                expand-trigger="hover"
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
            </li>
            <li>　详细地址<span>*</span><el-input v-model="input4" placeholder="请填写详细地址" style="width: 200px"></el-input></li>
            <li id="shijian">　预约时间<span>*</span>
              <!--<Col span="12" style="display: inline-block">-->
              <!--<DatePicker type="date" placeholder="请选择日期" style="width: 24.6%;height: 36px" v-model="input5"></DatePicker>-->
              <DatePicker type="datetime" v-model="input5" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择预约日期" style="width: 200px;height: 36px"></DatePicker><!--</Col>-->
            </li>

          </ul>
        </div>

        <div class="chanpin">
          <p class="chanpinP"><span></span>产品信息</p><br>
          <span style="color: #EA5413">请选择服务产品*</span>
          <el-button type="success" @click="addProduct" v-if="xiaohui">添加产品</el-button>
          <el-button type="success" @click="addProduct1" v-if="xiaohui1">新增产品</el-button>

          <div class="alertOne" v-if="peijiankuang">
            <!--表格数据-->
            <table>
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
              <li>检测费小计：{{zongjia}}元</li>
              <li>服务费小计：{{fuwufei}}元</li>
              <li>预估价：{{yujifei}}元</li>
            </ul>

          </div>
        </div>


        <ul class= "jinji">
          <li class="jinjiduP"><span></span><b style="float: left;font-weight: 100">紧急程度</b>
            <p @click="danxuan3(item,index)" v-for="(item,index) in jinjidu"><el-button>{{item}}</el-button><img src="/static/images/danxuan.png" v-show="jinjiduIndex == index"></p>
          </li>

        </ul>
        <div class="ziqudao">
          <p class="ziqudaoP">　　主渠道
            <el-select v-model="value1" placeholder="请选择子渠道" @change="zuqudaoA(value)">
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
                v-for="(item,index) in ziqudao"
                :key="index"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </p>

        </div>
        <ul class="zhibao" v-show="qudaoShow">
          <li class="zhibaoP"><span></span><b style="float: left;font-weight: 100">渠道质保</b>
            <p @click="danxuan2(item,index)" v-for="(item,index) in zhibao"><el-button>{{item}}</el-button><img src="/static/images/danxuan.png"  v-show="jinjiduIndex1 == index"></p>
          </li>
        </ul>
        <div>
          <p id="beizhu" class="qitaP" style="width: 100%;height: 100px;position: relative"><span>　　　其他</span>
            <el-input
            type="textarea"
            placeholder="请输入其他备注"
            v-model="qita">
          </el-input>
          </p>
          <p class="addTijiao" style="width: 90%;margin:20px 8%;">
            <el-button type="primary" @click="addTijiao" style="width:200px">提交</el-button>
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
  export default {
    components:{
      AddAlter,BianjiAlter,AddAlterOne
    },
    data() {
      return {
        qudaoShow:false,
        disabled:true,
        zhuqudao:[],//主渠道
        zhuqudaoId:"",//主渠道ID
        value1:"",////主渠道值
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
      }
    },
    computed:{

    },
    created(){
   //主渠道
      let findchannelurl=common.apidomain+"/common/findchannel";
      this.$http.get(findchannelurl).then(res=>{
        if(res.data.code === "0000"){
          this.zhuqudao = res.data.result;
        }

      });
//城市
      let cityurl = `${this.$apidomain}/common/findprovinceandcitylist`;
      this.$http.get(cityurl).then(res=>{
        if (res.data.code === '0000') {
          this.options =res.data.result;
        }
      });

    },
    methods: {
      zuqudaoA(value){ //主渠道
        this.zhuqudao.forEach((v,i)=>{
          if(value == v.name){
            this.zhuqudaoId = v.id;
          }
        });
        //子渠道
        let url1 = this.$apidomain+"/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo?officialPartnerId="+this.zhuqudaoId;
        this.$http.get(url1).then(res=>{
          if(res.data.code === "0000"){
            this.ziqudao = res.data.result;
            this.disabled = false;
          }
        });
      },

      ziqudaoA(value){ //子渠道
        this.ziqudao.forEach((v,i)=>{
          if(value == v.name){
            this.xiaoqudaoId = v.id;
          }
        })
        this.qudaoShow = true;
      },
      handleChange(value) {
        this.cityId = value[value.length - 1];
        this.$store.dispatch("cityIdid",this.cityId)
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
      ifElse(){  //
        if(this.input1 == ""){
          this.flag = false;
          this.$queryFun.successAlert.call(this,"请填写联系人")
          return setTimeout(()=>{
            location.reload();
          },1000)
        }

        if(this.input2 == ""){
          this.flag = false;
          this.$queryFun.successAlert.call(this,"请填写联系人手机");
          return setTimeout(()=>{
            location.reload();
          },1000)
        }
        let reg =  /^(13[0-9]|15[0-35-9]|18[0-9]|17[06-8]|14[57])\d{8}$/;
        if(reg.test(this.input2)==false){
          this.flag = false;
          this.$queryFun.successAlert.call(this,"请填写正确手机号");
          return setTimeout(()=>{
            location.reload();
          },1000)

        }
        if(this.selectedOptions2.length<=0||this.selectedOptions1.length<=0){
          this.flag = false;
          this.$queryFun.successAlert.call(this,"请填写服务地区");
          return setTimeout(()=>{
            location.reload();
          },1000)
        }
        if(this.input4 == ""){
          this.flag = false;
          this.$queryFun.successAlert.call(this,"请填写详细地址");
          return setTimeout(()=>{
            location.reload();
          },1000)

        }
        if(this.input5 == ""){

          this.flag = false;
          this.$queryFun.successAlert.call(this,"请填写预约时间");
          return setTimeout(()=>{
            location.reload();
          },1000)
        }
      },

      addTijiao(){ //提交
        console.log(111)
        this.ifElse();

        if(this.peijiankuang == false){
          this.flag = false;
          this.$queryFun.successAlert.call(this,"请添加产品")
          return setTimeout(()=>{
            location.reload();
          },1000)
        }
        if(this.danxuanShow1 == false&&this.danxuanShow2 == false){
          this.flag = false;
          this.$queryFun.successAlert.call(this,"请选择质保状态");
          return setTimeout(()=>{
            location.reload();
          },1000)
        }
        if(this.danxuanShow3 == false&&this.danxuanShow4 == false){
          this.flag = false;
          this.$queryFun.successAlert.call(this,"请选择紧急程度");
          return setTimeout(()=>{
            location.reload();
          },1000)
        }
        this.query();
      },
      detailClick(v,i){  //删除
        this.tableListData = this.tableListData.filter((item,index)=>{
          return v.id != item.id;
        })
        if(this.tableListData.length <= 0){
          this.peijiankuang = false;
        }

      },
      bianjiClick(v,i){  //编辑
        this.flagOne = 3;
        this.bianjiData = v;
        this.bianjiShow = true;
      },
      pejianzengjia(obj){  //配件增加
        this.bianjiData1 = obj;
        this.peijiankuang = true;
        if(this.flagOne == 1){
          this.tableListData.push(obj)
        }else if(this.flagOne == 2){
          this.tableListData.push(obj)

        }else if(this.flagOne == 3){
          for(let i=0;i<this.tableListData.length;i++){
            this.tableListData.splice(this.tableListData[i],1,obj)
          }
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
      },


      addProduct1(){//添加产品
        this.flagOne = 2;
        this.xiaohui = false;
        this.ifElse();
        if( this.flag == false){
          this.addShowONE = false;
        }else if(this.flag == true){
          this.addShowONE = true;
        }

      },
      addProduct(){//添加产品
        this.flagOne = 1;
        this.xiaohui1 = false;
        this.ifElse();

        if( this.flag == false){
          this.addShow = false;
        }else if(this.flag == true){
          this.addShow = true;
        }
      },
      query(){  //初始数据
        this.input5 = this.$moment(this.input5).format("YYYY-MM-DD HH:mm:ss");
        this.getTableList(this.paramsData());
      },
      paramsData(){  //传数据给后台
        let aaaaaa=JSON.stringify(this.tableListData)
        return{
          "officialPartnerId":this.zhuqudaoId, //主渠道ID
          "appointmentDatetime":this.input5, //预约时间
          "linkmanAddress":this.input4, //详细地址
          "linkmanArea":this.linkmanName, //街道
          "linkmanAreaId":this.linkmanAreaId, //街道id
          "linkmanName":this.input1, //联系人名称
          "linkmanPhoneNum":this.input2, //联系人手机号
          "linkmanTelephone":this.input6, //联系人座机
          "serviceIdsJson":aaaaaa, // 产品信息
          "orderRemark":this.qita, // 订单备注其他
          "officialPartnerSubsetId":this.xiaoqudaoId,    //  子渠道id
          "emergencyDegree":this.jinjiduStr, // 紧急度
          "channelWarranty":this.zhibaoStr,    //  渠道质保

        };
      },
      getTableList(params){
        let url=this.$apidomain+"/order/submit";
        this.$http.post(url,params).then(res=>{
          console.log(res)
          if(res.data.code == "0000"){
            //充值显示
            this.$queryFun.successAlert.call(this,"恭喜工单新建成功","1");
            this.$router.push({path:"/order/list2"})
           location.reload();
           return

          }else{
            return this.$queryFun.successAlert.call(this,res.data.error)
          }

        })
      },

      danxuan2(v,i){//保外单选
        this.jinjiduIndex1 = i;
        if(i=0){
          this.zhibaoStr = "0";
        }else if(i=1){
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

//
    },
    mounted() {
    },
  }
</script>
<style lang="scss">
  #beizhu .el-textarea__inner{
    width: 400px;
    position: absolute;
    /*float: left;*/left:98px;
    top:0;
  }
  #shijian .ivu-input{
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
            display: flex;
            th{
              flex: 1;
              height:52px;
              font-size:14px;
              font-family:PingFangSC-Regular;
              color:rgba(57,57,57,1);
              line-height:52px;
              text-align: center;
            };
            th:nth-child(2){
              flex-grow:3;
            }
          }
        }
        tbody{
          width: 100%;

          tr{
            width: 100%;
            display: flex;
            border-left: 1px solid #bfcbd9;
            background:rgba(255,255,255,1);
            td{
              height:46px;
              flex: 1;
              line-height:46px;
              text-align: center;
              border: 1px solid #bfcbd9;
              border-bottom: 0;
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
          tr:last-child{
            border-bottom: 1px solid #bfcbd9;
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
      margin: 20px 1%;

    }
    .alertOne{
      margin: 0 10px;
    }
  }
  .yuyue{
    width: 100%;
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


    .ziqudaoP{
      overflow: hidden;
      margin-bottom: 15px;
      width: 100%;
      .el-select{
        margin-left: 20px;
        width: 200px;
      }

    }
  }
  .qitaP{
    margin-bottom: 15px;
    span{
      display: inline-block;
      transform: translateY(12px);
    }

  }
</style>



