<template>

    <div class="addAlert_box">
      <div class="el-message-box__title">
        <span>{{isOkName1}}</span>
        <p class="el-message-box__close" @click="close"> 关闭<img src="/static/images/closeIcon.png"></p>
      </div>
      <ul class="centent1">
        <li style=" overflow: hidden;">
          <p><img :src="jiantou1" @click="topBottomImg(name='配件信息')" />配件信息</p>
          <table id="parseInfoOne" v-show="jiantouShow1">
              <thead>
                <tr>
                    <td>产品全称</td>
                    <td style="text-align: left">{{parseInfo.serviceName}}</td>
                    <td>品牌</td>
                    <td style="text-align: left">{{parseInfo.brand}}</td>
                    <td>型号</td>
                    <td style="text-align: left">{{parseInfo.model}}</td>
                    <td>产品图片</td>
                    <td class="cursor" @click="lookImg(name='机器图片',parseInfo.machinePicture,parseInfo.machineBarCode,parseInfo.machineNameplate)">查看</td>
                </tr>
              </thead>
          </table>
          <table v-show="jiantouShow1" id="parseInfo">
            <thead>
              <tr>
                <td>配件状态</td>
                <td>配件名称</td>
                <td>配件条码</td>
                <td>配件描述</td>
                <td>取件方式</td>
                <td>是否已返还旧件</td>
                <td>配件图片</td>
              </tr>
            </thead>
            <tbody>
               <tr>
                 <td style="color: #E65831">{{parseInfoOne.state|parseState}}</td>
                 <td>{{parseInfoOne.name}}</td>
                 <td>ss-{{parseInfoOne.barCode}}</td>
                 <td>{{parseInfoOne.remark}}</td>
                 <td>{{parseInfoOne.shippingType|ShippingType}}</td>
                 <td>{{parseInfoOne.returnOldMountings|ReturnOldMountings}}</td>
                 <td class="cursor" @click="lookImg(name='配件图片',parseInfoOne.machinePicture,parseInfoOne.partsBarCode)">查看</td>
               </tr>
            </tbody>

          </table>
        </li>
        <li>
          <p><img :src="jiantou2" @click="topBottomImg(name='申领信息')"  />申领信息</p>
          <table v-show="jiantouShow2" id="parseInfo1">
            <thead>
            <tr>
              <td>工单号</td><td>申领时间</td><td>工程师姓名</td><td>工程师手机号</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{parseInfoOne.mainOrderId}}</td>
              <td>{{parseInfoOne.createTime| moment('YYYY-MM-DD HH:mm:ss')}}</td>
              <td>{{claimInfo.masterName}}</td>
              <td>{{claimInfo.masterPhoneNum}}</td>
            </tr>
            </tbody>
          </table>
        </li>
        <li>
          <p><img :src="jiantou3" @click="topBottomImg(name='申领跟踪')"  />申领跟踪</p>
          <table  cellSpacing="0" cellpadding="0" v-show="jiantouShow3" id="parseInfo2">
            <thead>
            <tr>
              <td v-for="(item,index) in parseHeadList" :key="index">{{item}}</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in parseInfoOne.mountingsApplyLogList">
              <td>
               {{item.createTime| moment('YYYY-MM-DD HH:mm:ss')}}
              </td>
              <td>
                {{item.operator}}
              </td>
              <td>
                {{item.operateType|parseStateOne}}
              </td>
              <td>
                {{item.remark}}
              </td>
              <td>
                <span class="cursor" v-if="item.operateType == 5&&item.certificateImg" @click="lookImg(name='申领图片',item.certificateImg)">查看</span>
              </td>
            </tr>
            <tr v-if="!parseInfoOne.mountingsApplyLogList.length" style="text-align: center">
            <td  colspan="5">无</td>
            </tr>
            </tbody>
          </table>
        </li>

       </ul>
      <PotosPotos v-if="isPotos.isShow" :isPotos="isPotos"></PotosPotos>
    </div>


