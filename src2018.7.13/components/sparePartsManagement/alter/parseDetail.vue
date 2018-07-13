<template>

    <div class="addAlert_box">
      <div class="el-message-box__title">
        <span>{{isOkName}}</span>
        <p class="el-message-box__close" @click="close"> 关闭<img src="/static/images/closeIcon.png"></p>
      </div>
      <ul class="centent1">
        <li style=" overflow: hidden;">
          <p><img :src="jiantou1" @click="topBottomImg(name='配件信息')" />配件信息</p>
          <table id="parseInfoOne" v-show="jiantouShow1">
              <thead>
                <tr>
                    <td>产品全称</td>
                    <td>空调-常见故障</td>
                    <td>品牌</td>
                    <td>美博</td>
                    <td>型号</td>
                    <td>KF-LKIEWEDWA</td>
                    <td>产品图片</td>
                    <td class="cursor" @click="lookImg(name='产品图片')">查看</td>
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
                 <td>待审核</td>
                 <td>压缩机</td>
                 <td>ss-2411321</td>
                 <td>我难道我的啊速度快的首付款的时刻给开发贷款给开发的顾客的</td>
                 <td>快递</td>
                 <td>是</td>
                 <td class="cursor" @click="lookImg(name='配件图片')">查看</td>
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
              <td>20173283744444444023</td>
              <td>2018-07-03 16:28:50</td>
              <td>陈小春</td>
              <td>18825188516</td>
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
            <tr>
              <td>
                2018-07-18 17:54
              </td>
              <td>
                师傅-陈小春
              </td>
              <td>
                确认取件
              </td>
              <td>
                取件方式：快递；物流单号：129893483493898备注信息：XXXXXX
              </td>
              <td>
                <span class="cursor" @click="lookImg(name='申领图片')">查看</span>
              </td>
            </tr>
            <!--<tr v-if="!payRecordList.tableListData.length" style="text-align: center">-->
            <!--<td  colspan="6">无</td>-->
            <!--</tr>-->
            </tbody>
          </table>
        </li>

       </ul>
      <PotosPotos v-if="isPotos.isShow" :isPotos="isPotos"></PotosPotos>
    </div>


</template>
<script>
  import PotosPotos from '../../order/orderAllCommonts/alertPotos.vue'
  export default {
    props:["isOkName"],
    components:{
      PotosPotos,
    },
    data() {
      return {
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
    methods: {
      lookImg(v){ //查看图片
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
      },
    },


    mounted() {
    },
    created(){


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
            background: #F0F0F0;
            td{
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
            height: 30px;
            background: #F0F0F0;
            td{
              text-align: center;
              border-right: 1px #C0CCDA solid;
            }
          }
        }
        >tbody{
          width: 100%;
          >tr{
            height: 58px;
            border: 1px #C0CCDA solid;
            td{
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
            height: 30px;
            background: #F0F0F0;
            td{
              text-align: center;
              border-right: 1px #C0CCDA solid;
            }
          }
        }
        >tbody{
          width: 100%;
          >tr{
            height: 58px;
            border: 1px #C0CCDA solid;
            td{
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
            background: #F0F0F0;
            >td{
              text-align: center;
            }
            td:last-child{
              width: 100px;
            }
          }
        }
        >tbody{
          width: 100%;
          >tr{
             height: 58px;
            td{
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



