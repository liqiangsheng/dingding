
<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title" style="position:relative;">{{isAdd.title}}  <p class="closeX" id="closeX" @click="closeMove"></p></h3>
      <div class="scrollbar content">
        <div class="left_info">
          <p class="title input_title" >详细信息</p>
          <ul class="add_master">
            <li v-if="!!isAdd.id">
              <span class="list_name">师傅编号</span>
              <span class="editStyle">{{editData.masterInfo.id|placeholder}}</span>
            </li>
            <li>
              <span class="list_name"> {{inputs[0].name}}
                <b style="color: #EA5413" v-if="!isAdd.id">*</b>
              </span>
              <el-input
                v-if="!isAdd.id"
                placeholder="请填写师傅姓名"
                v-model.trim="inputs[0].value">
              </el-input>
              <span  class="editStyle" v-else>{{inputs[0].value}}</span>
              <span v-if="inputs[0].isText" class="reg" >{{inputs[0].errorContent}}</span>
              <span v-show="nameOne"  class="reg">{{nameOne}}</span>
            </li>
            <li>
              <span class="list_name"> {{inputs[1].name}}
                <b style="color: #EA5413" v-if="isEdit">*</b>
              </span>
              <el-input
                v-if="isEdit"
                placeholder="请填写师傅手机号"
                v-model.trim="inputs[1].value">
              </el-input>
              <span v-else class="editStyle">{{inputs[1].value}}</span>
              <span v-if="inputs[1].isText" class="reg">{{inputs[1].errorContent}}</span>
              <span v-show="phoneNumOne" class="reg">{{phoneNumOne}}</span>
            </li>
            <li>
              <span class="list_name">
                {{inputs[2].name}}
                <b style="color: #EA5413" v-if="!isAdd.id">*</b>
              </span>
              <el-input
                v-if="!isAdd.id"
                placeholder="请填写身份证号码"
                v-model.trim="inputs[2].value">
              </el-input>
              <span  class="editStyle" v-else>{{inputs[2].value}}</span>
              <span v-if="inputs[2].isText" class="reg">{{inputs[2].errorContent}}</span>
              <span v-show="idNumOne" class="reg" >{{idNumOne}}</span>
            </li>
            <li>
              <span class="list_name">
                {{inputs[3].name}}
              </span>
              <el-input
                v-if="isEdit"
                placeholder="请填写朋友"
                v-model.trim="inputs[3].value">
              </el-input>
              <span v-else class="editStyle">{{inputs[3].value}}</span>
              <span v-if="inputs[3].isText" class="reg">{{inputs[3].errorContent}}</span>
              <span v-show="frindrenOne" class="reg">{{frindrenOne}}</span>
            </li>
            <li>
              <span class="list_name"> {{inputs[4].name}} </span>
              <el-input
                v-if="isEdit"
                placeholder="请填写朋友手机号"
                v-model.trim="inputs[4].value">
              </el-input>
              <span v-else class="editStyle">{{inputs[4].value}}</span>
              <span v-if="inputs[4].isText" class="reg">{{inputs[4].errorContent}}</span>
              <span v-show="frindPhoneOne" class="reg">{{frindPhoneOne}}</span>
            </li>
            <li>
              <span class="list_name"> {{inputs[5].name}}  </span>
              <el-input
                v-if="isEdit"
                placeholder="请填写银行卡号"
                v-model.trim="inputs[5].value">
              </el-input>
              <span v-else class="editStyle">{{inputs[5].value}}</span>
              <span v-if="inputs[5].isText" class="reg">{{inputs[5].errorContent}}</span>
            </li>
            <li>
              <span class="list_name"> {{inputs[6].name}}  </span>
              <el-input
                v-if="isEdit"
                placeholder="请填写开户行地址"
                v-model.trim="inputs[6].value">
              </el-input>
              <span v-else class="editStyle reg" style="color:#393939 ;font-size:14px">{{inputs[6].value}}</span>
              <span v-if="inputs[6].isText" class="reg">{{inputs[6].errorContent}}</span>
            </li>

            <li>
              <span class="list_name">  开户行</span>
              <el-select
                v-if="isEdit"
                v-model.trim="bank.bankValue" placeholder="请选择开户行" @change="selector1(bank,bank.bankName,bank.bankValue)">
                <el-option
                  v-for="items in bank.bankName"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
              <span v-else class="editStyle">{{editData.masterInfo.bankOfDeposit}}</span>
            </li>

            <li>
              <span class="list_name">
                师傅等级
                <b style="color: #EA5413" v-if="isEdit">*</b>
              </span>
              <el-select
                v-if="isEdit"
                v-model.trim="level.SourceTypeValue"
                placeholder="请选择师傅等级"
                @change="selector(level,level.SourceType,level.SourceTypeValue)">
                <el-option
                  v-for="items in level.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
              <span v-else class="editStyle">{{level.SourceTypeValue}}</span>
              <span class="reg" v-show="levelOne">{{levelOne}}</span>
            </li>
            <li>
              <span class="list_name"> 师傅类型
                <b style="color: #EA5413" v-if="isEdit">*</b>
              </span>
              <el-select
                v-if="isEdit"
                v-model.trim="type.SourceTypeValue" placeholder="请选择师傅类型"
                @change="selectorType(type,type.SourceType,type.SourceTypeValue)">
                <el-option
                  v-for="items in type.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
              <span v-else class="editStyle">{{editData.masterInfo.type|mastertype}}</span>
              <span class="reg" v-show="typeOne">{{typeOne}}</span>
            </li>
            <!--v-show="isSiteShow"-->
            <!--<li  v-show="isSiteShow || this.editData.masterInfo.type=='3'">-->
            <li  v-show="isSiteShow">
              <span class="list_name">所属网点
                <b style="color: #EA5413" v-if="isEdit">*</b>
              </span>
              <el-select
                v-if="isEdit"
                v-model.trim="siteId.SourceTypeValue" placeholder="请选择所属网点"
                @change="selectorSiteId(siteId,siteId.SourceType,siteId.SourceTypeValue)">
                <el-option
                  v-for="items in siteId.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
              <span v-else class="editStyle">{{site|placeholder}}</span>
              <span class="reg" v-show="siteOne">{{siteOne}}</span>
            </li>
            <li v-if="!!isAdd.id">
              <span class="list_name">工作状态</span>
              <span class="editStyle">{{editData.masterInfo.workState|showWorkState}}</span>
            </li>
            <li v-if="!!isAdd.id">
              <span class="list_name">注册时间</span>
              <span class="editStyle">{{editData.masterInfo.registerTime|moment('YYYY-MM-DD HH:mm:ss')|placeholder}}</span>
            </li>
            <li v-if="!!isAdd.id">
              <span class="list_name">认证时间</span>
              <span class="editStyle">{{editData.masterInfo.certificateTime|moment('YYYY-MM-DD HH:mm:ss')|placeholder}}</span>
            </li>
            <li style="width:100%;">
              <p class="input_title" style="margin-bottom: 15px">
                服务区域
                <b style="color: #EA5413">*</b>
                <span style="color: red" v-show="cityIdOne">{{cityIdOne}}</span>
                <span style="color: red" v-show="areaIdsOne">{{areaIdsOne}}</span>
              </p>
              <div class="container_area">
                <div>
                  <span> 城市:</span>
                  <span  v-if="(!!editData.areas&&!!isAdd.id&&!isEdit)">{{editData.masterInfo.city}}</span>
                  <!--v-if="!(!!editData.areas&&!!isAdd.id)"-->
                  <el-select
                    v-if="!(!!editData.areas&&!!isAdd.id)||isEdit"
                    v-model.trim="city.SourceTypeValue" placeholder="请选择城市"
                    @change="selectorArea(city,city.SourceType,city.SourceTypeValue)">
                    <el-option
                      v-for="items in city.SourceType"
                      :key="items.value"
                      :value="items.value"
                    >
                    </el-option>
                  </el-select>
                  <br>
                  <div class="list_name" v-if="(!!editData.areas&&!!isAdd.id)&&!isEdit" style="margin-top:1em;"> 区域:</div>
                  <span v-for="(item,index) in editData.areas" v-if="(!!editData.areas&&!!isAdd.id)&&!isEdit">
                         {{item.label}} {{index===editData.areas.length-1?'':','}}
                 </span>
                </div>
                <!--区域-->
                <div class="content_area" v-if="isEdit">
                  <aside class="left_item" v-for="(item,index) in area">
                    <div class="cursor area" :class="{'select_area':areaSelects[index]===1,'topo_select':areaSelects[index]===2}" @click="selectArea(area,index)">
                      {{item.label}}
                    </div>
                    <div class="street_list">
                      <div class="cursor street_list_item" v-for="(items,indexs) in item.cities" @click="selectItem(items,index,indexs)" :key="indexs" :class="{'selected_cities':streetSelects[index][indexs]}">
                        {{items.label}}
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </li>

            <li style="width:100%">
              <p class="input_title" style="margin: 0;">
                服务工种
                <b style="color: #EA5413">*</b>
                <span style="color: red" v-show="skillIdsOne">{{skillIdsOne}}</span>
              </p>
              <div  class="list_name" style="margin-top:2em;" v-if="isShowSkills()&&!!editData.skills"> 服务工种:</div>
              <span v-for="(item,index) in editData.skills"  v-if="isShowSkills()&&!!editData.skills">
                {{item.label}} {{index===editData.skills.length-1?'':','}}
              </span>
              <selector-teer
                v-if="!isShowSkills()&&!!skillList"
                @skillIdsOne1="skillIdsOne1"
                :list="skillList"
                :selectFirst="productionFirsts"
                :selectChild="productionChilds"
                :props="saverTypes"
              >
              </selector-teer>
            </li>


            <li style="width: 100%">
              <p class="input_title" style="margin: 0;">认证资料 </p>
              <ul v-if="!!isAdd.id" class="idPhotoes">
                <li>
                  本人执证照：
                  <img :src="editData.licenseImg" alt="">
                </li>
                <li>
                  身份证正照:
                  <img :src="editData.identityCardImgFront" alt="">
                </li>
                <li>
                  身份证反面:
                  <img :src="editData.identityCardImgReverse" alt="">
                </li>
                <li v-for="(item,index) in editData.qualificationImg">
                  资格证照:
                  <img :src="item">
                </li>
              </ul>
            </li>
            <li v-if="!isAdd.id">
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
      <button @click="closeMove()" class="closeBtn">关闭</button>
      <button @click="submitAdd(false)" class='selector' v-if="!isAdd.id">确定</button>
      <button @click="edit" class="selector" v-if="!!isAdd.id&&!isEdit">编辑</button>
      <button @click="submitAdd(true)" class="selector" v-if="!(isAdd.id&&!isEdit)&&isAdd.id">完成</button>
    </div>
  </div>
