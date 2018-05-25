
<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{isAdd.title}}  <p class="closeX" id="closeX" @click="closeMove"></p></h3>
      <div class="content">
        <div class="left_info">
          <p class="title">角色信息</p>
          <ul>
            <li v-for="(item,index) in inputs" :key="index">
              <span class="list_name">{{item.name}} : </span>
              <el-input
                style="width:200px;"
                placeholder="请输入内容"
                v-model="item.value">
              </el-input>
            </li>
            <li>
              <span class="list_name"> 师傅等级 : </span>
              <el-select
                v-model="level.SourceTypeValue" placeholder="请选择" @change="selector(level,level.SourceType,level.SourceTypeValue)">
                <el-option
                  v-for="items in level.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>
            <li>
              <span class="list_name">  服务区域 : </span>
              <el-cascader id="cascader"
                           @change="changeSelector"
                           :options="areaoptions1"
                           change-on-select
                           @active-item-change="handleItemChange"
                           :props="props"
              ></el-cascader>
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

              <span class="list_name">  服务工种 : </span>
              <el-cascader id="cascader2"
                           @change="changeSelector2"
                           :options="labeloptions2"
                           change-on-select
                           @active-item-change="handleItemChange"
                           :props="props"
              ></el-cascader>
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
              <ul class="files">
                <li v-for="(item,index) in files" :key="index">
                  <span class="list_name">   {{item.name}} : </span>
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
              value: '---请选择---',
              id: ""
            }, {
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
            name:"姓名",
            key:"name",
            value:""
          }, {
            name:"手机号",
            key:"phoneNum",
            value:""
          }, {
            name:"身份证号码",
            key:"idNum",
            value:""
          }, {
            name:"紧急联系人",
            key:"emergencyContact",
            value:""
          },{
            name:"紧急联系人电话",
            key:"emergencyPhoneNum",
            value:""
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
      url=this.$apidomain+"/common/findareaandstreetoptions?cityId="+this.$getLocalStorage("enrolleeinfo")[0].cityId;
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.areaoptions1 = data.result;
      })
      url=this.$apidomain+"/common/findsite";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.siteId.SourceType.push({"id":"","value":"---请选择---"});
        data.result.forEach((v)=>{
          this.siteId.SourceType.push({"id":v.id,"value":v.name});
        })
      })
    },
    methods: {
      submitAdd(){
        this.inputs.forEach(v=>{
          this.selectorBehindObj[v.key]=v.value;
        });
        this.selectorBehindObj.siteId=this.$getLocalStorage("enrolleeinfo")[0].id;
        this.selectorBehindObj.cityId=this.$getLocalStorage("enrolleeinfo")[0].cityId;
        this.selectorBehindObj.type="3";
        this.selectorBehindObj.idPhotos = this.selectorBehindObj.benrenzhaopian+","+this.selectorBehindObj.shengfenzhengzhengmian+","+this.selectorBehindObj.shengfenzhengfanmian+","+this.selectorBehindObj.zige;
        let url=this.$apidomain+"/masterinfo/submit";
        if(this.$testReg(this.selectorBehindObj, this) && this.$selectorExp(this.selectorBehindObj,this)&&this.$imageExp(this.selectorBehindObj,this)){
          this.$http.post(url,this.selectorBehindObj).then(res=>{
          let data = res.data;
          if(data.code==='0000'){
            this.quiry();
            this.isAdd.isShow=false
          }else{
            alert(data.error);
          }
        })}
      },
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
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
          console.log(this.areaoptions1);
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
    watch:{

    }
  }
</script>

<style scoped lang="scss">
  @import "../../../../assets/styles/commButton";
  .el-input{
   width:217px;
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
    >h3{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      padding-left:10px;
      letter-spacing: 0;
    }
    >.content{
      width:100%;
      display:flex;
      height: 75%;
      overflow: auto;
      >div{
        flex:1;
        >ul{
          /*width:35%;*/
          padding-top:20px;
          .list_name{
            width:120px;
          }
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
    display: inline-block;
    vertical-align: text-top;
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
    background:url(../../../../../static/images/del.png) center center no-repeat;
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


