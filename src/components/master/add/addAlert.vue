
<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{isAdd.title}}  <p class="closeX" id="closeX" @click="closeMove"></p></h3>
      <div class="scrollbar content">
        <div class="left_info">
          <p class="title">角色信息</p>
          <ul class="add_master">
            <!--<li v-for="(item,index) in inputs" :key="index">-->
              <!--<span class="list_name"> {{item.name}} : </span>-->
              <!--<el-input-->
                <!--:placeholder="'请填写'+item.name"-->
                <!--v-model.trim="item.value">-->
              <!--</el-input>-->
              <!--<span v-if="item.isText" class="error_info">{{item.errorContent}}</span>-->
              <!--<span v-show="nameOne">{{nameOne}}</span>-->
            <!--</li>-->
            <li>
              <span class="list_name"> {{inputs[0].name}} : </span>
              <el-input
                placeholder="请填写师傅姓名"
                v-model.trim="inputs[0].value">
              </el-input>
              <span v-if="inputs[0].isText" class="error_info">{{inputs[0].errorContent}}</span>
              <span v-show="nameOne" style="color: red;">{{nameOne}}</span>
            </li>
            <li>
              <span class="list_name"> {{inputs[1].name}} : </span>
              <el-input
                placeholder="请填写师傅手机号"
                v-model.trim="inputs[1].value">
              </el-input>
              <span v-if="inputs[1].isText" class="error_info">{{inputs[1].errorContent}}</span>
              <span v-show="phoneNumOne" style="color: red;">{{phoneNumOne}}</span>
            </li>
            <li>
              <span class="list_name"> {{inputs[2].name}} : </span>
              <el-input
                placeholder="请填写身份证号码"
                v-model.trim="inputs[2].value">
              </el-input>
              <span v-if="inputs[2].isText" class="error_info">{{inputs[2].errorContent}}</span>
              <span v-show="idNumOne" style="color: red;">{{idNumOne}}</span>
            </li>
            <li>
              <span class="list_name"> {{inputs[3].name}} : </span>
              <el-input
                placeholder="请填写朋友"
                v-model.trim="inputs[3].value">
              </el-input>
              <span v-if="inputs[3].isText" class="error_info">{{inputs[3].errorContent}}</span>
              <span v-show="emergencyContactOne" style="color: red;">{{emergencyContactOne}}</span>
            </li>
            <li>
              <span class="list_name"> {{inputs[4].name}} : </span>
              <el-input
                placeholder="请填写朋友手机号"
                v-model.trim="inputs[4].value">
              </el-input>
              <span v-if="inputs[4].isText" class="error_info">{{inputs[4].errorContent}}</span>
              <span v-show="emergencyPhoneNumOne" style="color: red;">{{emergencyPhoneNumOne}}</span>
            </li>
            <li>
              <span class="list_name"> {{inputs[5].name}} : </span>
              <el-input
                placeholder="请填写银行卡号"
                v-model.trim="inputs[5].value">
              </el-input>
              <span v-if="inputs[5].isText" class="error_info">{{inputs[5].errorContent}}</span>
              <span v-show="cardNumberOne" style="color: red;">{{cardNumberOne}}</span>
            </li>
            <li>
              <span class="list_name"> {{inputs[6].name}} : </span>
              <el-input
                placeholder="请填写开户行地址"
                v-model.trim="inputs[6].value">
              </el-input>
              <span v-if="inputs[6].isText" class="error_info">{{inputs[6].errorContent}}</span>
              <span v-show="headquarterAddressOne" style="color: red;">{{headquarterAddressOne}}</span>
            </li>

            <li>
              <span class="list_name">  开户行:</span>
              <el-select
                v-model.trim="bank.bankValue" placeholder="请选择开户行" @change="selector1(bank,bank.bankName,bank.bankValue)">
                <el-option
                  v-for="items in bank.bankName"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>

            <li>
              <span class="list_name">  师傅等级 : </span>
              <el-select
                v-model.trim="level.SourceTypeValue" placeholder="请选择师傅等级"
                @change="selector(level,level.SourceType,level.SourceTypeValue)">
                <el-option
                  v-for="items in level.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
              <span style="color: red" v-show="levelOne">{{levelOne}}</span>
            </li>
            <li>
              <span class="list_name"> 师傅类型 : </span>
              <el-select
                v-model.trim="type.SourceTypeValue" placeholder="请选择师傅类型"
                @change="selectorType(type,type.SourceType,type.SourceTypeValue)">
                <el-option
                  v-for="items in type.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
              <span style="color: red" v-show="typeOne">{{typeOne}}</span>
            </li>
            <li v-show="isSiteShow">
              <span class="list_name">所属网点 : </span>
              <el-select
                v-model.trim="siteId.SourceTypeValue" placeholder="请选择所属网点"
                @change="selectorSiteId(siteId,siteId.SourceType,siteId.SourceTypeValue)">
                <el-option
                  v-for="items in siteId.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
              <span style="color: red" v-show="siteOne">{{siteOne}}</span>
            </li>
            <li v-show="!isSiteShow">
              <span class="list_name">  城市 :</span>
              <el-select
                v-model.trim="city.SourceTypeValue" placeholder="请选择城市"
                @change="selectorArea(city,city.SourceType,city.SourceTypeValue)">
                <el-option
                  v-for="items in city.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
              <span style="color: red" v-show="cityIdOne">{{cityIdOne}}</span>
            </li>
            <li>
              <span class="list_name">   服务区域 :</span>

              <el-cascader id="cascader"
                           placeholder="请选择服务区域"
                           @change="changeSelector"
                           :options="areaoptions1"
                           change-on-select
                           @active-item-change="handleItemChange"
                           :props="props"
              ></el-cascader> <span style="color: red" v-show="areaIdsOne">{{areaIdsOne}}</span>
              <el-tag
                v-for="tag in areas"
                :key="tag.id"
                :closable="true"
                :type="primary"
                @close="handleClose1(tag)"
              >
                {{tag.label}}
              </el-tag>
            </li>
            <li>
              <span class="list_name">服务工种 : </span>
              <el-cascader id="cascader2"
                           placeholder="请选择服务工种"
                           @change="changeSelector2"
                           :options="labeloptions2"
                           change-on-select
                           @active-item-change="handleItemChange"
                           :props="props"
              ></el-cascader> <span style="color: red" v-show="skillIdsOne">{{skillIdsOne}}</span>
              <el-tag
                v-for="tag in skills"
                :key="tag.id"
                :closable="true"
                :type="primary"
                @close="handleClose2(tag)"
              >
                {{tag.label}}
              </el-tag>
            </li>
            <li>

            </li>
            <li>
              <ul class="files">
                <li v-for="(item,index) in files" :key="index">
                  {{item.name}} :
                  <a href="javascript:;" class="file">
                    <input type="file" @change="onchangeFile($event,item.key)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                  </a>
                </li>
              </ul>
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

  export default {
    props:["isAdd","quiry"],
    data(){
      return{
        nameOne:"", //师傅姓名异常
        phoneNumOne:"", //师傅手机号码异常
        idNumOne:"", //师傅身份证异常
        levelOne : "",//请填写师傅等级异常
        typeOne:"",//请填写师傅类型异常
        siteOne:"",      //请填写所属网点
        cityIdOne:"",//请填写城市异常
        areaIdsOne:"",//请填写区域异常
        skillIdsOne:'',//请填写工种异常
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
        selectorBehindObj:{},
        city: {
          name: "所属城市",
          key: "cityId",
          SourceTypeValue: '', //选中后的
          SourceType: []
        },
        type:{
          name: "师傅类型",
          key: "type",
          SourceTypeValue: '',
          SourceType: [
            {
              value: '自营师傅',
              id: "1"
            }, {
              value: '兼职师傅',
              id: "2"
            }, {
              value: '网点师傅',
              id: "3"
            }
          ]
        },
        level:{
          name: "师傅等级",
          key: "level",
          SourceTypeValue: '',
          SourceType: [
            {
              value: '初级师傅',
              id: "Primary"
            }, {
              value: '中级师傅',
              id: "MiddleRank"
            }, {
              value: '高级师傅',
              id: "Advanced"
            }
          ]
        },
        files:[
          {
            name:"本人执证照",
            point:"点击图片上传",
            key:"benrenzhaopian"
          },  {
            point:"点击图片上传",
            name:"身份证正照",
            key:"shengfenzhengzhengmian"

          },  {
            name:"身份证反面",
            point:"点击图片上传",
            key:"shengfenzhengfanmian"
          },  {
            name:"资格证照",
            key:"zige",
            point:"点击图片上传",
          }
        ],
        isSiteShow:false,
        areaoptions1: [],
        labeloptions2: [],
        primary:"primary",
        skills:[],
        areas:[],
        potionValueId:'',
        inputs:[
          {
            name:"师傅姓名",
            key:"name",
            isText:false,
            errorContent:"info",
            value:""
          }, {
            isText:false,
            name:"师傅手机号",
            key:"phoneNum",
            errorContent:"info",
            value:""
          }, {
            name:"身份证号码",
            isText:false,
            errorContent:"info",
            key:"idNum",
            value:""
          }, {
            name:"朋友",
            isText:false,
            key:"emergencyContact",
            errorContent:"info",
            value:""
          },{
            name:"朋友手机号",
            errorContent:"info",
            isText:false,
            key:"emergencyPhoneNum",
            value:""
          },{
            name:'银行卡号',
            key:'cardNumber',
            value:'',
            isText:false,
            errorContent:"info"
          },
          {
            name:'开户行地址',
            key:'headquarterAddress',
            value:'',
            type:'text',
            isText:false,
            errorContent:"info"
          }
        ],
        siteId:{
          name: "所属网点",
          key: "siteId",
          SourceTypeValue: '',
          SourceType: []
        },
        props: {
          value: 'label',
          children: 'cities',
        },
      }
    },
    created(){
      let url=this.$apidomain+"/common/findlabelbusinessoptions";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.labeloptions2 = data.result;
      })
      url=this.$apidomain+"/common/findcitylistareainfo";
      this.$http.get(url).then(r=>{
        let data=r.data;
        data.result.forEach((v)=>{
          this.city.SourceType.push({"id":v.id,"value":v.name});
        })
      });
      url=this.$apidomain+"/common/findsite";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.siteId.SourceType.push({"id":"","value":"---请选择---"});
        data.result.forEach((v)=>{
          this.siteId.SourceType.push({"id":v.id,"value":v.name});
        })
      })
    },
    watch:{
      inputs:{
        handler:function(new1,old1){
          if(new1[0].value != ""){
            this.nameOne = "";
          }else{
            this.nameOne = "请填写师傅姓名，长度不超过20字符，不可输入标点符号"
          }
          if(new1[1].value != ""){
            if(new1[1].value.length == 11){
              this.phoneNumOne = "";
            }else{
              this.phoneNumOne = "请填写师傅手机号，长度为11位数字"
            }
          }else{
            this.phoneNumOne = "请填写师傅手机号"
          }
          if(new1[2].value != ""){
            let id = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if(id.test(new1[2].value)){
              this.idNumOne = "";
            }else{
              this.idNumOne = "请填写正确身份证号码"
            }

          }else{
            this.idNumOne = "请填写身份证号码"
          }
        },

        deep: true,

      },
      "level.SourceTypeValue":function(a,b){
       if(a != ""){
         this.levelOne = ""
       }else{
         this.levelOne = "请填写师傅等级"
       }
      },
      "type.SourceTypeValue":function(a,b){
        if(a != ""){
          this.typeOne = ""
        }else{
          this.typeOne = "请填写师傅类型"
        }
      },
      "siteId.SourceTypeValue":function(a,b){
        if(a != ""){
          this.siteOne = ""
        }else{
          this.siteOne = "请填写所属网点"
        }
      },
      "city.SourceTypeValue":function(a,b){
        if(a != ""){
          this.cityIdOne = ""
        }else{
          this.cityIdOne = "请填写服务城市"
        }
      },
      areas:function(a,b){
        if(a.length>0){
          this.areaIdsOne = ""
        }else{
          this.areaIdsOne = "请填写服务区域"
        }
      },
      skills:function(a,b){
        if(a.length>0){
          this.skillIdsOne = ""
        }else{
          this.skillIdsOne = "请填写服务工种"
        }
      }


    },
    methods: {
      selector1(item,values,bankValue){       //选中银行后的下拉列表
        var key=item.key;
        this.selectorBehindObj[key]=bankValue;
      },
      submitAdd(){
        this.inputs.forEach(v=>{
          this.selectorBehindObj[v.key]=v.value;
        });
        if(!this.selectorBehindObj.name){
          this.nameOne = "请填写师傅姓名，长度不超过20字符，不可输入标点符号"
        }else{
          this.nameOne = ""
        }
        if(!this.selectorBehindObj.phoneNum){
          this.phoneNumOne = "请填写师傅手机号，长度为11位数字"
        }else{
          this.phoneNumOne = ""
        }
        if(!this.selectorBehindObj.idNum){
          this.idNumOne = "请填写身份证号码"
        }else{
          this.idNumOne = ""
        }
        if(!this.selectorBehindObj.level){
          this.levelOne = "请填写师傅等级"
        }else{
          this.levelOne = ""
        }
        if(!this.selectorBehindObj.type){
          this.typeOne = "请填写师傅类型"
        }else{
          this.typeOne = ""
        }
        if(!this.selectorBehindObj.site){
          this.siteOne = "请填写所属网点"
        }else{
          this.siteOne = ""
        }
        if(!this.selectorBehindObj.cityId){
          this.cityIdOne = "请填写服务城市"
        }else{
          this.cityIdOne = ""
        }
        if(!this.selectorBehindObj.areaIds){
          this.areaIdsOne = "请填写服务区域"
        }else{
          this.areaIdsOne = ""
        }
        if(!this.selectorBehindObj.skillIds){
          this.skillIdsOne = "请填写服务工种"
        }else{
          this.skillIdsOne = ""
        }
        if(this.$testReg(this.selectorBehindObj, this) && this.$selectorExp(this.selectorBehindObj,this)&&this.$imageExp(this.selectorBehindObj,this)){

        this.selectorBehindObj.idPhotos = this.selectorBehindObj.benrenzhaopian+","+this.selectorBehindObj.shengfenzhengzhengmian+","+this.selectorBehindObj.shengfenzhengfanmian+","+this.selectorBehindObj.zige;
        let url=this.$apidomain+"/masterinfo/submit";
        this.$http.post(url,this.selectorBehindObj).then(res=>{
          let data = res.data;
          if(data.code==='0000'){
            this.$notify({
              title: '成功',
              message: '新建成功',
              type: 'success'});
            this.quiry();
            this.isAdd.isShow=false
          }else{
            alert(data.error)
          }
        })}
      },
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        let key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        })
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
          if(data.error===0){
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
      handleClose1(tag) {
        this.areas.forEach((e,i)=>{
          if(e.id===tag.id){
            this.areas.splice(i,1);
            this.selectorBehindObj.areaIds=this.getIds(this.areas);
            return;
          }
        });
      },
      handleClose2(tag) {
        this.skills.forEach((e,i)=>{
          if(e.id===tag.id){
            this.skills.splice(i,1);
            this.selectorBehindObj.skillIds=this.getIds(this.skills);
            return;
          }
        });
      },
      changeSelector(value){
        this.areaoptions1.forEach((v,i)=>{
          if(value[0]===v.label){
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                if(this.checkIdIn(this.areas,e.id)){
                  this.areas.push({"id":e.id,"label":v.label+"-"+e.label});
                  this.selectorBehindObj.areaIds=this.getIds(this.areas);
                }
                return;
              }
            })
          }
        });
      },
      changeSelector2(value){
        this.labeloptions2.forEach((v,i)=>{
          if(value[0]===v.label){
            v.cities.forEach((e,i)=>{
              if(e.label===value[1]){
                if(this.checkIdIn(this.skills,e.id)){
                  this.skills.push({"id":e.id,"label":v.label+"-"+e.label});
                  this.selectorBehindObj.skillIds=this.getIds(this.skills);
                }
                return;
              }
            })
          }
        });
      },
      selectorType(item,values,SourceTypeValue){
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        });
        this.siteId.SourceTypeValue = "";
        this.city.SourceTypeValue = "";
        this.areas = [];
        this.areaoptions1 =[];
        this.selectorBehindObj.areaIds= "";
        this.selectorBehindObj.siteId = "";
        this.selectorBehindObj.site = "";
        this.selectorBehindObj.cityId = "";
        this.selectorBehindObj.city = "";
        if("3"==this.selectorBehindObj.type){
          this.isSiteShow = true;
        }else{
          this.isSiteShow = false;
        }
      },
      selectorSiteId(item,values,SourceTypeValue){
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
            this.selectorBehindObj.site=v.value;
          }
        });
        this.areas = [];
        this.selectorBehindObj.areaIds="";
        this.selectorBehindObj.cityId = this.selectorBehindObj.siteId.substring(0,4);
        this.selectorBehindObj.city = this.getLabel(this.city.SourceType,this.selectorBehindObj.cityId);
        let url=this.$apidomain+"/common/findareaandstreetoptions?cityId="+this.selectorBehindObj.siteId.substring(0,4);
        this.$http.get(url).then(r=>{
          let data=r.data;
          this.areaoptions1 = data.result;
        })
      },
      selectorArea(item,values,SourceTypeValue){
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
            this.selectorBehindObj.city=v.value;
          }
        });
        this.areas = [];
        this.selectorBehindObj.areaIds="";
        let url=this.$apidomain+"/common/findareaandstreetoptions?cityId="+this.selectorBehindObj.cityId;
        this.$http.get(url).then(r=>{
          let data=r.data;
          this.areaoptions1 = data.result;
        })
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

  }
</script>

<style scoped lang="scss">
  @import "../../../assets/styles/commButton";
  .error_info{
    color:red;
    font-size: 12px;
  }
  .el-input{
   width:200px;
  }
  .list_name{
    width:110px;
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
    height:70%;

    >.content{
      overflow-y: auto;
      width:100%;
      display:flex;
      height: 78%;
      >div{
        flex:1;
        >ul{
          /*width:35%;*/
          padding-top:20px;
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
  .el-message{
    z-index: 9999 !important;
  }
  .add_master{
    >li{
        .el-cascader__label{
          line-height: 40px !important;

      }
    }
  }
</style>


