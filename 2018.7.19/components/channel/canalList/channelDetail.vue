
<template>
  <div id="app">
    <div class="container">
      <div>
        {{isDetailed.title}}
        <p class="close" @click="closeMove">
          关闭
          <span>
            <img src="/static/images/closeIcon.png" alt="">
          </span>
        </p>
      </div>
      <p>
        <span @click="takeUp(data='基本信息')" class="cursor">
            <img :src="jiantou" alt="">
        </span>
        基本信息
      </p>
      <div class="essentialInfo" v-if="telescopic">
        <div>
          <button  @click="edit "  :class="{isActive:isEdit(),button:true}" :disabled="isEdit()">{{btnName}}</button>
          <button @click="open3" class="cursor button">修改密码</button>
          <br>
        </div>
        <table :class="{edit:isEdit(),essentialTable:true}">
          <tr>
            <td>渠道名称</td><td>{{dataObj.name}}</td>
            <td>渠道类型</td><td>{{dataObj.type|channelTypeShow}}</td>
            <td>渠道编号</td><td>{{dataObj.id}}</td>
          </tr>
          <tr>
            <td>联系人</td>
            <td>
              <span v-if="!isEdit()">
                {{dataObj.linkmanName}}
              </span>
              <span v-else>
                  <input
                    class="elInput"
                    placeholder="请填写内容"
                    v-model.trim="dataObj.linkmanName"/>
              </span>
            </td>
            <td>联系手机</td>
            <td>
              <span v-if="!isEdit()">
                {{dataObj.linkmanTelephone}}
              </span>
              <span v-else>
                  <input
                    class="elInput"
                    placeholder="请填写内容"
                    v-model.trim="dataObj.linkmanTelephone"/>
              </span>
            </td>
            <td>座机</td>
            <td>
              <span v-if="!isEdit()">
                {{dataObj.companyTelephone}}
              </span>
              <span v-else>
                  <input
                    class="elInput"
                    placeholder="请填写内容"
                    v-model.trim="dataObj.companyTelephone"/>
              </span>
            </td>
          </tr>
          <tr>
            <td>登陆账号</td><td>{{dataObj.account}}</td>
            <td>城市</td>
            <td>
                  <span v-if="!isEdit()">
                    {{dataObj.areaName}}
                  </span>
                  <span v-else>
                      <el-cascader
                        expand-trigger="hover"
                        :options="options"
                        :props="props"
                        style="margin-left: 30px"
                        placeholder="请选择城市"
                        v-model.trim="selectedOptions2"
                        @change="handleChange">
                      </el-cascader>
                    区域：<el-cascader id="city"
                               :disabled="disabled"
                               @change="changeSelector($event)"
                               ref="one"
                               :options="serveAreas"
                               placeholder="请选择区域"
                               v-model.trim="selectedOptions1"
                               :props="props2"
                      ></el-cascader>
                  </span>
            </td>
            <td>详细地址</td>
            <td>
              <span v-if="!isEdit()">
                {{dataObj.headquarterAddress}}
              </span>
              <span v-else>
                  <input
                    class="elInput"
                    placeholder="请填写内容"
                    v-model.trim="dataObj.headquarterAddress"/>
              </span>
            </td>
          </tr>
          <tr>
            <td>开户行</td>
            <td>
              <span v-if="!isEdit()">
                {{dataObj.bankOfDeposit}}
              </span>
              <span v-else>
                <el-select class="elSelect" v-model.trim="dataObj.bankOfDeposit" placeholder="请选择"
                           @change="selector1(bank,bank.bankName,dataObj.bankOfDeposit)">
                <el-option
                  v-for="items in bank.bankName"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
              </span>
            </td>
            <td>卡号</td>
            <td>
              <span v-if="!isEdit()">
                {{dataObj.cardNumber}}
              </span>
              <span v-else>
                  <input
                    class="elInput"
                    placeholder="请填写内容"
                    v-model.trim="dataObj.cardNumber"/>
              </span>
            </td>
            <td>账单日</td>
            <td>
              <span v-if="!isEdit()">
                每月{{dataObj.settleDay}}号
              </span>
              <span v-else>
                 <el-select class="elSelect" v-model.trim="dataObj.settleDay" placeholder="请选择">
                <el-option
                  v-for="(item,index) in 30"
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
              </span>
            </td>
          </tr>
          <tr>
            <td>结算方式</td>
            <td>
              <span v-if="!isEdit()">
                {{dataObj.settleType|settleType}}
              </span>
              <span v-else  style="margin-left: -20px">
                <el-radio class="radio" v-model.trim="dataObj.settleType" label="0">渠道先结</el-radio>
                <el-radio class="radio" v-model.trim="dataObj.settleType" label="1">渠道后结</el-radio>
              </span>
            </td>
            <td>子渠道数量</td><td>{{dataObj.subclassCount}}</td>
            <td>用户数</td><td>{{dataObj.userNumber}}人</td>
          </tr>
          <tr>
            <td>总订单量</td><td>{{dataObj.totalOrders}}</td>
            <td>已完成单数</td><td>{{dataObj.completeCount}}</td>
            <td>状态</td><td>{{dataObj.state|userState}}</td>
          </tr>
        </table>
        <button @click="enter()" v-if="isEdit()" class="button">保存</button>
        <button class="button"  @click="cancelEdit" v-if="isEdit()">取消</button>
      </div>
      <p>
        <span @click="takeUp(data='子类信息')" class="cursor">
            <img :src="jiantou1" alt="">
        </span>
        子类信息
      </p>
      <div class="subclassInfo" v-if="telescopic1">
        <div>
          <button   @click="add()">新增渠道子分类</button>
        </div>
        <table>
          <thead>
             <tr>
               <th v-for="(item,index) in theadList" :key="index">{{item}}</th>
             </tr>
          </thead>
          <tbody>
              <tr v-for="(item,index) in subsetInfos" :key = 'index'>
                <td>
                  {{item.city}}
                  <input type="text" v-model.trim="item.link" class="copy_input" ref="link" style="display: none">
                </td>
                <td>
                  {{item.name}}
                </td>
                <td>
                  {{item.scale}}
                </td>
                <td>
                  {{item.userNumber}}
                </td>
                <td>
                  {{item.totalOutput}}
                </td>
                <td>
                  {{item.totalWater}}
                </td>
                <td>
                  {{item.createDate|moment('YYYY-MM-DD HH:mm:ss')}}
                </td>
                <td>
                  <a href="javascript:;" @click="bindingMaster(item)">绑定</a>
                  <a href="javascript:;" @click="copy(item,index)" v-if="!!item.link">复制链接</a>
                  <a v-if="item.wechatQrCode" style="display: inline-block;height:100%" :href="item.wechatQrCode" target="_black" download="图片">下载二维码</a>
                  <a href="javascript:;" @click="siteDetl(item)">详情</a>
                  <a href="javascript:;" style="display: inline-block;height:100%;color: #E65831;" @click="handleDelete(index,item)">删除</a>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
      </div>
    <div class="alert" v-if="isAdd.isShow" >
      <add :isAdd="isAdd" :findOne="findOne">
      </add>
    </div>
    <Psaaword v-if="psaawordShow" @isClose="isClose" :dataObjID="dataObj.id" @password="password"></Psaaword>
    <!--绑定师傅和子渠道详情-->
    <binding
      v-if="binding.isShow"
      :binding = 'binding'
    ></binding>
  </div>
