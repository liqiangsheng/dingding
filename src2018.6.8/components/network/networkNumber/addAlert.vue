<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title" style="position:relative;">{{isAdd.title}}  <span class="closeX" @click="closeMove"></span></h3>

      <div class="scrollbar content">
        <div class="input_title">
          详细信息
        </div>
        <section class="container_content">
            <aside class="container_content_left">
              <div v-for="(item,index) in inputs" :key="index" v-if="index<5">
                <inputs-list :item="item"></inputs-list>
              </div>
              <div>
                <span class="list_name"> 服务工种:</span>
              </div>

            </aside>
          <aside class="container_content_right">
            <div v-for="(item,index) in inputs" :key="index" v-if="index>4">
              <inputs-list :item="item"></inputs-list>
            </div>
            <div>
              <span class="list_name"> 开户行:</span>
              <select-option class="section_option" @selectorData="getBank"  :messageList="$store.state.bankOfDeposit" :placeholder="'请选择开户行'" > </select-option>
            </div>

            <div>
              <span class="list_name"> 城市:</span>
              <select-option class="section_option" @selectorData="getCity"  :messageList="$store.state.cityData" :placeholder="'请选择城市'" > </select-option>
            </div>

            <div>
              <span class="list_name"> 服务区域:</span>
              <div class="saver_container">

                <aside class="left_list">
                  <div class="left_list_item">
                    手机维修
                  </div><div class="left_list_item">
                    手机维修
                  </div><div class="left_list_item">
                    手机维修
                  </div><div class="left_list_item">
                    手机维修
                  </div><div class="left_list_item">
                    手机维修
                  </div>
                </aside>
                <aside class="right_list">

                </aside>
              </div>
            </div>

          </aside>
        </section>
        <section class="upload_papers">
          <div class="input_title">
            认证资料
          </div>
          <div class="upload_papers_content">
            <a href="javascript:;" class="file"  v-for="(item,index) in files" :key="index">
              <input type="file" @change="onchangeFile($event,item.key)" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
            </a>

          </div>
        </section>
      </div>
      <div class="btn_container">
        <el-button  @click="closeMove()">关闭</el-button>
        <el-button type="primary" @click="submitAdd()" class='selector'>确定</el-button>
      </div>
    </div>


  </div>
</template>
<script>

  import inputs from "@/components/commInfo/inputs"
  import selectOption from "@/components/commInfo/selectOption"
  export default {
    props:["isAdd","quiry"],
    components:{
      inputsList:inputs,
      selectOption
    },
    data(){
      return{
        propsArea: {
          value: 'id',
          label:"label",
          children: 'cities',
        },
        selectorBehindObj:{},
        area:[],
        skillList: [],
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
          },{
             name:'银行卡号',
             key:'cardNumber',
             value:'',
             type:'text'
          },
//          {
//            name:'开户行',
//            key:'bankOfDeposit',
//            value:'',
//            type:'text'
//          },
          {
            name:'开户行地址',
            key:'headquarterAddress',
            value:'',
            type:'text'
          }
        ],
      }
    },
    created(){
     const urls=`${this.$apidomain}/common/findflabelbusinessname`;
      this.$http.get(urls).then(r=>{
        let data=r.data;
            if(data.code==="0000"){
//              this.skillList.SourceType.push({"id":"","name":"---请选择---"});
//              this.skillList= this.skillList.concat(data.result)
              console.log(data);
            }else{
              this.$queryFun.successAlert.call(this,data.error);
            }
      });
    },

    methods: {
      closeMove(){ this.isAdd.isShow = false},

      getBank (v) { this.selectorBehindObj["bankOfDeposit"] = v.id },

      getCity (v) { this.selectorBehindObj["cityId"] = v.id; this.getArea(v.id) },

      getSkill (v) { this.selectorBehindObj["skillId"] = v.id },

      getArea(id){
        let url=`${this.$apidomain}/common/findareaandstreetoptions?cityId=${id}`;
        this.$http.get(url).then(res=>{
          const data=res.data;
                if(data.code==="0000"){
                  this.area=data.result;
                }else{
                  this.$queryFun.successAlert.call(this,data.error);
                }
        })
      },

      changeSelector(value){             //区域
        console.log(value);
//        this.areaoptions1.forEach((v,i)=>{
//          if(value[0]===v.label){
//            this.areaId=v.id;    //选择区
//            v.cities.forEach((e,i)=>{
//              if(e.label===value[1]){
//                this.areaId=e.id    //选择街道
//              }
//            })
//          }
//        });
//        this.selectorBehindObj['areaId']=this.areaId
      },

      submitAdd(){
        this.inputs.forEach(v=>{
          this.selectorBehindObj[v.key]=v.value;
        });
        if(this.$testReg(this.selectorBehindObj,this,"network")&&this.$selectorExpSite(this.selectorBehindObj,this)){
        //正则验证
          this.selectorBehindObj.idPhotos = this.selectorBehindObj.shengfenzhengzhengmian+","+this.selectorBehindObj.shengfenzhengfanmian+","+this.selectorBehindObj.zige;
        let url=`${this.$apidomain}/siteInfo/submit`;
        this.$http.post(url,this.selectorBehindObj).then(res=>{
          let data = res.data;
          if(data.code==='0000'){
            this.$notify({title: '成功', message: '新建成功', type: 'success'});
            this.quiry();
            this.isAdd.isShow=false
          }else{
            this.$queryFun.successAlert.call(this,data.error);
          }
        })
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
            this.$queryFun.successAlert.call(this,"上传失败");
          }
        });
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

  .container{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    overflow: hidden;
    letter-spacing: 0;
    width:60%;
    border-radius: 7px;
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
      >.container_content{
        display: flex;
        >aside{
          width:50%;
          >div{
            margin-top:1em;
            .section_option{
              display: inline-block;
            }
          }
        }
        >.container_content_right, >.container_content_left{
          >div{
            >.list_name{
              width:93px;
            }
          }
        }
        >.container_content_right{
          >div{
            >.saver_container{
              display: inline-block;
              width:77%;
              height:500px;
              vertical-align: text-top;
              border:1px solid #ccc;
              box-shadow: 0 0 5px #ccc;
              >aside{
                height:100%;
              }
              >.left_list{
                width:40%;
                border-right:1px solid #ccc;
                >.left_list_item{

                }
              }
              >.right_list{
                width:70%;
              }
            }
          }
        }
      }
      .title{
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }
      >.input_title{
        background:#F0F0F0;
        line-height: 2em;
        margin-top:20px;
        text-indent: 1em;
      }
      >.upload_papers{
        margin-top:5em;
        >.input_title{
          background:#F0F0F0;
          line-height: 2em;
          margin-top:20px;
          text-indent: 1em;
        }
        >.upload_papers_content{
          display: flex;
          padding:1em 3em;
          >.file{
            flex:1;
          }
        }
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
    margin-right:2em;
    height: 143px;
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
    top:-30%;
    background-origin: content-box;
  }
  .btn_container{
    position:absolute;
    left:50%;
    bottom:3em;
    transform:translateX(-50%);
    button{
      padding-left:5em;
      padding-right:5em;
    }
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