</template>

<script>
  import selectOption from "@/components/commInfo/selectOption"
  import selectorTeer from "../../network/networkNumber/components/selectorTeer"
  export default {
    props:["isAdd","quiry"],
    components:{
      selectOption,
      selectorTeer
    },
    data(){
      return{
        site:'',
        editData:{},     //师傅详情
        isEdit:false,
        saverTypes:{
          label:"b",
          childs:"beans",
        },
        productionFirsts:[],
        productionChilds:[],
        cityOne:"", //网点城市名称
        cityOne1:"", //网点城市名称
        areaIdsOne:"", //网点用区域
        areaIdsOne1:"",//网点用区域
        skillIdsOne:"", //网点技能
        skillIdsOne2:"", //网点技能
        area:[],       //服务区域
        areaSelects:[],
        streetSelects:[],
        skillList: [],
        siteOne:"",
        nameOne:"", //师傅姓名异常
        phoneNumOne:"", //师傅手机号码异常
        idNumOne:"", //师傅身份证异常
        levelOne : "",//请填写师傅等级异常
        typeOne:"",//请填写师傅类型异常
        frindrenOne:"",      //朋友
        frindPhoneOne:"",
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
      //服务工种
      const getFindLabel = (url,index) => this.$http.get(url).then(res => {
        const data= res.data;
        if (data.code === "0000") {
          this.productionChilds[index]=[];
          this.skillList.push(data.result);
          this.skillList.forEach(v=>{
            this.productionChilds[index]=[];
            v.beans.forEach(e=>{
              this.productionChilds[index].push(false)
            })
          });
        }else{
          this.$queryFun.successAlert.call(this,data.error);
        }
      });

      const urls=`${this.$apidomain}/common/findflabelbusinessname`;
      this.$http.get(urls).then(r=>{
        let data=r.data;
        if(data.code==="0000"){
          async function getData(){
            let item = data.result
//               /*
//                循环一级分类，获取对应二级分类ID
//               this.productionFirsts   添加判断选择一级分类的标识；1全选 ，0全不选 2单个选
//               this.productionChilds.push(JSON.parse(JSON.stringify([])));    添加二级分的标识；
// */
            for(let i=0;i<item.length;i++){
              this.productionFirsts.push(0);
              this.productionChilds.push(JSON.parse(JSON.stringify([])));
              let url = `${this.$apidomain}/articleinfo/findlabelbusinessbyflabel?id=${item[i].id}`;
              await getFindLabel(url,i);     //
            }
          }
          getData.call(this);
        }else{
          this.$queryFun.successAlert.call(this,data.error);
        }
      });

      //师傅详情和编辑
      let editData = this.isAdd;

      if(!!editData.id){
        this.saverTypes.isEdit=true;
        const url=`${this.$apidomain}/masterinfo/finddetail?id=${editData.id}`;
        this.$http.get(url).then(r=>{
          const data = r.data;
          if(data.code==="0000"){
            this.editData=data.result;
            console.log(this.editData,'师傅向国庆')
            //开户行
            this.bank.bankValue = this.editData.masterInfo.bankOfDeposit;
            //所属网点
            this.site = this.editData.masterInfo.site;
            //师傅等级
            if(this.editData.masterInfo.level === "Primary"){
              this.level.SourceTypeValue = "初级师傅"
            }else if(this.editData.masterInfo.level === "MiddleRank"){
              this.editData.masterInfo.SourceTypeValue="中级师傅"
            }else if(this.editData.masterInfo.level === "Advanced"){
              this.level.SourceTypeValue= "高级师傅"
            }
            //师傅类型
            let masterType='';
            switch (this.editData.masterInfo.type){
              case "1":masterType="自营师傅";this.type.SourceTypeValue="自营师傅";break;
              case "2":masterType="兼职师傅";this.type.SourceTypeValue="兼职师傅";break;
              case "3":masterType="网点师傅";this.type.SourceTypeValue="网点师傅";this.getSiteList();break;
            }
            //城市
            this.city.SourceTypeValue = this.editData.masterInfo.city;
            this.siteId.SourceTypeValue = this.site
            //照片
            let images =this.editData.masterInfo.idPhotos?this.editData.masterInfo.idPhotos.split(","):[];
            let imgOne = images.slice(3,images.length-3);
            this.editData.licenseImg = images[0]!="undefined"?images[0]:"";  //本人执证照
            this.editData.identityCardImgFront = images[1]; //身份证正面
            this.editData.identityCardImgReverse = images[2];//身份证反面
            this.editData.qualificationImg = imgOne;  //资格执照
            this.inputs.forEach(v => {
              v.idEdit=true;
              v.value = this.editData.masterInfo[v.key]
            });
            this.saverTypes.skills = this.editData.skills.map(v=>v.id)
            this.images = this.editData.masterInfo.idPhotos.split(",").filter(v=>{
              if(v!=undefined&&!!v){
                return v;
              }
            });
            const areaIds = this.editData.areas.map(v=>v.id);
            this.getArea(this.editData.masterInfo.cityId).then(()=>{
              areaIds.forEach((v,y)=>{
                this.area.forEach((e,i)=>{
                  if(v.length>=6&&e.id===v) {
                    this.selectArea(e,i)
                  }else{
                    e.cities.forEach((va,index)=>{
                      if(va.id===v){
                        this.selectItem(va,i,index)
                      }
                    })
                  }
                })
              })
            })
          }
        });
      }else{
        this.isEdit=true;
      }




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
            let res2 = /^[\u4e00-\u9fa5a-zA-Z]{1,20}$/;
            if(res2.test(new1[0].value)==false){
              this.nameOne = "请填写师傅姓名，长度不超过20字符，不可输入特殊符号数字";
            }else{
              this.nameOne = "";
            }

          }
          if(new1[3].value != ""){
            let res2 = /^[\u4e00-\u9fa5a-zA-Z]{1,20}$/;
            if(res2.test(new1[3].value)==false){
              this.frindrenOne= "请填写朋友姓名，长度不超过20字符，不可输入特殊符号数字";
            }else{
              this.frindrenOne = "";
            }

          }
          if(new1[4].value != ""){
            let reg = /^1\d{10}$/;
            if(reg.test(new1[4].value)==false){
              this.frindPhoneOne = "请填写正确朋友手机号，长度为11位数字";
              return
            }else{
              this.frindPhoneOne = ""
            }
          }
          if(new1[1].value != ""){
            let reg = /^1\d{10}$/;
            if(reg.test(new1[1].value)==false){
              this.phoneNumOne = "请填写正确师傅手机号，长度为11位数字";
              return
            }else{
              this.phoneNumOne = ""
            }
          }
          if(new1[2].value != ""){
            let id = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if(id.test(new1[2].value)){
              this.idNumOne = "";
            }else{
              this.idNumOne = "请填写正确身份证号码"
              return
            }

          }
        },

        deep: true,

      },
      "level.SourceTypeValue":function(a,b){
       if(a != ""){
         this.levelOne = ""
       }
      },
      "type.SourceTypeValue":function(a,b){
        if(a != ""){
          this.typeOne = ""
        }
      },
      "siteId.SourceTypeValue":function(a,b){
        if(a != ""){
          this.siteOne = ""
        }
      },
      "city.SourceTypeValue":function(a,b){
        if(a != ""){
          this.cityIdOne = ""
        }
      },
      areas:function(a,b){
        if(a.length>0){
          this.areaIdsOne = ""
        }
      },
      skills:function(a,b){
        if(a.length>0){
          this.skillIdsOne = ""
        }
      }


    },
    methods: {
      //所属网点
      getSiteList(){
        const url=this.$apidomain+"/common/findsite";
        this.$http.get(url).then(r=>{
          let data=r.data;
          this.siteId.SourceType.push({"id":"","value":"---请选择---"});
          data.result.forEach((v)=>{
            this.siteId.SourceType.push({"id":v.id,"value":v.name});
          })
        })
      },
      //编辑是服务工种的状态
      isShowSkills(){
        if(!!this.isAdd.id){
          if(!this.isEdit){
            return true;
          }
        }else{
          return false;
        }
      },
      //获取服务区域id
      getArea(id){
        let url=`${this.$apidomain}/common/findareaandstreetoptions?cityId=${id}`;
        return this.$http.get(url).then(res=>{
          const data=res.data;
          if(data.code==="0000"){
            this.areaSelects=[];
            this.streetSelects=[];
            this.area=data.result;
            this.area.forEach((v,i)=>{
              this.areaSelects.push(0);
              this.streetSelects.push([]);
              v.cities.forEach(e=> this.streetSelects[i].push(false))
            });
          }else{
            this.$queryFun.successAlert.call(this,data.error);
          }
        })
      },
      accomplish(prams){
        //prams.idPhotos = prams.idPhotos.join(",");
        prams.idPhotos = this.editData.masterInfo.idPhotos;
        prams.id=this.isAdd.id;
        //prams.city=this.editData.siteInfo.city
        if( prams.type==="3"&&!prams.siteId)return this.$queryFun.successAlert.call(this,'请选择所属网点');
        let url=this.$apidomain+"/masterinfo/changeInfo";
        this.$http.post(url,prams).then(res=>{
          let data = res.data;
          if(data.code==="0000"){
            this.$queryFun.successAlert.call(this,"编辑成功","1");
            //this.isedit=true;
            //this.$store.commit("edit",false);
            this.quiry();
            this.isAdd.isShow=false;
            //this.close(this.isDetailed)
          }else{
            this.$queryFun.successAlert.call(this,data.error);
          }
        })
      },
      edit(){
        this.isEdit=true;
      },
      skillIdsOne1(v){
        this.skillIdsOne2 =v;
      },
      selectArea(e,i) {
        this.areaIdsOne1 = 1;
        let isSelector=!!this.areaSelects[i]?0:1;
        this.$set(this.areaSelects,i,isSelector);
        this.$set(this.streetSelects,i,this.streetSelects[i].map(v => !!this.areaSelects[i]))
      },
      selectItem(e,y,i) {
        this.areaIdsOne1 = 1;
        this.streetSelects[y][i]=!this.streetSelects[y][i];
        this.$set(this.streetSelects,y, this.streetSelects[y]);
        let isSelector=1;
        const $forEach = (arr,isActive=false) =>{
          for(let k=0; k<arr.length; k++){
            if(!arr[k]) return !!isActive?2:0;
          }
          return 1;
        };
        let isActive= false;
        for(let k=0; k<this.streetSelects[y].length; k++){
          if(this.streetSelects[y][k]){
            isActive=true;
          }
        }
        isSelector=$forEach(this.streetSelects[y]);
        if(!isSelector)isSelector=$forEach(this.streetSelects[y],true);
        if(!isActive)isSelector=0;
        this.$set(this.areaSelects,y,isSelector)
      },
      selector1(item,values,bankValue){       //选中银行后的下拉列表
        var key=item.key;
        this.selectorBehindObj[key]=bankValue;
      },
      submitAdd(isEdit=false){
        //获取城市ID,服务区域ID&服务工种ID
        let params=[];
        const getIds=obj=>{
          let params=[];
          obj.parents.forEach((v,i)=>{
            if(v===2 || v===1){
              obj.childrens[i].forEach((e,y)=>{
                if(e){
                  params.push(obj.list[i][obj.beans][y][obj.key]);
                }
              })
            }
          });
          return params
        };
        let areaIds = getIds({
          parents:this.areaSelects,
          list:this.area,
          childrens:this.streetSelects,
          beans:"cities",
          key:"id"
        }).join(",");
        const getSillName = key => {
          return {
            parents:this.productionFirsts,
            list:this.skillList,
            childrens:this.productionChilds,
            beans:"beans",
            key,
          }
        };

        let skillId = getIds(getSillName("a")).join(",");
        this.selectorBehindObj.skillIdNames=getIds(getSillName("b")).join(",");
        this.selectorBehindObj.areaIds=areaIds;
        this.selectorBehindObj.skillIds=skillId;


        this.inputs.forEach(v=>{
          this.selectorBehindObj[v.key]=v.value;
        });
        this.selectorBehindObj.idPhotos = this.selectorBehindObj.benrenzhaopian+","+this.selectorBehindObj.shengfenzhengzhengmian+","+this.selectorBehindObj.shengfenzhengfanmian+","+this.selectorBehindObj.zige;
        if(isEdit)return this.accomplish(this.selectorBehindObj);

        if(!this.selectorBehindObj.name){
          this.nameOne = "请填写师傅姓名";
          return
        }else{
          var res1 = /^[\u4e00-\u9fa5a-zA-Z]{1,20}$/;
          if(res1.test(this.selectorBehindObj.name)==false){
            this.nameOne = " 请填写师傅姓名，长度不超过20字符，不可输入特殊符号数字";
            return
          }else{
            this.nameOne = ""
          }

        }
        if(!this.selectorBehindObj.phoneNum){
          this.phoneNumOne = "请填写师傅手机号";
          return
        }else{
          let reg = /^1\d{10}$/;
          if(reg.test(this.selectorBehindObj.phoneNum)==false){
            this.phoneNumOne = "请填写正确师傅手机号，长度为11位数字";
            return
          }else{
            this.phoneNumOne = ""
          }

        }
        if(!this.selectorBehindObj.idNum){
          this.idNumOne = "请填写师傅身份证号码";
          return
        }else{
          let id = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
          if(id.test(this.selectorBehindObj.idNum) == false){
            this.idNumOne = "请填写正确身份证号码";
            return
          }else{
            this.idNumOne = ""
          }
        }
        if(!this.selectorBehindObj.level){
          this.levelOne = "请填写师傅等级";
          return
        }else{
          this.levelOne = ""
        }
        if(!this.selectorBehindObj.type){
          this.typeOne = "请填写师傅类型";
          return
        }else{
          this.typeOne = ""
        }
//        if(!this.selectorBehindObj.site){
//          this.siteOne = "请填写所属网点";
//          return
//        }else{
//          this.siteOne = ""
//        }
        if(!this.selectorBehindObj.cityId){
          this.cityIdOne = "请填写服务城市";
          return
        }else{
          this.cityIdOne = ""
        }
        if(!this.selectorBehindObj.areaIds){
          this.areaIdsOne = "请填写服务区域";
          return
        }else{
          this.areaIdsOne = ""
        }
        if(!this.selectorBehindObj.skillIds){
          this.skillIdsOne = "请填写服务工种";
          return
        }else{
          this.skillIdsOne = ""
        }
//        if(this.$testReg(this.selectorBehindObj, this) && this.$selectorExp(this.selectorBehindObj,this)&&this.$imageExp(this.selectorBehindObj,this)){

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
        })
