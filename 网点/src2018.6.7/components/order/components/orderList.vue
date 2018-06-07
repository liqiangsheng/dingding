<template>
  <div id="box" @click="isOpenAlert=-1">
    <section class="search_container fixed_search"  v-if="id==='5'" ref="search" >
      <input type="search" autoComplete="on" name="search" placeholder="搜索工单号" @keyup.enter="search(searchValue)" v-model="searchValue" class="search_input">
      <i @click="searchValue=''" class="iconfont cancel" v-if="!!searchValue">&#xe6f2;</i>
      <span @click="search(searchValue)">搜索</span>

    </section>
    <section class="data_item" v-for="(item,index) in orders" :key="index">

      <!--<i class="i order_name" :style="icon(item,index)"></i>-->

      <order-title :orderNumber="item.id" :orderState="item.state" >
        <span class="clamant" v-if="item.emergencyDegree==='1'">加急</span>
      </order-title>

      <div @click="orderDetailTo(item.id)"  class="order_info" >

        <order-info-list :urgent="item.emergencyDegree" v-for="(itemChild,index2) in item.items" :key="index2" v-if="itemChild.isShow" :item="itemChild"> </order-info-list>

      </div>
      <section class="operate_content" :class="{'operate_content_id':operateContentId(item.state,index)||!item.masterPhoneNum}" :style="isFirstUser(item)?userStyle:''">

        <div class="operate_content_item master"  :class="{'master_tel':linkMaster}">
          <a v-if="linkMaster&&!!item.masterPhoneNum" :href="'tel:'+item.masterPhoneNum" >联系师傅</a>
          <div @click="to(item,1)" v-if="item.state==='04'||item.state==='03'&&id=='2'" class="expedite_order">派单</div>
        </div>

        <div class="operate_content_item user" style="border-left:none" :style="isFirstUser(item)?userStyle:''" :class="{'master_tel master':!item.masterPhoneNum&&id!=='2'}" >
          <a :href="'tel:'+item.linkmanPhoneNum"> 联系用户</a>
        </div>


        <div class="operate_content_item unusual" @click.stop="isOpen(item,index)" v-if="unusualState(item.state)" >
          <span class="iconfont more">&#xe9b3;</span>
          更多操作
          <section class="unusual_cover" v-if="isOpenAlert===index">
              <div @click.stop="to(item,0)" v-if="changeGroup(item)">
                   改派
              </div>
               <div class="unusula" @click.stop="unusualTo(item)">
                  异常报备
              </div>
          </section>
        </div>
        <div @click="to(item,0)"  class="operate_content_item order_expo" v-if="changeGroup(item)&&!unusualState(item.state)"> 改派 </div>
      </section>
    </section>

    <section v-if="!orders.length" class="order_placeholder">
      <img  src="../../../assets/images/wait.png" alt="">
      <p>暂无工单</p>
    </section>

<!--回滚到顶部-->
    <scroll-top></scroll-top>
    <!--<div class="cover" @click="closeCover" v-if="isOpenAlert!==-1">-->

    <!--</div>-->
  </div>
</template>

<script>
import orderTitle from "./orderTitle"
import scrollTop from "@/components/publicComponents/scrollTop"
import orderInfoList from "./orderInfoList"
import storage from "@/assets/js/storage"
const isShow = (id,corresponding) => id === corresponding ? true:false;
const isMaster = id => id === "2"? false:true;
const filterUrl = id => id==="1"?`/site/order/monitor`:`/site/order/list`;
const orderType= id => {
  let state='';
  switch(id)
  {
    case "1": state="04,05,06,07,08,10,11".split(",");break;
    case "2": state="04,03".split(",");break;
    case "3": state="01,05,06,07,10,11,13".split(",");break;
    case "4": state="08,09".split(",");break;
    case "5": state="09,02,13,12,14,15,17,16,18".split(",");break;
  }
  return state;
};
const pushOrderItems = function() {
  for(let i = 0; i < this.orders.length; i++ ){
    let obj =  this.orders[i],
        items = JSON.parse(JSON.stringify(this.items));
    for(let k in obj){
      for(let y = 0; y < items.length; y++){
        if(items[y].key === k){
          items[y].value = !!items[y].filterName ? Vue.filter(items[y].filterName)(obj[k]) : obj[k];
        }else if(items[y].key==="orderType"){
          items[y].url=this.icon(this.orders[i])
        }
      }
    }
    this.orders[i].items = items;
  }
};

import Vue from 'vue'
import {Indicator} from 'mint-ui'

