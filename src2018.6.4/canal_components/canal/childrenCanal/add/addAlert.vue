<template>
  <div id="app" class="channel-app-box">
    <div class="container">
      <h3 class="alert_title">{{isAdd.title}} <p class="closeX" id="closeX" @click="closeMove"><i></i></p></h3>
      <div class="content">
        <div class="left_info">
          <ul class="add_master">
              <li v-show="!isSiteShow">
              <span class="list_name">  子渠道 </span>
              <el-select
                v-model="city.SourceTypeValue" placeholder="请选择" @change="selectorArea(city,city.SourceType,city.SourceTypeValue)">
                <el-option
                  v-for="items in city.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>
            <li>
              <span class="list_name">  角色  </span>
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
            <li v-for="(item,index) in inputs" :key="index">
              <span class="list_name"> {{item.name}}  </span>
              <el-input
                placeholder="请输入内容"
                v-model="item.value">
              </el-input>
              <span v-if="item.isText" class="error_info">{{item.errorContent}}</span>
            </li>
          </ul>
        </div>
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
          name: "子渠道",
          key: "officialPartnerSubsetId",
          SourceTypeValue: '', //选中后的
          SourceType: []
        },
        level:{
          name: "角色",
          key: "roleId",
          SourceTypeValue: '',
          SourceType: [
            {
              value: '超级管理员',
              id: "SuperAdmin"
            }, {
              value: '管理员',
              id: "Admin"
            }
          ]
        },

        isSiteShow:false,
        areaoptions1: [],
        labeloptions2: [],
        primary:"primary",
        skills:[],
        areas:[],
        potionValueId:'',
        inputs:[
          {
            name:"账号",
            key:"account",
            isText:false,
            errorContent:"info",
            value:"",
            error:"请输入账号"
          }, {
            isText:false,
            name:"密码",
            key:"password",
            errorContent:"info",
            value:"",
            error:"请输入密码"
          },  {
            name:"联系人",
            isText:false,
            key:"linkmanName",
            errorContent:"info",
            value:"",
            error:"请输入联系人"
          },{
            name:"手机号",
            errorContent:"info",
            isText:false,
            error:"请输入手机号",
            key:"linkmanTelephone",
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
      let url=this.$apidomain+"/officialPartnerSubsetInfo/findlistOfficialPartnerSubsetInfo?officialPartnerId="+this.$getLocalStorage("enrolleeinfo")[0].id;
      this.$http.get(url).then(r=>{
        let data=r.data;
        data.result.forEach((v)=>{
          this.city.SourceType.push({"id":v.id,"value":v.name});
        })
      })
    },
    methods: {
      submitAdd(){
        this.inputs.forEach(v=>{
          this.selectorBehindObj[v.key]=v.value;
        });
      this.selectorBehindObj["officialPartnerId"]=this.$getLocalStorage("enrolleeinfo")[0].id;
      this.selectorBehindObj["officialPartnerName"]=this.$getLocalStorage("enrolleeinfo")[0].fullName;
        this.selectorBehindObj["password"]= this.selectorBehindObj["password"]?md5(this.selectorBehindObj["password"]):"";
        let url=this.$apidomain+"/officialPartnerSubsetAccountInfo/saveOfficialPartnerSubsetAccountInfo",inputs= this.inputs,params=this.selectorBehindObj,isFlag=true;
        if(!params.officialPartnerSubsetId){
          isFlag=false;
          return this.$queryFun.successAlert.call(this,"请选择子渠道");
        }else if(!params.roleId){
          isFlag=false;
          return this.$queryFun.successAlert.call(this,"请选择角色");
        }
       inputs.forEach((v, i) => {
         if(!v.value){
           isFlag=false;
          return this.$queryFun.successAlert.call(this,v.error);
         }else if(v.key==="linkmanTelephone"&&v.value.length!==11) {
           isFlag=false;
           return this.$queryFun.successAlert.call(this, "请输入正确的手机号码格式，不得小于或大于11位");
         }else if(v.key==="linkmanTelephone"&&isNaN(parseInt(v.value))){
           isFlag=false;
           return this.$queryFun.successAlert.call(this, "请输入正确的手机号码格式，不得输入英文、特殊字符..");
         }
        });
        if(!isFlag)return;
        this.$http.post(url,this.selectorBehindObj).then(res=>{
          let data = res.data;
          if(data.code==='0000'){
            this.$notify(
              {
              title: '成功',
              message: '新建成功',
              type: 'success'}
              );
            this.quiry();
            this.isAdd.isShow=false
          }else{
           this.$queryFun.successAlert.call(this,data.error);
          }
        })
      },
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        let key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
          }
        })
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
        this.selectorBehindObj.officialPartnerSubsetId = this.selectorBehindObj.siteId.substring(0,4);
        this.selectorBehindObj.officialPartnerSubsetName = this.getLabel(this.city.SourceType,this.selectorBehindObj.cityId);
        this.selectorBehindObj.roleId = this.getLabel(this.level.SourceType,this.selectorBehindObj.cityId);
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
            this.selectorBehindObj.officialPartnerSubsetName=v.value;
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
    watch:{

    }
  }
</script>

<style scoped lang="scss">
  @import "../../../../assets/styles/commButton";
  @import "../../../../assets/styles/ch_alert";

  .error_info{
    color:red;
    font-size: 12px;
  }
  .el-input, .el-select{
   width:40%;
  }
  .list_name{
    width:110px;
    margin-right:30px;
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
    letter-spacing: 0;
    width:50%;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    background:#fff;
    height:70%;
    padding-bottom:40px;
    >.content{
      width:100%;
      display:flex;
      height:100%;
      overflow-y: auto;
      &::-webkit-scrollbar {/*滚动条整体样式*/
        width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
      }
      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #ededed;
      }
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
    @media  screen and (max-height:750px){
      .content{
        max-height:350px;
      }
    }
    @media  screen and (max-height:700px){
      .content{
        max-height:300px;
      }
    }
    @media  screen and (max-height:640px){
      .content{
        max-height:250px;
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
  #closeX{
    >i{
      background:url(../../../../assets/images/cloos_alert.png) center center no-repeat;
      background-size:100% 100%;
    }
  }
  .selector{
    background:rgb(32, 160, 255) !important;
  }

</style>
<style lang="scss">
  .el-select-dropdown__item{
    line-height: 25px !important;
  }
  .el-select-dropdown{
    z-index: 99999 !important;
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


