<template>
  <div id="box">
        <section class="search_container" v-if="id==='5'">
          <input type="search" name="search" placeholder="搜索工单号" @keyup.enter="search(searchValue)" v-model="searchValue" class="search_input">
           <span  @click="search(searchValue)">搜索</span>
        </section>

       <section class="data_item" v-for="(item,index) in orders" :key="index" >
         <i class="i order_name" :style="icon(item,index)"></i>
          <order-title :index="index" :orderNumber="item.id" :state="index" :orderState="item.state" :isClamant="false">
             <span class="clamant" v-if="item.emergencyDegree==='1'">加急</span>
          </order-title>
          <div class="order_info">
            <order-info-list v-for="(itemChild,index2) in item.items" :key="index2" v-if="itemChild.isShow" :item="itemChild" >
            </order-info-list>
          </div>
          <section class="operate_content" :class="{'operate_content_id':id==='2'}">
            <div class="operate_content_item master " :class="{'master_tel':id!=='2'}">
                    <a v-if="id!=='2'" :href="'tel:'+item.masterPhoneNum">联系师傅</a>
                    <router-link :to="'/changeMaster/'+item.id+','+item.appointmentDatetime" tag="div" v-if="id==='2'" class="expedite_order">派单</router-link>
            </div>

            <div class="operate_content_item user">
                      <a :href="'tel:'+item.linkmanPhoneNum"> 联系用户</a>
            </div>

            <router-link tag="div" :to="'/changeMaster/'+item.id+','+item.appointmentDatetime" class="operate_content_item order_expo" v-if="id!=='2'">
                     改派
            </router-link>
          </section>
       </section>
  </div>
</template>

<script>
import orderTitle from "./orderTitle"
import orderInfoList from "./orderInfoList"
import storage from "@/assets/js/storage"
const isShow= id=>  id==="1"?true:false;
const leaveOver = id => id==="4"?true:false;
const isMaster=id=> id === "2"? false:true;
const filterUrl = id => {
  let url="";
  if(id==="1"){
//         监控
    url=`/site/order/monitor`

  }else if(id==="2"){
    url="/site/order/list"

    //待分配
  }else if(id==="3"){
    url="/site/order/list"

    //进行中
  }else if(id==="4"){
    url="/site/order/list"
    //遗留
  }else if(id==="5"){
    url="/site/order/list"
//        完成
  }
  return url;
};
const pushOrderItems = function() {
  for(let i=0;i<this.orders.length;i++){
    let obj =  this.orders[i],
      items=JSON.parse(JSON.stringify(this.items));
    for(let k in obj){
      for(let y = 0; y < items.length; y++){
        if(items[y].key===k){
          items[y].value=!!items[y].filterName?Vue.filter(items[y].filterName)(obj[k]):obj[k];
        }
      }
    }
    this.orders[i].items=items;
  }
};

import Vue from 'vue'
import {Indicator} from 'mint-ui'


  export default {
    props:["id"],
    components:{
      orderTitle,
      orderInfoList
    },
    data () {
      return {
        searchValue:"",
        orders:[],
        loading:false,
        value:"kk",
        orderFlag:{
//          一口价
          once:{
            background:'url("/static/images/once.png")',
            backgroundSize:"100% 100%",
          },
//          定价
          order:{
            background:'url("/static/images/order.png")',
            backgroundSize:"100% 100%",
          },
          //          返修
          returnIcon:{
            background:'url("/static/images/return.png")',
            backgroundSize:"100% 100%",
          },
          //          预约
          subscribe:{
            background:'url("/static/images/subscribe.png")',
            backgroundSize:"100% 100%",
          },
          //          企业
          enterprise:{
            background:'url("/static/images/enterprise.png")',
            backgroundSize:"100% 100%",
          }
        },
        items:[
          {
            name:"师傅姓名",
            value:"",
            key:"masterName",
            isShow:isMaster(this.id)
          },
          {
            name:"分类",
            value:"",
            isShow:true,
//            FLabelBusiness
//            filterName:"FLabelBusiness",
            key:"catalogName"
          },
           {
            name:"联系人",
            key:"linkmanName",
             isShow:true,
            value:""
          },
          {
            name:"服务地址",
            value:"",
            isShow:true,
            key:"linkmanAddress"
          },
            {
            name:"预约时间",
            value:"",
             isShow:true,
            filterName:"moment",
            key:"appointmentDatetime"
          },
           {
            name:"监控原因",
             key:"monitorReason",
             isShow:isShow(this.id),
//             filterName:"startWorkDeviationShow",
              value:"",
              color:"color:#E65831"
          },
          {
            name:"遗留原因",
            key:"abnormalHangUpRemark",
            isShow:leaveOver(this.id),
//            filterName:"startWorkDeviationShow",
            value:"",
            color:"color:#E65831"
          }
          ],
        showPages:1,
        currentPageSize:10,
        total:0,
        pageTotal:0,
      }
    },
    methods:{
// NormalOrder("正常工单", "0"),
//ReworkOrder("返修工单", "1"),
//  OnePriceOrder("一口价工单", "2"),
//  DetermineOrder("定价工单", "3"),
//  AppointmentOrder("预约工单", "4"),
//  BusinessOrder("企业工单", "5");
      icon(e,i){
        let style=null;
        if(e.type==="0"){
          style = this.orderFlag.order
        }else if(e.type==="1"){
          style = this.orderFlag.returnIcon
        }else if(e.type==="2"){
          style=this.orderFlag.once
        }else if(e.type==="3"){
          style=this.orderFlag.order
        }else if(e.type==="4"){
          style=this.orderFlag.subscribe
        }else if(e.type==="5"){
          style=this.orderFlag.enterprise
        }
        return style;
      },
      search(v){
//        if(!v){
////        return  this.$Toast("请输入搜索项")
//        }
        Indicator.open('加载中...');
        let url=`${this.$common.apidomain}${filterUrl(this.id)}`
        this.getTableList(url,this.params())

      },

//      列表参数
      params(){
        let state="";
        if(this.id==="1"){
//         监控
          state="04,05,06,07,08,10,11".split(",")
        }else if(this.id==="2"){
          state="04".split(",")
          //待分配
        }else if(this.id==="3"){
          state="05,06,07,10,11,13".split(",")
          //进行中
        }else if(this.id==="4"){
          state="08,09".split(",")
          //遗留
        }else if(this.id==="5"){
          state="09,12,14,15,17,18".split(",")
//        完成
        }
//        state="04".split(",")
        return {
          "page":JSON.stringify(this.showPages),
          "rows":JSON.stringify(this.currentPageSize),
          "siteId":storage.getLocalStorage("userInfo").id,
          "states":state,
          "id":this.searchValue
        }
      },
//      get 列表数据

      getTableList(url,params){
//        return;
        this.$http.post(url,params).then(r=> this.$httpFilter(r).then(data=>{
          console.log(data);
          Indicator.close();
          this.pageTotal=data.result.pages;
          const result=JSON.parse(JSON.stringify(data.result));
          this.loading=true;
          this.orders=this.orders.concat(result.list);
          pushOrderItems.call(this)
          })
        )
      }
    },
    created() {
      Indicator.open('加载中...');
      let url=`${this.$common.apidomain}${filterUrl(this.id)}`;
      this.getTableList(url,this.params())
    },
   mounted(){
//      上拉加载更多；
        setTimeout(()=>{
            this.$commonJs.upwardLoading.call(this,()=>{
              this.getTableList(this.$common.apidomain+filterUrl(),this.params())
            });
        },1000);
   },
  }