export default {
    props:["id"],
    components:{
      orderTitle,
      orderInfoList,
      scrollTop
    },
    data () {
      return {
        searchValue:"",
        isOpenAlert:-1,
        orders:[],
        loading:false,
        value:"",
        isTop:false,
        userStyle:{
          width:"100%",
          border:"none",
          borderBottomRightRadius: "3px"
        },
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
            urgent:"emergencyDegree",
//            filterName:"moment",
            key:"appointmentDatetime"
          },
          {
            name:"工单类型",
            key:"orderType",
            isShow:true,
            url:"",
          },
           {
            name:"监控原因",
            key:"monitorReason",
            isShow:isShow(this.id,"1"),
            value:"",
            color:"color:#E65831"
          },
          {
            name:"遗留原因",
            key:"abnormalHangUpRemark",
            isShow:isShow(this.id,"4"),
            value:"",
            color:"color:#E65831"
          },

          ],
        showPages:1,
        currentPageSize:10,
        total:0,
        pageTotal:0,
        docScoTop:0,
      }

    },
    methods:{
      orderDetailTo(id){
        if(this.isOpenAlert!==-1)return this.isOpenAler=-1;
        this.$router.push({path:`/orderDetail/${id}`})
      },
      unusualTo(e){
        this.$router.push({path:`/unusualReport/${e.id}`})
      },
      closeCover(){
        this.isOpenAlert=-1;
      },
      unusualState(state){
        return (state==="05"||state==="06"||state==="07"||state==="08"||state==="10"||state==="11")?true:false;
      },
      isOpen(e,i){
        if( this.isOpenAlert===i){
              this.isOpenAlert=-1;
        }else{
            this.isOpenAlert=i;
        }
      },
      to(e,state){
        let text = !!state?"派单":"改派"
        this.$store.commit("changExportOrder",text);
        this.$router.push({path:this.appointmentDatetime(e)})
      },
      isFirstUser(e){
        if(!e.masterPhoneNum&&this.id!=='2'&&e.state!=='04')return true;
        return false;
      },
      operateContentId(state,i){
        console.log(state);
        if(state==="11"){
          return false;
        }
        if( this.id === "2" && state === "04" ){
            return true;
        }else if( !(state === "04"||state==="05"||state==="06"||state==="07"||state==="08") && this.id !== '2' ){
            return true;
        }else if( (state === "04"||state==="05"||state==="06"||state==="07"||state==="08") && this.id !=='2'){
            return false;
        }else{
            return false;
        }
      },
      appointmentDatetime(item){
        return `/changeMaster/${item.id}/${Date.parse(item.appointmentDatetime)}/${item.masterId||null}`
      },
// NormalOrder("正常工单", "0"),
//ReworkOrder("返修工单", "1"),
//  OnePriceOrder("一口价工单", "2"),
//  DetermineOrder("定价工单", "3"),
//  AppointmentOrder("预约工单", "4"),
//  BusinessOrder("企业工单", "5");

      icon(e,i){
        let style=null;
        switch(e.type)
        {
          case "0": style = this.orderFlag.order;break;
          case "1": style = this.orderFlag.returnIcon;break;
          case "2": style = this.orderFlag.once;break;
          case "3": style = this.orderFlag.order;break;
          case "4": style = this.orderFlag.subscribe;break;
          case "5": style = this.orderFlag.enterprise;break;
        }
        return style;
      },
      search(v){
        let url =`${this.$common.apidomain}${filterUrl(this.id)}`;
        Indicator.open('加载中...');
        this.orders=[];
        this.showPages=1;
        this.getTableList(url,this.params())
      },

// 列表参数
      params(){
        /*
        * 1 监控
        * 2 待分配
        * 3 进行中
        * 4 遗留
        * 5 完成
        * */
        return {
          "page":JSON.stringify(this.showPages),
          "rows":JSON.stringify(this.currentPageSize),
          "siteId":storage.getLocalStorage("userInfo").id,
          "states":orderType(this.id),
          "id":this.searchValue
        }
      },
// get 列表数据
      getTableList(url,params){
        this.$http.post(url,params).then( r => this.$httpFilter(r).then(data => {
            Indicator.close();
            this.pageTotal = data.result.pages;
            const result = JSON.parse(JSON.stringify(data.result));
            this.loading = true;
            this.orders = this.orders.concat(result.list);
            pushOrderItems.call(this)
          })
        )
      },
      changeGroup(e){
        return (e.state==="04"||e.state==="05"||e.state==="06"||e.state==="07"||e.state==="08")&&this.id!=="2"?true:false;
      }
    },
    created() {
      Indicator.open('加载中...');
      let url =`${this.$common.apidomain}${filterUrl(this.id)}`;
      this.getTableList(url,this.params());
    },
    computed:{
      linkMaster(){
        return this.id !== "2" ? true:false;
      },

    },

     mounted(){
       document.addEventListener("click",()=>{
          if(this.isOpenAlert!==-1)this.isOpenAlert=-1;
       })
          if(this.id==="5")document.addEventListener("scroll",e => { let top = document.documentElement.scrollTop || document.body.scrollTop; this.docScoTop=top});

  //      上拉加载更多；
          setTimeout(()=>{
              this.$commonJs.upwardLoading.call(this,()=>{
                this.getTableList(this.$common.apidomain+filterUrl(this.id),this.params())
              });
          },1000);
     },
  }
</script>
<style scoped lang="less">
  @import "../../../assets/style/base.less";

#box{
  background:#F1F1F1;
  .order_info{
    padding:.3rem 0;
  }