</template>

<script>
  import add from './addsubchannel.vue';
  import Psaaword from './password.vue';
  import binding from './bindingAndDetails.vue';
  export default {
    components:{
      add,Psaaword,binding
    },
    props:["isDetailed","quiry"],
    data(){
      return{
        binding:{
          title:'绑定师傅',
          isShow:false
        },
        theadList:['城市','子渠道','规模','用户量','总单量','总流水','创建时间','操作'],
        jiantou:"./static/images/topDetl.png",
        jiantou1:"./static/images/topDetl.png",
        telescopic:true,
        telescopic1:true,
        bank:{
          name: "开户行",
          key: "bankOfDeposit",
          bankValue: '',
          bankName: [
            {
              value: '中国工商银行',
              id: "ICBC"
            }, {
              value: '中国农业银行',
              id: "Agricultural"
            }, {
              value: '中国建设银行',
              id: "Constructio"
            }, {
              value: '中国银行',
              id: "China"
            }, {
              value: '招商银行',
              id: "Merchants"
            }, {
              value: '交通银行',
              id: "Communications"
            }, {
              value: '中国民生银行',
              id: "Minsheng"
            }, {
              value: '兴业银行',
              id: "Industrial "
            }, {
              value: '上海浦东发展银行',
              id: "Development"
            }, {
              value: '中信银行',
              id: "CITIC"
            },{
              value:'农村信用合作社',
              id:"RuralCreditCooperative"
            }
          ]
        },
        psaawordShow:false,
        //区域start
        linkmanAreaId:"",//街道ID
        linkmanName:"", //街道名字
        disabled:true,
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
        Datevalue:1,
        radio:false,
        theadsName:[
          "城市",
          "子渠道",
          "规模",
          "用户量",
          "总单量",
          "总流水",
          "创建日期",
          "操作",
        ],
        isAdd:{
          title:"新增子渠道",
          isShow:false
        },
        dataObj:{},
        subsetInfos:[],
        btnName:"编辑信息",
      }
    },
    created(){

      this.findOne();
//      城市数据
      let cityurl = `${this.$apidomain}/common/findprovinceandcitylist`;
      this.$http.get(cityurl).then(res=>{
        if (res.data.code === '0000') {
          this.options =res.data.result;
        }
      });
    },
    methods: {
      bindingMaster(data){
        this.binding.title = '绑定师傅';
        this.binding.isShow = true;
        this.binding.id = data.id;

      },
      siteDetl(data){
        this.binding.title = '子渠道详情';
        this.binding.isShow = true;
        this.binding.id = data.id;
      },
      takeUp(data) {
        if (data === '基本信息') {
          this.telescopic = !this.telescopic
          if (this.telescopic) {
            this.jiantou = "./static/images/topDetl.png";
          } else {
            this.jiantou = "./static/images/bottomDetl.png";
          }
        }
        if (data === '子类信息') {
          this.telescopic1 = !this.telescopic1
          if (this.telescopic1) {
            this.jiantou1 = "./static/images/topDetl.png";
          } else {
            this.jiantou1 = "./static/images/bottomDetl.png";
          }
        }
      },
      selector1(item,values,bankValue){
        console.log(bankValue)
        this.bank.bankValue = bankValue;
//        console.log((bankValue));
//        values.forEach((v,i)=>{
//          if(v.value===bankValue){
//            console.log(v,"8888888")
//            this.selectorBehindObj[key]=v.id;
//          }
//        })
      },
      password(v){
        this.dataObj.password = v;
      },
      isClose(v){
        this.psaawordShow = v;
      },
      changeSelector($event) {//街道
        this.linkmanAreaId = this.selectedOptions1[this.selectedOptions1.length - 1];
        this.linkmanName =this.$refs.one.currentLabels[1];
      },
      handleChange(value) { //街道
        this.cityId = value[value.length - 1];
        //选择区域街道
        let cityIdurl=this.$apidomain+"/common/findareaandstreetoptions?cityId="+ this.cityId;//获取区域
        this.$http.get(cityIdurl).then(res=>{
          this.serveAreas = res.data.result;
        })
        this.disabled = false;
      },
  // 复制链接
      copy(item,index){
        console.log('1111')
        let inputDom=this.$refs.link[index]
            inputDom.select();
            document.execCommand("copy")
            this.$queryFun.successAlert.call(this,"复制成功","1")
      },
      findOne(){
        let url=this.$apidomain+"/officialpartnerinfo/findonedetails?id="+this.isDetailed.id;
        this.$http.get(url).then(r=>{
          console.log(r,'findOne')
          let data=r.data;
          this.dataObj = data.result.info;
          this.subsetInfos = data.result.subsetInfos;
        })
      },

      add(){
        this.isAdd.officialPartnerId = this.isDetailed.id;
        this.isAdd.isShow = true;
      },
      handleDelete(index,item){
        let url=this.$apidomain+"/officialPartnerSubsetInfo/deleteOfficialPartnerSubsetInfo";
        this.$http.post(url,item).then(res=>{
          let data = res.data;
          this.findOne();
        })
      },
      //保存
      enter(){
        if(!this.dataObj.linkmanName){
          alert("请填写联系人...");
          return;
        }
        if(!this.dataObj.linkmanTelephone){
          alert("请填写联系手机号...");
          return;
        }
//        if(!this.dataObj.companyTelephone){
//          alert("请填写公司电话...");
//          return;
//        }
//        if(this.bank.bankValue==""){
//          alert("请填写开户行...");
//          return;
//        }
//        if(!this.dataObj.cardNumber){
//          alert("请填写银行卡号...");
//          return;
//        }
        let o = {};
        o.id = this.dataObj.id;
        o.areaName = this.linkmanName;
        o.areaId = this.linkmanAreaId
        o.linkmanTelephone = this.dataObj.linkmanTelephone;
        o.companyTelephone = this.dataObj.companyTelephone;
        o.bankOfDeposit = this.dataObj.bankOfDeposit;
        o.cardNumber = this.dataObj.cardNumber;
        o.settleType =this.dataObj.settleType;
        o.settleDay = this.dataObj.settleDay;
        let url=this.$apidomain+"/officialpartnerinfo/updateOfficialPartnerInfo";
        console.log(o,'编辑数据')
        this.$http.post(url,o).then(res=>{
          let data = res.data;
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.quiry();
          this.cancelEdit();
        })

      },
      //初始化密码操作 start
      open3() {
           this.psaawordShow = true;
//        this.$prompt('请填写密码', '提示', {
//        }).then(({ value }) => {
//          if(value.length<6){
//            alert("密码不能少于6位");
//            return;
//          }
//          let o = {"id":this.dataObj.id,"password":md5(value)};
//          let urlR=this.$apidomain+"/officialpartnerinfo/updatePassword";
//          this.$http.post(urlR,o).then(r=>{
//            let data=r.data;
//            if(data.code=='0000'){
//              this.$message({
//                type: 'success',
//                message: '操作成功'
//              });
//              this.close();
//            }else{
//              alert(data.error);
//            }
//          });
//          this.dataObj.password=value
//        }).catch(() => {
//          this.$message({
//            type: 'info',
//            message: '取消输入'
//          });
//        });
      },
      //初始化密码操作end
      edit(){  //编辑
        this.$store.commit("edit",!this.isEdit());
      },
      isEdit(){
        return this.$store.state.isEdit;
      },
      cancelEdit(){   //取消编辑
        this.$store.commit("edit",!this.isEdit());
        this.btnName="编辑信息";
      },
      onchangeFile(event,keyImg){
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
            this.selectorBehindObj[keyImg]=data.url;   //参数是ajax返回的图片地址
          }else{
            alert("上传失败");
          }

        });
      },
      handleItemChange(val) {
      },
      checkIdIn(obj,id){
        let isin = true;
        obj.forEach((e)=>{
          if(e.id==id){
            isin = false;
          }
        })
        return isin;
      },
      getIds(obj){
        let k = "";
        obj.forEach((e,i)=>{
          k += e.id+",";
        });
        k = k.substring(0,k.length-1);
        return k;
      },
      getLabel(obj,id){
        let value = "";
        obj.forEach((e,i)=>{
          if(e.id==id){
            value = e.value;
          }
        });
        return value;
      },
      closeMove(){
        this.isDetailed.isShow=false;
      },
    },
    mounted() {

    },
    watch:{

    }
  }
