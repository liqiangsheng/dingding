<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{isAdd.title}}</h3>
      <div class="content">
        <div class="left_info">
          <ul>
            <li>
              <span class="list_name">消息类型 :</span>
              <el-select
                v-model="SysMessageType.SourceTypeValue" placeholder="请选择" @change="selector(SysMessageType,SysMessageType.SourceType,SysMessageType.SourceTypeValue)">
                <el-option
                  v-for="items in SysMessageType.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>
            <li >
              <span class="list_name"> 消息内容 :</span>
              <el-input style="width:200px;"
                placeholder="请输入内容"
                v-model="selectorBehindObj.content">
              </el-input>
            </li>
            <li >
              <span class="list_name"> 链接 :</span>
              <el-input style="width:200px;"
                placeholder="请输入内容"
                v-model="selectorBehindObj.link">
              </el-input>
            </li>
            <li>
              <span class="list_name"> 接收对象类型 :</span>
              <el-select
                v-model="receivingType.SourceTypeValue" placeholder="请选择" @change="selector(receivingType,receivingType.SourceType,receivingType.SourceTypeValue)">
                <el-option
                  v-for="items in receivingType.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>
            <li>
              <span class="list_name">接收对象 :</span>
              <el-select
                v-model="receivingObject.SourceTypeValue" placeholder="请选择" @change="selector(receivingObject,receivingObject.SourceType,receivingObject.SourceTypeValue)">
                <el-option
                  v-for="items in receivingObject.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
              <el-tag
                v-for="tag in obj"
                :key="tag.id"
                :closable="true"
                @close="handleClose1(tag)"
              >
                {{tag.value}}
              </el-tag>
            </li>
          </ul>
        </div>
      </div>
      <div class="consume_info">
      </div>
    </div>
    <p class="closeX" @click="closeMove"></p>
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
        selectorBehindObj:{
          content:"",
          url:"",
        },
        SysMessageType:{
          name: "消息类型",
          key: "type",
          SourceTypeValue: '',
          SourceType: [
            {
              value: '系统消息',
              id: "SysMessage"
            }, {
              value: '活动消息',
              id: "ActivityMessage"
            }
          ]
        },
        receivingType:{
          name: "接收对象类型",
          key: "responseObjectType",
          SourceTypeValue: '',
          SourceType: [
            {
              value: '渠道',
              id: "Channel"
            }, {
              value: '网点',
              id: "Site"
            }, {
              value: '师傅',
              id: "SystemUser"
            }
          ]
        },
        receivingObject:{
          name: "接收对象",
          key: "receivingObject",
          SourceTypeValue: '',
          SourceType: []
        },
        obj:[],
        files:[
          {
            name:"广告栏图片",
            point:"点击图片上传",
            key:"image"
          }
        ],
      }
    },
    created(){

    },
    methods: {
      submitAdd(){
        if("all"==this.selectorBehindObj.userIds){
          let k = JSON.parse(JSON.stringify(this.receivingObject.SourceType));
          k.splice(0,1);
          this.selectorBehindObj.userIds = this.getIds(k);
        }
        if(!this.selectorBehindObj["type"]){
            return this.alert("请选择消息类型")
        }
        if(!this.selectorBehindObj["responseObjectType"]){
            return this.alert("请选择接受对象类型")
        }
        if(!this.selectorBehindObj["link"]){
            return this.alert("请输入链接")
        }
        if(this.$testReg(this.selectorBehindObj,this)){
        let url=this.$apidomain+"/sysMessage/saveSysMessage";
        this.$http.post(url,this.selectorBehindObj).then(res=>{
          let data = res.data;
          this.quiry();
          this.isAdd.isShow=false
        })}
      },
      selector(item,values,SourceTypeValue){       //选中后的下拉列表
        var key=item.key;
        let objv = {};
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.selectorBehindObj[key]=v.id;
            objv = v;
          }
        })
        if("responseObjectType"==key){
          if("渠道"==SourceTypeValue){
            this.getChannel();
          }else if("网点"==SourceTypeValue){
            this.getSite();
          }else if("师傅"==SourceTypeValue){
            this.getSysUser();
          }
          this.receivingObject.SourceTypeValue="";
        }
        if("receivingObject"==key){
          if(this.checkAllIn(this.obj)){
            if("全部"==SourceTypeValue){
              this.obj = [];
              this.obj.push(objv)
            }else{
              this.obj.push(objv);
            }
          }
          this.selectorBehindObj.userIds=this.getIds(this.obj);
        }
      },
      getChannel(){
        let url=this.$apidomain+"/sysMessage/findChannel";
        this.$http.get(url).then(r=>{
          let data=r.data;
          this.obj = [];
          this.selectorBehindObj.userIds=this.getIds(this.obj);
          this.receivingObject.SourceType = [];
          this.receivingObject.SourceType.push({"id":"all","value":"全部"});
          data.result.forEach((v,i)=>{
            this.receivingObject.SourceType.push({"id":v.id,"value":v.name});
          })
        })
      },
      getSite(){
        let url=this.$apidomain+"/sysMessage/findSite";
        this.$http.get(url).then(r=>{
          let data=r.data;
          this.obj = [];
          this.selectorBehindObj.userIds=this.getIds(this.obj);
          this.receivingObject.SourceType = [];
          this.receivingObject.SourceType.push({"id":"all","value":"全部"});
          data.result.forEach((v,i)=>{
            this.receivingObject.SourceType.push({"id":v.id,"value":v.name});
          })
        })
      },
      getSysUser(){
        let url=this.$apidomain+"/sysMessage/findMasterInfo";
        this.$http.get(url).then(r=>{
          let data=r.data;
          this.obj = [];
          this.selectorBehindObj.userIds=this.getIds(this.obj);
          this.receivingObject.SourceType = [];
          this.receivingObject.SourceType.push({"id":"all","value":"全部"});
          data.result.forEach((v,i)=>{
            this.receivingObject.SourceType.push({"id":v.id,"value":v.name});
          })
        })
      },
      handleClose1(tag) {
        for(let i=this.obj.length-1;i>0;i--){
          if(this.obj[i].id===tag.id){
            this.obj.splice(i,1);
            this.selectorBehindObj.userIds=this.getIds(this.obj);
            return;
          }
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
      handleItemChange(val) {
      },
      alert(text){
        this.$message({
          message: text,
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
      checkAllIn(obj){
        let isin = true;
        obj.forEach((e)=>{
          if("all"==e.id){
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
    overflow-y: auto;
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

      >div{
        flex:1;
        >ul{
          .list_name{
            width:100px;
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
          >li:first-of-type{
            margin-top:0;
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


