<template>

    <div class="addAlert_box">
      <div class="el-message-box__title">
        <span>{{isOkName1}}</span>
        <p class="el-message-box__close" @click="close"> 关闭<img src="/static/images/closeIcon.png"></p>
      </div>
      <ul class="centent1">
        <li style=" overflow: hidden;">
          <p><img :src="jiantou1" @click="topBottomImg(name='配件信息')" />配件信息</p>
            <table v-show="jiantouShow1" id="parseInfo">
            <tr>
              <td class="parseInfoActive">配件状态</td>
              <td style="color: #E65831" class="parseInfoActive1">{{parseInfoOne.state|parseState}}</td>
              <td class="parseInfoActive">配件名称</td>
              <td class="parseInfoActive2">{{parseInfoOne.name}}</td>
            </tr>
            <tr>
              <td class="parseInfoActive">分类</td>
              <td class="parseInfoActive1">{{claimInfo.fLabelBusiness|FLabelBusinessShow}}</td>
              <td class="parseInfoActive">配件条码</td>
              <td class="parseInfoActive2">{{parseInfoOne.barCode}}</td>

            </tr>
            <tr>
              <td class="parseInfoActive">产品全称</td>
              <td class="parseInfoActive1">{{parseInfo.serviceName}}</td>
              <td class="parseInfoActive">配件描述</td>
              <td class="parseInfoActive2">{{parseInfoOne.remark}}</td>
            </tr>
            <tr>
              <td class="parseInfoActive">品牌</td>
              <td class="parseInfoActive1">{{parseInfo.brand}}</td>
              <td class="parseInfoActive">取件方式</td>
              <td class="parseInfoActive2">{{parseInfoOne.shippingType|ShippingType}}</td>
            </tr>
              <tr>
                <td class="parseInfoActive">型号</td>
                <td class="parseInfoActive1">{{parseInfo.model}}</td>
                <td class="parseInfoActive">是否已返还旧件</td>
                <td class="parseInfoActive2">{{parseInfoOne.returnOldMountings|ReturnOldMountings}}</td>
              </tr>
              <tr style="height: 60px">
                <td class="parseInfoActive">机器图片</td>
                <td class="parseInfoActive1">
                  <a :href="parseInfo.machinePicture"  target="_blank">机器外观</a>
                  <a :href="parseInfo.machineBarCode"  target="_blank">机器条码</a>
                  <a :href="parseInfo.machineNameplate"  target="_blank">机器铭牌</a>
                </td>
                <td class="parseInfoActive">配件图片</td>
                <td class="parseInfoActive2">
                  <a :href="parseInfoOne.machinePicture" target="_blank">配件图片</a>
                  <a v-if="parseInfoOne.partsBarCode" :href="parseInfoOne.partsBarCode" target="_blank">配件条码</a>
                </td>
              </tr>
          </table>

        </li>
        <li>
          <p><img :src="jiantou2" @click="topBottomImg(name='申领信息')"  />申领信息</p>
          <table v-show="jiantouShow2" id="parseInfo1">
            <thead>
            <tr>
              <td>工单号</td><td>联系人</td><td>联系人手机号</td><td>服务城市</td><td>服务地址</td><td>工单渠道</td><td style="width: 60px">渠道<br>质保</td><td>申领时间</td><td>工程师姓名</td><td>工程师手机号</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td> <span @click="orderClick(parseInfoOne)" id="orderLine">{{parseInfoOne.mainOrderId}}</span></td>
              <td>{{claimInfo.linkmanName}}</td>
              <td>{{claimInfo.linkmanPhoneNum}}</td>
              <td>{{claimInfo.linkmanArea}}</td>
              <td>{{claimInfo.linkmanDetails}}</td>
              <td>{{officialPartnerSubsetName||"无"}}</td>
              <td style="width: 60px">{{channelWarranty|channelWarranty}}</td>
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
            <tr v-for="(item,index) in mountingsApplyLogList">
              <td>
               {{item.createTime| moment('YYYY-MM-DD HH:mm:ss')}}
              </td>
              <td>
                {{item.operatorRole|userRoleShow}}-{{item.operator}}
              </td>
              <td>
                {{item.operateType|parseStateOne}}
              </td>
              <td>
                {{item.remark?item.remark:"无"}}
              </td>
              <td>
                <span class="cursor" v-if="item.operateType == 5&&item.certificateImg" @click="lookImg(name='申领图片',item.certificateImg)">查看</span>
              </td>
            </tr>
            <tr v-if="!mountingsApplyLogList.length" style="text-align: center">
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
        channelWarranty:"", //质保
        tabPathList:this.$store.state.tabPathList, //页签列表
        officialPartnerSubsetName:"", //子渠道
        mountingsApplyLogList:[],//跟踪信息
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
      orderClick(v){ //
        let obj={name: "全部工单", path: "/order/list5"}
        this.$router.push({path: "/order/list5"});
        this.$store.dispatch("orderDetailiD",{mainOrderId:v.mainOrderId,isBool:false,title:"全部工单"})
        if(this.tabPathList.length>7){         //新开页签
          this.$store.commit("spliceTabPathList",0)
        }
        let isAddPath=true, o={};
        this.tabPathList.forEach(v=>{
          if(obj.path===v.path){
            isAddPath=false;
          }
        });
        if(isAddPath){
          o.name=obj.name;
          o.path=obj.path;
          this.$store.commit("pushTabPathList",o)
        }
      },
      lookImg(v,data,data1,data2){ //查看图片
       if(v=== '申领图片'){
          this.isPotos.potosimg = data.split(",");
          if(this.isPotos.potosimg.length == 1){
            this.isPotos.testName = ["凭证一"];
          }else if(this.isPotos.potosimg.length == 2){
            this.isPotos.testName = ["凭证一","凭证二"];
          }else if(this.isPotos.potosimg.length == 3){
            this.isPotos.testName = ["凭证一","凭证二","凭证三"];
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
        this.$store.dispatch("orderDetailiD",{id:"",isBool:true,title:""})
      },
      parseList(){
        let url = this.$common.apidomain + "/mountingsApply/findMountingsApplyDetails?id="+this.ParseID;
        this.$http.get(url).then(res=>{
          if(res.data.code === "0000"){
              this.parseInfo = res.data.result.serviceMountings;
            this.parseInfoOne = res.data.result;
            this.channelWarranty = this.parseInfoOne.serviceMountings.coreMainOrder.channelWarranty;
            console.log(this.parseInfo)
            if(this.parseInfo.coreMainOrder.officialPartnerSubsetName&&this.parseInfo.coreMainOrder.officialPartnerName){
              this.officialPartnerSubsetName=this.parseInfo.coreMainOrder.officialPartnerName+'-'+this.parseInfo.coreMainOrder.officialPartnerSubsetName;
            }else if(!this.parseInfo.coreMainOrder.officialPartnerSubsetName&&this. parseInfo.coreMainOrder.officialPartnerName){
              this.officialPartnerSubsetName=this.parseInfo.coreMainOrder.officialPartnerName;
            }else{
              this.officialPartnerSubsetName='';
            }
            if(res.data.result.mountingsApplyLogList){
              this.mountingsApplyLogList = res.data.result.mountingsApplyLogList;
            }else{
              this.mountingsApplyLogList = [];
            }
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
      >#parseInfo{
        width: 100%;
        border-collapse: collapse;
        border:1px #C0CCDA solid;
          >tr{
            width: 100%;
            height: 30px;
            font-size:13px;
            .parseInfoActive{
              width: 10%;
              background:rgba(240,240,240,1);
              text-align: center;
              border:1px #C0CCDA solid;
              border-top: 0;
            }
            .parseInfoActive1{
              width: 30%;
              text-indent: 20px;
              border:1px #C0CCDA solid;
              border-top: 0;
              a{
                text-indent: 0;
                display: inline-block;
                width:66px;
                height:30px;
                background:rgba(35,161,254,1);
                border-radius:4px;
                cursor: pointer;
                font-size:13px;
                line-height: 30px;
                text-align: center;
                font-family:PingFangSC-Regular;
                color:rgba(255,255,255,1)
              }
            }
            .parseInfoActive2{
              width: 30%;
              text-indent: 20px;
              border:1px #C0CCDA solid;
              border-top: 0;
              a{
                text-indent: 0;
                display: inline-block;
                width:66px;
                height:30px;
                background:rgba(35,161,254,1);
                border-radius:4px;
                cursor: pointer;
                font-size:13px;
                line-height: 30px;
                text-align: center;
                font-family:PingFangSC-Regular;
                color:rgba(255,255,255,1)
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
            td:nth-child(4){
              width: 500px;
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
            td:nth-child(4){
              width: 500px;
              white-space:normal;
              word-break:break-all;
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
#orderLine:hover{
  color: #23A1FE;
  cursor: pointer;
  text-decoration:underline;
}
</style>