</script>
<style scoped lang="less">
#box{
  background:#F1F1F1;
  .order_info{
    padding:.3rem 0;
  }

.operate_content{
      width:100%;
      border-top:1px solid #ccc;
      height:.9rem;
      overflow: hidden;
      .operate_content_item{
        float:left;
        text-align: center;
        position:relative;
        width:33.33%;
        line-height:.9rem;
        font-size:0.32rem;
        color:rgba(83,107,210,1);
        text-indent: 1em;
        font-family:PingFangSC-Regular;
        >a{
           font-size:0.32rem;
           color:rgba(83,107,210,1);
        }

      }
    .master::after, .order_expo::after, .user::after{
        content:"";
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-320%,-50%);
        width:.28rem;
        height:.28rem;
        background:url(../../../assets/images/tel2.png) center center no-repeat;
        background-size:100% 100%;
      }

    .master::after{
      background:url(../../../assets/images/order_expo.png) center center no-repeat;
      width:.34rem;
      background-size:100% 100%;
      transform:translate(-230%,-50%);
      height:.30rem;
    }
    .master_tel::after{
      width:.28rem;
      height:.28rem;
      background:url(../../../assets/images/Tel.png) center center no-repeat;
      background-size:100% 100%;

      transform:translate(-300%,-50%);
    }

      // #536BD2
      .operate_content_item:last-of-type{
        border-left:1px solid #ccc;
      }

      .order_expo::after{
        background:url(../../../assets/images/exp.png) center center no-repeat;

        width:0.30rem;
        height:0.31rem;

        background-size:100% 100%;
        transform:translate(-200%,-50%);

      }
        .operate_content_item:first-of-type{
          background:#536BD2;
          >a{
             color:rgba(255,255,255,1);
          }

      }
    }
  .operate_content_id{
    .operate_content_item{
      width:50%;
      >.expedite_order{
        color:rgba(255,255,255,1);
      }
    }
  }
  .search_container{
    width:100%;
    padding:.26rem .2rem;
    background:#fff;
    text-align: center;
    position:relative;
    >.search_input{
      border:none;
      background:rgba(241,241,241,1);
      border-radius: 0.45rem ;
      height:.8rem;
      width:63%;
      transform:translateX(9%);
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      outline: none;
    }
    span{
      font-size:0.32rem;
      font-family:PingFangSC-Regular;
      color:rgba(83,107,210,1);
      display: inline-block;
      height:.6rem;
      padding-left:.2rem;
      padding-right:.1rem;
      transform:translateX(60%);
    }
    &::before{
      content:"";
      width:1.3rem;
      background:rgba(241,241,241,1);
      display: block;
      position:absolute;
      border-radius: 0.45rem;
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
      left:.3rem;
      height:.8rem;
    }
    &::after{
      content:"";
      width:.4rem;
      background:url(../../../assets/images/sech.png) center center no-repeat;
      background-size:100% 100%;
      height:.4rem;
      display: block;
      position:absolute;
      top:50%;
      transform:translateY(-50%);
      left:8%;
    }
  }
}
 .data_item{
   width:100%;
   min-height: 4rem;
   background:#FFFFFF;
   margin-top:.16rem;
   position: relative;
   border-radius: 4px;
   .order_name{
     width:.94rem;
     height:.42rem;
     position:absolute;
     top:1rem;
     right:0;
     transform:translate(260%,0);
   }
 }
</style>

