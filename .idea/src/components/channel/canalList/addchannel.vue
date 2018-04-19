<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{isAdd.title}} <p class="closeX" id="closeX" @click="closeMove"></p></h3>
      <div class="scrollbar content">
        <div class="left_info">
          <ul>
            <li>
              <span class="list_name">  渠道类型 :</span>
              <el-select
                v-model="type.SourceTypeValue" placeholder="请选择" @change="selector(type,type.SourceType,type.SourceTypeValue)">
                <el-option
                  v-for="items in type.SourceType"
                  :key="items.value"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </li>
            <li v-for="(item,index) in inputs" :key="index">
              <inputs-list :item="item"></inputs-list>
              <!--<span class="list_name">   {{item.name}} :</span>-->
              <!--<el-input-->
                <!--placeholder="请输入内容"-->
                <!--v-model="item.value">-->
              <!--</el-input>-->

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
            key:"name",
            value:"",
            type:"text"
          }, {
            name:"登陆账号",
            key:"account",
            value:"",
            type:"text"
          }, {
            name:"登陆密码",
            key:"password",
            value:"",
            type:"password"
          }, {
            name:"联系人",
            key:"linkmanName",
            value:"",
            type:"text"
          },{
            name:"联系电话",
            key:"linkmanTelephone",
            value:"",
            type:"text"
          },{
            name:"公司电话",
            key:"companyTelephone",
            value:"",
            type:"text"
          },{
            name:"总部地址",
            key:"headquarterAddress",
            value:"",
            type:"text"
          },{
            name:"开户行",
            key:"bankOfDeposit",
            value:"",
            type:"text"
          },{
            name:"卡号",
            key:"cardNumber",
            value:"",
            type:"text"
          }
        ],
      }
    },
    created(){
//      let url=this.$apidomain+"/common/findlabelbusinessoptions";
//      this.$http.get(url).then(r=>{
//        let data=r.data;
//        this.labeloptions2 = data.result;
//      })
    },
    methods: {
      submitAdd(){
        this.inputs.forEach(v=>{
          this.selectorBehindObj[v.key]=v.value;
        });

        let RegData=this.selectorBehindObj;

        if(!this.selectorBehindObj["type"]){
          return this.$message({
            message: `请选择渠道类型`,
          });
        }
        if(this.$testReg(RegData,this,"channel")){
        let url=this.$apidomain+"/officialpartnerinfo/saveOfficialPartnerInfo";
        this.$http.post(url,this.selectorBehindObj).then(res=>{
          let data = res.data;
          this.$notify({
            title: '成功',
            message: '新建成功',
            type: 'success'});
          this.quiry();
          this.isAdd.isShow=false
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
    height:70%;
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


