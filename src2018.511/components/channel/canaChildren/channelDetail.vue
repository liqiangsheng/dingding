
<template>
  <div id="app">
    <div class="container">
      <h3 class="alert_title">{{isDetailed.title}}  <p class="closeX" id="closeX" @click="closeMove"></p></h3>
      <div class="scrollbar content">
        <div >
          <ul>
            <li>子渠道编号:{{dataObj.id}}</li>
            <li>子渠道名称:{{dataObj.name}}</li>
            <li>城市:{{dataObj.city}}</li>
            <li>子渠道地址:{{dataObj.details}}</li>
            <li>规模:{{dataObj.scale}}</li>
            <li>创建时间:{{dataObj.createDate|moment('YYYY-MM-DD HH:mm:ss')}}</li>
          </ul>
          <br/>
          <ul>
            <li>用户数:{{dataObj.userNumber}}人</li>
            <li>总订单量:{{dataObj.totalOutput}}</li>
            <li>总流水:{{dataObj.totalWater}}元</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="btn">
      <button @click="closeMove()">关闭</button>
    </div>
    <!--大弹框 详情end-->
    <div class="alert" v-if="isAdd.isShow" >
      <add :isAdd="isAdd" :findOne="findOne">
      </add>
    </div>
  </div>
</template>

<script>
  export default {
    props:["isDetailed","quiry"],
    data(){
      return{
        isAdd:{
          title:"新增子渠道",
          isShow:false
        },
        dataObj:{},
        subsetInfos:[],
        btnName:"编辑基本信息",
      }
    },
    created(){
      this.findOne();
    },
    methods: {
      findOne(){
        let url=this.$apidomain+"/officialPartnerSubsetInfo/findoneOfficialPartnerSubsetInfo?id="+this.isDetailed.id;
        this.$http.get(url).then(r=>{
          let data=r.data;
          this.dataObj = data.result;
        })
      },
      add(){
        this.isAdd.officialPartnerId = this.isDetailed.id;
        this.isAdd.isShow = true;
      },
      handleDelete(index,item){
        let url=this.$apidomain+"/officialPartnerSubsetInfo/deleteOfficialPartnerSubsetInfo";
        this.$http.post(url,item).then(res=>{
          let data = res.data;
          this.findOne();
        })
      },
      //保存
      enter(){
        if(!this.dataObj.linkmanName){
          alert("请输入联系人...");
          return;
        }
        if(!this.dataObj.linkmanTelephone){
          alert("请输入联系手机号...");
          return;
        }
        if(!this.dataObj.companyTelephone){
          alert("请输入公司电话...");
          return;
        }
        if(!this.dataObj.bankOfDeposit){
          alert("请输入开户行...");
          return;
        }
        if(!this.dataObj.cardNumber){
          alert("请输入银行卡号...");
          return;
        }
        let o = {};
        o.id = this.dataObj.id;
        o.linkmanName = this.dataObj.linkmanName;
        o.linkmanTelephone = this.dataObj.linkmanTelephone;
        o.companyTelephone = this.dataObj.companyTelephone;
        o.bankOfDeposit = this.dataObj.bankOfDeposit;
        o.cardNumber = this.dataObj.cardNumber;
        let url=this.$apidomain+"/officialpartnerinfo/updateOfficialPartnerInfo";
        this.$http.post(url,o).then(res=>{
          let data = res.data;
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.quiry();
          this.cancelEdit();
        })

      },
      edit(){  //编辑
        this.$store.commit("edit",!this.isEdit());
      },
      isEdit(){
        return this.$store.state.isEdit;
      },
      cancelEdit(){   //取消编辑
        this.$store.commit("edit",!this.isEdit());
        this.btnName="编辑基本信息";
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
        this.isDetailed.isShow=false;
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
      >div{
        flex:1;
        >ul{
          >li{
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


