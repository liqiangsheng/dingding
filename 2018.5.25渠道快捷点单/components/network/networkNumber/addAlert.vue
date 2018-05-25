<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title" style="position:relative;">{{isAdd.title}}  <p class="closeX" @click="closeMove"></p></h3>
      <div class="scrollbar content">
        <div class="left_info">
          <ul>
            <li v-for="(item,index) in inputs" :key="index">
              <inputs-list :item="item"></inputs-list>
            </li>
            <li>
              <span class="list_name">城市 :</span>
              <el-select
                v-model="city.SourceTypeValue" placeholder="请选择" @change="selector(city,city.SourceType,city.SourceTypeValue)">
                <el-option
                  v-for="items in city.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>
            <li>
               <span class="list_name">服务区域 :</span>
              <el-select
                v-model="area.SourceTypeValue" placeholder="请选择" @change="selector(area,area.SourceType,area.SourceTypeValue)">
                <el-option
                  v-for="items in area.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
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
            <li >

              <span class="list_name">主营业务:</span>
              <el-select
                v-model="skill.SourceTypeValue" placeholder="请选择" @change="selector(skill,skill.SourceType,skill.SourceTypeValue)">
                <el-option
                  v-for="items in skill.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
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
              <span class="list_name">认证资料 : </span>
              <a href="javascript:;" class="file"  v-for="(item,index) in files" :key="index">
                <input type="file" @change="onchangeFile($event,item.key)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
              </a>
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
  export default {
    props:["isAdd","quiry"],
    components:{
      inputsList:inputs
    },
    data(){
      return{
        selectorBehindObj:{},
        skills:[],
        areas:[],
        primary:"primary",
        city: {
          name: "城市",
          key: "cityId",
          SourceTypeValue: '', //选中后的
          SourceType: []
        },
        area: {
          name: "服务区域",
          key: "areaId",
          SourceTypeValue: '', //选中后的
          SourceType: []
        },
        skill: {
          name: "主营业务",
          key: "skillId",
          SourceTypeValue: '', //选中后的
          SourceType: []
        },
        files:[
         {
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
        potionValueId:'',
        inputs:[
          {
            name:"网点名称",
            key:"name",
            value:"",
            type:"text",
          }, {
            name:"用户名",
            key:"username",
            type:"text",
            value:""
          }, {
            name:"公司电话",
            key:"companyTel",
            type:"text",
            value:""
          }, {
            name:"密码",
            key:"password",
            type:"password",
            value:""
          }, {
            name:"联系人",
            key:"linkmanName",
            value:"",
            type:"text",
          },{
            name:"手机号",
            key:"linkmanPhoneNum",
            value:"",
            type:"text",
          }
        ],
      }
    },
    created(){
      let url=this.$apidomain+"/common/findcitylistareainfo";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.city.SourceType.push({"id":"","value":"---请选择---"});
        data.result.forEach((v2)=>{
          this.city.SourceType.push({"id":v2.id,"value":v2.name});
        });
      });
      url=this.$apidomain+"/common/findflabelbusinessname";
      this.$http.get(url).then(r=>{
        let data=r.data;
        this.skill.SourceType.push({"id":"","value":"---请选择---"});
        data.result.forEach((v2)=>{
          this.skill.SourceType.push({"id":v2.id,"value":v2.name});
        })
      });
    },

    methods: {
      submitAdd(){
        this.inputs.forEach(v=>{
          this.selectorBehindObj[v.key]=v.value;
        });
        if(this.$testReg(this.selectorBehindObj,this,"network")&&this.$selectorExpSite(this.selectorBehindObj,this)){
        //正则验证
          this.selectorBehindObj.idPhotos = this.selectorBehindObj.shengfenzhengzhengmian+","+this.selectorBehindObj.shengfenzhengfanmian+","+this.selectorBehindObj.zige;
        let url=this.$apidomain+"/siteInfo/submit";
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
        }
      },
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
            if("areaId"==key&&v.id&&""!=v.id){
              if(this.checkIdIn(this.areas,v.id)){
                this.areas.push({"id":v.id,"label":this.selectorBehindObj.city+"-"+v.value});
                this.selectorBehindObj.areaIds=this.getIds(this.areas);
              }
            }
            if("skillId"==key&&v.id&&""!=v.id){
              if(this.checkIdIn(this.skills,v.id)){
                this.skills.push({"id":v.id,"label":v.value});
                this.selectorBehindObj.skillIds=this.getIds(this.skills);
              }
            }
          }
        })
        if("cityId"==key){
          this.selectorBehindObj.city = SourceTypeValue;
          let url=this.$apidomain+"/common/findareaandstreetoptions?cityId="+this.selectorBehindObj.cityId;
          this.$http.get(url).then(r=>{
            let data=r.data;
            this.area.SourceType=[];
            this.area.SourceTypeValue="";
            this.area.SourceType.push({"id":"","value":"---请选择---"});
            data.result.forEach((v2)=>{
              this.area.SourceType.push({"id":v2.id,"value":v2.label});
            })
            this.areas=[];
            this.selectorBehindObj.areaIds=this.getIds(this.areas);
          });
        }
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
  @import "../../../assets/styles/commButton";
  #app{
    overflow: hidden;
  }
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
      text-align: center;
      line-height:3em;
      padding-left:10px;
      letter-spacing: 0;
    }
    >.content{
      overflow-y:auto;
      width:100%;
      display:flex;
      height:75%;
      >div{
        flex:1;
        >ul{
          /*width:35%;*/
          padding-top:20px;
          >li{
            /*text-align: right;*/
            margin-top:20px;

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
    /*float:left;*/
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    width:140px;
    margin-right:10px;
    height: 80px;
    overflow: hidden;
    vertical-align: text-top;
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
    right:20px;
    top:0px;
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


