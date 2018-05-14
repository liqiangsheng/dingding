<template>
  <div id="app">
    <div class="container" >
      <h3 >{{isDetailed.title}} <p style="right:30px;top:-10px" class="closeX" @click="close"></p> </h3>
      <div class="content">
        <div class="content_list">
         <ul class="userInfo">
           <li>
             <span>师傅编号 ：</span>
             <span>{{orderInfo.masterId}}</span>
           </li>
           <li>
             <span>师傅姓名 ：</span>
             <span>{{orderInfo.masterName}}</span>
           </li>
           <li>
             <span>手机号 ：</span>
             <span>{{orderInfo.masterPhoneNum}}</span>
           </li>
           <li>
             <span style="float:left">评价 ：</span>
             <el-rate
             v-model="coreMainOrderEvaluate.level"
             disabled
             show-text
             style="float:left"
             text-color="#ff9900"
             text-template="{value}">
             </el-rate>
           </li>
         </ul>
          <ul>
           <li>
             <span>联系人 ：</span>
             <span>{{orderInfo.linkmanName}}</span>
           </li>
            <li>
              <span>下单手机号 ：</span>
              <span>{{orderInfo.userPhoneNum}}</span>
            </li>
            <li>
              <span>服务地址 ：</span>
              <span>{{orderInfo.linkmanDetails}}</span>
            </li>
         </ul>
        </div>
        <div class="content_list">
          <ul class="time_list">
            <li>
              <span>工单号 ：</span>
              <span> &nbsp;{{orderInfo.id}}</span>
            </li>
            <li>
              <span>下单时间 ：</span>
              <span>&nbsp; {{orderInfo.createTime|moment('YYYY-MM-DD HH:mm:ss')}}</span>
            </li>
            <li>
             <span>预约时间 ：</span>
              <span>&nbsp;{{orderInfo.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}</span>
            </li>
            <li>
              <span>上门时间 ：</span>
              <span>&nbsp;{{orderInfo.serviceBeginTime|moment('YYYY-MM-DD HH:mm:ss')}}</span>
            </li>
            <li class="table_box">
              <div class="dable_lsit">
                <table cellSpacing="0px" cellpadding="0">
                  <thead  >
                  <tr class="theads">
                    <th v-for="(item,index) in theadsName" :key="index">{{item}}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item,index) in serviceInfos">
                    <td>
                      {{item.serviceFullName}}
                    </td>
                    <td>
                      {{item.price2}}({{item.serviceName}})
                    </td>
                    <td>
                        <tr v-for="(item,index) in item.mountings">{{item.serviceMountingsName}}</tr>
                    </td>
                  <td>
                    <tr v-for="(item,index) in item.mountings">{{item.serviceMountingsPrice}}</tr>
                  </td>
                  <td>
                    {{(item.price2Original-item.price2).toFixed(2)}}
                  </td>
                  <td>
                    {{item.serviceSize}}
                  </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <li class="priceList">
              <span>配件总价 ：</span>
              <span>￥{{orderInfo.price3}}</span>
            </li>  <li class="priceList">
            <span>上门费 ：</span>
            <span>￥{{orderInfo.price1}}</span>
            </li>  <li class="priceList">
            <span>服务费 ：</span>
            <span>￥{{orderInfo.price2}}</span>
            </li>  <li class="priceList">
            <span>高空费 ：</span>
            <span>￥{{orderInfo.price4}}</span>
            </li>  <li class="priceList">
            <span>优惠金额 ：</span>
            <span>￥{{((orderInfo.originalTotal||0)-(orderInfo.total||0)-(orderInfo.cashbackAmount||0)-(orderInfo.refundAmount||0)-0).toFixed(2)}}</span>
            </li>  <li class="priceList">
            <span>订单总价 ：</span>
            <span>￥{{orderInfo.total}}</span>
            </li> 
            <li class="priceList">
            <span>实付款 ：</span>
            <span>￥{{orderInfo.actualPayment}}</span>
            </li>
          </ul>
        </div>
      </div>
      <!--<div class="btn">-->
        <!--<button @click="close">关闭</button>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  export default {
    props:['isDetailed','quiry'],
    data() {
      return {
        theadsName:[
          '产品',
          '服务费',
          '配件',
          '单价',
          '优惠',
          '数量'
        ],
        serviceInfos:[],
        orderInfo:{},
        coreMainOrderEvaluate:{},
      }
    },
    created(){
      let urlCount=this.$apidomain+"/orderquery/findOneDetails";
      this.$http.get(urlCount,this.paramsData()).then(r=>{
        let data=r.data;
        this.orderInfo = data.result.coreMainOrder;
        this.serviceInfos = data.result.coreMainOrderServices;
        if(data.result.coreMainOrderEvaluates&&data.result.coreMainOrderEvaluates.length>0){
          this.coreMainOrderEvaluate = data.result.coreMainOrderEvaluates[0];
        }
      });
    },
    methods: {
      paramsData(){
        return {params: {
          "id":this.isDetailed.orderId,
        }
        }
      },
      close(){
        this.isDetailed.isShow=false;
        this.$emit('closeReset', false)
      }
    },
    mounted() {

    },
  }
</script>
<style scoped lang="scss">
  @import "../../../../assets/styles/commButton";
  @import "../../../../assets/styles/comminStyle3";
  #app{
    #btn{
      position: relative;
      bottom:10px;
    }
    .container{
      width:60%;
      .content_list{
        display: flex;
        padding: 0 20px;
        line-height: 30px;
        >ul{
          flex:1;
          padding-left:10px;
          border:1px solid #ccc;
        }
        .userInfo{
          border-right:none;
        }
        .time_list{
          line-height: 40px;
          margin-top:20px;
          >li{
            width:400px;
            float:left;
          }
          >.table_box{
            width:100%;
          }
          >.priceList{
            float:right;
            width:100%;
            text-align: right;
            padding-right:50px;
            >span:first-of-type{
              display: inline-block;
              width:200px;
              text-align: right;
              padding-right:8px;
            }
            >span:last-of-type{
              display: inline-block;
              width:100px;
              text-align: left;
              padding-right:30px;
            }
          }

        }
      }
      .content_list:last-of-type{
        padding-bottom:200px;
      }
    }
  }
  .el-tabs--border-card{
    height:100%;
  }
  h3{
    text-align: center;
    line-height: 5em;
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
    .content{
      width:100%;
      height:100%;
      overflow-y: auto;
      .title{
        line-height:30px;
        width:100%;
        background: #ECECEC;
      }
      .right{
        float:right;
        border:1px solid #ccc;
      }
      .left{
        padding-left:20px;
      }
    }
    .content:last-of-type{
      float:right;
      .header_title{
        overflow: hidden;
        padding-bottom:20px;
        > p{
          margin-right:20%;
        }
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
.dable_lsit{
  margin:0 !important;
}

</style>