.operate_content{
      width:100%;
      border-top:1px solid #ccc;
      height:.9rem;
      /*overflow: hidden;*/
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
    .operate_content_item.unusual{

      >.more{
        font-size:.29rem;
        font-weight: bold;
      }
      >.unusual_cover{
        position:absolute;
        left:0;
        background: #fcfcfc;
        width:2.4rem;
        box-shadow:10px 10px 15px #b7b7b7;
        border-radius:0.08rem;
        top:-50%;
        transform:translate(-10%,-100%);
        z-index: 999999;
        &::before{
          width:0.49rem;
          height:0.49rem;
          position:absolute;
          bottom:-10%;
          content:"";
          left:50%;
          transform:translate(-50%,0) rotate(45deg);
          /*z-index: 999999;*/
          background:#fff;
          /*transform:;*/
        }
        >div{
          line-height: .89rem;
          border-bottom:1px solid #ccc;
          /*text-indent: 2em;*/
          position:relative;
          padding-left:.4rem;
          text-align: left;
          &::after{
            width:.34rem;
            content:"";
            position:absolute;
            top:50%;
            left:10%;
            display: inline-block;
            .img('../images/exp.png');
            transform:translate(0,-50%);
            height:.30rem;
          }
        }
         >.unusula{ 
             &::after{
                 .img('../images/icon1.png');
             }
        }
        >div:last-of-type{
          border:none;
        }
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
       .img('../images/tel2.png');
      }

    .master::after{
      width:.34rem;
      .img('../images/order_expo.png');
      transform:translate(-230%,-50%);
      height:.30rem;
    }
    .master_tel::after{
      width:.28rem;
      height:.28rem;
     .img('../images/Tel.png');
      transform:translate(-300%,-50%);
    }
      // #536BD2
      .operate_content_item:last-of-type{
        border-left:1px solid #ccc;
      }

      .order_expo::after{
        .img('../images/exp.png');
        width:0.30rem;
        height:0.31rem;

        background-size:100% 100%;
        transform:translate(-200%,-50%);

      }
  .master{
    border-bottom-left-radius: .2em;
    background:#536BD2;
    a{
      color:rgba(255,255,255,1);
    }
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
    width:100vw;
    padding:.26rem 0;
    background:#fff;
    /*padding-left:0;*/
    transform:translateX(-0.15rem);
    text-align: center;
    position:relative;
    >.search_input{
      border:none;
      background:rgba(241,241,241,1);
      border-radius: 0.45rem ;
      height:.8rem;
      width:75%;
      padding-right:.5rem;
      font-size:.24rem;
      transform:translateX(5.8%);
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
      /*padding-left:.2rem;*/
      padding-left:.1rem;
      transform:translateX(48%);
    }
    &::before{
      content:"";
      width:.8rem;
      background:rgba(241,241,241,1);
      display: block;
      position:absolute;
      border-radius: 0.45rem;
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
      left:.08rem;
      height:.8rem;
    }
    &::after{
      content:"";
      width:.33rem;
      .img('../images/sech.png');
      height:.33rem;
      display: block;
      position:absolute;
      top:50%;
      transform:translateY(-50%);
      left:5%;
    }
    .cancel{
      transform:translate(-70%,-49%);
      top:50%;
      position:absolute;
      color: #a0a0a0;
      font-size: .43rem;
      z-index: 9999;
    }
  }
  /*.fixed_search{*/
    /*position:fixed;*/
    /*top: 1.98rem;*/
    /*width:96%;*/
    /*z-index: 11;*/
    /*transition:background 3s;*/
  /*}*/
  .backgroundRgba{

    background:rgba(0,0,0,.3);
  }

.order_placeholder{
  padding-top:2rem;
  >img{
    display: block;
    margin:0 auto;
    width:1.3rem;
  }
  >p{
    text-align: center;
    font-size:0.32rem;
    font-family:PingFangSC-Regular;
    color:rgba(136,136,136,1);
    line-height: 6em;
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
   /*margin-left:.2rem;*/
   /*margin-right:2rem;*/
   .order_name{
     width:.94rem;
     height:.42rem;
     position:absolute;
     top:1rem;
     right:0;
     transform:translate(260%,0);
   }
 }
  /*.data_margin_top{*/
    /*padding-top: 1.32rem !important;*/
  /*}*/

@font-face {
  font-family: 'iconfont';  /* project id 681163 */
  src: url('//at.alicdn.com/t/font_681163_q922va5n8h2p4x6r.eot');
  src: url('//at.alicdn.com/t/font_681163_q922va5n8h2p4x6r.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_681163_q922va5n8h2p4x6r.woff') format('woff'),
  url('//at.alicdn.com/t/font_681163_q922va5n8h2p4x6r.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_681163_q922va5n8h2p4x6r.svg#iconfont') format('svg');

  }
  .cover {
     background: rgba(0, 0, 0, .4);
     position: absolute;
     top: 0;
     left: 0;
     width: 100vw;
     height: 100vh;
   }

</style>