</script>
<style>
  #channelDetaiLis .el-cascader__label{
    line-height: 46px !important;
  }
</style>

<style scoped lang="scss">
  @import "../../../assets/styles/commButton";
  .el-input{
    width:217px;
  }
  button{
    width:120px;
    cursor:pointer;
    line-height:40px;
    border:none;
    padding:0;
    margin:0;
    color:#fff;
    transform: rotate(-360deg);
    border: 1px solid #979797;
    border-radius: 4px;
    float:left;
    background:green;
    outline:none;
  }
  .container{
    width:100%;
    margin-top: -10px;
    table{
      width: 100%;
      border-collapse: collapse;
      border:1px #C0CCDA solid;
      tr,td{
        margin: 0;padding: 0;
      }
      td{
        border-right: 1px #C0CCDA solid ;
      }
    }
    >div:nth-of-type(1){
      box-shadow:0px 2px 4px 0px rgba(185,185,185,0.5);
      border-top: none;
      text-align: center;
      width: 100%;
      height:60px;
      font-size:18px;
      font-family:PingFangSC-Regular;
      color:rgba(57,57,57,1);
      line-height:60px;
      .close{
        float: right;
        display: inline-block;
        right:3%;
        cursor: pointer;
        font-size: 13px;
        color: #D0021B;
        background: #FFFFFF;
        transform: translateX(-32px);
        span{
          transform: translateY(2px);
          display: inline-block;
          width: 16px;
          height: 16px;
        }
      }
    }
    >p{
      background:rgba(224,230,237,1);
      height:36px;
      width: 100%;
      line-height: 36px;
      font-size:12px;
      font-family:PingFangSC-Regular;
      color:rgba(57,57,57,1);
      margin: 19px 0 9px 0;
      span{
        margin-left: 20px;
        width: 13px;
        height: 8px;
        display: inline-block;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    >.essentialInfo{
      margin-bottom: 40px;
      >p{
        margin-top: 19px;
        margin-left: 20px;
        width:56px;
        height:20px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(35,161,254,1);
        line-height:20px;
      }
      >div{
        margin-bottom: 90px;
      }
      .button{
        border: none;
        width:88px;
        height:36px;
        line-height: 36px;
        background:rgba(35,161,254,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(255,255,255,1);
        margin-right: 10px;
      }
      .isActive{
        background:rgba(192,204,218,1);
      }
      >.essentialTable{
        margin-bottom: 18px;
        .el-cascader{
          width: 100% !important;
          margin-left: -25px !important;
          //display: inline !important;
          .el-input, .el-input__inner{
            display: inline !important;
          }
        }
        .el-cascader:nth-of-type(2){
          margin-left: -12px !important;
        }

        tr{
          font-size:13px;
          font-family:PingFangSC-Regular;
          color:rgba(94,109,130,1);
          height: 30px;
          border-bottom: 1px #C0CCDA solid;
          td:nth-of-type(odd){
            width: 110px;
            text-align: center;
            background:rgba(240,240,240,1);
          }
          td:nth-of-type(even){
            width: 200px;
            color:rgba(57,57,57,1);
            text-indent: 14px;
          }
        }
        .elInput{
          width: 100%;
          margin-left: -14px;
          height:30px;
          border:none;
          outline:none;
        }
        .elSelect{
          width: 100%;
          //height:20px;
          border:none;
          margin-left:-28px;
          outline:none;
        }
      }
      .edit{
        tr{
          td{background:rgba(240,240,240,1); }
        }
        tr:nth-of-type(3){
          td:nth-of-type(4),td:nth-of-type(6){
            background: #FFFFFF;
          }
        }
        tr:nth-of-type(5){
          td:nth-of-type(2){
            background: #FFFFFF;
          }
        }
      }
    }
    .subclassInfo{
      margin-bottom: 100px;
      >div{
        width: 100%;
        >button{
          border: none;
          margin-bottom: 8px;
          width:127px;
          height:36px;
          background:rgba(35,161,254,1);
          border-radius:4px;
          font-size:14px;
          font-family:PingFangSC-Regular;
          color:rgba(255,255,255,1);
          line-height:36px;
        }
      }
      >table{
        tr{
          background: #FFFFFF;
          border-bottom: 1px #C0CCDA solid;
          height: 58px;
          td,th{
            text-align: center;
            border-right: 1px #C0CCDA solid;
          }
        }
          tr{
            th{background:rgba(240,240,240,1);}
            height: 49px;
            td:nth-of-type(8){
              width:400px;
              a{
                display: inline-block;
                margin-right: 9px;
              }
            }
          }
        tr:nth-of-type(even){
          background:rgba(248,248,248,1);
        }
      }
    }




    >h3,.consume_info > h3{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      padding-left:10px;
      line-height: 40px;
      letter-spacing: 0;
    }
    >.content{
      width:100%;
      height: 78%;
      display:flex;
      overflow-y: auto;
      >div{
        flex:1;
        >ul{
          /*width:35%;*/
          padding-top:20px;
          >li{
            /*text-align: right;*/
            /*margin-top:20px;*/
            width:310px;
            .files{
              display: flex;
              flex-wrap:wrap;
              padding:0;
              >li{
                width:50%;
                height:auto;
                margin-bottom:30px;
                >input{

                }
                >img{
                  display: block;
                  width:270px;
                  height: 130px;
                }
              }
            }
          }
        }
      }
      >.left_info{
        >.title{
          padding-left:10px;
        }
      }
      .title{
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }
    }
    .consume_info{
      padding-bottom:200px;
      padding-left:10px;
      position:relative;
      >.title{
        padding-left:10px;
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }
      >h3{
        padding-left:0;
        line-height: 50px;
      }


    }
  }
  ul{
    padding-left:10px;
    list-style:none;
    >li{
      line-height:45px;
    }
    >.edit_open{
      background: #E8D7F6;
      border-radius: 4px;
      padding-left:10px;
      >span{
        height:100%;
        padding:0 10px;
        color:blue;
        cursor: pointer;
        display: inline-block;
      }
      >input{
        width:50px;
        border:none;
        outline:none;
      }
    }
  }
  .file {
    position: relative;
    display: block;

    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    width:280px;
    height: 140px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
  }
  .file input {
    position: absolute;
    font-size: 100px;
    width:100%;
    height: 100%;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
  }

  .closeX{
    background:url(../../../../static/images/del.png) center center no-repeat;
    background-size:100% 100%;
    background-origin: content-box;
  }
  .dable_lsit{
    overflow-x: auto;
    margin-top:80px;
    margin-bottom:200px;
    table1{
      width:100%;
      .theads{

        >th{
          padding:10px 10px;
          text-align:center;
          background: #E5E9F2;
          box-shadow: inset 0 1px 0 0 #E0E6ED,
          inset 0 -1px 0 0 #E0E6ED;

        }
        >.multiple{
          width:30px;
          cursor:pointer;
          box-size:border-box;
        }
      }
      >tbody{
        >tr{
          border-top:1px solid #ccc;
          >td{
            border-bottom:1px solid #ccc;
            padding:10px 10px;
            text-align:center;
            .copy_input{
              position:absolute;
              left:0;
              border:none;
              top:0;
              transform:translateX(-10000em);
              opcity:0;
            }
          }
          .icon{
            padding:0;
            i{
              cursor:pointer;
              padding:10px 0;
              font-size:18px;
              display: inline-block;
              padding-right:5px;
            }
            >i:last-of-type{
              padding-right:0;
            }
          }
          >td:first-of-type{
            border-right:1px solid #ccc;
          }
          >td:last-of-type{
            //display: flex;
            padding-top:0;
            padding-bottom:0;
            >span{
              flex:1;
              height:100%;
              /*float:left;*/
              padding-top:4px;
              /*padding-left:30px;*/
            }
            >.details_icon{
              flex:1;
              /*float:right;*/
              padding-left:0px;
              /*padding-top:8px;*/
              text-align: center;
              /*padding-right:20px;*/
              cursor:pointer;
            }
            >.Reminded_icon{

            }
            >.recover{
              i{

              }
            }

            .detailed_icon{

            }
          }
        }
        >tr:nth-of-type(even){
          background: #F9FAFC;
        }
      }
    }
    >.derive{
      float:right;
      >.derive_btn{
        margin-left:0;
      }
    }
  }
  /*@media screen and (max-width: 750px) {*/
    /*table{*/
      /*width:50vw !important;*/
    /*}*/
  /*}*/
</style>
<style lang="scss">
  .el-select-dropdown__item{
    line-height: 25px !important;
  }
  .el-select-dropdown{
    z-index: 9999 !important;
  }
  .el-table__body{
    /*width:1000px !important;*/
  }
  .el-table__row{
    >td:last-of-type{
      width:150px !important;
    }
  }
  .el-table_1_column_40,.cell{
    width:150px !important;
  }
  .el-message-box__wrapper{
    z-index:99999 !important;
  }
</style>


