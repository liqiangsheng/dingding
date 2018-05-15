<template>
  <div id="box">
        <section class="search_container" v-if="id==='5'">
          <input type="search" name="search" placeholder="搜索工单号" @keyup.enter="search(searchValue)" v-model="searchValue" class="search_input">
           <span  @click="search(searchValue)">搜索</span>
        </section>

       <section class="data_item" v-for="(item,index) in orders" :key="index" >
         <i class="i order_name"></i>
          <order-title :index="index" :orderNumber="item.id" :state="index" :orderState="item.abnormalHangUp" :isClamant="false"></order-title>
          <div class="order_info">
            <order-info-list v-for="(itemChild,index2) in item.items" :key="index2" v-if="itemChild.isShow" :item="itemChild" >
            </order-info-list>
          </div>
          <section class="operate_content" :class="{'operate_content_id':id==='2'}">
            <div class="operate_content_item master " :class="{'master_tel':id!=='2'}">
                    <a  v-if="id!=='2'" :href="'tel:'+item.masterPhoneNum">联系师傅</a>
                    <div v-if="id==='2'" class="expedite_order">派单</div>
            </div>
            <div class="operate_content_item user">
                      <a :href="'tel:'+item.linkmanPhoneNum"> 联系用户</a>
            </div>
            <div class="operate_content_item order_expo" v-if="id!=='2'">
                     改派
            </div>
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
  let url=""
  if(id==="1"){
//         监控
    url=`/orderquery/findpagedetection`

  }else if(id==="2"){
    url="/orderquery/findpage"

    //待分配
  }else if(id==="3"){
    url="/orderquery/findpage"

    //进行中
  }else if(id==="4"){
    url="/orderquery/findpage"
    //遗留
  }else if(id==="5"){
    url="/orderquery/findpage"
//        完成
  }
  return url;
}

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
        value:"kk",
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
            filterName:"FLabelBusiness",
            key:"fLabelBusiness"
          },
           {
            name:"联系人",
            key:"userName",
             isShow:true,
            value:""
          },
          {
            name:"服务地址",
            value:"",
            isShow:true,
            key:"linkmanDetails"
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
             key:"deviation",
             isShow:isShow(this.id),
             filterName:"startWorkDeviationShow",
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
        currentPageSize:20,
        total:0,
        pageTotal:0,
      }
    },
    methods:{
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
          state="04,05,06,07,08,10,11"
        }else if(this.id==="2"){
          state="04"
          //待分配
        }else if(this.id==="3"){
          state="05,06,07,10,11,13"
          //进行中
        }else if(this.id==="4"){
          state="08,09"
          //遗留
        }else if(this.id==="5"){
          state="09,12,14,15,17,18"
//        完成
        }
        return {params: {
          "pageNo":JSON.stringify(this.showPages),
          "pageSize":JSON.stringify(this.currentPageSize),
          "siteId":storage.getLocalStorage("userInfo").id,
          "state":state,
          "id":this.searchValue
        }}
      },
//      get 列表数据
      getTableList(url,params){

        this.$http.get(url,params).then(r=>this.$httpFilter(r).then(data=>{
          Indicator.close();
          const result=JSON.parse(JSON.stringify(data.result));

          this.orders=result.orders;

          for(let i=0;i<result.orders.length;i++){

            let obj = result.orders[i],
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
          })
        )
      }
    },
    created() {
      Indicator.open('加载中...');
      let url=`${this.$common.apidomain}${filterUrl(this.id)}`
      this.getTableList(url,this.params())
    },
   mounted(){

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
      border-radius: 0.45rem ;
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
     height:.92rem;
     background:red;
     position:absolute;
     top:20px;
     right:0;
     transform:translate(0,0);
   }
 }
</style>

