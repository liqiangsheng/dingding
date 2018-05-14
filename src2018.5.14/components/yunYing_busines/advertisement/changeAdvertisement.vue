<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{isAdd.title}} <p class="closeX" id="closeX" @click="closeMove"></p></h3>
      <div class="content">
        <div class="left_info">
          <ul style="padding-top:0;">
            <li >
              <span class="list_name">广告名称 : </span>
              <el-input style="width:220px;"
                placeholder="请输入内容"
                v-model="objData.name">
              </el-input>
            </li>
            <li v-if="isDiscount">
            <span class="list_name">
              副标题 :
            </span>
              <el-input
                style="220px;"
                v-model="objData.subHead"
              >  
              </el-input>
            </li>
            <li>
              <span class="list_name"> 广告栏位置 : </span>
              <el-select style="width:220px;"
                v-if="!isDiscount"
                v-model="showKey.SourceTypeValue" :placeholder="objData.showKeyStr" @change="selector(showKey,showKey.SourceType,showKey.SourceTypeValue)">
                <el-option
                  v-for="items in showKey.SourceType"
                  :key="items.id"
                  :value="items.value"
                >
                </el-option>
              </el-select>
              <span v-else>{{objData.showKey|advertisingShow}}</span>
            </li>
            <li>
              <ul class="files">
                <li style="width:100%;margin-bottom:0; " v-for="(item,index) in files" :key="index">
                  <span class="list_name"> {{item.name}} :</span>
                  <a href="javascript:;" ref="images" style="width:220px;display: inline-block;vertical-align: text-top;position:relative"  class="file">
                    <input type="file"  @change="onchangeFile($event,item.key)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                    <i  @click="delImage" class="icon-取消 del_image"></i>
                  </a>
                  <i class="i">图片上传支持3M以内，格式为png，jpg，gif</i>
                </li>
              </ul>
            </li>
            <li >
              <span class="list_name">   广告内容 :</span>
              <el-input
                placeholder="请输入内容"
                v-model="objData.remark">
              </el-input>
            </li>
            <li>
              <span class="list_name demonstration"> 展示周期 :</span>
              <el-date-picker
                class="timeinfo"
                v-model="value3"
                type="datetimerange"
                placeholder="请选择展示周期"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </li>
            <li style="text-indent:2em;" v-if="isDiscount">
               折扣产品名称 : {{objData.serviceName}}
            </li v-if="isDiscount">
            <li style="text-indent:2em;" v-if="isDiscount">
               折扣活动名称 : {{objData.saleName}}
            </li>
            <li >
              <span class="list_name">   顺序 :</span>
              <el-input-number
                :min="1"
                :max="9999"
                v-model="objData.sort">
              </el-input-number>
            </li>
             <li >
               <span class="list_name">  跳转链接 :</span>
              <el-input v-if="!isDiscount"
                placeholder="请输入内容"
                v-model="objData.url">
              </el-input>
              <span v-else style="display:inline-block;" width="max-width:200px;height:auto;">{{objData.url}}</span>
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
        value3:[],
        objData:{},
        isDiscount:false,
        selectorBehindObj:{
          name:"",
          remark:"",
          url:"",
          sort:50,
        },
        showKey:{
          name: "广告栏位置",
          key: "showKey",
          SourceTypeValue: '',
          SourceType: [
            {
              value: '首页头部banner',
              id: "HomePageHead"
            }, {
              value: '系统公告',
              id: "SystemNotice"
            }, {
              value: '首页广告位',
              id: "HomePageBottom"
            }, {
              value: '促销广告A位',
              id: "PromotionA"
            }, {
              value: '促销广告B位',
              id: "PromotionB"
            }, {
              value: '促销广告C位',
              id: "PromotionC"
            }, {
              value: '促销广告D位',
              id: "PromotionD"
            },
            {
              value: '折扣产品展示位',
              id: "SalePageBottom"
            },
          ]
        },
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
      let url=this.$apidomain+"/advertisingInfo/findoneAdvertisingInfo?id="+this.isAdd.id;
      this.$http.get(url).then(res=>{
        let data = res.data;
        this.objData=data.result;
        let startTime=new Date(this.objData.startTime);
        let endTime=new Date(this.objData.endTime);
        this.value3.push(startTime);
        this.value3.push(endTime);
        if(data.result.showKey==="SalePageBottom"){
          this.isDiscount=true;
        }
        if("HomePageHead"==this.objData.showKey){
          this.objData.showKeyStr = "首页头部banner";
        }else if("SystemNotice"==this.objData.showKey){
          this.objData.showKeyStr =  "系统公告";
        }else if("HomePageBottom"==this.objData.showKey){
          this.objData.showKeyStr =  "首页广告位";
        }else if("PromotionA"==this.objData.showKey){
          this.objData.showKeyStr =  "促销广告A位";
        }else if("PromotionB"==this.objData.showKey){
          this.objData.showKeyStr =  "促销广告B位";
        }else if("PromotionC"==this.objData.showKey){
          this.objData.showKeyStr =  "促销广告C位";
        }else if("PromotionD"==this.objData.showKey){
          this.objData.showKeyStr =  "促销广告D位";
        }
        this.$refs.images[0].style.background= "url("+this.objData.image+") center center no-repeat";
        this.$refs.images[0].style.backgroundSize= "100% 100%";
      })
    },
    methods: {
      delImage(){
         this.$confirm('确认删除图片？').then(()=> {
            this.objData.image="";
            this.$refs.images[0].style.background= "url()";
                this.$message({message: `删除成功`});
          }).catch(() => {

          });
      // }

      },
      submitAdd(){
        if(this.value3.length==0){
          alert("请选择展示时间")
        }else if(this.value3.length==1){
          alert("请选择结束时间")
        }else if(this.value3.length==2&&this.value3[0]!=null&&this.value3[1]!=null){
          console.log(this.value3);
          let star=this.value3[0];
          let end=this.value3[1];
          this.objData.startTimeStr=star.getFullYear() + '-' + ((star.getMonth() + 1)>9?(star.getMonth() + 1):"0"+(star.getMonth() + 1)) + '-' + (star.getDate()>9?star.getDate():"0"+star.getDate()) + ' ' + (star.getHours()>9?star.getHours():"0"+star.getHours()) + ':' + (star.getMinutes()>9?star.getMinutes():"0"+star.getMinutes()) + ':' + (star.getSeconds()>9?star.getSeconds():"0"+star.getSeconds());
          this.objData.endTimeStr=end.getFullYear() + '-' + ((end.getMonth() + 1)>9?(end.getMonth() + 1):"0"+(end.getMonth() + 1)) + '-' + (end.getDate()>9?end.getDate():"0"+end.getDate()) + ' ' + (end.getHours()>9?end.getHours():"0"+end.getHours()) + ':' + (end.getMinutes()>9?end.getMinutes():"0"+end.getMinutes()) + ':' + (end.getSeconds()>9?end.getSeconds():"0"+end.getSeconds());
          if(!this.objData["showKey"]){
            return this.$message({message: `请选择广告栏位置`,});
          }else{

          }
          if(this.$testReg( this.objData,this,"advertiseme")){
            let url=this.$apidomain+"/advertisingInfo/updateAdvertisingInfo";
            this.$http.post(url,this.objData).then(res=>{
              let data = res.data;
              if(data.code=="0000"){
                this.quiry();
                this.isAdd.isShow=false
              }else{
                alert(data.error)
              }
            })}
        }else{
          return this.$message({message: `请选展示周期`,});
        }

      },
      selector(item,values,SourceTypeValue){
        var key=item.key;
        values.forEach((v,i)=>{
          if(v.value===SourceTypeValue){
            this.objData[key]=v.id;
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
            this.objData[keyImg]=data.url;   //参数是ajax返回的图片地址
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
    background-color:#fff;
    background-image: url("../../../../static/images/phonebanner.png");
    background-repeat: no-repeat;
    background-position:85% 50% ;
    background-size:300px 600px;
    letter-spacing: 0;
    width:60%;
    border-radius: 10px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    height:90%;
    >h3{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      padding-left:10px;
      letter-spacing: 0;
    }
    >.content{
      overflow-y: auto;
      height: 78%;
      width:100%;
      display:flex;

      >div{
        flex:1;
        >ul{
          .list_name{
            width:90px;
          }
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
                >.i{
                  display: block;
                  color: #999999;
                  font-size: 14px;
                  padding-left: 9%;
                  font-style:normal;
                }
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

    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;

  }
  .file input {
    position: absolute;
    /*font-size: 100px;*/
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
  .del_image{
    position:absolute;
    top:-19px;
    right:-19px;
    font-size:30px;
  }
  .alert .btn{
    bottom:6%;
  }
  *{
    box-sizing: content-box;
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


