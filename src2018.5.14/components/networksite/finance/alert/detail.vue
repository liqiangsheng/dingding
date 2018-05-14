<template>
  <div id="app">
    <div class="container">
      <h3>{{isDetailed.title}}</h3>
      <div class="content">
        <div class="list">
          <div>
            <span class="list_name">师傅编号 : </span>
            <span>{{orderInfo.masterId}}</span>
          </div>
          <div>
            <span class="list_name">师傅姓名  : </span>
            <span>{{orderInfo.masterName}}</span>
          </div>
          <div>
            <span class="list_name">手机号  : </span>
            <span>{{orderInfo.masterPhoneNum}}</span>
          </div>

          <div>
              <span class="list_name">评价 : </span>
              <span style=" display: inline-block;">
                  <el-rate
                    v-model="coreMainOrderEvaluate.level"
                    disabled
                    show-text
                    text-color="#ff9900"
                    text-template="{value}">
                 </el-rate>
            </span>
          </div>
        </div>
        <div class="list">
          <div>
            <span class="list_name">联系人  : </span>
            <span>{{orderInfo.linkmanName}}</span>
          </div>
          <div>
            <span class="list_name">联系人手机号</span> : 
            <span>{{orderInfo.linkmanPhoneNum}}</span>
          </div>
          <div>
            <span class="list_name">下单手机号</span> : 
            <span>{{orderInfo.userPhoneNum}}</span>
          </div>
          <div>
            <span class="list_name">服务地址</span> : 
            <span>{{orderInfo.linkmanDetails}}</span>
          </div>
        </div>
        <div class="list">
          <div>
            <span class="list_name">工单号</span> : 
            <span>{{orderInfo.id}}</span>
          </div>
          <div>
            <span class="list_name"> 下单时间</span> : 
            <span>{{orderInfo.createTime|moment('YYYY-MM-DD HH:mm:ss')}}</span>
          </div>
          <div>
            <span class="list_name">预约时间</span> : 
            <span>{{orderInfo.appointmentDatetime|moment('YYYY-MM-DD HH:mm:ss')}}</span>
          </div>
          <div>
            <span class="list_name">上门时间</span> : 
            <span>{{orderInfo.serviceBeginTime|moment('YYYY-MM-DD HH:mm:ss')}}</span>
          </div>
        </div>
        <div class="list">
          <div>
            <span class="list_name">配件总价</span> : 
            <span>{{orderInfo.price3}}元</span>
          </div>
          <div>
            <span class="list_name">上门费</span> : 
            <span>{{orderInfo.price1}}</span>
          </div>
          <div>
            <span class="list_name">服务费</span> : 
            <span>{{orderInfo.price2}}</span>
          </div>
          <div>
            <span class="list_name">高空费</span> : 
            <span>{{orderInfo.price4}}</span>
          </div>
          <div>
            <span class="list_name">优惠金额</span> : 
            <span>{{Math.round(((orderInfo.originalTotal||0)-(orderInfo.total||0)-(orderInfo.cashbackAmount||0)-(orderInfo.refundAmount||0))*10)/10}}</span>
          </div>
          <div>
            <span class="list_name">订单总价</span> : 
            <span>{{orderInfo.total}}</span>
          </div>
          <div>
            <span class="list_name">实付款</span> : 
            <span>{{orderInfo.actualPayment}}</span>
          </div>
        </div>
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
              {{item.price2Original-item.price2}}
            </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
     
    </div>
     <p class="closeX" @click="close"></p>
     <div class="btn">
        <button @click="close">关闭</button>
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
          '数量',
          '优惠'
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
        this.serviceInfos = data.result.coreMainOrderService;
        if(data.result.coreMainOrderService&&data.result.coreMainOrderService.length>0){
          this.coreMainOrderEvaluate = data.result.coreMainOrderService[0];
        }
      });
    },
    methods: {
      paramsData(){
        return {params: {
          "id":this.isDetailed.orderId,
        }}
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
  .closeX{
    transform:translateX(-600%);
  }
  .list_name{
    width:100px;
  }
  .list{
    >div{
      line-height:50px;
    }
    
  }
  #app{
    #btn{
      position: relative;
      bottom:30%;
    }
    .container{
      overflow-y:auto ;
      width:50%;
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
    .content{
      float:left;
      width:100%;
      .title{
        line-height:30px;
        width:100%;
        background: #ECECEC;
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
</style>


