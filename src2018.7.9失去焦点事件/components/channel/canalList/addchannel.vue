<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{isAdd.title}} <p class="closeX" id="closeX" @click="closeMove"></p></h3>
      <div class="scrollbar content">
        <div class="left_info">
          <ul>
            <li>
              <span class="list_name">  渠道类型<b style="color: #EA5413">*</b></span>
              <el-select
                v-model.trim="type.SourceTypeValue" placeholder="请选择"
                @change="selector(type,type.SourceType,type.SourceTypeValue)">
                <el-option
                  v-for="items in type.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
              <span v-show="typeOne" style="color: red">{{typeOne}}</span>
            </li>
            <li v-for="(item,index) in inputs" :key="index">
              <inputs-list :item="item" :inputs="inputs"></inputs-list>
            </li>
            <li>
              <span class="list_name">  开户行</span>
              <el-select
                v-model.trim="bank.bankValue" placeholder="请选择" @change="selector1(bank,bank.bankName,bank.bankValue)">
                <el-option
                  v-for="items in bank.bankName"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>

            <li>
              <span class="list_name">总部地址<b style="color: #EA5413">*</b></span>
                <el-cascader
                  expand-trigger="hover"
                  :options="options"
                  :props="props"
                  placeholder="请选择城市"
                  v-model.trim="selectedOptions2"
                  @change="handleChange">
          </el-cascader>
           区域：
          <el-cascader id="city"
                       :disabled="disabled"
                       @change="changeSelector($event)"
                       ref="one"
                       :options="serveAreas"
                       placeholder="请选择区域"
                       v-model.trim="selectedOptions1"
                       :props="props2"
          ></el-cascader>
              <el-input placeholder="请填写详细地址" v-model.trim="headquarterAddress"></el-input>
              <span v-show="cityAreayOne" style="color: red">{{cityAreayOne}}</span>
            </li>

            <li><span class="list_name"> 结算方式:</span>
              <el-radio class="radio" v-model.trim="radio" label="0">渠道先结</el-radio>
              <el-radio class="radio" v-model.trim="radio" label="1">渠道后结</el-radio>
            </li>
            <li><span class="list_name">  账单日:</span>
              <el-select v-model.trim="Datevalue" placeholder="请选择">
                <el-option
                  v-for="(item,index) in 30"
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
              <b style="font-weight: 100;font-size:14px;font-family:PingFangSC-Regular;color:rgba(136,136,136,1)">注：选择后的日期将会设置为每月的账单日，账单将会到这天发送。</b>
            </li>
          </ul>
        </div>
      </div>
      <div class="consume_info">
      </div>
    </div>

    <div class="btn">
      <button @click="closeMove()">关闭</button>
      <button @click="submitAdd()" class='selector'>确定</button>
    </div>
  </div>
</template>