</template>
<script>
  import PotosPotos from './alertPotos.vue'
  export default {
    props:["isOkName"],
    components:{
      PotosPotos,
    },
    data() {
      return {
        claimInfo:"", //申领信息
        parseInfo:{}, // 配件信息
        parseInfoOne:{},// 配件信息1
        isOkName1:this.isOkName,
        ParseID:this.$store.state.parseDetailiD.id,//要么列表的ID要么工单详情的ID
        isPotos:{//照片
          isShow:false,
          potosimg:[],
          idPhonesTime:[],
          newarr:[],
        },
        parseHeadList:['时间','对象','操作事项','备注说明','图片'],
        jiantouShow1:true,//箭头下
        jiantouShow2:true,////箭头下
        jiantouShow3:true,////箭头下
        jiantou1:"./static/images/topDetl.png", ////箭头下
        jiantou2:"./static/images/topDetl.png",////箭头下
        jiantou3:"./static/images/topDetl.png",////箭头下
      }

    },
    watch:{
      "$store.state.parseDetailiD":function(a,b){
        if(a){
          this.ParseID =a.id;
          this.isOkName1 = a.name;
          this.parseList();
        }
      }
    },
    methods: {
      lookImg(v,data,data1,data2){ //查看图片
        if(v=== '机器图片'){
          this.isPotos.potosimg = [data,data1,data2];
          this.isPotos.testName = ["机器外观","机器条码","机器铭牌"];
        }else if(v=== '配件图片'){
          this.isPotos.potosimg = [data,data1];
          this.isPotos.testName = ["配件图片","配件条码"];
        }else if(v=== '申领图片'){
          this.isPotos.potosimg = data.split(",");
          if(this.isPotos.potosimg.length == 1){
            this.isPotos.testName = ["1"];
          }else if(this.isPotos.potosimg.length == 2){
            this.isPotos.testName = ["1","2"];
          }else if(this.isPotos.potosimg.length == 3){
            this.isPotos.testName = ["1","2","3"];
          }
        }
        this.isPotos.isShow=true;
      },
      topBottomImg(v){ //箭头的上下
          if(v === "配件信息"){
           this.jiantouShow1 = !this.jiantouShow1;
           if(this.jiantouShow1 === true){
             this.jiantou1 = "./static/images/topDetl.png";
           }else{
             this.jiantou1 = "./static/images/bottomDetl.png";
           }
          }
          if(v === "申领信息"){
            this.jiantouShow2 = !this.jiantouShow2;
            if(this.jiantouShow2 === true){
              this.jiantou2 = "./static/images/topDetl.png";
            }else{
              this.jiantou2 = "./static/images/bottomDetl.png";
            }
          }
          if(v === "申领跟踪"){
            this.jiantouShow3 = !this.jiantouShow3;
            if(this.jiantouShow3 === true){
              this.jiantou3 = "./static/images/topDetl.png";
            }else{
              this.jiantou3 = "./static/images/bottomDetl.png";
            }
          }
      },
      close(){ //传值给父级
        this.$emit("isOpen",true)
        this.$store.dispatch("parseDetailiD",{id:"",isBool:true,name:""})
      },
      parseList(){
        let url = this.$common.apidomain + "/mountingsApply/findMountingsApplyDetails?id="+this.ParseID;
        this.$http.get(url).then(res=>{
          if(res.data.code === "0000"){
            this.parseInfo = res.data.result.serviceMountings;
            this.parseInfoOne = res.data.result;
            this.claimInfo = res.data.result.serviceMountings.coreMainOrder;
          }else{
            this.$queryFun.successAlert.call(this,res.data.error)
          }
        })
      }
    },


    mounted() {

    },
    created(){
      this.ParseID = this.$store.state.parseDetailiD.id;
      this.isOkName1 = this.$store.state.parseDetailiD.name;
        this.parseList();
    }
  }
</script>
<style scoped lang="scss">

  .addAlert_box{
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index:2008;
    border-radius:8px;
    font-size: 16px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
  }
  .el-message-box__title{
    width: 100%;
    height:60px;
    position: relative;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 4px 0px rgba(185,185,185,0.5);
    .el-message-box__close{
      color: #D0021B;
      position: absolute;
      font-size:16px;
      font-family:PingFangSC-Regular;
      line-height:40px;
      right: 10px;
      top:10px;
      img{
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-left: 7px;
        transform: translateY(2px);
      }
    }
    span{
      width: 100%;
      display: inline-block;
      height:14px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      color:rgba(94,109,130,1);
      line-height:60px;
      text-align: center;
    }
  }
  .centent1{
    width: 100%;
    li{
      width: 100%;
      overflow: hidden;
      margin-top: 19px;
      >p{
        overflow: hidden;
        width: 100%;
        height: 36px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        color:rgba(57,57,57,1);
        line-height:36px;
        padding: 0 21px;
        background:rgba(224,230,237,1);
        margin-bottom:10px ;
        img{
          display: inline-block;
          width: 13px;
          margin-right: 7px;
        }
      }
      >#parseInfoOne{
        width: 100%;
        border-collapse: collapse;
        border:1px #C0CCDA solid;
        >thead {
          width: 100%;
          > tr {
            height: 58px;
            color: #5E6D82;
            background: #F0F0F0;
            td{
              font-size:13px;
              text-align: center;
            }
          }
        }
      }
      >#parseInfo{
        width: 100%;
        border-collapse: collapse;
        border:1px #C0CCDA solid;
        >thead{
          width: 100%;
          >tr{
            height: 44px;
            background: #F0F0F0;
            color: #5E6D82;
            td{
              font-size:13px;
              text-align: center;
              border-right: 1px #C0CCDA solid;
            }
          }
        }
        >tbody{
          width: 100%;
          color: #333333;
          >tr{
            height: 58px;
            border: 1px #C0CCDA solid;
            td{
              font-size:13px;
              text-align: center;
              border-right: 1px #C0CCDA solid;
            }

          }
        }
      }
      >#parseInfo1{
        width: 100%;
        border-collapse: collapse;
        border:1px #C0CCDA solid;
        >thead{
          width: 100%;
          >tr{
            height: 44px;
            color: #5E6D82;
            background: #F0F0F0;
            td{
              font-size:13px;
              text-align: center;
              border-right: 1px #C0CCDA solid;
            }
          }
        }
        >tbody{
          width: 100%;
          color: #333333;
          >tr{
            height: 58px;
            border: 1px #C0CCDA solid;
            td{
              font-size:13px;
              text-align: center;
              border-right: 1px #C0CCDA solid;
            }
          }
        }
      }
      >#parseInfo2{
        width: 100%;
        >thead{
          width: 100%;
          >tr{
            height: 44px;
            background: #F0F0F0;
            color: #5E6D82;
            >td{
              border-right:1px solid rgba(224,230,237,1);
              font-size:13px;
              text-align: center;
            }
            td:last-child{
              width: 100px;
            }
          }
        }
        >tbody{
          width: 100%;
          color: #333333;
          >tr{
             height: 58px;
            td{
              font-size:13px;
              text-align: center;
              border-bottom: 1px solid #E0E6ED;
              /*border-right: 1px #C0CCDA solid;*/
            }
          }
        }

      }
    }

  }
  .cursor{
    color: #23A1FE;
    cursor: pointer;
  }

</style>