//        }
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
          if(data.code==='0000'){
            this.areaoptions1 = data.result;
            this.areaSelects=[];
            this.streetSelects=[];
            this.area=data.result;
            this.area.forEach((v,i)=>{
              this.areaSelects.push(0);
              this.streetSelects.push([]);
              v.cities.forEach(e=> this.streetSelects[i].push(false))
            });
          }else{
            this.$queryFun.successAlert.call(this,data.error);
          }
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

  .container_area{
    margin-top: 15px;
    width: 100%;
    padding:2em 1em;
    >div{
      .list_name{
        text-align: left;
        width:4em;
      }
    }
    >.content_area{
      width:100%;
      margin-top:1em;
      display: flex;
      flex-wrap: wrap;
      >aside{
        width:50%;
        margin-bottom:2em;
        >.area{
          &::before{
            content:"";
            display: inline-block;
            vertical-align: middle;
            left:0;
            margin-right:5px;
            top:0;
            width:20px;
            border-radius: 2px;
            height: 20px;
            border:1px solid #A470CD;
          }
        }
        >.select_area::before{
          border:none;
          background:url(../../../assets/images/selectArea3.png) center center no-repeat;
          background-size:100% 100%;
        }
        >.topo_select::before{
          border:none;
          background:url(../../../assets/images/topo-selected.png) center center no-repeat;
          background-size:100% 100%;
        }
        >.street_list{
          display: flex;
          flex-wrap: wrap;
          >.street_list_item{
            width:23%;
            display: flex;
            justify-content: center;
            align-items: center;
            color:#979797;
            margin-top:.5em;
            border-radius: 2px;
            margin-right:.6em;
            border:1px solid #999999;
            min-height:30px;
            text-align: center;
            line-height: 30px;
          }
          >.selected_cities{
            border:1px solid rgba(164,112,205,1);
            position:relative;
            &::after{
              position:absolute;
              top:-1px;
              right:-1px;
              content:"";
              background:url(../../../assets/images/childer-selected.png) center center no-repeat;
              width: 24px;
              height: 24px;
              background-size:100% 100%;
            }
          }
        }
      }
      >.left_item{

      }
      >.right_item{
      }
    }
  }
  .error_info{
    color:red;
    font-size: 12px;
  }
  .el-input{
   width:200px;
  }
  .list_name{
    width:110px;
    color:rgba(94,109,130,1);
  }
  .input_title{
    background:#F0F0F0;
    line-height: 2em;
    margin-top:20px;
    text-indent: 1em;
    padding-left:10px;
    line-height:30px;
    width:100%;
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
    height:80%;
    >h3{
      font-size: 16px;
      color: #333333;
      border-bottom:2px solid #979797;
      text-align: center;
      font-family:PingFangSC-Regular;
      line-height:3em;
      padding-left:10px;
      letter-spacing: 0;
    }
    >.content{
      overflow-y:auto;
      width:100%;
      height:75%;
      padding:0 2em;
      >div{
        flex:1;
        >ul{
          /*width:35%;*/
          padding-top:20px;
          >li{
            /*text-align: right;*/
            margin-top:10px;
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
          >li:nth-of-type(1),>li:nth-of-type(2){
            margin-top: 28px;
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
  .reg{
    color:red;
    display: block;
    margin: 0;
    padding: 0;
    margin-left:115px;
    line-height: 15px;
    height:20px;
    width:200px;
    font-size: 12px;
  }
  .editStyle{
    display: inline-block;
    width: 200px;
    margin-left: 10px;
  }
  .idPhotoes{
    width: 100%;
    //float: none;
    display: flex;
    flex-wrap:wrap;
    padding:0;
    >li{
      width:50%;
      margin-bottom:30px;
      >img{
        display: block;
        width:270px;
        height: 130px;
      }
    }
  }
  .closeBtn{
    width: 200px;
    height: 40px;
    line-height: 40px !important;
    border-radius:4px;
    border:1px solid #23A1FE !important;
    margin-right: 9px !important;
    color: #23A1FE !important;
  }
  .selector{
    width:200px;
    height:40px;
    line-height: 40px !important;
    background:rgba(32,160,255,1) !important;
    border-radius:4px;
    border: none !important;
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
         float: left;
        .el-cascader__label{
          line-height: 40px !important;

      }
    }
  }
</style>