<script>
  import inputs from "@/components/commInfo/inputs"
  let  letTest= new RegExp("^((13[0-9])|(14[5|7])|(15([0-3]|[0-9]))|(18[0,0-9])|(17[0,0-9]))\\d{8}$");
  export default {
    props:["isAdd","quiry"],
    components:{
      inputsList:inputs
    },
    data(){
      return{
        typeOne:"",//服务内型
        typeOne1:"",//服务内型
        cityAreayOne:"", //请选择总部地址跟区域
        //区域start
        headquarterAddress:"",//详细地址
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
        radio:"0",
        selectorBehindObj:{},
        type:{
          name: "渠道类型",
          key: "type",
          SourceTypeValue: '',
          SourceType: [
            {
              value: '物业',
              id: "PropertyManagement"
            }, {
              value: '线上电商',
              id: "OnlineMall"
            }, {
              value: '厂商',
              id: "Manufacturer"
            }
          ]
        },
        inputs:[
          {
            name:"渠道名称",
            isBool:"",
            isTrue:false,
            key:"name",
            value:"",
            type:"text"
          }, {
            name:"登陆账号",
            key:"account",
            isBool:"",
            isTrue:false,
            value:"",
            type:"text"
          }, {
            name:"登陆密码",
            key:"password",
            isBool:"",
            isTrue:false,
            value:"",
            type:"password"
          }, {
            name:"联系人",
            key:"linkmanName",
            isBool:"",
            isTrue:false,
            value:"",
            type:"text"
          },{
            name:"联系电话",
            key:"linkmanTelephone",
            isBool:"",
            isTrue:false,
            value:"",
            type:"text"
          },{
            name:"公司电话",
            key:"companyTelephone",
            value:"",
            type:"text"
          },
          {
            name:"卡号",
            key:"cardNumber",
            value:"",
            type:"text"
          }
        ],
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
        cityAreay:"",

      }
    },
    created(){
//      let url=this.$apidomain+"/common/findlabelbusinessoptions";
//      this.$http.get(url).then(r=>{
//        let data=r.data;
//        this.labeloptions2 = data.result;
//      })
      //      城市数据
      let cityurl = `${this.$apidomain}/common/findprovinceandcitylist`;
      this.$http.get(cityurl).then(res=>{
        if(res.data.code == "0000"){
          this.options =res.data.result;
        }else{
          this.$message({
            message:res.data.error,
          });
        }
      });
    },
    methods: {

      changeSelector($event) {//街道
        this.linkmanAreaId = this.selectedOptions1[this.selectedOptions1.length - 1];
        this.linkmanName =this.$refs.one.currentLabels[1];
      },
      handleChange(value) { //街道
        this.cityId = value[value.length - 1];
       this.cityAreay = value;
        //选择区域街道
        let cityIdurl=this.$apidomain+"/common/findareaandstreetoptions?cityId="+ this.cityId;//获取区域
        this.$http.get(cityIdurl).then(res=>{
          if(res.data.code == "0000"){
            this.serveAreas = res.data.result;
          }else{
            this.$message({
              message:res.data.error,
            });
          }

        })
        this.disabled = false;
      },
      submitAdd(){
        this.inputs.forEach(v=>{
          this.selectorBehindObj[v.key]=v.value;
        });

        let RegData=this.selectorBehindObj;

        if(!this.selectorBehindObj["type"]){
          this.typeOne = "请选择渠道类型";
          return
        }else{
          this.typeOne = "";
        }
        if(this.inputs[0].value){
          let res2 = /^[\u4e00-\u9fa5a-zA-Z]{1,20}$/;
          if(res2.test(this.inputs[0].value) == false ){
            this.inputs[0].isBoolthis.inputs[0].isBool = " 请填写渠道名称，长度不超过20字符，不可输入特殊符号数字"
            return
          }else{
            this.inputs[0].isBool = ""
          }
        }else{
          this.inputs[0].isBool = "请填写渠道名称"
          return
        }
        if(this.inputs[1].value){
          this.inputs[1].isBool = ""
        }else{
          this.inputs[1].isBool = "请填写登陆账号"
          return
        }
        if(this.inputs[2].value){
          this.inputs[2].isBool = ""
        }else{
          this.inputs[2].isBool = "请填写登陆密码"
          console.log(typeof(this.inputs[2].value))
          return
        }
        if(!this.inputs[3].value){

          this.inputs[3].isBool = "请填写联系人"
          return
        }else{
          let res1 = /^[\u4e00-\u9fa5a-zA-Z]{1,20}$/;

          if(res1.test(this.inputs[3].value)==false){
            this.inputs[3].isBool = " 请填写联系人姓名，长度不超过20字符，不可输入特殊符号数字";
            return
          }else{
            this.inputs[3].isBool = ""
          }
        }
        if(this.inputs[4].value){

          let reg = /^1\d{10}$/;
          if(reg.test(this.inputs[4].value)==false){
            this.inputs[4].isBool = "请填写手机号,长度为11纯数字"
          }else{
            this.inputs[4].isBool = "";
          }
        }else{
          this.inputs[4].isBool = "请填写联系电话"
          return
        }
        if(this.cityAreay == ""){
          this.cityAreayOne = "请选择总部地址跟区域"
          return
        }else{
          this.cityAreayOne = ""
        }
//        if(this.$testReg(RegData,this,"channel")){
          this.selectorBehindObj.settleType =this.radio;
          this.selectorBehindObj.settleDay = this.Datevalue+"";
          this.selectorBehindObj.areaName = this.linkmanName;
          this.selectorBehindObj.areaId = this.linkmanAreaId;
          this.selectorBehindObj.headquarterAddress = this.headquarterAddress;
        let url=this.$apidomain+"/officialpartnerinfo/saveOfficialPartnerInfo";
        this.$http.post(url,this.selectorBehindObj).then(res=>{
          let data = res.data;
          if(res.data.code === "0000"){
            this.$notify({
              title: '成功',
              message: '新建成功',
              type: 'success'});
            this.quiry();
            this.isAdd.isShow=false;
          }else{
            this.$message({
              message: res.data.error,
            });
          }


        })
//        }
      },
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        this.typeOne1 = 1;
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        })
      },
      selector1(item,values,bankValue){       //选中银行后的下拉列表
        var key=item.key;
        this.selectorBehindObj[key]=bankValue;
//        console.log((bankValue));
//        values.forEach((v,i)=>{
//          if(v.value===bankValue){
//            console.log(v,"8888888")
//            this.selectorBehindObj[key]=v.id;
//          }
//        })
      },
      onchangeFile(event,keyImg){
        let filesObj=event.target.files[0];
        let filesName=event.target.files[0].name;
        let img=event.target.parentElement;
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
            this.$message({
              message:"上传失败",
            });
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
        this.isAdd.isShow=false;
      },
    },
    mounted() {

    },
    watch:{
      cityAreay:function (new1,old1) {
        if(new1 != ""){
          this.cityAreayOne = ""
        }else{
          this.cityAreayOne = "请选择总部地址跟区域"
        }

      },
//      inputs:{
//        handler:function(new1,old1){
//          if(new1[0].value != ""){
//            let res2 = /^[\u4e00-\u9fa5a-zA-Z]{1,20}$/;
//            if(res2.test(this.inputs[0].value) == false ){
//              this.inputs[0].isBool = " 请填写渠道名称，长度不超过20字符，不可输入特殊符号数字"
//              return
//            }else{
//              this.inputs[0].isBool = ""
//            }
//          }
//          if(new1[1].value != ""){
//            let res2 = /^[\u4e00-\u9fa5a-zA-Z]{1,20}$/;
//            if(res2.test(this.inputs[1].value) == false ){
//              this.inputs[1].isBool = " 请填写登录账号，长度不超过20字符，不可输入特殊符号数字"
//              return
//            }else{
//              this.inputs[1].isBool = ""
//            }
//          }
//          if(new1[2].value != ""){
//
//            if(new1[2].value.length<6){
//              this.inputs[2].isBool = "请填写登陆密码,长度大于等于6"
//            }else{
//              this.inputs[2].isBool = ""
//            }
//          }
//          if(new1[3].value != ""){
//            let res2 = /^[\u4e00-\u9fa5a-zA-Z]{1,20}$/;
//            if(res2.test(this.inputs[3].value) == false ){
//              this.inputs[3].isBool = " 请填写联系人，长度不超过20字符，不可输入特殊符号数字"
//              return
//            }else{
//              this.inputs[3].isBool = ""
//            }
//          }
//          if(new1[4].value != ""){
//            let reg = /^1\d{10}$/;
//            if(reg.test(this.inputs[4].value)==false){
//              this.inputs[4].isBool = "请填写联系电话,长度为11纯数字"
//            }else{
//              this.inputs[4].isBool = "";
//            }
//          }
//        },
//
//        deep: true,
//
//      },
      typeOne1:function(new1,old1){
        if(new1 != ""){
          this.typeOne = ""
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/styles/commButton";
  .el-input{
    width:217px;
  }
  .list_name{
    width:93px;
  }
  button{
    width:200px;
    cursor:pointer;
    line-height:44px;
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
    font-family: MicrosoftYaHei;
    font-size: 14px;
    overflow: hidden;
    letter-spacing: 0;
    width:60%;
    border-radius: 10px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    background:#fff;
    height:700px;
    >h3{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      padding-left:10px;
      letter-spacing: 0;
    }
    >.content{
      overflow-y: auto;
      width:100%;
      display:flex;
      height:75%;
      >div{
        flex:1;
        >ul{
          /*width:35%;*/
          padding-top:0;
          >li{
            /*text-align: right;*/
            margin-top:20px;
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
      position:relative;
      >.title{
        padding-left:10px;
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }

    }
  }
  ul{
    padding-left:10px;
    list-style:none;
    >li{
      line-height:40px;
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
</style>
<style lang="scss">
  .el-select-dropdown__item{
    line-height: 25px !important;
  }
  .el-select-dropdown{
    z-index: 9999 !important;
  }
</style>


